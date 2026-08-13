import { Metadata } from "next";
import { getAllMissionPartners } from "@/lib/content";
import { normalizeExternalUrl, displayUrl } from "@/lib/utils";
import { missionPartners } from "@/data/church";
import MissionsClient from "./MissionsClient";

export const metadata: Metadata = {
  title: "Missions",
  description: "CTK supports mission partners locally, nationally, and globally.",
};

export default async function MissionsPage() {
  const cmsPartners = await getAllMissionPartners();

  // Transform CMS data to expected format
  const partners = cmsPartners.map((p) => {
    const website = normalizeExternalUrl(p.website);
    return {
      slug: p.slug,
      name: p.name || "",
      subtitle: p.subtitle || undefined,
      category: p.category || "Local",
      shortDescription: p.shortDescription || "",
      website: website ? displayUrl(website) : undefined,
    };
  });

  // Use additional partners from static data (these are simple, rarely change)
  const additionalPartners = missionPartners.additional;

  return <MissionsClient partners={partners} additionalPartners={additionalPartners} />;
}
