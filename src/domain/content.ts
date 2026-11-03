import raw from "../data/content.json";
import type { Content, Chapter, EventRecord } from "./types";
export const content = raw as Content;
export const CONTENT_VERSION = "readme-revised-seed-1-reviewed-1";
export const chapters = [
  {
    id: 1 as Chapter,
    title: "Chuẩn bị & giành chính quyền",
    range: "1920–1945",
  },
  { id: 2 as Chapter, title: "Kiến quốc & kháng chiến", range: "1945–1975" },
  { id: 3 as Chapter, title: "Xây dựng & hội nhập", range: "1975–2018" },
];
export const periods = [
  { label: "1954–1960", start: 1954, end: 1961 },
  { label: "1961–1965", start: 1961, end: 1965 },
  { label: "1965–1968", start: 1965, end: 1969 },
  { label: "1969–1973", start: 1969, end: 1973 },
  { label: "1973–1975", start: 1973, end: 1976 },
];
export const periodIndex = (year: number) =>
  periods.findIndex((p) => year >= p.start && year < p.end);
export const lane = (e: EventRecord) =>
  e.region === "Miền Bắc"
    ? "north"
    : e.region === "Miền Nam"
      ? "south"
      : "common";
export const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
export function filterEvents(
  data: Content,
  query = "",
  chapter: Chapter = 0,
  region = "",
) {
  return data.events.filter(
    (e) =>
      (!chapter || e.chapter === chapter) &&
      (!region || e.region === region) &&
      normalize(e.title + " " + e.place + " " + e.displayDate).includes(
        normalize(query),
      ),
  );
}
export function validateContent(
  data: Content,
  assetExists?: (path: string) => boolean,
) {
  const errors: string[] = [];
  for (const [key, list] of Object.entries({
    events: data.events,
    questions: data.questions,
    sources: data.sources,
    images: data.images,
  })) {
    if (new Set(list.map((x) => x.id)).size !== list.length)
      errors.push("Duplicate " + key);
  }
  for (const e of data.events) {
    const pattern = {
      year: /^\d{4}$/,
      month: /^\d{4}-(0[1-9]|1[0-2])$/,
      day: /^\d{4}-(0[1-9]|1[0-2])-\d{2}$/,
    }[e.datePrecision];
    if (!pattern?.test(e.date) || Number(e.date.slice(0, 4)) !== e.year)
      errors.push("Date " + e.id);
    if (e.datePrecision === "day") {
      const [y, m, d] = e.date.split("-").map(Number),
        date = new Date(Date.UTC(y, m - 1, d));
      if (
        date.getUTCFullYear() !== y ||
        date.getUTCMonth() !== m - 1 ||
        date.getUTCDate() !== d
      )
        errors.push("Invalid day " + e.id);
    }
    if (
      !data.sources.some((s) => s.id === e.sourceId) ||
      (e.imageId && !data.images.some((i) => i.id === e.imageId))
    )
      errors.push("Event reference " + e.id);
  }
  for (const q of data.questions) {
    if (
      q.options.length !== 4 ||
      new Set(q.options.map((o) => o.id)).size !== 4 ||
      new Set(q.options.map((o) => normalize(o.text.trim()))).size !== 4 ||
      q.options.filter((o) => o.id === q.correctOptionId).length !== 1
    )
      errors.push("Options " + q.id);
    if (
      !data.events.some((e) => e.id === q.eventId && e.chapter === q.chapter) ||
      !data.sources.some((s) => s.id === q.sourceId)
    )
      errors.push("Question reference " + q.id);
  }
  for (const i of data.images) {
    if (
      (i.localPath && i.licenseStatus !== "verified") ||
      (i.licenseStatus === "verified" && !i.localPath)
    )
      errors.push("Unverified image " + i.id);
    if (
      i.localPath &&
      (!/^\/?media\//.test(i.localPath) || i.localPath.includes(".."))
    )
      errors.push("Invalid local asset path " + i.id);
    if (i.localPath && assetExists && !assetExists(i.localPath))
      errors.push("Missing asset " + i.id);
  }
  return errors;
}
