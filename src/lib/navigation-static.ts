import siteNavigationJson from "@/content/site-navigation.json";

export interface NavItem {
  name: string;
  href: string;
  showInHeader: boolean;
  showInFooter: boolean;
}

function normalizeItems(
  items: Array<{
    name?: string | null;
    href?: string | null;
    showInHeader?: boolean | null;
    showInFooter?: boolean | null;
  }> | null | undefined,
): NavItem[] {
  return (items ?? [])
    .filter((item) => item?.name && item?.href)
    .map((item) => ({
      name: item.name || "",
      href: item.href || "",
      showInHeader: item.showInHeader !== false,
      showInFooter: item.showInFooter !== false,
    }));
}

/** For client components — reads Keystatic JSON from disk, no server imports */
export function getNavigationFromJson(): NavItem[] {
  return normalizeItems(siteNavigationJson.items);
}

export function getHeaderNavigationFromJson(): NavItem[] {
  return getNavigationFromJson().filter((item) => item.showInHeader);
}

export function getFooterNavigationFromJson(): NavItem[] {
  return getNavigationFromJson().filter((item) => item.showInFooter);
}
