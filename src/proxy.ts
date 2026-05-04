import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE_NAME,
  getAdminPassword,
  getAdminSessionSecret,
  verifyAdminSessionCookie,
} from "@/lib/adminSession";

function isProtectedPath(pathname: string): boolean {
  return pathname.startsWith("/keystatic") || pathname.startsWith("/api/keystatic");
}

export default async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  const password = getAdminPassword();
  const sessionSecret = getAdminSessionSecret();

  if (!password || !sessionSecret) {
    if (pathname.startsWith("/api/keystatic")) {
      return NextResponse.json(
        { error: "Admin authentication is not configured" },
        { status: 503 },
      );
    }

    const setupUrl = new URL("/admin?error=auth-not-configured", request.url);
    return NextResponse.redirect(setupUrl);
  }

  const sessionCookie = request.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value;
  const isAuthenticated = await verifyAdminSessionCookie(sessionCookie, password, sessionSecret);

  if (isAuthenticated) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/keystatic")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/admin", request.url);
  loginUrl.searchParams.set("next", `${pathname}${search}`);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/keystatic/:path*", "/api/keystatic/:path*"],
};
