import { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/Section";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { getChurchInfo } from "@/lib/content";
import {
  MapPin,
  Clock,
  Car,
  Baby,
  BookOpen,
  Users,
  Coffee,
  Music,
  Heart,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Visit Us",
  description:
    "Plan your first visit to Christ The King Anglican Church in St. Augustine, FL. Service times, location, what to expect, and more.",
};

export default async function VisitPage() {
  const churchInfo = await getChurchInfo();

  return (
    <>
      <PageHeader
        title="Plan Your Visit"
        subtitle="Welcome to CTK"
        description="We're so glad you're considering joining us! Here's everything you need to know for your first Sunday."
        breadcrumb={[{ label: "Visit", href: "/visit" }]}
      />

      {/* Service Info & Map */}
      <Section background="white">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <h2 className="font-display text-3xl font-bold text-navy-900 mb-6">
              Join Us This Sunday
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-gold-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 text-lg">
                    Service Time
                  </h3>
                  <p className="text-navy-600">{churchInfo.serviceTime}</p>
                  <p className="text-sm text-navy-500 mt-1">
                    Also streaming live on YouTube
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-gold-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 text-lg">
                    Location
                  </h3>
                  <p className="text-navy-600">
                    {churchInfo.address.street}
                    <br />
                    {churchInfo.address.city}, {churchInfo.address.state}{" "}
                    {churchInfo.address.zip}
                  </p>
                  <p className="text-sm text-navy-500 mt-1">
                    Just south of SR206
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Car className="w-6 h-6 text-gold-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 text-lg">
                    Parking
                  </h3>
                  <p className="text-navy-600">
                    Free parking available in our lot. Handicap accessible
                    spaces near the entrance.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${churchInfo.address.street}, ${churchInfo.address.city}, ${churchInfo.address.state} ${churchInfo.address.zip}`
                )}`}
                external
                variant="primary"
              >
                <MapPin className="w-4 h-4" />
                Get Directions
              </Button>
            </div>
          </div>

          {/* Map Embed */}
          <div className="rounded-xl overflow-hidden shadow-lg h-[400px] lg:h-auto">
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(
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
          title="What to Expect"
          subtitle="Your First Visit"
          description="We want you to feel comfortable and welcome from the moment you arrive."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl border border-navy-100">
            <div className="w-12 h-12 bg-navy-100 rounded-lg flex items-center justify-center mb-4">
              <Music className="w-6 h-6 text-navy-700" />
            </div>
            <h3 className="font-display text-xl font-semibold text-navy-900 mb-2">
              Worship Style
            </h3>
            <p className="text-navy-600 text-sm leading-relaxed">
              We practice blended worship, combining traditional hymns with
              contemporary Christian music. Our services follow the Anglican
              liturgy with Scripture readings, prayers, a sermon, and Holy
              Communion every week.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-navy-100">
            <div className="w-12 h-12 bg-navy-100 rounded-lg flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-navy-700" />
            </div>
            <h3 className="font-display text-xl font-semibold text-navy-900 mb-2">
              Holy Communion
            </h3>
            <p className="text-navy-600 text-sm leading-relaxed">
              We celebrate Holy Eucharist (Communion) every Sunday. All
              baptized Christians who love the Lord are welcome to receive.
              If you&apos;re not ready to receive, you&apos;re welcome to come forward
              for a blessing.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-navy-100">
            <div className="w-12 h-12 bg-navy-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-navy-700" />
            </div>
            <h3 className="font-display text-xl font-semibold text-navy-900 mb-2">
              Dress Code
            </h3>
            <p className="text-navy-600 text-sm leading-relaxed">
              Come as you are! Any attire is welcome, from &quot;Sunday
              best&quot; to jeans and t-shirts to shorts and flip flops.
              We&apos;re just glad you&apos;re here.
            </p>
          </div>
        </div>
      </Section>

      {/* Children & Youth */}
      <Section background="white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-video lg:aspect-square rounded-xl overflow-hidden order-2 lg:order-1">
            <Image
              src="/images/ministries/sunday-school.jpg"
              alt="Children's Sunday School at CTK"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-gold-600 font-semibold text-sm uppercase tracking-wider mb-2">
              For Families
            </p>
            <h2 className="font-display text-3xl font-bold text-navy-900 mb-6">
              Children & Youth
            </h2>
            <p className="text-navy-600 mb-6 leading-relaxed">
              We love having kids in worship! Here&apos;s what we offer for
              families:
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Baby className="w-5 h-5 text-gold-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-navy-900">Nursery</h4>
                  <p className="text-sm text-navy-600">
                    Available for infants through kindergarten
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-gold-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-navy-900">Sunday School</h4>
                  <p className="text-sm text-navy-600">
                    1st–5th graders are dismissed before the sermon and return
                    for Communion
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-gold-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-navy-900">Teens</h4>
                  <p className="text-sm text-navy-600">
                    6th–12th graders worship with their families
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-cream-100 rounded-2xl p-8 mt-8">
              <h3 className="font-display text-xl font-semibold text-navy-900 mb-4">
                Child Safety
              </h3>
              <p className="text-navy-600 mb-4">
                The safety of your children is our top priority. All volunteers
                who work with children undergo background screening and
                MinistrySafe training.
              </p>
              <Button href="/serve/safeguarding" variant="ghost" size="sm">
                Learn More About Safeguarding →
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
            Stay for Fellowship
          </h2>
          <p className="text-navy-600 text-lg mb-8">
            After the service, we invite you to stay for refreshments and
            fellowship. It&apos;s a great time to meet people, ask questions, and
            learn more about the CTK community.
          </p>
          <Button href="/connect" variant="primary" size="lg">
            Ways to Get Connected
          </Button>
        </div>
      </Section>

      {/* Next Steps */}
      <Section background="navy">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Ready to Take the Next Step?
          </h2>
          <p className="text-navy-200 text-lg mb-8 max-w-2xl mx-auto">
            If you&apos;re interested in learning more about the Anglican faith or
            becoming a member, we offer a 9-week Catechism class for new
            believers and those exploring.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/connect/classes" variant="secondary" size="lg">
              Learn About Classes
            </Button>
            <Button
              href="/connect/contact"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-navy-900"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
