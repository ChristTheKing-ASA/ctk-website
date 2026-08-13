import { Metadata } from "next";
import { PageHeader } from "@/components/ui/Section";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { getChurchInfo, getStoryPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "The history of Christ The King Anglican Church in St. Augustine, Florida.",
};

export default async function StoryPage() {
  const churchInfo = await getChurchInfo();
  const page = await getStoryPage();

  return (
    <>
      <PageHeader
        title={page?.heroTitle || "Our History"}
        subtitle={page?.heroSubtitle || ""}
        description={page?.heroDescription || ""}
        breadcrumb={[
          { label: "About", href: "/about" },
          { label: "Story", href: "/about/story" },
        ]}
      />

      <Section background="white">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg prose-navy max-w-none">
            <p className="text-xl text-navy-700 leading-relaxed mb-8">
              Christ The King Anglican Church has been serving the St. Augustine
              community with a commitment to Scripture, liturgy, and love.
            </p>

            <h2 className="font-display text-2xl font-bold text-navy-900 mt-12 mb-4">
              A Community of Faith
            </h2>
            <p className="text-navy-600 leading-relaxed mb-6">
              Located in the historic city of St. Augustine, Florida—the oldest
              continuously occupied European settlement in the United States—CTK
              carries forward a rich tradition of Christian witness that dates
              back to the city&apos;s founding.
            </p>

            <p className="text-navy-600 leading-relaxed mb-6">
              Our congregation gathers each Sunday to worship God through the
              beauty of Anglican liturgy, to hear the Word of God proclaimed,
              and to receive the grace of Christ in the Holy Eucharist.
            </p>

            <h2 className="font-display text-2xl font-bold text-navy-900 mt-12 mb-4">
              Part of a Larger Story
            </h2>
            <p className="text-navy-600 leading-relaxed mb-6">
              Christ The King is a member of the {churchInfo.diocese.name} in the{" "}
              {churchInfo.denomination.name} (ACNA). We are connected to
              Anglicans around the world who share our commitment to the
              authority of Scripture and the historic faith once delivered to
              the saints.
            </p>

            <h2 className="font-display text-2xl font-bold text-navy-900 mt-12 mb-4">
              Looking Forward
            </h2>
            <p className="text-navy-600 leading-relaxed mb-6">
              Today, CTK continues to grow in its mission to love God, become
              disciples, and serve others. Through ministries like DeafChurch
              First Coast, partnerships with local and global mission
              organizations, and a commitment to forming disciples through
              worship and teaching, we seek to be faithful witnesses to Christ
              in St. Augustine and beyond.
            </p>

            <div className="bg-cream-100 rounded-xl p-8 my-12">
              <h3 className="font-display text-xl font-semibold text-navy-900 mb-4">
                Our Vision
              </h3>
              <p className="text-2xl font-display italic text-navy-800">
                &quot;{churchInfo.mission.vision}&quot;
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button href="/about/team" variant="primary">
              Meet Our Leadership
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
