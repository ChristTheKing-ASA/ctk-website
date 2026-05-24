import { requireAdminAuth } from "@/lib/requireAdminAuth";
import { getDb, newsletterSubscribers } from "@/db";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";
import { Mail, Users } from "lucide-react";

export default async function AdminNewsletterPage() {
  await requireAdminAuth("/admin/newsletter");

  let subscribers: Array<{
    id: number;
    email: string;
    name: string | null;
    status: string;
    subscribedAt: string;
    source: string;
  }> = [];

  try {
    if (process.env.DB) {
      const db = getDb(process.env.DB);
      subscribers = await db
        .select()
        .from(newsletterSubscribers)
        .orderBy(desc(newsletterSubscribers.subscribedAt))
        .limit(200);
    }
  } catch (error) {
    console.error(error);
  }

  const activeCount = subscribers.filter((s) => s.status === "active").length;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-navy-900">Newsletter Subscribers</h1>
            <p className="text-sm text-navy-600 mt-1">
              {activeCount} active of {subscribers.length} total
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin" className="px-4 py-2 text-sm font-medium text-navy-700 bg-white border border-navy-300 rounded-lg hover:bg-navy-50">
              Admin Dashboard
            </Link>
            <AdminLogoutButton className="px-4 py-2 text-sm font-medium text-white bg-navy-600 rounded-lg hover:bg-navy-700" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {subscribers.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-900 mb-2">No subscribers yet</h2>
            <p className="text-slate-600">Subscribers from the website footer will appear here.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-navy-900">Email</th>
                  <th className="text-left px-4 py-3 font-semibold text-navy-900">Name</th>
                  <th className="text-left px-4 py-3 font-semibold text-navy-900">Status</th>
                  <th className="text-left px-4 py-3 font-semibold text-navy-900">Subscribed</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((sub) => (
                  <tr key={sub.id} className="border-b border-slate-100 last:border-0">
                    <td className="px-4 py-3">
                      <a href={`mailto:${sub.email}`} className="flex items-center gap-1 text-navy-700 hover:text-navy-900">
                        <Mail className="w-3.5 h-3.5" /> {sub.email}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-navy-600">{sub.name || "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                        sub.status === "active" ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-600"
                      }`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-navy-500">
                      {new Date(sub.subscribedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
