import { useLayoutEffect, useRef, useEffect } from 'react';

type ClickAwayCallback = () => void;

export function useClickAway(cb: ClickAwayCallback) {
  const ref = useRef<HTMLElement | null>(null);
  const refCb = useRef<ClickAwayCallback>(cb);

  useLayoutEffect(() => {
    refCb.current = cb;
  });

  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      const element = ref.current;
      if (element && !element.contains(e.target as Node)) {
        refCb.current();
      }
    };

    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, []);

  return ref;
} 