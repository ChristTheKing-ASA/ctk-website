import {
  getAllActivities,
  getAllClergy,
  getAllMissionPartners,
  getVolunteerAreas,
} from "@/lib/content";

export interface SiteStats {
  clergyCount: number;
  missionPartnerCount: number;
  weeklyGatheringCount: number;
  volunteerAreaCount: number;
  volunteerRoleCount: number;
}

export async function getSiteStats(): Promise<SiteStats> {
  const [clergy, partners, activities, volunteerAreas] = await Promise.all([
    getAllClergy(),
    getAllMissionPartners(),
    getAllActivities(),
    getVolunteerAreas(),
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
