# Dấu Mốc VNR202

Mission-based history learning board, implemented in the existing repository according to `README_AGENT_VNR202.md`. The Ngày mai, mình sẽ implementation has been removed, including its framework, narrative engine, artwork, manuscript and old handoffs. Git history remains available for recovery.

## Important input mismatch

This workspace contained the notebook app, **not** the described Dấu Mốc source (`dist/core.mjs`, `make-data.py`, 26 profiles, 52 questions, four images, textbook PDF and 17 tests). Those files could not be preserved or regression-tested because they were absent. No alternative source path was supplied during implementation.

The delivered starter contains **6 sourced profiles and 12 questions**. It is explicitly labeled, does not claim full course coverage through 2018, and does not fabricate missing photos, textbook page links, or northern/southern profiles. The source-backed content was adapted from the previously available records; source IDs and uncertainties are retained in `app/data.json`. The PDF group report stays local and is not redistributed.

## Run

Node 22, no dependencies or backend:

```sh
npm ci
npm test
npm run lint
npm run build
npm run dev
```

Local preview: http://127.0.0.1:3040. Publish the contents of `dist/` to static hosting. All asset links are relative; hash routes refresh without server rewrites. The existing repository was renamed to `phamanhquan12/dau-moc-vnr202`, preserving Git history and audience; no duplicate site was created. GitHub Pages publishes https://phamanhquan12.github.io/dau-moc-vnr202/.

## Structure

`app/core.mjs`: pure quiz, ordering, validation, migration and routing rules. `app/app.mjs`: storage, route shell and event handling. Separate renderers: `board`, `profile`, `quiz`, `ordering`, `lanes`, `results`, `materials`. `app/data.json`: content/evidence. Build copies these to `dist/` without bundling. Tests use Node's built-in runner.

## State and rules

Quiz: up to 6 questions, 3 lives, 30-second absolute deadlines. Selection does not submit. Correct +100 and streak +0/+20/+40/+60 capped at +60: six correct =840. IDs stay stable through shuffled order. Reload preserves question and option order, selection, deadline and feedback. Navigation never pauses a deadline. Timeout is graded once; feedback waits for explicit continuation. Results list mistakes and source-backed explanations.

Ordering: six distinct years, stable set and placements until “Bộ mới”; select-card/select-slot controls, swaps, undo, check and reload. Partial-date labels remain partial; no invented first-of-month dates.

Storage: `dau-moc-vnr-v2`; legacy `dau-moc-vnr-v1` migrates valid seen IDs to viewed and retains numeric best. Legacy sessions are not trusted. Unknown event IDs are omitted. Invalid sessions recover with a notice. Other apps' storage is not cleared. Reading never awards points/mastery. Stored data is local, without analytics or accounts.

## Evidence and assets

Profiles link to H02, H04, H10, H14, H21 from the available source register. A sixth profile describes the documented 1944 Kim Đồng certificate. No external text or photos were scraped into the product. No historical images were supplied for this build. Typography is self-hosted Be Vietnam Pro under SIL OFL (`app/assets/fonts/BeVietnamPro-LICENSE.txt`). No serif/paper/AI-photo visual treatment remains.

The sparse Bắc–Nam view uses one selected period for both lanes, with explicit missing-profile wording and a separate shared/connection area. The 1962 departure/receiving relationship is described and sourced, not presented as a direct causal arrow or military map.

See `TEST_REPORT.md` and `screenshots/` for actual verification and before/after notes. Browser checks require a separately installed Playwright/Chromium: `REVIEW_URL=http://127.0.0.1:3040 node tests/browser-check.mjs`. Browser dependencies are not required to build or host.
