import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import {
  KEYSTATIC_RECOVERY_PARAM,
  getKeystaticRootPath,
} from "@/lib/keystatic-routing";

export default function NotFound() {
  const keystaticRoot = getKeystaticRootPath(
    process.env.NEXT_PUBLIC_BASE_PATH || ""
  );
  const recoveryScript = `
    (() => {
      try {
        const current = new URL(window.location.href);
        const root = ${JSON.stringify(keystaticRoot)};
        const isEditorPath =
          current.pathname === root || current.pathname.startsWith(root + "/");
        if (!isEditorPath) return;
        const recovery = new URL(root + "/", current.origin);
        recovery.searchParams.set(
          ${JSON.stringify(KEYSTATIC_RECOVERY_PARAM)},
          current.pathname + current.search + current.hash
        );
        window.location.replace(recovery);
      } catch {
        // A malformed URL should remain on the normal not-found page.
      }
    })();
  `;

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: recoveryScript }} />
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
    </>
  );
}
