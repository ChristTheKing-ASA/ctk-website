import { Metadata } from "next";
import { getAllMissionPartners, getDeafChurchInfo } from "@/lib/content";
import { getAdditionalMissionPartners } from "@/lib/content";
import { DeafChurchFeature } from "@/components/sections/DeafChurchFeature";
import MissionsClient from "./MissionsClient";

export const metadata: Metadata = {
  title: "Missions",
  description: "CTK supports mission partners locally, nationally, and globally.",
};

export default async function MissionsPage() {
  const [cmsPartners, deafChurchData, additionalPartners] = await Promise.all([
    getAllMissionPartners(),
    getDeafChurchInfo(),
    getAdditionalMissionPartners(),
  ]);

  // Transform CMS data to expected format
  const partners = cmsPartners.map((p) => ({
    slug: p.slug,
    name: p.name || "",
    subtitle: p.subtitle || undefined,
    category: p.category || "Local",
    shortDescription: p.shortDescription || "",
  }));

  return (
    <MissionsClient partners={partners} additionalPartners={additionalPartners}>
      <DeafChurchFeature description={deafChurchData?.description} className="!py-0" />
    </MissionsClient>
  );
}
