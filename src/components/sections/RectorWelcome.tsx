import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { getClergyBySlug } from "@/lib/content";
import { Quote } from "lucide-react";

export async function RectorWelcome() {
  const rectorData = await getClergyBySlug("craig-sanders");

  if (!rectorData) return null;

  const rector = {
    slug: "craig-sanders",
    name: rectorData.name?.name || "",
    title: rectorData.title || "",
    image: rectorData.image || "",
    quote: "I wanted to eat, sleep, and breathe the Bible. The Anglican tradition provided a trustworthy model for patterning my life around Scripture, forming in me Bible-shaped worship and prayer.",
  };

  return (
    <Section background="cream">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="relative">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-navy-100 shadow-xl relative">
            {rector.image ? (
              <Image
                src={rector.image}
                alt={rector.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy-200 to-navy-300">
                <span className="text-6xl font-display font-bold text-navy-500">
                  CS
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div>
          <p className="text-gold-600 font-semibold text-sm uppercase tracking-wider mb-4">
            A Word from Our Rector
          </p>

          <div className="relative mb-6">
            <Quote className="absolute -top-2 -left-4 w-8 h-8 text-gold-300" />
            <blockquote className="font-display text-2xl sm:text-3xl text-navy-900 leading-relaxed pl-6 italic">
              {rector.quote}
            </blockquote>
          </div>

          <div className="mb-6">
            <p className="font-display text-lg font-semibold text-navy-900">
              {rector.name}
            </p>
            <p className="text-gold-600 font-medium">{rector.title}</p>
          </div>

          <p className="text-navy-600 mb-8 leading-relaxed">
            At Christ the King, we believe the Anglican tradition offers a beautiful path
            for following Jesus—one that is rooted in Scripture, shaped by liturgy, and
            lived out in community. Whether you&apos;re new to faith or have walked with
            Christ for years, we invite you to journey with us.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button href={`/about/team/${rector.slug}`} variant="primary">
              Meet Fr. Craig
            </Button>
            <Button href="/about" variant="ghost">
              About Our Church →
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
