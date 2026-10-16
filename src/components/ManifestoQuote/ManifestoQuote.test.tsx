import { render, screen } from '@testing-library/react';
import { ManifestoQuote } from './ManifestoQuote';
import { describe, it, expect } from 'vitest';

describe('ManifestoQuote', () => {
  it('renders the quote text and caption', () => {
    render(<ManifestoQuote />);

    expect(
      screen.getByText(/WE'VE SEEN SUPERMAN WITH ALL HIS POWERS\.\.\. BUT WE STILL CHOSE BATMAN/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Vigilance in Engineering & Security/i)).toBeInTheDocument();
  });

  it('renders custom quote when provided', () => {
    render(<ManifestoQuote quote="Custom courage quote" caption="Custom subtitle" />);

    expect(screen.getByText(/Custom courage quote/i)).toBeInTheDocument();
    expect(screen.getByText(/Custom subtitle/i)).toBeInTheDocument();
  });
});
