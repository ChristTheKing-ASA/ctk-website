import { Metadata } from "next";
import { getAllMissionPartners, getDeafChurchInfo } from "@/lib/content";
import { missionPartners } from "@/data/church";
import { DeafChurchFeature } from "@/components/sections/DeafChurchFeature";
import MissionsClient from "./MissionsClient";

export const metadata: Metadata = {
  title: "Missions",
  description: "CTK supports mission partners locally, nationally, and globally.",
};

export default async function MissionsPage() {
  const [cmsPartners, deafChurchData] = await Promise.all([
    getAllMissionPartners(),
    getDeafChurchInfo(),
  ]);

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

  return (
    <MissionsClient partners={partners} additionalPartners={additionalPartners}>
      <DeafChurchFeature description={deafChurchData?.description} className="!py-0" />
    </MissionsClient>
  );
}
