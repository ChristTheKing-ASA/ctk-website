import Link from "next/link";
import { getAllAnnouncements } from "@/lib/content";
import { Megaphone, ChevronRight } from "lucide-react";

export async function AnnouncementBanner() {
  const announcements = await getAllAnnouncements();

  if (announcements.length === 0) return null;

  const latest = announcements[0];
  const isImportant = latest?.important;
  const hasMultiple = announcements.length > 1;

  return (
    <div
      className={`${
        isImportant
          ? "bg-gold-500 text-navy-900"
          : "bg-navy-800 text-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-center gap-3 text-sm">
          <Megaphone className="w-4 h-4 flex-shrink-0" />
          <p className="font-medium truncate">{latest?.title}</p>
          {hasMultiple && (
            <Link
              href="/announcements"
              className={`flex items-center gap-1 flex-shrink-0 font-semibold underline underline-offset-2 ${
                isImportant
                  ? "text-navy-900 hover:text-navy-700"
                  : "text-gold-400 hover:text-gold-300"
              }`}
            >
              View all
              <ChevronRight className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
