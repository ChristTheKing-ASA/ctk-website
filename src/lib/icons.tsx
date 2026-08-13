import { createElement } from "react";
import {
  Heart,
  BookOpen,
  HandHeart,
  Book,
  Church,
  Globe,
  MapPin,
  Play,
  Users,
  Calendar,
  Music,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

/**
 * Icons an editor can pick in Keystatic.
 *
 * Deliberately a short curated list rather than all of lucide-react. These are
 * chosen by a non-developer from a dropdown, so every option needs to look
 * right at the sizes the homepage renders them and make sense for a parish
 * site. Add to this map and the select options stay in sync automatically.
 */
export const ICONS = {
  heart: Heart,
  bookOpen: BookOpen,
  handHeart: HandHeart,
  book: Book,
  church: Church,
  globe: Globe,
  mapPin: MapPin,
  play: Play,
  users: Users,
  calendar: Calendar,
  music: Music,
  sparkles: Sparkles,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;

const LABELS: Record<IconName, string> = {
  heart: "Heart",
  bookOpen: "Open Book",
  handHeart: "Helping Hand",
  book: "Book",
  church: "Church",
  globe: "Globe",
  mapPin: "Map Pin",
  play: "Play",
  users: "People",
  calendar: "Calendar",
  music: "Music",
  sparkles: "Sparkles",
};

/** Options for a Keystatic `fields.select`. */
export const ICON_OPTIONS = (Object.keys(ICONS) as IconName[]).map((value) => ({
  label: LABELS[value],
  value,
}));

export const DEFAULT_ICON: IconName = "church";

/**
 * Resolves a stored icon name to a component. Falls back rather than throwing:
 * a renamed icon should not take the homepage down, and an editor has no way
 * to debug a build error.
 */
export function iconFor(name: string | null | undefined): LucideIcon {
  return ICONS[(name ?? "") as IconName] ?? ICONS[DEFAULT_ICON];
}

export function Icon({
  name,
  className,
}: {
  name: string | null | undefined;
  className?: string;
}) {
  // createElement rather than <Component />: the lint rule for statically
  // analyzable components flags a JSX tag resolved from a variable.
  return createElement(iconFor(name), { className, "aria-hidden": true });
}
