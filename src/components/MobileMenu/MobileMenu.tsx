import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScrollLock } from '../../hooks/useScrollLock';
import { useFocusTrap } from '../../hooks/useFocusTrap';
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

  const initialLocation = useRef(location.pathname + location.search);

  // Close when route changes
  useEffect(() => {
    const currentLocation = location.pathname + location.search;
    if (isOpen && initialLocation.current !== currentLocation) {
      initialLocation.current = currentLocation;
      onClose();
    }
  }, [isOpen, location.pathname, location.search, onClose]);

  if (!isOpen) return null;

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div
      ref={containerRef}
      id={id}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
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
          <li>
            <a href="/#top" className={styles.navLink} onClick={handleLinkClick}>
              Top stories
            </a>
          </li>
          <li>
            <a href="/#latest" className={styles.navLink} onClick={handleLinkClick}>
              Latest
            </a>
          </li>
          <li>
            <Link to="/about" className={styles.navLink} onClick={handleLinkClick}>
              About
            </Link>
          </li>
        </ul>

        <div className={styles.subscribeContainer}>
          <a
            href="/#subscribe"
            className={`btn ${styles.subscribeBtn}`}
            onClick={handleLinkClick}
          >
            Subscribe
          </a>
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
