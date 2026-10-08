import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScrollLock } from '../../hooks/useScrollLock';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { MAIN_NAV_ITEMS } from '../../config/navigation';
import styles from './MobileMenu.module.css';

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  id?: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  id = 'mobile-menu-dialog',
}) => {
  const location = useLocation();
  const containerRef = useFocusTrap(isOpen, onClose);
  useScrollLock(isOpen);

  // Track location to close menu on route change only when open
  const prevLocationRef = useRef(location.pathname + location.search);

  useEffect(() => {
    const currentLocation = location.pathname + location.search;
    if (prevLocationRef.current !== currentLocation) {
      prevLocationRef.current = currentLocation;
      if (isOpen) {
        onClose();
      }
    }
  }, [isOpen, location.pathname, location.search, onClose]);

  if (!isOpen) return null;

  const handleLinkClick = () => {
    onClose();
  };

  const handleHashClick = (targetId: string) => {
    onClose();
    if (location.pathname === '/') {
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      id={id}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      tabIndex={-1}
    >
      <div className={styles.header}>
        <Link to="/" className={styles.logo} onClick={handleLinkClick}>
          Nightwatch Tech
        </Link>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close menu"
        >
          ✕
        </button>
      </div>

      <nav className={styles.nav} aria-label="Mobile Main">
        <ul className={styles.navList}>
          {MAIN_NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <Link
                to={item.href}
                className={styles.navLink}
                onClick={() => {
                  if (item.href.includes('#')) {
                    handleHashClick(item.href.split('#')[1]);
                  } else {
                    handleLinkClick();
                  }
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.subscribeContainer}>
          <Link
            to="/#subscribe"
            className={`btn ${styles.subscribeBtn}`}
            onClick={() => handleHashClick('subscribe')}
          >
            Subscribe
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
