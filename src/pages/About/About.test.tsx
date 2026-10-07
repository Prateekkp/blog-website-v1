import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { About } from './About';
import { describe, it, expect } from 'vitest';

describe('About Page', () => {
  it('renders all three core editorial pillars', () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <About />
        </BrowserRouter>
      </HelmetProvider>
    );

    expect(screen.getByRole('heading', { name: /About Nightwatch Tech/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/1. Written by Practitioners/i)).toBeInTheDocument();
    expect(screen.getByText(/2. Practical Over Trendy/i)).toBeInTheDocument();
    expect(screen.getByText(/3. Independent and Transparent/i)).toBeInTheDocument();
  });
});
