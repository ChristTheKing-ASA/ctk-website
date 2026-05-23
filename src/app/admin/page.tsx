import { redirect } from "next/navigation";
import { AdminAuthGate } from "@/components/admin/AdminAuthGate";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { isAdminAuthConfigured, isAdminAuthenticated } from "@/lib/requireAdminAuth";

interface AdminPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = (await searchParams) ?? {};
  const configError = params.error === "auth-not-configured";
  const nextParam = typeof params.next === "string" ? params.next : undefined;

  if (!isAdminAuthConfigured()) {
    return (
      <main className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
        <section className="w-full max-w-lg bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <h1 className="text-2xl font-semibold text-slate-900 mb-3">Admin Auth Not Configured</h1>
          <p className="text-slate-700 mb-2">
            Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET in your environment before using the admin panel.
          </p>
          <p className="text-sm text-slate-600">
            Add those values to your local environment file and restart the app.
          </p>
        </section>
      </main>
    );
  }

  const isAuthenticated = await isAdminAuthenticated();

  if (isAuthenticated) {
    if (nextParam) {
      redirect(nextParam);
    }

    return <AdminDashboard />;
  }

  return <AdminAuthGate next={nextParam} configError={configError} />;
}
