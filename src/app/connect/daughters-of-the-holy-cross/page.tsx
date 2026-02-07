import { Metadata } from "next";
import { PageHeader } from "@/components/ui/Section";
import { Section } from "@/components/ui/Section";
import { Heart, BookOpen, Users, Megaphone, Mail, Phone, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Daughters of the Holy Cross",
  description:
    "The Faith Chapter of the Daughters of the Holy Cross at Christ The King Anglican Church.",
};

export default function DaughtersPage() {
  return (
    <>
      <PageHeader
        title="Daughters of the Holy Cross"
        subtitle="Women's Order"
        description="A women's religious order devoted to Prayer, Service, Study, and Evangelism."
        breadcrumb={[
          { label: "Connect", href: "/connect" },
          { label: "Daughters of the Holy Cross", href: "/connect/daughters-of-the-holy-cross" },
        ]}
      />

      <Section background="white">
        <div className="max-w-4xl mx-auto">
          {/* Four-fold Vow */}
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold text-navy-900 mb-8">
              The Four-fold Vow
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-cream-50 p-6 rounded-xl">
                <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-gold-600" />
                </div>
                <h3 className="font-display text-lg font-semibold text-navy-900">
                  Prayer
                </h3>
              </div>
              <div className="bg-cream-50 p-6 rounded-xl">
                <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-gold-600" />
                </div>
                <h3 className="font-display text-lg font-semibold text-navy-900">
                  Service
                </h3>
              </div>
              <div className="bg-cream-50 p-6 rounded-xl">
                <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-gold-600" />
                </div>
                <h3 className="font-display text-lg font-semibold text-navy-900">
                  Study
                </h3>
              </div>
              <div className="bg-cream-50 p-6 rounded-xl">
                <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Megaphone className="w-6 h-6 text-gold-600" />
                </div>
                <h3 className="font-display text-lg font-semibold text-navy-900">
                  Evangelism
                </h3>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
                The Faith Chapter
              </h2>
              <p className="text-navy-600 mb-4 leading-relaxed">
                The Faith Chapter of the Daughters of the Holy Cross at Christ
                the King currently has 13 members who are committed to living
                out the four-fold vow of Prayer, Service, Study, and Evangelism.
              </p>
              <p className="text-navy-600 leading-relaxed">
                The Daughters of the Holy Cross is a women&apos;s order within
                the Anglican tradition, offering women a framework for
                intentional spiritual growth and community.
              </p>
            </div>
            <div className="bg-navy-900 text-white p-8 rounded-xl">
              <h3 className="font-display text-xl font-semibold mb-4">
                Interested in Learning More?
              </h3>
              <p className="text-navy-200 mb-6">
                Contact Deacon Barb McMillen to learn about the Daughters of the
                Holy Cross and how you might become involved.
              </p>
              <div className="space-y-3">
                <a
                  href="tel:7243449241"
                  className="flex items-center gap-2 text-gold-400 hover:text-gold-300"
                >
                  <Phone className="w-4 h-4" />
                  724-344-9241
                </a>
                <a
                  href="mailto:chaplainbarbm@gmail.com"
                  className="flex items-center gap-2 text-gold-400 hover:text-gold-300"
                >
                  <Mail className="w-4 h-4" />
                  chaplainbarbm@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* External Link */}
          <div className="text-center">
            <a
              href="https://www.daughtershc.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              Visit the Daughters of the Holy Cross Website
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
