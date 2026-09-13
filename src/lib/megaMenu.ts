import { ARTICLES, SVC_MENU, WORK } from '@/data/content';

/**
 * Data for the header's hover menus.
 *
 * Each menu is a list of left-hand entries, and each entry owns the cards shown
 * on the right. Hovering an entry swaps the grid.
 *
 * ── Why every entry is padded to CARDS_PER_VIEW ──────────────────────────────
 * The real content does not divide evenly: a single service is one item, and the
 * Work categories hold between one and two projects each. A grid that changed
 * from six tiles to one as the pointer moved down the list would flicker and
 * reflow the panel on every row.
 *
 * So each entry lists its own items FIRST and then tops up from the rest of that
 * menu's pool. The relevant things still lead; the grid just stops collapsing.
 * Insights is the exception — there are only five articles, so it shows five.
 */
export type MegaCard = {
  id: string;
  label: string;
  img: string;
  /** Route to push. */
  href: string;
  /** Element id to scroll to after the route settles, where one applies. */
  anchor?: string;
};

export type MegaEntry = { label: string; cards: MegaCard[] };

export type MegaMenu = {
  /** Matches the nav item's page id. */
  key: string;
  entries: MegaEntry[];
  caption: string;
  cta: string;
  href: string;
};

const CARDS_PER_VIEW = 6;

/** Own items first, then top up from the pool, never repeating. */
function fill(own: MegaCard[], pool: MegaCard[]): MegaCard[] {
  const seen = new Set(own.map((c) => c.id));
  const rest = pool.filter((c) => !seen.has(c.id));
  return [...own, ...rest].slice(0, CARDS_PER_VIEW);
}

// ---------- Services ----------
const SERVICE_CARDS: MegaCard[] = SVC_MENU.map((s) => ({
  id: s.id,
  label: s.label,
  img: s.img,
  href: '/services',
  anchor: s.id,
}));

const servicesMenu: MegaMenu = {
  key: 'services',
  entries: SVC_MENU.map((s) => {
    const own = SERVICE_CARDS.filter((c) => c.id === s.id);
    return { label: s.label, cards: fill(own, SERVICE_CARDS) };
  }),
  caption: 'Eight services, one team across all of them.',
  cta: 'Explore services',
  href: '/services',
};

// ---------- Work ----------
const WORK_CARDS: MegaCard[] = WORK.map((w) => ({
  id: w.slot,
  label: w.title,
  img: w.img,
  href: '/work',
}));

const WORK_CATS = ['Branding', '3D', 'Web', 'Marketing'] as const;

const workMenu: MegaMenu = {
  key: 'work',
  entries: [
    { label: 'All work', cards: WORK_CARDS.slice(0, CARDS_PER_VIEW) },
    ...WORK_CATS.map((cat) => {
      const own = WORK.filter((w) => w.cat === cat).map((w) => ({
        id: w.slot,
        label: w.title,
        img: w.img,
        href: '/work',
      }));
      return { label: cat, cards: fill(own, WORK_CARDS) };
    }),
  ],
  caption: 'Selected projects across brand, digital and 3D.',
  cta: 'See all work',
  href: '/work',
};

// ---------- Insights ----------
const ARTICLE_CARDS: MegaCard[] = ARTICLES.map((a) => ({
  id: a.title,
  label: a.title,
  img: a.img,
  href: '/blog',
}));

const INSIGHT_CATS = ['SEO', 'Branding', '3D', 'Web Design', 'Strategy'] as const;

const insightsMenu: MegaMenu = {
  key: 'blog',
  entries: [
    { label: 'Latest', cards: ARTICLE_CARDS.slice(0, CARDS_PER_VIEW) },
    ...INSIGHT_CATS.map((cat) => {
      const own = ARTICLES.filter((a) => a.tags.some((t) => t === cat)).map((a) => ({
        id: a.title,
        label: a.title,
        img: a.img,
        href: '/blog',
      }));
      return { label: cat, cards: fill(own, ARTICLE_CARDS) };
    }),
  ],
  caption: 'Notes on the work, written by the people doing it.',
  cta: 'Read all insights',
  href: '/blog',
};

export const MEGA_MENUS: Record<string, MegaMenu> = {
  services: servicesMenu,
  work: workMenu,
  blog: insightsMenu,
};
