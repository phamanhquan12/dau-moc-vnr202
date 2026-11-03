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
