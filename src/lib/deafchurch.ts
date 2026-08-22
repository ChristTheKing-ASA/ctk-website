export type DeafChurchCopySource = {
  name?: string | null;
  tagline?: string | null;
  description?: string | null;
  badge?: string | null;
} | null;

export function deafChurchPublicCopy(data: DeafChurchCopySource) {
  return {
    name: data?.name?.trim() || "DeafChurch First Coast",
    tagline: data?.tagline?.trim() || "",
    description: data?.description?.trim() || "",
    badge: data?.badge?.trim() || "Host Church",
  };
}

/**
 * Body copy for every DeafChurch card on the site.
 *
 * Craig (and Terri) edit `description` under DeafChurch. The homepage used to
 * concatenate a separate Home-page field that still said "Anchor Church", so
 * a save in Keystatic looked saved and the live site did not change.
 */
export function deafChurchCardBody(
  data: DeafChurchCopySource,
  fallback?: string | null
) {
  return (
    data?.description?.trim() ||
    [data?.tagline?.trim(), fallback?.trim()].filter(Boolean).join(" ")
  );
}
