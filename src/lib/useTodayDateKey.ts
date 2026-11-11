"use client";

import { useSyncExternalStore } from "react";
import { getTodayDateKey } from "@/lib/events";

const subscribe = () => () => {};

/**
 * Today's date in the visitor's browser, as YYYY-MM-DD in parish time.
 *
 * The first paint uses the date the site was built, so it matches the HTML
 * that was shipped. React then re-renders with the real date. That is what
 * moves an event from "upcoming" to "past" the morning after, with no rebuild.
 */
export function useTodayDateKey(buildDateKey: string) {
  return useSyncExternalStore(
    subscribe,
    () => getTodayDateKey(),
    () => buildDateKey
  );
}
