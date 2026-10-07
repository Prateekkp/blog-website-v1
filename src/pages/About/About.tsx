import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styles from './About.module.css';

export const About: React.FC = () => {
  return (
    <div className={`band ${styles.container}`}>
      <Helmet>
        <title>About - Nightwatch Tech</title>
        <meta
          name="description"
          content="Learn about Nightwatch Tech's editorial philosophy: practitioner-written, practical over trendy, and rigorously independent."
        />
      </Helmet>

      <Link to="/" className={styles.backLink}>
        &larr; Back to articles
      </Link>

      <header className={styles.header}>
        <h1 className={styles.title}>About Nightwatch Tech</h1>
        <p className={styles.lead}>
          A technical publication built for engineers, system architects, and security
          practitioners who build, maintain, and secure production software in high-stakes
          environments.
        </p>
      </header>

      <section className={styles.pillar}>
        <h2 className={styles.pillarTitle}>1. Written by Practitioners</h2>
        <p className={styles.pillarText}>
          Every article comes from someone who has shipped the thing they write about: engineers,
          analysts, and security staff—not SEO content farms, ghostwriters, or corporate PR teams.
        </p>
        <p className={styles.pillarText}>
          Our contributors maintain production databases, patch zero-day vulnerabilities, profile
          monorepo build runners, and train transformer models. We believe true technical insight
          only comes from bruised shins in production.
        </p>
      </section>

      <section className={styles.pillar}>
        <h2 className={styles.pillarTitle}>2. Practical Over Trendy</h2>
        <p className={styles.pillarText}>
          We favour working code, real architectural trade-offs, and honest postmortems over product
          announcements, VC hype cycles, and superficial benchmarking.
        </p>
        <p className={styles.pillarText}>
          When a modern paradigm promises a 10x improvement, we test it against existing proven
          tooling like PostgreSQL, Linux primitives, and battle-tested network protocols. If a
          shiny technology introduces operational friction, we document the real hidden cost.
        </p>
      </section>

      <section className={styles.pillar}>
        <h2 className={styles.pillarTitle}>3. Independent and Transparent</h2>
        <p className={styles.pillarText}>
          No sponsored rankings, no pay-to-play vendor comparisons, and no undisclosed affiliate
          arrangements.
        </p>
        <p className={styles.pillarText}>
          If an author has an equity stake or advisory relationship with a tool evaluated in an
          investigation, that relationship is clearly disclosed right beside the author byline.
        </p>
      </section>

      <section className={styles.callout}>
        <h3 className={styles.calloutTitle}>Interested in contributing?</h3>
        <p className={styles.calloutText}>
          Have a battle-tested failure story, deep-dive profiling walkthrough, or practical zero-trust
          implementation guide? We pay competitive rates for practitioner essays.
        </p>
        <a href="mailto:editor@nightwatch.tech" className="btn">
          Pitch an Article
        </a>
      </section>
    </div>
  );
};

export default About;
