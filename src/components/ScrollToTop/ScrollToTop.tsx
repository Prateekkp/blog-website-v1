import React, { useEffect, useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

// In-memory map of history key -> scrollY position
const scrollPositions = new Map<string, number>();

export const ScrollToTop: React.FC = () => {
  const location = useLocation();
  const navType = useNavigationType();

  // Prevent browser's native automatic jumpy scroll restoration from interfering
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Continuously record scroll position for the current location key
  useEffect(() => {
    const handleScroll = () => {
      scrollPositions.set(location.key, window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      scrollPositions.set(location.key, window.scrollY);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.key]);

  // Handle scroll position on route change
  useLayoutEffect(() => {
    // 1. If navigating with a hash (e.g. /#subscribe or /#latest)
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    // 2. If navigating BACK / FORWARD (POP), restore where the user left off
    if (navType === 'POP') {
      const savedPosition = scrollPositions.get(location.key);
      if (typeof savedPosition === 'number') {
        window.scrollTo({ top: savedPosition, left: 0, behavior: 'instant' });
        const rAF = requestAnimationFrame(() => {
          window.scrollTo({ top: savedPosition, left: 0, behavior: 'instant' });
        });
        return () => cancelAnimationFrame(rAF);
      }
    }

    // 3. New navigation (PUSH): start at the very beginning (top of page)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location.pathname, location.hash, location.key, navType]);

  return null;
};

export default ScrollToTop;
