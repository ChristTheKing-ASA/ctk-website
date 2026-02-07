import { Metadata } from "next";
import { PageHeader } from "@/components/ui/Section";
import { Section } from "@/components/ui/Section";
import { getChurchInfo } from "@/lib/content";
import { Users, MapPin, Heart, BookOpen, UtensilsCrossed, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Small Groups",
  description: "Join a small group at Christ The King for fellowship, prayer, and study.",
};

export default async function SmallGroupsPage() {
  const churchInfo = await getChurchInfo();

  return (
    <>
      <PageHeader
        title="Small Groups"
        subtitle="Life Together"
        description="Fellowship, meals, prayer, study, and even a sewing ministry—find your place in a small group."
        breadcrumb={[
          { label: "Connect", href: "/connect" },
          { label: "Small Groups", href: "/connect/small-groups" },
        ]}
      />

      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="font-display text-3xl font-bold text-navy-900 mb-6">
                Why Small Groups?
              </h2>
              <p className="text-navy-600 mb-4 leading-relaxed">
                Small groups are where real life happens. It&apos;s where we move
                beyond Sunday morning hellos to genuine friendship, mutual
                encouragement, and shared growth in Christ.
              </p>
              <p className="text-navy-600 leading-relaxed">
                Our groups meet in homes throughout Palm Coast and St. Augustine,
                offering flexibility and a comfortable environment to connect.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-cream-50 p-6 rounded-xl text-center">
                <Users className="w-8 h-8 text-gold-500 mx-auto mb-3" />
                <p className="font-semibold text-navy-900">Fellowship</p>
              </div>
              <div className="bg-cream-50 p-6 rounded-xl text-center">
                <UtensilsCrossed className="w-8 h-8 text-gold-500 mx-auto mb-3" />
                <p className="font-semibold text-navy-900">Meals</p>
              </div>
              <div className="bg-cream-50 p-6 rounded-xl text-center">
                <Heart className="w-8 h-8 text-gold-500 mx-auto mb-3" />
                <p className="font-semibold text-navy-900">Prayer</p>
              </div>
              <div className="bg-cream-50 p-6 rounded-xl text-center">
                <BookOpen className="w-8 h-8 text-gold-500 mx-auto mb-3" />
                <p className="font-semibold text-navy-900">Study</p>
              </div>
            </div>
          </div>

          {/* Locations */}
          <div className="bg-navy-900 text-white rounded-2xl p-8 lg:p-12 mb-16">
            <h3 className="font-display text-2xl font-bold mb-6">
              Group Locations
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-gold-400 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">Palm Coast</h4>
                  <p className="text-navy-200">
                    Groups meeting in various homes throughout Palm Coast.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-gold-400 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">St. Augustine</h4>
                  <p className="text-navy-200">
                    Groups meeting in various homes throughout St. Augustine.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Join a Group */}
          <div className="text-center">
            <h3 className="font-display text-2xl font-bold text-navy-900 mb-4">
              Ready to Join?
            </h3>
            <p className="text-navy-600 mb-6 max-w-2xl mx-auto">
              Call the church office to find a group near you or to learn about
              starting a new group.
            </p>
            <div className="inline-flex items-center gap-2 bg-gold-100 text-gold-700 px-6 py-3 rounded-lg font-medium">
              <Phone className="w-5 h-5" />
              <a href={`tel:${churchInfo.phone.replace(/\./g, "")}`}>
                {churchInfo.phone}
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
