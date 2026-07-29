import KeystaticApp from "./keystatic";
import {
  KEYSTATIC_RECOVERY_PARAM,
  getKeystaticRootPath,
} from "@/lib/keystatic-routing";

export default function Layout() {
  const keystaticRoot = getKeystaticRootPath(
    process.env.NEXT_PUBLIC_BASE_PATH || ""
  );
  const restoreScript = `
    (() => {
      try {
        const current = new URL(window.location.href);
        const original = current.searchParams.get(${JSON.stringify(KEYSTATIC_RECOVERY_PARAM)});
        if (!original) return;
        const target = new URL(original, current.origin);
        const root = ${JSON.stringify(keystaticRoot)};
        const isEditorPath =
          target.pathname === root || target.pathname.startsWith(root + "/");
        if (target.origin !== current.origin || !isEditorPath) return;
        window.history.replaceState(
          window.history.state,
          "",
          target.pathname + target.search + target.hash
        );
      } catch {
        // A malformed recovery value should leave the editor at its safe root.
      }
    })();
  `;

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: restoreScript }} />
      <KeystaticApp />
    </>
  );
}
