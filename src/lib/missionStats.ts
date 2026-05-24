import { getAllMissionPartners } from "@/lib/content";

export interface MissionStats {
  total: number;
  local: number;
  national: number;
  global: number;
}

export async function getMissionStats(): Promise<MissionStats> {
  const partners = await getAllMissionPartners();

  const counts = { local: 0, national: 0, global: 0 };
  for (const partner of partners) {
    const category = partner?.category;
    if (category === "Local") counts.local += 1;
    else if (category === "National") counts.national += 1;
    else if (category === "Global") counts.global += 1;
  }

  return {
    total: partners.length,
    ...counts,
  };
}
