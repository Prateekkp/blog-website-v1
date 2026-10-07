import React from 'react';
import styles from './ErrorState.module.css';

export interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'Failed to load content. Please check your connection and try again.',
  onRetry,
}) => {
  return (
    <div className={styles.container} role="alert">
      <h3 className={styles.title}>Unable to load articles</h3>
      <p className={styles.message}>{message}</p>
      <button type="button" className={`btn ${styles.button}`} onClick={onRetry}>
        Retry
      </button>
    </div>
  );
};

export default ErrorState;
