import { test, expect } from "@playwright/test";
import data from "../../src/data/content.json" with { type: "json" };
const key = "dau-moc-vnr-v3";
const snapshot = async (page: import("@playwright/test").Page) =>
  page.evaluate((k) => JSON.parse(localStorage.getItem(k)!), key);
test("six-question real UI, stable shuffle/reload, 840, independent best and confirmation", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("./");
  await page.getByRole("button", { name: "Bắt đầu quiz" }).click();
  for (let i = 0; i < 6; i++) {
    const saved = await snapshot(page);
    const q = data.questions.find((q) => q.id === saved.quiz.questionIds[i])!;
    expect(q.chapter).toBe(1);
    await page.locator(`[data-option-id="${q.correctOptionId}"]`).click();
    if (i === 0) {
      const before = await snapshot(page);
      await page.reload();
      await expect(
        page.locator(`[data-option-id="${q.correctOptionId}"]`),
      ).toHaveAttribute("aria-pressed", "true");
      expect((await snapshot(page)).quiz).toEqual(before.quiz);
    }
    await page.getByRole("button", { name: "Chốt đáp án" }).click();
    await expect(
      page.getByRole("heading", { name: /✓ Chính xác/ }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Tiếp tục" }).click();
  }
  await expect(page.getByRole("heading", { name: "840 điểm" })).toBeVisible();
  expect((await snapshot(page)).progress.bestOrdering).toBe(0);
  await page.getByRole("button", { name: "Lượt mới", exact: true }).click();
  await page.getByRole("button", { name: "Lượt mới", exact: true }).click();
  await expect(page.getByRole("alertdialog")).toBeVisible();
  const id = (await snapshot(page)).quiz.sessionId;
  await page.getByRole("button", { name: "Hủy" }).click();
  expect((await snapshot(page)).quiz.sessionId).toBe(id);
  expect(errors).toEqual([]);
});
test("absolute deadline while away, timeout once across reload, wrong answers and early finish", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2026-11-03T12:00:00Z") });
  await page.goto("./#quiz");
  await page.getByRole("button", { name: "Bắt đầu lượt", exact: true }).click();
  await page.getByRole("link", { name: "Bàn nhiệm vụ", exact: true }).click();
  await page.clock.fastForward(31000);
  await page.reload();
  await page.getByRole("link", { name: "Quiz", exact: true }).click();
  await expect(page.getByRole("heading", { name: /Hết giờ/ })).toBeVisible();
  const after = (await snapshot(page)).quiz;
  await page.reload();
  expect((await snapshot(page)).quiz.answers).toHaveLength(1);
  expect((await snapshot(page)).quiz.lives).toBe(2);
  for (let i = 0; i < 2; i++) {
    await page.getByRole("button", { name: "Tiếp tục" }).click();
    const s = (await snapshot(page)).quiz,
      q = data.questions.find((q) => q.id === s.questionIds[s.index])!;
    const wrong = q.options.find((o) => o.id !== q.correctOptionId)!;
    await page.locator(`[data-option-id="${wrong.id}"]`).click();
    await page.getByRole("button", { name: "Chốt đáp án" }).click();
    await expect(
      page.getByRole("heading", { name: /Chưa đúng/ }),
    ).toBeVisible();
  }
  await page.getByRole("button", { name: "Tiếp tục" }).click();
  await expect(
    page.getByRole("heading", { name: "Câu cần ôn lại" }),
  ).toBeVisible();
  expect((await snapshot(page)).quiz.answers).toHaveLength(3);
  expect(after.score).toBe(0);
});
test("ordering entirely by keyboard/select-slot locks grading and retains set", async ({
  page,
}) => {
  await page.goto("./#board");
  await page.locator(".chapter-dock>button").nth(1).click();
  await page.getByRole("link", { name: "Xếp mốc", exact: true }).click();
  await page.getByRole("button", { name: "Tạo lượt xếp mốc" }).click();
  const s = (await snapshot(page)).ordering;
  const sorted = s.eventIds
    .map((id: string) => data.events.find((e) => e.id === id)!)
    .sort((a: { year: number }, b: { year: number }) => a.year - b.year);
  for (const [i, e] of sorted.entries()) {
    await page.locator(`[data-event-id="${e.id}"]`).focus();
    await page.keyboard.press("Enter");
    await page
      .getByRole("button", { name: "Vị trí " + (i + 1), exact: true })
      .focus();
    await page.keyboard.press("Enter");
    await expect(page.locator(`[data-event-id="${e.id}"]`)).toBeFocused();
  }
  await page.getByRole("button", { name: "Kiểm tra", exact: true }).click();
  await expect(page.getByRole("heading", { name: /600\/600/ })).toBeVisible();
  await page.reload();
  expect((await snapshot(page)).ordering.eventIds).toEqual(s.eventIds);
  expect((await snapshot(page)).progress.bestQuiz).toBe(0);
  expect((await snapshot(page)).progress.bestOrdering).toBe(600);
  await expect(page.locator(".order-tray button").first()).toBeDisabled();
  await page.getByRole("link", { name: "Xem kết quả xếp mốc" }).click();
  await expect(page.getByRole("heading", { name: "600 điểm" })).toBeVisible();
});
test("mobile play, direct routes, search without accents and honest image fallback", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("./");
  await page.getByRole("button", { name: "Bắt đầu quiz" }).click();
  await page.locator(".options button").first().click();
  await page.getByRole("button", { name: "Chốt đáp án" }).click();
  await expect(page.locator(".feedback")).toBeVisible();
  await page.goto("./#profile/giai-phong");
  await expect(page.getByText("Tư liệu ảnh chưa được tích hợp")).toBeVisible();
  expect((await snapshot(page)).progress.seenEventIds).toContain("giai-phong");
  await page.getByRole("link", { name: "Hồ sơ tư liệu", exact: true }).click();
  await page.getByLabel("Tìm kiếm", { exact: true }).fill("Doi moi");
  await expect(
    page.getByRole("link", { name: "Đại hội VI: khởi xướng Đổi mới" }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
  ).toBe(false);
});
test("visual routes desktop/projector/mobile/360, all five shared time bands and asset health", async ({
  page,
}) => {
  const errors: string[] = [],
    assets: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.status() === 404) assets.push(r.url());
  });
  await page.goto("./#lanes");
  await page
    .getByRole("button", { name: "Ba làn tư liệu", exact: true })
    .click();
  for (const period of [
    { label: "1954–1960", start: 1954, end: 1961 },
    { label: "1961–1965", start: 1961, end: 1965 },
    { label: "1965–1968", start: 1965, end: 1969 },
    { label: "1969–1973", start: 1969, end: 1973 },
    { label: "1973–1975", start: 1973, end: 1976 },
  ]) {
    await page.getByRole("button", { name: period.label, exact: true }).click();
    const expected = data.events
      .filter((e) => e.year >= period.start && e.year < period.end)
      .map((e) => e.title)
      .sort();
    expect(
      (await page.locator(".three-lanes article h3").allTextContents()).sort(),
    ).toEqual(expected);
  }
  for (const [name, width, height] of [
    ["desktop", 1440, 900],
    ["projector", 1280, 720],
    ["mobile", 390, 844],
    ["small", 360, 780],
  ] as const) {
    await page.setViewportSize({ width, height });
    await page.goto("./#board");
    await page.locator(".desk").waitFor();
    await page.screenshot({
      path: `screenshots/${name}-board.png`,
      fullPage: true,
    });
    await page.goto("./#quiz");
    if (
      await page
        .getByRole("button", { name: "Bắt đầu lượt", exact: true })
        .count()
    )
      await page
        .getByRole("button", { name: "Bắt đầu lượt", exact: true })
        .click();
    await page.locator(".options button").first().click();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
    ).toBe(false);
    if (name === "projector") {
      const box = await page
        .getByRole("button", { name: "Chốt đáp án" })
        .boundingBox();
      expect(box!.y + box!.height).toBeLessThanOrEqual(height);
    }
    await page.screenshot({
      path: `screenshots/${name}-quiz.png`,
      fullPage: true,
    });
    await page.goto("./#order");
    if (await page.getByRole("button", { name: "Tạo lượt xếp mốc" }).count())
      await page.getByRole("button", { name: "Tạo lượt xếp mốc" }).click();
    await page.screenshot({
      path: `screenshots/${name}-order.png`,
      fullPage: true,
    });
    await page.goto("./#lanes");
    await page
      .getByRole("button", { name: "Ba làn tư liệu", exact: true })
      .click();
    await page.getByRole("button", { name: "1973–1975", exact: true }).click();
    await expect(page.locator(".three-lanes>section")).toHaveCount(3);
    await expect(
      page
        .locator(".three-lanes>section")
        .nth(1)
        .getByRole("heading", { name: "Hiệp định Paris" }),
    ).toBeVisible();
    await page.screenshot({
      path: `screenshots/${name}-lanes.png`,
      fullPage: true,
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
    ).toBe(false);
  }
  expect(errors).toEqual([]);
  expect(assets).toEqual([]);
});

test("all 43 profiles expose specific source passages and all five historical images load on desktop and mobile", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const event of data.events) {
    await page.goto(`./#profile/${event.id}`);
    const primary = data.sources.find((s) => s.id === event.sourceId)!;
    await expect(
      page.locator(".source-note").first().getByRole("link").first(),
    ).toHaveAttribute("href", primary.url!);
    await expect(page.locator(".source-note").first()).toContainText(
      primary.supports!,
    );
    await expect(
      page.getByText("Tham chiếu cấp chương; chưa xác minh trang."),
    ).toHaveCount(0);
  }
  for (const width of [1440, 360]) {
    await page.setViewportSize({ width, height: 900 });
    for (const event of data.events.filter((e) =>
      ["tours", "doc-lap", "dien-bien", "duong-kach-menh", "paris"].includes(
        e.id,
      ),
    )) {
      await page.goto(`./#profile/${event.id}`);
      const img = page.locator(".image-evidence img");
      await img.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          img.evaluate(
            (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
          ),
        )
        .toBe(true);
      await expect(page.locator(".image-license")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
      ).toBe(false);
      if (["tours", "duong-kach-menh"].includes(event.id))
        await page.screenshot({
          path: `screenshots/${width}-profile-${event.id}.png`,
          fullPage: true,
        });
    }
  }
  expect(errors).toEqual([]);
});

test("image catalogue has complete credits and unanswered date quiz does not expose source or photo", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto("./#materials");
  await expect(page.locator(".media-catalog .image-evidence img")).toHaveCount(
    8,
  );
  await expect(page.locator(".media-catalog .image-license")).toHaveCount(8);
  await expect(page.locator(".media-catalog .image-placeholder")).toHaveCount(
    1,
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
  ).toBe(false);
  await page.goto("./#quiz");
  await page.getByRole("button", { name: "Bắt đầu lượt", exact: true }).click();
  await expect(page.locator(".source-note, .image-evidence")).toHaveCount(0);
  await page.locator(".options button").first().click();
  await page.getByRole("button", { name: "Chốt đáp án" }).click();
  await expect(page.locator(".source-note").first()).toBeVisible();
});

test("overview is the first screen, source credits expand, chapter actions and back navigation work", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const [name, width, height] of [
    ["desktop", 1440, 900],
    ["projector", 1280, 720],
    ["mobile", 390, 844],
    ["small", 360, 780],
  ] as const) {
    await page.setViewportSize({ width, height });
    await page.goto("./");
    await expect(
      page.getByRole("heading", { level: 1, name: /Học Lịch sử Đảng/ }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Tổng quan", exact: true }),
    ).toHaveAttribute("aria-current", "page");
    await expect(page.locator(".journey-gallery article")).toHaveCount(3);
    for (const img of await page.locator(".journey-gallery img").all()) {
      await expect
        .poll(() =>
          img.evaluate(
            (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
          ),
        )
        .toBe(true);
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
    ).toBe(false);
    await page.screenshot({
      path: `screenshots/${name}-overview.png`,
      fullPage: true,
    });
  }
  const credit = page.locator(".journey-gallery details").last();
  await credit.locator("summary").click();
  await expect(credit).toContainText("David Stanley");
  await expect(credit.getByRole("link", { name: /CC BY 2.0/ })).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
  ).toBe(false);
  await page
    .getByRole("button", { name: /Xây dựng. Đổi mới. Hội nhập/ })
    .click();
  await expect(page.locator(".desk")).toBeVisible();
  expect((await snapshot(page)).ui.chapter).toBe(3);
  expect((await snapshot(page)).progress.seenEventIds).toHaveLength(0);
  await page.getByRole("link", { name: "Tổng quan", exact: true }).click();
  await expect(page.locator(".overview-view")).toBeVisible();
  expect((await snapshot(page)).ui.chapter).toBe(3);
  expect(errors).toEqual([]);
});

test("two-region gallery shows three loaded representative images with honest memorial dates", async ({
  page,
}) => {
  for (const [name, width, height] of [
    ["desktop", 1440, 900],
    ["projector", 1280, 720],
    ["mobile", 390, 844],
    ["small", 360, 780],
  ] as const) {
    await page.setViewportSize({ width, height });
    await page.goto("./#lanes");
    await page
      .getByRole("button", { name: "Ba làn tư liệu", exact: true })
      .click();
    await page.getByRole("button", { name: "1954–1960", exact: true }).click();
    await expect(page.locator(".three-lanes .archive-image")).toHaveCount(3);
    await expect(page.locator(".three-lanes")).toContainText(
      "ảnh hiện vật 2008",
    );
    for (const img of await page.locator(".three-lanes img").all()) {
      await img.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          img.evaluate(
            (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
          ),
        )
        .toBe(true);
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
    ).toBe(false);
    await page.screenshot({
      path: `screenshots/${name}-lanes-gallery.png`,
      fullPage: true,
    });
  }
  await page.getByRole("button", { name: "1969–1973", exact: true }).click();
  await expect(
    page.locator(".three-lanes > section").nth(1).locator("img"),
  ).toHaveAttribute("src", /paris-photo.jpg/);
  await page.getByRole("button", { name: "1954–1960", exact: true }).click();
  await expect(
    page.locator(".three-lanes > section").nth(1).locator("img"),
  ).toHaveAttribute("src", /geneva-photo.jpg/);
});

test("beginner guide leads to a first profile and video sources remain usable if the embedded publisher fails", async ({
  page,
}) => {
  await page.route("https://www.youtube-nocookie.com/embed/**", (route) =>
    route.fulfill({
      status: 503,
      contentType: "text/html",
      body: "Publisher temporarily unavailable",
    }),
  );
  for (const width of [1440, 360]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("./");
    await expect(
      page.getByText(/Dấu Mốc là trang học và ôn tập học phần/),
    ).toBeVisible();
    await expect(page.locator(".first-steps > li")).toHaveCount(3);
    await expect(page.locator(".activity-guide dt")).toHaveCount(5);
    await expect(page.locator(".video-library .video-card")).toHaveCount(3);
    await expect(page.locator("iframe")).toHaveCount(0);
    expect((await snapshot(page)).quiz).toBeNull();
    await page
      .getByRole("button", {
        name: "Mở video: Đảng ra đời – Bước ngoặt lớn trong lịch sử dân tộc",
      })
      .click();
    await expect(page.locator("iframe")).toHaveAttribute(
      "src",
      "https://www.youtube-nocookie.com/embed/ZI4UOQD8c6g?rel=0&playsinline=1",
    );
    await expect(
      page
        .locator(".video-card")
        .first()
        .getByRole("link", { name: "Mở trên YouTube" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Xem trực tiếp trên YouTube" }),
    ).toBeVisible();
    const playerBox = await page.locator("iframe").boundingBox();
    expect(playerBox!.width).toBeGreaterThanOrEqual(200);
    expect(playerBox!.height).toBeGreaterThanOrEqual(200);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
    ).toBe(false);
    await page.getByRole("button", { name: "Đóng video" }).click();
    await expect(page.locator("iframe")).toHaveCount(0);
  }
  await page
    .getByRole("link", { name: "Đọc hồ sơ đầu tiên", exact: true })
    .click();
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Đảng ra đời, Cương lĩnh đầu tiên",
    }),
  ).toBeVisible();
  await expect(page.locator(".video-card")).toHaveCount(1);
  expect((await snapshot(page)).quiz).toBeNull();
  expect((await snapshot(page)).progress.correctQuestionIds).toHaveLength(0);
});

test("map filters dates and regions, keyboard markers show sources, and navigation preserves the period", async ({
  page,
}) => {
  await page.goto("./#lanes");
  await expect(page.locator(".vietnam-map")).toBeVisible();
  await expect(page.locator(".map-event-list li")).toHaveCount(26);
  const marker = page.locator('[data-place-id="ha-noi"]');
  await marker.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".map-event-list li")).toHaveCount(2);
  await page.locator('[data-history-event="dien-bien-tren-khong"]').click();
  await expect(page.locator(".map-event-detail h3")).toHaveText(
    "Bảo vệ bầu trời miền Bắc",
  );
  await page.getByText("Đối chiếu nguồn sự kiện", { exact: true }).click();
  await expect(
    page.locator(".map-event-detail a[href*='#page=108']"),
  ).toBeVisible();
  expect((await snapshot(page)).progress.correctQuestionIds).toHaveLength(0);
  for (const [label, count] of [
    ["1954–1960", 5],
    ["1961–1965", 5],
    ["1965–1968", 5],
    ["1969–1973", 5],
    ["1973–1975", 6],
  ] as const) {
    await page.getByRole("button", { name: label, exact: true }).click();
    await expect(page.locator(".map-event-list li")).toHaveCount(count);
  }
  await page.getByRole("button", { name: "1961–1965", exact: true }).click();
  await page
    .getByRole("group", { name: "Lọc nhóm sự kiện" })
    .getByRole("button", { name: /Miền Bắc/ })
    .click();
  await expect(page.locator(".map-event-list li")).toHaveCount(1);
  await expect(page.locator(".map-event-detail")).toContainText(
    "Phạm vi miền Bắc",
  );
  await page
    .getByRole("group", { name: "Lọc nhóm sự kiện" })
    .getByRole("button", { name: /Tất cả/ })
    .click();
  await page.locator('[data-history-event="ap-bac"]').click();
  await page
    .getByRole("link", { name: "Mở hồ sơ đầy đủ", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { level: 1, name: "Chiến thắng Ấp Bắc" }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Bản đồ & dòng thời gian", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "1961–1965", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.reload();
  await expect(page.locator(".map-event-list li")).toHaveCount(5);
});

test("map is readable at four widths and decorative arrows are absent from cards and links", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const [name, width, height] of [
    ["desktop", 1440, 900],
    ["projector", 1280, 720],
    ["mobile", 390, 844],
    ["small", 360, 780],
  ] as const) {
    await page.setViewportSize({ width, height });
    await page.goto("./#lanes");
    await page
      .getByRole("button", { name: "Toàn giai đoạn", exact: true })
      .click();
    await expect(page.locator(".map-event-list li")).toHaveCount(26);
    await expect(page.locator('[data-place-id="mo-cay"]')).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
    ).toBe(false);
    await page.screenshot({
      path: `screenshots/${name}-history-map.png`,
      fullPage: true,
    });
    await page.goto("./#overview");
    expect(
      await page
        .locator(
          ".journey-link, .overview-summary a, .activity-guide a, .video-links a",
        )
        .allTextContents(),
    ).not.toEqual(expect.arrayContaining([expect.stringMatching(/[↗→↓]/)]));
    await expect(
      page.locator('.journey-link [aria-hidden="true"]'),
    ).toHaveCount(0);
  }
  expect(errors).toEqual([]);
});
