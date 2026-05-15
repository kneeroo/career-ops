# Pendo Micro Demo — Runnable Workflow

**Role:** Senior Customer Engineer, ANZ (Pendo)
**Format:** 90-second Loom recording
**Story:** Onboarding "Lumen Health" — fictional mid-market SaaS, ~8,000 MAU, flat adoption on a new patient-portal feature
**Recipe followed:** Pendo's own *Goal → Segment → Guide → Measure* CS play
**Sources:** All click-paths verified against Pendo Help Center docs (URLs at end)

---

## 1. Setup checklist (do this 24 hours before recording)

### 1.1 Create the workspace
- Sign up for **Pendo Free** at https://www.pendo.io/pendo-free/
- **Critical:** activate the **30-day full-feature trial offered at registration** *before* installing the snippet. Post-install, only a 14-day trial is offered. The 30-day trial unlocks unbranded Guides and NPS, which look cleaner on camera.
- Free tier covers ≤500 MAU and includes: unlimited Page/Feature tagging, all behavior reports, in-app guides, NPS — enough for the demo even without the trial.

### 1.2 Build the sample app
Pendo does **not** ship a hosted sandbox app for prospects. Closest first-party artifact is the React Native sample at https://github.com/pendo-io/RN-demo-app-React-Navigation.

**Recommended path for a web demo (faster):**
- Fork any small open-source React/Next.js dashboard template
- Rename routes/components to look like a healthcare SaaS:
  - `/home` → Welcome
  - `/visits` → My Visits *(host page for the tagged button)*
  - `/patient-portal` → Patient Portal *(destination after click)*
- Drop in the Pendo snippet from `Settings → Subscription Settings`
- **Critical:** define `visitor.id` and `account.id` *before* `pendo.initialize()` runs, or no events fire
- Deploy to Vercel (5 min) so it has a real URL Pendo can tag against

### 1.3 Seed real data
- Tagged data only becomes visible after Pendo backfills the prior 90 days — usually <1 hour, occasionally up to 24
- **Click around the sample app for 30–60 minutes the day before recording**
- Use 2–3 different browser profiles (incognito + Chrome + Safari) so the visitor count is >1
- This is the difference between Paths showing real percentages vs an empty chart

### 1.4 Pre-tag Pages and Features
**Do not tag live on camera.** DOM fumbling looks bad. Pre-tag and walk through them as if reviewing.

Pre-tag this list before recording:
- **Pages:** My Visits (`/visits`), Patient Portal (`/patient-portal`)
- **Feature:** "Open Patient Portal" button (the click target on My Visits — visible label reads "View Summary", but Feature name in Pendo stays `Open Patient Portal` for naming stability)
- **Note:** the deployed app at `lumen-health-niroo.vercel.app` has no login wall (public demo mode), so there's no Login page to tag.

### 1.5 Pre-build artifacts as drafts
- **NPS survey** — built but **Save Draft**, do not Publish (no real responses needed for the demo)
- **Tooltip Guide** — built but **Save Draft**, demo shows the wizard ending in Save Draft
- **Segment** — "Patient Portal not used in last 7 days"

---

## 2. Click-path script (rehearse 3x)

### Segment A — Tag Feature + Pages [0:22 – 0:34 in script]

**Pages:**
- `Product → Pages → Tag Pages` (top-right button)
- Enter URL → name Page (e.g., "Patient Portal")
- Visual Design Studio loads → confirm URL rule → Save

**Features:**
- `Product → Features → Tag Features` (top-right)
- Enter URL of the Page hosting the patient-portal button
- Choose **Tag side-by-side** (better for demo — viewer sees app + rules panel)
- Click the patient-portal button in the live preview
- Use **up/down arrows top-right of Studio** to walk DOM tree if needed (parent = bigger, child = smaller)
- Under **Feature Element Matching**, accept **Suggested Match**
- Name: "Open Patient Portal"
- Save

**What viewer sees:** Pendo Visual Design Studio with the Lumen Health app rendered in main panel, right-side panel showing CSS selector rule, highlight box around tagged button.

**Honest gotcha to mention on-camera:** "CSS-class selectors break when devs change classnames — in a real onboarding I'd walk the dev team through Pendo's `data-pendo` attribute pattern. Notice the visible button text is 'View Summary' but I'm naming the Feature 'Open Patient Portal' — that's intentional. Feature names should describe user intent, not button copy. If marketing renames the button next quarter, my Path report doesn't break."

---

### Segment B — Paths report [0:34 – 0:56]

- `Analytics → Reports → Create report → Path`
- **Activity source:** Select event → "Open Patient Portal" Feature click
- **Anchor direction:** dropdown → switch from default "Starting from" to **"Leading to"**
  - This shows what users do *before* the feature, which is the discoverability story
- **Segment:** Everyone (or "Active in last 30 days" if you built it)
- **Date range:** Last 30 days
- Run

**What viewer sees:** Sankey-style flow diagram with Page-to-Page transitions, percentages on each branch.

**HONEST CALL-OUT — read the actual numbers off the chart, do NOT rehearse fake stats.** Paths gives you % drop-off between nodes. The "10-second bounce" stat in the original script is **NOT a native Paths metric** — pair Paths with a Funnel report or Feature engagement-time card if you want time-to-bounce.

**Recommended on-camera framing:**
> "Paths shows me where they fall off — looks like [READ ACTUAL NUMBER]% never reach the portal. I'd pair this with a Funnel for time-to-convert if I wanted the bounce-time number too."

This is more credible than a fabricated stat and sounds exactly like how a real CE works.

---

### Segment C — Tooltip Guide [0:56 – 1:14]

- `Guides → + Create Guide` (top-right)
- Choose **Layout → Tooltip** from the gallery
- **Step 1 panel:** set **Page Location** = My Visits *(fire it before users reach the portal, not after)*
- **Anchor element:** click the patient-portal button in live preview — tooltip pins to it
- **Edit copy** in WYSIWYG: *"New: Patient Portal — see your test results in one place →"*
- Adjust Location tab in Edit container for tooltip position (top/right/etc.)
- **Activation card** (toolbar, before step 1): Automatic on page load, or Automatic with Badge
- **Segment dropdown:** select pre-built segment "Patient Portal not used in 7 days"
  - If not pre-built: `Visitors → Segments → New Segment` → rule: Feature "Open Patient Portal" used 0 times in last 7 days
- **Schedule:** Start date = today
- **Save Draft** (do not Publish)

**What viewer sees:** Pendo Designer with the Lumen Health app rendered live, the tooltip overlaid on the patient-portal button, right-side panel with Activation/Segment/Schedule cards.

**Honest gotcha:** "No code required" is true for *content*, but the snippet still has to be installed. Don't oversell.

---

### Segment D — NPS survey [1:14 – 1:22]

- Left nav `NPS → + Create NPS Survey` → opens **NPS Survey Wizard** (4 steps)
- **Step 1 Content:** customize 0–10 question + follow-up text
- **Step 2 Segment:** dropdown → "Create new segment"
  - Rule: `Feature "Open Patient Portal" used at least 1 time in last 14 days`
  - Eligible-visitor count appears next to dropdown
- **Step 3 Schedule:** Start now, recurring every 90 days
- **Step 4 Review** → Save Draft

**What viewer sees:** 4-step wizard with numbered left rail, final preview shows NPS card as it would render in-app.

**Best-practice flag to call out on-camera (signals you've read Pendo's CS docs):**
> "Pendo's own guidance is to target NPS at visitors with first visit >30 days ago. I'm loosening that here because we want early-signal feedback right after a feature launch — that's the trade-off I'd discuss with the customer's CS lead."

This single sentence proves you've read the knowledge base. It's the strongest signal in the whole demo.

---

## 3. Final 90-second script (with click cues + honest framing)

### Open — 12s
> Hey Pendo team, I'm Niroo, applying for the Senior Customer Engineer role in ANZ.
>
> The thing I love about Pendo is that it's the *flight recorder* for product decisions. Most product teams are flying blind on adoption. Pendo gives them the black box. My job as a CE is to make sure customers know how to read it.

### Customer setup — 10s
*[Switch to Pendo workspace, Lumen Health workspace name visible]*
> Quick scenario: Lumen Health is a post-visit patient companion — patients log in to read the plain-language summary of their consultation. 8,000 MAU. They bought Pendo because adoption of the summary view is flat, and the VP of Product needs a number by end of month.

### Tag — 12s
*[Show Product → Features view with "Open Patient Portal" Feature visible]*
> Day one, I tag the summary button as a Feature — I'll call it "Open Patient Portal" in Pendo regardless of the visible button text — plus the My Visits and Patient Portal pages. Two minutes of setup, no engineering ticket. From here every interaction is on the record.

### Paths — 22s
*[Open Paths report, "Leading to Open Patient Portal", Last 30 days]*
> By day seven, I run a Path report leading to the portal.
>
> *[Numbers visible on screen]*
>
> [READ ACTUAL %] of users never reach the feature. The ones who do, drop off here *[point at node]*. So the VP doesn't have an adoption problem — they have a discoverability problem. Different fix, visible in the data.

### Guide — 18s
*[Open Guide Designer with tooltip on My Visits]*
> So we ship a Guide — a one-line tooltip on the My Visits page that nudges users toward the summary on their next session. Targeted at users who haven't opened a summary in seven days. No code, no deploy, live in an hour.
>
> Two weeks later we re-run the Path report. The lift becomes the number the VP takes to their board.

### NPS — 10s
*[Show NPS wizard, Step 2 Segment with feature-usage rule]*
> Then we trigger NPS to the users who actually used it. Pendo's guidance says target visitors with 30+ days tenure — I'm loosening that here for early-signal feedback. That's the trade-off I'd discuss with the customer's CS lead. The loop closes.

### Close — 8s
> Picture one of your existing ANZ customers — the one whose CSM is asking what to show in the next QBR. This is the motion I'd run for them on Monday. Looking forward to talking.

**Total runtime target: 92 seconds. If over: cut the Paths section by removing the "Different fix, visible in the data" sentence.**

**Bonus 5s if you go under time** *(only if you have headroom)*:
> "And because Lumen Health tracks ongoing action items as weekly streaks, every day a patient comes back becomes a behavioural signal Pendo can instrument. That's the kind of engagement metric customers will pay to expand into."

This signals you understand Pendo's expansion motion, not just the land.

---

## 4. Recording day checklist

### Before hitting record
- [ ] Pendo workspace open, logged in
- [ ] Lumen Health sample app open at `lumen-health-niroo.vercel.app` in second tab (or split window) — public, no login required
- [ ] All four pre-tagged artifacts visible: Pages (My Visits, Patient Portal), Feature (`Open Patient Portal`), Guide draft, NPS draft, Segment
- [ ] Paths report pre-loaded and showing real numbers (refresh if stale)
- [ ] Loom set to **face cam bottom-right**, screen full
- [ ] Notifications silenced, browser bookmarks bar hidden
- [ ] Practice run #3 completed and timed under 95s

### During recording
- Click before narrating (let the action happen, then describe)
- Don't say "as you can see" or "basically" — strip them ruthlessly
- If you fumble a click, keep going. Loom edits are obvious.
- Read real numbers off the chart — never fabricate

### After recording
- Watch playback at 1x once to confirm timing and clarity
- Add a chapter at each segment boundary in Loom (helps Pendo's hiring team scrub)
- Set Loom title: "Niroo Arjuna — Pendo Senior CE ANZ — 90s Onboarding Demo"
- Set Loom thumbnail to a frame showing the Paths report (most visually distinctive)

---

## 5. What's free vs paid (so you don't accidentally demo a locked feature)

| Capability | Pendo Free | 30-day Trial | Notes |
|---|---|---|---|
| Page + Feature tagging | ✅ unlimited | ✅ | Safe |
| Paths, Funnels, behavior reports | ✅ | ✅ | Safe |
| In-app Guides (tooltips) | ✅ Pendo-branded | ✅ Unbranded | Trial = cleaner on camera |
| NPS surveys | ✅ Pendo-branded | ✅ Unbranded | Trial = cleaner on camera |
| Resource Center | ✅ basic | ✅ | Safe — mention if time |
| Salesforce / Slack / Segment integrations | ❌ | ✅ | Don't demo |
| Pendo Feedback module | ❌ | ✅ | Don't demo |
| API access | ❌ | ✅ | Don't demo |

**All four demo capabilities (Tag, Paths, Guide, NPS) are accessible on Free or Trial. Zero risk of demoing a locked feature.**

---

## 6. Strategic moves that separate this from the BizGuide bad demo

| BizGuide bad demo | This workflow |
|---|---|
| Walks left-hand menu | Walks customer journey |
| Empty dashboards, no data | Pre-seeded with 30+ min of real clicks |
| Configures NPS for a company called "hello" | Configures NPS for "Lumen Health" with real segment logic |
| Hedges: "I'm pretty sure this is premium" | Explicit Free vs Trial map upfront |
| Fabricated specifics ("10-second bounce") | Reads real Paths % off chart |
| Closes with "leveraging tools you can gain insights" | Closes inviting hiring manager to picture their own customer |

---

## 7. Bonus — single-sentence variants for outreach

If you cut down the demo for LinkedIn/email opener:
> "Recorded a 90-second Loom showing how I'd onboard a hypothetical Lumen Health onto Pendo — Goal → Segment → Guide → Measure, the recipe straight from your CS playbook."

The phrase "the recipe straight from your CS playbook" signals you've read https://support.pendo.io/hc/en-us/articles/360042446472. That single reference will probably get you the call.

---

## 8. Source URLs (verify before recording if anything looks off)

- Pendo Free: https://www.pendo.io/pendo-free/
- Get started: https://support.pendo.io/hc/en-us/articles/15691778509211
- Page tagging: https://support.pendo.io/hc/en-us/articles/360032292151
- Feature tagging: https://support.pendo.io/hc/en-us/articles/360031950492
- Visual Design Studio: https://support.pendo.io/hc/en-us/articles/360032293971
- Paths: https://support.pendo.io/hc/en-us/articles/360049997812
- Funnels: https://support.pendo.io/hc/en-us/articles/360031863292
- Create a Guide: https://support.pendo.io/hc/en-us/articles/8146679315867
- Guide settings: https://support.pendo.io/hc/en-us/articles/360031864612
- NPS setup: https://support.pendo.io/hc/en-us/articles/43643936689691
- Pendo for CS: https://support.pendo.io/hc/en-us/articles/360031871032
- Recipe: Onboard New Users *(THE source for the demo's structure)*: https://support.pendo.io/hc/en-us/articles/360042446472
- Improve health & retention: https://support.pendo.io/hc/en-us/articles/360042454072
- React Native sample app: https://github.com/pendo-io/RN-demo-app-React-Navigation
- Demo Center (tone reference): https://www.pendo.io/demo-center/

---

## 9. Honest verification gaps

- **"10-second bounce" stat is not a native Paths metric.** Use real numbers off the chart, or pair Paths + Funnel for time-to-convert.
- **No first-party hosted Pendo sandbox app for prospects exists.** You must bring your own (forked dashboard template + Pendo snippet, deployed to Vercel).
- **Pendo Free article (`/articles/6069107464091`) wasn't directly readable** during research; details corroborated from search snippets and product reviews. Confirm Free tier limits at signup.
