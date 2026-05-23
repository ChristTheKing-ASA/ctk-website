import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { NextRequest } from "next/server";
import { POST as loginPost } from "@/app/api/admin/login/route";
import { POST as logoutPost } from "@/app/api/admin/logout/route";
import {
  ADMIN_SESSION_COOKIE_NAME,
  createAdminSessionCookieValue,
  verifyAdminSessionCookie,
} from "@/lib/adminSession";

const mockCookieStore = {
  set: vi.fn(),
  delete: vi.fn(),
  get: vi.fn(),
};

vi.mock("next/headers", () => ({
  cookies: vi.fn(() => Promise.resolve(mockCookieStore)),
}));

describe("Admin auth API", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.ADMIN_PASSWORD = "test-admin-password";
    process.env.ADMIN_SESSION_SECRET = "test-session-secret-32-chars-long";
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("rejects login without password", async () => {
    const request = new Request("http://localhost/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: "wrong" }),
    });

    const response = await loginPost(request);
    expect(response.status).toBe(401);
  });

  it("accepts valid login and sets session cookie", async () => {
    const request = new Request("http://localhost/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: "test-admin-password" }),
    });

    const response = await loginPost(request);
    expect(response.status).toBe(200);
    expect(mockCookieStore.set).toHaveBeenCalledWith(
      expect.objectContaining({ name: ADMIN_SESSION_COOKIE_NAME }),
    );
  });

  it("returns 503 when admin auth is not configured", async () => {
    delete process.env.ADMIN_PASSWORD;

    const request = new Request("http://localhost/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: "test-admin-password" }),
    });

    const response = await loginPost(request);
    expect(response.status).toBe(503);
  });

  it("logout redirects to admin login", async () => {
    const request = new NextRequest("http://localhost/api/admin/logout", {
      method: "POST",
    });

    const response = await logoutPost(request);
    expect([307, 308]).toContain(response.status);
    expect(response.headers.get("location")).toContain("/admin");
    expect(mockCookieStore.delete).toHaveBeenCalledWith(ADMIN_SESSION_COOKIE_NAME);
  });

  it("creates verifiable session tokens", async () => {
    const cookie = await createAdminSessionCookieValue(
      "test-admin-password",
      "test-session-secret-32-chars-long",
    );

    const isValid = await verifyAdminSessionCookie(
      cookie,
      "test-admin-password",
      "test-session-secret-32-chars-long",
    );
    expect(isValid).toBe(true);
  });
});
