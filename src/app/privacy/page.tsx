import { Metadata } from "next";
import { PageHeader } from "@/components/ui/Section";
import { Section } from "@/components/ui/Section";
import { churchInfo } from "@/data/church";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Christ The King Anglican Church website.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        subtitle="Your Privacy"
        description="How we collect, use, and protect your information."
        breadcrumb={[{ label: "Privacy Policy", href: "/privacy" }]}
      />

      <Section background="white">
        <div className="max-w-3xl mx-auto prose prose-navy">
          <p className="text-navy-600 text-sm mb-8">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
            Information We Collect
          </h2>
          <p className="text-navy-600 mb-4 leading-relaxed">
            When you use our contact form, we collect the information you provide:
            your name, email address, and message content. This information is
            submitted through Formspree, a third-party form processing service.
          </p>
          <p className="text-navy-600 mb-8 leading-relaxed">
            We do not use tracking cookies or analytics tools that collect
            personal data. Our website does not track your browsing behavior
            across other sites.
          </p>

          <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
            How We Use Your Information
          </h2>
          <p className="text-navy-600 mb-8 leading-relaxed">
            Information submitted through the contact form is used solely to
            respond to your inquiry. We do not sell, share, or use your personal
            information for marketing purposes.
          </p>

          <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
            Third-Party Services
          </h2>
          <p className="text-navy-600 mb-4 leading-relaxed">
            Our website uses the following third-party services:
          </p>
          <ul className="list-disc pl-6 text-navy-600 mb-8 space-y-2">
            <li>
              <strong>Formspree</strong> — Processes contact form submissions.
              See{" "}
              <a
                href="https://formspree.io/legal/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-600 hover:text-gold-700 underline"
              >
                Formspree&apos;s Privacy Policy
              </a>
              .
            </li>
            <li>
              <strong>YouTube</strong> — Embeds sermon videos. YouTube may set
              cookies when you interact with embedded videos. See{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-600 hover:text-gold-700 underline"
              >
                Google&apos;s Privacy Policy
              </a>
              .
            </li>
            <li>
              <strong>Google Maps</strong> — Displays our church location. See{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-600 hover:text-gold-700 underline"
              >
                Google&apos;s Privacy Policy
              </a>
              .
            </li>
            <li>
              <strong>Clerk</strong> — Provides authentication for our content
              management system (admin use only). See{" "}
              <a
                href="https://clerk.com/legal/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-600 hover:text-gold-700 underline"
              >
                Clerk&apos;s Privacy Policy
              </a>
              .
            </li>
            <li>
              <strong>Kindrid</strong> — Processes online donations. See{" "}
              <a
                href="https://kindrid.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-600 hover:text-gold-700 underline"
              >
                Kindrid&apos;s Privacy Policy
              </a>
              .
            </li>
          </ul>

          <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
            Cookies
          </h2>
          <p className="text-navy-600 mb-8 leading-relaxed">
            This website does not set its own tracking cookies. Third-party
            services embedded on our site (such as YouTube video players) may set
            cookies according to their own privacy policies.
          </p>

          <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
            Children&apos;s Privacy
          </h2>
          <p className="text-navy-600 mb-8 leading-relaxed">
            Our website is not directed at children under 13. We do not knowingly
            collect personal information from children.
          </p>

          <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
            Questions
          </h2>
          <p className="text-navy-600 leading-relaxed">
            If you have questions about this privacy policy, please contact us at{" "}
            <a
              href={`mailto:${churchInfo.email}`}
              className="text-gold-600 hover:text-gold-700 underline"
            >
              {churchInfo.email}
            </a>{" "}
            or call{" "}
            <a
              href={`tel:${churchInfo.phone.replace(/\./g, "")}`}
              className="text-gold-600 hover:text-gold-700 underline"
            >
              {churchInfo.phone}
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
