import { Metadata } from "next";
import { PageHeader } from "@/components/ui/Section";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { LatestSermon } from "@/components/LatestSermon";
import { churchInfo } from "@/data/church";
import { Video, Podcast, Smartphone } from "lucide-react";

export const metadata: Metadata = {
  title: "Sermons",
  description:
    "Watch and listen to sermons from Christ the King Anglican Church.",
};

export default function SermonsPage() {
  return (
    <>
      <PageHeader
        title="Sermons"
        subtitle="Watch & Listen"
        description="Catch up on recent messages or explore our sermon archive."
        breadcrumb={[
          { label: "Worship", href: "/worship" },
          { label: "Sermons", href: "/worship/sermons" },
        ]}
      />

      <Section background="white">
        <div className="max-w-4xl mx-auto">
          {/* Latest Sermon */}
          <div className="mb-12">
            <LatestSermon />
          </div>

          {/* Ways to Watch */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-cream-50 p-6 rounded-xl text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-display text-lg font-semibold text-navy-900 mb-2">
                YouTube
              </h3>
              <p className="text-navy-600 text-sm mb-4">
                Watch live or browse our full sermon archive.
              </p>
              <Button href={churchInfo.social.youtube} external variant="outline" size="sm">
                Go to YouTube
              </Button>
            </div>

            <div className="bg-cream-50 p-6 rounded-xl text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Podcast className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-display text-lg font-semibold text-navy-900 mb-2">
                Podcast
              </h3>
              <p className="text-navy-600 text-sm mb-4">
                Listen on the go with our audio podcast feed.
              </p>
              <Button href="#" variant="outline" size="sm">
                Coming Soon
              </Button>
            </div>

            <div className="bg-cream-50 p-6 rounded-xl text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-display text-lg font-semibold text-navy-900 mb-2">
                Church App
              </h3>
              <p className="text-navy-600 text-sm mb-4">
                Access sermons and more through our mobile app.
              </p>
              <Button href={churchInfo.giving.appUrl} external variant="outline" size="sm">
                Get the App
              </Button>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-navy-900 text-white rounded-xl p-8 text-center">
            <h2 className="font-display text-2xl font-bold mb-4">
              Join Us In Person
            </h2>
            <p className="text-navy-200 mb-6">
              There&apos;s nothing like experiencing worship together. Join us this
              Sunday at 10:00 AM.
            </p>
            <Button href="/visit" variant="secondary">
              Plan Your Visit
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
