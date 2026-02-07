import { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/Section";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { DeafChurchVideo } from "@/components/DeafChurchVideo";
import { getDeafChurchInfo } from "@/lib/content";
import {
  HandHeart,
  Users,
  Video,
  Globe,
  BookOpen,
  Mail,
  Church,
  Heart,
  Quote,
} from "lucide-react";

export const metadata: Metadata = {
  title: "DeafChurch First Coast",
  description:
    "DeafChurch First Coast - bringing Anglican worship to the Deaf community in American Sign Language. Christ The King is an anchor church for this regional ministry.",
};

export default async function DeafChurchPage() {
  const deafChurchData = await getDeafChurchInfo();

  const deafChurch = {
    tagline: deafChurchData?.tagline || "",
    founderName: deafChurchData?.founderName || "",
    founderEmail: deafChurchData?.founderEmail || "",
    familyInfo: deafChurchData?.familyInfo || "",
    publicationTitle: deafChurchData?.publicationTitle || "",
    videoId: deafChurchData?.featuredVideoId || "",
  };

  return (
    <>
      <PageHeader
        title="DeafChurch First Coast"
        subtitle="Deaf Ministry"
        description={deafChurch.tagline}
        breadcrumb={[{ label: "DeafChurch", href: "/deafchurch" }]}
      />

      {/* About Section - FIRST */}
      <Section background="white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-gold-100 text-gold-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <HandHeart className="w-4 h-4" />
              CTK is an Anchor Church
            </div>

            <h2 className="font-display text-3xl font-bold text-navy-900 mb-6">
              Bringing Anglican Worship to the Deaf Community
            </h2>

            <p className="text-navy-600 text-lg mb-6 leading-relaxed">
              DeafChurch First Coast is a church plant serving the Deaf Community
              across Northeast Florida. Christ The King serves as an Anchor Church
              in the DeafChurch Together movement, helping establish in-person
              community in addition to online worship.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button href="#services" variant="primary">
                <Video className="w-4 h-4" />
                Watch ASL Services
              </Button>
              <Button href="#get-involved" variant="outline">
                Get Involved
              </Button>
            </div>
          </div>

          <div className="bg-navy-900 text-white p-8 rounded-2xl">
            <h3 className="font-display text-xl font-semibold mb-4">
              The DeafChurch Together Model
            </h3>
            <p className="text-navy-200 mb-6 leading-relaxed">
              &ldquo;DeafChurch Together&rdquo; is an online liturgical expression of the
              Christian faith in the Anglican tradition. The model establishes a
              regional Deaf Liturgical Church movement based on multiple sites as
              part of a single parish, connecting Deaf communities with Anglican
              anchor churches.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-navy-800 p-4 rounded-lg text-center">
                <Globe className="w-6 h-6 text-gold-400 mx-auto mb-2" />
                <p className="text-sm text-navy-200">Regional Reach</p>
              </div>
              <div className="bg-navy-800 p-4 rounded-lg text-center">
                <Church className="w-6 h-6 text-gold-400 mx-auto mb-2" />
                <p className="text-sm text-navy-200">Anchor Churches</p>
              </div>
              <div className="bg-navy-800 p-4 rounded-lg text-center">
                <Users className="w-6 h-6 text-gold-400 mx-auto mb-2" />
                <p className="text-sm text-navy-200">In-Person Community</p>
              </div>
              <div className="bg-navy-800 p-4 rounded-lg text-center">
                <Video className="w-6 h-6 text-gold-400 mx-auto mb-2" />
                <p className="text-sm text-navy-200">Online Worship</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Fr. Bob Quote - SECOND */}
      <Section background="navy">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Quote Side */}
          <div>
            <blockquote className="relative">
              <Quote className="w-10 h-10 text-gold-500/30 absolute -top-2 -left-2" />
              <p className="font-display text-xl sm:text-2xl text-white leading-relaxed pl-8 mb-6">
                &ldquo;God has stirred up a vision for establishing a regional Deaf
                Liturgical Church movement based on the model of multiple sites as
                part of a single parish.&rdquo;
              </p>
              <footer className="pl-8">
                <p className="text-gold-400 font-semibold text-lg">Fr. Bob Ayres</p>
                <p className="text-navy-300">Founder, DeafChurch Together</p>
              </footer>
            </blockquote>
          </div>

          {/* Image Side */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/team/revs-kathy-bob-ayres.jpg"
                alt="Fr. Bob and Deacon Kathy Ayres"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* The Story */}
      <Section background="cream">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            subtitle="The Story"
            title="A Vision for Deaf Ministry"
          />

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-xl border border-cream-200">
              <h3 className="font-display text-xl font-semibold text-navy-900 mb-4">
                {deafChurch.founderName}
              </h3>
              <p className="text-navy-600 leading-relaxed mb-4">
                Fr. Bob is the founding pastor of DeafChurch Together. He and his
                wife Deacon Kathy have been involved in Deaf ministry since the
                mid-1980s.
              </p>
              <p className="text-navy-600 leading-relaxed">
                {deafChurch.familyInfo}
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-cream-200">
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="w-5 h-5 text-gold-500" />
                  <h4 className="font-semibold text-navy-900">
                    Deaf Teen Quest (2000)
                  </h4>
                </div>
                <p className="text-navy-600 text-sm">
                  DTQ is now a national ministry model for Youth For Christ USA.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-cream-200">
                <div className="flex items-center gap-3 mb-3">
                  <Video className="w-5 h-5 text-gold-500" />
                  <h4 className="font-semibold text-navy-900">
                    Online ASL Services (2020)
                  </h4>
                </div>
                <p className="text-navy-600 text-sm">
                  Weekly liturgical services in American Sign Language launched
                  in May 2020.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-cream-200">
                <div className="flex items-center gap-3 mb-3">
                  <BookOpen className="w-5 h-5 text-gold-500" />
                  <h4 className="font-semibold text-navy-900">Publication</h4>
                </div>
                <p className="text-navy-600 text-sm italic">
                  &quot;{deafChurch.publicationTitle}&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Weekly Services */}
      <Section background="white" id="services">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeader
            subtitle="Join Us"
            title="Weekly ASL Services"
            description="Experience Anglican liturgy in American Sign Language, streaming live on YouTube."
          />

          {/* YouTube Embed */}
          <div className="mb-8">
            <DeafChurchVideo videoId={deafChurch.videoId} />
          </div>

          <Button
            href="https://www.youtube.com/@deafchurchtogether/videos"
            external
            variant="primary"
            size="lg"
          >
            <Video className="w-4 h-4" />
            View All Services on YouTube
          </Button>
        </div>
      </Section>

      {/* Get Involved */}
      <Section background="navy" id="get-involved">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-6">
            Get Involved
          </h2>
          <p className="text-navy-200 text-lg mb-8">
            Whether you&apos;re Deaf, hard of hearing, know ASL, or simply want to
            support this ministry, we&apos;d love to connect with you.
          </p>

          <div className="bg-navy-800 p-8 rounded-xl inline-block">
            <h3 className="text-gold-400 font-semibold mb-4">Contact</h3>
            <p className="text-white font-display text-lg mb-2">
              {deafChurch.founderName}
            </p>
            <a
              href={`mailto:${deafChurch.founderEmail}`}
              className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300"
            >
              <Mail className="w-4 h-4" />
              {deafChurch.founderEmail}
            </a>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section background="cream">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl font-bold text-navy-900 mb-4">
            Learn More About Fr. Bob
          </h2>
          <p className="text-navy-600 mb-6">
            Read more about Fr. Bob&apos;s journey and ministry.
          </p>
          <Button href="/about/team/bob-ayres" variant="outline">
            View Full Bio
          </Button>
        </div>
      </Section>
    </>
  );
}
