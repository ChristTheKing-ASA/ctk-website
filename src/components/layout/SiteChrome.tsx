"use client";

import { usePathname } from "next/navigation";

/**
 * Renders the site header/footer around page content, but hides them on the
 * CMS admin routes (/admin, /keystatic) so Keystatic renders without the
 * church shell. Header and footer are passed in as already-rendered server
 * components so the footer can read Church Info from the CMS (see layout.tsx).
 */
export function SiteChrome({
  header,
  footer,
  children,
}: {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin =
    pathname?.startsWith("/admin") || pathname?.startsWith("/keystatic");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {header}
      <main id="main-content" className="flex-1">
        {children}
      </main>
      {footer}
    </div>
  );
}
