import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Normalises a URL typed into Keystatic for use in an href.
 *
 * Editors reasonably enter "www.example.com". Dropped straight into an href
 * that resolves as a relative path against the current page, so the link
 * silently goes to the wrong place instead of failing visibly.
 *
 * Returns null for empty or whitespace-only input so callers can skip
 * rendering the link entirely.
 */
export function normalizeExternalUrl(
  value: string | null | undefined
): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  // Protocol-relative URLs already resolve correctly against an https page.
  if (trimmed.startsWith("//")) return `https:${trimmed}`;
  return `https://${trimmed}`;
}

/**
 * Strips scheme and any trailing slash so a URL reads as a label.
 * "https://www.example.com/" becomes "www.example.com".
 */
export function displayUrl(value: string): string {
  return value.replace(/^https?:\/\//i, "").replace(/\/$/, "");
}
