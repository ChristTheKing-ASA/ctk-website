"use client";

export function AdminLogoutButton({ className }: { className?: string }) {
  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin";
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className={
        className ??
        "px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
      }
    >
      Logout
    </button>
  );
}
