import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { getChurchInfo } from "@/lib/content";
import { Heart, BookOpen, HandHeart, Play } from "lucide-react";

export async function Hero() {
  const churchInfo = await getChurchInfo();

  return (
    <section className="relative min-h-[calc(100svh-5.5rem)] md:min-h-[85vh] flex flex-col bg-navy-950">
      {/* Sunday arrivals photo with a translucent scrim for text contrast */}
      <div className="absolute inset-0">
        <Image
          src="/images/church/greeters.jpg"
          alt="A family arriving for Sunday worship at Christ The King Anglican Church"
          fill
          priority
          className="object-cover object-[15%_center] sm:object-[25%_center] md:object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/45 via-navy-950/55 to-navy-950/75" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Church Name - prominent */}
        <div className="text-center mb-10 md:mb-16 lg:mb-20">
          <h1 className="font-display font-bold text-white">
            <span className="block text-4xl sm:text-6xl lg:text-7xl tracking-tight">
              Christ The King
            </span>
            <span className="block text-xl sm:text-2xl lg:text-3xl text-gold-400 font-normal mt-3 tracking-wide">
              Anglican Church
            </span>
          </h1>
        </div>

        {/* Mission - breathe */}
        <div className="text-center mb-8 md:mb-12">
          <p className="text-gold-400/80 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            Our Mission
          </p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-3 tracking-tight">
            Love God. Become Disciples. Serve Others.
          </h2>
          <p className="text-white/60 italic text-base sm:text-lg">
            {churchInfo.mission.vision}
          </p>
        </div>

        {/* Three Pillars - the mission heading carries this message on phones */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-14">
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 text-center border border-white/30 shadow-lg">
            <div className="w-12 h-12 bg-gold-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-gold-300" />
            </div>
            <h3 className="font-display text-lg font-semibold text-white mb-2">
              Love God
            </h3>
            <p className="text-white/80 text-sm">
              With all your heart, soul, mind, and strength
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 text-center border border-white/30 shadow-lg">
            <div className="w-12 h-12 bg-gold-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-gold-300" />
            </div>
            <h3 className="font-display text-lg font-semibold text-white mb-2">
              Become Disciples
            </h3>
            <p className="text-white/80 text-sm">
              Growing in spiritual maturity modeled on Christ
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 text-center border border-white/30 shadow-lg">
            <div className="w-12 h-12 bg-gold-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <HandHeart className="w-6 h-6 text-gold-300" />
            </div>
            <h3 className="font-display text-lg font-semibold text-white mb-2">
              Serve Others
            </h3>
            <p className="text-white/80 text-sm">
              Expressing divine love through humble service
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
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
