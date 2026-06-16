# Session Log: 16-06-2026 15:52 — Boomi SC: scenario mapping, architecture diagram, nightly scheduling + interview reschedule

## Quick Reference (for AI scanning)
**Confidence keywords:** boomi, solutions-consultant, presales-solution-engineer, presentation-round, requirement-7, scenario-mapping, build-order, process-decomposition, monolith, architecture-diagram, boomi-sc-architecture-diagram-html, deploy, package, schedule, nightly, runtime-management, deployed-processes, utc, melbourne-aest, 15:00-utc, create-packaged-component, build-guide-sync, notion, credit-routing-decision, yashitha-venkataraman, vinay-cj, david-irecki, artur-gaffanov, taylor-mcgrath, invite-cancelled, prepone, hr-discussion, reschedule, availability, thu-fri-unavailable, travel-jul-aug, build-b-next, niroo-arjuna
**Projects:** career-ops; Boomi Presales Solution Engineer (a.k.a. Solutions Consultant) — Commercial ANZ, final presentation/demo round
**Outcome:** Mapped Build A to the exercise (Requirement 7 + the PDF's own suggested demo), settled build strategy (2 builds + architecture talk-track, decomposed into ~5 processes not a monolith), created a one-slide **architecture diagram** mapping all 7 requirements to Boomi patterns, **deployed + scheduled Build A to run nightly** (15:00 UTC = 1 AM Melbourne), synced the build guide markdown + Notion. Then handled a flurry of recruiter emails: the **Jun 30 interview was confirmed then cancelled** (panel changes + David's late-June unavailability → preponing), with an **HR discussion to follow**; drafted the reschedule reply (unavailable Thu/Fri this week, prefers early-mid next week before the 1 Jul travel).

## Decisions Made
- **Build A = Requirement 7** (nightly Oracle balance export → SQL Server warehouse) and the PDF's **suggested demo #2** ("CSV file of customer balances to a database"). It satisfies the brief's "logic steps (routing/decisions/error handling)" tip directly.
- **Do NOT build all 7 requirements in order.** The brief says "one or more," "not overly complex/production ready." Show completeness in the **architecture diagram**, prove capability with **2 builds**: Build A (batch/R7, done) + Build B (real-time order flow/R1–4, next). R5 (queue resilience) and R6 (status sync) are **talk-track**. Build order follows **risk/dependency**, not requirement numbers — that's why R7 (self-contained) was built before R1–4 (needs live Salesforce + Oracle/WMS stand-ins).
- **Multiple processes, not one monolith.** Each flow has its own trigger/lifecycle → its own process, sharing common connections/profiles/maps. Decomposition: Order Orchestration (R1–4, real-time), WMS Dispatch/queue consumer (R4–5, async), Approval Reminder (R2, scheduled), Order Status Sync (R6, scheduled), Nightly Balance Load (R7, scheduled batch = Build A). This is a strong architecture-maturity signal.
- **Build A scheduled nightly** to satisfy R7's "nightly": deploy then schedule, all 7 days, **15:00 UTC = 1:00 AM Melbourne** (so it reads as 1 AM local). Demo move = run live via Test for the logic, then show the Schedules screen for the cadence.
- **Reschedule strategy (recruiter):** acknowledge the cancellation positively, flag **unavailable Thu/Fri this week**, propose **early-to-mid next week** (David is out the last week of June, and the user travels from 1 Jul, so the window is this-week or next-week before 30 Jun). Offer to pick a slot once the new availability request lands.
- **Email tone:** match the user's voice — warm, concise, polite, genuinely enthusiastic; no em/double dashes (candidate-facing rule). Trimmed fluff but re-warmed when "concise" made it read flat.

## Key Learnings
- **A Boomi "Profile Element" reads the current live document through that profile** (dynamic), so reference whichever profile matches the document's format at that point (flat file before a Map, the target profile after). The profile is a *lens*, not a stored copy.
- **Scheduling only appears after a process is DEPLOYED, not merely packaged.** Path: Create Packaged Component → **Deploy > Deployments** → Test environment → then **Manage > Runtime Management → SC Demo Runtime → Deployed Processes → [process] → Schedules → Add**.
- **The trial runtime clock is UTC.** Schedule "Start Time" is UTC. **15:00 UTC = 1:00 AM next day Melbourne (AEST, UTC+10, no DST in June).** General: 3 PM UTC = 1 AM Melbourne. Set the UTC time to represent the desired local nightly time, and narrate that explicitly (reads as someone who's shipped scheduled integrations).
- **A "No Data" Start shape schedules fine** — the schedule just triggers execution. A scheduled run reprocesses the inline Message data (in production the Start is a connector reading the real nightly file).
- **Process scheduling config:** Type **Day**, Interval **1**, tick the days (all 7 for "nightly"), Start Time. There's also a **Retry** tab.
- **Interview-logistics intel** (see Setup/Config): the presentation is the **last evaluative round** ("once you're done you'll have an HR discussion"); panel members are in flux.

## Solutions & Fixes
- **One-slide architecture diagram** built as `interview-prep/boomi-sc-architecture-diagram.html` — an SVG topology (Salesforce ↔ Boomi Atom hub ↔ on-prem Oracle/WMS/SQL Server behind a firewall, control plane up top) with 3 colour-coded flow lanes (orange real-time order R1–5, green status sync R6, purple nightly batch R7) and R-badges, plus two tables (requirement→pattern→process→trigger, and the process-decomposition rationale) and baked-in talking lines.
- **Build guide + Notion synced** to the current reality: added §A.5 (package → deploy → schedule), folded the credit-routing Decision into the markdown (was only in Notion), added a "No Schedules option → deploy first" troubleshooting entry, fixed the linter-mangled nested numbering, cross-referenced the new diagram. Notion updated via `replace_content` on page `37a9176c-75f9-81d6-91a9-eb5c4692eb9a`.
- **Reschedule email** (final, concise + re-warmed): acknowledges the change, "unavailable Thursday and Friday this week," proposes early-mid next week, "if that works on your end, I'll pick a slot as soon as the availability request comes through," notes the HR discussion, invites Vinay's input on criteria/format, offers a quick run-through.

## Files Modified
- `interview-prep/boomi-sc-architecture-diagram.html` — NEW. SVG architecture diagram + requirement-mapping + process-decomposition tables (slide-ready, 16:9-ish).
- `interview-prep/boomi-sc-demo-build-guide.md` — UPDATED: new §A.5 deploy/schedule, credit-routing Decision added to A.2, A.3 result note, §E "No Schedules" troubleshooting, architecture-diagram cross-ref, clean nested numbering.
- Notion page `37a9176c-75f9-81d6-91a9-eb5c4692eb9a` ("Boomi SC Demo — Step-by-Step Build Guide") — UPDATED twice (synced to markdown, then +deploy/schedule). Now identical to the markdown body.
- `interview-prep/boomi-demo-assets/customer_balances.csv` — unchanged this session (8 Australian rows; 1004 missing balance, 1006 missing name).

## Setup & Config
- **Boomi account:** `interview_nirooarjuna-9W0UKQ`. **Runtime:** `SC Demo Runtime` (ID `dc8301d5-7f97-4619-8954-65bf9d5d869e`, Cloud Attachment, USA West Integration Test Cloud, v26.05.2). **Environment:** `Test` (ID `3320a7e4-2537-49c7-a1c3-499bfc25afc9`).
- **Process:** `Demo A - Customer Balance Load` — now **deployed + scheduled** (Day, Interval 1, all 7 days, 15:00 UTC = 1 AM Melbourne).
- **Notion:** Boomi hub `36c9176c-75f9-8012-b4ea-f1bc2a0eab33`; build-guide page `37a9176c-75f9-81d6-91a9-eb5c4692eb9a`.
- **Interview logistics (CRITICAL, evolving):**
  - Role title on the booking system: **Presales Solution Engineer** (= the SC role).
  - Was confirmed: **Jun 30 2026, 1:30–2:30pm (GMT+10 Melbourne)**, on-camera, Google Meet `meet.google.com/mhr-ueco-stz`. Interviewers: **David Irecki, Artur Gaffanov, Taylor McGrath**. Scheduling via `schedule@lily.greenhouse.io`.
  - **THEN CANCELLED** — "changes in Panel members and their availability." **David won't be available the last week of June and wants to prepone the interview** (move it earlier). A **new availability request** will be re-sent; pick a slot.
  - **After this round → an HR discussion** (so the presentation is effectively the final evaluative round).
  - Recruiter **Yashitha Venkataraman** (Boomi Global Talent Acquisition) is unsure of the evaluation criteria / time-format; looped in **Vinay Cj** for input.
  - **User constraints:** unavailable **Thursday + Friday this week** (18–19 Jun); **travel 1 Jul – 7 Aug** (pre-booked); so the only viable window is **this week or next week, before 30 Jun**; early-to-mid next week (≈22–26 Jun) preferred (also buys Build B prep time).

## Pending Tasks
- [ ] **Watch for the re-issued availability request; pick an early-mid-next-week slot** (before 1 Jul travel). Send the reschedule reply (drafted).
- [ ] **Build B** — the headline, still not built. SFDC Opportunity → Decision (Amount > $1M) → Map → create order (DB/XML stand-in) → write-back SO#. Gated on **Salesforce Dev org auth** (security token / OAuth). Talk-don't-build the WMS queue.
- [ ] **Build the actual PowerPoint** from `boomi-sc-demo-deck.pptx` skeleton; fold in the new architecture diagram; fill `[Client]`.
- [ ] **Rework §9 timing table in `boomi-sc-presentation-round.html` for a 60-minute slot** (offered, not done).
- [ ] **Confirm the new panel + research Taylor McGrath / any new members**; add a per-interviewer panel-tailoring section to the presentation doc (offered, not done). Panel is in flux, so hold tailoring until confirmed.
- [ ] **COMMIT + push everything** — build guide, CSV, architecture diagram, and BOTH session logs (prior 21:30 + this one) are uncommitted. Repeatedly offered, not yet done.
- [ ] **Rehearse** the sell-led narrative + Q&A (esp. the WMS-queue resilience answer).

## Errors & Workarounds
- **AskUserQuestion unavailable** → `/compress` ran with explicit args, no interactive prompts.
- **"There is no schedule option"** → because the process was only **packaged, not deployed**. Deploy via Deploy > Deployments to the Test env first; Schedules then appears on the deployed process.
- **Markdown Edit "string not found"** → the linter had reformatted A.2 (4-space → 3-space sub-bullets, mangled nested numbering); re-read the file and matched exact text, then rewrote the whole file clean.
- **Notion page drifted ahead of the markdown** (credit Decision was only in Notion) → reconciled by writing both from one canonical body.

## Key Exchanges
- "How does Build A relate to the exercise scenario?" → it IS Requirement 7 + the PDF's suggested demo #2; gave the shape→scenario mapping table and the demo intro line.
- "Should we build requirements 1→7 in order?" → no; 2 builds + architecture talk-track; build order = risk/dependency.
- "One process or 7?" → multiple processes (not a monolith); gave the ~5-process decomposition + the architecture interview line.
- "Sketch the architecture diagram" → built `boomi-sc-architecture-diagram.html`.
- "How to schedule nightly?" → package → deploy → schedule; UTC clock; 15:00 UTC = 1 AM Melbourne.
- "What is 3pm UTC local?" → 1 AM next-day Melbourne (AEST). Use 15:00 UTC to represent 1 AM local.
- "Update markdown + Notion" → synced both with §A.5 + credit Decision.
- Long recruiter-email thread: confirm availability → questions (timing/panel/dry-run) → Yashitha confirms 1hr, HM+team, then full invite (David/Artur/Taylor) → **invite cancelled** (panel changes, David preponing) → drafted the reschedule reply, iterated for concision then re-warmed for enthusiasm; added "if that works on your end," "unavailable Thu/Fri," HR-round ack, Vinay input invite.

## Custom Notes
Args: "all boomi final interprep." This session is the continuation after the 21:30 Build-A log; it adds the scenario/architecture/process-decomposition thinking, the nightly deploy+schedule, the doc sync, and the full recruiter scheduling saga (Jun 30 confirmed → cancelled → preponing, HR round follows). Build B and the actual PowerPoint remain the big open work; everything is still uncommitted.

---

## Quick Resume Context
Niroo is at the **final presentation/demo round for the Boomi Presales Solution Engineer (ANZ)** role (after this round it's just an HR discussion). **Build A is fully done — built, tested, credit-routing Decision added, and now deployed + scheduled nightly** (`Demo A - Customer Balance Load` on `SC Demo Runtime`/`Test` env; schedule 15:00 UTC = 1 AM Melbourne). A one-slide **architecture diagram** (`interview-prep/boomi-sc-architecture-diagram.html`) maps all 7 requirements to Boomi patterns and a ~5-process decomposition; the build guide markdown and the Notion page are synced. The strategy is **2 builds (A=batch/R7 done, B=real-time order flow/R1–4 next) + talk-track for R5 (queue) and R6 (status sync)**. **The Jun 30 interview was confirmed (panel David Irecki, Artur Gaffanov, Taylor McGrath) then CANCELLED** — David is out the last week of June and wants to prepone; a new availability request is coming; panel may change; Vinay Cj was looped in. **Constraints:** user is unavailable Thu/Fri this week and travels 1 Jul–7 Aug, so the slot must be **this week or next week before 30 Jun** (early-mid next week preferred). **Next:** pick the new slot, build **Build B** (gated on Salesforce Dev-org auth), build the PowerPoint deck, and **commit everything** (build guide, CSV, architecture diagram, both session logs are all uncommitted).

---

## Raw Session Log

**[continues from the 21:30 Build-A session]**

**User:** update the "Boomi SC Demo — Step-by-Step Build Guide" Notion page with the latest data from the markdown.
**Assistant:** Read the current markdown, loaded `notion-update-page`, `replace_content` on page `37a9176c...` — synced to the latest markdown (Australian dataset, 1004 missing balance, Cleanse-leniency lesson, reconciled Split-By-Line method), cleaned the linter-mangled numbering, and folded in the live lessons + the credit-routing Decision. Flagged that Notion was now slightly ahead of the `.md`.

**User:** how does this flow relate to the scenario in the Interviewee Exercise PDF?
**Assistant:** Build A = **Requirement 7** (nightly Oracle balance export → SQL Server warehouse) and the PDF's **suggested demo #2** ("CSV file of customer balances to a database"); satisfies the logic-steps tip. Gave a shape→scenario mapping table, what it does/doesn't cover (B = R1–4; R5/R6 = talk-track), and a demo intro line.

**User:** should we be building Integration Requirements 1 to 7 [in order]?
**Assistant:** No — it's a requirements list, not a build order; you're not expected to build all 7. Show completeness in the architecture; prove with 2 builds (A batch, B real-time); talk R5/R6. Build order = risk/dependency, which is why R7 came first.

**User:** one process or 7 separate? I assume one.
**Assistant:** Opposite — **multiple processes, not a monolith** (different triggers/lifecycles). Gave the ~5-process decomposition (Order Orchestration, WMS Dispatch/queue, Approval Reminder, Status Sync, Nightly Balance Load) + shared components + the architecture interview line.

**User:** also sketch the one-slide architecture diagram mapping all 7 requirements to Boomi patterns.
**Assistant:** Built `interview-prep/boomi-sc-architecture-diagram.html` — SVG topology (Salesforce ↔ Boomi Atom hub ↔ on-prem Oracle/WMS/SQL Server behind firewall, control plane up top), 3 colour-coded flow lanes with R-badges, requirement-mapping table, process-decomposition table, baked-in talking lines.

**User:** how do we schedule this process to run nightly for Demo A?
**Assistant:** For the demo you run via Test; scheduling is the production "nightly" story. Steps: package → Deploy > Deployments → Test env → Manage > Runtime Management → SC Demo Runtime → Deployed Processes → Demo A → Schedules → Add (Day, 15:00 UTC = 1 AM Melbourne). No-Data start schedules fine.

**User:** [screenshot: Create Packaged Components: Add Details] what do I add here?
**Assistant:** Leave Version blank (auto), notes optional, Sharing = Not Allowed → Create Packaged Component; then Deploy, then schedule.

**User:** there is no schedule option.
**Assistant:** Because it's only packaged, not deployed. Deploy via Deploy > Deployments to Test env first; Schedules then appears on the deployed process.

**User:** [screenshot: Scheduling dialog — "1:00 AM every day on 5 of 7 days", Mon–Fri, UTC] what do I add here?
**Assistant:** Tick Saturday + Sunday for true "nightly" (7 days); note the runtime is UTC (so 1 AM UTC ≠ 1 AM Melbourne); then OK.

**User:** what is 3pm utc in local time?
**Assistant:** 3 PM UTC = 1:00 AM next-day Melbourne (AEST, UTC+10, no DST in June). So set Start Time 15:00 UTC to represent 1 AM Melbourne.

**User:** done, now update the markdown file and notion to reflect this.
**Assistant:** Rewrote the build guide (new §A.5 deploy/schedule, credit Decision folded in, §E "No Schedules" troubleshooting, diagram cross-ref, clean numbering); `replace_content` on Notion with the identical body. Files now in sync.

**[Recruiter email thread — many iterations]**
- "help me draft this email to the recruiter [responding to Yashitha's chase, availability submitted]" → drafted reply confirming availability (Tue 30 Jun 1:30–2:30) + clarifying questions; iterated wording; dropped panel emails, softened dry-run, added "already started preparing."
- Yashitha: 1 hour, presenting to HM + team, details to follow. → short acknowledgment drafted; noted 1 hr is generous, audience = HM+team role-playing the customer, build generic personas.
- Yashitha: full confirmation — Jun 30 1:30–2:30 Melbourne, on-camera, Meet link, **Interviewers David Irecki, Artur Gaffanov, Taylor McGrath**. → drafted confirmation reply + panel-tailoring read (David = HM/decision-maker, Artur = peer SC already met, Taylor = unknown, research needed).
- "want more on the additional info, drop the panel question" → revised questions (added evaluation-criteria/additional-info ask, removed panel).
- "add this opener / amend to received the meeting invite / confirm if this is the final round" → iterated opener + added process-stage question.
- **Yashitha: the invite has been CANCELLED** — panel member changes + availability; **David out last week of June, wants to prepone to this week**; new availability request coming; she's unsure of evaluation criteria/format; **after this round → HR discussion**; looped in **Vinay Cj**.
- User shared private advice: mention you're away, enthusiastically offer next week, worst-case dry run Thursday (will be in Wellington, flexible).
- → Drafted the reschedule reply: acknowledge the change positively, **unavailable Thursday and Friday this week**, prefer early-mid next week (David out last week June), "if that works on your end, I'll pick a slot as soon as the availability request comes through," HR-round ack, invite Vinay's input on criteria/format, offer a run-through. Iterated: concise/no-fluff → re-warmed for enthusiasm + politeness; swapped vague "travel" for "unavailable Thursday and Friday."
- Advised: window is this-week-or-next-before-30-Jun (David out late June + user travels 1 Jul); next week is best (more Build B prep time); "HR discussion follows" = this is the final evaluative round; panel may change so hold tailoring.

**[/compress "all boomi final interprep"]** → this log.
