import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Home } from './Home';
import { describe, it, expect } from 'vitest';

describe('Home Page Topic Filtering', () => {
  it('renders all articles initially and filters when a topic chip is clicked', async () => {
    const user = userEvent.setup();

    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/']}>
          <Home />
        </MemoryRouter>
      </HelmetProvider>
    );

    // Wait for initial data to finish loading
    await waitFor(() => {
      expect(screen.queryByLabelText(/loading content/i)).not.toBeInTheDocument();
    });

    // Check All chip is pressed initially
    const allChip = screen.getByRole('button', { name: /^All$/i });
    expect(allChip).toHaveAttribute('aria-pressed', 'true');

    // Verify top story rendered
    expect(
      screen.getByRole('heading', {
        name: /Why your RAG pipeline returns confident wrong answers/i,
      })
    ).toBeInTheDocument();

    // Click Security chip
    const secChip = screen.getByRole('button', { name: /^Security$/i });
    await user.click(secChip);

    // Security chip should now be pressed
    expect(secChip).toHaveAttribute('aria-pressed', 'true');
    expect(allChip).toHaveAttribute('aria-pressed', 'false');

    // Security article heading should be visible in the filtered list
    expect(
      screen.getByRole('heading', {
        name: /A practical zero-trust rollout for a 50-person company/i,
      })
    ).toBeInTheDocument();

    // Data-only article should NOT be present in filtered list
    expect(
      screen.queryByRole('heading', {
        name: /Postgres or a vector database\? Start with Postgres/i,
      })
    ).not.toBeInTheDocument();
  });

  it('honors initial topic query parameter in URL', async () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/?topic=security']}>
          <Home />
        </MemoryRouter>
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(screen.queryByLabelText(/loading content/i)).not.toBeInTheDocument();
    });

    const secChip = screen.getByRole('button', { name: /^Security$/i });
    expect(secChip).toHaveAttribute('aria-pressed', 'true');

    expect(
      screen.getByRole('heading', {
        name: /A practical zero-trust rollout for a 50-person company/i,
      })
    ).toBeInTheDocument();
  });

  it('renders exactly 5 articles in the latest articles list on initial load', async () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/']}>
          <Home />
        </MemoryRouter>
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(screen.queryByLabelText(/loading content/i)).not.toBeInTheDocument();
    });

    const latestSection = screen.getByRole('region', { name: /latest articles/i });
    const articles = latestSection.querySelectorAll('article');
    expect(articles).toHaveLength(5);
  });
});
