import { Metadata } from "next";
import Image from "next/image";
import { PageHeader, Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { getChurchInfo, getVisitPage } from "@/lib/content";
import { Icon } from "@/lib/icons";
import { Clock, MapPin, Car, Coffee } from "lucide-react";

export const metadata: Metadata = {
  title: "Plan Your Visit",
  description:
    "Everything you need to know for your first Sunday at Christ The King Anglican Church in St. Augustine, FL.",
};

export default async function VisitPage() {
  const [churchInfo, page] = await Promise.all([getChurchInfo(), getVisitPage()]);

  const fullAddress = `${churchInfo.address.street}, ${churchInfo.address.city}, ${churchInfo.address.state} ${churchInfo.address.zip}`;
  const expectCards = page?.expectCards ?? [];
  const familyItems = page?.familyItems ?? [];

  return (
    <>
      <PageHeader
        title={page?.heroTitle || "Plan Your Visit"}
        subtitle={page?.heroSubtitle || ""}
        description={page?.heroDescription || ""}
        breadcrumb={[{ label: "Visit", href: "/visit" }]}
      />

      {/* Service Info & Map */}
      <Section background="white">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <h2 className="font-display text-3xl font-bold text-navy-900 mb-6">
              {page?.sundayTitle}
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-gold-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 text-lg">
                    {page?.serviceTimeLabel}
                  </h3>
                  <p className="text-navy-600">{churchInfo.serviceTime}</p>
                  <p className="text-sm text-navy-500 mt-1">
                    {page?.serviceTimeNote}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-gold-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 text-lg">
                    {page?.locationLabel}
                  </h3>
                  <p className="text-navy-600">
                    {churchInfo.address.street}
                    <br />
                    {churchInfo.address.city}, {churchInfo.address.state}{" "}
                    {churchInfo.address.zip}
                  </p>
                  <p className="text-sm text-navy-500 mt-1">
                    {page?.locationNote}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Car className="w-6 h-6 text-gold-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 text-lg">
                    {page?.parkingLabel}
                  </h3>
                  <p className="text-navy-600">{page?.parkingBody}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  fullAddress
                )}`}
                external
                variant="primary"
              >
                <MapPin className="w-4 h-4" />
                {page?.directionsCtaLabel}
              </Button>
            </div>
          </div>

          {/* Map Embed */}
          <div className="rounded-xl overflow-hidden shadow-lg h-[400px] lg:h-auto">
            {/* Keyless embed. The Maps Embed API needs an API key, which then
                ships in the page source for anyone to copy. This endpoint needs
                none and renders the same map. */}
            <iframe
              src={`https://www.google.com/maps?output=embed&q=${encodeURIComponent(
                `Christ The King Anglican Church, ${churchInfo.address.street}, ${churchInfo.address.city}, ${churchInfo.address.state}`
              )}`}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Church Location Map"
            />
          </div>
        </div>
      </Section>

      {/* What to Expect */}
      <Section background="cream">
        <SectionHeader
          title={page?.expectTitle || ""}
          subtitle={page?.expectSubtitle || ""}
          description={page?.expectDescription || ""}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expectCards.map((card) => (
            <div
              key={card.title}
              className="bg-white p-6 rounded-xl border border-navy-100"
            >
              <div className="w-12 h-12 bg-navy-100 rounded-lg flex items-center justify-center mb-4">
                <Icon name={card.icon} className="w-6 h-6 text-navy-700" />
              </div>
              <h3 className="font-display text-xl font-semibold text-navy-900 mb-2">
                {card.title}
              </h3>
              <p className="text-navy-600 text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Children & Youth */}
      <Section background="white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-video lg:aspect-square rounded-xl overflow-hidden order-2 lg:order-1">
            {page?.familyImage && (
              <Image
                src={page.familyImage}
                alt={page.familyImageAlt || ""}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            )}
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-gold-600 font-semibold text-sm uppercase tracking-wider mb-2">
              {page?.familyEyebrow}
            </p>
            <h2 className="font-display text-3xl font-bold text-navy-900 mb-6">
              {page?.familyTitle}
            </h2>
            <p className="text-navy-600 mb-6 leading-relaxed">
              {page?.familyIntro}
            </p>

            <div className="space-y-4">
              {familyItems.map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <Icon
                    name={item.icon}
                    className="w-5 h-5 text-gold-500 mt-1 shrink-0"
                  />
                  <div>
                    <h4 className="font-semibold text-navy-900">{item.title}</h4>
                    <p className="text-sm text-navy-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-cream-100 rounded-2xl p-8 mt-8">
              <h3 className="font-display text-xl font-semibold text-navy-900 mb-4">
                {page?.childSafetyTitle}
              </h3>
              <p className="text-navy-600 mb-4">{page?.childSafetyBody}</p>
              <Button href="/serve/safeguarding" variant="ghost" size="sm">
                {page?.childSafetyCtaLabel}
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* After Service */}
      <Section background="cream">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Coffee className="w-8 h-8 text-gold-600" />
          </div>
          <h2 className="font-display text-3xl font-bold text-navy-900 mb-4">
            {page?.fellowshipTitle}
          </h2>
          <p className="text-navy-600 text-lg mb-8">{page?.fellowshipBody}</p>
          <Button href="/connect" variant="primary" size="lg">
            {page?.fellowshipCtaLabel}
          </Button>
        </div>
      </Section>

      {/* Next Steps */}
      <Section background="navy">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            {page?.nextStepsTitle}
          </h2>
          <p className="text-navy-200 text-lg mb-8 max-w-2xl mx-auto">
            {page?.nextStepsBody}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/connect/classes" variant="secondary" size="lg">
              {page?.nextStepsPrimaryCtaLabel}
            </Button>
            <Button
              href="/connect/contact"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-navy-900"
            >
              {page?.nextStepsSecondaryCtaLabel}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
