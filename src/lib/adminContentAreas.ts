export type AdminContentCategory = "site" | "people" | "programs" | "communications";

export interface AdminContentArea {
  id: string;
  title: string;
  description: string;
  /** Keystatic admin path */
  editHref: string;
  previewHref?: string;
  category: AdminContentCategory;
}

export const adminContentCategories: Record<
  AdminContentCategory,
  { label: string; description: string }
> = {
  site: {
    label: "Site-wide information",
    description: "Contact details, mission, beliefs, and homepage messaging",
  },
  people: {
    label: "People",
    description: "Clergy and staff profiles",
  },
  programs: {
    label: "Programs & ministries",
    description: "Missions, activities, announcements, and Deaf Church",
  },
  communications: {
    label: "Communications",
    description: "Form submissions and subscribers (not edited in CMS)",
  },
};

/** All website content editable via Keystatic — deep links into the CMS UI */
export const adminContentAreas: AdminContentArea[] = [
  {
    id: "church-info",
    title: "Church Info",
    description:
      "Name, address, phone, email, service time, social links, giving URLs, diocese, footer scripture, mission headline, and pillars.",
    editHref: "/keystatic/singleton/churchInfo",
    previewHref: "/",
    category: "site",
  },
  {
    id: "beliefs",
    title: "Statement of Beliefs",
    description: "Intro text and each core belief shown on /about/beliefs.",
    editHref: "/keystatic/singleton/beliefs",
    previewHref: "/about/beliefs",
    category: "site",
  },
  {
    id: "navigation",
    title: "Navigation Menu",
    description: "Header and footer menu labels and links (Visit, Worship, Connect, etc.).",
    editHref: "/keystatic/singleton/siteNavigation",
    previewHref: "/",
    category: "site",
  },
  {
    id: "homepage",
    title: "Homepage sections",
    description: "Anglicanism blurb and rector welcome paragraph on the homepage.",
    editHref: "/keystatic/singleton/homepage",
    previewHref: "/",
    category: "site",
  },
  {
    id: "clergy",
    title: "Clergy & Staff",
    description: "Team bios, photos, education, and rector quote for the homepage.",
    editHref: "/keystatic/collection/clergy",
    previewHref: "/about/team",
    category: "people",
  },
  {
    id: "deaf-church",
    title: "DeafChurch Ministry",
    description: "DeafChurch page content, video ID, and founder contact.",
    editHref: "/keystatic/singleton/deafChurch",
    previewHref: "/deafchurch",
    category: "programs",
  },
  {
    id: "missions",
    title: "Mission Partners",
    description: "Partner profiles by category (local, national, global).",
    editHref: "/keystatic/collection/missionPartners",
    previewHref: "/missions",
    category: "programs",
  },
  {
    id: "additional-missions",
    title: "Additional Mission Partners",
    description: "Supporting organizations listed at the bottom of the missions page.",
    editHref: "/keystatic/collection/additionalMissionPartners",
    previewHref: "/missions",
    category: "programs",
  },
  {
    id: "activities",
    title: "Weekly Activities",
    description: "Sunday worship, Bible study, prayer groups — schedule and contacts.",
    editHref: "/keystatic/collection/weeklyActivities",
    previewHref: "/worship/weekly",
    category: "programs",
  },
  {
    id: "announcements",
    title: "Announcements",
    description: "Homepage announcements with optional expiry date.",
    editHref: "/keystatic/collection/announcements",
    previewHref: "/",
    category: "programs",
  },
  {
    id: "connect-small-groups",
    title: "Connect — Small Groups",
    description: "Small groups page copy, locations, and call to action.",
    editHref: "/keystatic/singleton/connectSmallGroups",
    previewHref: "/connect/small-groups",
    category: "programs",
  },
  {
    id: "connect-classes",
    title: "Connect — Classes",
    description: "Catechism / inquirer classes page content.",
    editHref: "/keystatic/singleton/connectClasses",
    previewHref: "/connect/classes",
    category: "programs",
  },
  {
    id: "connect-membership",
    title: "Connect — Membership",
    description: "Membership benefits, contact person, and CTA.",
    editHref: "/keystatic/singleton/connectMembership",
    previewHref: "/connect/membership",
    category: "programs",
  },
  {
    id: "connect-daughters",
    title: "Connect — Daughters of the Holy Cross",
    description: "Women's order page: vows, about text, and contact.",
    editHref: "/keystatic/singleton/connectDaughters",
    previewHref: "/connect/daughters-of-the-holy-cross",
    category: "programs",
  },
  {
    id: "serve-page",
    title: "Serve Page",
    description: "Serve hub sections: volunteer intro, safeguarding, missions, DeafChurch.",
    editHref: "/keystatic/singleton/servePage",
    previewHref: "/serve",
    category: "programs",
  },
  {
    id: "volunteer-areas",
    title: "Volunteer Areas & Roles",
    description: "Worship, hospitality, children & youth, operations — roles per area.",
    editHref: "/keystatic/collection/volunteerAreas",
    previewHref: "/serve#volunteer",
    category: "programs",
  },
  {
    id: "safeguarding",
    title: "Serve — Safeguarding",
    description: "Child safety policies, requirements, and training roles.",
    editHref: "/keystatic/singleton/safeguarding",
    previewHref: "/serve/safeguarding",
    category: "programs",
  },
];

export const adminCommunicationAreas = [
  {
    id: "submissions",
    title: "Contact Submissions",
    description: "Review and update status for contact form messages.",
    href: "/admin/submissions",
  },
  {
    id: "prayer",
    title: "Prayer Requests",
    description: "Confidential prayer requests — update status as your team prays.",
    href: "/admin/prayer",
  },
  {
    id: "newsletter",
    title: "Newsletter Subscribers",
    description: "Emails collected from the footer signup form.",
    href: "/admin/newsletter",
  },
];
