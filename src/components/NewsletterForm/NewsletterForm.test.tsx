import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NewsletterForm } from './NewsletterForm';
import { describe, it, expect } from 'vitest';

describe('NewsletterForm', () => {
  it('displays error message for invalid email', async () => {
    const user = userEvent.setup();
    render(<NewsletterForm />);

    const input = screen.getByLabelText(/email address/i);
    const submitBtn = screen.getByRole('button', { name: /subscribe/i });

    await user.type(input, 'invalid-email');
    await user.click(submitBtn);

    const errorMsg = screen.getByRole('status');
    expect(errorMsg).toHaveTextContent(/enter a valid email address/i);
  });

  it('submits successfully for valid email address', async () => {
    const user = userEvent.setup();
    render(<NewsletterForm />);

    const input = screen.getByLabelText(/email address/i);
    const submitBtn = screen.getByRole('button', { name: /subscribe/i });

    await user.type(input, 'engineer@nightwatch.tech');
    await user.click(submitBtn);

    await waitFor(() => {
      const statusMsg = screen.getByRole('status');
      expect(statusMsg).toHaveTextContent(/you're subscribed\. check your inbox to confirm\./i);
    });
  });
});
