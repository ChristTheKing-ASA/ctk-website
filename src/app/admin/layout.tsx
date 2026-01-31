import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Christ the King",
  robots: { index: false, follow: false },
};

// This layout removes the site header/footer for the admin area
export default function KeystaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
