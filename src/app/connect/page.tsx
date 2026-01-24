import { Metadata } from "next";
import { PageHeader } from "@/components/ui/Section";
import { Section, SectionHeader } from "@/components/ui/Section";
import { FeatureCard } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Users, BookOpen, Heart, UserPlus, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Connect",
  description:
    "Get connected at Christ the King - small groups, classes, membership, and more.",
};

export default function ConnectPage() {
  return (
    <>
      <PageHeader
        title="Get Connected"
        subtitle="Find Your Place"
        description="We believe life is better together. Discover ways to connect, grow, and build meaningful relationships at CTK."
        breadcrumb={[{ label: "Connect", href: "/connect" }]}
      />

      {/* Ways to Connect */}
      <Section background="white">
        <SectionHeader
          subtitle="Get Involved"
          title="Ways to Connect"
          description="Whether you're new or have been here for years, there's a place for you."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            title="Small Groups"
            description="Fellowship, meals, prayer, and study in homes across Palm Coast and St. Augustine."
            icon={<Users className="w-6 h-6" />}
            href="/connect/small-groups"
          />
          <FeatureCard
            title="Classes"
            description="9-week catechism classes for new believers and those exploring the Anglican faith."
            icon={<BookOpen className="w-6 h-6" />}
            href="/connect/classes"
          />
          <FeatureCard
            title="Daughters of the Holy Cross"
            description="A women's order focused on Prayer, Service, Study, and Evangelism."
            icon={<Heart className="w-6 h-6" />}
            href="/connect/daughters-of-the-holy-cross"
          />
          <FeatureCard
            title="Membership"
            description="Learn about becoming a member of Christ the King."
            icon={<UserPlus className="w-6 h-6" />}
            href="/connect/membership"
          />
        </div>
      </Section>

      {/* Quick Contact */}
      <Section background="cream">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-gold-600" />
          </div>
          <h2 className="font-display text-3xl font-bold text-navy-900 mb-4">
            Questions? We&apos;d Love to Hear From You
          </h2>
          <p className="text-navy-600 text-lg mb-8">
            Whether you have questions about CTK, want to learn more about our
            community, or just want to say hello—we&apos;re here for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/connect/contact" variant="primary" size="lg">
              Contact Us
            </Button>
            <Button href="/visit" variant="outline" size="lg">
              Plan a Visit
            </Button>
          </div>
        </div>
      </Section>

      {/* Volunteer CTA */}
      <Section background="navy">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl font-bold text-white mb-4">
              Ready to Serve?
            </h2>
            <p className="text-navy-200 text-lg mb-6">
              We believe everyone has a gift to share. From Sunday morning
              hospitality to global missions, there are many ways to use your
              talents to serve God and others.
            </p>
            <Button href="/serve" variant="secondary" size="lg">
              Explore Volunteer Opportunities
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-navy-800 p-6 rounded-xl text-center">
              <p className="text-3xl font-bold text-gold-400 mb-1">15+</p>
              <p className="text-navy-200 text-sm">Volunteer Roles</p>
            </div>
            <div className="bg-navy-800 p-6 rounded-xl text-center">
              <p className="text-3xl font-bold text-gold-400 mb-1">5</p>
              <p className="text-navy-200 text-sm">Ministry Areas</p>
            </div>
            <div className="bg-navy-800 p-6 rounded-xl text-center">
              <p className="text-3xl font-bold text-gold-400 mb-1">11</p>
              <p className="text-navy-200 text-sm">Mission Partners</p>
            </div>
            <div className="bg-navy-800 p-6 rounded-xl text-center">
              <p className="text-3xl font-bold text-gold-400 mb-1">∞</p>
              <p className="text-navy-200 text-sm">Ways to Give</p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
