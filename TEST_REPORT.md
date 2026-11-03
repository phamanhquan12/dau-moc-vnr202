# Verification — revised self-contained Dấu Mốc handoff

## Scope

This report applies to the React + TypeScript + Vite implementation using `README_AGENT_VNR202 (1).md` and its supplied JSON. There is no assumed predecessor engine, missing author code, or inherited 17-test suite. The independently authored interim bank and static renderers were removed. The runtime seed retains all 26 event IDs and 52 question IDs. Seven question option sets and one prompt/explanation were reviewed; changes are recorded in CONTENT_REVIEW.json.

## Executed local checks

- TypeScript strict check: passed.
- Vitest unit: **31 passed**. Scoring gains and 840 total; streak reset; wrong/timeout/lives; deadline−1/equality; empty, invalid, stale and duplicate submissions; invalid phases; chapter 2/4 selection, distinct events, fallback pools; saved selection/order/deadline; corruption/version checks; ordering 600/partial scores, lock, undo, short pools, independent bests; seed validation; invalid day/refs/duplicate options/missing media; half-open periods; region mapping; accent-insensitive search; routing and recovery. New grounding checks cover all event/question source mappings, printed/PDF page anchors, eight actual asset hashes against provenance, and invalid checked-source metadata.
- Vitest React integration: **13 passed**. Board/profile return and seen≠mastery; select/confirm/double-confirm and feedback remount; expired restore once; timer/submit race; real search/filter and source/placeholder; new-round/reset confirmation and unrelated storage; failed image fallback retains source and caption. WTO supplemental evidence and the artifact photo date/license are covered; unassigned images omit empty messaging. The opening overview, active tab, chapter selection and absence of automatic mastery/progress are covered.
- Playwright Chromium production preview: **12 passed**. Full 840 UI route and reload; deadline via controlled clock while off route; wrong answers, early finish/review; keyboard/select-slot ordering, grade lock, reload and independent scores; mobile play/search/profile; five time bands and correct lane membership; direct routes, screenshots and 404/runtime-error checks. Two new journeys check every profile reference, all five loaded photos at 1440px and 360px, credits/licensing, the catalogue and absence of source/photo answer leaks before quiz grading. New overview/gallery journeys cover four widths, all three chapter images, the two-region photographic introductions, inline credit disclosure without blocked actions, selected chapter persistence and return navigation.
- Production build: passed, Vite emits static dist with relative base URLs and no backend.

The final check commands and lockfile are committed. Browser runs used local Linux shared libraries available to the runner; clean environments should run `npx playwright install --with-deps chromium` as documented. No coverage percentage is claimed.

## Visual inspection

New overview and photographic-lane screenshots cover desktop 1440×900, projector 1280×720, mobile 390×844 and small 360×780. Full-profile screenshots show Tours and Đường Kách mệnh at 1440px and 360px, with full photo composition, caption and source passage. Screenshots in screenshots/: desktop 1440×900, projector1280×720, mobile390×844, small360×780; board, quiz, ordering and three-lane views. Real-browser assertions detect whole-page horizontal overflow and verify the projector quiz confirmation button fits. Screenshots were visually inspected for Vietnamese diacritics, layout hierarchy and readable labels. The sans fonts are self-hosted. This is not a claim of native Safari/Firefox testing, a physical projector-room study, or a complete screen-reader audit.

## Data and media status — separate from software status

- All 43 event profiles and all 52 question explanations now resolve to checked source passages. There are 43 textbook passage records with explicit printed-page/PDF-viewer-page ranges and the original three supplemental references plus 14 checked context articles for the expansion. See SOURCE_REVIEW.md for the exact edition, PDF SHA-256, page map and interpretive limits. This does not claim lecturer approval.
- Eight historical/artifact/location photographs are now integrated. Their local SHA-256 hashes match public/media/provenance.json. All eight images loaded in the tested desktop/mobile views (the original five in profile checks and the three additions in overview/lane checks). Every bundled image has a credit, source, original-file link and reuse statement. PD-Vietnam is retained as a territorial source declaration rather than relabeled as a global license. The TTXVN tank photo remains pending with a working game and explicit placeholder.
- Images do not appear in an unanswered year quiz, so captions cannot reveal the answer. No synthetic historical voice or AI historical photo is included.
- Difficulty labels are editorial seed classifications, not psychometrically measured difficulty. Distractor revisions do not constitute academic sign-off.

## Requirement evidence

| Requirement | Evidence |
|---|---|
| Opening subject overview requested in later user feedback | overview screenshots, chapter navigation and direct game controls |
| Chapter-filtered 2 recall +4 understanding | unit and full UI path |
| Deadline stable across navigation/reload | controlled-clock E2E and restoration tests |
| Locked ordering, independent points/best | keyboard E2E and grading tests |
| Shared five periods, north/common/south | period/lane unit tests and all-band E2E |
| Search Vietnamese with/without accents | integration and mobile browser tests |
| Specific sources and captioned images | all-profile browser checks, eight loaded images, provenance hashes, pending/error fallbacks |
| Corrupt state safe, no unrelated deletion | unit/integration recovery/reset tests |

## CI and deployed verification

The preceding application release passed GitHub Actions run **41668904527** and five live journeys. For this source/media revision, local strict TypeScript, production build, **25 unit + 9 integration + 7 production-browser tests** passed. [GitHub Actions run 41673823512](https://github.com/phamanhquan12/dau-moc-vnr202/actions/runs/41673823512) completed successfully for commit **117e350**, including clean install, all tests and Pages deployment. All **7 browser journeys also passed against the public site** at https://phamanhquan12.github.io/dau-moc-vnr202/, including every profile reference and all five photos at desktop/mobile widths. Committed screenshots retain the visually inspected production-preview set; live-run captures did not replace that set. Browser tests intentionally do not contact every external publisher on each CI run; external passages were checked during source review, while browser checks verify the correct source links and local assets.

## Exhibition redesign verification

The user explicitly changed the opening-screen requirement to a subject overview and requested a different theme and representative images. The new first route is Tổng quan; board and game behavior are preserved. Local verification for this revision: 25 unit tests, 10 integration tests and 9 production-browser journeys. Browser review found an attribution popover blocking a chapter action; credits were changed to expand inline and the same interaction passed. Production screenshots show the warm white/charcoal/vermilion theme and full-frame photographs. [GitHub Actions run 41678075065](https://github.com/phamanhquan12/dau-moc-vnr202/actions/runs/41678075065) passed clean install, strict TypeScript, all 44 tests, production build and Pages deployment for commit **4a0181c**. All **9 browser journeys passed again on the public site**, including the opening overview, chapter actions after expanding credits, gallery imagery, responsive navigation and the existing games. The live theme-color metadata matches the exhibition background and mark.svg returns HTTP 200 with the correct image MIME type. The committed screenshots retain the visually reviewed production-preview captures; live tests did not replace that set.

## Beginner guidance and supplementary video revision

The overview now states the subject and purpose directly, offers a first-profile CTA, explains three starting steps and all five activities, and provides three publisher video resources with original-source links. The matching three profiles also show their relevant video. Local checks: **26 unit + 12 integration + 10 browser journeys passed**, including the recommended profile without a timed quiz or automatic mastery, video/event references, one player at a time, close/unmount and a simulated unavailable publisher with visible direct links. Existing games, deadlines and source checks remain covered. Screenshots cover 1440px, 1280px, 390px and 360px.

External verification is distinct from application tests: YouTube oEmbed metadata identified the correct titles and VTV24 author; the Nhân Dân page's HLS source returned 200. The review browser's YouTube player reported an auth/unavailable state, so uninterrupted playback is not claimed. VIDEO_REVIEW.md records the limitation. CI does not depend on streaming providers being reachable. [GitHub Actions run 41685429502](https://github.com/phamanhquan12/dau-moc-vnr202/actions/runs/41685429502) passed clean install, strict TypeScript, all 48 tests, build and Pages deployment for commit **703de47**. All **10 browser journeys passed again against the public site**, including the beginner path and the 200px minimum mobile player size. The unavailable-publisher journey is deliberately simulated and verifies fallback links rather than claiming successful external streaming. Committed captures retain the visually reviewed local preview set; live-run screenshots did not replace it.

## Interactive map, denser timeline and arrow cleanup

Local verification: **31 unit + 13 integration + 12 browser journeys passed**. New checks enforce 5/5/5/5/6 band coverage, original 52-question validity, all 43 profile passage references, unique boundary-year membership, coordinate bounds and GeoNames reference IDs, overseas/area classification, multi-location events, chapter-appropriate regional filters, keyboard marker selection, source disclosure, preview-versus-mastery separation, map/list switching, filter restoration and no page overflow at 1440/1280/390/360px. Decorative arrow removal is checked on cards and link labels; actual ordering movement controls remain usable.

Map screenshots were visually reviewed. The diagram is for reference localities, not precise battlefield footprints, territorial claims or control boundaries. Geographic provenance is in src/data/map-provenance.json and MAP_REVIEW.md. The production build also enforces the minimum profile count per requested band. CI and public-site verification for this revision will be recorded after publication.
