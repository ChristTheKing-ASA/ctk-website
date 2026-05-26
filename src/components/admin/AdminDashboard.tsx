import Link from "next/link";
import {
  FileText,
  Inbox,
  LayoutDashboard,
  Heart,
  Mail,
  Settings,
  Pencil,
} from "lucide-react";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";
import { adminCommunicationAreas } from "@/lib/adminContentAreas";

export function AdminDashboard() {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <LayoutDashboard className="w-7 h-7 text-slate-700" />
              Admin Dashboard
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              You have full access to edit all website content and manage communications.
            </p>
          </div>
          <AdminLogoutButton />
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        {/* Primary workflow */}
        <div>
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
            Website content
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/admin/content"
              className="group sm:col-span-2 bg-navy-900 text-white rounded-xl p-6 shadow-sm hover:bg-navy-800 transition-all"
            >
              <Pencil className="w-8 h-8 text-gold-400 mb-4" />
              <h2 className="text-lg font-semibold mb-2">Edit all website information</h2>
              <p className="text-navy-200 text-sm">
                Church info, beliefs, homepage, team, missions, activities, announcements, and
                DeafChurch — organized checklist with links to each CMS section.
              </p>
            </Link>

            <Link
              href="/keystatic"
              className="group bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all"
            >
              <FileText className="w-8 h-8 text-navy-600 mb-4" />
              <h2 className="text-lg font-semibold text-slate-900 group-hover:text-navy-700">
                Open CMS (Keystatic)
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Full content editor — same data as the checklist above.
              </p>
            </Link>
          </div>
        </div>

        {/* Communications */}
        <div>
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
            Communications
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {adminCommunicationAreas.map((area) => (
              <Link
                key={area.id}
                href={area.href}
                className="group bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all"
              >
                {area.id === "submissions" && <Inbox className="w-8 h-8 text-navy-600 mb-4" />}
                {area.id === "prayer" && <Heart className="w-8 h-8 text-navy-600 mb-4" />}
                {area.id === "newsletter" && <Mail className="w-8 h-8 text-navy-600 mb-4" />}
                <h2 className="text-lg font-semibold text-slate-900 group-hover:text-navy-700">
                  {area.title}
                </h2>
                <p className="text-sm text-slate-600 mt-2">{area.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div>
          <Link
            href="/admin/setup"
            className="group flex items-start gap-4 bg-white rounded-xl border border-gold-200 p-6 shadow-sm hover:shadow-md hover:border-gold-300 transition-all"
          >
            <Settings className="w-8 h-8 text-gold-600 flex-shrink-0" />
            <div>
              <h2 className="text-lg font-semibold text-slate-900 group-hover:text-gold-700">
                Third-party setup
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Resend email, Cloudflare D1, YouTube, Google Maps, and Keystatic GitHub configuration.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
