import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Terms } from './Terms';
import { describe, it, expect } from 'vitest';

describe('Terms Page', () => {
  it('renders terms of use heading and content', () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <Terms />
        </BrowserRouter>
      </HelmetProvider>
    );

    expect(
      screen.getByRole('heading', { level: 1, name: /terms of use/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/code snippets & architecture patterns/i)).toBeInTheDocument();
  });
});
