import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Heart, BookOpen, HandHeart, Play } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex flex-col bg-navy-950">
      {/* Background Image - more visible */}
      <div className="absolute inset-0">
        <Image
          src="/images/church/interior-worship.jpg"
          alt="Christ the King Anglican Church worship service"
          fill
          priority
          className="object-cover opacity-50"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-950/70 to-navy-950/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Church Name - prominent */}
        <div className="text-center mb-16 lg:mb-20">
          <h1 className="font-display font-bold text-white">
            <span className="block text-5xl sm:text-6xl lg:text-7xl tracking-tight">
              Christ the King
            </span>
            <span className="block text-xl sm:text-2xl lg:text-3xl text-gold-400 font-normal mt-3 tracking-wide">
              Anglican Church
            </span>
          </h1>
        </div>

        {/* Mission - breathe */}
        <div className="text-center mb-12">
          <p className="text-gold-400/80 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            Our Mission
          </p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-3 tracking-tight">
            Love God. Become Disciples. Serve Others.
          </h2>
          <p className="text-white/50 italic text-lg">
            To be co-workers with Christ in the Kingdom of God
          </p>
        </div>

        {/* Three Pillars - lighter touch */}
        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-14">
          <div className="text-center">
            <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-gold-400" />
            </div>
            <h3 className="font-display text-lg font-semibold text-white mb-1">
              Love God
            </h3>
            <p className="text-white/50 text-sm leading-relaxed">
              With all your heart, soul,<br />mind, and strength
            </p>
          </div>

          <div className="text-center">
            <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-gold-400" />
            </div>
            <h3 className="font-display text-lg font-semibold text-white mb-1">
              Become Disciples
            </h3>
            <p className="text-white/50 text-sm leading-relaxed">
              Growing in spiritual maturity<br />modeled on Christ
            </p>
          </div>

          <div className="text-center">
            <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <HandHeart className="w-6 h-6 text-gold-400" />
            </div>
            <h3 className="font-display text-lg font-semibold text-white mb-1">
              Serve Others
            </h3>
            <p className="text-white/50 text-sm leading-relaxed">
              Expressing divine love<br />through humble service
            </p>
          </div>
        </div>

        {/* CTA */}
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
