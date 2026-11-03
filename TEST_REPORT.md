# Verification — revised self-contained Dấu Mốc handoff

## Scope

This report applies to the React + TypeScript + Vite implementation using `README_AGENT_VNR202 (1).md` and its supplied JSON. There is no assumed predecessor engine, missing author code, or inherited 17-test suite. The independently authored interim bank and static renderers were removed. The runtime seed retains all 26 event IDs and 52 question IDs. Seven question option sets and one prompt/explanation were reviewed; changes are recorded in CONTENT_REVIEW.json.

## Executed local checks

- TypeScript strict check: passed.
- Vitest unit: **25 passed**. Scoring gains and 840 total; streak reset; wrong/timeout/lives; deadline−1/equality; empty, invalid, stale and duplicate submissions; invalid phases; chapter 2/4 selection, distinct events, fallback pools; saved selection/order/deadline; corruption/version checks; ordering 600/partial scores, lock, undo, short pools, independent bests; seed validation; invalid day/refs/duplicate options/missing media; half-open periods; region mapping; accent-insensitive search; routing and recovery. New grounding checks cover all event/question source mappings, printed/PDF page anchors, five actual asset hashes against provenance, and invalid checked-source metadata.
- Vitest React integration: **9 passed**. Board/profile return and seen≠mastery; select/confirm/double-confirm and feedback remount; expired restore once; timer/submit race; real search/filter and source/placeholder; new-round/reset confirmation and unrelated storage; failed image fallback retains source and caption. WTO supplemental evidence and the artifact photo date/license are covered; unassigned images omit empty messaging.
- Playwright Chromium production preview: **7 passed**. Full 840 UI route and reload; deadline via controlled clock while off route; wrong answers, early finish/review; keyboard/select-slot ordering, grade lock, reload and independent scores; mobile play/search/profile; five time bands and correct lane membership; direct routes, screenshots and 404/runtime-error checks. Two new journeys check every profile reference, all five loaded photos at 1440px and 360px, credits/licensing, the catalogue and absence of source/photo answer leaks before quiz grading.
- Production build: passed, Vite emits static dist with relative base URLs and no backend.

The final check commands and lockfile are committed. Browser runs used local Linux shared libraries available to the runner; clean environments should run `npx playwright install --with-deps chromium` as documented. No coverage percentage is claimed.

## Visual inspection

New full-profile screenshots show Tours and Đường Kách mệnh at 1440px and 360px, with full photo composition, caption and source passage. Screenshots in screenshots/: desktop 1440×900, projector1280×720, mobile390×844, small360×780; board, quiz, ordering and three-lane views. Real-browser assertions detect whole-page horizontal overflow and verify the projector quiz confirmation button fits. Screenshots were visually inspected for Vietnamese diacritics, layout hierarchy and readable labels. The sans fonts are self-hosted. This is not a claim of native Safari/Firefox testing, a physical projector-room study, or a complete screen-reader audit.

## Data and media status — separate from software status

- All 26 event profiles and all 52 question explanations now resolve to checked source passages. There are 26 textbook passage records with explicit printed-page/PDF-viewer-page ranges and three supplemental references: WTO membership, state unification and Resolution 36-NQ/TW. See SOURCE_REVIEW.md for the exact edition, PDF SHA-256, page map and interpretive limits. This does not claim lecturer approval.
- Five real historical/artifact photographs are now integrated. Their local SHA-256 hashes match public/media/provenance.json. Five images loaded successfully in browser at both desktop and mobile widths. Every bundled image has a credit, source, original-file link and reuse statement. PD-Vietnam is retained as a territorial source declaration rather than relabeled as a global license. The TTXVN tank photo remains pending with a working game and explicit placeholder.
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
| Specific sources and captioned images | all-profile browser checks, five loaded images, provenance hashes, pending/error fallbacks |
| Corrupt state safe, no unrelated deletion | unit/integration recovery/reset tests |

## CI and deployed verification

The preceding application release passed GitHub Actions run **41668904527** and five live journeys. For this source/media revision, local strict TypeScript, production build, **25 unit + 9 integration + 7 production-browser tests** passed. [GitHub Actions run 41673823512](https://github.com/phamanhquan12/dau-moc-vnr202/actions/runs/41673823512) completed successfully for commit **117e350**, including clean install, all tests and Pages deployment. All **7 browser journeys also passed against the public site** at https://phamanhquan12.github.io/dau-moc-vnr202/, including every profile reference and all five photos at desktop/mobile widths. Committed screenshots retain the production-preview set; live captures were inspected without replacing it. Browser tests intentionally do not contact every external publisher on each CI run; external passages were checked during source review, while browser checks verify the correct source links and local assets.
