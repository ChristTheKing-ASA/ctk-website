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
        scriptureText: fields.text({ label: "Scripture Text", multiline: true }),
        scriptureReference: fields.text({ label: "Scripture Reference" }),
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
