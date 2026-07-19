import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Set while the site is served from wallscaler.github.io/ctk-website;
  // remove once ctkasa.com points at GitHub Pages (custom domains serve
  // from the root path).
  basePath: process.env.NEXT_BASE_PATH || "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
