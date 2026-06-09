# Session Log: 03-06-2026 17:27 — Artur Technical Round (DONE) + Demo Stage Prep + Thank-You Outreach

## Quick Reference (for AI scanning)
**Confidence keywords:** boomi, artur-gaffanov, technical-round-done, went-well, demo-stage, informal-next-step, presales-solutions-consultant, commercial-anz, integration-is-the-core, boomi-artur-technical-round-html, boomi-integration-prep-html, recommended-training-paths, december-2025-chart, learning-path-corrected, 30-60-180-plan, pptx-amend, boomi-university, integration-essentials, associate-integration-developer, professional-integration-developer, professional-api-design, professional-api-management, using-ai-agents-boomi-answers, building-an-ai-agent-with-agentstudio, boomi-world-2026, data-activation, agentstudio, boomi-connect, boomi-companion, knowledge-hub, meta-hub, orchestrate, distributed-agent-runtime, mcp, 75000-agents, 30000-customers, partner-enablement, partner-ambassador-program, gsi, sfdc-dev-account, salesforce-demo, supabase, wop, mitch-howard, richard-yang, dell-split, thank-you-email, linkedin-dm, niroo-arjuna
**Projects:** career-ops, Boomi Presales Solutions Consultant — Commercial (ANZ)
**Outcome:** Artur Gaffanov technical round happened and **went well — Artur informally said he's looking forward to a demo (next stage hinted, NOT formally confirmed).** Session built the Artur prep doc, corrected the certification learning path across the markdown plan + the PPTX using Boomi's official Recommended Training Paths chart, refreshed the integration-prep doc to current World-2026 messaging, added partner-enablement questions, and drafted thank-you messages to Artur + the two peers (Mitch Howard, Richard Yang).

## Decisions Made
- **Built a dedicated Artur prep doc** (`boomi-artur-technical-round.html`, 12 sections) as the round-specific overlay; kept `boomi-integration-prep.html` as the deep technical reference. The two are companions, opened side-by-side.
- **Corrected the Boomi University learning path** everywhere using the official Dec-2025 Recommended Training Paths chart (community.boomi.com file-asset, a PNG). The real ordered ladder for an SC: Getting Started → Integration Essentials → Associate Integration Developer (Associate Developer Cert) → Professional Integration Developer (Professional Developer Cert) → Professional API Design → Professional API Management; Boomi AI branch = Using AI Agents: Boomi Answers → Building an AI Agent with Agentstudio; Associate Integration Architect as stretch.
- **Killed the invented course names** that David flagged as incorrect: "Professional Developer path", "AgentStudio Fundamentals", "APIM Essentials", "Boomi Advanced Developer", "AgentStudio Advanced", "Boomi Professional Architect", "Boomi Agents: Design and Control", "API Control Plane", "Associate Runtime Architect" (for the API spine). None are real Boomi University names for this track.
- **Amended the .pptx in Downloads** (slides 3/4/5) to the correct ordered path, index-based XML edits to dodge duplicate course strings in success-metric blocks. User re-exported a `(1)` version that was confirmed correct; three residual spacing typos noted (c ertifications, vertica l, P lan).
- **De-David'd the integration-prep doc** and re-pointed it at Artur (peer round, not HM probe). Updated 20,000→30,000 customers and refreshed the AI sections to World-2026 (Boomi Connect GA, Knowledge Hub, Meta Hub, Orchestrate, Distributed Agent Runtime, 75k agents, 300k MCP endpoints) — including **Boomi Companion** per user's explicit ask.
- **Partner-enablement question set added** to the Artur doc (§10) after the steer that Artur lists partner enablement; led with the suggested "From an SC perspective, how involved are SCs in enabling partners?" question + a partner-ecosystem fact box (GSIs, 500+ joint engagements, Partner Ambassador Program, ServiceNow May-2026 partnership).
- **Thank-you framing: do NOT claim the final/demo stage** — Artur only mentioned the demo informally, so all thank-you messages hedge ("he mentioned/hinted he'd like to see a demo, so fingers crossed") rather than asserting a confirmed next stage.
- **Demo plan anchored on Richard's advice:** build a working integration (SFDC Dev account, create a Salesforce record from another source), articulate value/why-how throughout (the pre-sales bar), not just demonstrate tech. Candidate source: Niroo's own Supabase/WOP (authentic) or a Sheet/CSV (reliable). Demo build NOT started yet.

## Key Learnings
- **The community.boomi.com "December_20251" link is an image (PNG)**, not text — WebFetch returned binary; had to Read the saved PNG to extract the Recommended Training Paths chart.
- **Boomi World 2026 (May) launches to know:** Boomi Connect (GA, MCP layer to Claude/Copilot/Gemini, 1,000+ MCP tools), Boomi Companion (natural-language integration build — the agentic-engineering piece), Boomi Orchestrate, Knowledge Hub, Meta Hub, Distributed Agent Runtime, Agent Control Tower. Numbers: 75,000+ agents in production, 300,000+ MCP endpoints, 30,000+ customers, 800+ partners. Boomi World Tour Sydney = 1–2 Sept 2026, theme "ACCELERATE".
- **Mitch Howard's pre-interview advice predicted the round exactly:** a blend of connectivity fundamentals + the full Boomi story (AI/data management beyond connectivity) + Artur getting to know Niroo as a person. Boomi Training portal fundamentals = scored "investment in learning" signal.
- **Artur Gaffanov: technical, knowledgeable, friendly** (confirmed by both peers). He framed **integration as the core** — everything else (agentic, data management, AI) sits on top of getting connectivity right. He also talked about Boomi feeling like a **startup since the Dell split**, now with more structure.
- **The runtime/Atom placement answer** (local Atom behind the firewall, outbound to control plane, no inbound holes) was the key on-prem story missing from the integration-prep doc — now covered in the Artur doc §3.

## Solutions & Fixes
- **PPTX edit pipeline:** `unzip` the .pptx → edit `ppt/slides/slideN.xml` `<a:t>` runs by index (Python re.sub with a counter to avoid hitting duplicate course strings) → repackage with `[Content_Types].xml` first then the rest → overwrite, with a `.bak` backup. `unzip -t` validated integrity.
- **Integration-prep refresh:** Grep'd all "David"/"20,000" occurrences (9 + 1), replaced via targeted Edits; added World-2026 content to §15/§16 and new cheat-sheet rows (§19) for Companion/Connect/Orchestrate/Knowledge+Meta Hub/data activation.
- **LinkedIn fetch blocked** (HTTP 999) — expected; used WebSearch for Boomi partner-ecosystem facts instead.

## Files Modified
- `interview-prep/boomi-artur-technical-round.html` — NEW. 12-section round overlay (strategy, Artur profile/rapport, connectivity fundamentals, runtime/Atom, full 2026 story, World Tour, live design, talk-about-yourself, project deep-dives, honesty trade, partner-enablement question set + fact box, cheat lines, day-of checklist).
- `interview-prep/boomi-integration-prep.html` — de-David'd (now Artur peer-round framing), 20k→30k customers, §15/§16 refreshed to World-2026 incl. Boomi Companion, §19 cheat rows added.
- `interview-prep/boomi-30-60-180-impact-plan.md` — certification ladder corrected to the official path across all phases + new Appendix table citing the Dec-2025 chart and flagging the fake course names.
- `~/Downloads/Niroo Arjuna_ 30-60-180+ Plan_ ... (Boomi).pptx` — slides 3/4/5 course names/order corrected (original backed up to `.pptx.bak`). User later re-exported a `(1).pptx` version, reviewed and confirmed correct (3 residual spacing typos noted, not fixed).

## Setup & Config
- **Boomi University progress:** Getting Started complete; Integration Essentials in progress (highest-leverage tonight-before-interview task).
- **SFDC Developer account** (free) = the demo-build starting point per Richard.
- **Demo source options:** Supabase/Postgres (WOP, authentic) or Google Sheet/CSV (reliable). Target: Salesforce Dev org, create a Contact/Lead record.

## Pending Tasks
- **BUILD THE DEMO** — not started. Working Boomi integration: source → create a Salesforce record. Wrap in a value narrative (problem → build → business outcome), include error/idempotency path ("not just the happy path"). Wait for formal demo-stage confirmation before going all-in, but a head start is low-risk.
- **Wait for formal next-stage confirmation** — Artur's demo mention was informal; don't assume.
- **Send the thank-you emails:** Artur (brief, integration-anchored, Dell-split nod, looking-forward-to-demo); LinkedIn DMs to Mitch Howard + Richard Yang (hedged on the demo stage, credit their specific advice).
- **Commit the uncommitted Boomi prep files** (still not committed).
- **Optional:** fix the 3 PPTX spacing typos (c ertifications / vertica l / P lan).
- **Carry-over (still open):** earlier .pptx spell/grammar fixes; refresh the AI-queryable portfolio context before anyone clicks through.

## Errors & Workarounds
- **AskUserQuestion still unavailable** (ToolSearch `select:AskUserQuestion` → no match) — fell back to plain-text Q&A for /compress, as in prior sessions.
- **WebFetch on the Boomi community link returned a 2MB PNG**, not HTML — worked around by Reading the saved image to extract the training-path chart.
- **LinkedIn profile fetch = HTTP 999** — worked around via WebSearch for partner-ecosystem context.

## Key Exchanges
- User found the official Recommended Training Paths chart → drove correction of the learning path across the md plan, then the PPTX; David had flagged the original certs as "slightly incorrect".
- User fed peer intel (Mitch Howard's pre-interview advice; Richard Yang's demo advice) → shaped prep + thank-you messages.
- Post-interview: "went well, Artur looking forward to the demo informally" → user explicitly asked NOT to claim the final stage yet → all outreach reworded to hedge.
- Iterated the Artur thank-you down to a brief version (integration core + Dell-split nod + looking-forward-to-demo) and drafted matching LinkedIn DMs to both peers.

## Custom Notes
None. (User confirmed: related to the technical interview; prepend in addition to the existing Boomi log per the separate-by-employer rule.)

---

## Quick Resume Context (latest Boomi state — 03-06-2026)
**Artur Gaffanov technical round is DONE and went well. Artur informally mentioned he's looking forward to a demo — next stage hinted but NOT formally confirmed, so don't claim the final stage yet.** Two prep docs are current: `boomi-artur-technical-round.html` (round overlay) and `boomi-integration-prep.html` (deep technical, now refreshed to World-2026 incl. Boomi Companion). The 30/60/180 plan (md + the `(1).pptx`) now uses Boomi's official learning-path ladder. Thank-you messages drafted for Artur + Mitch Howard + Richard Yang (all hedged on the demo stage). NEXT: build the pre-sales demo per Richard's steer — a working Boomi integration that creates a Salesforce record from another source (SFDC Dev account + Supabase/WOP or a CSV), wrapped in a value/why-how narrative. Demo not started; can head-start while awaiting formal confirmation.

---
# Session Log: 28-05-2026 (later) — Boomi vs Pendo Comparison + "Which is the better company"

## Quick Reference (for AI scanning)
**Confidence keywords:** boomi, pendo, comparison, boomi-vs-pendo, better-company, ipaas, customer-engineer, pre-sales-se, david-irecki, hiltsje-smilde, artur-gaffanov, agentstudio, rivery, relocation, bandwidth-allocation, north-star, SE-archetype, niroo-arjuna
**Projects:** career-ops, Boomi Presales SE (ANZ), Pendo Sr Customer Engineer (ANZ)
**Outcome:** Built a side-by-side Boomi vs Pendo comparison (saved as `reports/comparison-boomi-vs-pendo-2026-05-28.md`) and then answered the separate "which is the better company to work for" question. Conclusion both times: **Boomi is the priority AND the better company/strategic next step**, Pendo stays warm as the strongest secondary play.

## Decisions Made
- **Boomi = priority this week, Pendo = keep warm.** Bandwidth split: ~70% Boomi, ~20% Pendo, ~10% Salesforce form-filling + Oscar Figma DM.
- **Boomi is the better COMPANY too** (separate from funnel position): stronger market position (Gartner iPaaS MQ Leader, ~$500M+ ARR vs Pendo ~$200M in a more contested category), active agentic-AI platform expansion (AgentStudio + Rivery + Thru), likely IPO in 12-24 mos (PE-owned TPG/Francisco Partners), and David Irecki's 11-yr first-APJ-SC→CTO/SE-leader arc is the strongest "people grow here" signal in the whole pipeline.
- **Pendo wins on:** role autonomy (first-few in ANZ, shape the playbook), product-led culture (better setup if Niroo ever pivots toward PM/SA), hybrid pre+post-sales scope (rounds out skillset faster), and brand cachet among PMs/designers.
- **Deciding logic: "great Pre-Sales SE" vs "great CE/SA".** Niroo's last 12 months (WOP, Lumen Health, AI portfolio, inforcer M365 year) is a clean SE trajectory, so Boomi extends the thesis; Pendo would slightly muddy it by pulling toward post-sales ops.
- **If both offer same week → pick Boomi** unless Pendo total comp is 15%+ higher AND Niroo is genuinely energised by the hybrid CE role.

## Key Learnings
- **Funnel position:** Boomi is post-HM (David Irecki, 27 May, went well; verbal next-round with Artur Gaffanov) — the strongest single signal across both pipelines. Pendo is post-HM (Hiltsje, 18 May, went well) but recruiter scheduling is still pending.
- **Comp:** Boomi (Sr Pre-Sales SE at iPaaS) ~AUD 200-260K OTE likely higher than Pendo (Sr CE/TAM hybrid) ~AUD 180-230K — CE bands trend below pure SE.
- **Relocation:** Boomi = Sydney OR Melbourne (none needed). Pendo = Sydney 3 days/week (relocation required). Material acceptance-friction difference.

## Files Modified
- `reports/comparison-boomi-vs-pendo-2026-05-28.md` — new. Full side-by-side, "why Boomi takes priority", "why Pendo doesn't get dropped", this-week to-dos, decision logic if both land.

## Custom Notes
**User instruction (durable): logs SEPARATED BY EMPLOYER; prepend new info on top of existing.** The Boomi-vs-Pendo comparison touches both employers, so this same block is prepended to BOTH the Boomi log and the Pendo log. The earlier 28-05 Boomi HM-interview block remains below this one.

---

## Quick Resume Context
Boomi vs Pendo settled: Boomi is the priority and the better company/strategic next step (clean Pre-Sales SE archetype, no relocation, stronger market/AI position, David Irecki growth signal, higher comp band, further along the funnel). Pendo stays warm as the strongest secondary play (4.2/5, hybrid pre+post-sales, product-led culture). Full analysis in `reports/comparison-boomi-vs-pendo-2026-05-28.md`. Bandwidth: ~70% Boomi this week.

---

## Raw Session Log
*(Boomi-vs-Pendo comparison + "which is the better company" portion of the 28-05-2026 conversation. Comparison report generated, then a separate qualitative company-vs-company answer. Full conversation in main transcript.)*

---
---

# Session Log: 28-05-2026 — Boomi HM Interview (DONE) + Artur Technical Round Prep

## Quick Reference (for AI scanning)
**Confidence keywords:** boomi, david-irecki, hm-interview-done, moved-forward, artur-gaffanov, senior-solution-consultant, technical-round, peer-interview, brisbane, thank-you-email, integration-prep, boomi-integration-prep-html, hm-david-irecki-html, boomi-university, getting-started, integration-essentials, control-plane, ga-generally-available, insider-intel, technical-honesty, integration-tools-probe, 6-plus-years, ae-sc-ratio, deal-cycle, career-arc-question, apprehensive-closer
**Projects:** career-ops, boomi-presales-solutions-consultant-commercial-anz
**Outcome:** HM interview with David Irecki happened and **went well — Niroo is moving forward to a technical round with Artur Gaffanov (Senior Solution Consultant, Brisbane, 4yrs 8mo at Boomi)**. This session covered: 12+ surgical edits to the HM prep HTML based on career coach + insider intel, creation of a new integration-prep companion doc, training credentials integrated throughout, thank-you email to David drafted and tightened.

## Decisions Made
- **HM prep doc reframed around insider intel from ex-colleague**: David values technical depth over Presales polish, is direct and rewards honesty, will probe specifically on integration tools used. Added a new top-of-doc ★ card ("Insider intel on David") to anchor the whole prep strategy around this.
- **Integration prep separated into its own file** rather than bloating the HM prep doc. 19-section study guide built as `boomi-integration-prep.html` covering iPaaS/ESB, integration patterns, API styles, auth, APIM/Federated APIM, ETL/ELT/CDC, MDM, MFT, reliability, MCP, AgentStudio technical fit, live design frame, project deep-dives, and a 24-term cheat sheet.
- **Headline story rewritten** to remove invented Deloitte reference. Now grounds in Phocas → UbiPark → inforcer with real customers (Monash Health, Melbourne Airport, Charter Hall). Also added Boomi University training (Getting Started complete + Integration Essentials halfway) as proactive ramp signal.
- **Lost-deal story replaced** with user's real CARL-format inforcer MSP/ANZ bug escalation story from their own prep notes.
- **"Why are you leaving?" rewritten** to honest redundancy framing (not "outgrown integration-only conversation" fluff). Names the inforcer restructure, doesn't dwell, forward-looking to Boomi.
- **Questions-to-ask rewritten** based on coach feedback:
  - REMOVED: "What's the hardest thing about the role you wish someone had told you?"
  - ADDED: Personal-arc question on David's 11-year journey at Boomi (first APJ SC → Senior Mgr → Director → CTO APJ) — invites mentorship reflection
  - REPLACED: "When do SCs typically get involved" → "What does a typical deal cycle look like at Boomi, and where do SEs spend most of their time (discovery, demos, POCs, pilots)?"
  - REORDERED: AE/SC ratio question bolded and moved above the deal cycle question
  - REWORDED closer: "Is there anything from this conversation that's left you with a doubt about my fit?" → softer "Is there anything you're apprehensive about — either with my experience or my fit for this role?"
- **"5+ years" → "6+ years"** unified across the HM prep HTML to match the 30/60/180 deck. CV still says 5+ but user opted not to change it.
- **Scripted lines added** for all 4 "what David wants to see" signals (2026 story, respect the core, acquisition logic, AE partnership) — table previously gave guidance but no actual sentences.
- **Three coach-flagged signals** woven into Section 2: technical updates, mentoring, learning new technologies — each with how-to-land-it script.
- **Boomi University training threaded through 5 places** in HM prep doc (headline, TMAY, "keep up with roadmap" answer, "learning new tech" signal, "things to avoid").
- **Post-interview thank-you to David**: rejection-template ruled out (mismatched situation), Sloan Kettering-style thank-you template used instead. Final version tightened to ~5 sentences, anchored on David's team/mentorship answer (which was the highlight of the actual conversation per Niroo's report). Killed earlier drafts referencing AgentStudio/MCP framing because that topic actually didn't come up much in the live interview.

## Key Learnings
- **David's actual interview screening priorities (insider-confirmed)**: technical experience > Presales polish; direct + open; will probe integration tools used. This inverted the default Presales prep playbook.
- **The honesty trade with David**: when probed on a gap (e.g. "have you used iPaaS in production?"), the winning answer is "haven't done that — adjacent is X — way I'd ramp is Y." Bluffing loses, hedging loses, honest gap + ramp plan wins.
- **GA = Generally Available**: term Niroo didn't recognise; means product is past beta, sold + supported at scale. Critical for the "AgentStudio is GA, MuleSoft Topic Center is still positioning" line.
- **Control plane = the layer where you design/deploy/govern/observe, separate from where the work runs.** Air traffic control tower analogy (tower vs planes) works for live explanation. Three-layer architecture: control plane / data plane / management plane.
- **Artur Gaffanov profile**: Senior Solution Consultant at Boomi, ~4yrs 8mo (since Oct 2021), Brisbane. Self-described SME on Boomi platform, runs discovery/demos/POCs, partners with account teams, evangelises in Boomiverse community. This is a peer technical round — expect deeper platform questions, live architecture/design, possible demo-craft probe, war-story exchange.
- **Niroo's career arc question landed**: David's 11-year arc question was confirmed as the actual highlight of the interview — the personal/mentorship angle worked. Thank-you email anchored on it deliberately.
- **AgentStudio/MCP topic did NOT come up heavily in the live interview** despite being core to the prep. Don't assume next-round topics from this-round prep — Artur may go entirely different directions.

## Solutions & Fixes
- **AskUserQuestion not available again** — fell back to plain-text Q&A for /compress (same as last session). ToolSearch `select:AskUserQuestion` returns "No matching deferred tools found".
- **Resume PDF re-read** to correct invented Deloitte reference — confirmed real arc: Phocas Software (Feb 2021 - Oct 2023, BI Implementations) → UbiPark (Nov 2023 - Nov 2025, Product Specialist) → inforcer (Dec 2025 - Apr 2026, Pre-Sales Engineer).
- **Pendo follow-up resolved positively**: Hiltsje replied to the Friday email — Tuesday nudge never needed. (Separate Pendo log file for that detail.)

## Files Modified
- `interview-prep/boomi-hm-david-irecki.html` — created from scratch this session, then 12+ iterative edits across the day. Final structure: 16 sections (was 14) with two new ★ sections (Insider intel on David, Integration tools probe). Sticky-nav HTML, print-friendly, designed for live use during the call.
- `interview-prep/boomi-integration-prep.html` — NEW. 19-section technical study guide built as companion to HM prep. Covers integration fundamentals through to AgentStudio technical fit + live design framework + 24-term cheat sheet.

## Setup & Config
- **Niroo signed up for Boomi University** ahead of HM interview:
  - ✓ Completed: `Getting Started with the Boomi Platform`
  - ◐ In-progress: `Integration Essentials` (halfway through)
- These were woven into the HM prep doc as proactive-ramp evidence

## Pending Tasks
- **Prep for Artur Gaffanov technical round** — formal email/scheduling not yet received, just verbal mention from David at end of interview. When it lands, build dedicated Artur prep doc with: deeper Boomi platform Q&A, live architecture/design rehearsal scenarios, demo-craft rehearsal, war-story bank, peer-interview rapport notes.
- **Send David thank-you email** (drafted and finalised this session — ready to send, ideally within hours of interview).
- **Optional: draft recruiter heads-up** confirming the Artur mention so scheduling moves forward, in case formal email doesn't land in 1-2 days.
- **Carry-over from previous session — still not applied**: 7 spell/grammar fixes to the .pptx in Downloads (Avanade typo, `(AgentStudio)and` missing space twice, `vertica\nl demos` word split, Days 0-30 vs 1-30 inconsistency, Pre-Sales vs Presales, capitalise Commercial, vs patch baseline).

## Errors & Workarounds
- **Initial headline story invented Deloitte** as a prior employer — user caught it. Workaround: read actual resume PDF, rebuilt headline + TMAY with verified career arc from Phocas/UbiPark/inforcer.
- **Initial scripted-lines edit forgot to actually provide scripts** — section 2 table told user *what* to prove but not *how* to say it. User pushed back ("there are no answers for this") → added 4 scripted blocks with concrete sentences.
- **Initial thank-you draft used wrong template** (graceful-rejection format instead of thank-you-after-positive-interview) — user shared correct template, redrafted.
- **Two iterations of the thank-you removed content based on user's reality check**: AgentStudio/MCP paragraph removed because not actually discussed in interview; "growth arc inside one company" sentence had to be repaired after orphaning when the David-first-APJ-SC bit was cut.

## Key Exchanges
- User shared insider intel from ex-colleague on Boomi Presales team: David values technical experience over Presales experience, is open and direct, will probe integration tools used → this reframed the entire prep doc.
- User asked "what is the control plane?" mid-prep → quick on-the-fly explanation built (tower vs planes analogy, three-layer framing).
- User asked "what does GA mean?" mid-prep → defined Generally Available + alpha/beta/GA/EOL scale + plain-English fallback for live use.
- User asked "how do I prep for integration based questions?" → spawned the entire `boomi-integration-prep.html` build.
- User reported back after interview: "the interview went well david mentioned that he will put me through to the next stage to have a conversation with Artur Gaffanov" — pivoted from pre-interview prep to post-interview workflow (thank-you + Artur snapshot + next-round prep plan).
- User shared Artur's profile (Senior Solution Consultant, Brisbane, ~5 years at Boomi, evangelises in Boomiverse community) — informed the technical-round prep brief.
- Iterative tightening on thank-you email: 4 versions before landing on final (anchored on team/mentorship rather than product topics that weren't actually discussed in the room).

## Custom Notes
**User instruction (carrying forward): "Separate based by employer"** — this is the Boomi log. Today's small Pendo update (Hiltsje's positive reply) lives in the companion `26-05-2026-12_13-pendo-followup-nudge.md` file with its own prepended Session 2 block.

---

## Quick Resume Context
**Niroo passed the David Irecki HM interview at Boomi on Wed 2026-05-27 for Presales Solutions Consultant — Commercial ANZ. Moving forward to a technical round with Artur Gaffanov (Senior Solution Consultant, Brisbane, 4yrs 8mo at Boomi).** Formal scheduling email not yet received as of 2026-05-28 — just David's verbal mention. Thank-you email to David drafted and ready to send. Two key prep artefacts now live: `interview-prep/boomi-hm-david-irecki.html` (HM-prep, 16 sections, used in actual interview) and `interview-prep/boomi-integration-prep.html` (19-section technical study guide ready for the Artur round). Niroo has started Boomi University: Getting Started complete, Integration Essentials halfway. Next prep work: build dedicated Artur technical-round prep doc once scheduling lands.

---

## Raw Session Log

*(Session 2 content delivered inline across the day — see "Files Modified" for canonical outputs. Conversation arc below.)*

**Conversation arc (28-05-2026):**
1. Pendo follow-up reply drafted (Hiltsje replied positively; tightened to "thanks, looking forward to recruiter, any prep let me know")
2. HM prep doc bio + summary tightening (multiple rounds of "match Pendo summary format")
3. Email to David attaching 30/60/180 plan: drafted + subject-line options provided
4. `/career-ops interview-prep` invoked for HM prep doc → full HTML built with 14 sections
5. Career-coach feedback applied: rewrote questions to ask, added David's 11-year career arc context, added 3 coach-flagged signals (technical updates, mentoring, learning new tech)
6. User caught invented Deloitte reference → resume PDF re-read → headline/TMAY rebuilt from real Phocas/UbiPark/inforcer arc
7. Insider intel from ex-Boomi-Presales colleague → new ★ "Insider intel on David" card added at top → integration-tools probe answer added as new ★ section
8. Boomi University training threaded through 5 places in HM prep doc
9. "What is the control plane?" + "What does GA mean?" — on-the-fly explanations
10. "Help me prep for integration-based questions" → `boomi-integration-prep.html` built (19 sections, ~2hr study guide)
11. Multiple small surgical edits: "5+ years" → "6+ years", scripted lines added to "what David wants" table, closer-question softened, AE/SC ratio bolded and reordered
12. **HM interview happened** — Niroo reports it went well, David verbally said next step is Artur Gaffanov technical round
13. Thank-you to David: wrong template ruled out → correct template adapted → 4 tightening iterations → final version anchored on David's team/mentorship answer

---
---

# Session Log: 26-05-2026 12:13 — Boomi HM Interview Prep

## Quick Reference (for AI scanning)
**Confidence keywords:** boomi, presales, solutions-consultant, david-irecki, anz, commercial, agentstudio, rivery, thru, lunar-dev, 30-60-180, recruiter-screen, hiring-manager, mcp, data-activation, single-control-plane, ipaas, apim, boomi-university, integration-essentials, associate-integration-developer, professional-api-design, professional-api-management, api-control-plane, associate-runtime-architect, niroo-arjuna, melbourne
**Projects:** career-ops, boomi-presales-solutions-consultant-commercial-anz
**Outcome:** Generated full HM interview prep package — recruiter screen answer HTML (live during call), 30/60/180 Impact Plan (markdown + PowerPoint matching Pendo deck format), Boomi training catalog verification, course list corrections, ANZ-specific framing throughout. HM interview is tomorrow (Wed 2026-05-27).

## Decisions Made
- **Phase naming standardised** to Pendo deck pattern: Learn / Contribute / Take Initiative (not generic "Foundation/Applying/Ownership").
- **Pre-Hire Ramp slide kept honest** — only listed activities Niroo has actually completed (recruiter screen, evaluation report, AI portfolio, Anthropic AI Fluency cert). Moved trial signup, AgentStudio MCP demo, university enrolment into "In-Progress" because not yet started.
- **Three plan stretchers softened** after realism check:
  - Cert volume: only Associate Integration Developer cert by Day 30 (not 3 certs in 30 days)
  - Attach goal: "at least 1 deal with a pipeline of 3" instead of "3 deals" by Day 180
  - Reference: "1 reference candidate identified and nominated" instead of "1 case study landed"
- **Course names rewritten to match real Boomi catalog**:
  - "Boomi Professional Developer" → **Associate Integration Developer Certification**
  - "AgentStudio Fundamentals" → **Boomi Agents: Design and Control**
  - "APIM Essentials" → **Professional API Management**
  - "Boomi Advanced Developer / AgentStudio Advanced" → **Boomi Agents: Design and Control + Professional API Management** (completed Day 60)
  - "Professional Architect" → **Associate Runtime Architect Certification** + **Boomi API Control Plane**
- **API ladder finalised** as a 3-step progression: Professional API Design (Days 0-30, prereq) → Professional API Management (Days 30-60) → Boomi API Control Plane (Days 60-180, addresses JD's "Federated APIM" gap).
- **Jargon stripped** from focus areas across all 3 phase slides — replaced "patch", "internalise the narrative", "deeply map" with plain English. "Patch" → "accounts" everywhere except where the user explicitly accepted leaving it.
- **Salary strategy for recruiter call** changed from "anchor first at AUD 220K OTE" to **flip-it-back-to-the-recruiter approach** (Option A warm / Option B package-literate with super reference). Only commit a market-anchored range if pushed.
- **Pre-Hire Ramp slide pivot** away from inventing activities — user pushed back ("I have not done this at all" re: BoomiWorld keynote / trial workspace) → rewrote to use only verifiable activities.

## Key Learnings
- **Boomi catalog course names are NOT what they sound like.** Lots of plan content originally referenced courses that don't exist (e.g. "Boomi Professional Developer" — the real cert is Associate Integration Developer; "Professional Architect" — not a thing).
- **Boomi's URL pattern is consistent:** `/associate-integration-developer-certification`, `/professional-api-management`, `/associate-runtime-architect-certification`. Site is mostly 403 to anonymous fetch + Google indexing is sparse, so verification needs the user to open URLs in their authenticated browser.
- **Rivery, Thru, Lunar.dev have no dedicated training yet** — too recent. Plan flags this honestly rather than inventing courses.
- **Pendo deck format reverse-engineered from .pptx:** 6 slides (Cover → Overview → Pre-Hire Ramp → Learn → Contribute → Take Initiative), 13.33 x 7.5 widescreen, 3-column actionable steps layout per phase slide, success metrics in a right rail.
- **ANZ context matters for recruiter screen:** mention `super` (signals local literacy), use AUD only, frame MuleSoft as "Salesforce-locked" not "bad", reference Telstra/NAB/BHP-style enterprise accounts, watch tall-poppy tone on "100+ POCs" framing.
- **"Patch" = sales jargon for assigned territory/accounts.** "Co-own the patch" = share ownership with the AE (commercial side) and SA (technical side).
- **"Brown-bag" = informal team lunch-and-learn.** User asked for a plainer alternative ("short internal session").
- **David Irecki's framing (relayed via recruiter):** "data activation" (data ready for AI + governance) is the headline; single control plane for agents/MCPs is the proof point; AgentStudio sits on top of core iPaaS/APIM/DM substrate; recent acquisitions extend the substrate (Rivery = ELT/CDC, Thru = MFT, Lunar.dev = governed agent connectivity).
- **Steve Lucas (CEO) quote to drop in:** *"2026 is the year organisations stop experimenting with AI and start activating it at scale."*
- **Constellation Research framing to drop in:** *"The connection layer just became the control layer."*

## Solutions & Fixes
- **Pendo .pptx structure recovery:** unzipped `output/pendo-30-60-180-niroo-arjuna-2026-05-19.pptx` into `/tmp/pptx-inspect`, parsed slide XML with regex `<a:t[^>]*>([^<]*)</a:t>` to extract text + structure. This was the only way to see the actual 6-slide layout (user only pasted slides 4-6 as text originally).
- **python-pptx 1.0.2 is preinstalled** — used to generate the Boomi deck programmatically with matching layout, Boomi blue palette (#0C4EE0), 16:9 widescreen.
- **Boomi catalog verification:** WebFetch returns 403 to train.boomi.com URLs (gated). Used `site:train.boomi.com` Google searches via WebSearch + community announcement URLs to confirm real course names without authenticated access.
- **HTML interview prep doc** uses sticky left-nav with anchor links so Niroo can jump between Q1-Q10 mid-call. Print-friendly CSS included as paper-backup fallback.

## Files Modified
- `interview-prep/boomi-presales-solutions-engineer.md` — full prep doc (process overview, recruiter screen scripts, story bank mapping, technical prep, company signals, day-of checklist, follow-up note template)
- `interview-prep/boomi-recruiter-screen-answers.html` — live-use HTML with 10 question scripts + opening + closing + ANZ notes + "don't say this" + sticky nav. Q5 (comp) rewritten twice: first as anchor-first, then as flip-it-back-to-recruiter after user feedback.
- `interview-prep/boomi-30-60-180-impact-plan.md` — full 6-slide markdown plan, multiple rewrites (initial → matched Pendo structure → softened stretch goals → real course names → concise focus areas → final)
- `output/boomi-30-60-180-niroo-arjuna-2026-05-26.pptx` — 6-slide PowerPoint deck matching Pendo format. User later renamed to `Niroo Arjuna_ 30-60-180 Plan_ Presales Solutions Consultant - Commercial (Boomi).pptx` in Downloads.
- `/tmp/generate_boomi_pptx.py` — python-pptx generator script (reusable for future regenerations)

## Setup & Config
- python-pptx 1.0.2 already installed in user's environment
- Boomi catalog URLs require authentication for full content; user has access via train.boomi.com login
- Boomi University access: needs Boomi Platform account OR Boomi Community credentials
- Pendo .pptx source files in `output/`: `pendo-30-60-180-niroo-arjuna-2026-05-19.pptx`, `-CHANGES.pptx`, `-SIMPLE.pptx`

## Pending Tasks
- **Spell/grammar fixes the user has NOT yet applied to the Boomi .pptx** (5 must-fix + 1 polish, identified at end of session):
  1. Slide 5: "Avenade" → **Avanade** (proper noun typo)
  2. Slide 4: `(AgentStudio)and` → `(AgentStudio) and` (missing space, appears twice — Actionable Steps + Success Metrics)
  3. Slide 4: `"vertica\nl demos"` → re-key as `"vertical demos"` (word split across text runs)
  4. Slide 2 vs Slide 3: pick one of "Days 1-30" OR "Days 0-30" (currently inconsistent — recommend Days 0-30)
  5. Slide 2 vs Slide 1: pick "Pre-Sales" or "Presales" (currently inconsistent — recommend Presales to match JD)
  6. Slide 3: `"my assigned commercial accounts"` → capitalise "Commercial"
  7. Slide 5: `"vs patch baseline"` → `"vs account baseline"` (patch jargon should already be gone)
  8. Slide 4 Success Metric: reword as outcome not instruction — `"Boomi Agents: Design and Control (AgentStudio) and Professional API Management completed."`
- **Pre-tomorrow homework** to make the Pre-Hire Ramp slide truthful:
  - Sign up for Boomi University + start Boomi Professional Developer path (free)
  - Spin up free Boomi trial at boomi.com/free-trial (no credit card)
  - Even 30 mins of either would harden the "In-Progress" claims for the HM interview
- **Course URLs to verify in browser** (only catalog hub is 100% confirmed):
  - https://train.boomi.com/integration-essentials ✓
  - https://train.boomi.com/associate-integration-developer-certification ✓
  - https://train.boomi.com/professional-api-management ✓
  - https://train.boomi.com/associate-runtime-architect-certification ✓
  - https://train.boomi.com/professional-api-design (URL pattern matches — user needs to verify)
  - https://train.boomi.com/api-control-plane (URL pattern matches — user needs to verify)
  - https://train.boomi.com/associate-integration-architect (URL pattern matches — user needs to verify, would be better SC fit than Runtime Architect if real)
- **Optional add-ons offered but not yet built:**
  - 2-minute talk-track for walking David through each deck slide
  - One-page printable cheat card (single screen) for comp script + 3 questions + anchor facts

## Errors & Workarounds
- **WebFetch 403 on train.boomi.com pages** — auth gated. Workaround: WebSearch with `site:train.boomi.com` for indexed pages, plus boomi.my.site.com community announcements which are publicly indexed.
- **AskUserQuestion not loaded** as deferred tool during /compress — fell back to plain-text Q&A.
- **Pendo .pptx text extraction** initially failed (zip ran from wrong cwd, exit code 1 misleading) but actually extracted successfully — cd into the extract dir and the slides were there.
- **User pushback on invented activities** (Pre-Hire Ramp slide originally listed BoomiWorld keynote read + trial workspace as completed — user clarified neither was done). Lesson reinforced: never assume completed activities; ask first.

## Key Exchanges
- User clarified hierarchy of priorities: hiring manager interview is tomorrow, recruiter screen already happened. Pivot from generic prep to David-Irecki-specific framing (data activation, single control plane, MCPs, acquisitions).
- User asked "is this a realistic plan?" — prompted honest realism check that surfaced the 3 stretch goals (cert volume, AgentStudio attach count, reference timeline). User accepted softened versions.
- User asked "did you have a look at the powerpoint file for pendo to get a grasp of what the format looks like?" — caught me not having inspected the actual .pptx files. Reverse-engineering the deck XML afterwards revealed the missing Cover + Overview + Pre-Hire Ramp slides.
- Multiple rounds of "make this concise" / "this is too much jargon" — user has strong preference for plain-English declarative bullets in Pendo style, not corporate-speak.
- Course catalog deep-dive triggered by user asking for URL verification — caught that several originally-named courses don't exist in the real Boomi catalog. Forced a rewrite of every cert reference.
- Salary script flipped after user shared their career coach's "flip-it-back-to-the-recruiter" framework — replaced the anchor-first script entirely.

## Custom Notes
**User instruction: "Separate based by employer"** — this session log is the Boomi-specific record. A separate file `26-05-2026-12_13-pendo-followup-nudge.md` covers the Pendo follow-up message work from the same session. Future /resume searches should be employer-scoped where possible.

---

## Quick Resume Context
Niroo has an HM interview with **David Irecki at Boomi tomorrow (Wed 2026-05-27)** for **Presales Solutions Consultant — Commercial (ANZ, Sydney or Melbourne)**. Full prep package built: 30/60/180 Impact Plan (.pptx in Downloads + .md in interview-prep/), live-use HTML for recruiter screen answers (already passed recruiter), and a Boomi-specific deep research framework. Plan content uses verified Boomi course names and is structured to David's framing — data activation, single control plane for agents/MCPs, AgentStudio + Rivery + Thru + Lunar.dev as extensions of the core iPaaS + APIM substrate. 7 spell/grammar fixes to the .pptx remain unapplied. Niroo should also sign up for Boomi University + a free Boomi trial before the interview to harden the Pre-Hire Ramp slide claims.

---

## Raw Session Log

*(Full conversation transcript available in conversation history — this log captures the structured summary above. Key artefact files are saved at the paths listed in "Files Modified" and represent the canonical output of the session.)*

**Conversation arc:**
1. `/career-ops deep boomi` — generated structured 6-axis deep research prompt tailored to Niroo's existing Boomi evaluation (report 009, score 4.4/5)
2. `/career-ops interview-prep boomi (recruiter screening)` — built full interview prep markdown doc
3. HTML page request for live use during recruiter call — generated `boomi-recruiter-screen-answers.html` with 10 question scripts
4. Salary strategy revision — rewrote Q5 entirely to flip-it-back-to-recruiter approach (Option A / Option B / fallback)
5. `/career-ops boomi (30-60-180 for boomi)` — first markdown plan generated (missed Pre-Hire Ramp + cover structure)
6. User correction: Pendo .pptx inspection → discovered 6-slide format → rewrote markdown + generated matching PowerPoint
7. Iterative tightening: bio rewrite (no employer names), phase blurb rewrites (Pendo-style concise), focus area rewrites x 3 (Days 0-30 / 30-60 / 60-180+)
8. Reality check: "is this realistic?" → softened 3 stretch goals
9. Course catalog research: verified real Boomi training names + URLs, rewrote all cert references across 3 slides
10. Final spell/grammar pass on user-renamed .pptx in Downloads
11. Summary brief for career coach
12. Pendo follow-up message drafting (Friday original + Tuesday nudge) — captured in separate log file
