import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock Resend
vi.mock("resend", () => {
  return {
    Resend: vi.fn().mockImplementation(() => ({
      emails: {
        send: vi.fn().mockResolvedValue({
          data: { id: "test-email-id" },
        }),
      },
    })),
  };
});

describe("Email Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should have email service functions", async () => {
    const { sendContactFormEmail, sendContactFormAutoReply } = await import(
      "@/lib/email"
    );

    expect(sendContactFormEmail).toBeDefined();
    expect(sendContactFormAutoReply).toBeDefined();
  });

  it("should send contact form email with correct data", async () => {
    const { sendContactFormEmail } = await import("@/lib/email");

    const testData = {
      name: "John Doe",
      email: "john@example.com",
      subject: "Test Subject",
      message: "Test message",
    };

    const result = await sendContactFormEmail(testData);

    expect(result.success).toBe(true);
    expect(result.id).toBe("test-email-id");
  });

  it("should send auto-reply email", async () => {
    const { sendContactFormAutoReply } = await import("@/lib/email");

    const testData = {
      name: "John Doe",
      email: "john@example.com",
      subject: "Test Subject",
      message: "Test message",
    };

    const result = await sendContactFormAutoReply(testData);

    expect(result.success).toBe(true);
    expect(result.id).toBe("test-email-id");
  });
});
