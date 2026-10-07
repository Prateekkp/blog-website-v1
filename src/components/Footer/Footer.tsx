import React from 'react';
import { Link } from 'react-router-dom';
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
            <li className={styles.item}>
              <Link to="/topic/ai-ml" className={styles.link}>
                AI &amp; ML
              </Link>
            </li>
            <li className={styles.item}>
              <Link to="/topic/security" className={styles.link}>
                Security
              </Link>
            </li>
            <li className={styles.item}>
              <Link to="/topic/cloud-devops" className={styles.link}>
                Cloud &amp; DevOps
              </Link>
            </li>
            <li className={styles.item}>
              <Link to="/topic/web" className={styles.link}>
                Web
              </Link>
            </li>
            <li className={styles.item}>
              <Link to="/topic/data" className={styles.link}>
                Data
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className={styles.heading}>Site</h5>
          <ul className={styles.list}>
            <li className={styles.item}>
              <Link to="/about" className={styles.link}>
                About
              </Link>
            </li>
            <li className={styles.item}>
              <Link to="/about" className={styles.link}>
                Write for us
              </Link>
            </li>
            <li className={styles.item}>
              <Link to="/about" className={styles.link}>
                Contact
              </Link>
            </li>
            <li className={styles.item}>
              <a href="#rss" className={styles.link}>
                RSS feed
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h5 className={styles.heading}>Legal</h5>
          <ul className={styles.list}>
            <li className={styles.item}>
              <a href="#privacy" className={styles.link}>
                Privacy policy
              </a>
            </li>
            <li className={styles.item}>
              <a href="#terms" className={styles.link}>
                Terms of use
              </a>
            </li>
            <li className={styles.item}>
              <a href="#cookies" className={styles.link}>
                Cookie settings
              </a>
            </li>
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
