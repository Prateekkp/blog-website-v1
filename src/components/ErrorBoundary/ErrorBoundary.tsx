import { Component, ErrorInfo, ReactNode } from 'react';
import styles from './ErrorBoundary.module.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.error('Uncaught error in component tree:', error, errorInfo);
  }

  private handleReload = (): void => {
    window.location.reload();
  };

  private handleHome = (): void => {
    window.location.href = '/';
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className={`band ${styles.container}`} role="alert">
          <div className={styles.badge}>SYSTEM ANOMALY</div>
          <h1 className={styles.title}>Something went wrong in the shadows</h1>
          <p className={styles.description}>
            An unexpected runtime error occurred. We have contained the failure.
          </p>
          <div className={styles.actions}>
            <button
              type="button"
              className={`btn ${styles.primaryBtn}`}
              onClick={this.handleReload}
            >
              Reload System
            </button>
            <button
              type="button"
              className={`btn ${styles.secondaryBtn}`}
              onClick={this.handleHome}
            >
              Return to Console
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
