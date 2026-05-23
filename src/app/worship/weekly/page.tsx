import { Metadata } from "next";
import { PageHeader } from "@/components/ui/Section";
import { Section } from "@/components/ui/Section";
import { WeeklyActivitiesList } from "@/components/sections/WeeklyActivitiesList";

export const metadata: Metadata = {
  title: "Weekly Gatherings",
  description:
    "Weekly prayer and Bible study opportunities at Christ The King Anglican Church.",
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
        <WeeklyActivitiesList />
      </Section>
    </>
  );
}
