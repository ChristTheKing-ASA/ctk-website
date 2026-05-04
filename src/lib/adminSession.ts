const ONE_DAY_IN_SECONDS = 60 * 60 * 24;

export const ADMIN_SESSION_COOKIE_NAME = "ctk_admin_session";
export const ADMIN_SESSION_TTL_SECONDS = ONE_DAY_IN_SECONDS;

const encoder = new TextEncoder();

function toHex(bytes: ArrayBuffer): string {
  return Array.from(new Uint8Array(bytes))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function secureStringEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return mismatch === 0;
}

async function hmacSha256Hex(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return toHex(signature);
}

export function getAdminPassword(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  return password && password.trim().length > 0 ? password : null;
}

export function getAdminSessionSecret(): string | null {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD;
  return secret && secret.trim().length > 0 ? secret : null;
}

export async function createAdminSessionCookieValue(
  password: string,
  secret: string,
  issuedAtMs = Date.now(),
): Promise<string> {
  const expiresAt = issuedAtMs + ADMIN_SESSION_TTL_SECONDS * 1000;
  const payload = `${expiresAt}.${password}`;
  const signature = await hmacSha256Hex(payload, secret);
  return `${expiresAt}.${signature}`;
}

export async function verifyAdminSessionCookie(
  cookieValue: string | undefined,
  password: string,
  secret: string,
  nowMs = Date.now(),
): Promise<boolean> {
  if (!cookieValue) {
    return false;
  }

  const segments = cookieValue.split(".");
  if (segments.length !== 2) {
    return false;
  }

  const [expiresAtRaw, providedSignature] = segments;
  const expiresAt = Number(expiresAtRaw);

  if (!Number.isFinite(expiresAt)) {
    return false;
  }

  if (expiresAt <= nowMs) {
    return false;
  }

  const expectedSignature = await hmacSha256Hex(`${expiresAt}.${password}`, secret);
  return secureStringEqual(expectedSignature, providedSignature);
}