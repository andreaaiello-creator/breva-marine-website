import type { Campaign } from "@/content/types";

/** Pick the highest-priority campaign that is live at `now`. */
export function activeCampaign(list: Campaign[], now: Date): Campaign | undefined {
  return list
    .filter((c) => new Date(c.startsAt) <= now && now <= new Date(c.endsAt))
    .sort((a, b) => b.priority - a.priority)[0];
}

/** Frequency cap: true when the highlight must stay hidden. */
export function isCapped(c: Campaign, dismissedAt: number | null, sessionDismissed: boolean, now: number): boolean {
  if (c.frequency === "session") return sessionDismissed;
  if (dismissedAt === null) return false;
  if (c.frequency === "once") return true;
  return now - dismissedAt < 24 * 60 * 60 * 1000; // daily
}