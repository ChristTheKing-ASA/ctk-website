import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Only use static export in production builds
  // Dev mode needs dynamic routes for Keystatic admin
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
  }),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
