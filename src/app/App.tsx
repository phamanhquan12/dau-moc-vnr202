import { useEffect, useRef, useState } from "react";
import type { AppState, Chapter, EventRecord } from "../domain/types";
import {
  content,
  chapters,
  filterEvents,
  lane,
  periods,
} from "../domain/content";
import {
  advanceQuestion,
  createQuizSession,
  expireQuestion,
  selectOption,
  submitAnswer,
} from "../domain/quiz";
import {
  createOrderingRound,
  gradeOrdering,
  placeCard,
  standardOrder,
  undo,
} from "../domain/ordering";
import {
  initialState,
  recordQuiz,
  restoreSession,
  STORAGE_KEY,
} from "../storage/state";
import { ImageEvidence, EventSources } from "../components/Evidence";
import { Overview } from "../components/Overview";
import { ArchiveImage } from "../components/ArchiveImage";
export const parseRoute = (hash: string) => {
  const [view, id] = hash.replace(/^#\/?/, "").split("/");
  return {
    view: [
      "overview",
      "board",
      "quiz",
      "order",
      "lanes",
      "profile",
      "materials",
      "results",
    ].includes(view)
      ? view
      : "overview",
    id: id || "",
  };
};
export function App() {
  const [state, setState] = useState<AppState>(() => {
    try {
      return restoreSession(localStorage.getItem(STORAGE_KEY), content);
    } catch {
      return {
        ...initialState(content),
        notice: "Không thể đọc bộ nhớ. Vẫn có thể chơi trong phiên này.",
      };
    }
  });
  const [route, setRoute] = useState(() => parseRoute(location.hash));
  const [clock, setClock] = useState(Date.now());
  const [storageError, setStorageError] = useState(false);
  const [confirm, setConfirm] = useState<null | "quiz" | "order" | "reset">(
    null,
  );
  const [card, setCard] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("");
  const [searchChapter, setSearchChapter] = useState<Chapter>(0);
  const [orderMessage, setOrderMessage] = useState("");
  const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const navigate = (view: string) => {
    location.hash = view;
  };
  useEffect(() => {
    const onHash = () => {
      setRoute(parseRoute(location.hash));
      window.scrollTo(0, 0);
      requestAnimationFrame(() => {
        const h = document.querySelector("h1") as HTMLElement | null;
        if (h) {
          h.tabIndex = -1;
          h.focus({ preventScroll: true });
        }
      });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [state]);
  useEffect(() => {
    const tick = setInterval(() => {
      const now = Date.now();
      setClock(now);
      setState((s) => {
        if (s.quiz?.phase === "question" && now >= s.quiz.deadline)
          return recordQuiz(s, expireQuestion(s.quiz, content, now));
        return s;
      });
    }, 200);
    return () => clearInterval(tick);
  }, []);
  useEffect(() => {
    if (route.view !== "profile") return;
    const e = content.events.find((e) => e.id === route.id);
    if (e)
      setState((s) => ({
        ...s,
        ui: { ...s.ui, selected: e.id, chapter: e.chapter as Chapter },
        progress: {
          ...s.progress,
          seenEventIds: [...new Set([...s.progress.seenEventIds, e.id])],
        },
      }));
  }, [route.view, route.id]);
  useEffect(() => {
    if (route.view === "quiz" && state.quiz?.phase === "question")
      requestAnimationFrame(() => {
        const heading = document.querySelector(
          ".question-block h1",
        ) as HTMLElement | null;
        if (heading) {
          heading.tabIndex = -1;
          heading.focus({ preventScroll: true });
        }
      });
  }, [route.view, state.quiz?.index, state.quiz?.phase]);
  const chooseChapter = (chapter: Chapter) =>
    setState((s) => ({
      ...s,
      ui: {
        ...s.ui,
        chapter,
        selected: content.events.find((e) => !chapter || e.chapter === chapter)!
          .id,
      },
    }));
  const startQuiz = () => {
    setState((s) => ({ ...s, quiz: createQuizSession(content, s.ui.chapter) }));
    setConfirm(null);
    navigate("quiz");
  };
  const startOrder = () => {
    setState((s) => ({
      ...s,
      ordering: createOrderingRound(content, s.ui.chapter),
    }));
    setCard(null);
    setOrderMessage("");
    setConfirm(null);
    navigate("order");
  };
  const requestQuiz = () =>
    state.quiz && state.quiz.phase !== "finished"
      ? setConfirm("quiz")
      : startQuiz();
  const requestOrder = () =>
    state.ordering?.phase === "arranging" ? setConfirm("order") : startOrder();
  const activeQuestions =
    state.quiz?.questionIds.map(
      (id) => content.questions.find((q) => q.id === id)!,
    ) || [];
  const eventStatus = (e: EventRecord) =>
    state.quiz?.phase !== "finished" &&
    activeQuestions.some((q) => q.eventId === e.id)
      ? "Trong lượt"
      : state.progress.seenEventIds.includes(e.id)
        ? "Đã xem"
        : "Chưa xem";
  const filtered = content.events.filter(
      (e) => !state.ui.chapter || e.chapter === state.ui.chapter,
    ),
    selected = filtered.find((e) => e.id === state.ui.selected) || filtered[0],
    offset = Math.floor(filtered.indexOf(selected) / 6) * 6;
  const selectNode = (id: string) => {
    setState((s) => ({ ...s, ui: { ...s.ui, selected: id } }));
    if (matchMedia("(max-width:800px)").matches)
      requestAnimationFrame(() =>
        document
          .querySelector(".mission-panel")
          ?.scrollIntoView({ block: "start" }),
      );
  };
  const board = (
    <div className="desk">
      <aside className="chapter-dock">
        <p className="eyebrow">CHỌN CHƯƠNG</p>
        {chapters.map((c) => (
          <button
            key={c.id}
            aria-pressed={state.ui.chapter === c.id}
            onClick={() => chooseChapter(c.id)}
          >
            <span>0{c.id}</span>
            <div>
              {c.title}
              <small>{c.range}</small>
            </div>
          </button>
        ))}
        <button
          aria-pressed={state.ui.chapter === 0}
          onClick={() => chooseChapter(0)}
        >
          Toàn bộ ba chương
        </button>
        <div className="dock-note">
          26 hồ sơ / 52 câu hỏi
          <br />
          Tham chiếu đoạn nguồn cụ thể.
        </div>
      </aside>
      <section className="board">
        <div className="view-heading">
          <div>
            <p className="eyebrow">BÀN KẾT NỐI LỊCH SỬ</p>
            <h1>
              Nối sự kiện.
              <br />
              Hiểu một thời kỳ.
            </h1>
          </div>
          <span className="range">
            {chapters.find((c) => c.id === state.ui.chapter)?.range ||
              "1920–2018"}
          </span>
        </div>
        <p className="board-instruction">
          Đường nối thể hiện tiến trình học, không tự khẳng định quan hệ nhân
          quả.
        </p>
        <div className="actions board-start">
          <button className="primary" onClick={requestQuiz}>
            Bắt đầu quiz →
          </button>
          <button onClick={requestOrder}>Xếp mốc →</button>
        </div>
        <div className="board-pages">
          <button
            disabled={offset === 0}
            onClick={() => selectNode(filtered[Math.max(0, offset - 6)].id)}
          >
            ← Dải trước
          </button>
          <span>
            Mốc {offset + 1}–{Math.min(offset + 6, filtered.length)} /{" "}
            {filtered.length}
          </span>
          <button
            disabled={offset + 6 >= filtered.length}
            onClick={() => selectNode(filtered[offset + 6].id)}
          >
            Dải tiếp →
          </button>
        </div>
        <ol className="timeline">
          {filtered.slice(offset, offset + 6).map((e) => (
            <li key={e.id}>
              <button
                className={`event-node ${selected.id === e.id ? "selected" : ""}`}
                aria-pressed={selected.id === e.id}
                onClick={() => selectNode(e.id)}
              >
                <span className="node-dot" />
                <time>{e.displayDate}</time>
                <h2>{e.title}</h2>
                <small>{eventStatus(e)}</small>
              </button>
            </li>
          ))}
        </ol>
        <div className="board-bottom">
          <button
            disabled={filtered.indexOf(selected) === 0}
            onClick={() =>
              selectNode(filtered[filtered.indexOf(selected) - 1].id)
            }
          >
            ← Mốc trước
          </button>
          <span>{selected.displayDate}</span>
          <button
            disabled={filtered.indexOf(selected) === filtered.length - 1}
            onClick={() =>
              selectNode(filtered[filtered.indexOf(selected) + 1].id)
            }
          >
            Mốc sau →
          </button>
        </div>
      </section>
      <aside className="mission-panel">
        <p className="eyebrow">NHIỆM VỤ ĐANG CHỌN</p>
        <span className="status">{eventStatus(selected)}</span>
        <h2>{selected.title}</h2>
        <p>{selected.context}</p>
        <div className="mission-objective">
          <small>MỤC TIÊU</small>
          <p>Phân biệt bối cảnh, chủ trương và kết quả của sự kiện.</p>
        </div>
        <button
          className="primary"
          onClick={() => navigate("profile/" + selected.id)}
        >
          Bắt đầu · Mở hồ sơ →
        </button>
        <p className="fine">
          Xem hồ sơ không cộng điểm hoặc đánh dấu đã nắm kiến thức.
        </p>
      </aside>
    </div>
  );
  function quizView() {
    const s = state.quiz;
    if (!s)
      return (
        <section className="start-view">
          <p className="eyebrow">
            QUIZ / {state.ui.chapter ? "CHƯƠNG " + state.ui.chapter : "TOÀN BỘ"}
          </p>
          <h1>
            {Math.min(
              6,
              content.questions.filter(
                (q) => !state.ui.chapter || q.chapter === state.ui.chapter,
              ).length,
            )}{" "}
            câu.
            <br />
            Ba mạng.
          </h1>
          <p>
            Hai câu nhận biết trước, bốn câu thông hiểu sau. 30 giây/câu. Chuyển
            màn không dừng đồng hồ.
          </p>
          <button className="primary" onClick={requestQuiz}>
            Bắt đầu lượt
          </button>
        </section>
      );
    if (s.phase === "finished")
      return (
        <section className="start-view">
          <h1>Lượt đã kết thúc</h1>
          <a className="primary" href="#results/quiz">
            Xem kết quả quiz →
          </a>
          <button onClick={requestQuiz}>Lượt mới</button>
        </section>
      );
    const q = content.questions.find((q) => q.id === s.questionIds[s.index])!,
      last = s.answers.at(-1),
      feedback = s.phase === "feedback";
    return (
      <section className="quiz-view">
        <div className="quiz-hud">
          <span>
            CÂU{" "}
            <b>
              {s.index + 1}/{s.questionIds.length}
            </b>
          </span>
          <span>
            MẠNG <b>{s.lives}/3</b>
          </span>
          <span>
            ĐIỂM <b>{s.score}</b>
          </span>
          <span>
            CHUỖI <b>{s.streak}</b>
          </span>
          <span>
            THỜI GIAN{" "}
            <b data-testid="timer">
              {feedback
                ? "—"
                : Math.max(0, Math.ceil((s.deadline - clock) / 1000)) + "s"}
            </b>
          </span>
        </div>
        <div className="question-block">
          {s.notice && <p className="notice">{s.notice}</p>}
          <p className="eyebrow">
            CHƯƠNG {q.chapter} ·{" "}
            {q.difficulty === 1 ? "NHẬN BIẾT" : "THÔNG HIỂU"}
          </p>
          <h1>{q.prompt}</h1>
          <div className="options">
            {s.optionOrderByQuestion[q.id].map((id, i) => {
              const o = q.options.find((o) => o.id === id)!;
              return (
                <button
                  key={id}
                  data-option-id={id}
                  disabled={feedback}
                  aria-pressed={s.selectedOptionId === id}
                  onClick={() =>
                    setState((prev) =>
                      prev.quiz
                        ? recordQuiz(
                            prev,
                            selectOption(prev.quiz, q.id, id, content),
                          )
                        : prev,
                    )
                  }
                >
                  <span>{"ABCD"[i]}</span>
                  <div>{o.text}</div>
                  {feedback && id === q.correctOptionId && (
                    <strong>✓ Đúng</strong>
                  )}
                </button>
              );
            })}
          </div>
          {feedback ? (
            <>
              <section
                className={`feedback ${last?.correct ? "correct" : "incorrect"}`}
                role="status"
              >
                <h2>
                  {last?.timeout
                    ? "⌛ Hết giờ"
                    : last?.correct
                      ? "✓ Chính xác"
                      : "✕ Chưa đúng"}{" "}
                  · {last?.gain} điểm
                </h2>
                <p>
                  <strong>Đáp án đúng: </strong>
                  {q.options.find((o) => o.id === q.correctOptionId)!.text}
                </p>
                <p>{q.explanation}</p>
                <EventSources eventId={q.eventId} />
              </section>
              <button
                className="primary"
                onClick={() => {
                  setState((prev) => {
                    if (
                      !prev.quiz ||
                      prev.quiz.phase !== "feedback" ||
                      prev.quiz.questionIds[prev.quiz.index] !== q.id
                    )
                      return prev;
                    return recordQuiz(prev, advanceQuestion(prev.quiz));
                  });
                  if (s.lives === 0 || s.index === s.questionIds.length - 1)
                    navigate("results/quiz");
                }}
              >
                Tiếp tục →
              </button>
            </>
          ) : (
            <>
              <button
                className="primary"
                disabled={!s.selectedOptionId}
                onClick={() =>
                  setState((prev) =>
                    prev.quiz
                      ? recordQuiz(
                          prev,
                          submitAnswer(
                            prev.quiz,
                            q.id,
                            prev.quiz.selectedOptionId,
                            content,
                          ),
                        )
                      : prev,
                  )
                }
              >
                Chốt đáp án
              </button>
              <p className="fine">
                Chọn chưa phải chốt. Hết giờ được ghi nhận một lần.
              </p>
            </>
          )}
          <button className="new-round" onClick={requestQuiz}>
            Lượt mới
          </button>
        </div>
      </section>
    );
  }
  function orderView() {
    const s = state.ordering;
    if (!s)
      return (
        <section className="start-view">
          <h1>
            Xếp{" "}
            {Math.min(
              6,
              new Set(
                content.events
                  .filter(
                    (e) => !state.ui.chapter || e.chapter === state.ui.chapter,
                  )
                  .map((e) => e.year),
              ).size,
            )}{" "}
            mốc
          </h1>
          <p>
            Chọn các sự kiện khác năm trong chương đang lọc. Mỗi vị trí đúng
            +100; điểm riêng với quiz.
          </p>
          <button className="primary" onClick={requestOrder}>
            Tạo lượt xếp mốc
          </button>
        </section>
      );
    const locked = s.phase === "graded",
      sorted = standardOrder(s, content);
    const move = (id: string, index: number) => {
      setState((prev) =>
        prev.ordering
          ? { ...prev, ordering: placeCard(prev.ordering, id, index) }
          : prev,
      );
      setCard(id);
      requestAnimationFrame(() => cardRefs.current[id]?.focus());
    };
    return (
      <section className="order-view">
        <div className="view-heading">
          <div>
            <p className="eyebrow">
              XẾP MỐC / {s.chapter ? "CHƯƠNG " + s.chapter : "TOÀN BỘ"}
            </p>
            <h1>
              Đặt hồ sơ vào
              <br />
              dòng thời gian.
            </h1>
          </div>
          <button onClick={requestOrder}>Chơi lại</button>
        </div>
        {s.notice && <p className="notice">{s.notice}</p>}
        <p>
          Chọn thẻ rồi chọn vị trí. Có thể dùng Tab/Enter hoặc nút dịch chuyển.
          Chấm sẽ khóa lượt; mỗi vị trí đúng +100.
        </p>
        <div className="order-tray">
          {s.eventIds.map((id) => {
            const e = content.events.find((e) => e.id === id)!;
            return (
              <button
                key={id}
                data-event-id={id}
                ref={(node) => {
                  cardRefs.current[id] = node;
                }}
                aria-pressed={card === id}
                disabled={locked}
                onClick={() => setCard(id)}
              >
                {e.title}
                <small>
                  {s.slots.includes(id)
                    ? "Vị trí " + (s.slots.indexOf(id) + 1)
                    : "Trong khay"}
                </small>
              </button>
            );
          })}
        </div>
        <ol className="order-slots">
          {s.slots.map((id, i) => (
            <li key={i}>
              <button
                aria-label={"Vị trí " + (i + 1)}
                disabled={!card || locked}
                onClick={() => card && move(card, i)}
              >
                <span>VỊ TRÍ {i + 1}</span>
                {id
                  ? content.events.find((e) => e.id === id)!.title
                  : "Chọn để đặt thẻ"}
              </button>
              {locked && (
                <p className="fine">
                  {id === sorted[i] ? "✓ Đúng vị trí" : "✕ Chưa đúng vị trí"}
                </p>
              )}
              {id && !locked && (
                <div className="move-buttons">
                  <button
                    disabled={i === 0}
                    onClick={() => move(id, i - 1)}
                    aria-label={"Dịch trái " + (i + 1)}
                  >
                    ←
                  </button>
                  <button
                    disabled={i === s.slots.length - 1}
                    onClick={() => move(id, i + 1)}
                    aria-label={"Dịch phải " + (i + 1)}
                  >
                    →
                  </button>
                </div>
              )}
            </li>
          ))}
        </ol>
        {locked ? (
          <section className="feedback">
            <h2>
              {s.score === s.eventIds.length * 100
                ? "✓ Đúng toàn bộ"
                : "✕ Còn vị trí chưa đúng"}{" "}
              · {s.score}/{s.eventIds.length * 100} điểm
            </h2>
            <h3>Thứ tự chuẩn & ý nghĩa</h3>
            <ol>
              {sorted.map((id) => {
                const e = content.events.find((e) => e.id === id)!;
                return (
                  <li key={id}>
                    <strong>
                      {e.displayDate} · {e.title}
                    </strong>
                    <p>{e.result}</p>
                  </li>
                );
              })}
            </ol>
            <a className="primary" href="#results/order">
              Xem kết quả xếp mốc →
            </a>
          </section>
        ) : (
          <div className="actions">
            <button
              className="primary"
              disabled={s.slots.some((id) => !id)}
              onClick={() => {
                setState((prev) => {
                  if (
                    !prev.ordering ||
                    prev.ordering.roundId !== s.roundId ||
                    prev.ordering.phase !== "arranging"
                  )
                    return prev;
                  const graded = gradeOrdering(prev.ordering, content);
                  return {
                    ...prev,
                    ordering: graded,
                    progress: {
                      ...prev.progress,
                      bestOrdering: Math.max(
                        prev.progress.bestOrdering,
                        graded.score || 0,
                      ),
                    },
                  };
                });
                setOrderMessage("Đã chấm và khóa lượt.");
              }}
            >
              Kiểm tra
            </button>
            <button
              disabled={!s.history.length}
              onClick={() =>
                setState((prev) =>
                  prev.ordering
                    ? { ...prev, ordering: undo(prev.ordering) }
                    : prev,
                )
              }
            >
              ↶ Hoàn tác
            </button>
          </div>
        )}
        <p role="status">{orderMessage}</p>
      </section>
    );
  }
  function profileView() {
    const e = content.events.find((e) => e.id === route.id);
    if (!e)
      return (
        <section className="start-view">
          <h1>Không tìm thấy hồ sơ</h1>
          <a href="#board">Về bàn</a>
        </section>
      );
    return (
      <section className="profile-view">
        <a href="#board">← Trở lại node đã chọn</a>
        <p className="eyebrow">
          {e.displayDate} / {e.place} / {e.region}
        </p>
        <h1>{e.title}</h1>
        <div className="profile-flow">
          {[
            ["Bối cảnh", e.context],
            ["Chủ trương / hành động", e.decision],
            ["Kết quả / ý nghĩa", e.result],
          ].map(([title, text], i) => (
            <section key={title}>
              <span>0{i + 1}</span>
              <h2>{title}</h2>
              <p>{text}</p>
            </section>
          ))}
        </div>
        <section className="evidence">
          <h2>Tư liệu & nguồn</h2>
          <ImageEvidence key={e.imageId || e.id} id={e.imageId} />
          <EventSources eventId={e.id} />
        </section>
        <div className="actions">
          <button className="primary" onClick={requestQuiz}>
            Bắt đầu quiz theo bộ lọc
          </button>
          <a href="#board">Về bàn nhiệm vụ</a>
        </div>
      </section>
    );
  }
  function lanesView() {
    const period = periods[state.ui.period],
      events = content.events.filter(
        (e) => e.year >= period.start && e.year < period.end,
      );
    const cards = (region: string) => events.filter((e) => lane(e) === region);
    return (
      <section className="lanes-view">
        <div className="lanes-intro">
          <div>
            <p className="eyebrow">HAI MIỀN CÙNG THỜI / 1954–1975</p>
            <h1>
              Khác nhiệm vụ.
              <br />
              <em>Chung một mục tiêu.</em>
            </h1>
          </div>
          <p>
            Đặt miền Bắc, miền Nam và mặt trận ngoại giao cạnh nhau. Chọn một
            giai đoạn để đọc các mốc cùng thời và tìm hiểu mối liên hệ giữa hậu
            phương, tiền tuyến và ngoại giao.
          </p>
        </div>
        <div className="period-selector">
          {periods.map((p, i) => (
            <button
              key={p.start}
              aria-pressed={state.ui.period === i}
              onClick={() =>
                setState((s) => ({ ...s, ui: { ...s.ui, period: i } }))
              }
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="period-banner">
          <span>GIAI ĐOẠN ĐANG KHÁM PHÁ</span>
          <strong>{period.label}</strong>
          <small>{events.length} hồ sơ trong ba làn bối cảnh</small>
        </div>
        <div className="three-lanes">
          {[
            [
              "north",
              "Miền Bắc",
              "Hậu phương & kháng chiến",
              "dien-bien",
              "Điện Biên Phủ · tư liệu 1954",
            ],
            [
              "common",
              "Chung / ngoại giao",
              "Đàm phán & cục diện chung",
              "geneva-photo",
              "Hội nghị Giơnevơ · tư liệu 1954",
            ],
            [
              "south",
              "Miền Nam",
              "Phong trào & đấu tranh giải phóng",
              "nguyen-thi-dinh",
              "Tượng Nguyễn Thị Định · ảnh hiện vật 2008",
            ],
          ].map(([region, title, subtitle, image, caption], index) => (
            <section key={region}>
              <div className="lane-heading">
                <span>0{index + 1}</span>
                <div>
                  <h2>{title}</h2>
                  <p>{subtitle}</p>
                </div>
              </div>
              <ArchiveImage
                id={
                  region === "common" && period.start >= 1969
                    ? "paris-photo"
                    : image
                }
                caption={
                  region === "common" && period.start >= 1969
                    ? "Lễ ký Hiệp định Paris · tư liệu 1973"
                    : caption
                }
              />
              {cards(region).length ? (
                cards(region).map((e) => (
                  <article key={e.id}>
                    <time>{e.displayDate}</time>
                    <h3>{e.title}</h3>
                    <p>{e.result}</p>
                    <a href={"#profile/" + e.id}>Mở hồ sơ & nguồn ↗</a>
                  </article>
                ))
              ) : (
                <p className="empty">Chưa có hồ sơ trong bộ dữ liệu</p>
              )}
            </section>
          ))}
        </div>
        <p className="lane-photo-note">
          Ảnh đầu mỗi làn giới thiệu chủ đề; ngày chụp được ghi riêng và có thể
          nằm ngoài giai đoạn đang lọc. Các mốc bên dưới thuộc đúng giai đoạn đã
          chọn.
        </p>
        <section className="evidence relation-notes">
          <h2>Kết nối có giới hạn</h2>
          {[
            [
              "Nghị quyết 15 → Đồng khởi",
              "Đường lối năm 1959 là một căn cứ của phong trào; việc tổ chức ở địa phương và quần chúng cũng quyết định cách triển khai.",
              "dong-khoi",
            ],
            [
              "Đại hội III → hai nhiệm vụ chiến lược",
              "Miền Bắc và miền Nam có nhiệm vụ, vai trò khác nhau trong mục tiêu thống nhất; không thay thế đóng góp của nhau.",
              "dai-hoi-iii",
            ],
            [
              "Tháng 12/1972 → Hiệp định Paris",
              "Chiến đấu ở miền Bắc gắn với cả quá trình đấu tranh quân sự, chính trị và ngoại giao; không phải nguyên nhân duy nhất của hiệp định.",
              "dien-bien-tren-khong",
            ],
            [
              "Paris → nhiệm vụ giải phóng miền Nam",
              "Hiệp định tạo cục diện mới; nhiệm vụ giải phóng miền Nam tiếp tục đến năm 1975.",
              "paris",
            ],
          ].map(([title, text, eventId]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
              <a href={"#profile/" + eventId}>Xem đoạn nguồn & bối cảnh ↗</a>
            </article>
          ))}
        </section>
      </section>
    );
  }
  function materialsView() {
    const events = filterEvents(content, query, searchChapter, region);
    return (
      <section className="materials-view">
        <p className="eyebrow">HỒ SƠ TƯ LIỆU</p>
        <h1>
          Tra cứu sự kiện.
          <br />
          Kiểm tra căn cứ.
        </h1>
        <p>
          26 hồ sơ trong phạm vi VNR202, từ 1920 đến 2018. Mỗi hồ sơ dẫn tới
          đoạn nguồn cụ thể trong giáo trình 2019; các văn kiện và tư liệu chính
          thức bổ sung giúp kiểm tra những mốc cần phân biệt.
        </p>
        <div className="filters">
          <label>
            Tìm kiếm
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Có hoặc không dấu: Gionevo, Doi moi…"
            />
          </label>
          <label>
            Chương
            <select
              value={searchChapter}
              onChange={(e) =>
                setSearchChapter(Number(e.target.value) as Chapter)
              }
            >
              <option value={0}>Tất cả</option>
              {chapters.map((c) => (
                <option key={c.id} value={c.id}>
                  Chương {c.id}
                </option>
              ))}
            </select>
          </label>
          <label>
            Phạm vi
            <select value={region} onChange={(e) => setRegion(e.target.value)}>
              <option value="">Tất cả</option>
              {["Miền Bắc", "Miền Nam", "Cả nước", "Quốc tế"].map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </label>
        </div>
        <p role="status">{events.length} hồ sơ phù hợp</p>
        {events.map((e) => (
          <article className="review-item" key={e.id}>
            <time>
              {e.displayDate} · {e.region}
            </time>
            <h2>
              <a href={"#profile/" + e.id}>{e.title}</a>
            </h2>
            <p>{e.context}</p>
          </article>
        ))}
        <section className="source-method">
          <h2>Cách đọc nguồn</h2>
          <p>
            Trang in là số ở chân trang giáo trình; trang PDF là vị trí trong
            tệp. Trong bản tháng 6/2019 này, trang PDF lớn hơn trang in một đơn
            vị. Các đoạn tham chiếu đã được kiểm tra; đây là ghi nhận đối chiếu
            nguồn, chưa phải xác nhận duyệt học thuật của giảng viên.
          </p>
          <p>
            Ảnh có nguồn và chú thích riêng. Ngày của hiện vật, ngày chụp và
            ngày sự kiện được phân biệt khi chúng khác nhau.
          </p>
        </section>
        <h2>Ảnh & xuất xứ</h2>
        <p>
          8 ảnh tư liệu, hiện vật và địa điểm đã tích hợp; 1 hồ sơ ảnh xe tăng
          còn chờ xác minh quyền sử dụng.
        </p>
        <div className="media-catalog">
          {content.images.map((i) => (
            <ImageEvidence key={i.id} id={i.id} />
          ))}
        </div>
      </section>
    );
  }
  function resultsView() {
    if (route.id === "order") {
      const s = state.ordering;
      if (s?.phase !== "graded")
        return (
          <section className="start-view">
            <h1>Chưa chấm lượt xếp mốc</h1>
            <a href="#order">Trở lại xếp mốc</a>
          </section>
        );
      return (
        <section className="results-view">
          <p className="eyebrow">KẾT QUẢ / XẾP MỐC</p>
          <h1>{s.score} điểm</h1>
          <p>
            Tốt nhất xếp mốc: {state.progress.bestOrdering}. Điểm quiz giữ độc
            lập: {state.progress.bestQuiz}.
          </p>
          <a href="#order">Xem thứ tự chuẩn & giải thích</a>
          <div className="actions">
            <button className="primary" onClick={requestOrder}>
              Chơi lại
            </button>
            <a href="#board">Về bàn</a>
          </div>
        </section>
      );
    }
    const s = state.quiz;
    if (s?.phase !== "finished")
      return (
        <section className="start-view">
          <h1>Chưa hoàn tất lượt quiz</h1>
          <a href="#quiz">Tiếp tục lượt</a>
        </section>
      );
    return (
      <section className="results-view">
        <p className="eyebrow">KẾT QUẢ / QUIZ</p>
        <h1>{s.score} điểm</h1>
        <p>
          Tốt nhất quiz: {state.progress.bestQuiz} ·{" "}
          {s.answers.filter((a) => a.correct).length}/{s.answers.length} câu đã
          chấm đúng.
        </p>
        <h2>
          {s.answers.some((a) => !a.correct)
            ? "Câu cần ôn lại"
            : "✓ Không có câu sai trong lượt"}
        </h2>
        {s.answers
          .filter((a) => !a.correct)
          .map((a) => {
            const q = content.questions.find((q) => q.id === a.questionId)!;
            return (
              <article className="review-item" key={a.questionId}>
                <h3>{q.prompt}</h3>
                <p>
                  {a.timeout ? "⌛ Hết giờ" : "✕ Chưa đúng"} · Đáp án:{" "}
                  {q.options.find((o) => o.id === q.correctOptionId)!.text}
                </p>
                <p>{q.explanation}</p>
                <a href={"#profile/" + q.eventId}>Ôn hồ sơ →</a>
                <EventSources eventId={q.eventId} />
              </article>
            );
          })}
        <div className="actions">
          <button className="primary" onClick={requestQuiz}>
            Lượt mới
          </button>
          <a href="#board">Về bàn nhiệm vụ</a>
        </div>
      </section>
    );
  }
  return (
    <>
      <a
        className="skip"
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("main")?.focus();
        }}
      >
        Đến nội dung
      </a>
      <header>
        <a className="brand" href="#overview">
          <span className="brand-symbol" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <path
                d="M7 4v24M16 4v24M25 4v24"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M4 10h6M13 22h6M22 14h6"
                stroke="currentColor"
                strokeWidth="5"
              />
            </svg>
          </span>
          DẤU MỐC <b>VNR202</b>
        </a>
        <div className="session-meta">
          {state.progress.seenEventIds.length}/26 đã xem ·{" "}
          {state.progress.correctQuestionIds.length}/52 câu từng trả lời đúng
        </div>
        {state.quiz && state.quiz.phase !== "finished" ? (
          <a className="resume" href="#quiz">
            Tiếp tục lượt đang dở →
          </a>
        ) : (
          <span className="session-tag">HỌC LỊCH SỬ QUA TƯ LIỆU</span>
        )}
      </header>
      <nav className="main-nav" aria-label="Màn nhiệm vụ">
        {[
          ["overview", "Tổng quan"],
          ["board", "Bàn nhiệm vụ"],
          ["quiz", "Quiz"],
          ["order", "Xếp mốc"],
          ["lanes", "Hai miền cùng thời"],
          ["materials", "Hồ sơ tư liệu"],
        ].map(([id, title]) => (
          <a
            key={id}
            href={"#" + id}
            aria-current={route.view === id ? "page" : undefined}
          >
            {title}
          </a>
        ))}
        <button className="reset-link" onClick={() => setConfirm("reset")}>
          Xóa tiến độ
        </button>
      </nav>
      {route.view !== "overview" && (
        <div className="scope-note">
          26 HỒ SƠ / 52 CÂU HỎI · 8 ẢNH TƯ LIỆU & ĐỊA ĐIỂM · Best quiz{" "}
          {state.progress.bestQuiz} / Best xếp mốc {state.progress.bestOrdering}
        </div>
      )}
      {(state.notice || storageError) && (
        <div className="recovery" role="status">
          {storageError
            ? "Không thể lưu trên thiết bị. Phiên vẫn chơi được; tải lại có thể mất tiến độ."
            : state.notice}
        </div>
      )}
      <main id="main" tabIndex={-1}>
        {route.view === "overview" ? (
          <Overview
            onChapter={(chapter) => {
              chooseChapter(chapter);
              navigate("board");
            }}
            onQuiz={requestQuiz}
            onOrder={requestOrder}
          />
        ) : route.view === "board" ? (
          board
        ) : route.view === "quiz" ? (
          quizView()
        ) : route.view === "order" ? (
          orderView()
        ) : route.view === "lanes" ? (
          lanesView()
        ) : route.view === "profile" ? (
          profileView()
        ) : route.view === "results" ? (
          resultsView()
        ) : (
          materialsView()
        )}
      </main>
      <footer>
        VNR202 · Đường nối thể hiện tiến trình học, không tự khẳng định quan hệ
        nhân quả.<a href="#materials">Nguồn & trạng thái nội dung</a>
      </footer>
      {confirm && (
        <div className="confirm-backdrop">
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            className="confirm-box"
            onKeyDown={(e) => {
              if (e.key === "Escape") setConfirm(null);
              if (e.key === "Tab") {
                const buttons = [...e.currentTarget.querySelectorAll("button")];
                const first = buttons[0],
                  last = buttons.at(-1)!;
                if (e.shiftKey && document.activeElement === first) {
                  e.preventDefault();
                  last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                  e.preventDefault();
                  first.focus();
                }
              }
            }}
          >
            <h2 id="confirm-title">
              {confirm === "reset"
                ? "Xóa tiến độ trên thiết bị?"
                : "Thay lượt đang chơi?"}
            </h2>
            <p>
              {confirm === "reset"
                ? "Chỉ dữ liệu Dấu Mốc phiên bản này bị xóa; dữ liệu ứng dụng khác giữ nguyên."
                : "Phiên hiện tại sẽ được thay bằng lượt mới theo chương đang chọn. Đồng hồ chưa dừng trong lúc xác nhận."}
            </p>
            <div className="actions">
              <button autoFocus onClick={() => setConfirm(null)}>
                Hủy
              </button>
              <button
                className="primary"
                onClick={() => {
                  if (confirm === "quiz") startQuiz();
                  else if (confirm === "order") startOrder();
                  else {
                    setState(initialState(content));
                    setConfirm(null);
                    navigate("board");
                  }
                }}
              >
                Xác nhận
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
