export const KEYSTATIC_RECOVERY_PARAM = "__ks_path";

function normalizeBasePath(basePath: string) {
  if (!basePath || basePath === "/") {
    return "";
  }
  return `/${basePath.replace(/^\/+|\/+$/g, "")}`;
}

export function getKeystaticRootPath(basePath = "") {
  return `${normalizeBasePath(basePath)}/keystatic`;
}

export function isKeystaticPath(pathname: string, basePath = "") {
  const root = getKeystaticRootPath(basePath);
  return pathname === root || pathname.startsWith(`${root}/`);
}

export function buildKeystaticRecoveryUrl(
  currentUrl: URL,
  basePath = ""
): URL | null {
  if (!isKeystaticPath(currentUrl.pathname, basePath)) {
    return null;
  }

  const recoveryUrl = new URL(
    `${getKeystaticRootPath(basePath)}/`,
    currentUrl.origin
  );
  recoveryUrl.searchParams.set(
    KEYSTATIC_RECOVERY_PARAM,
    `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`
  );
  return recoveryUrl;
}

export function getRecoveredKeystaticUrl(
  recoveryUrl: URL,
  basePath = ""
): URL | null {
  const original = recoveryUrl.searchParams.get(KEYSTATIC_RECOVERY_PARAM);
  if (!original) {
    return null;
  }

  const target = new URL(original, recoveryUrl.origin);
  if (
    target.origin !== recoveryUrl.origin ||
    !isKeystaticPath(target.pathname, basePath)
  ) {
    return null;
  }

  return target;
}
