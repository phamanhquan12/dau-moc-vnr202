# Dấu Mốc · VNR202

Vietnamese educational web game implemented from **README_AGENT_VNR202 (1).md**, including its exact 26-event / 52-question seed IDs. The revised handoff supersedes the earlier independently authored bank and dependency-free implementation; those renderers and engine have been removed. This is not derived from HCM202.

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

The first screen is a mission board with three chapter filters, a six-node viewing window, selection panel, and direct quiz/ordering actions. Dedicated views provide quiz, ordering, three synchronized history lanes, searchable event profiles and mode-specific results. Navy/mint/amber, self-hosted Vietnamese sans; no old notebook/serif hero or modal games.

Quiz stays within the selected chapter: two recall first, four understanding, preferring distinct events. Three lives, 30 seconds per absolute deadline. Select before confirming. Feedback waits for explicit continuation; reload and route changes grant no time. Six correct gain 100/120/140/160/160/160=840. New active rounds require in-app confirmation.

Ordering selects distinct years within the filter, supports select-card/slot and move buttons, undo before grading, then **locks on check**. Each correct position scores100, max600. Standard order and explanations appear after grading. Quiz and ordering bests are independent. Short pools display actual count.

History lanes share five half-open time bands. `region` determines north/common/south, never inferred from place. Missing events remain explicit. Relation notes do not reduce complex events to a single cause.

## Architecture and state

React + TypeScript + Vite; CSS; Vitest + Testing Library; Playwright. `src/data/content.json` is the supplied seed with seven targeted question revisions recorded in `CONTENT_REVIEW.json`. `src/domain/` contains pure, time/random-injectable engines and content validation. `src/storage/state.ts` handles versioned snapshots, progress and corruption recovery. `src/app/App.tsx` provides the routed screens and atomic transitions; `src/components/Evidence.tsx` separates sources/media.

Storage key: `dau-moc-vnr-v3`. Separate seen-event IDs, correct-question IDs, quiz best, ordering best, sessions and UI. Session schema/content versions and reconstructed answer scores are validated. Incompatible sessions are discarded with a notice, retaining valid progress. Only this app's current key is reset, after confirmation; other keys are untouched. Viewing never implies mastery. Browser storage failure permits session-only play.

## Content and image status

All 26 profiles and 52 question explanations now reference checked passages in a publicly accessible June 2019 textbook, with printed-page ranges, PDF-viewer page ranges and direct anchors. WTO member information, a government history article and Resolution 36-NQ/TW supplement three profiles. SOURCE_REVIEW.md records the edition, mapping, source distinctions and review limits. Source comparison is not represented as lecturer sign-off.

Five real historical/artifact photographs are bundled locally with source, author, reuse statement and original-file links: Tours, Ba Đình, Điện Biên Phủ, Đường Kách mệnh and Paris. Artifact/photo/event dates are distinguished. The TTXVN tank photograph remains a linked lead with an honest placeholder because its reuse terms were not established. No claim is made of photos for all 26 events. public/media/provenance.json records each bundled file's SHA-256 and exact download URL.
All 26/52 IDs are retained. Seven understanding-question option sets were revised to reduce extreme distractors; one recall-like understanding prompt was revised with its options/explanation. Classification is editorial, not psychometrically validated. No professor approval is claimed.

Fonts: Be Vietnam Pro, SIL OFL, license in `public/fonts`. `public/media/` contains the five checked photographs and their provenance log. Build validates seed dates, IDs, references, options and claimed local media. See `TEST_REPORT.md` for actual results and limitations.
