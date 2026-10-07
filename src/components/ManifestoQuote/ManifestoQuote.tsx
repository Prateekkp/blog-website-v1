import React from 'react';
import styles from './ManifestoQuote.module.css';

export interface ManifestoQuoteProps {
  quote?: string;
  caption?: string;
}

export const ManifestoQuote: React.FC<ManifestoQuoteProps> = ({
  quote = 'Nightwatch is for the brave who build in the shadows and hold the line when production breaks at 3 AM.',
  caption = 'Vigilance in Engineering & Security',
}) => {
  return (
    <section className={`band ${styles.container}`} aria-label="Nightwatch Manifesto">
      <div className={styles.quoteWrapper}>
        <blockquote className={styles.quote}>
          <span className={`${styles.mark} ${styles.markLeft}`}>&ldquo;</span>
          {quote}
          <span className={`${styles.mark} ${styles.markRight}`}>&rdquo;</span>
        </blockquote>
        {caption && <span className={styles.caption}>{caption}</span>}
      </div>
    </section>
  );
};

export default ManifestoQuote;
