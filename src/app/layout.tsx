import type { Metadata } from "next";
import { Open_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { getChurchInfo } from "@/lib/content";

export const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Christ The King Anglican Church | St. Augustine, FL",
    template: "%s | Christ The King Anglican Church",
  },
  description:
    "A welcoming Anglican community in St. Augustine, Florida. Join us for worship Sundays at 10:00 AM. Love God. Become Disciples. Serve Others.",
  keywords: [
    "Anglican Church",
    "St. Augustine",
    "Florida",
    "Episcopal",
    "Christian",
    "Worship",
    "DeafChurch",
    "ACNA",
  ],
  authors: [{ name: "Christ The King Anglican Church" }],
  creator: "Christ The King Anglican Church",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ctkasa.com",
    siteName: "Christ The King Anglican Church",
    title: "Christ The King Anglican Church | St. Augustine, FL",
    description:
      "A welcoming Anglican community in St. Augustine, Florida. Join us for worship Sundays at 10:00 AM.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Christ The King Anglican Church",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Christ The King Anglican Church",
    description:
      "A welcoming Anglican community in St. Augustine, Florida. Join us for worship Sundays at 10:00 AM.",
  },
  // The staging copy on GitHub Pages is publicly reachable and would otherwise
  // compete with ctkasa.com in search results for the same content. The staging
  // workflow sets NEXT_PUBLIC_NOINDEX so only production is indexable.
  robots:
    process.env.NEXT_PUBLIC_NOINDEX === "1"
      ? { index: false, follow: false, nocache: true }
      : { index: true, follow: true },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  manifest: "/site.webmanifest",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const churchInfo = await getChurchInfo();

  return (
    <html lang="en" className={`${openSans.variable} ${playfairDisplay.variable}`}>
      <body className="antialiased font-sans">
        <SiteChrome header={<Header />} footer={<Footer churchInfo={churchInfo} />}>
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
