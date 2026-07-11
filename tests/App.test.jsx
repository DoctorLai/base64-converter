import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import App from '../src/App';

const INPUT = 'Input here...';
const OUTPUT = 'Output appears here...';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.dir = '';
  document.documentElement.lang = '';
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('App rendering', () => {
  it('renders the title and English UI by default', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Base64 Converter'
    );
    expect(screen.getByRole('button', { name: /Encode/ })).toBeInTheDocument();
  });

  it('exposes accessible names for the input and output areas', () => {
    render(<App />);
    expect(screen.getByRole('textbox', { name: 'Input' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Output' })).toBeInTheDocument();
  });
});

describe('Encoding and decoding', () => {
  it('encodes input text to Base64', () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(INPUT), {
      target: { value: 'Hello, Ryan!' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Encode/ }));
    expect(screen.getByPlaceholderText(OUTPUT)).toHaveValue('SGVsbG8sIFJ5YW4h');
  });

  it('decodes a Base64 string back to text', () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(INPUT), {
      target: { value: 'SGVsbG8sIFJ5YW4h' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Decode/ }));
    expect(screen.getByPlaceholderText(OUTPUT)).toHaveValue('Hello, Ryan!');
  });

  it('shows an error message for invalid Base64 on decode', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(INPUT), {
      target: { value: 'not-valid-base64!' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Decode/ }));
    expect(screen.getByPlaceholderText(OUTPUT).value).toMatch(
      /Error decoding Base64/
    );
  });
});

describe('Character and byte counts', () => {
  it('updates the input count as the user types', () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(INPUT), {
      target: { value: 'abc' },
    });
    expect(screen.getByTestId('input-count').textContent).toContain('3');
  });

  it('counts multibyte characters by byte length', () => {
    render(<App />);
    // "€" is 1 character but 3 UTF-8 bytes.
    fireEvent.change(screen.getByPlaceholderText(INPUT), {
      target: { value: '€' },
    });
    const text = screen.getByTestId('input-count').textContent;
    expect(text).toContain('1');
    expect(text).toContain('3');
  });
});

describe('Clear and dark mode', () => {
  it('clears both fields', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(INPUT);
    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.click(screen.getByRole('button', { name: /Encode/ }));
    fireEvent.click(screen.getByRole('button', { name: /Clear/ }));
    expect(input).toHaveValue('');
    expect(screen.getByPlaceholderText(OUTPUT)).toHaveValue('');
  });

  it('toggles dark mode and persists the choice', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /Dark Mode/ }));
    expect(localStorage.getItem('darkMode')).toBe('true');
    expect(
      screen.getByRole('button', { name: /Light Mode/ })
    ).toBeInTheDocument();
  });
});

describe('Internationalization', () => {
  it('switches language, updates the UI, and persists the choice', () => {
    render(<App />);
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'fr' },
    });
    expect(localStorage.getItem('lang')).toBe('fr');
    expect(screen.getByRole('button', { name: /Encoder/ })).toBeInTheDocument();
  });

  it('applies right-to-left direction for Arabic', () => {
    render(<App />);
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'ar' },
    });
    expect(document.documentElement.dir).toBe('rtl');
    expect(document.documentElement.lang).toBe('ar');
  });
});

describe('Copy to clipboard', () => {
  it('is disabled when there is no output', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /Copy/ })).toBeDisabled();
  });

  it('copies the output and shows confirmation', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(INPUT), {
      target: { value: 'abc' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Encode/ }));
    fireEvent.click(screen.getByRole('button', { name: /Copy/ }));
    expect(writeText).toHaveBeenCalledWith('YWJj');
    expect(
      await screen.findByRole('button', { name: /Copied/ })
    ).toBeInTheDocument();
  });
});

describe('File handling', () => {
  it('loads and decodes a .b64 file', async () => {
    render(<App />);
    const fileInput = document.querySelector('input[type="file"]');
    const file = new File(['SGVsbG8='], 'sample.b64', { type: 'text/plain' });
    fireEvent.change(fileInput, { target: { files: [file] } });
    await waitFor(() =>
      expect(screen.getByPlaceholderText(OUTPUT)).toHaveValue('Hello')
    );
  });

  it('loads and encodes a non-b64 file', async () => {
    render(<App />);
    const fileInput = document.querySelector('input[type="file"]');
    const file = new File([new Uint8Array([72, 101, 108, 108, 111])], 'a.bin');
    fireEvent.change(fileInput, { target: { files: [file] } });
    await waitFor(() =>
      expect(screen.getByPlaceholderText(OUTPUT)).toHaveValue('SGVsbG8=')
    );
  });

  it('ignores a change event with no file', () => {
    render(<App />);
    const fileInput = document.querySelector('input[type="file"]');
    fireEvent.change(fileInput, { target: { files: [] } });
    expect(screen.getByPlaceholderText(OUTPUT)).toHaveValue('');
  });

  it('saves the encoded output to a file', () => {
    URL.createObjectURL = vi.fn(() => 'blob:mock');
    const clickSpy = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {});
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(INPUT), {
      target: { value: 'abc' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Encode/ }));
    fireEvent.click(screen.getByRole('button', { name: /Save File/ }));
    expect(URL.createObjectURL).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
  });

  it('saves decoded text output as a text file', () => {
    URL.createObjectURL = vi.fn(() => 'blob:mock');
    const clickSpy = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {});
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(INPUT), {
      target: { value: 'SGVsbG8=' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Decode/ }));
    fireEvent.click(screen.getByRole('button', { name: /Save File/ }));
    expect(clickSpy).toHaveBeenCalled();
  });

  it('decodes binary data and saves it as a binary file', () => {
    URL.createObjectURL = vi.fn(() => 'blob:mock');
    const clickSpy = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {});
    render(<App />);
    // Base64 of the bytes [0, 1, 2, 3] decodes to non-text binary data.
    fireEvent.change(screen.getByPlaceholderText(INPUT), {
      target: { value: 'AAECAw==' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Decode/ }));
    fireEvent.click(screen.getByRole('button', { name: /Save File/ }));
    expect(clickSpy).toHaveBeenCalled();
  });

  it('shows an error when a .b64 file is invalid', async () => {
    render(<App />);
    const fileInput = document.querySelector('input[type="file"]');
    const file = new File(['not valid base64 %%%'], 'bad.b64', {
      type: 'text/plain',
    });
    fireEvent.change(fileInput, { target: { files: [file] } });
    await waitFor(() =>
      expect(screen.getByPlaceholderText(OUTPUT).value).toMatch(
        /Error decoding \.b64 file/
      )
    );
  });
});

describe('Tab support', () => {
  it('inserts a tab character instead of moving focus', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(INPUT);
    input.focus();
    fireEvent.keyDown(input, { key: 'Tab' });
    expect(input.value).toBe('\t');
  });

  it('ignores other keys', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(INPUT);
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(input.value).toBe('');
  });
});
