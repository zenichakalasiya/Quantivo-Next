import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages.
 *
 * basePath comes from the environment so local dev serves at "/" while the
 * Pages build serves under the repo subpath. Note that Next only applies
 * basePath to next/image and next/link - raw asset strings in inline styles
 * must go through asset()/bgUrl() in src/lib/assets.ts.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // StrictMode double-invokes mount/unmount in dev, which runs the vendored
  // custom elements' connectedCallback/disconnectedCallback twice and wedges
  // <image-slot> (duplicate ResizeObserver + store subscriptions -> render loop).
  // Production builds were unaffected, but dev was unusable. These elements are
  // third-party vanilla code we deliberately did not rewrite, and the React we
  // author here is thin wrappers, so StrictMode's value does not outweigh the cost.
  reactStrictMode: false,
  output: "export",
  basePath,
  // Emits /about/index.html rather than /about.html, which is what GitHub
  // Pages needs to serve clean URLs without a rewrite layer.
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
