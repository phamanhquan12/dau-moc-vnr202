import type { AppState, Content, QuizSession } from "../domain/types";
import { validateQuiz, expireQuestion } from "../domain/quiz";
import { validateOrdering } from "../domain/ordering";
export const STORAGE_KEY = "dau-moc-vnr-v3";
export const initialState = (data: Content): AppState => ({
  schemaVersion: 3,
  progress: {
    seenEventIds: [],
    correctQuestionIds: [],
    bestQuiz: 0,
    bestOrdering: 0,
  },
  quiz: null,
  ordering: null,
  ui: { chapter: 1, selected: data.events[0].id, period: 0 },
  notice: "",
});
export function restoreSession(
  raw: string | null,
  data: Content,
  now = Date.now(),
): AppState {
  const base = initialState(data);
  if (!raw) return base;
  try {
    const s = JSON.parse(raw) as AppState;
    if (
      s.schemaVersion !== 3 ||
      !Array.isArray(s.progress.seenEventIds) ||
      !Array.isArray(s.progress.correctQuestionIds) ||
      !Number.isFinite(s.progress.bestQuiz) ||
      s.progress.bestQuiz < 0 ||
      s.progress.bestQuiz > 840 ||
      !Number.isFinite(s.progress.bestOrdering) ||
      s.progress.bestOrdering < 0 ||
      s.progress.bestOrdering > 600
    )
      throw Error();
    base.progress = {
      ...s.progress,
      seenEventIds: [
        ...new Set(
          s.progress.seenEventIds.filter((id) =>
            data.events.some((e) => e.id === id),
          ),
        ),
      ],
      correctQuestionIds: [
        ...new Set(
          s.progress.correctQuestionIds.filter((id) =>
            data.questions.some((q) => q.id === id),
          ),
        ),
      ],
    };
    if (s.quiz) {
      if (validateQuiz(s.quiz, data))
        base.quiz = expireQuestion(s.quiz, data, now);
      else
        base.notice =
          "Phiên quiz không tương thích hoặc bị hỏng; tiến độ hợp lệ vẫn được giữ.";
    }
    if (s.ordering) {
      if (validateOrdering(s.ordering, data)) base.ordering = s.ordering;
      else base.notice += " Lượt xếp mốc không hợp lệ đã được bỏ.";
    }
    if (s.ui && [0, 1, 2, 3].includes(s.ui.chapter))
      base.ui.chapter = s.ui.chapter;
    if (data.events.some((e) => e.id === s.ui?.selected))
      base.ui.selected = s.ui.selected;
    if (Number.isInteger(s.ui?.period) && s.ui.period >= 0 && s.ui.period < 5)
      base.ui.period = s.ui.period;
    return base;
  } catch {
    return {
      ...base,
      notice:
        "Dữ liệu lưu bị hỏng hoặc không tương thích. Đã mở bàn nhiệm vụ an toàn, không tự tạo kết quả.",
    };
  }
}
export function recordQuiz(state: AppState, quiz: QuizSession): AppState {
  return {
    ...state,
    quiz,
    progress: {
      ...state.progress,
      correctQuestionIds: [
        ...new Set([
          ...state.progress.correctQuestionIds,
          ...quiz.answers.filter((a) => a.correct).map((a) => a.questionId),
        ]),
      ],
      bestQuiz:
        quiz.phase === "finished"
          ? Math.max(state.progress.bestQuiz, quiz.score)
          : state.progress.bestQuiz,
    },
  };
}
