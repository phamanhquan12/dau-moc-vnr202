import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { beforeEach, describe, it, expect, vi } from "vitest";
import { ImageEvidence, EventSources } from "../../src/components/Evidence";
import { App } from "../../src/app/App";
import { content } from "../../src/domain/content";
import { initialState, STORAGE_KEY } from "../../src/storage/state";
import { createQuizSession, submitAnswer } from "../../src/domain/quiz";
beforeEach(() => {
  localStorage.removeItem(STORAGE_KEY);
  location.hash = "board";
});
const state = () => JSON.parse(localStorage.getItem(STORAGE_KEY)!);
describe("real React and domain integration", () => {
  it("board/profile/return preserves node without giving mastery", async () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /Bắt đầu · Mở hồ sơ/ }));
    await screen.findByRole("heading", {
      name: "Bước ngoặt ở Đại hội Tours",
      level: 1,
    });
    expect(state().progress.seenEventIds).toContain("tours");
    expect(state().progress.correctQuestionIds).toHaveLength(0);
    expect(state().progress.bestQuiz).toBe(0);
    fireEvent.click(screen.getByText("← Trở lại node đã chọn"));
    await screen.findByRole("heading", { name: /Nối sự kiện/ });
  });
  it("selection, double confirmation and feedback remount retain one answer", async () => {
    const s = initialState(content);
    s.quiz = createQuizSession(content, 1, Date.now(), () => 0.42);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    location.hash = "quiz";
    const mounted = render(<App />);
    const q = content.questions.find((q) => q.id === s.quiz!.questionIds[0])!;
    fireEvent.click(
      screen.getByText(q.options.find((o) => o.id === q.correctOptionId)!.text),
    );
    expect(state().quiz.score).toBe(0);
    const confirm = screen.getByRole("button", { name: "Chốt đáp án" });
    fireEvent.click(confirm);
    fireEvent.click(confirm);
    expect(state().quiz.answers).toHaveLength(1);
    expect(state().quiz.score).toBe(100);
    mounted.unmount();
    render(<App />);
    expect(screen.getByRole("heading", { name: /Chính xác/ })).toBeTruthy();
    expect(state().quiz.answers).toHaveLength(1);
  });
  it("expired restored question times out once, feedback reading has no new clock", () => {
    const s = initialState(content);
    s.quiz = createQuizSession(content, 1, 1000);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    location.hash = "quiz";
    const mounted = render(<App />);
    expect(screen.getByRole("heading", { name: /Hết giờ/ })).toBeTruthy();
    expect(state().quiz.lives).toBe(2);
    expect(state().quiz.answers).toHaveLength(1);
    mounted.unmount();
    render(<App />);
    expect(state().quiz.answers).toHaveLength(1);
  });
  it("timer and submit boundary cannot both grade", () => {
    vi.useFakeTimers();
    vi.setSystemTime(1000);
    const s = initialState(content);
    s.quiz = createQuizSession(content, 1, 1000);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    location.hash = "quiz";
    render(<App />);
    const q = content.questions.find((q) => q.id === s.quiz!.questionIds[0])!;
    fireEvent.click(screen.getByText(q.options[0].text));
    act(() => vi.setSystemTime(s.quiz!.deadline));
    fireEvent.click(screen.getByRole("button", { name: "Chốt đáp án" }));
    act(() => vi.advanceTimersByTime(300));
    expect(state().quiz.answers).toHaveLength(1);
    expect(state().quiz.answers[0].timeout).toBe(true);
    expect(state().quiz.lives).toBe(2);
  });
  it("search without accents, chapter/region filters and image placeholder work", async () => {
    location.hash = "materials";
    render(<App />);
    fireEvent.change(screen.getByLabelText("Tìm kiếm"), {
      target: { value: "Doi moi" },
    });
    expect(
      screen.getByRole("link", { name: "Đại hội VI: khởi xướng Đổi mới" }),
    ).toBeTruthy();
    fireEvent.change(screen.getByLabelText("Chương"), {
      target: { value: "3" },
    });
    expect(screen.getByRole("status").textContent).toContain("1 hồ sơ");
    location.hash = "profile/giai-phong";
    fireEvent(window, new HashChangeEvent("hashchange"));
    await screen.findByText("Tư liệu ảnh chưa được tích hợp");
    expect(
      screen.getByRole("link", { name: "Trang nguồn & điều kiện sử dụng ↗" }),
    ).toBeTruthy();
  });
  it("new session and reset require confirmation and do not clear unrelated keys", async () => {
    localStorage.setItem("unrelated", "keep");
    const s = initialState(content);
    s.quiz = createQuizSession(content, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    location.hash = "quiz";
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Lượt mới" }));
    expect(screen.getByRole("alertdialog")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Hủy" }));
    expect(state().quiz.sessionId).toBe(s.quiz.sessionId);
    fireEvent.click(screen.getByRole("button", { name: "Xóa tiến độ" }));
    fireEvent.click(screen.getByRole("button", { name: "Xác nhận" }));
    await waitFor(() => expect(state().quiz).toBeNull());
    expect(localStorage.getItem("unrelated")).toBe("keep");
  });
});

it("failed verified image preserves caption/source and switches to honest fallback", () => {
  const image = content.images[0],
    before = { ...image };
  image.localPath = "media/broken.jpg";
  image.licenseStatus = "verified";
  try {
    render(<ImageEvidence id={image.id} />);
    fireEvent.error(screen.getByRole("img"));
    expect(
      screen.getByText("Không tải được ảnh. Mở trang nguồn để xem."),
    ).toBeTruthy();
    expect(
      screen.getByRole("link", { name: "Trang nguồn & điều kiện sử dụng ↗" }),
    ).toBeTruthy();
  } finally {
    Object.assign(image, before);
  }
});

it("WTO evidence includes authoritative date and explains the textbook's different milestone", () => {
  render(<EventSources eventId="wto" />);
  expect(screen.getByText(/Trang in 165–166 · Trang PDF 166–167/)).toBeTruthy();
  expect(
    screen
      .getByRole("link", { name: "Đọc nguồn đối chiếu ↗" })
      .getAttribute("href"),
  ).toContain("wto.org");
  expect(screen.getByText(/ngày tư cách thành viên/i)).toBeTruthy();
  expect(screen.queryByText(/chưa xác minh trang/)).toBeNull();
});

it("unassigned photographs omit empty messaging; real artifact includes date and license", () => {
  const view = render(<ImageEvidence id={null} />);
  expect(view.container.innerHTML).toBe("");
  view.rerender(<ImageEvidence id="duong-kach-menh" />);
  expect(screen.getByRole("img").getAttribute("src")).toContain(
    "media/duong-kach-menh.jpg",
  );
  expect(screen.getByText(/ảnh chụp ngày 08\/02\/2017/)).toBeTruthy();
  expect(
    screen.getByRole("link", { name: /CC BY-SA 4.0/ }).getAttribute("href"),
  ).toBe("https://creativecommons.org/licenses/by-sa/4.0/");
});

it("opens on the historical overview and selecting a chapter enters its mission board", async () => {
  location.hash = "";
  render(<App />);
  expect(
    screen.getByRole("heading", { level: 1, name: /Lịch sử được nối/ }),
  ).toBeTruthy();
  expect(
    screen
      .getByRole("link", { name: "Tổng quan" })
      .getAttribute("aria-current"),
  ).toBe("page");
  expect(state().progress.seenEventIds).toHaveLength(0);
  fireEvent.click(
    screen.getByRole("button", { name: /Xây dựng. Đổi mới. Hội nhập/ }),
  );
  await screen.findByRole("heading", { name: /Nối sự kiện/ });
  expect(state().ui.chapter).toBe(3);
  expect(state().progress.seenEventIds).toHaveLength(0);
});
