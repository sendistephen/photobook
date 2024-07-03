/**
 * Custom hook to lock the body scroll on the body element
 * @param lock - boolean to lock or unlock the scroll
 */

import { useLayoutEffect } from 'react';

let originalStyle = '';

const useBodyScrollLock = (lock: boolean) => {
  useLayoutEffect(() => {
    if (!originalStyle) {
      // Only set the first time
      originalStyle = window.getComputedStyle(document.body).overflow;
    }
    console.log(`Locking scroll: ${lock}, original style: ${originalStyle}`);

    document.body.style.overflow = lock ? 'hidden' : originalStyle;

    return () => {
      console.log(`Resetting overflow to original style: ${originalStyle}`);
      document.body.style.overflow = originalStyle;
    };
  }, [lock]);
};

export default useBodyScrollLock;
