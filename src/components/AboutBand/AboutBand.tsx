import React from 'react';
import styles from './AboutBand.module.css';

export const AboutBand: React.FC = () => {
  return (
    <section id="about" className={`band ${styles.about}`} aria-label="Editorial Principles">
      <div className={styles.cols}>
        <div>
          <h3 className={styles.heading}>Written by practitioners</h3>
          <p className={styles.text}>
            Every article comes from someone who has shipped the thing they write about: engineers,
            analysts and security staff, not content farms.
          </p>
        </div>
        <div>
          <h3 className={styles.heading}>Practical over trendy</h3>
          <p className={styles.text}>
            We favour working code, real trade-offs and honest failure stories over product
            announcements and hype cycles.
          </p>
        </div>
        <div>
          <h3 className={styles.heading}>Independent</h3>
          <p className={styles.text}>
            No sponsored rankings and no paid placements. Affiliate and sponsor relationships, if
            any, are disclosed in the article.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutBand;
