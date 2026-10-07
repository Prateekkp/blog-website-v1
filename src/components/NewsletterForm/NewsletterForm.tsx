import React, { useState } from 'react';
import { subscribe } from '../../services/api';
import styles from './NewsletterForm.module.css';

export interface NewsletterFormProps {
  id?: string;
}

export const NewsletterForm: React.FC<NewsletterFormProps> = ({ id = 'subscribe' }) => {
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = email.trim();
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!emailRegex.test(trimmed)) {
      setIsError(true);
      setIsSuccess(false);
      setStatusMessage('Enter a valid email address, like you@company.com.');
      return;
    }

    setIsLoading(true);
    setIsError(false);
    setStatusMessage('');

    try {
      const res = await subscribe(trimmed);
      if (res.success) {
        setIsSuccess(true);
        setIsError(false);
        setStatusMessage(res.message);
        setEmail('');
      } else {
        setIsError(true);
        setIsSuccess(false);
        setStatusMessage(res.message);
      }
    } catch {
      setIsError(true);
      setIsSuccess(false);
      setStatusMessage('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.box} id={id}>
      <h4 className={styles.heading}>The weekly build log</h4>
      <p className={styles.description}>
        One email every Friday with the week's best articles. No spam, unsubscribe any time.
      </p>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <label htmlFor="newsletter-email" className={`meta ${styles.label}`}>
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (isError) {
              setIsError(false);
              setStatusMessage('');
            }
          }}
          className={`${styles.input} ${isError ? styles.inputError : ''}`}
          aria-describedby="email-msg"
          aria-invalid={isError}
          disabled={isLoading}
        />
        <button
          type="submit"
          className={`btn ${styles.button}`}
          disabled={isLoading}
        >
          {isLoading ? 'Subscribing...' : 'Subscribe'}
        </button>
        <p
          id="email-msg"
          role="status"
          className={`${styles.msg} ${
            isError ? styles.msgError : isSuccess ? styles.msgSuccess : ''
          }`}
        >
          {statusMessage}
        </p>
      </form>
    </div>
  );
};

export default NewsletterForm;
