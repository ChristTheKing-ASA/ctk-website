import Link from "next/link";
import { Megaphone, AlertCircle } from "lucide-react";
import { getAllAnnouncements } from "@/lib/content";

export async function Announcements() {
  const announcements = await getAllAnnouncements();

  if (announcements.length === 0) {
    return null;
  }

  return (
    <section className="bg-gold-50 border-y border-gold-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-3">
          {announcements.map((announcement) => {
            if (!announcement?.title) return null;

            return (
              <div
                key={announcement.slug}
                className={`flex gap-3 rounded-lg p-4 ${
                  announcement.important
                    ? "bg-white border border-gold-300 shadow-sm"
                    : "bg-white/80 border border-gold-200"
                }`}
              >
                {announcement.important ? (
                  <AlertCircle className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <Megaphone className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-navy-900">{announcement.title}</p>
                  <p className="text-navy-700 text-sm mt-1 whitespace-pre-wrap">
                    {announcement.content}
                  </p>
                  {announcement.date && (
                    <p className="text-xs text-navy-500 mt-2">
                      {new Date(announcement.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-navy-500 mt-4 text-center">
          Have questions?{" "}
          <Link href="/connect/contact" className="text-gold-700 hover:text-gold-800 underline">
            Contact us
          </Link>
        </p>
      </div>
    </section>
  );
}
