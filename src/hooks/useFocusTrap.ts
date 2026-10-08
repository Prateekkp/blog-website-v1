import { useEffect, useRef } from 'react';

export function useFocusTrap(isActive: boolean, onClose?: () => void) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    triggerRef.current = document.activeElement as HTMLElement | null;

    const container = containerRef.current;
    if (!container) return;

    const focusableSelectors =
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const getFocusables = () =>
      Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors)).filter(
        (el) => el.offsetParent !== null || el.offsetWidth > 0 || el.offsetHeight > 0
      );

    // Focus close button or container to avoid highlighting the logo or jumping scroll
    const closeBtn = container.querySelector<HTMLElement>('button[aria-label*="close" i]');
    if (closeBtn) {
      closeBtn.focus({ preventScroll: true });
    } else {
      const focusables = getFocusables();
      if (focusables.length > 0) {
        focusables[0].focus({ preventScroll: true });
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose?.();
        return;
      }

      if (e.key === 'Tab') {
        const currentFocusables = getFocusables();
        if (currentFocusables.length === 0) {
          e.preventDefault();
          return;
        }

        const first = currentFocusables[0];
        const last = currentFocusables[currentFocusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [isActive, onClose]);

  return containerRef;
}
