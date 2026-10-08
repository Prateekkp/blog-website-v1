import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styles from './Privacy.module.css';

export const Privacy: React.FC = () => {
  return (
    <div className={`band ${styles.container}`}>
      <Helmet>
        <title>Privacy Policy - Nightwatch Tech</title>
        <meta
          name="description"
          content="Nightwatch Tech privacy policy: zero tracking cookies, zero surveillance analytics, and complete respect for reader privacy."
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Privacy Policy - Nightwatch Tech" />
      </Helmet>

      <Link to="/" className={styles.backLink}>
        &larr; Back to articles
      </Link>

      <header className={styles.header}>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.lead}>
          We build systems that protect privacy by design. Our data collection philosophy is simple:
          if we don&apos;t store it, it cannot be leaked.
        </p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1. Zero Tracking &amp; Zero Surveillance</h2>
        <p className={styles.text}>
          Nightwatch Tech does not use third-party tracking scripts, cross-site tracking pixels, or
          invasive behavioural profiling tools. We run no third-party ad networks.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>2. Newsletter Subscriptions</h2>
        <p className={styles.text}>
          When you subscribe to our weekly build log, your email address is used exclusively to
          deliver that newsletter. We never sell, rent, or share our subscriber lists with third
          parties. Every issue contains a one-click unsubscribe link.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>3. Server Logs &amp; Security</h2>
        <p className={styles.text}>
          Our edge servers collect standard ephemeral HTTP request logs (IP address, user agent,
          timestamp) strictly for DDoS mitigation, traffic integrity, and error detection. Logs are
          automatically rotated and purged within 14 days.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>4. Contact Us</h2>
        <p className={styles.text}>
          If you have privacy questions or wish to request data deletion, contact us at{' '}
          <a href="mailto:privacy@nightwatch.tech" className={styles.emailLink}>
            privacy@nightwatch.tech
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default Privacy;
