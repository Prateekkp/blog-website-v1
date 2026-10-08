import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Privacy } from './Privacy';
import { describe, it, expect } from 'vitest';

describe('Privacy Page', () => {
  it('renders privacy policy heading and sections', () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <Privacy />
        </BrowserRouter>
      </HelmetProvider>
    );

    expect(
      screen.getByRole('heading', { level: 1, name: /privacy policy/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/zero tracking/i)).toBeInTheDocument();
  });
});
