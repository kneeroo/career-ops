# Session Log: 11-06-2026 21:30 — Boomi SC Demo Build A (live pair-build) + Credit Routing

## Quick Reference (for AI scanning)
**Confidence keywords:** boomi, solutions-consultant, presentation-round, demo-exercise, yashitha-venkataraman, build-a, customer-balance-load, atom-cloud, sc-demo-runtime, test-environment, flat-file-profile, customer-balance-ff-profile, split-by-line, keep-headers, cleanse, mandatory-validation, number-type-lenient, decision-shape, route-credits, notify-redundant, return-documents, profile-element, salesforce, oracle-e-business, wms, sql-server-warehouse, data-activation, agentstudio, mcp, pair-build, screenshots, boomi-sc-presentation-round-html, boomi-sc-demo-build-guide-md, boomi-sc-demo-deck-pptx, customer_balances-csv, notion, build-b-next, niroo-arjuna
**Projects:** career-ops (job-search pipeline); Boomi Presales Solutions Consultant — Commercial ANZ, final presentation/demo round
**Outcome:** Built and tested **Build A** ("Demo A - Customer Balance Load") end-to-end in the Boomi trial via live screenshot pair-building — a validate-and-route flat-file pipeline (6 clean / 2 rejected), then added a credit-routing Decision (balance < 0 → finance) to satisfy the brief's logic-steps tip; dropped a redundant Notify. Created the full prep suite (HTML strategy guide, build guide, 9-slide pptx deck skeleton) earlier in the session and committed/pushed it. Build B (SFDC $1M order routing) deferred to a fresh session.

## Decisions Made
- **This round is ~60% salesmanship / 40% technical** — a role-play "sell to the customer" presentation; the live Boomi build is the proof point, not the main act. Plan prep the opposite of the engineering instinct.
- **Build A first (bulletproof baseline), Build B (SFDC $1M routing) second/deferred.** Build A must work no matter what; it's the safe live demo.
- **Hosted Boomi Atom Cloud (not local Atom)** for the runtime — no install, ideal on a Mac, reaches Salesforce fine. Fresh trials ship with NO runtime; had to attach one ("In the Cloud" → USA West Integration Test Cloud).
- **Start = No Data + Message-shape inline CSV** instead of a Disk connector — fully self-contained, no file/DB reachability dependency, demo-proof.
- **8 sample records (6 clean, 2 bad) > 5** — a 6-vs-2 reject ratio reads as "we isolate the exceptions"; 3-vs-2 looks like half the data is broken. Volume handled by the "in production this is 500,000 rows" line.
- **Australian B2B company names** fitting a $150M national corporation (manufacturing, distribution, mining, freight, engineering).
- **Both bad rows = missing required data (Mandatory)** because Boomi's Cleanse is lenient on data-type parsing (see Learnings). 1004 = missing balance, 1006 = missing name.
- **Added a credit-routing Decision** (balance < 0 → finance review) to make the brief's "routing / decisions / error handling" tip undeniable. Reuses the Decision shape needed for Build B's $1M rule.
- **Dropped the Notify shape** on the credit path — it only writes to the Boomi execution log (operator-facing), so it doesn't actually notify finance. Narrate the notification as a production Mail-connector step instead. (User correctly flagged it as redundant — exactly the right SC instinct.)
- **Build A already satisfies the brief's logic-steps tip:** routing (clean/reject fork) + decisions (Cleanse rules + credit Decision) + error handling (rejected path) + validation against source (schema validation).
- **Pair-build model:** Claude can't operate the Boomi canvas (no browser automation available, and the drag-drop canvas isn't automatable). User drives; Claude directs step-by-step via screenshots. The build itself is the interview rehearsal — the user must build it to demo it and field on-the-fly questions.

## Key Learnings
- **Boomi Cleanse enforces Mandatory reliably but is LENIENT on data-type parsing.** A Number-typed flat-file field does NOT reject non-numeric text (`not_a_number` passed through as clean). Drive validation off **Mandatory** (and Field Length if needed), not the Number data type. For a true "must be numeric" reject, use a **Business Rules** shape.
- **"Split Documents By Profile" was unreliable for the flat file** — it requires a Link Element, and even with Link Element = Record it silently passed the whole CSV through as one document (no split). **"Split By Line" + "Keep Headers"** is the reliable method: each output doc = header line + one data row, which the header-aware profile parses correctly per record.
- **Runtime vs Environment are separate.** Runtime (Atom/Cloud Attachment) = the engine that runs processes. Environment = a deployment target the runtime attaches to. Deleting the environment does NOT delete the runtime (it just becomes unattached — reattach, don't recreate).
- **A "Profile Element" reference (in a Decision/Notify) reads the CURRENT live document through that profile** — dynamic extraction, not a stored value. Reference whatever profile matches the document's format **at that point in the flow** (flat file here; after a Map it'd be the target profile). Strong interview talking point: *"the profile is just how Boomi reads the live document."*
- **Screenshots >> HTML dumps** for live UI pair-building (faster for the user, instantly parseable for Claude).
- **The Boomi-provided "Platform Overview" deck is legacy** (pre-2026, all "AtomSphere/Atom", no AgentStudio/MCP/data-activation). Reframe its good slides (topologies 8–12) into a sales narrative and layer the 2026 "Data Activation Company / control layer / AgentStudio / MCP" story on the bonus slide — the differentiator vs candidates using only the dated deck.

## Solutions & Fixes
- **No runtime in fresh trial** → Manage > Runtime Management > Set Up Runtime > "In the Cloud" > USA West Integration Test Cloud > attachment name "SC Demo Runtime". Attach to a `Test` environment. Online in ~1–2 min, no install.
- **Inject sample data without a file** → Start shape Type = **No Data**, then a **Message** shape with the CSV pasted as static text (no variables).
- **Split flat file into per-row docs** → Data Process > Split Documents > **Split By Line** + check **Keep Headers** (NOT Split By Profile).
- **Validate + route** → **Cleanse** shape with the flat file profile; auto-forks Clean / Rejected. Mark `customer_name` and `balance` **Mandatory** in the profile to drive rejections.
- **Flat file profile** built fast via the **Import** button (point at `customer_balances.csv`) with "Use Column Headers" on + Comma delimiter; then set `balance` = Number / `0.00` / Signed / Mandatory.
- **Business-rule routing** → **Decision** shape, First Value = Profile Element (Customer Balance FF Profile → balance), Comparison = Less Than, Second Value = Static `0`. True → Flag credits; False → Load to warehouse.
- **Deck generation** → `python-pptx` 1.0.2 via `/tmp/build_boomi_deck.py` → `interview-prep/boomi-sc-demo-deck.pptx` (9 slides, no em/double dashes since it's candidate-facing).

## Files Modified
- `interview-prep/boomi-sc-presentation-round.html` — NEW. 12-section strategy/Q&A study guide (win condition, requirement→Boomi mapping, resilience/queue play, security/assumptions, deck-as-sales-narrative, 2026 bonus, flow/timing, Q&A, pitfalls, day-of checklist).
- `interview-prep/boomi-sc-demo-build-guide.md` — NEW, then UPDATED several times: Australian dataset; 1004 changed to missing-balance; added the Cleanse-leniency lesson; A.2 reconciled to the method that actually worked (No Data + Message, Split By Line + Keep Headers, Mandatory validation, Return Documents). NOTE: linter mangled A.2 nested-list numbering — needs a cleanup pass.
- `interview-prep/boomi-sc-demo-deck.pptx` — NEW. 9-slide sales-narrative deck skeleton with speaker notes.
- `interview-prep/boomi-demo-assets/customer_balances.csv` — NEW, updated twice (Australian names; then 1004 empty balance). 8 rows.
- Earlier big commit `5596ffe..7b2d643` on `main` also pushed Boomi + Pendo prep backlog, CV/cover-letter configs, CC-Session-Logs, `.claude/commands/`.
- Notion: build guide turned into a page under the "Boomi" hub.

## Setup & Config
- **Boomi account:** `interview_nirooarjuna-9W0UKQ`
- **Runtime:** `SC Demo Runtime` — ID `dc8301d5-7f97-4619-8954-65bf9d5d869e`, type Cloud Attachment, Cloud = USA West Integration Test Cloud, version 26.05.2, Online.
- **Environment:** `Test` — ID `3320a7e4-2537-49c7-a1c3-499bfc25afc9`, classification Test.
- **Process:** `Demo A - Customer Balance Load`.
- **Profile:** `Customer Balance FF Profile` (Flat File) — Use Column Headers ON, Comma delimited; `balance` = Number/`0.00`/Signed/Mandatory; `customer_name` = Mandatory.
- **Sample data:** `interview-prep/boomi-demo-assets/customer_balances.csv` (also pasted into the Message shape).
- **Notion:** Boomi hub page `36c9176c-75f9-8012-b4ea-f1bc2a0eab33` (under "Sales Engineer"); build-guide page `37a9176c-75f9-81d6-91a9-eb5c4692eb9a`.
- **Repo remote:** `https://github.com/kneeroo/career-ops.git`, working on `main`.

### Build A final shape (canvas)
```
Start (No Data)
  → Message "Inject customer CSV" (8-row CSV inline)
  → Data Process "Split into rows" (Split By Line + Keep Headers)
  → Cleanse "Validate Records" (Customer Balance FF Profile; Mandatory: customer_name, balance)
       ├─ Clean → Decision "Route Credits" (balance < 0)
       │            ├─ True  → Return Documents "Flag credits for finance"   (1002, -420.00)
       │            └─ False → Return Documents "Load to warehouse"          (5 rows)
       └─ Rejected → Return Documents "Exception Report"                      (1004 no balance, 1006 no name)
```
Expected test result: **5 → warehouse, 1 → credits, 2 → rejected.** (Before credit routing: 6 clean / 2 rejected — confirmed working.)

### Sample data (`customer_balances.csv`)
```
customer_id,customer_name,balance,currency
1001,Bluestone Manufacturing Pty Ltd,15230.50,AUD
1002,Yarra Valley Distributors,-420.00,AUD
1003,Harbour City Supplies Pty Ltd,98250.00,AUD
1004,Southern Cross Industrial,,AUD
1005,Outback Mining Services Pty Ltd,72540.75,AUD
1006,,18900.00,AUD
1007,Great Dividing Engineering,4500.25,AUD
1008,Coastal Freight Co Pty Ltd,131000.00,AUD
```

## Pending Tasks
- [ ] **Finish wiring the credit Decision** (in progress at compress time): drop the Notify, wire True → "Flag credits for finance" (Return Documents) and False → "Load to warehouse" (Return Documents). Save → Test → expect 1 credit / 5 warehouse / 2 rejected.
- [ ] **Screenshot the green test run** for demo-day insurance (so a live hiccup doesn't derail the pitch).
- [ ] **Commit the updated demo assets + build guide** (CSV + build-guide edits since the last commit are uncommitted).
- [ ] **Build B (the headline)** — SFDC Opportunity → Decision (Amount > $1M) → Map → create order (DB/XML stand-in for Oracle) → write-back SO# to Salesforce. First hurdle = Salesforce Dev org auth (username + password + **security token**, or OAuth). **Talk, don't build** the WMS maintenance-window queue/resilience. Deferred to a fresh session.
- [ ] **Build the PowerPoint** from the deck skeleton into the full sales narrative; fill `[Client]` placeholder; reuse the legacy deck's topology slides; add the 2026 bonus slide.
- [ ] **Reply to Yashitha's email** (draft ready; pending her response on presentation length + audience).
- [ ] **Fix the build-guide A.2 nested-list numbering** (linter artifact).
- [ ] **Rehearse the value narrative + Q&A out loud** (esp. the WMS-queue resilience answer — the differentiator).

## Errors & Workarounds
- **AskUserQuestion unavailable** → `/compress` proceeded with explicit args, no interactive prompts (as in prior sessions).
- **Split By Profile = no-op** (Document Viewer showed the whole CSV unsplit; "Link Element was not selected" error, then still no split with Link Element = Record) → switched to **Split By Line + Keep Headers**. Fixed.
- **Number-type validation didn't reject `not_a_number`** (confirmed balance IS Number/0.00/Signed, still passed) → Boomi Cleanse is lenient on type parsing → changed 1004 to a **missing balance** + marked balance **Mandatory**. Fixed (6 clean / 2 rejected).
- **No Puppeteer/Playwright/browser tool available** → pair-build via user screenshots.
- **Empty "Documents" pane in Test Results** for Return Documents shapes → UI quirk; rely on the **Logs** tab (6× "Load to warehouse" + 2× "Exception Report" = the proof).

## Key Exchanges
- Email from recruiter Yashitha Venkataraman delivered the **Interviewee Exercise** (Solutions Consultant) — drafted a concise reply (acknowledge, already hands-on in the trial, asked presentation length + audience). Confirmed the presentation round is live.
- `/career-ops interview-prep "responded, now how do I prep for this"` → produced the strategy plan and the 3-artifact prep suite (HTML guide, build guide, pptx deck), committed + pushed.
- Turned the build guide into a **Notion page** under the Boomi hub.
- "Can you help build this demo out?" → set the pair-build model; walked the full runtime setup (no runtime in trial → attach hosted Atom Cloud) and Build A shape-by-shape via screenshots.
- Debugged the split (Split By Profile → Split By Line + Keep Headers) and the validation (Number-type lenient → Mandatory).
- "Anything we can do re: the logic-steps tip?" → confirmed Build A already covers it, then added the credit-routing Decision.
- "Should we Notify finance?" → built then reconsidered → **dropped the Notify** (log-only, doesn't reach finance). User's "who is this notifying?" instinct = exactly the SC judgment to keep.
- "We're clicking the Flat File option rather than the message data" → explained Boomi's profile-as-lens model (dynamic read of the current document; reference the profile matching the format at that point).

## Custom Notes
Focus per user: the demo build process and next steps (Boomi). Build A is functionally complete (validate-and-route, 6 clean / 2 rejected confirmed) with the credit-routing Decision being wired at compress time. Next big piece is Build B (SFDC $1M order routing), gated on Salesforce Dev-org auth, to be done in a fresh session.

---

## Quick Resume Context
Niroo is at the **final presentation/demo round for the Boomi Presales Solutions Consultant (ANZ)** role. The exercise is the classic Boomi SC scenario ($150M corp moving homegrown CRM → Salesforce; on-prem Oracle E-Business, a .NET WMS over XML/HTTP, and a SQL Server warehouse). Full prep suite exists in `interview-prep/`: `boomi-sc-presentation-round.html` (strategy), `boomi-sc-demo-build-guide.md` (build steps), `boomi-sc-demo-deck.pptx` (9-slide deck). **Build A is built and working in the Boomi trial** ("Demo A - Customer Balance Load" on the hosted `SC Demo Runtime` / `Test` env): Start(No Data) → Message(CSV) → Split By Line+Keep Headers → Cleanse(Mandatory validation) → Clean/Decision(credit routing)/Rejected, ending in Return Documents. Result 6 clean / 2 rejected (credit Decision adds a 1-credit / 5-warehouse split). **Key gotchas locked in:** use Split By Line+Keep Headers (not By Profile); validation must use Mandatory (Cleanse is lenient on Number type); reference the profile that matches the document's format at each point. **Next:** finish wiring the credit Decision outputs + test, screenshot the green run, commit the asset/guide updates, then build **Build B** (SFDC Opportunity → Decision Amount>$1M → map → create order → write-back SO#; auth via SFDC security token; talk-don't-build the WMS queue). Also: build the actual PowerPoint, reply to Yashitha re: length/audience, rehearse the WMS-queue answer.

---

## Raw Session Log

**[/model opus; /resume "boomi related material from CC-Session-Logs"]**
Loaded Boomi context from prior session logs (Boomi vs Pendo decision; Artur Gaffanov technical round DONE, demo informally hinted). Established: Boomi is the priority play, mid-loop, demo stage anticipated.

**User:** help me respond to this email — "Exercise material - Solution Engineer | BOOMI" from Yashitha Venkataraman, attaching the Interviewee Exercise PDF, the Boomi Platform Overview pptx, and an mp4.
**Assistant:** Read the exercise PDF — it's the classic Boomi SC exercise: $150M national corp replacing homegrown CRM with Salesforce; Oracle E-Business (on-prem ERP), proprietary WMS (.NET, XML-over-HTTP), proprietary SQL Server data warehouse. 7 integration requirements (new orders in SFDC; >$1M approval + periodic email; create in Oracle + return SO#; send to WMS; WMS 4hr/wk maintenance but orders keep coming; order status visible in SFDC; nightly 500k+ balance CSV → warehouse). Deliverables: prototype Boomi integration + PowerPoint + present to "the customer" + bonus for platform breadth. Drafted a reply (acknowledge, appreciate early material, ask length + audience). Confirmed this is the formal presentation/demo round.

**User:** point 1 already addressed, I have the trial Boomi account.
**Assistant:** Revised the email — folded the trial access into a momentum signal ("already hands-on"), kept the one question (length + audience), no em/double dashes.

**User:** make the second para concise → Assistant tightened it.

**[/career-ops interview-prep "responded, now how do I prep for this"]**
**Assistant:** Read the Platform Overview pptx (15 legacy slides — pillars, why iPaaS, 5 characteristics, Atom/control-plane architecture, topologies, component reuse, Demo). Produced a full prep plan: this round is 60% salesmanship / 40% build; requirement→Boomi capability mapping; the WMS-maintenance-window queue as the differentiator; build recommendation (CSV→validate baseline + SFDC $1M routing headline); deck reframed as a sales narrative; 2026 bonus layer.

**User:** all 3 [save prep doc, build guide, deck].
**Assistant:** Built `interview-prep/boomi-sc-presentation-round.html` (12-section strategy guide matching the existing Boomi HTML style), `interview-prep/boomi-sc-demo-build-guide.md` (step-by-step), and `interview-prep/boomi-sc-demo-deck.pptx` (9 slides via python-pptx, verified valid zip, no dashes).

**User:** commit and push all.
**Assistant:** Staged everything, committed (Boomi SC prep suite + interview-prep backlog + Pendo prep + session logs + .claude commands), pushed `5596ffe..7b2d643` to main. Flagged a possible macOS duplicate file `pendo-micro-demo-workflow 2.html`.

**User:** turn the markdown file into a notion document.
**Assistant:** Searched Notion, found the "Boomi" hub page (under "Sales Engineer"), created the build guide as a sub-page (`37a9176c-75f9-81d6-91a9-eb5c4692eb9a`) with to-do checkboxes, quote blocks, code blocks.

**User:** I can connect to my boomi account, would you help build this demo out?
**Assistant:** Honest framing — can't operate the Boomi canvas (no automation; drag-drop not automatable), so pair-build: user drives, Claude directs, screenshots. The build IS the rehearsal. Proposed Build A first; asked which runtime.

**User:** "i can connect to puppeteer and login" → **Assistant:** Searched — no browser tool available; even with one, the AtomSphere canvas isn't reliably automatable; and the build is the interview rehearsal. Stuck with pair-build.

**User → Assistant (runtime setup, via screenshots):** "1. atom cloud / 2. no runtime environment exists" → fresh trials have no runtime; created `Test` environment, then via "Basic Runtime Setup" chose "In the Cloud" → USA West Integration Test Cloud → attachment "SC Demo Runtime". User deleted env at one point ("unattached demo runtime, should I recreate?") → recreated env, reattached existing runtime (don't make a new one). Confirmed: SC Demo Runtime Online, Cloud Attachment, attached to Test env (env ID 3320a7e4..., runtime ID dc8301d5...).

**[Build A pair-build, screenshot by screenshot]:**
- Integration > Build > Create a new Process. Dismiss "A New Looking Canvas" popup.
- **Start shape** → Type **No Data**, display name "Start - No Data". (User asked "should I provide a display name?" → yes, name every shape in business terms.)
- **+ → Message shape** "Inject customer CSV" → pasted the CSV (static text, ignore variables/Combine option).
- User: "where did we get this CSV data from?" → explained it's synthetic, standing in for the nightly Oracle balance export (requirement 7), with deliberate bad rows.
- User: "use australian company names and is 5 records enough?" → switched to 8 Australian-named rows (6 clean, 2 bad); updated repo CSV + build guide.
- **+ → Data Process** "Split into rows" → Split Documents. Initially **Split By Profile** + created **Flat File Profile** "Customer Balance FF Profile" (Options: Use Column Headers ON, Comma delimiter; Data Elements via **Import** of the CSV → 4 fields; set balance = Number/0.00/Signed, customer_name = Mandatory).
- **+ → Cleanse** "Validate Records" using the flat file profile → auto-forked Clean / Rejected.
- Clean → **Return Documents** "Load to warehouse"; Rejected → **Return Documents** "Exception Report".
- Rename process to "Demo A - Customer Balance Load"; Save; **Test** (SC Demo Runtime).

**[Debugging]:**
- First test error: "The Link Element was not selected for a Split Documents By Profile..." → set Link Element = Record. Re-test: ran but the Document Viewer showed the whole CSV unsplit (no split; log "no link element"). → **Switched Split to Split By Line + Keep Headers.** Re-test: split worked (8 rows), but only 1006 (missing name) rejected — 1004 (`not_a_number` balance) passed.
- Verified balance IS Number/0.00/Signed in the profile → confirmed **Boomi Cleanse is lenient on data-type parsing**. → Marked **balance Mandatory** + changed 1004 to an **empty balance**. Updated repo CSV + build guide (incl. the leniency lesson). Re-test: **6 clean / 2 rejected** ✓ (logs: 6× Load to warehouse, 2× Exception Report). Build A working.
- Reconciled `boomi-sc-demo-build-guide.md` A.2/A.3 to the method that actually worked.

**User:** verify the 2 rejected docs / "documents tab is empty" → explained the Documents pane is a UI quirk for Return Documents; the Logs counts (6+2) are the proof; verification optional.

**User:** "anything we can do regarding [the brief's logic-steps tip]?" → Build A already satisfies it (routing/decisions/error-handling/validation); offered an explicit **credit-routing Decision** as the high-value addition.

**User:** lets do this. → **Decision "Route Credits":** delete "Load to warehouse", add Decision on the Clean +, First Value = Profile Element (Customer Balance FF Profile → balance), Comparison = Less Than, Second Value = Static 0. (Screenshot confirmed config correct.) Then wire True → "Flag credits for finance", False → "Load to warehouse".

**User:** "should we create a notify to let finance know?" → started a **Notify** ("Notify finance: account in credit", Message with {1}=customer_name, {2}=balance). 
**User:** "does it need a title?" → no, optional.
**User:** "this step seems redundant, who is this notifying?" → **Dropped the Notify** — it only writes to the Boomi execution log (operator-facing), doesn't reach finance; narrate the real notification as a production Mail connector. Final clean path = Validate → Route Credits → True: Flag credits for finance / False: Load to warehouse.
**User:** "we are clicking the flat file option rather than the message data's field" → explained Boomi's profile-as-lens model: a Profile Element reads the current live document via that profile (dynamic), and you reference whatever profile matches the document's format at that point (flat file here; the target profile after a Map).

**[/compress "the demo build process and next steps, boomi"]** → this log.
