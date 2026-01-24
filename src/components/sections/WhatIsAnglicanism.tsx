import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Book, Church, Globe } from "lucide-react";

export function WhatIsAnglicanism() {
  return (
    <Section background="white">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-gold-600 text-sm font-semibold uppercase tracking-wider mb-3">
          Our Tradition
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900 mb-6">
          What is Anglicanism?
        </h2>
        <p className="text-lg sm:text-xl text-navy-600 leading-relaxed mb-10">
          Anglicanism is a worldwide body of Christians responding to God&apos;s revelation
          through Jesus Christ. It brings together the authority of the Bible, the historic
          faith, and the beauty of structured prayer. Rooted in tradition, yet contemporary
          in practice. United in substance, yet diverse in expression. We are a global
          family living out our faith in local communities.
        </p>

        <div className="grid sm:grid-cols-3 gap-6 mb-10">
          <div className="p-6">
            <div className="w-12 h-12 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Book className="w-6 h-6 text-navy-700" />
            </div>
            <h3 className="font-semibold text-navy-900 mb-1">Scripture</h3>
            <p className="text-sm text-navy-600">The authority of God&apos;s Word</p>
          </div>
          <div className="p-6">
            <div className="w-12 h-12 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Church className="w-6 h-6 text-navy-700" />
            </div>
            <h3 className="font-semibold text-navy-900 mb-1">Tradition</h3>
            <p className="text-sm text-navy-600">The historic faith of the Church</p>
          </div>
          <div className="p-6">
            <div className="w-12 h-12 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-6 h-6 text-navy-700" />
            </div>
            <h3 className="font-semibold text-navy-900 mb-1">Community</h3>
            <p className="text-sm text-navy-600">A global family, local expression</p>
          </div>
        </div>

        <Button href="/about/anglican-faith" variant="outline">
          Learn More About Anglicanism
        </Button>
      </div>
    </Section>
  );
}
