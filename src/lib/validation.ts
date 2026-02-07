// Contact form validation helpers

// Email validation regex (RFC 5322 simplified)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (US formats)
const phoneRegex = /^[\d\s\-().+]+$/;

export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;
  return emailRegex.test(email.trim());
}

export function isValidPhone(phone: string): boolean {
  if (!phone || typeof phone !== "string") return false;
  const cleaned = phone.replace(/[\s\-().]/g, "");
  return phoneRegex.test(phone) && cleaned.length >= 10 && cleaned.length <= 15;
}

export function isValidName(name: string): boolean {
  if (!name || typeof name !== "string") return false;
  return name.trim().length >= 2 && name.trim().length <= 100;
}

export function isValidMessage(
  message: string,
  minLength = 10,
  maxLength = 2000
): boolean {
  if (!message || typeof message !== "string") return false;
  const trimmed = message.trim();
  return trimmed.length >= minLength && trimmed.length <= maxLength;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: Record<string, string> = {};

  if (!isValidName(data.name)) {
    errors.name = "Please enter a valid name (2-100 characters)";
  }

  if (!isValidEmail(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (data.phone && !isValidPhone(data.phone)) {
    errors.phone = "Please enter a valid phone number";
  }

  if (!isValidMessage(data.message)) {
    errors.message = "Message must be between 10 and 2000 characters";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
