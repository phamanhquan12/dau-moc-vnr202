# Dấu Mốc · VNR202

Vietnamese educational web game implemented from **README_AGENT_VNR202 (1).md**, retaining its original 26-event / 52-question seed IDs and adding 17 sourced event profiles for the expanded timeline. The revised handoff supersedes the earlier independently authored bank and dependency-free implementation; those renderers and engine have been removed. This is not derived from HCM202.

## Run

Node 22.12+ (Node 22 used in verification):

```sh
npm ci
npm run dev
npm run typecheck
npm run test:unit
npm run test:integration
npx playwright install --with-deps chromium
npm run test:e2e
npm run build
npm run preview
```

Dev: http://127.0.0.1:3041. Production preview: http://127.0.0.1:3042. Build emits `dist/`. `base: './'` and hash routes support GitHub Pages subpaths. Existing repository/hosting identity: https://github.com/phamanhquan12/dau-moc-vnr202, https://phamanhquan12.github.io/dau-moc-vnr202/.

`REVIEW_URL=https://.../dau-moc-vnr202/ npm run test:e2e` tests an already deployed build; include the trailing slash. No backend, accounts, runtime AI, analytics, payment or multiplayer.

## Product

The opening **Tổng quan** tab explicitly explains that Dấu Mốc is a learning and revision site for VNR202 — Lịch sử Đảng Cộng sản Việt Nam. A recommended first-profile action, three beginner steps and a five-activity guide explain where to start, what a profile is and how quiz confirmation works. The three illustrated chapters and optional videos provide historical context. A warm white, charcoal and vermilion exhibition theme runs throughout; typography remains self-hosted Vietnamese sans.

The mission board retains three chapter filters, a six-node viewing window and selection panel. Dedicated game views, searchable profiles and mode-specific results remain available. “Hai miền cùng thời” opens on an interactive local SVG map and timeline. The alternate “Ba làn tư liệu” view retains three photographic introductions with captions, expandable attribution and filtered events below. Representative images have independently labeled photo dates; the modern Nguyễn Thị Định memorial image is not presented as a 1960 event photograph. Mobile navigation wraps to show all six tabs.
Quiz stays within the selected chapter: two recall first, four understanding, preferring distinct events. Three lives, 30 seconds per absolute deadline. Select before confirming. Feedback waits for explicit continuation; reload and route changes grant no time. Six correct gain 100/120/140/160/160/160=840. New active rounds require in-app confirmation.

Ordering selects distinct years within the filter, supports select-card/slot and move buttons, undo before grading, then **locks on check**. Each correct position scores100, max600. Standard order and explanations appear after grading. Quiz and ordering bests are independent. Short pools display actual count.

History lanes share five half-open time bands. `region` determines north/common/south, never inferred from place. Missing events remain explicit. Relation notes do not reduce complex events to a single cause.

## Architecture and state

React + TypeScript + Vite; CSS; Vitest + Testing Library; Playwright. `src/data/content.json` is the supplied seed with seven targeted question revisions recorded in `CONTENT_REVIEW.json`. `src/domain/` contains pure, time/random-injectable engines and content validation. `src/storage/state.ts` handles versioned snapshots, progress and corruption recovery. `src/app/App.tsx` provides the routed screens and atomic transitions; `src/components/Evidence.tsx` separates sources/media.

Storage key: `dau-moc-vnr-v3`. Separate seen-event IDs, correct-question IDs, quiz best, ordering best, sessions and UI. Session schema/content versions and reconstructed answer scores are validated. Incompatible sessions are discarded with a notice, retaining valid progress. Only this app's current key is reset, after confirmation; other keys are untouched. Viewing never implies mastery. Browser storage failure permits session-only play.

## Content and image status

All 43 profiles and 52 question explanations now reference checked passages in a publicly accessible June 2019 textbook, with printed-page ranges, PDF-viewer page ranges and direct anchors. WTO member information, a government history article and Resolution 36-NQ/TW supplement three profiles. SOURCE_REVIEW.md records the edition, mapping, source distinctions and review limits. Source comparison is not represented as lecturer sign-off.

Eight historical, artifact and location photographs are bundled locally with source, author, reuse statement and original-file links: Tours, Ba Đình, Điện Biên Phủ, Đường Kách mệnh, Paris, Giơnevơ, the Nguyễn Thị Định memorial and the present-day National Assembly building. The 2025 building image introduces chapter 3 visually; it does not add an event beyond the 1920–2018 scope. Artifact/photo/event dates are distinguished. The TTXVN tank photograph remains a linked lead with an honest placeholder because its reuse terms were not established. No claim is made of photos for all 43 events. public/media/provenance.json records each bundled file's SHA-256 and exact download URL.
The original 26/52 IDs are retained; the 17 new profiles do not change quiz answer keys. Seven understanding-question option sets were revised to reduce extreme distractors; one recall-like understanding prompt was revised with its options/explanation. Classification is editorial, not psychometrically validated. No professor approval is claimed.

Fonts: Be Vietnam Pro, SIL OFL, license in `public/fonts`. `public/media/` contains the eight checked photographs and their provenance log. Build validates seed dates, IDs, references, options and claimed local media. See `TEST_REPORT.md` for actual results and limitations.

## Supplementary videos

Three checked publisher resources cover the founding of the Party (VTV24), Điện Biên Phủ (VTV24) and Đại hội VI (Báo Nhân Dân). They appear on Tổng quan and their matching profiles with viewing prompts and original-source links. Two YouTube players load only after a click; the Nhân Dân video opens on the publisher's page. Introductory photos are labeled separately from actual footage. No video is rehosted. Playback depends on the publisher/network and may require opening the original page; direct links remain visible. VIDEO_REVIEW.md records metadata checks and the review browser's authentication limitation. The app itself has no analytics; opening a publisher player connects to that provider.

## Interactive history map and period coverage

The five requested bands now contain **5 / 5 / 5 / 5 / 6** profiles respectively: 1954–1960, 1961–1965, 1965–1968, 1969–1973 and 1973–1975. The original half-open boundary convention is retained: 1965 belongs to the band starting in 1965, and 1973 to the band starting in 1973. The default “Toàn giai đoạn” shows all 26 focused profiles from 1954–1975. Total site content is 43 profiles and 52 MCQs. Build-time validation rejects a band with fewer than five profiles.

The map uses bundled Natural Earth geometry and 11 GeoNames reference locations; no key, tiles or mapping API is needed at runtime. Click or keyboard-select a numbered marker to filter the event list, choose an event for context and sources, and open its full profile. North/south/common filters and the period selector share the same event records. Period/all/view choices survive reload; reading a map preview does not add quiz mastery. Overseas diplomacy and broad policies remain in the list with clear location labels rather than fictitious city points. MAP_REVIEW.md records the geographic sources and reference-point precision.

Decorative arrows have been removed from cards, links and navigation labels. Functional ordering controls and the map’s north indicator remain.
