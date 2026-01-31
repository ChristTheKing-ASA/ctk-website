"use client";

import { makePage } from "@keystatic/next/ui/app";
import Link from "next/link";
import { Home } from "lucide-react";
import config from "../../../keystatic.config";
import "./keystatic-overrides.css";

const KeystaticApp = makePage(config);

export default function KeystaticWithBackLink() {
  return (
    <>
      <KeystaticApp />
      {/* Floating home button */}
      <Link
        href="/"
        className="fixed bottom-4 left-4 z-50 flex items-center gap-2 bg-navy-900 text-white px-4 py-2 rounded-full shadow-lg hover:bg-navy-800 transition-colors text-sm font-medium"
      >
        <Home className="w-4 h-4" />
        Home
      </Link>
    </>
  );
}
