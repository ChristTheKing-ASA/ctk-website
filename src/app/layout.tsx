import type { Metadata } from "next";
import { Open_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Christ the King Anglican Church | St. Augustine, FL",
    template: "%s | Christ the King Anglican Church",
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
  authors: [{ name: "Christ the King Anglican Church" }],
  creator: "Christ the King Anglican Church",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ctkasa.com",
    siteName: "Christ the King Anglican Church",
    title: "Christ the King Anglican Church | St. Augustine, FL",
    description:
      "A welcoming Anglican community in St. Augustine, Florida. Join us for worship Sundays at 10:00 AM.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Christ the King Anglican Church",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Christ the King Anglican Church",
    description:
      "A welcoming Anglican community in St. Augustine, Florida. Join us for worship Sundays at 10:00 AM.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${openSans.variable} ${playfairDisplay.variable}`}>
      <body className="antialiased min-h-screen flex flex-col font-sans">
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
