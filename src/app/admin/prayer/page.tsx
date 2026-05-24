import { requireAdminAuth } from "@/lib/requireAdminAuth";
import { getDb, prayerRequests } from "@/db";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";
import { Heart, Mail, Phone, Calendar, User } from "lucide-react";

export default async function AdminPrayerPage() {
  await requireAdminAuth("/admin/prayer");

  let requests: Array<{
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    request: string;
    isUrgent: boolean;
    status: string;
    createdAt: string;
  }> = [];

  try {
    if (process.env.DB) {
      const db = getDb(process.env.DB);
      requests = await db
        .select()
        .from(prayerRequests)
        .orderBy(desc(prayerRequests.createdAt))
        .limit(100);
    }
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-navy-900">Prayer Requests</h1>
            <p className="text-sm text-navy-600 mt-1">{requests.length} total requests</p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin" className="px-4 py-2 text-sm font-medium text-navy-700 bg-white border border-navy-300 rounded-lg hover:bg-navy-50">
              Admin Dashboard
            </Link>
            <AdminLogoutButton className="px-4 py-2 text-sm font-medium text-white bg-navy-600 rounded-lg hover:bg-navy-700" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
        {requests.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <Heart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-900 mb-2">No prayer requests yet</h2>
            <p className="text-slate-600">Requests submitted at /connect/prayer will appear here.</p>
          </div>
        ) : (
          requests.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-navy-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-navy-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-900">{item.name}</h3>
                    <p className="text-sm text-navy-600 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {item.isUrgent && (
                    <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                      Urgent
                    </span>
                  )}
                  <span className="px-2 py-1 text-xs font-medium bg-gold-100 text-gold-800 rounded-full capitalize">
                    {item.status}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mb-4 text-sm text-navy-600">
                {item.email && (
                  <a href={`mailto:${item.email}`} className="flex items-center gap-1 hover:text-navy-900">
                    <Mail className="w-4 h-4" /> {item.email}
                  </a>
                )}
                {item.phone && (
                  <a href={`tel:${item.phone}`} className="flex items-center gap-1 hover:text-navy-900">
                    <Phone className="w-4 h-4" /> {item.phone}
                  </a>
                )}
              </div>
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <p className="text-sm text-navy-700 whitespace-pre-wrap">{item.request}</p>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
