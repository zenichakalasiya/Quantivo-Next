import { PAGES, type PageId } from '@/data/content';

/** 'home' is the index route; every other page id is its own segment. */
export const routeFor = (p: PageId): string => (p === 'home' ? '/' : `/${p}`);

/** Matches the original: only 'blog' gets a different display label. */
export const labelFor = (p: PageId): string =>
  p === 'blog' ? 'Insights' : p.charAt(0).toUpperCase() + p.slice(1);

/**
 * Home is deliberately absent: the logo is the route home, so a nav entry for it
 * is a second control doing the same job.
 */
export const NAV = PAGES.filter((p) => p !== 'home').map((p) => ({
  key: p,
  href: routeFor(p),
  label: labelFor(p),
  isSvc: p === 'services',
}));

/** trailingSlash:true means pathname arrives as '/about/' - normalise before comparing. */
export const normalise = (pathname: string): string => {
  const p = pathname.replace(/\/+$/, '');
  return p === '' ? '/' : p;
};
