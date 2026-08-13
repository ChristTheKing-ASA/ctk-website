import { Metadata } from "next";
import { PageHeader } from "@/components/ui/Section";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { getChurchInfo, getBeliefsPage } from "@/lib/content";

import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "What We Believe",
  description:
    "The theological foundations of Christ The King Anglican Church, rooted in Scripture and the historic Anglican tradition.",
};

export default async function BeliefsPage() {
  const churchInfo = await getChurchInfo();
  const page = await getBeliefsPage();
  const foundations = page?.foundations ?? [];

  return (
    <>
      <PageHeader
        title={page?.heroTitle || "What We Believe"}
        subtitle={page?.heroSubtitle || ""}
        description={page?.heroDescription || ""}
        breadcrumb={[
          { label: "About", href: "/about" },
          { label: "Beliefs", href: "/about/beliefs" },
        ]}
      />

      {/* Scripture Quote */}
      <Section background="cream">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="font-display text-2xl sm:text-3xl text-navy-900 italic leading-relaxed">
            &quot;{churchInfo.scripture.about.text}&quot;
          </blockquote>
          <footer className="mt-4 text-gold-600 font-semibold">
            — {churchInfo.scripture.about.reference}
          </footer>
        </div>
      </Section>

      {/* Core Beliefs */}
      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-navy-900 mb-4">
              Core Beliefs
            </h2>
            <p className="text-navy-600 text-lg">
              We affirm the following as essential to the Anglican faith:
            </p>
          </div>

          <div className="space-y-6">
            {foundations.map((belief, index) => (
              <div
                key={belief.title}
                className="flex gap-6 p-6 bg-cream-50 rounded-xl border border-cream-200"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gold-100 text-gold-700 rounded-full flex items-center justify-center font-display font-bold text-lg">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-navy-900 mb-2">
                    {belief.title}
                  </h3>
                  <p className="text-navy-600 leading-relaxed">
                    {belief.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Additional Beliefs */}
      <Section background="cream">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-navy-900 mb-6 text-center">
            We Also Affirm
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Holy Scripture as the ultimate authority for faith and life",
              "Jesus Christ as Lord, Savior, and Head of the Church",
              "The gifts and counseling of the Holy Spirit",
              "The Great Commission and the Great Commandment",
              "The sacramental life as a means of grace",
              "The importance of Christian community and fellowship",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 p-4 bg-white rounded-lg"
              >
                <Check className="w-5 h-5 text-gold-500 mt-0.5 flex-shrink-0" />
                <span className="text-navy-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section background="navy">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Want to Learn More?
          </h2>
          <p className="text-navy-200 text-lg mb-8 max-w-2xl mx-auto">
            Our 9-week Catechism class is perfect for those new to the faith or
            wanting to explore Anglicanism more deeply.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/connect/classes" variant="secondary" size="lg">
              Explore Classes
            </Button>
            <Button href="/about/anglican-faith" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-navy-900">
              What is Anglicanism?
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
