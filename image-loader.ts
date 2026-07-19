// Prefixes the basePath on next/image srcs — Next.js skips basePath for
// unoptimized images, which 404s everything under a subpath deploy.
export default function imageLoader({ src }: { src: string }) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${src}`;
}
