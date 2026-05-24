import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getDb, contactSubmissions } from "@/db";
import {
  ADMIN_SESSION_COOKIE_NAME,
  getAdminPassword,
  getAdminSessionSecret,
  verifyAdminSessionCookie,
} from "@/lib/adminSession";

const statusSchema = z.object({
  status: z.enum(["new", "read", "responded", "archived"]),
});

async function requireAdminSession(request: NextRequest): Promise<boolean> {
  const password = getAdminPassword();
  const sessionSecret = getAdminSessionSecret();
  if (!password || !sessionSecret) return false;

  const sessionCookie = request.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value;
  return verifyAdminSessionCookie(sessionCookie, password, sessionSecret);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await requireAdminSession(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const submissionId = Number(id);
  if (!Number.isFinite(submissionId)) {
    return NextResponse.json({ error: "Invalid submission ID" }, { status: 400 });
  }

  const body = await request.json();
  const parsed = statusSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  if (!process.env.DB) {
    return NextResponse.json({ error: "Database not available" }, { status: 503 });
  }

  const db = getDb(process.env.DB);
  await db
    .update(contactSubmissions)
    .set({
      status: parsed.data.status,
      respondedAt: parsed.data.status === "responded" ? new Date().toISOString() : undefined,
    })
    .where(eq(contactSubmissions.id, submissionId));

  return NextResponse.json({ success: true });
}
