# Verification — revised self-contained Dấu Mốc handoff

## Scope

This report applies to the React + TypeScript + Vite implementation using `README_AGENT_VNR202 (1).md` and its supplied JSON. There is no assumed predecessor engine, missing author code, or inherited 17-test suite. The independently authored interim bank and static renderers were removed. The runtime seed retains all 26 event IDs and 52 question IDs. Seven question option sets and one prompt/explanation were reviewed; changes are recorded in CONTENT_REVIEW.json.

## Executed local checks

- TypeScript strict check: passed.
- Vitest unit: **21 passed**. Scoring gains and 840 total; streak reset; wrong/timeout/lives; deadline−1/equality; empty, invalid, stale and duplicate submissions; invalid phases; chapter 2/4 selection, distinct events, fallback pools; saved selection/order/deadline; corruption/version checks; ordering 600/partial scores, lock, undo, short pools, independent bests; seed validation; invalid day/refs/duplicate options/missing media; half-open periods; region mapping; accent-insensitive search; routing and recovery.
- Vitest React integration: **7 passed**. Board/profile return and seen≠mastery; select/confirm/double-confirm and feedback remount; expired restore once; timer/submit race; real search/filter and source/placeholder; new-round/reset confirmation and unrelated storage; failed image fallback retains source and caption.
- Playwright Chromium production preview: **5 passed**. Full 840 UI route and reload; deadline via controlled clock while off route; wrong answers, early finish/review; keyboard/select-slot ordering, grade lock, reload and independent scores; mobile play/search/profile; five time bands and correct lane membership; direct routes, screenshots and 404/runtime-error checks.
- Production build: passed, Vite emits static dist with relative base URLs and no backend.

The final check commands and lockfile are committed. Browser runs used local Linux shared libraries available to the runner; clean environments should run `npx playwright install --with-deps chromium` as documented. No coverage percentage is claimed.

## Visual inspection

Screenshots in screenshots/: desktop 1440×900, projector1280×720, mobile390×844, small360×780; board, quiz, ordering and three-lane views. Real-browser assertions detect whole-page horizontal overflow and verify the projector quiz confirmation button fits. Screenshots were visually inspected for Vietnamese diacritics, layout hierarchy and readable labels. The sans fonts are self-hosted. This is not a claim of native Safari/Firefox testing, a physical projector-room study, or a complete screen-reader audit.

## Data and media status — separate from software status

- Seed chapter references remain `page:null`, `url:null`, `reviewStatus:chapter-reference-only`; not claimed to have been approved by a lecturer or checked to specific PDF pages.
- All four image records remain **not integrated**: localPath:null, verify-before-embedding. Exact photos/authors/redistribution terms have not been established for this revision. Source pages and credit/usage notes are available, and placeholders intentionally remain. No TTXVN image is treated as automatically open-license.
- Images do not appear in an unanswered year quiz, so captions cannot reveal the answer. No synthetic historical voice or AI historical photo is included.
- Difficulty labels are editorial seed classifications, not psychometrically measured difficulty. Distractor revisions do not constitute academic sign-off.

## Requirement evidence

| Requirement | Evidence |
|---|---|
| Immediate task board, no hero/popups | board screenshots and start controls |
| Chapter-filtered 2 recall +4 understanding | unit and full UI path |
| Deadline stable across navigation/reload | controlled-clock E2E and restoration tests |
| Locked ordering, independent points/best | keyboard E2E and grading tests |
| Shared five periods, north/common/south | period/lane unit tests and all-band E2E |
| Search Vietnamese with/without accents | integration and mobile browser tests |
| Clear incomplete media and sources | profile placeholders and image-error integration |
| Corrupt state safe, no unrelated deletion | unit/integration recovery/reset tests |
