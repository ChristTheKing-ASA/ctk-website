import churchInfoJson from "@/content/church-info.json";
import type { ChurchInfoTransformed } from "@/lib/content";

type ChurchInfoSource = {
  name?: string | null;
  shortName?: string | null;
  phone?: string | null;
  email?: string | null;
  adminEmail?: string | null;
  street?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  mailingAddress?: string | null;
  serviceTime?: string | null;
  facebookUrl?: string | null;
  youtubeUrl?: string | null;
  instagramUrl?: string | null;
  givingUrl?: string | null;
  appUrl?: string | null;
  dioceseName?: string | null;
  dioceseUrl?: string | null;
  dioceseBishop?: string | null;
  denominationName?: string | null;
  denominationShortName?: string | null;
  denominationUrl?: string | null;
  scriptureText?: string | null;
  scriptureReference?: string | null;
};

export function transformChurchInfoJson(
  data: ChurchInfoSource | null | undefined,
): ChurchInfoTransformed {
  return {
    name: data?.name || "",
    shortName: data?.shortName || "",
    phone: data?.phone || "",
    email: data?.email || "",
    adminEmail: data?.adminEmail || "",
    address: {
      street: data?.street || "",
      city: data?.city || "",
      state: data?.state || "",
      zip: data?.zip || "",
      mailing: data?.mailingAddress || "",
    },
    serviceTime: data?.serviceTime || "",
    social: {
      facebook: data?.facebookUrl || "",
      youtube: data?.youtubeUrl || "",
      instagram: data?.instagramUrl || "",
    },
    giving: {
      url: data?.givingUrl || "",
      appUrl: data?.appUrl || "",
    },
    diocese: {
      name: data?.dioceseName || "",
      url: data?.dioceseUrl || "",
      bishop: data?.dioceseBishop || "",
    },
    denomination: {
      name: data?.denominationName || "",
      shortName: data?.denominationShortName || "",
      url: data?.denominationUrl || "",
    },
    scripture: {
      main: {
        text: data?.scriptureText || "",
        reference: data?.scriptureReference || "",
      },
      about: {
        text: "Jesus replied: 'Love the Lord your God with all your heart and with all your soul and with all your mind.' This is the first and greatest commandment.",
        reference: "Matthew 22:37-38",
      },
    },
    mission: {
      vision: "To be co-workers with Christ in the Kingdom of God",
    },
  };
}

/** Church info from Keystatic JSON — safe for client components (Footer, Header imports). */
export function getChurchInfoFromJson(): ChurchInfoTransformed {
  return transformChurchInfoJson(churchInfoJson);
}
