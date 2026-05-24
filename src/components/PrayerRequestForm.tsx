"use client";

import { FormEvent, useState } from "react";

export function PrayerRequestForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    request: "",
    isUrgent: false,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/prayer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = (await response.json()) as { success?: boolean; message?: string; error?: string };

      if (response.ok && data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", request: "", isUrgent: false });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Unable to submit. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <h3 className="font-display text-xl font-semibold text-green-900 mb-2">
          Prayer Request Received
        </h3>
        <p className="text-green-800">
          Thank you for sharing. Our prayer team will be lifting you up in prayer.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm text-green-700 underline hover:text-green-900"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className="block text-sm font-medium text-navy-800 mb-1">Your Name *</span>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
          required
          className="w-full px-4 py-3 rounded-lg border border-navy-200 bg-white text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
        />
      </label>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="block text-sm font-medium text-navy-800 mb-1">Email</span>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
            className="w-full px-4 py-3 rounded-lg border border-navy-200 bg-white text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-navy-800 mb-1">Phone</span>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
            className="w-full px-4 py-3 rounded-lg border border-navy-200 bg-white text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
        </label>
      </div>

      <label className="block">
        <span className="block text-sm font-medium text-navy-800 mb-1">Prayer Request *</span>
        <textarea
          value={formData.request}
          onChange={(e) => setFormData((p) => ({ ...p, request: e.target.value }))}
          required
          rows={5}
          minLength={10}
          placeholder="Share your prayer need..."
          className="w-full px-4 py-3 rounded-lg border border-navy-200 bg-white text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500 resize-y"
        />
      </label>

      <label className="flex items-center gap-2 text-sm text-navy-700">
        <input
          type="checkbox"
          checked={formData.isUrgent}
          onChange={(e) => setFormData((p) => ({ ...p, isUrgent: e.target.checked }))}
          className="rounded border-navy-300 text-gold-600 focus:ring-gold-500"
        />
        This is an urgent prayer need
      </label>

      {errorMessage && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full px-4 py-3 bg-navy-900 hover:bg-navy-800 text-white font-semibold rounded-lg disabled:opacity-50 transition-colors"
      >
        {status === "loading" ? "Submitting..." : "Submit Prayer Request"}
      </button>

      <p className="text-xs text-navy-500 text-center">
        Your request is kept confidential and shared only with our prayer team.
      </p>
    </form>
  );
}
