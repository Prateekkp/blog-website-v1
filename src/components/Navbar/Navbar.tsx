import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MobileMenu } from '../MobileMenu/MobileMenu';
import { MAIN_NAV_ITEMS } from '../../config/navigation';
import styles from './Navbar.module.css';

export interface NavbarProps {
  isInnerPage?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isInnerPage = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleHashNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    if (location.pathname === '/') {
      const el = document.getElementById(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
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
            {MAIN_NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={styles.desktopLink}
                  onClick={(e) => {
                    if (item.href.includes('#')) {
                      handleHashNavClick(e, item.href.split('#')[1]);
                    }
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link
            to="/#subscribe"
            className={`btn ${styles.subscribeBtn}`}
            onClick={(e) => handleHashNavClick(e, 'subscribe')}
          >
            Subscribe
          </Link>

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
