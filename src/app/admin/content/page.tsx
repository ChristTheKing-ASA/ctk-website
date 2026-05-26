import Link from "next/link";
import { requireAdminAuth } from "@/lib/requireAdminAuth";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";
import {
  adminContentAreas,
  adminContentCategories,
  type AdminContentCategory,
} from "@/lib/adminContentAreas";
import { ExternalLink, Pencil, Eye } from "lucide-react";

export default async function AdminContentPage() {
  await requireAdminAuth("/admin/content");

  const grouped = (Object.keys(adminContentCategories) as AdminContentCategory[]).map(
    (key) => ({
      key,
      ...adminContentCategories[key],
      areas: adminContentAreas.filter((a) => a.category === key),
    }),
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-navy-900">Edit website content</h1>
            <p className="text-sm text-navy-600 mt-1">
              Full access — update every public page from the CMS below.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin"
              className="px-4 py-2 text-sm font-medium text-navy-700 bg-white border border-navy-300 rounded-lg hover:bg-navy-50"
            >
              Dashboard
            </Link>
            <AdminLogoutButton className="px-4 py-2 text-sm font-medium text-white bg-navy-600 rounded-lg hover:bg-navy-700" />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <div className="bg-gold-50 border border-gold-200 rounded-xl p-5 text-sm text-navy-800">
          <p className="font-semibold mb-2">Admin workflow</p>
          <ol className="list-decimal list-inside space-y-1 text-navy-700">
            <li>Choose a section below and click <strong>Edit in CMS</strong></li>
            <li>Save changes in Keystatic — they apply to the live site after deploy (or immediately in dev)</li>
            <li>Use <strong>Preview</strong> to open the public page and confirm</li>
            <li>Form submissions (contact, prayer, newsletter) are managed under Dashboard → Communications</li>
          </ol>
        </div>

        {grouped.map((section) => (
          <section key={section.key}>
            <h2 className="text-lg font-semibold text-navy-900">{section.label}</h2>
            <p className="text-sm text-navy-600 mb-4">{section.description}</p>
            <ul className="space-y-3">
              {section.areas.map((area) => (
                <li
                  key={area.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  <div>
                    <h3 className="font-medium text-navy-900">{area.title}</h3>
                    <p className="text-sm text-navy-600 mt-1">{area.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 shrink-0">
                    {area.previewHref && (
                      <Link
                        href={area.previewHref}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-navy-700 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100"
                      >
                        <Eye className="w-4 h-4" />
                        Preview
                      </Link>
                    )}
                    <Link
                      href={area.editHref}
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-navy-700 rounded-lg hover:bg-navy-800"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit in CMS
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <div className="text-center pt-4">
          <Link
            href="/keystatic"
            className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 font-medium"
          >
            Open full CMS <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
