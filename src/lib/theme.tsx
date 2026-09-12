'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

export type Theme = 'dark' | 'light';

/**
 * Mirrors the original exactly: theme lives in component state AND is written
 * straight onto documentElement.dataset.qv, which is what the
 * :root[data-qv="light"] custom-property block keys off.
 *
 * Deliberately NOT persisted. The original never wrote localStorage, so every
 * load starts dark - reproducing that is what lets layout.tsx render
 * data-qv="dark" server-side with no flash and no hydration mismatch.
 */
const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({
  theme: 'dark',
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.qv = next;
      return next;
    });
  }, []);

  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export const useTheme = () => useContext(ThemeCtx);
