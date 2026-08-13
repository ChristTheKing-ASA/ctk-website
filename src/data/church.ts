// Static content that is not (yet) managed in Keystatic.
//
// Everything else that used to live here (church info, clergy, weekly
// activities, volunteer roles, beliefs, the DeafChurch blurb, and the
// categorised mission partners) now comes from the CMS via `src/lib/content.ts`. Those
// copies were left behind after the migration, drifted out of date, and were
// still asserted against by the test suite, which made them look load-bearing.
//
// Before adding anything here, check whether it belongs in Keystatic instead.
// Content a non-developer might need to change almost always does.

export const navigation = [
  { name: "Visit", href: "/visit" },
  { name: "Worship", href: "/worship" },
  { name: "Events", href: "/events" },
  { name: "Connect", href: "/connect" },
  { name: "Serve", href: "/serve" },
  { name: "DeafChurch", href: "/deafchurch" },
  { name: "About", href: "/about" },
];

// Supporting partners listed without a detail page. The full partners live in
// the `missionPartners` Keystatic collection; only this short list is static.
export const missionPartners = {
  additional: [
    { name: "Anglican Relief and Development Fund", type: "Disaster Relief" },
    { name: "Operation Christmas Child", type: "Samaritan's Purse" },
    { name: "Gideons International", type: "Bible Distribution" },
    { name: "Homeless Coalition of St. Johns County", type: "Local" },
    { name: "CMJ USA", type: "Jewish Ministry" },
  ],
};
