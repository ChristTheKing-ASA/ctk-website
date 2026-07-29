// Static export only prerenders /keystatic itself; the admin takes over
// routing client-side from there. Deep links that miss are sent back to
// /keystatic by the not-found page.
export function generateStaticParams() {
  return [
    { params: [] },
    // Keystatic Cloud returns to this URL after authentication. It must be a
    // real exported page so GitHub Pages preserves the OAuth query string.
    { params: ["cloud", "oauth", "callback"] },
  ];
}

export default function Page() {
  return null;
}
