import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styles from './NotFound.module.css';

export const NotFound: React.FC = () => {
  return (
    <div className={`band ${styles.container}`}>
      <Helmet>
        <title>404: Page Not Found - Nightwatch Tech</title>
        <meta name="description" content="The requested page could not be found." />
      </Helmet>

      <div className={styles.code}>404</div>
      <h1 className={styles.heading}>Target Not Found in the Shadows</h1>
      <p className={styles.description}>
        The page or article you requested doesn&apos;t exist or has been moved. Check the URL or return to the main console.
      </p>
      <Link to="/" className={`btn ${styles.homeBtn}`}>
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
