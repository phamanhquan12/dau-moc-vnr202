import { videos } from "../../src/data/videos";
import { describe, it, expect } from "vitest";
import { createHash } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import {
  content,
  CONTENT_VERSION,
  filterEvents,
  lane,
  periodIndex,
  validateContent,
} from "../../src/domain/content";
import {
  advanceQuestion,
  createQuizSession,
  expireQuestion,
  selectOption,
  submitAnswer,
  validateQuiz,
} from "../../src/domain/quiz";
import {
  createOrderingRound,
  gradeOrdering,
  placeCard,
  standardOrder,
  undo,
  validateOrdering,
} from "../../src/domain/ordering";
import {
  initialState,
  recordQuiz,
  restoreSession,
} from "../../src/storage/state";
import { parseRoute } from "../../src/app/App";
import type { Content, QuizSession } from "../../src/domain/types";
const quiz = () => createQuizSession(content, 1, 1000, () => 0.42);
const q = (s: QuizSession) =>
  content.questions.find((q) => q.id === s.questionIds[s.index])!;
const correct = (s: QuizSession) =>
  submitAnswer(s, q(s).id, q(s).correctOptionId, content, s.deadline - 1);
const wrong = (s: QuizSession) =>
  submitAnswer(
    s,
    q(s).id,
    q(s).options.find((o) => o.id !== q(s).correctOptionId)!.id,
    content,
    s.deadline - 1,
  );
describe("quiz transitions and rules", () => {
  it("six correct gains 100/120/140/160/160/160 =840", () => {
    let s = quiz();
    for (let i = 0; i < 6; i++)
      s = advanceQuestion(correct(s), 2000 + i * 1000);
    expect(s.answers.map((a) => a.gain)).toEqual([
      100, 120, 140, 160, 160, 160,
    ]);
    expect(s.score).toBe(840);
    expect(s.phase).toBe("finished");
    expect(validateQuiz(s, content)).toBe(true);
  });
  it("correct/correct/wrong/correct resets streak and loses one life", () => {
    let s = quiz();
    for (const f of [correct, correct, wrong, correct])
      s = advanceQuestion(f(s), 2000);
    expect(s.answers.map((a) => a.gain)).toEqual([100, 120, 0, 100]);
    expect(s.lives).toBe(2);
  });
  it("zero lives waits for feedback then finishes, score never negative", () => {
    let s = quiz();
    for (let i = 0; i < 2; i++) s = advanceQuestion(wrong(s));
    s = wrong(s);
    expect(s.phase).toBe("feedback");
    expect(s.lives).toBe(0);
    expect(s.score).toBe(0);
    expect(advanceQuestion(s).phase).toBe("finished");
  });
  it("deadline -1 accepts and equality expires even when selected", () => {
    const s = quiz();
    expect(correct(s).score).toBe(100);
    expect(
      submitAnswer(s, q(s).id, q(s).correctOptionId, content, s.deadline)
        .answers[0].timeout,
    ).toBe(true);
  });
  it("double submit and expire after submit are no-ops", () => {
    const s = correct(quiz());
    expect(correct(s)).toBe(s);
    expect(expireQuestion(s, content, s.deadline + 1)).toBe(s);
  });
  it("stale id, invalid option, empty submit and wrong phase are guarded", () => {
    const s = quiz();
    expect(submitAnswer(s, "stale", "a", content, 2000)).toBe(s);
    expect(submitAnswer(s, q(s).id, null, content, 2000)).toBe(s);
    expect(selectOption(s, q(s).id, "invalid", content)).toBe(s);
    expect(advanceQuestion(s)).toBe(s);
    const feedback = correct(s);
    expect(selectOption(feedback, q(feedback).id, "b", content)).toBe(feedback);
  });
  it("select is not grading", () => {
    const s = quiz(),
      selected = selectOption(s, q(s).id, "b", content);
    expect(selected.selectedOptionId).toBe("b");
    expect(selected.answers).toHaveLength(0);
    expect(selected.score).toBe(0);
  });
  it("chapter selection gives 2 recall first +4 understanding, six events, stable IDs", () => {
    for (const chapter of [1, 2, 3] as const) {
      const s = createQuizSession(content, chapter, 1000);
      const qs = s.questionIds.map(
        (id) => content.questions.find((q) => q.id === id)!,
      );
      expect(qs.map((q) => q.difficulty)).toEqual([1, 1, 2, 2, 2, 2]);
      expect(qs.every((q) => q.chapter === chapter)).toBe(true);
      expect(new Set(qs.map((q) => q.eventId)).size).toBe(6);
      for (const q of qs)
        expect([...s.optionOrderByQuestion[q.id]].sort()).toEqual(
          q.options.map((o) => o.id).sort(),
        );
    }
  });
  it("short/deficient pool stays in chapter and announces fallback", () => {
    const data = structuredClone(content);
    data.questions = data.questions
      .filter((q) => q.chapter === 1 && q.difficulty === 1)
      .slice(0, 3);
    const s = createQuizSession(data, 1);
    expect(s.questionIds).toHaveLength(3);
    expect(s.notice).toContain("3 câu");
    expect(() => createQuizSession(data, 3)).toThrow();
  });
  it("restore keeps order/selection/deadline exactly; expiry once", () => {
    let s = quiz();
    s = selectOption(s, q(s).id, "c", content);
    const state = { ...initialState(content), quiz: s };
    const restored = restoreSession(JSON.stringify(state), content, 2000);
    expect(restored.quiz).toEqual(s);
    const expired = restoreSession(JSON.stringify(state), content, s.deadline);
    expect(expired.quiz!.answers).toHaveLength(1);
    expect(
      restoreSession(JSON.stringify(expired), content, s.deadline + 99).quiz,
    ).toEqual(expired.quiz);
  });
  it("bad score, option permutation and version are rejected", () => {
    const s = quiz();
    expect(validateQuiz({ ...s, score: 999 }, content)).toBe(false);
    expect(validateQuiz({ ...s, contentVersion: "old" }, content)).toBe(false);
    const bad = structuredClone(s);
    bad.optionOrderByQuestion[bad.questionIds[0]] = ["a", "a", "a", "a"];
    expect(validateQuiz(bad, content)).toBe(false);
  });
});
describe("ordering, evidence and restoration", () => {
  it("all events and questions have checked, resolvable source references", () => {
    for (const event of content.events) {
      for (const id of [event.sourceId, ...(event.additionalSourceIds ?? [])]) {
        const source = content.sources.find((s) => s.id === id)!;
        expect(source.reviewStatus).toBe("passage-checked");
        expect(source.url).toMatch(/^https:\/\//);
        expect(source.supports).toBeTruthy();
      }
      for (const question of content.questions.filter(
        (q) => q.eventId === event.id,
      ))
        expect(question.sourceId).toBe(event.sourceId);
    }
  });
  it("PDF anchors distinguish printed page from viewer page in the checked edition", () => {
    const sources = content.sources.filter((s) => s.pdfPage !== undefined);
    expect(sources).toHaveLength(26);
    for (const source of sources) {
      expect(source.url).toContain(`#page=${source.pdfPage}`);
      expect(source.pdfPage).toBe(source.page! + 1);
      expect(source.pdfPageEnd).toBe(source.pageEnd! + 1);
    }
    expect(content.events.find((e) => e.id === "wto")!.sourceId).toBe(
      "wto-membership",
    );
  });
  it("bundled images match provenance hashes and pending media is not embedded", () => {
    const provenance = JSON.parse(
      readFileSync("public/media/provenance.json", "utf8"),
    );
    const bundled = content.images.filter(
      (i) => i.licenseStatus === "verified",
    );
    expect(bundled).toHaveLength(8);
    for (const image of bundled) {
      const record = provenance[image.id];
      expect(record.localPath).toBe(`public/${image.localPath}`);
      expect(
        createHash("sha256")
          .update(readFileSync(record.localPath))
          .digest("hex"),
      ).toBe(record.sha256);
      expect(image.credit).toBeTruthy();
      expect(image.licenseUrl).toMatch(/^https:\/\//);
    }
    expect(
      content.images.find((i) => i.id === "sai-gon")!.localPath,
    ).toBeNull();
    expect(
      validateContent(content, (path) => existsSync(`public/${path}`)),
    ).toEqual([]);
  });
  it("checked references reject absent provenance, bad page anchors and dangling supplements", () => {
    for (const mutate of [
      (d: Content) => {
        d.events[0].additionalSourceIds = ["missing"];
      },
      (d: Content) => {
        d.sources[0].url = "https://example.org/#page=999";
      },
      (d: Content) => {
        d.sources[0].supports = "";
      },
      (d: Content) => {
        d.images[0].licenseUrl = "";
      },
    ]) {
      const data = structuredClone(content);
      mutate(data);
      expect(validateContent(data).length).toBeGreaterThan(0);
    }
  });
  it("ordering uses distinct years, grades once and preserves round", () => {
    let s = createOrderingRound(content, 2, 1000),
      ids = s.eventIds;
    const sorted = standardOrder(s, content);
    sorted.forEach((id, i) => (s = placeCard(s, id, i)));
    const graded = gradeOrdering(s, content);
    expect(graded.score).toBe(600);
    expect(graded.eventIds).toBe(ids);
    expect(gradeOrdering(graded, content)).toBe(graded);
    expect(placeCard(graded, sorted[0], 1)).toBe(graded);
    expect(validateOrdering(graded, content)).toBe(true);
  });
  it("two misplaced cards score400 and undo restores placement", () => {
    let s = createOrderingRound(content, 2);
    standardOrder(s, content).forEach((id, i) => (s = placeCard(s, id, i)));
    const before = s.slots;
    s = placeCard(s, s.slots[0]!, 1);
    expect(gradeOrdering(s, content).score).toBe(400);
    expect(undo(s).slots).toEqual(before);
  });
  it("ordering short chapter reports count and partial points", () => {
    const data = {
      ...content,
      events: content.events.filter((e) => e.chapter === 1).slice(0, 2),
    };
    let s = createOrderingRound(data, 1);
    expect(s.slots).toHaveLength(2);
    expect(s.notice).toContain("2");
    standardOrder(s, data).forEach((id, i) => (s = placeCard(s, id, i)));
    expect(gradeOrdering(s, data).score).toBe(200);
  });
  it("ordering and quiz bests remain independent", () => {
    let state = initialState(content);
    state.progress.bestOrdering = 500;
    let s = quiz();
    for (let i = 0; i < 6; i++) s = advanceQuestion(correct(s));
    state = recordQuiz(state, s);
    expect(state.progress.bestQuiz).toBe(840);
    expect(state.progress.bestOrdering).toBe(500);
    expect(state.progress.correctQuestionIds).toHaveLength(6);
    expect(state.progress.seenEventIds).toHaveLength(0);
  });
  it("seed validates all dates, refs, choices, and 26/52 counts", () => {
    expect(content.events).toHaveLength(26);
    expect(content.questions).toHaveLength(52);
    expect(validateContent(content)).toEqual([]);
    expect(content.events.find((e) => e.id === "thang-tam")!.date).toBe(
      "1945-08",
    );
  });
  it("validator catches invalid real day, dangling IDs, duplicate choices and absent media", () => {
    for (const mutate of [
      (d: Content) => (d.events[0].sourceId = "bad"),
      (d: Content) => (d.questions[0].eventId = "bad"),
      (d: Content) =>
        (d.questions[0].options[1].text = d.questions[0].options[0].text),
      (d: Content) => (d.events[0].imageId = "bad"),
      (d: Content) => {
        d.events[0].date = "1920-02-30";
        d.events[0].datePrecision = "day";
      },
      (d: Content) => {
        d.images[0].licenseStatus = "verified";
        d.images[0].localPath = "missing.jpg";
      },
    ]) {
      const d = structuredClone(content);
      mutate(d);
      expect(validateContent(d, () => false).length).toBeGreaterThan(0);
    }
  });
  it("boundary years appear exactly once and common events stay common", () => {
    expect(
      [1954, 1960, 1961, 1965, 1968, 1969, 1972, 1973, 1975].map(periodIndex),
    ).toEqual([0, 0, 1, 2, 2, 3, 3, 4, 4]);
    expect(lane(content.events.find((e) => e.id === "dai-hoi-iii")!)).toBe(
      "common",
    );
  });
  it("Vietnamese accent-insensitive search and filters", () => {
    expect(filterEvents(content, "Doi moi", 3)).toHaveLength(1);
    expect(filterEvents(content, "Đổi mới", 3)).toHaveLength(1);
    expect(
      filterEvents(content, "", 2, "Miền Nam").every(
        (e) => e.region === "Miền Nam",
      ),
    ).toBe(true);
  });
  it("broken/incompatible state recovery preserves other valid progress", () => {
    expect(restoreSession("broken", content).notice).not.toBe("");
    const state = initialState(content);
    state.progress.bestOrdering = 200;
    state.quiz = { ...quiz(), contentVersion: CONTENT_VERSION + "old" };
    const restored = restoreSession(JSON.stringify(state), content);
    expect(restored.quiz).toBeNull();
    expect(restored.progress.bestOrdering).toBe(200);
    expect(restored.notice).toContain("không tương thích");
  });
  it("hash routing handles direct URLs and invalid route fallback", () => {
    expect(parseRoute("#profile/dien-bien")).toEqual({
      view: "profile",
      id: "dien-bien",
    });
    expect(parseRoute("#invalid").view).toBe("overview");
  });
});

it("curated videos match existing course events, photos and checked publisher metadata", () => {
  expect(videos).toHaveLength(3);
  expect(new Set(videos.map((v) => v.id)).size).toBe(3);
  for (const video of videos) {
    expect(
      content.events.some(
        (e) => e.id === video.eventId && e.chapter === video.chapter,
      ),
    ).toBe(true);
    expect(
      content.images.some(
        (i) => i.id === video.imageId && i.licenseStatus === "verified",
      ),
    ).toBe(true);
    expect(video.checkedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    if (video.youtubeId) {
      expect(video.youtubeId).toMatch(/^[a-zA-Z0-9_-]{11}$/);
      expect(video.sourceUrl).toBe(
        `https://www.youtube.com/watch?v=${video.youtubeId}`,
      );
    } else expect(new URL(video.sourceUrl).hostname).toBe("nhandan.vn");
  }
});
