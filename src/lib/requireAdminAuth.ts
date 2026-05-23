import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_SESSION_COOKIE_NAME,
  getAdminPassword,
  getAdminSessionSecret,
  verifyAdminSessionCookie,
} from "@/lib/adminSession";

export async function isAdminAuthenticated(): Promise<boolean> {
  const password = getAdminPassword();
  const sessionSecret = getAdminSessionSecret();

  if (!password || !sessionSecret) {
    return false;
  }

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value;
  return verifyAdminSessionCookie(sessionCookie, password, sessionSecret);
}

export async function requireAdminAuth(returnTo?: string): Promise<void> {
  const password = getAdminPassword();
  const sessionSecret = getAdminSessionSecret();

  if (!password || !sessionSecret) {
    redirect("/admin?error=auth-not-configured");
  }

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value;
  const isAuthenticated = await verifyAdminSessionCookie(
    sessionCookie,
    password,
    sessionSecret,
  );

  if (!isAuthenticated) {
    const loginUrl = returnTo
      ? `/admin?next=${encodeURIComponent(returnTo)}`
      : "/admin";
    redirect(loginUrl);
  }
}

export function isAdminAuthConfigured(): boolean {
  return Boolean(getAdminPassword() && getAdminSessionSecret());
}
