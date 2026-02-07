import { describe, it, expect } from "vitest";
import {
  isValidEmail,
  isValidPhone,
  isValidName,
  isValidMessage,
  validateContactForm,
} from "@/lib/validation";

describe("Email Validation", () => {
  it("should validate correct email addresses", () => {
    expect(isValidEmail("test@example.com")).toBe(true);
    expect(isValidEmail("user.name@domain.co.uk")).toBe(true);
    expect(isValidEmail("user+tag@example.org")).toBe(true);
  });

  it("should reject invalid email addresses", () => {
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("invalid")).toBe(false);
    expect(isValidEmail("no@domain")).toBe(false);
    expect(isValidEmail("@missing-local.com")).toBe(false);
    expect(isValidEmail("missing-at-sign.com")).toBe(false);
  });

  it("should handle edge cases", () => {
    expect(isValidEmail(null as unknown as string)).toBe(false);
    expect(isValidEmail(undefined as unknown as string)).toBe(false);
    expect(isValidEmail("   test@example.com   ")).toBe(true); // Trimmed
  });
});

describe("Phone Validation", () => {
  it("should validate correct phone numbers", () => {
    expect(isValidPhone("904-460-2318")).toBe(true);
    expect(isValidPhone("(904) 460-2318")).toBe(true);
    expect(isValidPhone("904.460.2318")).toBe(true);
    expect(isValidPhone("+1 904 460 2318")).toBe(true);
    expect(isValidPhone("9044602318")).toBe(true);
  });

  it("should reject invalid phone numbers", () => {
    expect(isValidPhone("")).toBe(false);
    expect(isValidPhone("123")).toBe(false);
    expect(isValidPhone("abc-def-ghij")).toBe(false);
    expect(isValidPhone("12345678901234567")).toBe(false); // Too long
  });

  it("should handle edge cases", () => {
    expect(isValidPhone(null as unknown as string)).toBe(false);
    expect(isValidPhone(undefined as unknown as string)).toBe(false);
  });
});

describe("Name Validation", () => {
  it("should validate correct names", () => {
    expect(isValidName("John Doe")).toBe(true);
    expect(isValidName("Jo")).toBe(true);
    expect(isValidName("Mary Jane Watson-Parker")).toBe(true);
  });

  it("should reject invalid names", () => {
    expect(isValidName("")).toBe(false);
    expect(isValidName("J")).toBe(false);
    expect(isValidName("   ")).toBe(false); // Only whitespace
    expect(isValidName("A".repeat(101))).toBe(false); // Too long
  });

  it("should handle edge cases", () => {
    expect(isValidName(null as unknown as string)).toBe(false);
    expect(isValidName(undefined as unknown as string)).toBe(false);
    expect(isValidName("  John  ")).toBe(true); // Trimmed
  });
});

describe("Message Validation", () => {
  it("should validate correct messages", () => {
    expect(isValidMessage("This is a valid message.")).toBe(true);
    expect(isValidMessage("A".repeat(10))).toBe(true); // Minimum
    expect(isValidMessage("B".repeat(2000))).toBe(true); // Maximum
  });

  it("should reject invalid messages", () => {
    expect(isValidMessage("")).toBe(false);
    expect(isValidMessage("Short")).toBe(false); // Too short
    expect(isValidMessage("C".repeat(2001))).toBe(false); // Too long
  });

  it("should respect custom length parameters", () => {
    expect(isValidMessage("Hi", 2, 10)).toBe(true);
    expect(isValidMessage("Hello there!", 5, 15)).toBe(true);
    expect(isValidMessage("A", 2, 10)).toBe(false);
  });

  it("should handle edge cases", () => {
    expect(isValidMessage(null as unknown as string)).toBe(false);
    expect(isValidMessage(undefined as unknown as string)).toBe(false);
  });
});

describe("Contact Form Validation", () => {
  it("should validate a complete valid form", () => {
    const result = validateContactForm({
      name: "John Doe",
      email: "john@example.com",
      message: "This is a test message.",
    });
    expect(result.isValid).toBe(true);
    expect(Object.keys(result.errors)).toHaveLength(0);
  });

  it("should validate form with optional phone", () => {
    const result = validateContactForm({
      name: "John Doe",
      email: "john@example.com",
      phone: "904-460-2318",
      message: "This is a test message.",
    });
    expect(result.isValid).toBe(true);
  });

  it("should return errors for invalid name", () => {
    const result = validateContactForm({
      name: "",
      email: "john@example.com",
      message: "This is a test message.",
    });
    expect(result.isValid).toBe(false);
    expect(result.errors.name).toBeDefined();
  });

  it("should return errors for invalid email", () => {
    const result = validateContactForm({
      name: "John Doe",
      email: "invalid-email",
      message: "This is a test message.",
    });
    expect(result.isValid).toBe(false);
    expect(result.errors.email).toBeDefined();
  });

  it("should return errors for invalid phone when provided", () => {
    const result = validateContactForm({
      name: "John Doe",
      email: "john@example.com",
      phone: "123",
      message: "This is a test message.",
    });
    expect(result.isValid).toBe(false);
    expect(result.errors.phone).toBeDefined();
  });

  it("should return errors for invalid message", () => {
    const result = validateContactForm({
      name: "John Doe",
      email: "john@example.com",
      message: "Short",
    });
    expect(result.isValid).toBe(false);
    expect(result.errors.message).toBeDefined();
  });

  it("should return multiple errors when multiple fields are invalid", () => {
    const result = validateContactForm({
      name: "",
      email: "invalid",
      message: "Short",
    });
    expect(result.isValid).toBe(false);
    expect(result.errors.name).toBeDefined();
    expect(result.errors.email).toBeDefined();
    expect(result.errors.message).toBeDefined();
  });
});
