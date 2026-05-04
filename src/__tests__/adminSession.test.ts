import {
  createAdminSessionCookieValue,
  verifyAdminSessionCookie,
} from "@/lib/adminSession";

describe("admin session cookie", () => {
  const password = "test-password";
  const secret = "test-secret";

  it("accepts a valid session cookie", async () => {
    const nowMs = 1_700_000_000_000;
    const cookie = await createAdminSessionCookieValue(password, secret, nowMs);

    await expect(
      verifyAdminSessionCookie(cookie, password, secret, nowMs + 1_000),
    ).resolves.toBe(true);
  });

  it("rejects malformed cookie values", async () => {
    await expect(verifyAdminSessionCookie("invalid", password, secret)).resolves.toBe(false);
    await expect(verifyAdminSessionCookie("abc.def", password, secret)).resolves.toBe(false);
  });

  it("rejects a tampered signature", async () => {
    const nowMs = 1_700_000_000_000;
    const cookie = await createAdminSessionCookieValue(password, secret, nowMs);

    const tampered = cookie.endsWith("0") ? `${cookie.slice(0, -1)}1` : `${cookie.slice(0, -1)}0`;

    await expect(
      verifyAdminSessionCookie(tampered, password, secret, nowMs + 1_000),
    ).resolves.toBe(false);
  });

  it("rejects expired cookies", async () => {
    const nowMs = 1_700_000_000_000;
    const cookie = await createAdminSessionCookieValue(password, secret, nowMs);

    const expiredNow = nowMs + 24 * 60 * 60 * 1000 + 1;

    await expect(verifyAdminSessionCookie(cookie, password, secret, expiredNow)).resolves.toBe(false);
  });

  it("rejects cookies when password changes", async () => {
    const nowMs = 1_700_000_000_000;
    const cookie = await createAdminSessionCookieValue(password, secret, nowMs);

    await expect(
      verifyAdminSessionCookie(cookie, "different-password", secret, nowMs + 1_000),
    ).resolves.toBe(false);
  });
});
