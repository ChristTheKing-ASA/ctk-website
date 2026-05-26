import { reader } from "@/lib/content";
import {
  getFooterNavigationFromJson,
  getHeaderNavigationFromJson,
  getNavigationFromJson,
  type NavItem,
} from "@/lib/navigation-static";

export type { NavItem };
export { getFooterNavigationFromJson, getHeaderNavigationFromJson, getNavigationFromJson };

function normalizeItems(
  items:
    | ReadonlyArray<{
        readonly name?: string | null;
        readonly href?: string | null;
        readonly showInHeader?: boolean | null;
        readonly showInFooter?: boolean | null;
      }>
    | null
    | undefined,
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

export async function getNavigation(): Promise<NavItem[]> {
  const data = await reader.singletons.siteNavigation.read();
  return normalizeItems(data?.items);
}

export async function getHeaderNavigation(): Promise<NavItem[]> {
  const items = await getNavigation();
  return items.filter((item) => item.showInHeader);
}

export async function getFooterNavigation(): Promise<NavItem[]> {
  const items = await getNavigation();
  return items.filter((item) => item.showInFooter);
}
