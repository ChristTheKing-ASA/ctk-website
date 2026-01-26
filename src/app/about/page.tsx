import { Metadata } from "next";
import { PageHeader } from "@/components/ui/Section";
import { Section, SectionHeader } from "@/components/ui/Section";
import { FeatureCard, TeamCard } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { churchInfo, clergy, beliefs } from "@/data/church";
import { Book, Users, Church, Cross } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Christ the King Anglican Church - our story, beliefs, clergy, and what it means to be Anglican.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Christ the King"
        subtitle="Our Story"
        description="A welcoming Anglican community rooted in Scripture, shaped by liturgy, and committed to serving St. Augustine and beyond."
        breadcrumb={[{ label: "About", href: "/about" }]}
      />

      {/* Mission & Vision */}
      <Section background="white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gold-600 font-semibold text-sm uppercase tracking-wider mb-2">
              Our Mission
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900 mb-6">
              Love God. Become Disciples. Serve Others.
            </h2>
            <p className="text-navy-600 text-lg mb-6 leading-relaxed">
              Christ the King is a member of the Gulf Atlantic Diocese in the
              Anglican Church in North America (ACNA), under the leadership of
              The Right Reverend {churchInfo.diocese.bishop.replace("The Right Reverend ", "")}.
            </p>
            <p className="text-navy-600 mb-8 leading-relaxed">
              We believe the Anglican tradition offers a beautiful path for
              following Jesus—one rooted in the authority of Scripture, shaped
              by historic liturgy, and lived out in loving community.
            </p>

            <blockquote className="border-l-4 border-gold-400 pl-6 py-2 bg-cream-50 rounded-r-lg">
              <p className="italic text-navy-700 text-lg">
                &quot;{churchInfo.scripture.about.text}&quot;
              </p>
              <footer className="text-gold-600 font-medium mt-2">
                — {churchInfo.scripture.about.reference}
              </footer>
            </blockquote>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-navy-900 text-white p-6 rounded-xl">
              <p className="text-3xl font-bold text-gold-400 mb-2">6</p>
              <p className="font-medium">Clergy Members</p>
            </div>
            <div className="bg-cream-100 p-6 rounded-xl">
              <p className="text-3xl font-bold text-navy-900 mb-2">11</p>
              <p className="text-navy-600 font-medium">Mission Partners</p>
            </div>
            <div className="bg-cream-100 p-6 rounded-xl">
              <p className="text-3xl font-bold text-navy-900 mb-2">3</p>
              <p className="text-navy-600 font-medium">Weekly Gatherings</p>
            </div>
            <div className="bg-gold-100 p-6 rounded-xl">
              <p className="text-3xl font-bold text-gold-700 mb-2">1</p>
              <p className="text-gold-700 font-medium">DeafChurch Plant</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Quick Links to Subpages */}
      <Section background="cream">
        <SectionHeader
          title="Learn More"
          description="Explore what makes Christ the King who we are."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            title="What We Believe"
            description="Our theological foundations rooted in Scripture and Anglican tradition."
            icon={<Book className="w-6 h-6" />}
            href="/about/beliefs"
          />
          <FeatureCard
            title="Our Team"
            description="Meet the clergy who shepherd our community."
            icon={<Users className="w-6 h-6" />}
            href="/about/team"
          />
          <FeatureCard
            title="Anglican Faith"
            description="What does it mean to be Anglican? Learn about our heritage."
            icon={<Church className="w-6 h-6" />}
            href="/about/anglican-faith"
          />
          <FeatureCard
            title="Our Story"
            description="The history of Christ the King in St. Augustine."
            icon={<Cross className="w-6 h-6" />}
            href="/about/story"
          />
        </div>
      </Section>

      {/* Beliefs Preview */}
      <Section background="white">
        <SectionHeader
          subtitle="What We Believe"
          title="Rooted in the Anglican Tradition"
          description={beliefs.intro}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {beliefs.foundations.slice(0, 6).map((belief, index) => (
            <div
              key={belief.title}
              className="p-6 bg-cream-50 rounded-xl border border-cream-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 bg-gold-100 text-gold-700 rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </span>
                <h3 className="font-display font-semibold text-navy-900">
                  {belief.title}
                </h3>
              </div>
              <p className="text-navy-600 text-sm leading-relaxed">
                {belief.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button href="/about/beliefs" variant="primary">
            Read Our Full Statement of Beliefs
          </Button>
        </div>
      </Section>

      {/* Team Preview */}
      <Section background="cream">
        <SectionHeader
          subtitle="Our Team"
          title="Meet Our Clergy"
          description="Faithful shepherds serving Christ the King."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {clergy.slice(0, 3).map((member) => (
            <TeamCard
              key={member.slug}
              name={member.name}
              title={member.title}
              image={member.image}
              shortBio={member.shortBio}
              href={`/about/team/${member.slug}`}
            />
          ))}
        </div>

        <div className="text-center">
          <Button href="/about/team" variant="primary">
            Meet the Full Team
          </Button>
        </div>
      </Section>

      {/* CTA */}
      <Section background="navy">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Come See for Yourself
          </h2>
          <p className="text-navy-200 text-lg mb-8 max-w-2xl mx-auto">
            The best way to learn about Christ the King is to experience it.
            Join us this Sunday for worship.
          </p>
          <Button href="/visit" variant="secondary" size="lg">
            Plan Your Visit
          </Button>
        </div>
      </Section>
    </>
  );
}
