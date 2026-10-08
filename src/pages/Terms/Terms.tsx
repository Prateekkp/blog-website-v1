import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styles from '../Privacy/Privacy.module.css';

export const Terms: React.FC = () => {
  return (
    <div className={`band ${styles.container}`}>
      <Helmet>
        <title>Terms of Use - Nightwatch Tech</title>
        <meta
          name="description"
          content="Nightwatch Tech terms of use: open publication license, attribution guidelines, and code snippet usage."
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Terms of Use - Nightwatch Tech" />
      </Helmet>

      <Link to="/" className={styles.backLink}>
        &larr; Back to articles
      </Link>

      <header className={styles.header}>
        <h1 className={styles.title}>Terms of Use</h1>
        <p className={styles.lead}>
          Our content is written for practitioners to learn, adapt, and build. Here are the rules of
          engagement.
        </p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1. Code Snippets &amp; Architecture Patterns</h2>
        <p className={styles.text}>
          All sample source code, architecture diagrams, and scripts published on Nightwatch Tech are
          provided under the MIT License unless explicitly stated otherwise. You are free to adapt
          them for commercial and open-source applications.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>2. Content Reproduction &amp; Attribution</h2>
        <p className={styles.text}>
          Full article reproduction without permission is prohibited. You may excerpt up to 200
          words with a clear backlink attributing the author and Nightwatch Tech.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>3. Disclaimer of Liability</h2>
        <p className={styles.text}>
          Articles describe technical engineering experiences in specific production environments.
          Implement configurations, scripts, and commands in sandbox environments before deploying
          to production.
        </p>
      </section>
    </div>
  );
};

export default Terms;
