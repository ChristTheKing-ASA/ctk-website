import type { NextConfig } from "next";

// The deploy is a static export. Dev is not: Keystatic's local editor needs a
// live API route to read and write content files, and a static export cannot
// serve one. Skipping `output: export` in dev gives us that route; keeping
// `.dev.ts` out of pageExtensions in production keeps it out of the build.
//
// The export path is still verified on every CI run and locally via
// `npm run build && npm run test:pages`, so dev diverging here does not go
// unchecked.
const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  ...(isDev ? {} : { output: "export" as const }),
  pageExtensions: isDev
    ? ["ts", "tsx", "js", "jsx", "dev.ts", "dev.tsx"]
    : ["ts", "tsx", "js", "jsx"],
  // Set while the site is served from wallscaler.github.io/ctk-website;
  // remove once ctkasa.com points at GitHub Pages (custom domains serve
  // from the root path).
  basePath: process.env.NEXT_BASE_PATH || "",
  trailingSlash: true,
  images: {
    // No `unoptimized` here — it would bypass the loader, which exists to
    // prefix the basePath (Next skips basePath on unoptimized image srcs).
    loader: "custom",
    loaderFile: "./image-loader.ts",
  },
};

export default nextConfig;
