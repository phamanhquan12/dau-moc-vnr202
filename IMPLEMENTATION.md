# Interactive notebook release

The 3 November Requirements Implementation Agent Handoff supersedes the earlier fixed manuscript site. Retain Next.js static export and the tested self-hosted Vietnamese typography; replace the homepage with a local-state narrative game. No backend, telemetry or audio. Five complete episodes: S02, S03, S06, S08 and S11. Scope favors a finished chronological journey with five different verbs over a larger catalogue. No unimplemented episodes are advertised.

## Design and interaction

Original SVG explanatory art: liaison network, shared rice jar, bicycle with visible adaptations, two-shore maritime composition, radio with an illustrative dial. The notebook returns at the ending. Every interaction has an explanation path, replay, previous/next and no failure penalty. Sources open in a native modal with focus containment and Escape; the scene stays mounted. Local save is versioned, validated and storage errors do not block play. Reflection is never persisted.

Historical outcomes remain fixed. The opening mother/child dialogue is explicitly fictional. Narration is original paraphrase; sources are linked per episode, including discovery, outcome and context. Course-page mapping comes from the supplied handoff; the original textbook PDF was not available for direct inspection. The old 55-scene seed is retained as an unused reference, not current verified game content. Old chapter URLs lead back to the new game.

## Evidence and deliberate omissions

H02, H04, H10, H14 and H21 were opened during implementation. They support the corresponding named people, broad activities and chronology. No article images or text passages were bundled. Source records are in src/lib/game.ts. Course bridges distinguish contextual interpretation from the object-specific evidence. Omit Kim Đồng's ethnicity; bicycle record loads; exact voyage arrival day and crew count. Sources disagree on those details. No invented quotations, final words, radio recordings, facsimiles or weapon-construction mechanics. Contemporary reflection is a fictional frame, not a claim about the 2019 textbook's coverage.

## Assets

All game SVG drawings are original repository-authored explanatory illustrations, not copies of museum objects or navigation maps. Fonts: Be Vietnam Pro and Noto Serif, SIL OFL, licenses in public/fonts. The older window illustration remains unused. No external media requests are needed.

## Run / deploy

Node 22. npm ci; npm run dev. npm run lint; npm run typecheck; npm test; npm run build. NEXT_PUBLIC_BASE_PATH=/ngay-mai-minh-se for GitHub Pages. The existing workflow builds and publishes out/. Re-run an earlier successful commit to roll back. npm run release:verify checks content/types/tests without the obsolete external-signature gate.

## Verification

Content tests cover complete episode evidence/transitions and malformed/versioned saves. Browser walkthrough covers all five interactions, replay, reload, source modal/return, optional explanation, ending, corrupted-save recovery and reduced motion. Responsive screenshots cover 320, 390, 768 and 1440px. No audio is required. Classroom/readability and source interpretation remain subject to normal human feedback, not invented approvals.

Additional verification: a complete episode was operated using focused buttons and Enter, including source modal/Escape, in a touch-sized viewport with reduced motion and browser storage deliberately blocked. The story remained playable and the next episode was reachable.
