import { useEffect } from 'react';

let activeModalsCount = 0;
let originalOverflow = '';

export const lockScroll = (): void => {
  if (typeof document === 'undefined') return;
  if (activeModalsCount === 0) {
    originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  activeModalsCount++;
};

export const unlockScroll = (): void => {
  if (typeof document === 'undefined') return;
  activeModalsCount = Math.max(0, activeModalsCount - 1);
  if (activeModalsCount === 0) {
    document.body.style.overflow = originalOverflow || '';
  }
};

/**
 * Safe reference-counted body scroll lock hook.
 * Handles nested modals (e.g. Lightbox on top of ProjectDetailModal)
 * without premature restoration of page scroll.
 */
export const useBodyScrollLock = (isLocked: boolean): void => {
  useEffect(() => {
    if (!isLocked) return;
    lockScroll();
    return () => {
      unlockScroll();
    };
  }, [isLocked]);
};
