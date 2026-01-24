import { Metadata } from "next";
import { PageHeader } from "@/components/ui/Section";
import { Section } from "@/components/ui/Section";
import { weeklyActivities } from "@/data/church";
import { Clock, MapPin, Mail, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Weekly Gatherings",
  description:
    "Weekly prayer and Bible study opportunities at Christ the King Anglican Church.",
};

export default function WeeklyPage() {
  return (
    <>
      <PageHeader
        title="Weekly Gatherings"
        subtitle="Prayer & Study"
        description="Beyond Sunday worship, join us for times of prayer and Bible study throughout the week."
        breadcrumb={[
          { label: "Worship", href: "/worship" },
          { label: "Weekly", href: "/worship/weekly" },
        ]}
      />

      <Section background="white">
        <div className="max-w-3xl mx-auto space-y-8">
          {weeklyActivities.map((activity) => (
            <div
              key={activity.title}
              className="bg-cream-50 rounded-xl p-8 border border-cream-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="font-display text-2xl font-bold text-navy-900">
                  {activity.title}
                </h2>
                <span className="inline-flex items-center gap-2 bg-gold-100 text-gold-700 px-4 py-2 rounded-full text-sm font-medium">
                  <Clock className="w-4 h-4" />
                  {activity.day}s at {activity.time}
                </span>
              </div>

              <p className="text-navy-600 text-lg mb-6 leading-relaxed">
                {activity.description}
              </p>

              <div className="flex items-center gap-2 text-navy-500 mb-6">
                <MapPin className="w-5 h-5" />
                <span>{activity.location}</span>
              </div>

              {activity.contacts && (
                <div className="border-t border-cream-300 pt-6">
                  <p className="text-sm font-medium text-navy-900 mb-3">
                    For more information, contact:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {activity.contacts.map((contact) => (
                      <div
                        key={contact.name}
                        className="bg-white p-4 rounded-lg"
                      >
                        <p className="font-semibold text-navy-900 mb-2">
                          {contact.name}
                        </p>
                        {contact.phone && (
                          <a
                            href={`tel:${contact.phone.replace(/[^\d]/g, "")}`}
                            className="flex items-center gap-2 text-sm text-navy-600 hover:text-gold-600 mb-1"
                          >
                            <Phone className="w-4 h-4" />
                            {contact.phone}
                          </a>
                        )}
                        {contact.email && (
                          <a
                            href={`mailto:${contact.email}`}
                            className="flex items-center gap-2 text-sm text-navy-600 hover:text-gold-600"
                          >
                            <Mail className="w-4 h-4" />
                            {contact.email}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
