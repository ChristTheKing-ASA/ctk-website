import Link from "next/link";
import { FileText, Inbox, LayoutDashboard, Heart, Mail } from "lucide-react";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";

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
              Manage content, review submissions, and monitor church communications.
            </p>
          </div>
          <AdminLogoutButton />
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/keystatic"
            className="group bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all"
          >
            <FileText className="w-8 h-8 text-navy-600 mb-4" />
            <h2 className="text-lg font-semibold text-slate-900 group-hover:text-navy-700">
              Content Management
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Edit church info, clergy, missions, activities, and announcements.
            </p>
          </Link>

          <Link
            href="/admin/submissions"
            className="group bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all"
          >
            <Inbox className="w-8 h-8 text-navy-600 mb-4" />
            <h2 className="text-lg font-semibold text-slate-900 group-hover:text-navy-700">
              Contact Submissions
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Review and respond to contact form messages.
            </p>
          </Link>

          <Link
            href="/admin/prayer"
            className="group bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all"
          >
            <Heart className="w-8 h-8 text-navy-600 mb-4" />
            <h2 className="text-lg font-semibold text-slate-900 group-hover:text-navy-700">
              Prayer Requests
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              View confidential prayer requests from the website.
            </p>
          </Link>

          <Link
            href="/admin/newsletter"
            className="group bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all"
          >
            <Mail className="w-8 h-8 text-navy-600 mb-4" />
            <h2 className="text-lg font-semibold text-slate-900 group-hover:text-navy-700">
              Newsletter Subscribers
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              View email subscribers from the website footer.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
