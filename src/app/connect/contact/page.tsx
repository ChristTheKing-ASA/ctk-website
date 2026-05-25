import { Metadata } from "next";
import { PageHeader } from "@/components/ui/Section";
import { Section } from "@/components/ui/Section";
import { getChurchInfo } from "@/lib/content";
import { ContactForm } from "@/components/ContactForm";
import { ChurchMapEmbed } from "@/components/ChurchMapEmbed";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Christ The King Anglican Church.",
};

export default async function ContactPage() {
  const churchInfo = await getChurchInfo();

  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Get in Touch"
        description="We'd love to hear from you. Reach out with questions, prayer requests, or just to say hello."
        breadcrumb={[
          { label: "Connect", href: "/connect" },
          { label: "Contact", href: "/connect/contact" },
        ]}
      />

      <Section background="white">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="font-display text-2xl font-bold text-navy-900 mb-8">
              Contact Information
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-gold-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-1">Location</h3>
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
                  <Mail className="w-6 h-6 text-gold-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-1">Mailing Address</h3>
                  <p className="text-navy-600">{churchInfo.address.mailing}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-gold-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-1">Phone</h3>
                  <a
                    href={`tel:${churchInfo.phone.replace(/\./g, "")}`}
                    className="text-navy-600 hover:text-gold-600 transition-colors"
                  >
                    {churchInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-gold-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-1">Service Time</h3>
                  <p className="text-navy-600">{churchInfo.serviceTime}</p>
                </div>
              </div>
            </div>

            {/* Staff Contacts */}
            <div className="mt-12 pt-8 border-t border-navy-100">
              <h3 className="font-display text-xl font-semibold text-navy-900 mb-6">
                Staff Contacts
              </h3>
              <div className="space-y-4">
                <div className="bg-cream-50 p-4 rounded-lg">
                  <p className="font-semibold text-navy-900">
                    The Rev. Dr. Craig Sanders
                  </p>
                  <p className="text-sm text-gold-600">Rector</p>
                  <a
                    href={`mailto:${churchInfo.email}`}
                    className="text-sm text-navy-600 hover:text-gold-600"
                  >
                    {churchInfo.email}
                  </a>
                </div>
                <div className="bg-cream-50 p-4 rounded-lg">
                  <p className="font-semibold text-navy-900">Terri Husberg</p>
                  <p className="text-sm text-gold-600">Parish Administrator</p>
                  <a
                    href={`mailto:${churchInfo.adminEmail}`}
                    className="text-sm text-navy-600 hover:text-gold-600"
                  >
                    {churchInfo.adminEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-cream-50 rounded-xl p-6 lg:p-8 shadow-sm">
              <h2 className="font-display text-2xl font-bold text-navy-900 mb-2">
                Send Us a Message
              </h2>
              <p className="text-navy-600 mb-6">
                Have a question or want to learn more? Fill out the form below and we&apos;ll get back to you soon.
              </p>
              <ContactForm fallbackEmail={churchInfo.email} />
            </div>
          </div>
        </div>
      </Section>

      {/* Map Section */}
      <Section background="cream">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-navy-900 mb-6 text-center">
            Find Us
          </h2>
          <div className="rounded-xl overflow-hidden shadow-lg h-[400px]">
            <ChurchMapEmbed
              street={churchInfo.address.street}
              city={churchInfo.address.city}
              state={churchInfo.address.state}
              zip={churchInfo.address.zip}
            />
          </div>
          <div className="text-center mt-4">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${churchInfo.address.street}, ${churchInfo.address.city}, ${churchInfo.address.state} ${churchInfo.address.zip}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 font-medium"
            >
              <MapPin className="w-4 h-4" />
              Get Directions in Google Maps
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
