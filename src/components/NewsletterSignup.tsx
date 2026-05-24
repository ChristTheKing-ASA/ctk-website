"use client";

import { FormEvent, useState } from "react";

interface NewsletterSignupProps {
  compact?: boolean;
}

export function NewsletterSignup({ compact = false }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: name || undefined }),
      });

      const data = (await response.json()) as { success?: boolean; message?: string; error?: string };

      if (response.ok && data.success) {
        setStatus("success");
        setMessage(data.message || "Subscribed!");
        setEmail("");
        setName("");
      } else {
        setStatus("error");
        setMessage(data.error || "Unable to subscribe. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          required
          className="flex-1 px-3 py-2 rounded-lg bg-navy-800 border border-navy-700 text-white placeholder-navy-400 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-4 py-2 bg-gold-500 hover:bg-gold-600 text-white text-sm font-semibold rounded-lg disabled:opacity-50 transition-colors"
        >
          {status === "loading" ? "..." : "Subscribe"}
        </button>
        {message && (
          <p className={`text-xs sm:col-span-2 ${status === "success" ? "text-gold-400" : "text-red-400"}`}>
            {message}
          </p>
        )}
      </form>
    );
  }

  return (
    <div className="bg-cream-50 rounded-xl p-6 border border-cream-200">
      <h3 className="font-display text-lg font-semibold text-navy-900 mb-2">
        Stay Connected
      </h3>
      <p className="text-sm text-navy-600 mb-4">
        Subscribe to receive church news and updates.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name (optional)"
          className="w-full px-3 py-2 rounded-lg border border-navy-200 text-navy-900 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          required
          className="w-full px-3 py-2 rounded-lg border border-navy-200 text-navy-900 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white text-sm font-semibold rounded-lg disabled:opacity-50 transition-colors"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe to Newsletter"}
        </button>
        {message && (
          <p className={`text-sm ${status === "success" ? "text-green-700" : "text-red-700"}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
