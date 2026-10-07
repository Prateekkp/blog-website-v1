import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Topic } from './Topic';
import { describe, it, expect } from 'vitest';

describe('Topic Page', () => {
  it('renders articles filtered by category', async () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/topic/security']}>
          <Routes>
            <Route path="/topic/:slug" element={<Topic />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /^Security$/i, level: 1 })
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByText(/A practical zero-trust rollout for a 50-person company/i)
      ).toBeInTheDocument();
    });
  });
});
