import Link from "next/link";
import { requireAdminAuth } from "@/lib/requireAdminAuth";
import { getConfigStatus } from "@/lib/configStatus";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";
import { CheckCircle2, Circle, ExternalLink } from "lucide-react";

export default async function AdminSetupPage() {
  await requireAdminAuth("/admin/setup");

  const checks = getConfigStatus();
  const required = checks.filter((c) => !c.optional);
  const optional = checks.filter((c) => c.optional);
  const requiredDone = required.filter((c) => c.configured).length;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-navy-900">Third-party setup</h1>
            <p className="text-sm text-navy-600 mt-1">
              {requiredDone} of {required.length} required services configured
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

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <p className="text-navy-600 text-sm mb-4">
            These integrations need accounts and API keys outside the website. Follow{" "}
            <code className="text-xs bg-slate-100 px-1 rounded">THIRD_PARTY_SETUP.md</code> in the
            project folder, or run{" "}
            <code className="text-xs bg-slate-100 px-1 rounded">npm run check:config</code> in your
            terminal.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin"
              className="text-sm text-gold-600 hover:text-gold-700 font-medium"
            >
              ← Back to dashboard
            </Link>
            <span className="text-slate-300">|</span>
            <span className="text-sm text-navy-500">Tests: npm run test:resend · test:youtube</span>
          </div>
        </div>

        <section>
          <h2 className="text-lg font-semibold text-navy-900 mb-4">Required</h2>
          <ul className="space-y-3">
            {required.map((check) => (
              <ConfigRow key={check.id} check={check} />
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-navy-900 mb-4">Optional (production)</h2>
          <ul className="space-y-3">
            {optional.map((check) => (
              <ConfigRow key={check.id} check={check} />
            ))}
          </ul>
        </section>

        <div className="bg-navy-900 text-white rounded-xl p-6 text-sm space-y-2">
          <p className="font-semibold">Quick links</p>
          <ul className="space-y-1 text-navy-200">
            <li>
              <a
                href="https://resend.com/domains"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-gold-400 hover:text-gold-300"
              >
                Resend — verify ctkasa.com <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a
                href="https://dash.cloudflare.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-gold-400 hover:text-gold-300"
              >
                Cloudflare — D1 & deploy <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a
                href="https://console.cloud.google.com/apis/credentials"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-gold-400 hover:text-gold-300"
              >
                Google Cloud — YouTube & Maps keys <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/settings/developers"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-gold-400 hover:text-gold-300"
              >
                GitHub — OAuth for Keystatic <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}

function ConfigRow({ check }: { check: ReturnType<typeof getConfigStatus>[number] }) {
  return (
    <li className="bg-white rounded-lg border border-slate-200 p-4 flex gap-3">
      {check.configured ? (
        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
      ) : (
        <Circle className="w-5 h-5 text-slate-300 flex-shrink-0 mt-0.5" />
      )}
      <div>
        <p className="font-medium text-navy-900">{check.label}</p>
        <p className="text-sm text-navy-600 mt-1">{check.detail}</p>
      </div>
    </li>
  );
}
