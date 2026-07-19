"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  useEffect(() => {
    // Static export only prerenders /keystatic itself, so a refresh on a
    // deep admin URL lands here — send editors back to the admin dashboard.
    if (window.location.pathname.includes("/keystatic")) {
      window.location.replace("/keystatic/");
    }
  }, []);

  return (
    <Section background="white">
      <div className="max-w-xl mx-auto text-center py-24">
        <p className="text-gold-600 text-sm font-semibold uppercase tracking-wide mb-4">
          404
        </p>
        <h1 className="font-display text-3xl font-bold text-navy-900 mb-4">
          Page not found
        </h1>
        <p className="text-navy-600 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Button href="/">Back to Home</Button>
      </div>
    </Section>
  );
}
