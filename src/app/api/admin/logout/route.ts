import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE_NAME } from "@/lib/adminSession";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE_NAME);

  const url = request.nextUrl ?? new URL(request.url);
  const redirectTo = url.searchParams.get("redirect") || "/admin";
  const destination = redirectTo.startsWith("/") ? redirectTo : "/admin";

  return NextResponse.redirect(new URL(destination, request.url));
}
