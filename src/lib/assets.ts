/**
 * Asset path helpers.
 *
 * The original single-document site could use relative paths like
 * url('./img/q-peek-seo.jpg') because every page shared one URL. With real
 * routes those resolve against the route (/services/img/... -> 404), so every
 * asset reference is rewritten root-relative and pushed through here to pick
 * up basePath.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Root-relative asset URL, basePath-aware. asset('/img/a.jpg') */
export const asset = (path: string): string => `${BASE_PATH}${path}`;

/** Same, wrapped for CSS background-image. bgUrl('/img/a.jpg') */
export const bgUrl = (path: string): string => `url('${BASE_PATH}${path}')`;
