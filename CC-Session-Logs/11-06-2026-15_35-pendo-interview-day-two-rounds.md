# Session Log: 11-06-2026 15:35 - Pendo Interview Day (Two Rounds: Weldon + Mahoney)

## Quick Reference (for AI scanning)
**Confidence keywords:** Pendo, Senior Customer Engineer, ANZ, Benjamin Weldon, VP Enterprise Sales APAC, Christopher Mahoney, Technical Depth Discovery, Sales Cross-Functional, CARL method, STAR+R, story-bank, interview-prep, HTML prep doc, Notion, pre-interview email, thank-you email, Perry, WalkMe vs Pendo, agentic AI, 30% YoY APAC, Lumen Health, Pendo install, AI Setup Assistant, Claude Code, DOM, selectors, data-pendo-id, useId trap, Emotion css hashes, crm.pendoexperience.io, pageLoad, App Router gotcha, Clerk, PATIENT_ROSTER, 30-60-180 plan, em-dash-free, inforcer, UbiPark Melbourne Airport, Phocas MYOB
**Projects:** career-ops (job-search pipeline); Pendo Senior Customer Engineer ANZ interview loop (two rounds same day)
**Outcome:** Built complete, em-dash-free interview prep for both of Niroo's Pendo interviews on 11 Jun (Benjamin Weldon sales cross-functional 12:45, Christopher Mahoney technical depth 1:15): a Notion page + two house-style HTML prep docs (sales restructured to CARL, technical as rich Q&A), drafted pre-interview and thank-you emails for both, added a WalkMe-vs-Pendo question + briefing, and folded in the real Lumen Health Pendo install detail (including the auth/Clerk-removed correction).

## Decisions Made
- **Treat the two interviews as distinct prep targets.** Benjamin = VP Enterprise Sales APAC (sales leader, scoring force-multiplier / commercial brain / coachability); Christopher = Sr CE (technical depth: DOM, selectors, install, dev tools). Prep them differently.
- **Sales answers restructured to CARL** (Context/Action/Result/Learning) on the 9 real story questions only; left non-story answers (opener, process, forward-looking, why-Pendo, technical background) as direct responses because forcing CARL on them feels canned.
- **Both HTML docs stripped to pure interview Q&A** (question + response), removing coaching/meta (scoring framing, checklists, win-moments, delivery notes, standalone ⚠️ guardrails). Then the **technical** doc had depth restored (structured install breakdown, spec followed/diverged lists, selector-type table) after Niroo said it was too stripped, while keeping it filler-free.
- **Guardrails folded into answer wording rather than left as standalone coaching** (e.g. the Clerk/auth honesty correction now lives inside the response text).
- **Two separate thank-you emails, not one group send** — each interviewer remembers a different conversation; tailoring shows presence in both.
- **Email artefact attachment by lens:** 30-60-180 plan → Benjamin (commercial/ramp); Pendo micro demo → Christopher (technical).
- **Pre-interview emails sent before the calls** with "worth a quick look before we chat" framing (Niroo rejected anything that sounded optional, and kept the opener generic: "Looking forward to speaking with you at [time]").
- **Perry mention included in Benjamin's email** but flagged conditional (only if Perry confirmed; "on your team" only if Benjamin is confirmed his manager).
- **/compress run without AskUserQuestion** (unavailable) — honoured explicit args "all pendo": all sections preserved, topic derived.

## Key Learnings
- **Benjamin Weldon came to Pendo from WalkMe** (Pendo's most direct DAP competitor). The WalkMe-vs-Pendo question doubles as competitive intel for the CE role. Core difference: Pendo = analytics-born, product-led, lightweight single-app snippet, sells to PMs; WalkMe = guidance/adoption-born, IT-led overlay across enterprise apps (Salesforce/Workday/SAP), automation focus, heavier services. WalkMe acquired by SAP (~2024/25); Pendo still independent, leaning into AI (Agent Analytics, Novus).
- **Benjamin's framing in the actual interview** (per Niroo's thank-you edits): APAC as an emerging region growing ~30% YoY; Pendo getting ready for the shift to agentic AI. These became the thank-you anchor points.
- **Christopher's round centred on pre-sales vs post-sales** and resolving the day-to-day issues of owning both (the merged-role reality) — that became the thank-you focus.
- **Lumen Health install detail (real):** 3 components wired via `providers.tsx` — `pendo-snippet.tsx` (agent + initialize, env-gated on `NEXT_PUBLIC_PENDO_API_KEY`, typed `Window.pendo`), `pendo-page-tracker.tsx` (`usePathname()` + `pendo.pageLoad()` on every App Router route change), and `data-pendo-id` hooks (`nav-<route>`, `open-visit`, `ask-question`). Demo visitor layer = synthesized 8-person AU/NZ `PATIENT_ROSTER` via `sessionStorage`, `is_demo_user` flagged.
- **Clerk has been REMOVED from Lumen Health.** Earlier prep wrongly stated "the app uses Clerk" in present tense. Corrected everywhere to the conditional production pattern: "in a real install you'd pull the real visitor ID from your auth provider (e.g. Clerk's `useUser()`)" — the app does not currently ship an auth layer.
- **Honest framing of the AI Setup Assistant run:** it handled the mechanical layer (framework/loader/types/env); Niroo improved on it in two spots (App Router `<Script>` loader, `usePathname` pageLoad) and *deliberately overrode* the identity layer (synthetic roster instead of real auth) for demo realism. Do NOT claim "it auto-detected everything."
- **Story reuse risk:** inforcer story now appears in 3 sales answers (partnering, disagreement, demo-under-pressure); Phocas MYOB and Melbourne Airport each twice. Flagged: lead the second telling with "same deal, different angle."
- **Niroo's punctuation rule (memory):** no em dashes / double hyphens in any candidate-facing docs. Applied throughout (emails, Notion page, both HTMLs).

## Solutions & Fixes
- **House-style HTML:** reused the existing `pendo-next-round-sales-and-technical.html` CSS (shadcn/Tailwind via CDN, sticky nav, `.card`, `.badge`, `.quote`, tables). Added a `.carl` block + colour-coded C/A/R/L label chips for the sales doc.
- **CARL labels:** blue Context, navy Action, green Result, amber Learning.
- **Thank-you email finals** (concise, em-dash-free) — Benjamin anchored on 30% YoY APAC + agentic AI readiness + WalkMe/Pendo; Christopher anchored on pre vs post-sales and day-to-day resolution. Both attach their lens-matched artefact.

## Files Modified
- `interview-prep/pendo-benjamin-weldon-sales-cross-functional.md`: NEW earlier in session — full sales prep (scoring, opener, all Notion-doc questions, tiered questions-to-ask, checklist). Later superseded as the live reference by the HTML.
- `interview-prep/pendo-benjamin-weldon-sales-cross-functional.html`: NEW then rebuilt twice — (1) full prep, (2) stripped to pure Q&A, (3) story answers restructured to CARL. Includes the WalkMe-vs-Pendo question at top of questions-to-ask.
- `interview-prep/pendo-christopher-mahoney-technical-cram.html`: NEW then rebuilt — pure Q&A, then depth restored (structured Lumen install breakdown + load-order note, AI Setup Assistant followed/diverged lists, selector-type reference table, console/sandbox tables, debug playbook). Clerk corrected to conditional auth-provider framing.
- Notion page **"Sales Cross-Functional Round, Benjamin Weldon (Thu 11 Jun)"** created under existing **Pendo** page (id `3769176c-75f9-8055-bcf5-c4a81e9f80f5`); URL `https://app.notion.com/p/37a9176c75f9815ab5f6f40a7656c19c`. Em-dash-free full prep.
- No tracker/report edits this session (status already `Interview`).

## Setup & Config
- Project root: `/Users/niroo/Documents/GitHub/career-ops`. career-ops up-to-date at v1.8.1.
- Interview schedule (11 Jun 2026, AEST): 12:45–1:15 Benjamin Weldon (Sales Cross-Functional); 1:15–2:00 Christopher Mahoney (Technical Depth & Discovery).
- Sandbox: `https://crm.pendoexperience.io/` (acmeCRM, MUI+Emotion, Pendo agent v2.327; anchors `#add-new`/`#profile-button`; traps `:rj:` useId + `css-` Emotion hashes).
- Lumen Health: `lumen-health-niroo.vercel.app` · `github.com/kneeroo/Lumen-Health`. Next.js 16 App Router. Pendo AI Setup Assistant prompt: `github.com/pendo-io/ai-setup-assistant/blob/main/claude-prompt`.
- Notion MCP available (create-pages, search). AskUserQuestion NOT available.

## Pending Tasks
- **Niroo:** send the two thank-you emails (swap `[link]` placeholders for real URLs; add one real specific per call if a moment stood out).
- **Niroo:** before any further round, ground the still-soft answers with real specifics — the "unqualified deal" example, the "constructive feedback" example, the "demo under pressure" moment, and sanity-check the inforcer commercial-close story against the actual deal.
- **Niroo:** confirm Perry was OK being named (if Benjamin's email referencing him was sent) and whether Benjamin is actually Perry's manager.
- **Optional sync:** the Clerk-removed correction + Lumen install detail were applied to the technical HTML; the source markdown (`pendo-next-round-sales-and-technical.md`) and story-bank Lumen entry still carry the older "uses Clerk" framing — sync if consistency matters.
- **Nothing committed** — all new prep files + Notion page are working changes.

## Errors & Workarounds
- **`/compress` AskUserQuestion unavailable** → honoured explicit args ("all pendo"): preserved all sections, derived topic name `pendo-interview-day-two-rounds`, no interactive prompts.
- **HTML over-stripped** when Niroo asked to remove filler → fixed by restoring structured technical depth (install breakdown, spec lists, selector table) while keeping coaching/meta out.
- **Stale "app uses Clerk" claim** (Clerk since removed) → rewrote all three spots in the technical HTML to conditional production-pattern framing.
- **Email tone "optional"** rejected by Niroo → reworded the share line to "Worth a quick look before we chat, it'll give you a feel for how I work and a head start on the conversation."

## Key Exchanges
- `/resume pendo` → loaded context: through HM (Hiltsje), two interviews to schedule, Boomi prioritised over Pendo, sandbox + story-bank + AE-partnership story already in place.
- Niroo pasted recruiter email + Notion question bank → built the Benjamin sales prep (reframed for a VP sales leader, not a peer SE).
- "did you prep for all the questions" → filled the gap (PreSales Leader: Technical Expertise, Sales Skills, Problem-Solving blocks).
- "prep for these as well" (Questions You Should Ask) → tiered question set adapted CE-not-SE, with WalkMe question added later.
- "add to a notion page... remove all em dashes" → created Notion subpage under Pendo, fully de-dashed.
- Email thread: redo follow-up as two pre-interview emails → concise → non-optional share line → generic opener → Perry mention → review.
- `/career-ops interview prep` (technical) → cram sheet, then turned both into HTML, then added the real Lumen install + AI Setup Assistant spec comparison, then the Clerk-removed correction.
- "use CARL method for the sales interview" → restructured the 9 story answers to labelled C/A/R/L.
- "thank you email for both" → concise finals; Benjamin anchored on 30% YoY APAC + agentic AI + WalkMe/Pendo; Christopher on pre vs post-sales day-to-day resolution.

## Custom Notes
None (args were "all pendo" — all sections preserved, topic derived without interactive prompts).

---

## Quick Resume Context
Niroo had both Pendo Senior Customer Engineer ANZ interviews on 11 Jun 2026: Benjamin Weldon (VP Enterprise Sales APAC, sales cross-functional, 12:45) and Christopher Mahoney (Sr CE, technical depth & discovery, 1:15). This session produced the complete prep: a Notion page + two em-dash-free house-style HTML docs (`interview-prep/pendo-benjamin-weldon-sales-cross-functional.html` with sales stories in CARL format; `interview-prep/pendo-christopher-mahoney-technical-cram.html` as rich technical Q&A), pre-interview and thank-you emails for both, a WalkMe-vs-Pendo question + briefing, and the real Lumen Health Pendo install detail (Clerk removed → corrected to conditional auth-provider framing). Next: Niroo sends the thank-you emails (swap link placeholders); grounds the four still-soft story answers with real specifics; optionally syncs the Clerk correction into the source markdown + story-bank. Nothing committed.

---

## Raw Session Log

**Session opened with `/resume pendo`** — ran update check (up-to-date v1.8.1), loaded the 3 Pendo session logs. Reported: through HM Hiltsje, next round = two interviews, Boomi prioritised but Pendo kept warm, sandbox + story-bank + new AE-partnership STAR+R in place, tracker row 8 = Interview, nothing committed.

**User:** `/career-ops interview-prep` with the Thursday 12:45 Benjamin Weldon (VP Enterprise Sales APAC) interview details + a Notion question bank (SE Sales Leader Interviews: Partnering with AEs, Sales Focus, Cultural Fit, Performance Consistency, Adaptability/Coachability; PreSales Leader Interviews: General, Technical Expertise, Sales Skills, Problem-Solving, Industry Knowledge).
**Assistant:** Read interview-prep mode, the existing next-round prep doc, story-bank, profile, cv.md. Built `interview-prep/pendo-benjamin-weldon-sales-cross-functional.md` reframed for a VP sales leader (3 scoring axes: force multiplier / commercial brain / coachability), with opener, every Sales-Leader-block question answered via real stories (inforcer, Melbourne Airport, Phocas MYOB, Lumen build), commercial vocab, tiered questions-to-ask, checklist, win-line, and ⚠️ flags for answers needing real grounding.

**User:** "did you prep for all the questions I included?" (re-pasted full Notion doc).
**Assistant:** Honest gap acknowledgement — had covered the Sales Leader block + 3 General; added the missing PreSales Leader blocks (Technical Expertise ×2, Sales Skills ×2, Problem-Solving ×2), noting Industry-Knowledge ones were already answered elsewhere. Flagged story-reuse watch-out.

**User:** "prep for these as well" (Questions You Should Ask — General + Sales Leader lists).
**Assistant:** Replaced the questions section with a tiered set (Tier 1 lead / Tier 2 backups / Tier 3 diligence-disguised), adapted CE-not-SE and framed for APAC enterprise revenue, with delivery notes.

**User:** "turn this md into a html file... as well as the Sales Cross-Functional Round, Benjamin Weldon page we created."
**Assistant:** (Interpreted as: create Notion page + HTML.) Searched Notion, found existing **Pendo** page, created subpage "Sales Cross-Functional Round, Benjamin Weldon (Thu 11 Jun)" — full prep, all em dashes removed. URL `app.notion.com/p/37a9176c75f9815ab5f6f40a7656c19c`.

**Email thread:**
- **User:** "help me redo this email for the next 2 interviews I have today" + the original Hiltsje follow-up + recruiter context (two interviews: Benjamin Weldon Sales Cross-Functional, Christopher Mahoney Technical Depth & Discovery).
- **Assistant:** Drafted two tailored thank-you/follow-up emails (Benjamin = commercial, Christopher = technical), advised dropping the "I've applied / when will recruiter contact" lines for peer interviewers.
- **User:** "I would like to send right now before the call."
- **Assistant:** Pre-interview versions (share artefacts ahead of the calls).
- **User:** "reword this: No need to review beforehand..." → "nah i don't like it sounding optional" → settled on "Worth a quick look before we chat, it'll give you a feel for how I work and a head start on the conversation."
- **User:** keep the opener lines generic → "Looking forward to speaking with you at 12:45 / 1:15."
- **User:** "redo the emails" → final pre-interview emails for both.
- **User:** "also mention that you also spoke to Perry yesterday as well to benjamin" (+ guidance to confirm Benjamin is Perry's manager and that Perry is OK being named).
- **Assistant:** Added a brief Perry sentence to Benjamin's email, flagged the two conditionals.
- **User:** "review this" (Benjamin email) → flagged the missing hyperlink on the 30-60-180 bullet + Perry caveats.
- **User:** "provide the second email for christopher" → done.

**User:** `/career-ops interview prep` (technical round JD: client-side solutions, DOM, selectors, install script, tagging Features & Pages, Pendo Microdemo, dev tools, `crm.pendoexperience.io`).
**Assistant:** Delivered a high-yield technical cram sheet (DOM in plain English, selectors + why they break, Pages vs Features, install script, microdemo/retroactive capture, console commands to type from memory, debug playbook, sandbox specifics + kill line, tagging loop, last-20-min drill).

**User:** "turn this md into a html file... as well as the Benjamin page."
**Assistant:** Read existing house-style HTML, built both `pendo-benjamin-weldon-sales-cross-functional.html` and `pendo-christopher-mahoney-technical-cram.html` (shadcn/Tailwind, sticky nav, em-dash-free).

**User:** "include this information about how I installed pendo in Lumen Health using the AI prompt" (detailed real install breakdown).
**Assistant:** Added Section 0 "How you installed Pendo in Lumen Health" to the technical HTML (4 pieces + load-order caveat).

**User:** more detail — the AI Setup Assistant spec comparison (followed vs deliberately off-script; Clerk auto-detect bypassed for synthetic roster).
**Assistant:** Added "Followed the spec, and deliberately went off-script" subsection + an honest "how to say it" line + honesty guardrail.

**User:** "I have removed clerk login but assume if i were to use it, it would grab the user ids from here. double check if the html includes this."
**Assistant:** Found the stale present-tense "app uses Clerk"; corrected all three spots to conditional production-pattern framing ("in a real install you'd pull the real user ID from your auth provider like Clerk"); updated the guardrail to note the app ships no auth layer.

**User:** "make sure both html remove filler content and only contain interview response questions."
**Assistant:** Rebuilt both HTML as pure Q&A. Benjamin: opener + 19 behavioural Q&As + 8 questions-to-ask, all coaching/meta removed. Christopher: 10 Q&As phrased as interviewer prompts (install, vs-assistant, DOM, selectors, pages/features, install script, capturing analytics, verify install, debug a guide, tag a feature) with console/sandbox tables inside responses.

**User:** "i would like to ask Benjamin about his experience at WalkMe and what do you see as the key differences between Pendo and WalkMe."
**Assistant:** Added the WalkMe-vs-Pendo question to the top of Benjamin's questions list + a full Pendo-vs-WalkMe briefing (origin/DNA, product differences, SAP acquisition context, how to use his answer as competitive positioning, cautions).

**User:** "i would like abit more details on the technical html, it is too stripped down... liked the only version but without the filler content."
**Assistant:** Restored depth on three sections (kept filler out): the install Q (architecture table + 4-piece bullets + load-order note), the vs-assistant Q (followed/diverged bullet lists), the selectors Q (selector-type reference table).

**User:** "use the CARL method for the sales interview" (C/A/R/L definitions).
**Assistant:** Rebuilt the sales HTML with colour-coded CARL blocks on the 9 real story answers (partnering, disagreement, improved-process, exceeded-expectations, technical-problem, constructive-feedback, demo-under-pressure, specific-requirement, communicating-value, unhappy-client); left non-story answers as direct responses; flagged the duplicate-story overlap.

**Thank-you email thread:**
- **User:** "help me draft a thank you email for both" + template.
- **Assistant:** Two tailored thank-you emails with bracketed real-specific placeholders.
- **User:** "keep it concise" → tightened both to ~4 lines.
- **User:** "focus on the 30% year on year growth in APAC as an emerging region and getting ready for the agentic AI" (+ a reworded WalkMe line).
- **Assistant:** Benjamin thank-you anchored on 30% YoY APAC emerging region + agentic AI readiness + WalkMe/Pendo; fixed typos.
- **User:** "focus chris about the discussions around post vs pre sales and how to go about resolving the day to day issues."
- **Assistant:** Christopher thank-you refocused on pre vs post-sales and resolving the day-to-day issues of owning both; kept micro demo attached.

**User:** `/compress all pendo` → this log (AskUserQuestion unavailable; all sections preserved per explicit args).
