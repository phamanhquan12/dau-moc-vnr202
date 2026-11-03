import type { Content, Chapter, QuizSession } from "./types";
import { CONTENT_VERSION } from "./content";
export function shuffle<T>(items: T[], random = Math.random) {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
export function createQuizSession(
  data: Content,
  chapter: Chapter,
  now = Date.now(),
  random = Math.random,
): QuizSession {
  const pool = data.questions.filter((q) => !chapter || q.chapter === chapter),
    selected: typeof pool = [];
  const take = (difficulty: number, count: number) => {
    for (let i = 0; i < count; i++) {
      const candidates = shuffle(
        pool.filter(
          (q) => q.difficulty === difficulty && !selected.includes(q),
        ),
        random,
      );
      const q =
        candidates.find(
          (q) => !selected.some((s) => s.eventId === q.eventId),
        ) || candidates[0];
      if (q) selected.push(q);
    }
  };
  take(1, 2);
  take(2, 4);
  let notice =
    selected.filter((q) => q.difficulty === 1).length !== 2 ||
    selected.filter((q) => q.difficulty === 2).length !== 4
      ? "Bộ lọc thiếu ứng viên theo tỷ lệ 2/4; dùng các câu còn lại trong cùng chương."
      : "";
  for (const q of shuffle(
    pool.filter((q) => !selected.includes(q)),
    random,
  )) {
    if (selected.length >= 6) break;
    selected.push(q);
  }
  selected.sort((a, b) => a.difficulty - b.difficulty);
  if (selected.length < 6)
    notice += ` Chỉ có ${selected.length} câu trong bộ lọc.`;
  if (!selected.length) throw Error("Không có câu hỏi trong bộ lọc");
  return {
    sessionId: "quiz-" + now + "-" + random(),
    schemaVersion: 3,
    contentVersion: CONTENT_VERSION,
    chapter,
    questionIds: selected.map((q) => q.id),
    optionOrderByQuestion: Object.fromEntries(
      selected.map((q) => [
        q.id,
        shuffle(
          q.options.map((o) => o.id),
          random,
        ),
      ]),
    ),
    index: 0,
    selectedOptionId: null,
    phase: "question",
    deadline: now + 30000,
    score: 0,
    streak: 0,
    lives: 3,
    answers: [],
    notice,
  };
}
export function selectOption(
  s: QuizSession,
  qid: string,
  oid: string,
  data: Content,
) {
  if (
    s.phase !== "question" ||
    s.questionIds[s.index] !== qid ||
    !data.questions.find((q) => q.id === qid)?.options.some((o) => o.id === oid)
  )
    return s;
  return { ...s, selectedOptionId: oid };
}
export function submitAnswer(
  s: QuizSession,
  qid: string,
  oid: string | null,
  data: Content,
  now = Date.now(),
): QuizSession {
  if (s.phase !== "question" || s.questionIds[s.index] !== qid) return s;
  const q = data.questions.find((q) => q.id === qid);
  if (!q) return s;
  const timeout = now >= s.deadline;
  if (!timeout && !q.options.some((o) => o.id === oid)) return s;
  const correct = !timeout && oid === q.correctOptionId,
    gain = correct ? 100 + Math.min(s.streak, 3) * 20 : 0;
  return {
    ...s,
    phase: "feedback",
    selectedOptionId: timeout ? null : oid,
    score: s.score + gain,
    lives: s.lives - (correct ? 0 : 1),
    streak: correct ? s.streak + 1 : 0,
    answers: [
      ...s.answers,
      {
        questionId: qid,
        optionId: timeout ? null : oid,
        correct,
        timeout,
        gain,
      },
    ],
  };
}
export const expireQuestion = (
  s: QuizSession,
  data: Content,
  now = Date.now(),
) =>
  now >= s.deadline
    ? submitAnswer(s, s.questionIds[s.index], null, data, now)
    : s;
export function advanceQuestion(s: QuizSession, now = Date.now()): QuizSession {
  if (s.phase !== "feedback") return s;
  if (s.lives === 0 || s.index === s.questionIds.length - 1)
    return { ...s, phase: "finished" };
  return {
    ...s,
    phase: "question",
    index: s.index + 1,
    selectedOptionId: null,
    deadline: now + 30000,
  };
}
export function validateQuiz(s: QuizSession, data: Content) {
  try {
    if (
      s.schemaVersion !== 3 ||
      s.contentVersion !== CONTENT_VERSION ||
      !s.sessionId ||
      !["question", "feedback", "finished"].includes(s.phase) ||
      ![0, 1, 2, 3].includes(s.chapter) ||
      !s.questionIds.length ||
      s.questionIds.length > 6 ||
      new Set(s.questionIds).size !== s.questionIds.length ||
      !Number.isInteger(s.index) ||
      s.index < 0 ||
      s.index >= s.questionIds.length ||
      !Number.isFinite(s.deadline)
    )
      return false;
    for (const id of s.questionIds) {
      const q = data.questions.find((q) => q.id === id),
        order = s.optionOrderByQuestion[id];
      if (
        !q ||
        (s.chapter && q.chapter !== s.chapter) ||
        order.length !== 4 ||
        new Set(order).size !== 4 ||
        order.some((oid) => !q.options.some((o) => o.id === oid))
      )
        return false;
    }
    const current = data.questions.find(
      (q) => q.id === s.questionIds[s.index],
    )!;
    if (
      s.selectedOptionId !== null &&
      !current.options.some((o) => o.id === s.selectedOptionId)
    )
      return false;
    if (s.answers.length !== (s.phase === "question" ? s.index : s.index + 1))
      return false;
    let score = 0,
      lives = 3,
      streak = 0;
    for (let i = 0; i < s.answers.length; i++) {
      const a = s.answers[i],
        q = data.questions.find((q) => q.id === s.questionIds[i])!;
      if (
        a.questionId !== q.id ||
        typeof a.timeout !== "boolean" ||
        (a.timeout && a.optionId !== null) ||
        (!a.timeout && !q.options.some((o) => o.id === a.optionId))
      )
        return false;
      const correct = !a.timeout && a.optionId === q.correctOptionId,
        gain = correct ? 100 + Math.min(streak, 3) * 20 : 0;
      if (a.correct !== correct || a.gain !== gain) return false;
      score += gain;
      streak = correct ? streak + 1 : 0;
      lives -= correct ? 0 : 1;
      if (lives <= 0 && i < s.answers.length - 1) return false;
    }
    return (
      s.score === score &&
      s.lives === lives &&
      s.streak === streak &&
      lives >= 0 &&
      !(s.phase === "question" && lives === 0) &&
      !(
        s.phase === "finished" &&
        lives > 0 &&
        s.index !== s.questionIds.length - 1
      )
    );
  } catch {
    return false;
  }
}
