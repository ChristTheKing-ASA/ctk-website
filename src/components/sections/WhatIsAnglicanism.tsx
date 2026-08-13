import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { getHomePage } from "@/lib/content";
import { Icon } from "@/lib/icons";

export async function WhatIsAnglicanism() {
  const home = await getHomePage();
  const cards = home?.anglicanCards ?? [];

  return (
    <Section background="white">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-gold-600 text-sm font-semibold uppercase tracking-wider mb-3">
          {home?.anglicanEyebrow}
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900 mb-6">
          {home?.anglicanTitle}
        </h2>
        <p className="text-lg sm:text-xl text-navy-600 leading-relaxed mb-10">
          {home?.anglicanBody}
        </p>

        {cards.length > 0 && (
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {cards.map((card) => (
              <div key={card.title} className="p-6">
                <div className="w-12 h-12 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={card.icon} className="w-6 h-6 text-navy-700" />
                </div>
                <h3 className="font-semibold text-navy-900 mb-1">{card.title}</h3>
                <p className="text-sm text-navy-600">{card.description}</p>
              </div>
            ))}
          </div>
        )}

        {home?.anglicanCtaLabel && (
          <Button href={home.anglicanCtaHref || "/about/anglican-faith"} variant="outline">
            {home.anglicanCtaLabel}
          </Button>
        )}
      </div>
    </Section>
  );
}
