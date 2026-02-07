"use client";

import { useState, useEffect, type ReactNode, type FormEvent } from "react";

const AUTH_STORAGE_KEY = "ctk-admin-auth";
const AUTH_EXPIRY_HOURS = 24;

interface AdminAuthGateProps {
  children: ReactNode;
}

export default function AdminAuthGate({ children }: AdminAuthGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    const authData = localStorage.getItem(AUTH_STORAGE_KEY);
    if (authData) {
      try {
        const { expiry } = JSON.parse(authData);
        if (expiry && Date.now() < expiry) {
          setIsAuthenticated(true);
          return;
        }
      } catch {
        // Invalid auth data, clear it
      }
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
    setIsAuthenticated(false);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Small delay to prevent brute force
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check password against the build-time environment variable
    const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (!correctPassword) {
      setError("Admin password not configured. Please set NEXT_PUBLIC_ADMIN_PASSWORD.");
      setIsLoading(false);
      return;
    }

    if (password === correctPassword) {
      // Store auth with expiry
      const expiry = Date.now() + AUTH_EXPIRY_HOURS * 60 * 60 * 1000;
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ expiry }));
      setIsAuthenticated(true);
    } else {
      setError("Incorrect password");
    }
    setIsLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
    setPassword("");
  };

  // Still checking auth status
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="animate-pulse text-slate-500">Loading...</div>
      </div>
    );
  }

  // Not authenticated - show login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-slate-800">Admin Access</h1>
            <p className="text-slate-500 mt-1">
              Enter the admin password to continue
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter password"
                autoFocus
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !password}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Verifying..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            <a
              href="/"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Back to website
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated - render children with logout button
  return (
    <div className="relative">
      {children}
      <button
        onClick={handleLogout}
        className="fixed bottom-4 right-4 z-50 bg-red-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-700 transition-colors text-sm font-medium"
        title="Log out of admin"
      >
        Logout
      </button>
    </div>
  );
}
