import React from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer';
import styles from './Layout.module.css';

export interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const hasHero = location.pathname === '/' || location.pathname.startsWith('/post/');

  return (
    <div className={styles.layoutWrapper}>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navbar isInnerPage={!hasHero} />
      <main id="main-content" className={styles.mainContent} tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
