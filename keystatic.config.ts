import { config, fields, collection, singleton } from "@keystatic/core";

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
