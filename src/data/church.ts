// Static content that is not (yet) managed in Keystatic.
//
// Everything else that used to live here (church info, clergy, weekly
// activities, volunteer roles, the DeafChurch blurb, and the categorised
// mission partners) now comes from the CMS via `src/lib/content.ts`. Those
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

// Rendered on /about and /about/beliefs. Moves to Keystatic with the About
// pages; see the About coverage issue.
export const beliefs = {
  intro: "Christ The King holds to the historic Anglican faith as expressed in the following:",
  foundations: [
    {
      title: "Scripture",
      description: "The canonical books of the Old and New Testaments as the inspired Word of God, containing all things necessary for salvation.",
    },
    {
      title: "Sacraments",
      description: "Baptism and the Holy Communion (Eucharist) as the two sacraments ordained by Christ himself.",
    },
    {
      title: "Historic Episcopate",
      description: "The Historic Episcopate as integral to the apostolic faith and practice.",
    },
    {
      title: "The Creeds",
      description: "The three Catholic Creeds: the Apostles' Creed, the Nicene Creed, and the Athanasian Creed.",
    },
    {
      title: "Church Councils",
      description: "The teaching of the first four Councils of the undivided Church, and the Christological clarifications of councils five through seven.",
    },
    {
      title: "Book of Common Prayer",
      description: "The 1662 Book of Common Prayer as the doctrinal standard for Anglican worship.",
    },
    {
      title: "Thirty-Nine Articles",
      description: "The Thirty-Nine Articles of Religion (1571) as expressing authentic Anglican belief.",
    },
  ],
};

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
