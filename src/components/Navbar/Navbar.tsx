import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MobileMenu } from '../MobileMenu/MobileMenu';
import styles from './Navbar.module.css';

export interface NavbarProps {
  isInnerPage?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isInnerPage = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleSubscribeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/') {
      const subscribeEl = document.getElementById('subscribe');
      if (subscribeEl) {
        e.preventDefault();
        subscribeEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        className={`${styles.nav} ${isInnerPage ? styles.navInner : ''}`}
        role="banner"
      >
        <Link to="/" className={styles.logo}>
          Nightwatch Tech
        </Link>

        <nav className={styles.desktopNav} aria-label="Main">
          <ul className={styles.desktopList}>
            <li>
              <a href="/#top" className={styles.desktopLink}>
                Top stories
              </a>
            </li>
            <li>
              <a href="/#latest" className={styles.desktopLink}>
                Latest
              </a>
            </li>
            <li>
              <Link to="/about" className={styles.desktopLink}>
                About
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <a
            href="/#subscribe"
            className={`btn ${styles.subscribeBtn}`}
            onClick={handleSubscribeClick}
          >
            Subscribe
          </a>

          <button
            type="button"
            className={styles.hamburger}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu-dialog"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={styles.hamburgerIcon}>
              <span className={styles.hamburgerLine} />
              <span className={styles.hamburgerLine} />
              <span className={styles.hamburgerLine} />
            </span>
          </button>
        </div>
      </header>

      <MobileMenu
        id="mobile-menu-dialog"
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
};

export default Navbar;
