import { Metadata } from "next";
import { PageHeader } from "@/components/ui/Section";
import { Section } from "@/components/ui/Section";
import { PrayerRequestForm } from "@/components/PrayerRequestForm";
import { Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Prayer Request",
  description: "Submit a confidential prayer request to Christ The King Anglican Church.",
};

export default function PrayerPage() {
  return (
    <>
      <PageHeader
        title="Prayer Request"
        subtitle="We're Praying With You"
        description="Share your prayer need with our prayer team. Every request is treated with care and confidentiality."
        breadcrumb={[
          { label: "Connect", href: "/connect" },
          { label: "Prayer", href: "/connect/prayer" },
        ]}
      />

      <Section background="white">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-gold-600" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-navy-900">
                Submit a Prayer Request
              </h2>
              <p className="text-navy-600 text-sm">
                Our clergy and prayer team will lift your need before the Lord.
              </p>
            </div>
          </div>
          <div className="bg-cream-50 rounded-xl p-6 lg:p-8 border border-cream-200">
            <PrayerRequestForm />
          </div>
        </div>
      </Section>
    </>
  );
}
