import { requireAdminAuth } from "@/lib/requireAdminAuth";
import { getDb, contactSubmissions } from "@/db";
import { desc } from "drizzle-orm";
import { Mail, Phone, Calendar, User, MessageSquare } from "lucide-react";
import Link from "next/link";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";
import { SubmissionStatusButton } from "@/components/admin/SubmissionStatusButton";

export default async function SubmissionsPage() {
  await requireAdminAuth("/admin/submissions");

  let submissions: Array<{
    id: number;
    name: string;
    email: string;
    phone: string | null;
    subject: string;
    message: string;
    status: string;
    createdAt: string;
  }> = [];

  try {
    if (process.env.DB) {
      const db = getDb(process.env.DB);
      submissions = await db
        .select()
        .from(contactSubmissions)
        .orderBy(desc(contactSubmissions.createdAt))
        .limit(100);
    }
  } catch (error) {
    console.error("Failed to fetch submissions:", error);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-navy-900">
                Contact Form Submissions
              </h1>
              <p className="text-sm text-navy-600 mt-1">
                {submissions.length} total submissions
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/admin"
                className="px-4 py-2 text-sm font-medium text-navy-700 bg-white border border-navy-300 rounded-lg hover:bg-navy-50 transition-colors"
              >
                Admin Dashboard
              </Link>
              <Link
                href="/keystatic"
                className="px-4 py-2 text-sm font-medium text-navy-700 bg-white border border-navy-300 rounded-lg hover:bg-navy-50 transition-colors"
              >
                CMS Dashboard
              </Link>
              <AdminLogoutButton className="px-4 py-2 text-sm font-medium text-white bg-navy-600 rounded-lg hover:bg-navy-700 transition-colors" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {submissions.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <MessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              No submissions yet
            </h2>
            <p className="text-slate-600">
              Contact form submissions will appear here once people start
              reaching out.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-navy-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-navy-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-900">
                        {submission.name}
                      </h3>
                      <p className="text-sm text-navy-600">
                        {submission.subject}
                      </p>
                    </div>
                  </div>
                  <SubmissionStatusButton
                    submissionId={submission.id}
                    currentStatus={submission.status}
                  />
                </div>

                <div className="flex flex-wrap gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-navy-600">
                    <Mail className="w-4 h-4" />
                    <a
                      href={`mailto:${submission.email}`}
                      className="hover:text-navy-900 hover:underline"
                    >
                      {submission.email}
                    </a>
                  </div>
                  {submission.phone && (
                    <div className="flex items-center gap-2 text-navy-600">
                      <Phone className="w-4 h-4" />
                      <a
                        href={`tel:${submission.phone}`}
                        className="hover:text-navy-900 hover:underline"
                      >
                        {submission.phone}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-navy-600">
                    <Calendar className="w-4 h-4" />
                    {new Date(submission.createdAt).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <p className="text-sm text-navy-700 whitespace-pre-wrap">
                    {submission.message}
                  </p>
                </div>

                <div className="mt-4 flex gap-2">
                  <a
                    href={`mailto:${submission.email}?subject=Re: ${submission.subject}`}
                    className="px-4 py-2 text-sm font-medium text-white bg-navy-600 rounded-lg hover:bg-navy-700 transition-colors"
                  >
                    Reply via Email
                  </a>
                  {submission.phone && (
                    <a
                      href={`tel:${submission.phone}`}
                      className="px-4 py-2 text-sm font-medium text-navy-700 bg-white border border-navy-300 rounded-lg hover:bg-navy-50 transition-colors"
                    >
                      Call
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
