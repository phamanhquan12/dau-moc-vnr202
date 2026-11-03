# Ngày mai, mình sẽ…

Vietnamese interactive history notebook, implemented from `Ngay_Mai_Minh_Se_Requirements_Implementation_Agent_Handoff.md`.

Five complete episodes with original explanatory SVG art: Kim Đồng, collective famine relief, transport bicycles, Phương Đông 1 and the Côn Đảo radio. Each has a different interaction, original narration, historical outcome, course bridge, source drawer and replay. Local progress resumes after reload. No accounts, tracking, audio or backend.

## Development

Node 22. `npm ci`, `npm run dev`.

`npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.

GitHub Pages: `NEXT_PUBLIC_BASE_PATH=/ngay-mai-minh-se npm run build`; publish `out/` using the included Actions workflow.

Browser verification: install Playwright/Chromium separately, then `REVIEW_URL=http://localhost:3000 node qa/game-check.mjs` (include the base path in REVIEW_URL when configured).

See [IMPLEMENTATION.md](IMPLEMENTATION.md) for scope, evidence, uncertainties, original asset attribution and verification. Earlier fixed-manuscript documents/data are retained for reference; the new handoff supersedes them. No external approval roles or unavailable-media gates are imposed.
