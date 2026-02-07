import { Metadata } from "next";
import { getAllMissionPartners } from "@/lib/content";
import { missionPartners } from "@/data/church";
import MissionsClient from "./MissionsClient";

export const metadata: Metadata = {
  title: "Missions",
  description: "CTK supports mission partners locally, nationally, and globally.",
};

export default async function MissionsPage() {
  const cmsPartners = await getAllMissionPartners();

  // Transform CMS data to expected format
  const partners = cmsPartners.map((p) => ({
    slug: p.slug,
    name: p.name || "",
    subtitle: p.subtitle || undefined,
    category: p.category || "Local",
    shortDescription: p.shortDescription || "",
  }));

  // Use additional partners from static data (these are simple, rarely change)
  const additionalPartners = missionPartners.additional;

  return <MissionsClient partners={partners} additionalPartners={additionalPartners} />;
}
