"use client";

import { useState, type FormEvent, useRef, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function ContactForm({ contactEmail }: { contactEmail: string }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Nothing previously told a screen reader that a submit had failed, and
  // focus stayed on the button, so the only signal was visual. Focus moves to
  // the summary and it announces itself.
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const errorList = Object.entries(errors);

  useEffect(() => {
    if (submitAttempted && errorList.length > 0) {
      errorSummaryRef.current?.focus();
    }
  }, [submitAttempted, errorList.length]);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitAttempted(true);

    if (!validateForm()) {
      return;
    }

    setStatus("submitting");

    try {
      // Using Formspree - replace with your form ID
      // Sign up at https://formspree.io and create a form to get your ID
      const response = await fetch("https://formspree.io/f/xwpkdjqw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _subject: `[CTK Website] ${formData.subject}`,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Form submission failed");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="bg-sage-50 border border-sage-200 rounded-xl p-8 text-center"
      >
        <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-sage-600" />
        </div>
        <h3 className="font-display text-xl font-semibold text-navy-900 mb-2">
          Message Sent!
        </h3>
        <p className="text-navy-600 mb-6">
          Thank you for reaching out. We&apos;ll get back to you as soon as possible.
        </p>
        <Button
          onClick={() => setStatus("idle")}
          variant="outline"
          size="sm"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {submitAttempted && errorList.length > 0 && (
        <div
          ref={errorSummaryRef}
          tabIndex={-1}
          role="alert"
          className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-medium text-red-800">
              {errorList.length === 1
                ? "There is 1 problem with this form"
                : `There are ${errorList.length} problems with this form`}
            </p>
            <ul className="text-sm text-red-700 mt-1 space-y-1">
              {errorList.map(([field, message]) => (
                <li key={field}>
                  <a href={`#${field}`} className="underline">
                    {message}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {status === "error" && (
        <div
          role="alert"
          className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-medium text-red-800">Something went wrong</p>
            <p className="text-sm text-red-600">
              Please try again or contact us directly at{" "}
              <a href={`mailto:${contactEmail}`} className="underline break-all">
                {contactEmail}
              </a>
            </p>
          </div>
        </div>
      )}

      <p className="text-sm text-navy-700">
        Fields marked <span aria-hidden="true">*</span> are required.
      </p>

      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-navy-900 mb-2"
        >
          Your Name <span className="text-red-600" aria-hidden="true">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border bg-white text-navy-900 placeholder-navy-400
            focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent
            transition-colors ${
              errors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-navy-200 hover:border-navy-300"
            }`}
          placeholder="John Smith"
          required
          aria-required="true"
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-navy-900 mb-2"
        >
          Email Address <span className="text-red-600" aria-hidden="true">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border bg-white text-navy-900 placeholder-navy-400
            focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent
            transition-colors ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-navy-200 hover:border-navy-300"
            }`}
          placeholder="john@example.com"
          required
          aria-required="true"
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      {/* Subject Field */}
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-navy-900 mb-2"
        >
          Subject <span className="text-red-600" aria-hidden="true">*</span>
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border bg-white text-navy-900
            focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent
            transition-colors ${
              errors.subject
                ? "border-red-500 focus:ring-red-500"
                : "border-navy-200 hover:border-navy-300"
            } ${!formData.subject ? "text-navy-400" : ""}`}
          required
          aria-required="true"
          aria-invalid={errors.subject ? "true" : "false"}
          aria-describedby={errors.subject ? "subject-error" : undefined}
        >
          <option value="">Select a subject...</option>
          <option value="General Inquiry">General Inquiry</option>
          <option value="Visiting Information">Visiting Information</option>
          <option value="Prayer Request">Prayer Request</option>
          <option value="Membership">Membership</option>
          <option value="Deaf Church">Deaf Church</option>
          <option value="Volunteer Opportunities">Volunteer Opportunities</option>
          <option value="Other">Other</option>
        </select>
        {errors.subject && (
          <p id="subject-error" className="mt-1 text-sm text-red-600">
            {errors.subject}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-navy-900 mb-2"
        >
          Message <span className="text-red-600" aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={`w-full px-4 py-3 rounded-lg border bg-white text-navy-900 placeholder-navy-400
            focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent
            transition-colors resize-none ${
              errors.message
                ? "border-red-500 focus:ring-red-500"
                : "border-navy-200 hover:border-navy-300"
            }`}
          placeholder="How can we help you?"
          required
          aria-required="true"
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="secondary"
        size="lg"
        disabled={status === "submitting"}
        className="w-full"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send Message
          </>
        )}
      </Button>

      <p className="text-xs text-navy-500 text-center">
        By submitting this form, you agree to be contacted regarding your inquiry.
      </p>
    </form>
  );
}
