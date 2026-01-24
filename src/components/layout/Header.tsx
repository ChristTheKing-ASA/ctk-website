"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, Heart } from "lucide-react";
import { navigation } from "@/data/church";
import { cn } from "@/lib/utils";
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleDeafChurchClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Get button position for confetti origin
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    // Dynamically import confetti only when needed (~90KB saved from initial bundle)
    const confetti = (await import("canvas-confetti")).default;

    // Micro confetti burst from the button
    confetti({
      particleCount: 40,
      spread: 55,
      origin: { x, y },
      colors: ['#fbbf24', '#f59e0b', '#d97706', '#102a43', '#334e68'],
      ticks: 80,
      gravity: 1.2,
      scalar: 0.7,
      startVelocity: 20,
      disableForReducedMotion: true,
    });

    // Navigate after a tiny delay so confetti is visible
    setTimeout(() => {
      router.push('/deafchurch');
    }, 100);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-navy-100 shadow-sm">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-navy-900 rounded-full flex items-center justify-center group-hover:bg-navy-800 transition-colors">
                <span className="text-gold-400 font-display font-bold text-lg">CTK</span>
              </div>
              <div className="hidden sm:block">
                <p className="font-display text-navy-900 font-semibold text-lg leading-tight">
                  Christ the King
                </p>
                <p className="text-navy-600 text-xs">Anglican Church</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={item.name === "DeafChurch" ? handleDeafChurchClick : undefined}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  item.name === "DeafChurch"
                    ? "text-gold-700 hover:text-gold-800 hover:bg-gold-50"
                    : "text-navy-700 hover:text-navy-900 hover:bg-navy-50"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Give Button + Mobile Menu */}
          <div className="flex items-center gap-3">
            <Link
              href="/give"
              className="inline-flex items-center gap-1.5 bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm"
            >
              <Heart className="w-4 h-4" />
              <span>Give</span>
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-navy-700 hover:text-navy-900 hover:bg-navy-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">
                {mobileMenuOpen ? "Close main menu" : "Open main menu"}
              </span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-menu"
          className={cn(
            "lg:hidden overflow-hidden transition-[max-height] duration-150 ease-in-out",
            mobileMenuOpen ? "max-h-96 pb-4" : "max-h-0"
          )}
        >
          <div className="space-y-1 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block px-3 py-2 text-base font-medium rounded-md transition-colors",
                  item.name === "DeafChurch"
                    ? "text-gold-700 hover:text-gold-800 hover:bg-gold-50"
                    : "text-navy-700 hover:text-navy-900 hover:bg-navy-50"
                )}
                onClick={(e) => {
                  if (item.name === "DeafChurch") {
                    handleDeafChurchClick(e);
                  }
                  setMobileMenuOpen(false);
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
