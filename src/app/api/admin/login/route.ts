import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE_NAME,
  ADMIN_SESSION_TTL_SECONDS,
  createAdminSessionCookieValue,
  getAdminPassword,
  getAdminSessionSecret,
} from "@/lib/adminSession";

interface LoginPayload {
  password?: string;
}

export async function POST(request: Request) {
  const adminPassword = getAdminPassword();
  const sessionSecret = getAdminSessionSecret();

  if (!adminPassword || !sessionSecret) {
    return NextResponse.json({ error: "Admin authentication is not configured" }, { status: 503 });
  }

  let payload: LoginPayload;
  try {
    payload = (await request.json()) as LoginPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (payload.password !== adminPassword) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const cookieValue = await createAdminSessionCookieValue(adminPassword, sessionSecret);

  const cookieStore = await cookies();
  cookieStore.set({
    name: ADMIN_SESSION_COOKIE_NAME,
    value: cookieValue,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_SESSION_TTL_SECONDS,
  });

  return NextResponse.json({ ok: true });
}
