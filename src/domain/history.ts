import outline from "../data/vietnam-outline.json";
import placeRecords from "../data/history-places.json";
import locationRecords from "../data/history-locations.json";
import { content, lane, periods } from "./content";
import type { Content, EventRecord } from "./types";
export type HistoryRegion = "all" | "north" | "south" | "common";
export type HistoryPlace = (typeof placeRecords)[number];
export type HistoryLocation = {
  eventId: string;
  kind: "places" | "area" | "overseas";
  placeIds: string[];
  note: string;
};
export const historyPlaces = placeRecords;
export const historyLocations = locationRecords as HistoryLocation[];
export const allHistoryPeriod = { label: "1954–1975", start: 1954, end: 1976 };
export const projectPoint = (longitude: number, latitude: number) =>
  [38 + (longitude - 101) * 36, 12 + (24.5 - latitude) * 36] as const;
export const vietnamPath = outline.coordinates
  .map((polygon) =>
    polygon
      .map(
        (ring) =>
          ring
            .map(
              ([lon, lat], i) =>
                `${i ? "L" : "M"}${projectPoint(lon, lat)
                  .map((v) => v.toFixed(2))
                  .join(",")}`,
            )
            .join(" ") + " Z",
      )
      .join(" "),
  )
  .join(" ");
export const historyLocation = (id: string) =>
  historyLocations.find((entry) => entry.eventId === id)!;
export const historyEvents = (
  data: Content,
  start: number,
  end: number,
  region: HistoryRegion = "all",
  placeId: string | null = null,
): EventRecord[] =>
  data.events
    .filter(
      (event) =>
        event.year >= start &&
        event.year < end &&
        (region === "all" || lane(event) === region) &&
        (!placeId || historyLocation(event.id).placeIds.includes(placeId)),
    )
    .sort(
      (a, b) =>
        a.date.localeCompare(b.date) || a.title.localeCompare(b.title, "vi"),
    );
export function validateHistory(data: Content) {
  const errors: string[] = [];
  for (const period of periods)
    if (historyEvents(data, period.start, period.end).length < 5)
      errors.push("History coverage below 5: " + period.label);
  const ids = data.events
    .filter((e) => e.year >= 1954 && e.year <= 1975)
    .map((e) => e.id);
  if (
    new Set(historyLocations.map((l) => l.eventId)).size !==
    historyLocations.length
  )
    errors.push("Duplicate history geography");
  for (const id of ids)
    if (!historyLocations.some((l) => l.eventId === id))
      errors.push("Missing history geography: " + id);
  for (const record of historyLocations) {
    if (
      !ids.includes(record.eventId) ||
      (record.kind === "places" && !record.placeIds.length) ||
      record.placeIds.some((id) => !historyPlaces.some((p) => p.id === id))
    )
      errors.push("Invalid history reference: " + record.eventId);
  }
  for (const p of historyPlaces)
    if (
      !Number.isFinite(p.latitude) ||
      !Number.isFinite(p.longitude) ||
      p.latitude < 8 ||
      p.latitude > 24 ||
      p.longitude < 102 ||
      p.longitude > 110 ||
      !p.sourceUrl.startsWith("https://www.geonames.org/")
    )
      errors.push("Invalid place: " + p.id);
  return errors;
}
// Map metadata is checked during production build, independently of game sessions.
export const defaultHistoryEvent = content.events.find(
  (e) => e.id === "dien-bien",
)!;
