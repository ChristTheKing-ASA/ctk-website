import { config, fields, collection, singleton } from "@keystatic/core";

const hasKeystaticGitHubAuth =
  Boolean(process.env.KEYSTATIC_GITHUB_CLIENT_ID) &&
  Boolean(process.env.KEYSTATIC_GITHUB_CLIENT_SECRET) &&
  Boolean(process.env.KEYSTATIC_SECRET);

export default config({
  storage: hasKeystaticGitHubAuth
    ? { kind: "github", repo: "wallscaler/ctk-website" }
    : { kind: "local" },
  singletons: {
    churchInfo: singleton({
      label: "Church Info",
      path: "src/content/church-info",
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
        scriptureText: fields.text({ label: "Footer Scripture Text", multiline: true }),
        scriptureReference: fields.text({ label: "Footer Scripture Reference" }),
        scriptureAboutText: fields.text({
          label: "About Page Scripture",
          multiline: true,
        }),
        scriptureAboutReference: fields.text({ label: "About Scripture Reference" }),
        missionHeadline: fields.text({
          label: "Mission Headline",
          description: "e.g. Love God. Become Disciples. Serve Others.",
        }),
        missionVision: fields.text({
          label: "Mission Vision",
          multiline: true,
        }),
        missionPillars: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
          }),
          {
            label: "Mission Pillars",
            itemLabel: (props) => props.fields.title.value || "Pillar",
          },
        ),
      },
    }),
    beliefs: singleton({
      label: "Beliefs",
      path: "src/content/beliefs",
      schema: {
        intro: fields.text({ label: "Introduction", multiline: true }),
        pageDescription: fields.text({
          label: "Beliefs Page Header Description",
          multiline: true,
        }),
        foundations: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
          }),
          {
            label: "Core Beliefs",
            itemLabel: (props) => props.fields.title.value || "Belief",
          },
        ),
      },
    }),
    homepage: singleton({
      label: "Homepage Content",
      path: "src/content/homepage",
      schema: {
        anglicanTitle: fields.text({ label: "Anglicanism Section Title" }),
        anglicanDescription: fields.text({
          label: "Anglicanism Description",
          multiline: true,
        }),
        rectorWelcomeBody: fields.text({
          label: "Rector Welcome Paragraph",
          multiline: true,
        }),
      },
    }),
    siteNavigation: singleton({
      label: "Navigation Menu",
      path: "src/content/site-navigation",
      schema: {
        items: fields.array(
          fields.object({
            name: fields.text({ label: "Label" }),
            href: fields.text({ label: "URL path (e.g. /visit)" }),
            showInHeader: fields.checkbox({
              label: "Show in header",
              defaultValue: true,
            }),
            showInFooter: fields.checkbox({
              label: "Show in footer quick links",
              defaultValue: true,
            }),
          }),
          {
            label: "Menu items",
            itemLabel: (props) => props.fields.name.value || "Link",
          },
        ),
      },
    }),
    connectSmallGroups: singleton({
      label: "Connect — Small Groups",
      path: "src/content/connect-small-groups",
      schema: {
        pageTitle: fields.text({ label: "Page title" }),
        pageSubtitle: fields.text({ label: "Page subtitle" }),
        pageDescription: fields.text({ label: "Page description", multiline: true }),
        whyTitle: fields.text({ label: "Why section title" }),
        whyParagraph1: fields.text({ label: "Why paragraph 1", multiline: true }),
        whyParagraph2: fields.text({ label: "Why paragraph 2", multiline: true }),
        highlights: fields.array(fields.text({ label: "Highlight" }), {
          label: "Highlight cards (4 items)",
          itemLabel: (props) => props.value || "Highlight",
        }),
        locationsTitle: fields.text({ label: "Locations section title" }),
        locations: fields.array(
          fields.object({
            title: fields.text({ label: "Location name" }),
            description: fields.text({ label: "Description", multiline: true }),
          }),
          { label: "Group locations", itemLabel: (props) => props.fields.title.value || "Location" },
        ),
        ctaTitle: fields.text({ label: "CTA title" }),
        ctaDescription: fields.text({ label: "CTA description", multiline: true }),
      },
    }),
    connectClasses: singleton({
      label: "Connect — Classes",
      path: "src/content/connect-classes",
      schema: {
        pageTitle: fields.text({ label: "Page title" }),
        pageSubtitle: fields.text({ label: "Page subtitle" }),
        pageDescription: fields.text({ label: "Page description", multiline: true }),
        mainTitle: fields.text({ label: "Main section title" }),
        mainIntro: fields.text({ label: "Main intro", multiline: true }),
        audienceItems: fields.array(fields.text({ label: "Bullet" }), {
          label: "Who classes are for",
          itemLabel: (props) => props.value || "Item",
        }),
        mainClosing: fields.text({ label: "Closing paragraph", multiline: true }),
        detailWeeks: fields.text({ label: "Detail: duration" }),
        detailWeeksSub: fields.text({ label: "Detail: duration sub" }),
        detailSchedule: fields.text({ label: "Detail: schedule" }),
        detailScheduleSub: fields.text({ label: "Detail: schedule sub" }),
        detailAudience: fields.text({ label: "Detail: audience" }),
        detailAudienceSub: fields.text({ label: "Detail: audience sub" }),
        topicsTitle: fields.text({ label: "Topics section title" }),
        topics: fields.array(fields.text({ label: "Topic" }), {
          label: "Topics covered",
          itemLabel: (props) => props.value || "Topic",
        }),
        ctaTitle: fields.text({ label: "CTA title" }),
        ctaDescription: fields.text({ label: "CTA description", multiline: true }),
      },
    }),
    connectMembership: singleton({
      label: "Connect — Membership",
      path: "src/content/connect-membership",
      schema: {
        pageTitle: fields.text({ label: "Page title" }),
        pageSubtitle: fields.text({ label: "Page subtitle" }),
        pageDescription: fields.text({ label: "Page description", multiline: true }),
        benefitsTitle: fields.text({ label: "Benefits section title" }),
        benefitsIntro: fields.text({ label: "Benefits intro", multiline: true }),
        benefits: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
          }),
          { label: "Membership benefits", itemLabel: (props) => props.fields.title.value || "Benefit" },
        ),
        alsoIncludesTitle: fields.text({ label: "Also includes title" }),
        alsoIncludes: fields.array(fields.text({ label: "Item" }), {
          label: "Additional benefits list",
          itemLabel: (props) => props.value || "Item",
        }),
        ctaTitle: fields.text({ label: "CTA title" }),
        ctaDescription: fields.text({ label: "CTA description", multiline: true }),
        contactName: fields.text({ label: "Contact name" }),
        contactTitle: fields.text({ label: "Contact title" }),
        contactPhone: fields.text({ label: "Contact phone" }),
        contactEmail: fields.text({ label: "Contact email" }),
      },
    }),
    connectDaughters: singleton({
      label: "Connect — Daughters of the Holy Cross",
      path: "src/content/connect-daughters",
      schema: {
        pageTitle: fields.text({ label: "Page title" }),
        pageSubtitle: fields.text({ label: "Page subtitle" }),
        pageDescription: fields.text({ label: "Page description", multiline: true }),
        vowsTitle: fields.text({ label: "Vows section title" }),
        vows: fields.array(fields.text({ label: "Vow name" }), {
          label: "Four-fold vow (4 items)",
          itemLabel: (props) => props.value || "Vow",
        }),
        aboutTitle: fields.text({ label: "About section title" }),
        aboutParagraph1: fields.text({ label: "About paragraph 1", multiline: true }),
        aboutParagraph2: fields.text({ label: "About paragraph 2", multiline: true }),
        contactBoxTitle: fields.text({ label: "Contact box title" }),
        contactBoxDescription: fields.text({ label: "Contact box description", multiline: true }),
        contactPhone: fields.text({ label: "Contact phone" }),
        contactEmail: fields.text({ label: "Contact email" }),
        externalLinkLabel: fields.text({ label: "External link label" }),
        externalLinkUrl: fields.url({ label: "External link URL" }),
      },
    }),
    servePage: singleton({
      label: "Serve Page",
      path: "src/content/serve-page",
      schema: {
        pageTitle: fields.text({ label: "Page title" }),
        pageSubtitle: fields.text({ label: "Page subtitle" }),
        pageDescription: fields.text({ label: "Page description", multiline: true }),
        hubSubtitle: fields.text({ label: "Hub section subtitle" }),
        hubTitle: fields.text({ label: "Hub section title" }),
        hubDescription: fields.text({ label: "Hub section description", multiline: true }),
        volunteerSubtitle: fields.text({ label: "Volunteer section subtitle" }),
        volunteerTitle: fields.text({ label: "Volunteer section title" }),
        volunteerDescription: fields.text({ label: "Volunteer section description", multiline: true }),
        volunteerCtaTitle: fields.text({ label: "Volunteer CTA title" }),
        volunteerCtaDescription: fields.text({ label: "Volunteer CTA description", multiline: true }),
        safeguardingTitle: fields.text({ label: "Safeguarding title" }),
        safeguardingDescription: fields.text({ label: "Safeguarding description", multiline: true }),
        missionsSubtitle: fields.text({ label: "Missions preview subtitle" }),
        missionsTitle: fields.text({ label: "Missions preview title" }),
        missionsDescription: fields.text({ label: "Missions preview description", multiline: true }),
        deafChurchSubtitle: fields.text({ label: "DeafChurch section subtitle" }),
        deafChurchTitle: fields.text({ label: "DeafChurch section title" }),
        deafChurchDescription: fields.text({ label: "DeafChurch section description", multiline: true }),
      },
    }),
    safeguarding: singleton({
      label: "Serve — Safeguarding",
      path: "src/content/safeguarding",
      schema: {
        pageTitle: fields.text({ label: "Page title" }),
        pageSubtitle: fields.text({ label: "Page subtitle" }),
        pageDescription: fields.text({ label: "Page description", multiline: true }),
        directorTitle: fields.text({ label: "Director box title" }),
        directorName: fields.text({ label: "Director name" }),
        commitmentTitle: fields.text({ label: "Commitment title" }),
        commitmentText: fields.text({ label: "Commitment text", multiline: true }),
        requirementsTitle: fields.text({ label: "Requirements section title" }),
        requirements: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
          }),
          { label: "Requirements", itemLabel: (props) => props.fields.title.value || "Requirement" },
        ),
        rolesTitle: fields.text({ label: "Roles requiring training title" }),
        trainingRoles: fields.array(fields.text({ label: "Role" }), {
          label: "Roles list",
          itemLabel: (props) => props.value || "Role",
        }),
      },
    }),
    deafChurch: singleton({
      label: "DeafChurch Info",
      path: "src/content/deafchurch",
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
        name: fields.text({ label: "Name" }),
        title: fields.text({ label: "Title/Role" }),
        email: fields.text({ label: "Email" }),
        phone: fields.text({ label: "Phone" }),
        image: fields.image({
          label: "Photo",
          directory: "public/images/team",
          publicPath: "/images/team",
        }),
        shortBio: fields.text({ label: "Short Bio", multiline: true }),
        quote: fields.text({
          label: "Featured Quote (optional)",
          multiline: true,
          description: "Shown on homepage if this person is the rector",
        }),
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
        name: fields.text({ label: "Name" }),
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
        title: fields.text({ label: "Title" }),
        day: fields.text({ label: "Day (e.g., Sundays)" }),
        time: fields.text({ label: "Time (e.g., 10:00 AM)" }),
        description: fields.text({ label: "Description", multiline: true }),
        location: fields.text({ label: "Location" }),
        contactName: fields.text({ label: "Contact Name (optional)" }),
        contactEmail: fields.text({ label: "Contact Email (optional)" }),
        contactPhone: fields.text({ label: "Contact Phone (optional)" }),
      },
    }),
    additionalMissionPartners: collection({
      label: "Additional Mission Partners",
      slugField: "name",
      path: "src/content/additional-missions/*",
      format: { data: "json" },
      schema: {
        name: fields.text({ label: "Organization Name" }),
        type: fields.text({ label: "Category / Type" }),
      },
    }),
    volunteerAreas: collection({
      label: "Volunteer Areas",
      slugField: "name",
      path: "src/content/volunteer-areas/*",
      format: { data: "json" },
      schema: {
        name: fields.text({ label: "Area name" }),
        description: fields.text({ label: "Description", multiline: true }),
        requiresTraining: fields.checkbox({ label: "Requires safeguarding training" }),
        sortOrder: fields.integer({ label: "Sort order", defaultValue: 0 }),
        roles: fields.array(fields.text({ label: "Role" }), {
          label: "Volunteer roles",
          itemLabel: (props) => props.value || "Role",
        }),
      },
    }),
    announcements: collection({
      label: "Announcements",
      slugField: "title",
      path: "src/content/announcements/*",
      format: { data: "json" },
      schema: {
        title: fields.text({ label: "Title" }),
        date: fields.date({ label: "Date" }),
        content: fields.text({ label: "Content", multiline: true }),
        expiresAt: fields.date({ label: "Expires At (optional)" }),
        important: fields.checkbox({ label: "Mark as Important" }),
      },
    }),
  },
});
