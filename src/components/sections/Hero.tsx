import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Heart, BookOpen, HandHeart, Play } from "lucide-react";

export function Hero() {
  return (
    <section className="relative bg-navy-950">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/church/interior-worship.jpg"
          alt="Christ the King Anglican Church worship service"
          fill
          priority
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-950/90 to-navy-950" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Section - Church Name & Tagline */}
        <div className="pt-20 pb-12 text-center">
          <h1 className="font-display font-bold text-white mb-3">
            <span className="block text-4xl sm:text-5xl lg:text-6xl">
              Christ the King
            </span>
            <span className="block text-lg sm:text-xl lg:text-2xl text-gold-400 font-medium mt-2">
              Anglican Church
            </span>
          </h1>
        </div>

        {/* Mission Section */}
        <div className="pb-20">
          <div className="text-center mb-10">
            <p className="text-gold-400 text-sm font-semibold uppercase tracking-wider mb-3">
              Our Mission
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
              Love God. Become Disciples. Serve Others.
            </h2>
            <p className="text-white/60 italic">
              To be co-workers with Christ in the Kingdom of God
            </p>
          </div>

          {/* Three Pillars */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-navy-900/80 rounded-xl p-6 text-center border border-white/10 hover:bg-navy-900/90 transition-colors">
              <div className="w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-gold-400" />
              </div>
              <h3 className="font-display text-lg font-semibold text-white mb-2">
                Love God
              </h3>
              <p className="text-white/60 text-sm">
                With all your heart, soul, mind, and strength
              </p>
            </div>

            <div className="bg-navy-900/80 rounded-xl p-6 text-center border border-white/10 hover:bg-navy-900/90 transition-colors">
              <div className="w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-gold-400" />
              </div>
              <h3 className="font-display text-lg font-semibold text-white mb-2">
                Become Disciples
              </h3>
              <p className="text-white/60 text-sm">
                Growing in spiritual maturity modeled on Christ
              </p>
            </div>

            <div className="bg-navy-900/80 rounded-xl p-6 text-center border border-white/10 hover:bg-navy-900/90 transition-colors">
              <div className="w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <HandHeart className="w-6 h-6 text-gold-400" />
              </div>
              <h3 className="font-display text-lg font-semibold text-white mb-2">
                Serve Others
              </h3>
              <p className="text-white/60 text-sm">
                Expressing divine love through humble service
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Button href="/visit" size="lg" variant="secondary">
              Plan Your Visit
            </Button>
            <Button
              href="/worship/sermons"
              size="lg"
              variant="ghost"
              className="text-white border border-white/20 hover:bg-white/10"
            >
              <Play className="w-4 h-4" />
              Watch Online
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
