# NGÀY MAI, MÌNH SẼ…

## Creative requirements, researched story bank, and implementation handoff

**Prepared:** 3 November 2026  
**Product:** Vietnamese interactive historical storytelling game for VNR202  
**Audience:** The coding agent responsible for design, writing, engineering, and delivery  
**Status:** Actionable creative brief with sourced historical seeds; not a finished screenplay or a claim that every illustrative detail is historical.

> **Start here, implementing agent:** Build a beautiful, playable experience about real people and documented events in the Vietnamese revolutionary and resistance periods. You have full authority to decide the stack, architecture, episode selection, mechanics, visual treatment, sequence, and feasible release scope. Make those decisions and implement them. The designs and data examples below are starting points, not a rigid contract. Preserve factual accuracy, distinguish creative interpretation from evidence, and deliver a coherent finished experience.

---

## 1. What this brief changes

The supplied `Ngay_Mai_Minh_Se_Technical_Implementation_HLD_LLD_v1.0.md` contains a useful emotional premise: the value of an ordinary tomorrow, a present-day family frame, cinematic scenes, and connected northern/southern experiences. Keep those strengths.

The user's current request advances that premise into a **story-based game built from true historical snippets**. Consequently, this brief supersedes conflicting implementation prescriptions in that older specification for this project:

| Earlier prescription | Direction for this implementation |
| --- | --- |
| Continuous storytelling website; games explicitly excluded | An interactive narrative game, with meaningful player actions and short authored scenes |
| Exactly 12 chapters and 55 scenes | Let the selected stories and production quality determine the structure |
| All history from 1930 to 2026 gets comparable treatment | Concentrate playable stories on revolution and resistance; later history can form a concise continuation |
| Required Next.js, GSAP, file tree, component names, and command names | Agent chooses an appropriate implementation and records its decisions |
| Unavailable screenplay and manifest described as supplied | Do not depend on files that are absent; use the researched seeds here and author original narration |
| Named editorial/historical approval roles and staged sign-offs | Maintain clear evidence and media attribution; no invented approval roles or prerequisite meetings |

The older document mentions a proposal DOCX, a 55-scene manifest, schemas, example components, and diagrams. Those supporting files were **not supplied in this conversation**. Their contents, scene count, and fictional dialogue cannot be treated as verified inputs.

### The central improvement

Give the player the agency to **discover how something happened and whose contribution made it possible**. History provides the outcome; the player controls attention, exploration order, and the connections they make.

The experience should move beyond clicking through paragraphs. A small action can make a historical idea tangible: assemble a bicycle's carrying adaptations, connect a departure with its receiving shore, turn a page to understand a doctor's work, or piece together why a simple radio mattered.

---

## 2. Product vision

**Working pitch:** An illustrated, cinematic narrative game in which a young person opens a notebook about the tomorrows earlier generations tried to protect. Ordinary objects lead into short true stories: a page, a rice jar, a bicycle, a coastal boat, a medical notebook, a radio. Each episode leaves a concrete human connection to the VNR202 course.

**Player-facing title:** `Ngày mai, mình sẽ…`  
**Possible subtitle:** `Những câu chuyện có thật, những ngày mai được gìn giữ.`

The title is an original creative framing device. Do not imply that these words came from any historical person's diary, speech, or last letter.

### Intended experience

- Vietnamese is the primary language. Engineering documentation can remain English.
- The main audience is university students, including classmates seeing the game projected in class.
- A person can enjoy one complete episode in a short sitting and continue later.
- The emotional range includes resourcefulness, learning, solidarity, leadership, compassion, endurance, and loss.
- The story communicates the cost of war without making every episode a martyrdom scene.
- Players leave remembering a person or action and its historical context, rather than only a date.

### Suggested narrative frame

A fictional present-day student is preparing a history presentation. A mother or older family member invites them to consider what an ordinary tomorrow meant to people living through the events they are studying. The notebook connects the episodes.

This frame is optional. If used, identify it once as a fictional connecting story. Do not make the fictional family descendants of real people without evidence. Do not invent a recovered family archive. A drawn prop can be a visual doorway without pretending to be an authentic object.

Example **original fictional opening**, available to adapt:

> Con đang viết: “Ngày mai, mình sẽ…”  
> Mẹ nhìn trang giấy rồi hỏi: “Con đã bao giờ nghĩ, có những người đã làm rất nhiều chỉ để người khác có một ngày mai bình thường chưa?”

Keep fictional dialogue brief. Let historical people and documented actions carry the substance.

---

## 3. Scope and source hierarchy

### Inputs actually read

| ID | File | Role |
| --- | --- | --- |
| T1 | `gt-lich-su-dang-csvn-ban-tuyen-giao-tw.pdf` | Main course grounding: June 2019 textbook, covering the revolutionary period, the two resistance wars, and later history through 2018 |
| T2 | `ki_9.pdf` | Secondary study summary of Chapters 1–3; useful for navigation and revision, not authority for an anecdote |
| T3 | `VNR202_Bao_cao_chi_tiet_Muc_II1_1954_1965_co_bang_phan_cong.docx.pdf` | Detailed group report for Chapter 2, section II.1, 1954–1965 |
| D1 | `Ngay_Mai_Minh_Se_Technical_Implementation_HLD_LLD_v1.0.md` | Earlier product and technical concept; not historical evidence |

For T1, **printed page n corresponds to PDF viewer page n+1** in this supplied copy. The cover is printed page 0. Citations below specify printed pages; this distinction prevents off-by-one citations.

The additional textbook and summary broaden the scope beyond the first group report. Do not constrain the game to 1954–1965.

### Recommended editorial scope

Use **1930–1975 as the principal historical arc**, with earlier context only if helpful. Stories in the current bank begin in 1939. Use short, sourced bridges for 1930–1938 and the major transitions rather than claiming this bank covers every course topic.

The game may close with the 1976 state unification and a brief connection to rebuilding and renewal. The textbook can ground material through 2018. A 2026 scene is a contemporary fictional frame, not a period documented by the 2019 textbook.

This is an **illustrated companion to the course**, not a substitute for the full syllabus. It need not create a playable chapter for every congress, policy, or campaign. If a broader course companion becomes valuable, the agent may add it without diluting the main stories.

### Evidence hierarchy

1. Use the textbook to establish curriculum context and historical sequence.
2. Use archives, museums, original documents, and institutional collections for the particular person, object, or event.
3. Use responsible historical reporting and commemorative accounts as supporting evidence, checking precise details when necessary.
4. Treat study notes, the group report, and the older technical document as aids rather than independent confirmation.

A textbook paragraph about logistics does not prove an individual's conversation. An archive catalogue can establish that a diary exists without authorizing a fictional passage to be presented as a quotation.

---

## 4. Course connection and suggested story architecture

The following acts are a useful starting rhythm, not mandatory routes or episode counts.

| Act | Period and feeling | Relevant T1 material | Candidate episodes |
| --- | --- | --- | --- |
| I — Một điều đáng tin | Revolutionary organization, courage, and responsibility | Ch. 1: democratic movement, printed pp. 38–42; national liberation, pp. 42–59 | S01, S02 |
| II — Giữ lấy ngày mai | Building a new society while sustaining resistance | Ch. 2.I: 1945–1946, pp. 60–68; resistance and Điện Biên Phủ, pp. 69–85 | S03–S06 |
| III — Những nhịp nối | Different places, shared effort, individual lives | Ch. 2.II: 1954–1965, pp. 86–99; 1965–1975, pp. 99–114 | S07–S11; optional O01/O02 |
| Coda — Ngày mai của mình | Memory, peace, rebuilding, and the present | Ch. 3: state unification, pp. 116–118; renewal begins at p. 127 | S10's clearly dated 2005 afterword; contemporary reflection |

The named anecdotes usually come from the external sources below. The table maps them to the course's themes; it does **not** assert that all anecdotes appear in those textbook pages. T1 also names several young historical figures, including Kim Đồng and Đặng Thùy Trâm, in its concluding discussion, printed pp. 216–217.

After each episode, provide a concise bridge titled something like `Câu chuyện này nằm ở đâu trong lịch sử?` It should explain a connection in plain Vietnamese, generally within a short paragraph, with an optional expandable course reference. Avoid repeatedly saying “theo giáo trình”.

### Sensible first release

An attractive starting selection is **S02, S03, S06, S07, S08, S10**, with S11 as a short closing scene. It balances early revolutionary organization, solidarity, ingenuity, women’s leadership, the North–South connection, and humanity across the conflict. S01, S04, and S05 strengthen intellectual, educational, and scientific contributions if feasible.

This is a recommendation. The implementing agent can choose another set, combine episodes, or deliver a shorter but polished complete journey. Do not render unimplemented episodes as dead links or advertise their completion.

---

## 5. Researched true-story bank

**Reading convention:** The “historical kernel” is a restrained paraphrase of cited evidence. The title, emotional hook, mechanics, props, and staging are creative proposals. An episode is not a verbatim historical reconstruction merely because its core event is supported.

### S01 — Dám nhìn lại

**Person / period:** Nguyễn Văn Cừ; 1939.  
**Historical kernel:** Nguyễn Văn Cừ published *Tự chỉ trích* in 1939. The textbook discusses its frank identification of errors and lessons for leadership. Museum accounts identify publication in July 1939 under the pen name Trí Cường. **Evidence:** T1 printed p. 41; [H01](#h01).

**Why it works:** Courage can mean recognizing a mistake. This gives the game an opening that involves thinking and accountability, with a different emotional register from battlefield stories.

**Playable treatment:** A printed page has movable marginal notes. The player connects a problem, an explanation, and the need to revise an approach. These are present-day paraphrases, visibly identified as summaries. The page then opens into the wider 1936–1939 context.

**Creative boundary:** Do not invent a late-night writing session, private argument, or original manuscript. Do not replace the book's content with invented sentences in quotation marks. The puzzle concerns interpretation, not the player's power to rewrite a historical publication.

**Course bridge:** Political organization also involves learning from practice and criticism; connect to the democratic movement and preparation for later struggle.

### S02 — Một tín hiệu giữa núi rừng

**Person / period:** Kim Đồng, Nông Văn Dền; 1941–1943.  
**Historical kernel:** Kim Đồng was an early leader of the children's revolutionary organization in Cao Bằng. Museum accounts describe liaison and protective work, his diversion of danger away from cadres, and his death in 1943. The museum also documents a posthumous certificate dated 2 September 1944. **Evidence:** [H02](#h02), [H03](#h03).

**Why it works:** A familiar name becomes a person carrying responsibilities within a larger network.

**Playable treatment:** The player reveals how contact between places depends on people. A stylized path links a few contextual points; selecting them reveals communication and protection roles. The final event is narrated rather than staged as a reflex challenge.

**Creative boundary:** The map is schematic, not a verified reconstruction of his final route. Do not invent a message's wording, secret code, final words, or a choice to save or sacrifice him. Omit ethnicity pending reconciliation of inconsistent museum descriptions; it is unnecessary to this episode.

**Course bridge:** Việt Minh, local bases, liaison networks, and mass participation during preparation for national liberation; T1 printed pp. 44–48.

### S03 — Một nắm gạo

**Collective story / period:** Public solidarity and famine relief after independence; 1945–1946.  
**Historical kernel:** The government and Hồ Chí Minh called for famine relief and increased production after independence. Contributions through rice-saving and relief movements formed part of a wider response. **Evidence:** T1 printed p. 63; [H04](#h04), [H05](#h05).

**Why it works:** A modest everyday gesture expresses mutual responsibility. It connects independence with the immediate challenge of keeping people alive.

**Playable treatment:** A rice jar gathers contributions from several anonymous hands. Each action reveals a different element of the response: sharing, transport, production, and organization. The illustration represents collective action; it does not claim to depict a particular household.

**Creative boundary:** This is a documented collective story, not a discovered biography. Do not invent named donors, exact household rations, or a food-allocation game that rewards deciding who goes hungry. Do not imply the jar alone ended the famine.

**Course bridge:** Building and protecting the new state involved social and economic tasks alongside defense.

### S04 — Phần thưởng thành trang sách

**Person / period:** Vương Kiêm Toàn and Bình dân học vụ; 1949–1950, introduced through the 1945 literacy movement.  
**Historical kernel:** A National Museum of History account describes Vương Kiêm Toàn's leadership in literacy work, a monetary award from Hồ Chí Minh, and his use of that award to print books for the public. **Evidence:** [H06](#h06). The wider movement and a surviving impressions notebook are documented by [H07](#h07); course context is T1 printed pp. 63–64, 73.

**Why it works:** This is a specific human action within a familiar movement: a personal reward becomes a shared educational resource.

**Playable treatment:** A reward notice transitions into a stack of books and then into a classroom illustration. The player opens a few pages to connect learning, teaching, and public participation. A simple letter-assembly interaction can accompany the scene without testing historical recall.

**Creative boundary:** Do not present an invented classroom, student's first signature, or teacher's speech as recorded testimony. Avoid precise printing quantities and accounting details not established by the source.

**Course bridge:** Literacy was part of nation-building and continued during resistance.

### S05 — Trở về để góp sức

**Person / period:** Trần Đại Nghĩa, born Phạm Quang Lễ; 1946.  
**Historical kernel:** He returned from France with Hồ Chí Minh in 1946 and was appointed to lead military ordnance work on 5 December 1946. **Evidence:** [H08](#h08), [H09](#h09).

**Why it works:** Knowledge, professional purpose, and the decision to contribute offer an accessible connection for students.

**Playable treatment:** A journey moves from study notes to a working desk. The player organizes a few nontechnical research notes to reveal the relationship between expertise, scarce resources, and collective work. Emphasize collaboration rather than a solitary genius montage.

**Creative boundary:** Do not reproduce remembered dialogue as an authenticated transcript. Avoid invented private motives, precise conversations, or a claim that one person created the entire defense industry. The interaction can concern research and organization without simulating weapon construction.

**Course bridge:** The all-people, comprehensive resistance depended on intellectual and industrial contributions as well as combat; T1 printed pp. 71–74.

### S06 — Chiếc xe chở hơn một chuyến hàng

**Person / period:** Ma Văn Thắng and the transport bicycle collective; Điện Biên Phủ, 1954.  
**Historical kernel:** Adapted bicycles carried supplies for the campaign. Institutional accounts describe bamboo extensions, reinforcement, and the contribution of civilian carriers, including Ma Văn Thắng, whose bicycle is associated with the museum collection. **Evidence:** [H10](#h10), [H11](#h11).

**Why it works:** Ingenuity becomes visible through a simple object. It is the strongest candidate for an early playable prototype.

**Playable treatment:** Inspect and add illustrated carrying adaptations, then reveal the wider supply effort. The interaction is a modern explanatory model, not a re-enactment of one documented work session.

**Creative boundary:** Omit an exact record payload: sources retrieved disagree. Do not invent a numerical carrying-capacity simulator or attribute every adaptation to a single inventor. Bicycle sound and drawn terrain are illustrative.

**Course bridge:** Logistics and public mobilization sustained the campaign; T1 printed pp. 81–83.

### S07 — Những người cùng đứng lên

**Person / period:** Nguyễn Thị Định and the collective movement in Bến Tre; 1960.  
**Historical kernel:** Nguyễn Thị Định helped lead Đồng khởi in Bến Tre. The uprising beginning on 17 January 1960 and women's political mobilization are documented in institutional and historical accounts. **Evidence:** [H12](#h12), [H13](#h13).

**Why it works:** The scene can convey leadership and the organizing power of ordinary people, especially women, without reducing history to one heroic individual.

**Playable treatment:** Connect people and places through a layered river-and-village scene. Each opened perspective adds an aspect of collective action. The scene resolves into the relationship between political organization, mass participation, and the wider movement.

**Creative boundary:** Do not call her a serving general in the 1960 scene; the promotion came later. Avoid presenting one specific protest date or participant count as the uncontested origin of the entire “Đội quân tóc dài.” No invented private speech.

**Course bridge:** Nghị quyết 15, Đồng khởi, and the changing position of the southern movement; T1 printed pp. 90–92; T3 B.4–B.5.

### S08 — Hai bờ của một chuyến đi

**People / period:** Lê Văn Một, Bông Văn Dĩa, the Phương Đông 1 crew, and receiving communities; October 1962.  
**Historical kernel:** Phương Đông 1 left Đồ Sơn on 11 October 1962 carrying supplies south. Accounts identify Lê Văn Một as captain and Bông Văn Dĩa as political officer and describe its successful connection with the Cà Mau receiving area. **Evidence:** [H14](#h14), [H15](#h15).

**Why it works:** A voyage links the person who sends with the person who receives. This is an effective use of the older concept's northern/southern split composition.

**Playable treatment:** Alternate between departure, open sea, and receiving shore. The player reveals connections on a stylized route and observes how the two ends depend on each other. Discovery order can vary; the historical result does not.

**Creative boundary:** Use `Tháng 10/1962` for arrival. Retrieved sources differ on dates, crew totals, and landing details. Do not fake a precise navigation log, radio transcript, or vessel schematic. The 1961 establishment of the sea route is distinct from this 1962 voyage.

**Course bridge:** Rear-area support, local reception, and the North–South relationship; T1 printed pp. 91, 95–96; T3 D.2.

### S09 — Đưa các em về nơi an toàn

**Person / period:** Nguyễn Bá Ngọc; Thanh Hóa, 4–5 April 1965.  
**Historical kernel:** During an air attack on 4 April 1965, Nguyễn Bá Ngọc rescued two younger children near his home. He was wounded and died on 5 April. **Evidence:** [H16](#h16), [H17](#h17).

**Why it works:** The action is understandable without strategic military knowledge: protecting someone else in danger.

**Playable treatment:** Use a quiet, short scene centered on recognizing the people involved and revealing the documented outcome. Let the player advance at their own pace. A change from the broader historical view to an intimate human scale can supply the impact.

**Creative boundary:** Do not make a child's survival contingent on reaction time, a “correct” moral choice, or a score. No injury close-up or repeated failure animation. Omit an exact age and avoid invented interior thoughts or farewell dialogue.

**Course bridge:** The war's expansion into northern civilian life in 1965; T1 printed pp. 99–102. This is a transition beyond T3's main 1954–1965 emphasis, not evidence of a later event occurring earlier.

### S10 — Những trang viết còn ở lại

**Person / period:** Đặng Thùy Trâm; wartime medical work and diaries, with a separately dated 2005 afterword.  
**Historical kernel:** Texas Tech's archive catalogues the original diaries and associated records. It identifies her medical work in Đức Phổ, Quảng Ngãi, from 1967 to 1970 and documents the Whitehurst collection. Separate archival records concern the family's encounters with the diaries in 2005. **Evidence:** [H18](#h18), [H19](#h19), [H20](#h20).

**Why it works:** Care, private writing, preservation, and later remembrance provide a humane connection across time and former opposing sides.

**Playable treatment:** A notebook opens into an authored narration about medical work and memory. The player connects the wartime document with its later preservation and family story. Visually separate the wartime scene from the 2005 afterword.

**Creative boundary:** Use original paraphrase. Do not invent diary entries or reproduce facsimiles, translations, or lengthy quotations without appropriate permission. Avoid the famous “do not burn” line unless separately traced and checked. Do not confuse copies presented to family with permanent transfer of the original archive.

**Course bridge:** The human experience of resistance and its later memory; T1 printed pp. 99–114 and the named reference on p. 217. The 2005 material is an archival afterword, not a wartime event.

### S11 — Khi tin tức vượt qua cánh cửa

**Object / period:** A Sony transistor radio used by political prisoners at Côn Đảo; 30 April–1 May 1975.  
**Historical kernel:** The National Museum of History documents a radio used to hear news of the liberation of Sài Gòn and its connection to events at Côn Đảo. The account distinguishes the evening of 30 April from liberation at the prison on 1 May. **Evidence:** [H21](#h21).

**Why it works:** A small object makes the end of a huge historical period intimate. It is a stronger ending than a generic victory montage.

**Playable treatment:** A dial or accessible button clears an illustrative signal, revealing a written news summary. Move into the change from waiting to receiving confirmation. Then return to the present-day notebook.

**Creative boundary:** Do not fabricate an authentic broadcast, use synthetic speech as archival audio, or imply every place and family experienced reunion at the same instant. The radio's history is supported by the museum account; additional personal reactions need their own evidence or explicit artistic framing.

**Course bridge:** The culmination of the 1975 offensive and its human consequences; T1 printed pp. 112–114. State unification in 1976 is a separate later milestone, pp. 116–118.

### Optional stories with initial evidence

| ID | Historical seed | Opportunity | Evidence and limit |
| --- | --- | --- | --- |
| O01 | Construction of Bắc–Hưng–Hải in 1958; Hồ Chí Minh's visit on 25 December | A water-and-fields scene about rebuilding and collective labor; useful balance against battle and sacrifice | [H22](#h22), [H23](#h23). Do not invent a named worker or transpose present-day yield statistics into 1958 |
| O02 | Võ Bẩm and the early opening of the Trường Sơn supply connection in 1959 | A paired companion to the maritime episode, contrasting land and sea through people and organization | [H24](#h24), [H25](#h25); T1 p. 91. Start with the supported broad sequence; verify precise loads and routes before adding them |

Ấp Bắc is another course-relevant context scene, with institutional material in [H26](#h26). It need not become a tactical minigame. A short historical bridge can explain its significance without adopting contested casualty counts or claiming it alone ended the entire strategy in 1963.

---

## 6. How it plays

### Suggested loop

1. Arrive in a short illustrated situation with a human question.
2. Explore a few meaningful elements or perspectives.
3. Perform a small action that makes the story's central idea tangible.
4. Discover the documented event or outcome.
5. Connect the episode to its historical context and continue.

The implementing agent may use point-and-click scenes, visual-novel composition, illustrated spreads, or a hybrid. A full game engine is optional. The chosen technology should serve pacing, interaction, and art quality.

### Player agency

| Player can influence | History remains established |
| --- | --- |
| Which supported perspective to explore first | Whether a documented event occurred |
| Which contextual detail to examine more closely | A real person's survival or death |
| How to assemble an explanatory model | Dates, identities, evidence, and recorded outcomes |
| Whether to read, listen, revisit, or skip an optional interaction | The content of an authentic quotation or document |
| A present-day reflection | The real person's private thoughts |

Exploration branches can rejoin. A lightweight puzzle can have gentle feedback, but players must be able to see the explanation and proceed. Avoid making another person's suffering a penalty for a player's mistake.

### Mechanics that fit

- **Inspection with consequence:** Opening a detail changes what the scene reveals next, rather than merely closing a tooltip.
- **Assembly:** Put together a meaningful explanatory object, such as bicycle carrying adaptations.
- **Parallel perspectives:** Switch between people or ends of a connection to reveal interdependence.
- **Sequence reconstruction:** Arrange a few supported events; an accessible “show sequence” path remains available.
- **Connection making:** Link an action with its context, allowing several sensible connections rather than pretending a complex event has one simplistic cause.
- **Reflective ending:** Complete `Ngày mai, mình sẽ…` locally or select a thought to carry forward. No public submission is needed.

Do not add a quiz bank merely to label this a game. If a short optional comprehension activity supports the story, the agent may include it. Keep the primary reward narrative understanding and visual progression.

### Structure and pacing

A short path of roughly 15–25 minutes and a fuller path of roughly 35–60 minutes are useful design targets, not commitments. Actual length depends on selected episodes, text, and playtesting. Do not display a fabricated duration as measured.

Give each episode a different dominant verb. If every scene is “click three hotspots, read three paragraphs,” revise the design. Quiet sections and natural pauses are valuable. Readers can move backward, open context, and resume without starting over.

---

## 7. Signature visual direction

### Direction: an illustrated Vietnamese memory notebook

Use the visual language of paper, ink, hand-drawn environments, restrained documentary typography, and intentional theatrical composition. The page should feel made for these stories.

Build a recognizable visual grammar: a fine route line can become a bicycle path, then a shoreline, then a line on a notebook. A page edge can carry progress. An object can transform into the next scene through a shared shape. This continuity is more distinctive than unrelated decorative backgrounds.

### Concrete screen concepts

| Screen | Composition | Interaction and purpose |
| --- | --- | --- |
| Opening | Large Vietnamese title across an unfinished notebook page; generous negative space; a single modest object near the margin | A restrained `Mở câu chuyện` action enters the frame |
| Episode selection | Illustrated chronological foldout or a handwritten contents page with objects embedded in it | Start or resume a story; keyboard and mobile get a readable ordered list |
| Bicycle episode | Large side-view drawing spanning the lower composition; annotation space above; small date/place label at an edge | Inspect and assemble adaptations; reveal the collective journey |
| Maritime episode | A continuous sea horizon connecting two differently lit shores | Alternate departure and reception; the common horizon keeps them related |
| Diary episode | Close, quiet page composition, one area of light, little ornament | Read authored narration and open a separately dated archival afterword |
| Ending | The opening notebook returns with the player's own unfinished line | Revisit a remembered scene or complete a private reflection |

### Color and type suggestions

- Start from warm paper, deep ink, river green, muted terracotta, and a small amber accent.
- Illustrative starting colors: paper `#F3EADB`, ink `#252B2A`, river `#304F48`, terracotta `#A64E3F`, amber `#C69A46`.
- These are art suggestions, not accessibility-certified combinations. Adjust contrast in context.
- Pair an expressive Vietnamese-capable serif for titles with a clear body/UI face. Font choice is the agent's decision; test all Vietnamese diacritics and legally distribute any local fonts.
- Handwriting belongs in short decorative notes, not long reading passages or essential controls.
- A small number of consistent palettes can change by setting: bright paper for learning, green-gray for forest, deep blue for sea, restrained warmth for the present.

### What makes it feel finished

Use strong silhouettes, deliberate focal points, and selective detail. Ensure imagery remains coherent when animation is paused. Let typography change pace through spacing and hierarchy rather than endless text effects.

Keep textures subtle enough that reading remains comfortable. Use original SVG/CSS drawings if that gives the agent more coherent results than stock photography. Generated illustrations can support an art direction, but any depiction of a historical event should be labeled as illustration; do not pass generated photographs off as archival evidence.

### Avoid a generic interface

Avoid a conventional startup hero followed by feature cards, rounded dashboard panels, a permanent sidebar, progress rings, glass surfaces, or a badge collection screen. Repeated rows of identical chapter cards should not carry the entire experience.

This is a direction, not a ban on every card or panel. A source drawer, a functional menu, or a small control can use a simple familiar pattern when it helps usability. Distinctiveness should come from scene composition, authored visuals, and interactions tied to the stories.

### Motion, sound, and small screens

- Use a few purposeful transitions: page opening, line tracing, an object becoming a scene, a horizon shifting.
- No mandatory scroll hijacking. Do not hide the only copy of text behind an animation.
- Sound begins through a user action and can be muted immediately. No narration recording is assumed available.
- A scene must work without audio. Caption any meaningful recorded speech.
- Reduced-motion mode preserves the complete story and interactions using static states.
- On phones, recompose the scene vertically. Do not shrink a desktop stage until text and hotspots are tiny.
- On a projector, titles, primary text, and active controls must remain readable from the room.

---

## 8. Example playable slice: the bicycle episode

This is one concrete example the agent can build, improve, or replace. It establishes the expected relationship between evidence, visual craft, and play without prescribing a component tree.

### Beat A — Notice the object

**Visual:** A drawn bicycle occupies most of the scene. Date/place appears in a quiet corner. The drawing is identified as an explanatory illustration.

**Original narrator copy:**

> Điện Biên Phủ, 1954. Trên những tuyến tiếp tế, một chiếc xe đạp có thể đảm nhiệm một công việc khác hẳn việc chở người: đưa hàng đến mặt trận.

**Player action:** Inspect the bicycle. A clear button can reveal the same information as clicking the drawing.

### Beat B — Understand the adaptations

**Visual:** A few illustrated materials and highlighted attachment areas. The player can choose the order of exploration.

**Player action:** Add a handle extension and explore reinforcement and support. Use the documented broad adaptations in H10. The feedback should explain purpose rather than assign an invented payload score.

**Original narrator copy:**

> Những phần gia cố và tay điều khiển nối thêm giúp chiếc xe phù hợp hơn với việc thồ hàng. Sáng kiến đi cùng sức người và sự phối hợp của cả một lực lượng vận chuyển.

**Truth note:** This is a contemporary explanatory interaction. It does not reconstruct a recorded assembly session or prove a precise capacity.

### Beat C — Widen the view

**Visual:** The single bicycle becomes one of many in an illustrated supply line. Individual names do not appear unless supported. A static version provides the same meaning.

**Player action:** Choose to explore the carrier's contribution or open the campaign context. Both paths return to the same ending.

**Original interpretive copy:**

> Một vật quen thuộc có thể gợi ra một câu hỏi lớn hơn: phía sau một chiến dịch, có những công việc nào thường ít được nhìn thấy?

### Beat D — Connect and continue

Show a concise course bridge and links to H10/H11 and T1 pp. 81–83. Offer `Tiếp câu chuyện`, `Xem nguồn`, and `Đọc lại` without turning the ending into a worksheet.

**Fallbacks:** If drawing assets are unavailable, use an attractive schematic rather than broken media. If dragging is implemented, provide select-and-place controls. If the player does not complete the activity, `Xem cách thực hiện` reveals the explanation and advances the story.

**Acceptance for this slice:** The player can explain the role of the adapted bicycle and the people behind the supply effort; the scene works on a phone, keyboard, and muted/reduced-motion settings; its narration is original and its facts point to evidence.

---

## 9. Requirements that matter

These describe outcomes. The implementing agent chooses how to achieve them and may adjust the feature set to improve the completed product.

| Requirement | Expected result |
| --- | --- |
| A coherent playable journey | A real opening, working episodes, transitions, and ending; no empty advertised chapters |
| True historical foundations | Material historical claims trace to a source; uncertainty does not silently become fact |
| Original authored content | Concise Vietnamese narration, rather than copying articles or reproducing the course PDF |
| Meaningful interaction | Player actions reveal, connect, or explain something important to the story |
| A clear evidence layer | Sources and course references can be reached from the episode without dominating the stage |
| A distinctive visual identity | Authored scene composition and coherent imagery across the journey |
| Comfortable reading | Text remains readable, replayable, and available without motion or sound |
| Usable navigation | Start, continue, previous/next, replay, and access to sources work predictably |
| Resilient progress | If saving is included, it survives reload and degrades gracefully when browser storage fails |
| Transparent representations | Players can distinguish archival material, explanatory drawings, paraphrase, and fictional framing |
| Practical delivery | The chosen app builds and runs through documented commands and a tested hosting approach |

### Optional features the agent may select

Optional local progress, chapter deep links, narration, subtitles, class presentation mode, a complete reading view, an illustrated course timeline, installability/offline support, or a local reflection export can improve the result. They are not all required.

A backend, accounts, analytics, public letters, live multiplayer, and a runtime AI narrator are unnecessary for the current experience. If the agent identifies a compelling reason for extra infrastructure, it can choose a proportionate solution and explain it. Do not add infrastructure merely because the old document lists technical roles.

---

## 10. Flexible implementation guidance

### Architecture at a useful level

Separate three concerns sufficiently to make the product maintainable:

1. **Content and evidence:** authored scenes, source records, factual claims, media descriptions.
2. **Story progression:** the current scene, optional discoveries, return points, and any saved progress.
3. **Presentation and interaction:** layouts, illustrations, animation, input handling, and accessibility alternatives.

These can be modules in a small app. There is no requirement for a framework, microservice, database, state library, schema library, or generalized game engine.

If the repository already exists, inspect it first and preserve useful conventions. For a new project, choose a small web stack the agent can implement and deploy reliably. Use HTML, CSS, and SVG when they serve the design; introduce canvas or a game engine only where their benefit is concrete. Keep meaningful text and controls accessible.

### Suggested progression model

Represent scene progression explicitly enough that a refresh, replay, or source-panel visit does not corrupt it. Named scene IDs and explicit transitions are usually enough. A formal state-machine library is optional.

An illustrative model:

```ts
type Progress = {
  contentVersion: string;
  episodeId: string;
  sceneId: string;
  discoveredIds: string[];
  completedEpisodeIds: string[];
};
```

If local saving is used, validate stored values, handle missing/removed scenes, catch storage errors, and provide reset. Do not auto-play audio just because the last session had it enabled. Reflection text can stay in memory until the player explicitly saves or copies it.

### Suggested content shape

Use any equivalent format. The following is a small explanatory example, **not** a complete manifest or a required TypeScript implementation:

```json
{
  "id": "s06-bicycle",
  "title": "Chiếc xe chở hơn một chuyến hàng",
  "periodLabel": "1954",
  "courseRefs": [
    { "sourceId": "T1", "printedPages": [81, 82, 83] }
  ],
  "sourceIds": ["H10", "H11"],
  "claimIds": ["claim-bicycle-supply-role"],
  "scenes": [
    {
      "id": "s06-inspect",
      "kind": "inspect",
      "text": "Original Vietnamese narration written for the game.",
      "representation": "interpretive-illustration",
      "interactionId": "bicycle-adaptations",
      "next": "s06-wider-view"
    }
  ]
}
```

Keep enough evidence metadata to answer: **Which source supports this sentence?** For example, a claim can carry a statement, source IDs, a page/section locator, and an uncertainty note. A medium can carry its creator, origin, permission/license information, caption, and representation type.

Do not build a heavyweight editorial system to hold a dozen episodes. Plain files and a small validation script are adequate if they make those relationships clear.

### Interaction design and failure handling

- Make hotspots discoverable; hidden pixel hunting is not a useful difficulty.
- Give feedback before changing scenes and make completion idempotent.
- Let source panels close back to the same scene and focus location.
- Maintain a predictable reading order when layouts are visually layered.
- Preserve text when an image, font, or sound fails.
- Give every essential gesture a keyboard/tap alternative.
- If choices branch, ensure all available branches reconnect or reach an intentional ending.
- When a scene becomes complete, replaying it must not duplicate progress or erase later work.

### Media approach

Start from a small coherent asset plan: one strong visual per selected episode, shared textures, a few reusable illustration treatments, and optional sound. Do not download every historical image discovered in research.

Reference links are not media permissions. Use original art, appropriately licensed assets, or links to collection pages when reuse rights are unclear. For diary pages, archival photographs, historical recordings, and textbook scans, check the actual reuse conditions before bundling them. The agent can finish the app with original illustrations and text if media permissions are unavailable.

No client-side crawling or live historical generation is needed. Curate content during development so the released story does not change when an external article changes.

### Responsive behavior

Keep one meaningful content order across display sizes. On desktop, use the room for scenic composition and parallel perspectives. On mobile, stack or alternate those perspectives with clear date/place labels. An accessible reading view can replace complex staging while preserving the full information.

### Performance and deployment

Choose a host appropriate to the resulting stack. Prefer a static deployment when the feature set is static. Document real setup, build, and deployment commands after implementation rather than blindly copying the older spec's commands.

Load the opening quickly, reserve image space, defer other episodes' large assets, avoid loading all audio at once, and minimize animation work outside the visible scene. Test the actual build on a representative mobile viewport and slower connection. Offline operation is optional; if provided, test cache updates and stale content behavior.

---

## 11. Historical integrity during authoring

### Categories the player should understand

| Category | Meaning | Practical display |
| --- | --- | --- |
| Documented event | An event or biographical fact supported by evidence | Discreet source link within the episode |
| Paraphrased narration | Original writing that summarizes supported material | Ordinary narrator text; no false quotation marks |
| Explanatory model | A simplified visual or interaction that explains an idea | Short `Sơ đồ minh họa` or equivalent caption |
| Artistic reconstruction | Authored environment, staging, or drawing | Clear `Minh họa` / `Tái dựng minh họa` label where needed |
| Fictional frame | Contemporary connecting characters and dialogue | One clear introductory disclosure, with reminders when ambiguity could arise |

Keep explanations humane and compact in the game. Detailed evidence and production notes belong in the source view and repository, not technical overlays on every scene.

### Specific discrepancies already found

| Detail | Evidence issue | Safe drafting decision |
| --- | --- | --- |
| Ma Văn Thắng's record payload | H10 gives 325 kg; H11 gives 352 kg | Omit the record number; explain ingenuity and logistics |
| Phương Đông 1 arrival | H14 describes 16 October and a landing sequence; H15 gives 19 October at Vàm Lũng | Use October 1962 and supported departure details; verify further before depicting a specific arrival day |
| Kim Đồng's ethnicity | H02 and H03 use inconsistent descriptions | Omit ethnicity in this story seed; do not resolve by guessing |
| Nguyễn Bá Ngọc's age | Retrieved commemorative descriptions use different age wording | Use the established dates and name; omit exact age |
| Trần Đại Nghĩa's return | A museum search result associates September with his departure/return wording | Use the year 1946 unless a precise voyage chronology is separately checked |
| 2005 diary encounters | Presentation of copies, visits, and custody of original diaries are distinct | Keep the afterword broad and trace any exact transaction to its archival item |

An institutional publisher is a useful source, not proof that every article agrees with every other one. These discrepancies do not invalidate the broad stories; they limit the precision justified by the present evidence.

The textbook and report also require normal historical care. If the agent finds a discrepancy between them and event-specific evidence, document it and omit or resolve the questionable detail. Do not copy a questionable number merely because it appears in a course-related PDF.

### Direct quotation rule

Prefer original paraphrase. Use a direct quotation only when the words and attribution can be traced to a specific reliable document or recording and reuse is appropriate. Do not manufacture last words, diary passages, private thoughts, or verbatim conversations.

A character's historical courage does not establish what they said while doing something. Avoid synthetic voice presented as a real recording. Modern narration should sound and be labeled as modern narration.

### Further research by the implementing agent

The agent may replace or add a story. Find a concrete human action, verify its identity/date/event, check the relevant course context, and identify an interaction that expresses the action. For a contentious or unusually precise anecdote, seek genuinely independent corroboration. Two websites reproducing the same report are one evidence lineage, not two independent witnesses.

Record the source and a short claim summary; do not scrape full articles into the product. If a page is unavailable, use a reliable replacement, a legitimate archive copy, or a less specific supported statement. Never invent a citation or a missing line of testimony.

No external expert's signature is assumed necessary before implementation. Where evidence is insufficient, finish the feature using supported material and record the omission or uncertainty.

---

## 12. Delivery plan with freedom to adapt

### First: choose and build a complete representative slice

Inspect the existing project, select an art direction, choose a representative story, and build it from entry through interaction, context, sources, and exit. The bicycle episode is a strong default because it makes both the game mechanics and visual standard tangible.

Make the decisions and proceed. A short repository note explaining the chosen stack and release scope is enough; no intermediate approval checkpoint is required by this brief.

### Then: complete a balanced journey

Expand using a manageable subset of this bank. Reuse a small set of interaction patterns, but compose each story around its own strongest image and action. Add opening and ending early enough to keep the whole product coherent.

Author transitions that carry chronology, since skipped decades or optional stories can otherwise create false continuity. Mark any flashback or later archival afterword with its date.

### Finally: polish and verify

Review Vietnamese prose, source links, typography, responsive composition, motion alternatives, and playback behavior. Remove unfinished controls and false feature promises. Test the deployed build, not only the development server.

### Meaningful verification

Use testing proportional to the implementation. Useful checks include:

- Every scene, transition, source, claim, and bundled asset reference resolves.
- Every implemented choice path can reach a valid next scene or ending.
- Replaying an interaction and resuming a saved session do not corrupt progress.
- Broken or incompatible saved data falls back safely.
- Opening sources and returning preserves the current context.
- A complete playable episode works with touch, keyboard, no sound, and reduced motion.
- Text and controls remain usable on a small phone and a classroom display.
- Media failure leaves a complete understandable story.
- Historical text has no invented quotation disguised as evidence; reconstructed assets have appropriate labels.
- The build and documented deployment commands actually work.

Automate navigation/state/content checks when worthwhile, and use visual review for composition. Do not generate large suites of trivial tests that merely repeat static markup.

### What the coding agent should deliver

- A runnable, polished game with the agent's chosen completed scope.
- Original Vietnamese story content linked to sources and course references.
- A short explanation of chosen design/technical decisions and any deliberately omitted features.
- An asset attribution record and concise uncertainty notes.
- Setup/build/deployment instructions and verification results.
- A working preview or deployed URL when the environment supports it; otherwise a reproducible local build and precise run instructions.

---

## 13. Source register

**Research date:** 3 November 2026. URLs are research references, not an assertion of permission to redistribute the pages or their media. The register uses short paraphrases rather than reproducing article text.

**Access note:** Full page text was retrieved for the sources marked `page`. Sources marked `index` were available through the search index, but opening the page encountered a timeout, redirect loop, or gateway failure. Their limited source status is stated so the implementing agent does not mistake this brief for an inspection of the underlying complete document. A failed fetch is not a reason to invent missing detail.

### H01

**National Museum of History — “Từ tác phẩm ‘Tự chỉ trích’ của Tổng Bí thư Nguyễn Văn Cừ…”**; 11 July 2022. **Access:** page. Supports the publication and intellectual context of *Tự chỉ trích*. Read with T1 printed p. 41.

[Read source](https://baotanglichsu.vn/vi/Articles/3096/73264/tu-tac-pham-tu-chi-trich-cua-tong-bi-thu-nguyen-van-cu-suy-nghi-ve-cong-tac-xay-dung-chinh-djon-djang-va-he-thong-chinh-tri-hien-nay.html)

### H02

**National Museum of History — “Bằng khen của Tổng bộ Việt Minh truy tặng anh Kim Đồng…”**; 16 May 2013. **Access:** page. An object-centered account; includes the 1944 certificate. Avoid unneeded biographical precision where this and other summaries differ.

[Read source](https://baotanglichsu.vn/VI/Articles/1002/14283/bang-khen-cua-tong-bo-viet-minh-truy-tang-anh-kim-djong-nguoi-djoi-truong-djau-tien-cua-djoi-tntp-hcm.html)

### H03

**National Museum of History — “16 chân dung bất tử của anh hùng liệt sĩ thiếu niên (1)”**. **Access:** index. Supports the broad Kim Đồng account and gives 15 February 1943; contains an ethnicity description inconsistent with H02. Do not treat the two articles as independent archival authentication.

[Read source](https://baotanglichsu.vn/VI/Articles/3098/14780/16-chan-dung-bat-tu-cua-anh-hung-liet-si-thieu-nien-1.html)

### H04

**National Museum of History — “Sức mạnh của lòng dân: Từ ‘Hũ gạo cứu đói’ đến ‘Tuần lễ vàng’…”**; 8 September 2015. **Access:** page. Supports collective famine-relief activities and the contemporary call for sharing.

[Read source](https://baotanglichsuquocgia.vn/vi/Articles/2001/66851/suc-manh-cua-long-dan-tu-hu-gao-cuu-djoi-djen-tuan-le-vang-va-bai-hoc-cua-lich-su.html)

### H05

**Government portal — “Từ Ủy ban Dân tộc Giải phóng đến Chính phủ Lâm thời…”**. **Access:** index. Supporting chronology for the new government's response to famine; use with T1 rather than extrapolating household scenes.

[Read source](https://chinhphu.vn/giai-doan-1945-1954-khang-chien-va-kien-quoc/i-tu-uy-ban-dan-toc-giai-phong-den-chinh-phu-lam-thoi-nuoc-viet-nam-dan-chu-cong-hoa-10001588)

### H06

**National Museum of History — “‘Bình dân học vụ — Thắp sáng tương lai’.”** **Access:** page. An exhibition account containing the Vương Kiêm Toàn award-to-books story and educational objects. Confirm any additional personal detail before extending this account.

[Read source](https://baotanglichsu.vn/vi/Articles/3096/76024/binh-dan-hoc-vu-thap-sang-tuong-lai.html)

### H07

**National Museum of History — “Cuốn sổ và những dòng cảm tưởng về Bình dân học vụ.”**; 20 September 2013. **Access:** page. Documents the movement through a surviving impressions notebook; useful for the relationship between literacy and public participation.

[Read source](https://baotanglichsu.vn/vi/Articles/3096/15089/cuon-so-va-nhung-dong-cam-tuong-ve-binh-dan-hoc-vu.html)

### H08

**Điện Biên Phủ Victory Museum — “Giáo sư Trần Đại Nghĩa với ngành Công nghiệp Quốc…”**. **Access:** index; full-page request returned a gateway error. Supports the broad return and appointment seed; check a replacement if precise chronology is added.

[Read source](https://btctdbp.svhttdl.dienbien.gov.vn/portal/pages/2020-10-21/Giao-su-Tran-Dai-Nghia-voi-nganh-Cong-nghiep-Quoc-8h2kahgws97s.aspx)

### H09

**Quân đội nhân dân, Sự kiện và Nhân chứng — “Kỹ sư Trần Đại Nghĩa trong những ngày đầu kháng chiến chống Pháp.”** **Access:** index. Corroborates the 5 December 1946 appointment; treat quoted conversations as reported recollections unless traced further.

[Read source](https://sknc.qdnd.vn/nhan-vat/ky-su-tran-dai-nghia-trong-nhung-ngay-dau-khang-chien-chong-phap-500397)

### H10

**Điện Biên cultural authority / Điện Biên Phủ Victory Museum — “Chiếc xe đạp thồ huyền thoại tại Bảo tàng Chiến thắng lịch sử Điện Biên Phủ.”**; 2 July 2015. **Access:** page. Supports carrying adaptations and the museum-associated Ma Văn Thắng bicycle. Record-load detail conflicts with H11.

[Read source](https://svhttdl.dienbien.gov.vn/ditich/pages/2015/Chiec-xe-dap-tho-huyen-thoai-tai-Bao-tang-Chien-th-7521.aspx)

### H11

**Nhân Dân — “Ai là người có sáng kiến cải tiến xe đạp thồ để chở được nhiều hàng hóa nhất?”**; cites the Military History Institute. **Access:** index. Supporting identity and logistics account; do not copy its precise load into the game without resolving the discrepancy.

[Read source](https://special.nhandan.vn/sangkien_caitien_xedaptho/index.html)

### H12

**Nhân Dân — “Nguyễn Thị Định — Nữ tướng đầu tiên của Quân đội nhân dân Việt Nam.”** **Access:** page. Supports her leadership in 1960 and distinguishes her later promotion.

[Read source](https://nhandan.vn/special/nu-tuong-nguyen-thi-dinh/index.html)

### H13

**Government news — “Chủ tịch Quốc hội dự họp mặt ‘Đội quân tóc dài,’ ‘Bộ đội Thu Hà’.”** **Access:** page. Historical context for Nguyễn Thị Định, Bến Tre, and women's collective participation.

[Read source](https://baochinhphu.vn/chu-tich-quoc-hoi-du-hop-mat-doi-quan-toc-dai-bo-doi-thu-ha-102267173.htm)

### H14

**Nhân Dân — “Nơi khai mở tuyến đường huyền thoại.”**; 16 October 2021. **Access:** page. Supports Phương Đông 1's departure and the role of the receiving area. Includes local landing details and historical references; compare H15 before asserting a precise arrival chronology.

[Read source](https://nhandan.vn/noi-khai-mo-tuyen-duong-huyen-thoai-post669706.html)

### H15

**Quân đội nhân dân, Sự kiện và Nhân chứng — “Sự chỉ đạo sáng tạo, linh hoạt của Đảng với Đường Hồ Chí Minh trên biển.”** **Access:** index. Gives a different arrival date from H14; retained to make the uncertainty visible.

[Read source](https://sknc.qdnd.vn/ho-so-tu-lieu/su-chi-dao-sang-tao-linh-hoat-cua-dang-voi-duong-ho-chi-minh-tren-bien-498576)

### H16

**Dân sinh / Dân trí — “Truy tặng danh hiệu Anh hùng Lực lượng vũ trang nhân dân cho liệt sĩ Nguyễn Bá Ngọc.”**; 2 September 2016. **Access:** page. Reports the rescue and dates in connection with the commemorative award ceremony.

[Read source](https://dansinh.dantri.com.vn/dien-dan-dan-sinh/truy-tang-danh-hieu-anh-hung-luc-luong-vu-trang-nhan-dan-cho-liet-si-nguyen-ba-ngoc-20160902222411000.htm)

### H17

**Quân đội nhân dân / TTXVN — “Truy tặng danh hiệu Anh hùng LLVT nhân dân cho liệt sĩ Nguyễn Bá Ngọc.”** **Access:** index; opening returned a redirect loop. Corroborates the broad rescue account; not an inspected original award decree.

[Read source](https://www.qdnd.vn/quoc-phong-an-ninh/tin-tuc/truy-tang-danh-hieu-anh-hung-llvt-nhan-dan-cho-liet-si-nguyen-ba-ngoc-486822)

### H18

**Texas Tech University, Vietnam Center and Sam Johnson Vietnam Archive — Frederic Whitehurst Collection, resource 977.** **Access:** index; opening timed out. Archival catalogue supports collection contents and Đặng Thùy Trâm's medical service, distinguishing the archive from later retellings.

[Read source](https://vva.vietnam.ttu.edu/repositories/2/resources/977)

### H19

**Texas Tech University — “Diaries of Dr. Dang Thuy Tram.”** **Access:** index; opening timed out. Lists two diary date ranges and a publishing-rights notice. Use this to find the documents, not as permission to bundle their contents.

[Read source](https://vietnam.ttu.edu/resources/tram_diary/)

### H20

**Texas Tech University archive — “Tram Family Visit Re: Vietnam Diaries,” item 998EM1451; 2005.** **Access:** index. Supports the later family/diary connection. It does not by itself establish that the original diaries permanently left the archive.

[Read source](https://vva.vietnam.ttu.edu/repositories/2/digital_objects/688064)

### H21

**National Museum of History — “Chiếc đài bán dẫn Sony dùng nghe tin miền Nam hoàn toàn giải phóng.”**; 22 February 2013. **Access:** page. Object-based account connecting a radio, news of Sài Gòn, and events at Côn Đảo.

[Read source](https://baotanglichsu.vn/VI/Articles/1002/13728/chiec-djai-ban-dan-sony-dung-nghe-tin-mien-nam-hoan-toan-giai-phong.html)

### H22

**National Museum of History — “10/1958: Khởi công xây dựng Hệ thống thủy nông Bắc–Hưng–Hải.”** **Access:** index. Useful for construction and collective participation; later agricultural statistics in the article should not be narrated as 1958 results.

[Read source](https://baotanglichsu.vn/VI/Articles/3097/15276/10-1958-khoi-cong-xay-dung-he-thong-thuy-nong-bac-hung-hai.html)

### H23

**Hồ Chí Minh Museum — Chronology entry for 25 December 1958, visit to Bắc–Hưng–Hải and Hà Nội mechanical factory.** **Access:** page. Gives documentary references to *Nhân Dân* issues 1749/1750 and *Hồ Chí Minh: Toàn tập*, volume 11, pp. 589–591. Those underlying originals were not independently inspected here.

[Read source](https://baotanghochiminh.vn/chu-tich-ho-chi-minh-ve-tham-cong-truong-thuy-loi-bac-hung-hai-lan-thu-ba-va-tham-va-noi-chuyen-voi-can-bo-cong-nhan-nha-may-co-khi-ha-noi.htm)

### H24

**Quân đội nhân dân — “Thiếu tướng Võ Bẩm, người ‘khai sơn phá thạch’ đường Trường Sơn.”** **Access:** index; opening returned a redirect loop. Initial biographical and early logistics lead for the optional episode.

[Read source](https://media.qdnd.vn/long-form/thieu-tuong-vo-bam-nguoi-khai-son-pha-thach-duong-truong-son-53016)

### H25

**Cần Thơ institutional information portal — “Đề cương tuyên truyền kỷ niệm 65 năm Ngày mở đường Hồ Chí Minh…”** **Access:** index. Supports the broad 1959 opening sequence and an August first delivery account; verify precise figures before using them.

[Read source](https://btgdv.cantho.gov.vn/vi/news/tai-lieu-tuyen-truyen/de-cuong-tuyen-truyen-ky-niem-65-nam-ngay-mo-duong-ho-chi-minh-ngay-truyen-thong-bo-doi-truong-son-1917.html)

### H26

**National Museum of History — “Chiến thắng Ấp Bắc ngày 2-1-1963.”**; 2 January 2017. **Access:** page. Possible context for T1's “Chiến tranh đặc biệt” section. Precise battle totals are not necessary to this game's proposed story arc.

[Read source](https://baotanglichsu.vn/VI/Articles/3097/19685/chien-thang-ap-bac-ngay-2-1-1963.html)

---

## 14. Copyable instruction for the coding agent

> Read this brief and inspect the repository and supplied course material. Build **Ngày mai, mình sẽ…** as a polished Vietnamese interactive narrative game using a balanced, feasible selection of the true stories in this document. You own implementation decisions: choose the stack, architecture, art approach, number of episodes, mechanics, and sequence; improve or replace suggestions where you have a better solution. Begin with a complete representative episode, then finish a coherent journey with a real opening and ending. Prioritize distinctive scene composition, meaningful interaction, readable Vietnamese, and clear links between people's actions and the VNR202 material. Use original narration and trace material facts to evidence. Keep fictional framing and illustrative reconstruction distinguishable from historical records; never invent quotations, archival documents, or alternate outcomes for real events. Handle source discrepancies by researching them or omitting unnecessary precision. Do not depend on the absent 55-scene screenplay/manifest, impose the older specification's stack, or wait for design approval on routine decisions. Test the actual user journey and deployment, document your chosen scope and remaining factual uncertainties, and deliver the runnable result.

