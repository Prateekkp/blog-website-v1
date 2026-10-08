import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ScrollToTop } from './ScrollToTop';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('ScrollToTop', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
  });

  it('scrolls to top (0, 0) on new route navigation when there is no hash', () => {
    render(
      <MemoryRouter initialEntries={['/post/some-article']}>
        <ScrollToTop />
      </MemoryRouter>
    );

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  });

  it('scrolls to hash element when hash is present', () => {
    const scrollIntoView = vi.fn();
    const elem = document.createElement('div');
    elem.id = 'subscribe';
    elem.scrollIntoView = scrollIntoView;
    document.body.appendChild(elem);

    render(
      <MemoryRouter initialEntries={['/#subscribe']}>
        <ScrollToTop />
      </MemoryRouter>
    );

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    document.body.removeChild(elem);
  });
});
