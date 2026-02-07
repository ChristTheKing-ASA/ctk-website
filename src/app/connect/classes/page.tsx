import { Metadata } from "next";
import { PageHeader } from "@/components/ui/Section";
import { Section } from "@/components/ui/Section";
import { getChurchInfo } from "@/lib/content";
import { BookOpen, Clock, Users, Check, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Classes",
  description:
    "Catechism and inquirer classes at Christ The King for new believers and those exploring Anglicanism.",
};

export default async function ClassesPage() {
  const churchInfo = await getChurchInfo();

  return (
    <>
      <PageHeader
        title="Catechism Classes"
        subtitle="Grow in Faith"
        description="Whether you're new to Christianity or exploring the Anglican tradition, our classes provide a foundation for lifelong discipleship."
        breadcrumb={[
          { label: "Connect", href: "/connect" },
          { label: "Classes", href: "/connect/classes" },
        ]}
      />

      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2">
              <h2 className="font-display text-3xl font-bold text-navy-900 mb-6">
                Inquirer/Catechism Classes
              </h2>
              <p className="text-navy-600 mb-4 leading-relaxed">
                All are invited for this time of Christian discipleship. Our 9-week
                classes are designed for:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gold-500 mt-0.5" />
                  <span className="text-navy-600">
                    Those new to the Christian faith
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gold-500 mt-0.5" />
                  <span className="text-navy-600">
                    Those seeking to learn more about Anglicanism
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gold-500 mt-0.5" />
                  <span className="text-navy-600">
                    Those preparing for Confirmation, Reception, or Reaffirmation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gold-500 mt-0.5" />
                  <span className="text-navy-600">
                    Anyone wanting to deepen their understanding of the faith
                  </span>
                </li>
              </ul>
              <p className="text-navy-600 leading-relaxed">
                Classes are held on Sundays after worship and last approximately
                one hour. You&apos;ll explore the essentials of Christian faith,
                Anglican heritage, and what it means to follow Jesus today.
              </p>
            </div>

            <div className="bg-cream-50 rounded-xl p-6 h-fit">
              <h3 className="font-display text-lg font-semibold text-navy-900 mb-4">
                Class Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gold-500" />
                  <div>
                    <p className="font-medium text-navy-900">9 Weeks</p>
                    <p className="text-sm text-navy-600">~1 hour per session</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-gold-500" />
                  <div>
                    <p className="font-medium text-navy-900">Sundays</p>
                    <p className="text-sm text-navy-600">After worship</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gold-500" />
                  <div>
                    <p className="font-medium text-navy-900">All Welcome</p>
                    <p className="text-sm text-navy-600">No prior knowledge needed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What You'll Learn */}
          <div className="bg-navy-900 text-white rounded-2xl p-8 lg:p-12 mb-16">
            <h3 className="font-display text-2xl font-bold mb-6">
              What You&apos;ll Explore
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "The basics of Christian faith",
                "The story of Scripture",
                "Anglican history and heritage",
                "The meaning of the sacraments",
                "Living out your faith daily",
                "Your place in God's church",
              ].map((topic) => (
                <div key={topic} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-gold-400" />
                  <span className="text-navy-100">{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="text-center">
            <h3 className="font-display text-2xl font-bold text-navy-900 mb-4">
              Ready to Start?
            </h3>
            <p className="text-navy-600 mb-6 max-w-2xl mx-auto">
              Contact the church office to learn about the next class session
              and receive your materials.
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
