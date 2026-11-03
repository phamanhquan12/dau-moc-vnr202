import type { OrderingRound, Content, Chapter } from "./types";
import { shuffle } from "./quiz";
import { CONTENT_VERSION } from "./content";
export function createOrderingRound(
  data: Content,
  chapter: Chapter,
  now = Date.now(),
  random = Math.random,
): OrderingRound {
  const pool = shuffle(
      data.events.filter((e) => !chapter || e.chapter === chapter),
      random,
    ),
    chosen = pool
      .filter((e, i) => pool.findIndex((x) => x.year === e.year) === i)
      .slice(0, 6);
  if (!chosen.length) throw Error("Không có hồ sơ");
  return {
    roundId: "order-" + now + "-" + random(),
    schemaVersion: 3,
    contentVersion: CONTENT_VERSION,
    chapter,
    eventIds: shuffle(
      chosen.map((e) => e.id),
      random,
    ),
    slots: chosen.map(() => null),
    history: [],
    phase: "arranging",
    score: null,
    notice:
      chosen.length < 6
        ? `Bộ lọc có ${chosen.length} năm khác nhau; chơi với ${chosen.length} thẻ.`
        : "",
  };
}
export function placeCard(
  s: OrderingRound,
  id: string,
  slot: number,
): OrderingRound {
  if (
    s.phase !== "arranging" ||
    !s.eventIds.includes(id) ||
    !Number.isInteger(slot) ||
    slot < 0 ||
    slot >= s.slots.length
  )
    return s;
  const slots = [...s.slots],
    from = slots.indexOf(id),
    other = slots[slot];
  if (from >= 0) slots[from] = other;
  slots[slot] = id;
  return { ...s, slots, history: [...s.history.slice(-29), s.slots] };
}
export function undo(s: OrderingRound): OrderingRound {
  return s.phase === "arranging" && s.history.length
    ? { ...s, slots: s.history.at(-1)!, history: s.history.slice(0, -1) }
    : s;
}
export function standardOrder(s: OrderingRound, data: Content) {
  return [...s.eventIds].sort(
    (a, b) =>
      data.events.find((e) => e.id === a)!.year -
      data.events.find((e) => e.id === b)!.year,
  );
}
export function gradeOrdering(s: OrderingRound, data: Content): OrderingRound {
  if (s.phase !== "arranging" || s.slots.some((id) => !id)) return s;
  const sorted = standardOrder(s, data);
  return {
    ...s,
    phase: "graded",
    score: s.slots.reduce(
      (score, id, i) => score + (id === sorted[i] ? 100 : 0),
      0,
    ),
  };
}
export function validateOrdering(s: OrderingRound, data: Content) {
  try {
    const slots = (a: (string | null)[]) =>
      a.length === s.eventIds.length &&
      a.every((id) => id === null || s.eventIds.includes(id)) &&
      new Set(a.filter(Boolean)).size === a.filter(Boolean).length;
    if (
      s.schemaVersion !== 3 ||
      s.contentVersion !== CONTENT_VERSION ||
      ![0, 1, 2, 3].includes(s.chapter) ||
      !s.roundId ||
      !s.eventIds.length ||
      s.eventIds.length > 6 ||
      new Set(s.eventIds).size !== s.eventIds.length ||
      s.eventIds.some(
        (id) =>
          !data.events.some(
            (e) => e.id === id && (!s.chapter || e.chapter === s.chapter),
          ),
      ) ||
      new Set(
        s.eventIds.map((id) => data.events.find((e) => e.id === id)!.year),
      ).size !== s.eventIds.length ||
      !slots(s.slots) ||
      s.history.length > 30 ||
      !s.history.every(slots)
    )
      return false;
    if (s.phase === "arranging") return s.score === null;
    if (s.phase !== "graded" || s.slots.some((id) => !id)) return false;
    return (
      gradeOrdering({ ...s, phase: "arranging", score: null }, data).score ===
      s.score
    );
  } catch {
    return false;
  }
}
