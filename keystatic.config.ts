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
    // Same order as the site's own navigation, which is what Fr. Craig asked
    // for: "I need the organization to match the navigation of the website...
    // And then navigating to the content within each section."
    //
    // Missions and Site Settings follow. Neither is a top-level nav item, but
    // both are real editing areas, so they sit after the sections rather than
    // among them.
    navigation: {
      "Home": ["homePage"],
      "Visit": ["visitPage"],
      "Worship": ["worshipPage", "sermonsPage", "weeklyActivities"],
      "Events": ["events"],
      "Connect": [
        "connectPage",
        "classesPage",
        "smallGroupsPage",
        "daughtersPage",
        "membershipPage",
      ],
      "Serve": ["servePage", "safeguardingPage"],
      "DeafChurch": ["deafChurch"],
      "About": [
        "aboutPage",
        "clergy",
        "teamPage",
        "storyPage",
        "beliefsPage",
        "anglicanFaithPage",
      ],
      "Give": ["givePage"],
      "Missions": ["missionPartners"],
      "Site Settings": ["churchInfo"],
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
            "Fills the whole top of the homepage. Use at least 2400 x 1400 pixels, landscape. JPG. Anything smaller looks blurry on a large screen. Keep faces near the middle: the edges get cropped on phones.",
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
            "Fallback only. The site shows the Description under DeafChurch when that field has text.",
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
    worshipPage: singleton({
      label: "Worship Page",
      path: "src/content/worship-page",
      format: { data: "json" },
      schema: {
        heroTitle: fields.text({ label: "Page Title" }),
        heroSubtitle: fields.text({ label: "Page Label" }),
        heroDescription: fields.text({ label: "Page Intro", multiline: true }),
        sundayEyebrow: fields.text({ label: "Sunday Label" }),
        sundayTitle: fields.text({ label: "Sunday Heading" }),
        sundayBody: fields.text({ label: "Sunday Body", multiline: true }),
        streamingNote: fields.text({ label: "Streaming Note" }),
        expectTitle: fields.text({ label: "What to Expect Heading" }),
        expectItems: fields.array(fields.text({ label: "Item" }), {
          label: "What to Expect",
          itemLabel: (props) => props.value || "Item",
        }),
        weeklyTitle: fields.text({ label: "Weekly Heading" }),
        weeklySubtitle: fields.text({ label: "Weekly Label" }),
        weeklyDescription: fields.text({ label: "Weekly Intro", multiline: true }),
      },
    }),
    sermonsPage: singleton({
      label: "Sermons Page",
      path: "src/content/sermons-page",
      format: { data: "json" },
      schema: {
        heroTitle: fields.text({ label: "Page Title" }),
        heroSubtitle: fields.text({ label: "Page Label" }),
        heroDescription: fields.text({ label: "Page Intro", multiline: true }),
        ctaTitle: fields.text({ label: "Closing Heading" }),
        ctaBody: fields.text({ label: "Closing Body", multiline: true }),
        ctaLabel: fields.text({ label: "Closing Button Label" }),
      },
    }),
    aboutPage: singleton({
      label: "About Page",
      path: "src/content/about-page",
      format: { data: "json" },
      schema: {
        heroTitle: fields.text({ label: "Page Title" }),
        heroSubtitle: fields.text({ label: "Page Label" }),
        heroDescription: fields.text({ label: "Page Intro", multiline: true }),
      },
    }),
    storyPage: singleton({
      label: "Our Story Page",
      path: "src/content/story-page",
      format: { data: "json" },
      schema: {
        heroTitle: fields.text({ label: "Page Title" }),
        heroSubtitle: fields.text({ label: "Page Label" }),
        heroDescription: fields.text({ label: "Page Intro", multiline: true }),
      },
    }),
    beliefsPage: singleton({
      label: "What We Believe Page",
      path: "src/content/beliefs-page",
      format: { data: "json" },
      schema: {
        heroTitle: fields.text({ label: "Page Title" }),
        heroSubtitle: fields.text({ label: "Page Label" }),
        heroDescription: fields.text({ label: "Page Intro", multiline: true }),
        intro: fields.text({ label: "Foundations Intro", multiline: true }),
        foundations: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
          }),
          {
            label: "Foundations of the Faith",
            description:
              "Doctrinal statements. Reword only with what the parish has confirmed.",
            itemLabel: (props) => props.fields.title.value || "Foundation",
          }
        ),
      },
    }),
    anglicanFaithPage: singleton({
      label: "Anglican Faith Page",
      path: "src/content/anglican-faith-page",
      format: { data: "json" },
      schema: {
        heroTitle: fields.text({ label: "Page Title" }),
        heroSubtitle: fields.text({ label: "Page Label" }),
        heroDescription: fields.text({ label: "Page Intro", multiline: true }),
      },
    }),
    connectPage: singleton({
      label: "Connect Page",
      path: "src/content/connect-page",
      format: { data: "json" },
      schema: {
        heroTitle: fields.text({ label: "Page Title" }),
        heroSubtitle: fields.text({ label: "Page Label" }),
        heroDescription: fields.text({ label: "Page Intro", multiline: true }),
        waysTitle: fields.text({ label: "Ways to Connect Heading" }),
        waysSubtitle: fields.text({ label: "Ways to Connect Label" }),
        waysDescription: fields.text({ label: "Ways to Connect Intro", multiline: true }),
        ways: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            href: fields.text({ label: "Link" }),
            icon: iconField(),
          }),
          {
            label: "Ways to Connect",
            itemLabel: (props) => props.fields.title.value || "Way",
          }
        ),
        serveTitle: fields.text({ label: "Serve Panel Heading" }),
        serveBody: fields.text({ label: "Serve Panel Body", multiline: true }),
        serveCtaLabel: fields.text({ label: "Serve Panel Button Label" }),
      },
    }),
    classesPage: singleton({
      label: "Classes Page",
      path: "src/content/classes-page",
      format: { data: "json" },
      schema: {
        heroTitle: fields.text({ label: "Page Title" }),
        heroSubtitle: fields.text({ label: "Page Label" }),
        heroDescription: fields.text({ label: "Page Intro", multiline: true }),
      },
    }),
    smallGroupsPage: singleton({
      label: "Small Groups Page",
      path: "src/content/small-groups-page",
      format: { data: "json" },
      schema: {
        heroTitle: fields.text({ label: "Page Title" }),
        heroSubtitle: fields.text({ label: "Page Label" }),
        heroDescription: fields.text({ label: "Page Intro", multiline: true }),
      },
    }),
    daughtersPage: singleton({
      label: "Daughters of the Holy Cross",
      path: "src/content/daughters-page",
      format: { data: "json" },
      schema: {
        heroTitle: fields.text({ label: "Page Title" }),
        heroSubtitle: fields.text({ label: "Page Label" }),
        heroDescription: fields.text({ label: "Page Intro", multiline: true }),
      },
    }),
    servePage: singleton({
      label: "Serve Page",
      path: "src/content/serve-page",
      format: { data: "json" },
      schema: {
        heroTitle: fields.text({ label: "Page Title" }),
        heroSubtitle: fields.text({ label: "Page Label" }),
        heroDescription: fields.text({ label: "Page Intro", multiline: true }),

        areasTitle: fields.text({ label: "Ways to Serve Heading" }),
        areasSubtitle: fields.text({ label: "Ways to Serve Label" }),
        areas: fields.array(
          fields.object({
            name: fields.text({ label: "Area Name" }),
            description: fields.text({ label: "Description", multiline: true }),
            icon: iconField(),
            roles: fields.array(fields.text({ label: "Role" }), {
              label: "Roles",
              itemLabel: (props) => props.value || "Role",
            }),
            requiresTraining: fields.checkbox({
              label: "Requires safeguarding training",
            }),
          }),
          {
            label: "Volunteer Areas",
            itemLabel: (props) => props.fields.name.value || "Area",
          }
        ),

        safeguardingNote: fields.text({
          label: "Safeguarding Note",
          description:
            "Shown beside the Ways to Serve list. Names the training volunteers with children must complete.",
          multiline: true,
        }),
        safeguardingCtaLabel: fields.text({ label: "Safeguarding Button Label" }),

        ctaTitle: fields.text({ label: "Get Involved Heading" }),
        ctaBody: fields.text({ label: "Get Involved Body", multiline: true }),
        ctaLabel: fields.text({ label: "Get Involved Button Label" }),
      },
    }),
    safeguardingPage: singleton({
      label: "Safeguarding Page",
      path: "src/content/safeguarding-page",
      format: { data: "json" },
      schema: {
        heroTitle: fields.text({ label: "Page Title" }),
        heroSubtitle: fields.text({ label: "Page Label" }),
        heroDescription: fields.text({ label: "Page Intro", multiline: true }),
        directorLabel: fields.text({ label: "Director Role Label" }),
        directorName: fields.text({ label: "Director Name" }),
        commitmentTitle: fields.text({ label: "Commitment Heading" }),
        commitmentBody: fields.text({ label: "Commitment Body", multiline: true }),
        requirementsTitle: fields.text({ label: "Requirements Heading" }),
        requirements: fields.array(
          fields.object({
            title: fields.text({ label: "Requirement" }),
            description: fields.text({ label: "Description", multiline: true }),
            icon: iconField(),
          }),
          {
            label: "Volunteer Requirements",
            description:
              "Safeguarding policy. Change this only with wording the parish or diocese has confirmed.",
            itemLabel: (props) => props.fields.title.value || "Requirement",
          }
        ),
        rolesTitle: fields.text({ label: "Roles List Heading" }),
        roles: fields.array(fields.text({ label: "Role" }), {
          label: "Roles Requiring Training",
          itemLabel: (props) => props.value || "Role",
        }),
      },
    }),
    visitPage: singleton({
      label: "Visit Page",
      path: "src/content/visit-page",
      format: { data: "json" },
      schema: {
        heroTitle: fields.text({ label: "Page Title" }),
        heroSubtitle: fields.text({ label: "Page Label" }),
        heroDescription: fields.text({ label: "Page Intro", multiline: true }),

        sundayTitle: fields.text({ label: "Sunday Section Heading" }),
        serviceTimeLabel: fields.text({ label: "Service Time Label" }),
        serviceTimeNote: fields.text({
          label: "Service Time Note",
          description: "The service time itself is edited in Site Settings.",
        }),
        locationLabel: fields.text({ label: "Location Label" }),
        locationNote: fields.text({
          label: "Location Note",
          description: "The address is edited in Site Settings.",
        }),
        parkingLabel: fields.text({ label: "Parking Label" }),
        parkingBody: fields.text({ label: "Parking Details", multiline: true }),
        directionsCtaLabel: fields.text({ label: "Directions Button Label" }),

        expectTitle: fields.text({ label: "What to Expect Heading" }),
        expectSubtitle: fields.text({ label: "What to Expect Label" }),
        expectDescription: fields.text({
          label: "What to Expect Intro",
          multiline: true,
        }),
        expectCards: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            icon: iconField(),
          }),
          {
            label: "What to Expect Cards",
            itemLabel: (props) => props.fields.title.value || "Card",
          }
        ),

        familyEyebrow: fields.text({ label: "Families Label" }),
        familyTitle: fields.text({ label: "Families Heading" }),
        familyIntro: fields.text({ label: "Families Intro", multiline: true }),
        familyImage: fields.image({
          label: "Families Photo",
          description:
            "Use at least 1400 x 1400 pixels. JPG. It is cropped to a square on computers and a wide strip on phones, so keep the subject centred. The photo here before this note was 334 pixels wide and looked out of focus for exactly that reason.",
          directory: "public/images/ministries",
          publicPath: "/images/ministries",
        }),
        familyImageAlt: fields.text({ label: "Families Photo Description" }),
        familyItems: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            icon: iconField(),
          }),
          {
            label: "What We Offer Families",
            itemLabel: (props) => props.fields.title.value || "Item",
          }
        ),
        childSafetyTitle: fields.text({ label: "Child Safety Heading" }),
        childSafetyBody: fields.text({
          label: "Child Safety Body",
          multiline: true,
        }),
        childSafetyCtaLabel: fields.text({ label: "Child Safety Button Label" }),

        fellowshipTitle: fields.text({ label: "Fellowship Heading" }),
        fellowshipBody: fields.text({ label: "Fellowship Body", multiline: true }),
        fellowshipCtaLabel: fields.text({ label: "Fellowship Button Label" }),

        nextStepsTitle: fields.text({ label: "Next Steps Heading" }),
        nextStepsBody: fields.text({ label: "Next Steps Body", multiline: true }),
        nextStepsPrimaryCtaLabel: fields.text({ label: "Next Steps Button Label" }),
        nextStepsSecondaryCtaLabel: fields.text({
          label: "Next Steps Secondary Button Label",
        }),
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
        description: fields.text({
          label: "Description",
          description:
            "This is the copy visitors see on the DeafChurch page, the homepage card, Serve, and Missions. Saving it here is what updates those pages.",
          multiline: true,
        }),
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
          description:
            "Head and shoulders, portrait orientation. Use at least 800 x 1000 pixels. JPG. Without one, the card shows the person's initials instead.",
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
        resourceLabel: fields.text({
          label: "Resource Link Text (optional)",
          description:
            "Shown as a link on the activity, for a prayer app, a book, or a Zoom room.",
        }),
        resourceUrl: fields.url({ label: "Resource Link URL (optional)" }),
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
  },
});
