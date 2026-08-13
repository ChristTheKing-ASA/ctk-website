import { config, fields, collection, singleton } from "@keystatic/core";
import { ICON_OPTIONS, DEFAULT_ICON } from "./src/lib/icons";

const iconField = (label = "Icon") =>
  fields.select({
    label,
    options: ICON_OPTIONS,
    defaultValue: DEFAULT_ICON,
  });

export default config({
  // In dev, edit content against the local filesystem. In production,
  // authenticate and commit through Keystatic Cloud (editors sign in with
  // email — no GitHub account required).
  storage:
    process.env.NODE_ENV === "development"
      ? { kind: "local" }
      : { kind: "cloud" },
  cloud: { project: "christ-the-king/ctk-website" },
  ui: {
    brand: { name: "CTK Website" },
    // Mirror the site's section headings so editors can find a page in the
    // sidebar the same way they find it on the site.
    navigation: {
      "Home": ["homePage"],
      "Give": ["givePage"],
      "About — Our Team": ["clergy", "teamPage"],
      "Connect": ["membershipPage"],
      "Worship": ["weeklyActivities"],
      "Events": ["events"],
      "Missions": ["missionPartners"],
      "DeafChurch": ["deafChurch"],
      "Site Settings": ["churchInfo", "announcements"],
    },
  },
  singletons: {
    homePage: singleton({
      label: "Home Page",
      path: "src/content/home-page",
      format: { data: "json" },
      schema: {
        heroImage: fields.image({
          label: "Hero Photo",
          description:
            "Fills the top of the homepage. Use a wide, high-resolution photo; it is displayed very large.",
          directory: "public/images/church",
          publicPath: "/images/church",
        }),
        heroImageAlt: fields.text({
          label: "Hero Photo Description",
          description: "Describes the photo for screen readers and search engines.",
        }),
        heroNameLine1: fields.text({ label: "Church Name, Line 1" }),
        heroNameLine2: fields.text({ label: "Church Name, Line 2" }),
        missionEyebrow: fields.text({
          label: "Mission Label",
          description: "Small text above the mission statement.",
        }),
        missionHeadline: fields.text({ label: "Mission Statement" }),
        pillars: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            icon: iconField(),
          }),
          {
            label: "Mission Pillars",
            description:
              "Shown as three cards over the hero photo. Hidden on phones, where the mission statement carries the message.",
            itemLabel: (props) => props.fields.title.value || "Pillar",
          }
        ),
        heroPrimaryCtaLabel: fields.text({ label: "Primary Button Label" }),
        heroPrimaryCtaHref: fields.text({ label: "Primary Button Link" }),
        heroSecondaryCtaLabel: fields.text({ label: "Secondary Button Label" }),
        heroSecondaryCtaHref: fields.text({ label: "Secondary Button Link" }),

        anglicanEyebrow: fields.text({ label: "Tradition Label" }),
        anglicanTitle: fields.text({ label: "Tradition Heading" }),
        anglicanBody: fields.text({ label: "Tradition Body", multiline: true }),
        anglicanCards: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description" }),
            icon: iconField(),
          }),
          {
            label: "Tradition Highlights",
            itemLabel: (props) => props.fields.title.value || "Highlight",
          }
        ),
        anglicanCtaLabel: fields.text({ label: "Tradition Button Label" }),
        anglicanCtaHref: fields.text({ label: "Tradition Button Link" }),

        rectorEyebrow: fields.text({ label: "Rector Section Label" }),
        rectorQuote: fields.text({ label: "Rector Quote", multiline: true }),
        rectorBody: fields.text({ label: "Rector Section Body", multiline: true }),
        rectorPrimaryCtaLabel: fields.text({ label: "Rector Button Label" }),
        rectorSecondaryCtaLabel: fields.text({ label: "Rector Secondary Button Label" }),

        ministriesEyebrow: fields.text({ label: "Ministries Label" }),
        ministriesTitle: fields.text({ label: "Ministries Heading" }),
        ministriesDescription: fields.text({
          label: "Ministries Description",
          multiline: true,
        }),
        deafChurchBody: fields.text({
          label: "DeafChurch Card Body",
          description:
            "Follows the DeafChurch tagline, which is edited under DeafChurch.",
          multiline: true,
        }),
        deafChurchCtaLabel: fields.text({ label: "DeafChurch Button Label" }),
        missionsBody: fields.text({
          label: "Missions Card Body",
          description:
            "The partner counts above this are calculated from the Mission Partners list, so they stay correct on their own.",
          multiline: true,
        }),
        missionsCtaLabel: fields.text({ label: "Missions Button Label" }),

        quickLinksEyebrow: fields.text({ label: "Quick Links Label" }),
        quickLinksTitle: fields.text({ label: "Quick Links Heading" }),
        quickLinks: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            href: fields.text({ label: "Link" }),
            icon: iconField(),
          }),
          {
            label: "Quick Links",
            itemLabel: (props) => props.fields.title.value || "Link",
          }
        ),
      },
    }),
    givePage: singleton({
      label: "Give Page",
      path: "src/content/give-page",
      format: { data: "json" },
      schema: {
        heroTitle: fields.text({ label: "Page Title" }),
        heroSubtitle: fields.text({ label: "Page Label" }),
        heroDescription: fields.text({ label: "Page Intro", multiline: true }),

        onlineTitle: fields.text({ label: "Online Giving Heading" }),
        onlineBody: fields.text({ label: "Online Giving Body", multiline: true }),
        onlineCtaLabel: fields.text({ label: "Online Giving Button Label" }),
        onlineSecureNote: fields.text({ label: "Security Note" }),

        whereTitle: fields.text({ label: "Where Your Gift Goes Heading" }),
        whereCards: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            icon: iconField(),
          }),
          {
            label: "Where Your Gift Goes",
            itemLabel: (props) => props.fields.title.value || "Card",
          }
        ),

        otherWaysTitle: fields.text({ label: "Other Ways Heading" }),
        inPersonTitle: fields.text({ label: "In Person Heading" }),
        inPersonBody: fields.text({ label: "In Person Body", multiline: true }),
        byMailTitle: fields.text({ label: "By Mail Heading" }),
        byMailBody: fields.text({
          label: "By Mail Body",
          description:
            "The mailing address is added automatically from Site Settings, so do not type it here.",
          multiline: true,
        }),
        appTitle: fields.text({ label: "Church App Heading" }),
        appBody: fields.text({
          label: "Church App Body",
          description: "The words before the app link.",
          multiline: true,
        }),
        appLinkLabel: fields.text({ label: "Church App Link Text" }),

        missionsPrompt: fields.text({ label: "Missions Prompt", multiline: true }),
        missionsCtaLabel: fields.text({ label: "Missions Button Label" }),
      },
    }),
    churchInfo: singleton({
      label: "Church Info",
      path: "src/content/church-info",
      format: { data: "json" },
      schema: {
        name: fields.text({ label: "Church Name" }),
        shortName: fields.text({ label: "Short Name" }),
        phone: fields.text({ label: "Phone" }),
        email: fields.text({ label: "Email" }),
        adminEmail: fields.text({ label: "Admin Email" }),
        street: fields.text({ label: "Street Address" }),
        city: fields.text({ label: "City" }),
        state: fields.text({ label: "State" }),
        zip: fields.text({ label: "ZIP" }),
        mailingAddress: fields.text({ label: "Mailing Address" }),
        serviceTime: fields.text({ label: "Service Time" }),
        facebookUrl: fields.url({ label: "Facebook URL" }),
        youtubeUrl: fields.url({ label: "YouTube URL" }),
        instagramUrl: fields.url({ label: "Instagram URL" }),
        givingUrl: fields.url({ label: "Giving URL" }),
        appUrl: fields.url({ label: "Church App URL" }),
        dioceseName: fields.text({ label: "Diocese Name" }),
        dioceseUrl: fields.url({ label: "Diocese URL" }),
        dioceseBishop: fields.text({ label: "Diocese Bishop" }),
        denominationName: fields.text({ label: "Denomination Name" }),
        denominationShortName: fields.text({ label: "Denomination Short Name" }),
        denominationUrl: fields.url({ label: "Denomination URL" }),
        scriptureText: fields.text({ label: "Scripture Text", multiline: true }),
        scriptureReference: fields.text({ label: "Scripture Reference" }),
        visionStatement: fields.text({
          label: "Vision Statement",
          description: "Shown under the mission heading on the homepage.",
          multiline: true,
        }),
      },
    }),
    teamPage: singleton({
      label: "Team Page — Vestry",
      path: "src/content/team-page",
      format: { data: "json" },
      schema: {
        vestryTitle: fields.text({
          label: "Vestry Section Title",
          defaultValue: "Our Vestry",
        }),
        vestryDescription: fields.text({
          label: "Vestry Section Description",
          multiline: true,
        }),
        vestryMembers: fields.array(fields.text({ label: "Name" }), {
          label: "Vestry Members",
          description:
            "Listed on the Our Team page. The section is hidden until at least one name is added.",
          itemLabel: (props) => props.value || "Vestry Member",
        }),
      },
    }),
    membershipPage: singleton({
      label: "Membership Page",
      path: "src/content/membership-page",
      format: { data: "json" },
      schema: {
        contactIntro: fields.text({
          label: "Contact Intro Paragraph",
          multiline: true,
        }),
        contactName: fields.text({ label: "Contact Name" }),
        contactTitle: fields.text({ label: "Contact Title" }),
        contactEmail: fields.text({ label: "Contact Email" }),
      },
    }),
    deafChurch: singleton({
      label: "DeafChurch Info",
      path: "src/content/deafchurch",
      format: { data: "json" },
      schema: {
        name: fields.text({ label: "Ministry Name" }),
        tagline: fields.text({ label: "Tagline" }),
        description: fields.text({ label: "Description", multiline: true }),
        featuredVideoId: fields.text({ label: "Featured YouTube Video ID" }),
        founderName: fields.text({ label: "Founder Name" }),
        founderEmail: fields.text({ label: "Founder Email" }),
        familyInfo: fields.text({ label: "Family Info" }),
        publicationTitle: fields.text({ label: "Publication Title" }),
      },
    }),
  },
  collections: {
    clergy: collection({
      label: "Clergy & Staff",
      slugField: "name",
      path: "src/content/clergy/*",
      format: { data: "json" },
      schema: {
        // fields.slug keeps the display name in the data file; a plain text
        // slugField gets stripped on CMS save and reads back as null.
        name: fields.slug({ name: { label: "Name" } }),
        title: fields.text({ label: "Title/Role" }),
        group: fields.select({
          label: "Team Group",
          description: "Which tier this person appears under on the Our Team page.",
          options: [
            { label: "Staff", value: "staff" },
            { label: "Volunteer Clergy", value: "volunteer-clergy" },
          ],
          defaultValue: "volunteer-clergy",
        }),
        order: fields.integer({
          label: "Display Order",
          description: "Lower numbers appear first within their group.",
          defaultValue: 99,
        }),
        email: fields.text({ label: "Email" }),
        phone: fields.text({ label: "Phone" }),
        image: fields.image({
          label: "Photo",
          directory: "public/images/team",
          publicPath: "/images/team",
        }),
        shortBio: fields.text({ label: "Short Bio", multiline: true }),
        fullBio: fields.text({ label: "Full Bio", multiline: true }),
        family: fields.text({ label: "Family Info" }),
        education: fields.array(fields.text({ label: "Degree/School" }), {
          label: "Education",
          itemLabel: (props) => props.value || "Education",
        }),
      },
    }),
    missionPartners: collection({
      label: "Mission Partners",
      slugField: "name",
      path: "src/content/missions/*",
      format: { data: "json" },
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        subtitle: fields.text({ label: "Subtitle (optional)" }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "Local", value: "Local" },
            { label: "National", value: "National" },
            { label: "Global", value: "Global" },
          ],
          defaultValue: "Local",
        }),
        shortDescription: fields.text({ label: "Short Description", multiline: true }),
        fullDescription: fields.text({ label: "Full Description", multiline: true }),
        website: fields.url({ label: "Website (optional)" }),
      },
    }),
    weeklyActivities: collection({
      label: "Weekly Activities",
      slugField: "title",
      path: "src/content/activities/*",
      format: { data: "json" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        day: fields.text({ label: "Day (e.g., Sundays)" }),
        time: fields.text({ label: "Time (e.g., 10:00 AM)" }),
        description: fields.text({ label: "Description", multiline: true }),
        location: fields.text({ label: "Location" }),
        contactName: fields.text({ label: "Contact Name (optional)" }),
        contactEmail: fields.text({ label: "Contact Email (optional)" }),
        contactPhone: fields.text({ label: "Contact Phone (optional)" }),
      },
    }),
    events: collection({
      label: "Events",
      slugField: "title",
      path: "src/content/events/*",
      format: { data: "json" },
      schema: {
        title: fields.slug({ name: { label: "Event Name" } }),
        date: fields.date({
          label: "Start Date",
          description: "Events are shown in date order and disappear after they end.",
        }),
        endDate: fields.date({ label: "End Date (optional)" }),
        time: fields.text({
          label: "Time",
          description: "For example: 6:30 PM or 9:00 AM–12:00 PM.",
        }),
        location: fields.text({
          label: "Location",
          description: "For example: Parish Hall, Sanctuary, or Online.",
        }),
        category: fields.select({
          label: "Event Type",
          options: [
            { label: "Worship", value: "worship" },
            { label: "Fellowship", value: "fellowship" },
            { label: "Formation", value: "formation" },
            { label: "Outreach", value: "outreach" },
            { label: "Other", value: "other" },
          ],
          defaultValue: "fellowship",
        }),
        description: fields.text({
          label: "Description",
          multiline: true,
          description: "A brief, welcoming explanation of what guests can expect.",
        }),
        registrationUrl: fields.url({
          label: "Registration Link (optional)",
        }),
        contactName: fields.text({ label: "Contact Name (optional)" }),
        contactEmail: fields.text({ label: "Contact Email (optional)" }),
      },
    }),
    announcements: collection({
      label: "Announcements",
      slugField: "title",
      path: "src/content/announcements/*",
      format: { data: "json" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        date: fields.date({ label: "Date" }),
        content: fields.text({ label: "Content", multiline: true }),
        expiresAt: fields.date({ label: "Expires At (optional)" }),
        important: fields.checkbox({ label: "Mark as Important" }),
      },
    }),
  },
});
