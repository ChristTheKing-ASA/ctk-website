import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Facebook, Youtube, Instagram } from "lucide-react";
import { navigation } from "@/data/church";
import type { ChurchInfoTransformed } from "@/lib/content";

export function Footer({ churchInfo }: { churchInfo: ChurchInfoTransformed }) {
  const socialLinks = [
    { label: "Facebook", href: churchInfo.social.facebook, Icon: Facebook },
    { label: "YouTube", href: churchInfo.social.youtube, Icon: Youtube },
    { label: "Instagram", href: churchInfo.social.instagram, Icon: Instagram },
  ].filter((link) => link.href);

  // Names still show without a URL; only the link is dropped.
  const affiliations = [
    { name: churchInfo.diocese.name, url: churchInfo.diocese.url },
    { name: churchInfo.denomination.name, url: churchInfo.denomination.url },
  ].filter((item) => item.name);

  return (
    <footer className="bg-navy-900 text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Visit Us */}
          <div>
            <h3 className="font-display text-lg font-semibold text-gold-400 mb-4">
              Visit Us
            </h3>
            <ul className="space-y-3 text-navy-200">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-gold-500" />
                <div>
                  <p>{churchInfo.address.street}</p>
                  <p>{churchInfo.address.city}, {churchInfo.address.state} {churchInfo.address.zip}</p>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-5 h-5 flex-shrink-0 text-gold-500" />
                <span>{churchInfo.serviceTime}</span>
              </li>
            </ul>

            {/* Map Link */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${churchInfo.address.street}, ${churchInfo.address.city}, ${churchInfo.address.state} ${churchInfo.address.zip}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-sm text-gold-400 hover:text-gold-300 underline underline-offset-2"
            >
              Get Directions →
            </a>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-display text-lg font-semibold text-gold-400 mb-4">
              Connect
            </h3>
            <ul className="space-y-3 text-navy-200">
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 flex-shrink-0 text-gold-500" />
                <a href={`tel:${churchInfo.phone.replace(/\./g, "")}`} className="hover:text-white transition-colors">
                  {churchInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 flex-shrink-0 text-gold-500" />
                <a href={`mailto:${churchInfo.email}`} className="hover:text-white transition-colors">
                  {churchInfo.email}
                </a>
              </li>
            </ul>

            {/* App Link */}
            {churchInfo.giving.appUrl && (
              <a
                href={churchInfo.giving.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-sm text-gold-400 hover:text-gold-300 underline underline-offset-2"
              >
                Download Our App →
              </a>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-semibold text-gold-400 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-navy-200 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/give"
                  className="text-gold-400 hover:text-gold-300 font-medium transition-colors"
                >
                  Give Online
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow & Affiliation */}
          <div>
            <h3 className="font-display text-lg font-semibold text-gold-400 mb-4">
              Follow Us
            </h3>
            {/* A social link cleared in Keystatic is hidden rather than
                rendered as an empty href, which would reload the page. */}
            {socialLinks.length > 0 && (
              <div className="flex gap-4 mb-6">
                {socialLinks.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-navy-800 hover:bg-navy-700 rounded-full flex items-center justify-center transition-colors"
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            )}

            {/* Affiliations */}
            <div className="space-y-2 text-sm text-navy-300">
              <p>A member of the</p>
              <div className="space-y-1">
                {affiliations.map(({ name, url }) =>
                  url ? (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-navy-200 hover:text-white transition-colors"
                    >
                      {name}
                    </a>
                  ) : (
                    <p key={name} className="block text-navy-200">
                      {name}
                    </p>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logos/ctk-logo-cross-optimized.png"
                alt="Christ The King"
                width={32}
                height={40}
                className="h-10 w-auto opacity-80"
              />
              <p className="text-sm text-navy-400">© {new Date().getFullYear()} Christ The King Anglican Church</p>
            </div>
            <p className="text-sm text-navy-400 italic">
              {churchInfo.scripture.main.text}
              <span className="text-navy-500 ml-1">— {churchInfo.scripture.main.reference}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
