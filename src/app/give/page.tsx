import { Metadata } from "next";
import { PageHeader } from "@/components/ui/Section";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { churchInfo } from "@/data/church";
import { Heart, Globe, Users, Home, ExternalLink, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Give",
  description:
    "Support the ministry of Christ the King Anglican Church through online giving.",
};

export default function GivePage() {
  return (
    <>
      <PageHeader
        title="Give"
        subtitle="Generous Living"
        description="Your generosity enables CTK to worship, serve, and make an impact locally and globally."
        breadcrumb={[{ label: "Give", href: "/give" }]}
      />

      <Section background="white">
        <div className="max-w-3xl mx-auto">
          {/* Main CTA */}
          <div className="bg-navy-900 text-white rounded-2xl p-8 lg:p-12 text-center mb-12">
            <Heart className="w-12 h-12 text-gold-400 mx-auto mb-6" />
            <h2 className="font-display text-3xl font-bold mb-4">
              Give Online
            </h2>
            <p className="text-navy-200 text-lg mb-8 max-w-xl mx-auto">
              Secure, convenient online giving through Kindrid. Set up one-time
              or recurring gifts to support the ministry of CTK.
            </p>
            <Button
              href={churchInfo.giving.url}
              external
              variant="secondary"
              size="lg"
            >
              <Heart className="w-5 h-5" />
              Give Now
              <ExternalLink className="w-4 h-4" />
            </Button>
            <p className="mt-4 text-sm text-navy-400 flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" />
              Secure giving powered by Kindrid
            </p>
          </div>

          {/* Why Give */}
          <div className="mb-12">
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-6 text-center">
              Where Your Gift Goes
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-cream-50 p-6 rounded-xl text-center">
                <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="w-6 h-6 text-gold-600" />
                </div>
                <h3 className="font-semibold text-navy-900 mb-2">
                  Ministry at CTK
                </h3>
                <p className="text-navy-600 text-sm">
                  Worship, discipleship, and care for our community
                </p>
              </div>
              <div className="bg-cream-50 p-6 rounded-xl text-center">
                <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-gold-600" />
                </div>
                <h3 className="font-semibold text-navy-900 mb-2">
                  Local Outreach
                </h3>
                <p className="text-navy-600 text-sm">
                  Serving our neighbors in St. Augustine
                </p>
              </div>
              <div className="bg-cream-50 p-6 rounded-xl text-center">
                <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-gold-600" />
                </div>
                <h3 className="font-semibold text-navy-900 mb-2">
                  Global Missions
                </h3>
                <p className="text-navy-600 text-sm">
                  Supporting 11 mission partners worldwide
                </p>
              </div>
            </div>
          </div>

          {/* Other Ways to Give */}
          <div className="bg-cream-50 rounded-xl p-8">
            <h3 className="font-display text-xl font-semibold text-navy-900 mb-4">
              Other Ways to Give
            </h3>
            <div className="space-y-4 text-navy-600">
              <div>
                <h4 className="font-semibold text-navy-900">In Person</h4>
                <p className="text-sm">
                  Place your gift in the offering during Sunday worship.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-navy-900">By Mail</h4>
                <p className="text-sm">
                  Send checks to: {churchInfo.address.mailing}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-navy-900">Church App</h4>
                <p className="text-sm">
                  Give through our{" "}
                  <a
                    href={churchInfo.giving.appUrl}
                    className="text-gold-600 hover:text-gold-700"
                  >
                    mobile app
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* Missions Link */}
          <div className="mt-12 text-center">
            <p className="text-navy-600 mb-4">
              Want to see the impact of your giving?
            </p>
            <Button href="/missions" variant="outline">
              Explore Our Mission Partners
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
