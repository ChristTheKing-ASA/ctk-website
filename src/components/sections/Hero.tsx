import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Heart, BookOpen, HandHeart, Play } from "lucide-react";
import { getChurchInfo } from "@/lib/content";

const pillarIcons = [Heart, BookOpen, HandHeart] as const;

export async function Hero() {
  const churchInfo = await getChurchInfo();

  return (
    <section className="relative min-h-[85vh] flex flex-col bg-navy-950">
      <div className="absolute inset-0">
        <Image
          src="/images/church/greeters.jpg"
          alt="Christ The King Anglican Church community"
          fill
          priority
          className="object-cover opacity-50"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-950/70 to-navy-950/90" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16 lg:mb-20">
          <h1 className="font-display font-bold text-white">
            <span className="block text-5xl sm:text-6xl lg:text-7xl tracking-tight">
              {churchInfo.name.replace(/ Anglican Church$/i, "") || "Christ The King"}
            </span>
            <span className="block text-xl sm:text-2xl lg:text-3xl text-gold-400 font-normal mt-3 tracking-wide">
              Anglican Church
            </span>
          </h1>
        </div>

        <div className="text-center mb-12">
          <p className="text-gold-400/80 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            Our Mission
          </p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-3 tracking-tight">
            {churchInfo.mission.headline}
          </h2>
          <p className="text-white/50 italic text-lg">{churchInfo.mission.vision}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-14">
          {churchInfo.mission.pillars.map((pillar, index) => {
            const Icon = pillarIcons[index] ?? Heart;
            return (
              <div
                key={pillar.title}
                className="bg-white/20 backdrop-blur-md rounded-xl p-6 text-center border border-white/30 shadow-lg"
              >
                <div className="w-12 h-12 bg-gold-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-gold-300" />
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-white/80 text-sm">{pillar.description}</p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/visit" size="lg" variant="secondary">
            Plan Your Visit
          </Button>
          <Button
            href="/worship/sermons"
            size="lg"
            variant="ghost"
            className="text-white border border-white/30 hover:bg-white/10"
          >
            <Play className="w-4 h-4" />
            Watch Online
          </Button>
        </div>
      </div>
    </section>
  );
}
