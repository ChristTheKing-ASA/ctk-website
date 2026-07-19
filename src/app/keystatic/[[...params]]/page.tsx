// Static export only prerenders /keystatic itself; the admin takes over
// routing client-side from there. Deep links that miss are sent back to
// /keystatic by the not-found page.
export function generateStaticParams() {
  return [{ params: [] }];
}

export default function Page() {
  return null;
}
