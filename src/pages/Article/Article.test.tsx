import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Article } from './Article';
import { describe, it, expect } from 'vitest';

describe('Article Route', () => {
  it('renders article page content for a known slug', async () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/post/cutting-ci-time-from-24-minutes-to-6']}>
          <Routes>
            <Route path="/post/:slug" element={<Article />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          name: /Cutting CI time from 24 minutes to 6/i,
        })
      ).toBeInTheDocument();
    });

    expect(screen.getByText(/Siddharth Patel/i)).toBeInTheDocument();
    expect(screen.getAllByText(/8 min read/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/A 24-minute pull request build pipeline/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /copy article link/i })).toBeInTheDocument();
  });

  it('renders 404 NotFound page for an unknown slug', async () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/post/non-existent-article-slug-xyz']}>
          <Routes>
            <Route path="/post/:slug" element={<Article />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('404')).toBeInTheDocument();
    });

    expect(
      screen.getByRole('heading', {
        name: /Target Not Found in the Shadows/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to home/i })).toBeInTheDocument();
  });
});
