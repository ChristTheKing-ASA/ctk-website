import { Metadata } from "next";
import { PageHeader } from "@/components/ui/Section";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { getChurchInfo } from "@/lib/content";
import { Book, Church, Globe, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "The Anglican Faith",
  description:
    "Learn what it means to be Anglican - our heritage, worship, and place in the global Christian family.",
};

export default async function AnglicanFaithPage() {
  const churchInfo = await getChurchInfo();

  return (
    <>
      <PageHeader
        title="The Anglican Faith"
        subtitle="Our Heritage"
        description="Anglicanism is a worldwide body of Christians responding to God's revelation through Jesus Christ—rooted in tradition, yet contemporary in practice."
        breadcrumb={[
          { label: "About", href: "/about" },
          { label: "Anglican Faith", href: "/about/anglican-faith" },
        ]}
      />

      {/* What is Anglicanism */}
      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="font-display text-3xl font-bold text-navy-900 mb-6">
                What is Anglicanism?
              </h2>
              <p className="text-navy-600 mb-4 leading-relaxed">
                Anglicanism combines the authority of the Bible, the historic
                faith of the early Church, and the beauty of structured prayer
                and liturgy. We are both Catholic and Reformed—holding to the
                ancient creeds while embracing the insights of the Reformation.
              </p>
              <p className="text-navy-600 mb-4 leading-relaxed">
                The Anglican way is sometimes described as a &quot;middle
                way&quot; (via media) between Roman Catholicism and Protestant
                traditions. We value both Scripture and tradition, both personal
                faith and sacramental worship.
              </p>
              <p className="text-navy-600 leading-relaxed">
                With over 85 million members worldwide, the Anglican Communion
                is the third-largest Christian communion in the world.
              </p>
            </div>
            <div className="bg-cream-100 rounded-2xl p-8">
              <h3 className="font-display text-xl font-semibold text-navy-900 mb-4">
                Three Streams
              </h3>
              <p className="text-navy-600 mb-6">
                Anglicanism is often described as flowing from three streams:
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Book className="w-5 h-5 text-gold-500 mt-1" />
                  <div>
                    <p className="font-semibold text-navy-900">Evangelical</p>
                    <p className="text-sm text-navy-600">
                      Rooted in Scripture and personal faith
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Church className="w-5 h-5 text-gold-500 mt-1" />
                  <div>
                    <p className="font-semibold text-navy-900">Catholic</p>
                    <p className="text-sm text-navy-600">
                      Connected to the historic, sacramental Church
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-gold-500 mt-1" />
                  <div>
                    <p className="font-semibold text-navy-900">Charismatic</p>
                    <p className="text-sm text-navy-600">
                      Open to the ongoing work of the Holy Spirit
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Book of Common Prayer */}
          <div className="bg-navy-900 text-white rounded-2xl p-8 lg:p-12 mb-16">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-display text-2xl font-bold mb-4">
                  The Book of Common Prayer
                </h3>
                <p className="text-navy-200 mb-4 leading-relaxed">
                  Central to Anglican worship is the Book of Common Prayer—a
                  treasury of prayers, readings, and liturgies that has shaped
                  Christian worship for nearly 500 years.
                </p>
                <p className="text-navy-200 leading-relaxed">
                  As theologian J.I. Packer wrote, the Prayer Book is
                  &quot;the Bible arranged for worship,&quot; offering a
                  grace-oriented, Christ-centered pattern for daily and weekly
                  devotion.
                </p>
              </div>
              <div className="text-center">
                <blockquote className="italic text-xl text-gold-300 leading-relaxed">
                  &quot;The Book of Common Prayer is the Bible arranged for
                  worship.&quot;
                </blockquote>
                <footer className="mt-4 text-navy-300">— J.I. Packer</footer>
              </div>
            </div>
          </div>

          {/* Our Place */}
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-navy-900 mb-6">
              Our Place in the Anglican Family
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-cream-50 rounded-xl p-6 border border-cream-200">
              <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mb-4">
                <Church className="w-6 h-6 text-gold-600" />
              </div>
              <h3 className="font-display text-xl font-semibold text-navy-900 mb-2">
                {churchInfo.diocese.name}
              </h3>
              <p className="text-navy-600 mb-4">
                Christ The King is a member parish of the Gulf Atlantic Diocese,
                under the leadership of {churchInfo.diocese.bishop}.
              </p>
              <a
                href={churchInfo.diocese.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-600 font-medium hover:text-gold-700"
              >
                Visit Diocese Website →
              </a>
            </div>

            <div className="bg-cream-50 rounded-xl p-6 border border-cream-200">
              <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-gold-600" />
              </div>
              <h3 className="font-display text-xl font-semibold text-navy-900 mb-2">
                {churchInfo.denomination.name}
              </h3>
              <p className="text-navy-600 mb-4">
                We are part of ACNA, a province of the global Anglican Communion
                committed to biblical orthodoxy and the Great Commission.
              </p>
              <a
                href={churchInfo.denomination.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-600 font-medium hover:text-gold-700"
              >
                Visit ACNA Website →
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section background="cream">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-navy-900 mb-4">
            Experience Anglican Worship
          </h2>
          <p className="text-navy-600 text-lg mb-8">
            The best way to understand Anglicanism is to experience it. Join us
            for worship this Sunday and discover the beauty of liturgy, the
            depth of Scripture, and the warmth of community.
          </p>
          <Button href="/visit" variant="primary" size="lg">
            Plan Your Visit
          </Button>
        </div>
      </Section>
    </>
  );
}
