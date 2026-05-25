import { getAllActivities, getAllClergy, getAllMissionPartners } from "@/lib/content";
import { volunteerAreas } from "@/data/volunteerAreas";

export interface SiteStats {
  clergyCount: number;
  missionPartnerCount: number;
  weeklyGatheringCount: number;
  volunteerAreaCount: number;
  volunteerRoleCount: number;
}

export async function getSiteStats(): Promise<SiteStats> {
  const [clergy, partners, activities] = await Promise.all([
    getAllClergy(),
    getAllMissionPartners(),
    getAllActivities(),
  ]);

  const volunteerRoleCount = volunteerAreas.reduce(
    (sum, area) => sum + area.roles.length,
    0,
  );

  return {
    clergyCount: clergy.length,
    missionPartnerCount: partners.length,
    weeklyGatheringCount: activities.length,
    volunteerAreaCount: volunteerAreas.length,
    volunteerRoleCount,
  };
}
