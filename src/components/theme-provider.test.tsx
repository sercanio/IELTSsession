import { render, screen, act, fireEvent } from '@testing-library/react';
import { ThemeProvider } from './theme-provider';
import { ThemeProviderContext } from './theme-provider-context';
import { useContext } from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

// Helper component to consume context
const TestComponent = () => {
  const { theme, setTheme } = useContext(ThemeProviderContext);
  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <button onClick={() => setTheme('dark')}>Set Dark</button>
      <button onClick={() => setTheme('light')}>Set Light</button>
      <button onClick={() => setTheme('system')}>Set System</button>
    </div>
  );
};

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('renders children', () => {
    render(
      <ThemeProvider>
        <div>Test Child</div>
      </ThemeProvider>
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('provides default theme (system)', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme-value')).toHaveTextContent('system');
  });

  it('uses defaultTheme prop', () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
    expect(document.documentElement).toHaveClass('dark');
  });

  it('uses localStorage theme if available', () => {
    localStorage.setItem('vite-ui-theme', 'light');
    render(
      <ThemeProvider defaultTheme="dark">
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
    expect(document.documentElement).toHaveClass('light');
  });

  it('updates theme and localStorage when setTheme is called', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Set Dark'));
    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
    expect(localStorage.getItem('vite-ui-theme')).toBe('dark');
    expect(document.documentElement).toHaveClass('dark');

    fireEvent.click(screen.getByText('Set Light'));
    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
    expect(localStorage.getItem('vite-ui-theme')).toBe('light');
    expect(document.documentElement).toHaveClass('light');
  });
});
