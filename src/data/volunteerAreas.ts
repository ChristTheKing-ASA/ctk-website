export const volunteerAreas = [
  {
    name: "Worship",
    description:
      "Serve during Sunday services as an acolyte, altar guild member, or in music ministry.",
    roles: ["Acolyte", "Altar Guild", "Music Ministry", "Sound/Video"],
  },
  {
    name: "Hospitality",
    description: "Create a welcoming environment for visitors and members alike.",
    roles: ["Greeters", "Ushers", "Coffee Hour", "Special Events"],
  },
  {
    name: "Children & Youth",
    description: "Help shape the next generation through teaching and care.",
    roles: ["Sunday School", "Nursery", "Youth Leaders"],
    requiresTraining: true,
  },
  {
    name: "Operations",
    description: "Keep our facilities beautiful and functional.",
    roles: ["Grounds & Garden", "Building Care", "Kitchen"],
  },
] as const;
