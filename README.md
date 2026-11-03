# Ngày mai, mình sẽ…

Vietnamese storytelling application implemented from the v1.0 handoff. Next.js App Router, TypeScript, static export, 12 chapters and all 55 scenes. Text-first editorial design; draft disclosures remain visible throughout.

## Run

Node 22: `npm ci`, `npm run dev`.

Checks: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.

GitHub Pages preview uses `/ngay-mai-minh-se` as its base path. For root hosting leave `NEXT_PUBLIC_BASE_PATH` unset. CI stores the static export as a Pages artifact; rerun an earlier successful workflow commit to roll back.

## Content and release

Narration/dialogue are read verbatim from `content/story_manifest.v1.json`. Source documents are retained locally and excluded from the public repository. No historical photos or audio have cleared rights; none are distributed. Sources page reports pending reviews without inventing citations. No trackers, backend or cloud reflection storage.

`npm run release:verify` intentionally fails for the supplied draft. Editorial, historical, media-rights and release-owner approval must be completed before a production release. This implementation is a draft technical preview.

## Remaining work

Qualified historical review and claim/source mapping; licensed media and recorded narration; expanded synchronized timeline treatment; browser E2E, accessibility, device and performance audit. Current checks validate content integrity, TypeScript, lint and static export; they do not establish production readiness.

## Typography and UI revision

Self-hosted Be Vietnam Pro and Noto Serif (SIL OFL licenses in `public/fonts`) include every Vietnamese letter used by the manuscript. Next.js emits hashed WOFF2 font URLs for static hosting; no runtime Google Fonts request. Natural letter spacing, complete normal/italic faces, and no synthetic styles. Custom SVG window illustration is symbolic original artwork, not historical evidence.

Visual checks: Chromium screenshots at 320, 390 and 1440px; homepage, contents and chapters 07/08 tested at 320, 390, 768 and 1440px for font loading and horizontal overflow. `qa/visual-check.mjs` records the browser checks (requires Playwright and Chromium; set REVIEW_URL to target another host).
