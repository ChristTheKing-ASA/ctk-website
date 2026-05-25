"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const statuses = ["pending", "approved", "praying", "answered", "archived"] as const;

export function PrayerStatusButton({
  requestId,
  currentStatus,
}: {
  requestId: number;
  currentStatus: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  const updateStatus = async (newStatus: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/prayer/${requestId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        setStatus(newStatus);
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <select
      value={status}
      disabled={loading}
      onChange={(e) => updateStatus(e.target.value)}
      className="text-xs border border-slate-300 rounded-md px-2 py-1 bg-white text-navy-700 disabled:opacity-50 capitalize"
    >
      {statuses.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
