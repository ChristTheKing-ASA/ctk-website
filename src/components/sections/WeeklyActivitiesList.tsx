import Link from "next/link";
import { BookOpen, Users, Mail, Clock } from "lucide-react";
import { getAllActivities } from "@/lib/content";
import { formatActivitySchedule } from "@/lib/formatActivity";

export async function WeeklyActivitiesList({ compact = false }: { compact?: boolean }) {
  const activitiesData = await getAllActivities();

  const weeklyActivities = activitiesData
    .filter((a) => a?.title && a.title !== "Sunday Worship")
    .map((a) => ({
      title: a.title || "",
      day: a.day || "",
      time: a.time || "",
      description: a.description || "",
      location: a.location || "",
      contactName: a.contactName || "",
      contactEmail: a.contactEmail || "",
      contactPhone: a.contactPhone || "",
    }));

  if (weeklyActivities.length === 0) {
    return null;
  }

  if (compact) {
    return (
      <div className="grid md:grid-cols-2 gap-8">
        {weeklyActivities.map((activity) => (
          <div
            key={activity.title}
            className="bg-white p-6 rounded-xl border border-navy-100"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center">
                {activity.title.toLowerCase().includes("bible") ? (
                  <Users className="w-5 h-5 text-gold-600" />
                ) : (
                  <BookOpen className="w-5 h-5 text-gold-600" />
                )}
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-navy-900">
                  {activity.title}
                </h3>
                <p className="text-sm text-gold-600">
                  {formatActivitySchedule(activity.day, activity.time)}
                </p>
              </div>
            </div>
            <p className="text-navy-600 mb-4">{activity.description}</p>
            <p className="text-sm text-navy-500">{activity.location}</p>
            {activity.contactEmail && (
              <p className="text-sm text-navy-600 flex items-center gap-2 mt-3">
                <Mail className="w-3.5 h-3.5 text-navy-400" />
                <a
                  href={`mailto:${activity.contactEmail}`}
                  className="text-gold-600 hover:text-gold-700"
                >
                  {activity.contactName || activity.contactEmail}
                </a>
              </p>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
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
              {formatActivitySchedule(activity.day, activity.time)}
            </span>
          </div>
          <p className="text-navy-600 text-lg mb-6 leading-relaxed">{activity.description}</p>
          <p className="text-navy-500 mb-4">{activity.location}</p>
          {activity.contactEmail && (
            <a
              href={`mailto:${activity.contactEmail}`}
              className="text-sm text-gold-600 hover:text-gold-700"
            >
              Contact: {activity.contactName || activity.contactEmail}
            </a>
          )}
        </div>
      ))}
      <p className="text-center text-sm text-navy-500">
        <Link href="/worship/weekly" className="text-gold-600 hover:text-gold-700 font-medium">
          View full weekly schedule →
        </Link>
      </p>
    </div>
  );
}
