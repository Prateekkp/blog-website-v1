import React from 'react';
import styles from './Hero.module.css';

export interface HeroProps {
  onCtaClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onCtaClick) {
      e.preventDefault();
      onCtaClick();
    }
  };

  return (
    <section className={`band ${styles.hero}`} aria-label="Hero Introduction">
      <h1 className="sr-only">Nightwatch Tech &mdash; Engineering, AI and Security Writing</h1>
      <div className={styles.copy}>
        <p>
          Engineering, AI and security writing for people who build and run software. One clear
          article at a time.
        </p>
        <a href="#top" className={`btn ${styles.ctaBtn}`} onClick={handleClick}>
          Read top stories
        </a>
      </div>
    </section>
  );
};

export default Hero;
