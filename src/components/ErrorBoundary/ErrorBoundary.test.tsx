import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';
import { describe, it, expect, vi } from 'vitest';

const ProblemChild: React.FC<{ shouldThrow: boolean }> = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('Test crash');
  }
  return <div>Normal Content</div>;
};

describe('ErrorBoundary', () => {
  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <ProblemChild shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Normal Content')).toBeInTheDocument();
  });

  it('catches render errors and displays fallback UI', () => {
    // Suppress expected console.error during test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblemChild shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /something went wrong in the shadows/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reload system/i })).toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});
