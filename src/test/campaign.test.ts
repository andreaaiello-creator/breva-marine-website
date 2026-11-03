import { describe, expect, it } from "vitest";
import { activeCampaign, isCapped } from "@/lib/campaign";
import type { Campaign } from "@/content/types";
const base: Campaign = { id: "a", sample: true, priority: 1, startsAt: "2026-01-01T00:00:00Z", endsAt: "2026-12-31T00:00:00Z", frequency: "session",
  eyebrow: { it: "" }, title: { it: "" }, body: { it: "" }, ctaLabel: { it: "" }, ctaTo: "/" };
describe("campaign highlights", () => {
  it("picks highest priority live campaign", () => {
    const c = activeCampaign([base, { ...base, id: "b", priority: 5 }], new Date("2026-06-01"));
    expect(c?.id).toBe("b");
  });
  it("ignores campaigns outside their window", () => {
    expect(activeCampaign([base], new Date("2027-02-01"))).toBeUndefined();
  });
  it("session cap hides only after dismissal in this session", () => {
    expect(isCapped(base, null, false, 0)).toBe(false);
    expect(isCapped(base, null, true, 0)).toBe(true);
  });
  it("daily cap reopens after 24h", () => {
    const d = { ...base, frequency: "daily" as const };
    expect(isCapped(d, 0, false, 23 * 3600e3)).toBe(true);
    expect(isCapped(d, 0, false, 25 * 3600e3)).toBe(false);
  });
});