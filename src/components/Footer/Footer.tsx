import React from 'react';
import { Link } from 'react-router-dom';
import { TOPICS } from '../../config/topics';
import { FOOTER_NAV_CONFIG } from '../../config/navigation';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={`band ${styles.footer}`} role="contentinfo">
      <div className={styles.cols}>
        <div className={styles.brandCol}>
          <Link to="/" className={styles.logo}>
            Nightwatch Tech
          </Link>
          <p className={styles.brandDesc}>
            Independent technology writing on AI, cloud, security, web and data engineering.
          </p>
        </div>

        <div>
          <h5 className={styles.heading}>Topics</h5>
          <ul className={styles.list}>
            {TOPICS.map((topic) => (
              <li key={topic.slug} className={styles.item}>
                <Link to={`/topic/${topic.slug}`} className={styles.link}>
                  {topic.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className={styles.heading}>Site</h5>
          <ul className={styles.list}>
            {FOOTER_NAV_CONFIG.siteLinks.map((link) => (
              <li key={link.label} className={styles.item}>
                <Link to={link.href} className={styles.link}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className={styles.heading}>Legal</h5>
          <ul className={styles.list}>
            {FOOTER_NAV_CONFIG.legalLinks.map((link) => (
              <li key={link.label} className={styles.item}>
                <Link to={link.href} className={styles.link}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.legal}>
        <span>&copy; 2026 Nightwatch Tech. All rights reserved.</span>
        <span>Unofficial fan-inspired theme. Not affiliated with DC.</span>
      </div>
    </footer>
  );
};

export default Footer;
