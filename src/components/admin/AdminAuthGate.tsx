"use client";

import { FormEvent, useMemo, useState } from "react";

interface AdminAuthGateProps {
  next?: string;
  configError?: boolean;
}

export function AdminAuthGate({ next, configError = false }: AdminAuthGateProps) {
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(
    configError ? "Admin auth is not configured on the server." : null,
  );

  const destination = useMemo(() => {
    if (!next || !next.startsWith("/")) {
      return "/keystatic";
    }

    return next;
  }, [next]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as { error?: string };
        setErrorMessage(body.error || "Unable to sign in.");
        return;
      }

      window.location.href = destination;
    } catch {
      setErrorMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <section className="w-full max-w-md bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">Admin Sign In</h1>
        <p className="text-slate-700 mb-6">Enter the admin password to access the content dashboard.</p>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <label className="block">
            <span className="block text-sm font-medium text-slate-800 mb-1">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
              autoComplete="current-password"
              required
            />
          </label>

          {errorMessage ? (
            <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {errorMessage}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting || password.length === 0}
            className="w-full rounded-md bg-slate-900 text-white py-2.5 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </section>
    </main>
  );
}
