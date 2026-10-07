import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { MobileMenu } from './MobileMenu';
import { describe, it, expect, vi } from 'vitest';

describe('MobileMenu', () => {
  it('opens and closes with Escape key', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    const { rerender } = render(
      <BrowserRouter>
        <MobileMenu isOpen={false} onClose={handleClose} />
      </BrowserRouter>
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    rerender(
      <BrowserRouter>
        <MobileMenu isOpen={true} onClose={handleClose} />
      </BrowserRouter>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('closes when clicking close button', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <MobileMenu isOpen={true} onClose={handleClose} />
      </BrowserRouter>
    );

    const closeBtn = screen.getByRole('button', { name: /close menu/i });
    await user.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
