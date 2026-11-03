# Verification report — Dấu Mốc VNR202

## Baseline and limitation

The actual baseline was the earlier five-episode notebook game. Its two unit tests passed before removal. The Dấu Mốc engine/data/17 tests described by the new brief were absent. Therefore this is a replacement implementation on the existing repository, **not a claimed regression pass against that missing codebase**. The available 6 profiles/12 questions are a starter subset, not the missing 26/52 release. Four historical images and the textbook PDF remain missing.

## Executed

- `npm test`: 22/22 new Node tests pass. Includes 840-point streak, stale question ID, invalid option, empty/double submit, before/at deadline, life exhaustion, snapshot order/selection/deadline preservation, corrupted score/options, ordering dates/placement/swap/undo/stable check, routing, viewed state, legacy migration and corrupted-session recovery.
- `npm run lint` and `npm run typecheck`: module syntax/content-reference checks; **not** TypeScript type analysis (the application uses JavaScript).
- `npm run build`: static output in dist; no backend/framework runtime or third-party network dependency.
- Chromium with real browser modules and real engine: board→profile→return preserves selection and awards no points; v1 migration preserves seen/best and unrelated storage; correct, wrong and expired quiz answers; selection/reload exact snapshot; navigate away past deadline then return/reload grades once; early ending, review mistakes, new session.
- Ordering completed by focused buttons + Enter, no drag; checking/reload retains set and placements.
- Shared Bắc–Nam period changes both lanes and common region together; explicit gaps remain visible.
- Browser screenshots at 1440×900, 1280×720, 390×844 for board, quiz, ordering, lanes; no horizontal overflow. Projector quiz confirmation button verified within viewport.
- 200% reflow equivalent at 640 CSS pixels (half 1280) captured. This is a viewport/reflow check, not an assertion that native browser zoom was exercised.
- Reduced-motion emulation, malformed save recovery and no unexpected runtime page errors in the successful walkthrough.

The first browser pass exposed a hashchange-before-data initialization error; a render guard was added and the complete walkthrough rerun successfully. No coverage percentage or all-browser accessibility certification is claimed.

## Before / after

| Area | Actual prior app | Replacement |
|---|---|---|
| Entry | Cream notebook/story opening | Night-blue task board, chapter dock, chronological nodes, selected mission panel |
| Navigation | Episode menu and previous/next | Hash-routed board, profile, quiz, ordering, Bắc–Nam, materials, results |
| Quiz | Not present | Dedicated play view, persistent HUD, explicit submit, source-backed feedback |
| Ordering | Not present | Six-card tray, timeline slots, swap/undo/check |
| Bắc–Nam | Illustrative voyage scene | Two synchronized period lanes plus common/connection region; gaps disclosed |
| Progress | Narrative discoveries | Read status separate from quiz score/session; v1 migration |
| Visual system | Serif titles, paper/SVG objects | Vietnamese sans, navy panels, mint connections, amber HUD; no hero/gallery |

Screenshots named desktop/projector/mobile-{board,quiz,order,lanes}.png are the replacement screens. The prior notebook baseline is included separately when available; it is **not** the missing HCM202/Dấu Mốc baseline. Equivalent before images for quiz/ordering/lanes cannot exist because those screens did not exist in the actual baseline.

## Still unavailable / not claimed

The original 26/52 content and 17-test regression suite, original image provenance, textbook PDF/page verification, native Safari/Firefox checks, manual screen-reader review and projector room legibility need the corresponding inputs/devices. The interface does not hide these content gaps or make up archival material.

Measured sRGB contrast for the principal solid text/background pairs: light/panel 13.65:1, muted/panel 8.33:1, mint/panel 8.49:1, amber/panel 9.45:1, primary-button text/mint 9.00:1. These measurements do not substitute for checking every focus/disabled/hover state.

Additional executed checks: full six-correct browser session finishes at 840 in HUD/storage/results; direct hash/back/forward navigation; CSS `zoom:200%` at 1280×720 (screenshots/css-zoom-200.png); reduced-motion session with localStorage deliberately blocked remains playable. Native browser UI zoom remains distinct from this CSS zoom check.

## Deployed verification

GitHub Actions run 41663854061 built and deployed commit 9cf6f08 successfully to https://phamanhquan12.github.io/dau-moc-vnr202/. The complete browser walkthrough was rerun against that live URL: migration/unrelated storage/profile return; correct/wrong/timeout/reload/results/new session; six-correct 840; keyboard ordering/reload; synchronized periods; desktop/projector/mobile checks; corrupted snapshot; zero unexpected page errors. Live-run screenshots were kept outside the working tree to preserve the committed local comparison set.
