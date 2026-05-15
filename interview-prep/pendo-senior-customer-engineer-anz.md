# Interview Intel: Pendo — Senior Customer Engineer, ANZ

**Report:** [008-pendo-2026-05-15.md](../reports/008-pendo-2026-05-15.md) (4.2/5)
**Researched:** 2026-05-15
**Sources:** Internal only — JD analysis, eval report, story bank, Pendo demo workflow ([HTML](pendo-micro-demo-workflow.html) / [MD](pendo-micro-demo-workflow.md)). No live Glassdoor / Blind / Reddit pulled.
**Note:** Where intel below is inferred from JD or general SaaS-CE patterns rather than Pendo-specific candidate reports, it is tagged `[inferred]`.

---

## Process Overview

- **Rounds:** unknown — not enough data. Typical SaaS CE process is 4–5 rounds: recruiter → hiring manager → technical demo → panel/cross-functional → leadership. `[inferred]`
- **Format:** likely a **demo/presentation round** is core (this is the format Pendo CEs sell with). The 90-second Loom you've already built is the artefact that should anchor it. `[inferred]`
- **Difficulty:** unknown
- **Positive experience rate:** unknown
- **Known quirks:** Pendo is a product-analytics company hiring a CE — they will absolutely test whether you can use their own product on the spot or describe how you would
- **Sources:** JD only

---

## Round-by-Round (Inferred Structure)

### Round 1: Recruiter Screen (~30 min)
- **Conducted by:** ANZ recruiter or US-based talent partner
- **What they evaluate:** location flexibility, OTE expectations, basic stack alignment, motivation for Pendo specifically
- **Reported questions:** none sourced
- **`[inferred]` likely questions:**
  - "Walk me through your background in 3 minutes"
  - "Why Pendo? Why now?"
  - "You're in Melbourne — talk to me about Sydney"
  - "What's your OTE expectation?"
  - "What does your typical week look like in your current role?"
- **How to prepare:**
  - Open with the 30-second hook: *"Five years in customer engineering across pre-sales (inforcer), implementation (UbiPark Enterprise), and BI consulting (Phocas). Built an AI-queryable portfolio with Claude API. And I've already built a working Pendo demo on a Next.js app I shipped — happy to share the Loom."*
  - On Sydney: *"Open to relocation. The role is the right one. I run a hybrid cadence in Melbourne already; same in Sydney is a one-hour flight away."*
  - On OTE: anchor at AUD 220–260K OTE (60/40 split typical for Senior CE). Eval pegs market at $180–240K — top-of-band is justified by Enterprise account ownership + AI-built artefacts.

### Round 2: Hiring Manager (~45 min)
- **Conducted by:** ANZ Customer Engineering lead (search LinkedIn for "Pendo" + "Customer Engineering" + Sydney/Melbourne pre-call)
- **What they evaluate:** archetype fit, communication style, depth of pre-sales + implementation experience, ability to own end-to-end Enterprise lifecycle
- **`[inferred]` likely questions:**
  - "Tell me about an Enterprise account you owned end-to-end"
  - "Walk me through a technical evaluation you ran. How did you qualify in or out?"
  - "What does a great onboarding look like?"
  - "How do you partner with an AE in a contested deal?"
  - "What's the difference between a Customer Engineer and a Solutions Engineer in your mind?"
- **Best stories to lead with:**
  - **Q on Enterprise ownership** → *UbiPark — Melbourne Airport* story (story-bank.md, "Enterprise Technical Onboarding")
  - **Q on technical evaluation** → *inforcer — Personalised M365 Security Demo* (story-bank.md, "Technical Demo")
  - **Q on partnering with AE** → *inforcer 100+ POCs / commercial close* (eval report Interview Plan #1)

### Round 3: Technical Demo / Live Working Session (~60–90 min)
- **Conducted by:** Senior CE peer + sometimes a Product person
- **What they evaluate:** can you actually run a Pendo demo? Can you tag a feature, build a guide, explain analytics in business terms?
- **THIS IS WHERE YOU WIN.** You have already built the Lumen Health demo, installed Pendo via the AI Setup Assistant, and have a 90-second Loom. **Bring the Loom**, then offer to do a live deep-dive.
- **How to prepare:**
  - Have `lumen-health-niroo.vercel.app` open in a browser tab + Pendo workspace logged in
  - Have the Paths report pre-built showing real visitor data from your roster of 8 mock patients
  - Be ready to walk live through: Tag a Feature → Build a Guide → Schedule NPS → explain segments
  - **Honest gotcha to deliver on camera:** *"In a real onboarding I'd walk the dev team through the `data-pendo-id` attribute pattern instead of CSS selectors. Notice the visible button text is 'View Summary' but I named the Feature 'Open Patient Portal' — Feature names should describe user intent, not button copy."*
  - **The kill shot:** *"I installed this snippet using your own AI Setup Assistant via Claude Code. Took under twenty minutes including the App Router page-load fix that I bet most candidates won't know about."*

### Round 4: Panel / Cross-Functional (~60 min)
- **Conducted by:** mix of CSM, AE, Product, sometimes Engineering
- **What they evaluate:** how you work across functions, business acumen, conflict handling
- **`[inferred]` likely questions:**
  - "Tell me about a time you disagreed with sales/product/engineering"
  - "How do you translate technical work into business outcomes?"
  - "How do you handle a customer who is asking for something the product doesn't do?"
- **Best stories:**
  - **Q on disagreement** → *Phocas ERP integration with MYOB* (eval Interview Plan #4) — political vs technical answer
  - **Q on translating to business** → *UbiPark — Melbourne Airport ROI narrative for C-level* (eval Interview Plan #5)
  - **Q on missing product capability** → *UbiPark — Influencing Roadmap via Customer Patterns* (story-bank.md)

### Round 5: Leadership / Skip-Level (~30–45 min)
- **Conducted by:** ANZ regional leader, possibly VP of Customer Engineering
- **What they evaluate:** strategic thinking, fit with company values, longer-term ambition
- **`[inferred]` likely questions:**
  - "Where do you want to be in 3 years?"
  - "What questions do you have for me?"
  - "What would your first 30/60/90 days look like?"

---

## Likely Questions — Tagged

### Technical (`[inferred]` from JD + Pendo product)

| # | Question | Best Answer Approach |
|---|---|---|
| T1 | "Tag a feature in our app live. What selector strategy?" | Demo on Lumen Health using `data-pendo-id="open-patient-portal"`. Explain CSS-class fragility. |
| T2 | "How would you instrument a Next.js App Router app?" | **Walk through the page-load gotcha you fixed in pendo-page-tracker.tsx** — usePathname → `pendo.pageLoad()`. Most candidates miss this. Show the actual code. |
| T3 | "When would you use the Track API instead of the snippet?" | Server-side events (signed Track API w/ HMAC), backend-fired events that don't have a UI surface, batch backfills. Snippet is for everything UI-driven. |
| T4 | "How do Pendo segments evaluate? Why doesn't a published guide always fire immediately?" | Segments evaluate periodically (every few minutes) — explain that this is why the workflow says "Save Draft" not "Publish" for a 90s demo. |
| T5 | "Walk me through the difference between a Page and a Feature in Pendo" | Page = URL/route rule, Feature = element click matched via selector. Pages tag where users go; Features tag what they do. |
| T6 | "How would you debug 'no events firing'?" | The exact playbook you ran today: `typeof window.pendo`, `validateEnvironment()`, Network tab for `data.pendo.io/data/ptm.gif`, env-var redeploy check. |

### Behavioural

| # | Question | Best Story |
|---|---|---|
| B1 | "Tell me about a time you owned an Enterprise account end-to-end" | UbiPark — Melbourne Airport (story-bank.md) |
| B2 | "Tell me about a difficult technical implementation" | UbiPark — Reducing Enterprise Onboarding Time by 30% (story-bank.md) |
| B3 | "Tell me about a time you influenced product roadmap" | UbiPark — Influencing Roadmap via Customer Patterns (story-bank.md) |
| B4 | "Tell me about a time you disagreed with a stakeholder" | Phocas — ERP integration with MYOB (eval Interview Plan #4) |
| B5 | "Tell me about a discovery call that uncovered something unexpected" | Phocas — BI Discovery Workshop with C-Level (story-bank.md) |
| B6 | "Tell me about something you built / shipped on your own" | AI-queryable portfolio with Claude API + the **Lumen Health Pendo install** itself |

### Role-Specific (Pendo-flavoured)

| # | Question | Why They're Asking | Best Angle |
|---|---|---|---|
| R1 | "Why a CE role at Pendo specifically vs a generic SE role?" | Test motivation, fit with the post-sales-heavy CE archetype | "Pendo's CE owns the full lifecycle — pre-sales evaluation through post-sales expansion. That hybrid is exactly my profile across inforcer + UbiPark. I've never seen the boundary between SE and CSM as a hard line." |
| R2 | "What's your take on product-led growth and how analytics enables it?" | Tests whether you've thought about Pendo's strategic positioning | "Adoption metrics are the leading indicator of churn. I lived this at UbiPark — low usage in week 4 predicted churn at month 6. Pendo gives you that signal in real time, not in the QBR." |
| R3 | "What would you change about Pendo's install docs?" | Tests technical depth + product-mindedness | **The kill answer:** "App Router page-load tracking. Next.js App Router does client-side navigation without firing the URL events the auto-tracker depends on, so without an explicit `pendo.pageLoad()` on `usePathname()` change, Paths reports only see the entry page per session. I hit this installing into Lumen Health. Worth a callout in the Next.js install guide." |
| R4 | "How do you ramp on a product you've never used?" | Tests learning style and self-direction | "I built a working install of Pendo on a healthcare demo app over a weekend, using your own AI Setup Assistant. Show me an event firing and I can usually reverse-engineer the SDK from there." |
| R5 | "How would you onboard a new Pendo customer in their first 30 days?" | Tests the actual job | **Walk through the demo workflow.** Goal → Segment → Guide → Measure (Pendo's own CS recipe). Day 1: tag Pages + Features. Day 7: Path report → diagnose discoverability vs adoption. Day 14: ship a Guide. Day 30: NPS to actual users + first QBR-ready insight. |

### Background Red Flags

| # | Likely Question | Recommended Framing |
|---|---|---|
| RF1 | "You're in Melbourne — Sydney is the role" | "Open to relocation. The role is the right one. The hybrid cadence I run in Melbourne is the same in Sydney. One-hour flight if interim travel is needed before relocation completes." (from eval) |
| RF2 | "No prior Pendo platform experience" | "True until two weeks ago — I've now installed it end-to-end on a working app, including the App Router page-load gotcha. Happy to walk through the install or the Loom right now." (turn the gap into a proof point) |
| RF3 | "Your most recent role at inforcer was pre-sales heavy — this role is post-sales heavy" | "My UbiPark and Phocas years were 70% post-sales — Enterprise account ownership, implementation, expansion. inforcer was pre-sales weighted because the deal cycle was shorter. The full arc across all three is the hybrid CE motion this JD describes." |
| RF4 | "Why are you leaving inforcer / what are you looking for next?" | Honest, forward-looking. Don't trash the current role. "Looking for an Enterprise SaaS environment with deeper post-sales motion and a product-analytics domain where the AI-curious operator profile actually matters." |

---

## Story Bank Mapping

| # | Likely Question/Topic | Best Story | Fit | Gap? |
|---|---|---|---|---|
| 1 | Enterprise account ownership end-to-end | UbiPark — Melbourne Airport | strong | — |
| 2 | Technical implementation under complexity | UbiPark — Reducing Onboarding Time 30% | strong | — |
| 3 | Influencing product roadmap | UbiPark — Influencing Roadmap via Customer Patterns | strong | — |
| 4 | Pre-sales technical evaluation | inforcer — Personalised M365 Security Demo | strong | — |
| 5 | Discovery / commercial close | Phocas — BI Discovery Workshop with C-Level | strong | — |
| 6 | Disagreement / political navigation | Phocas — ERP integration with MYOB | partial | flagged in eval, not yet a STAR+R in story-bank.md |
| 7 | Translating technical work to business outcomes (C-level) | UbiPark — Melbourne Airport ROI narrative | partial | adjacent to #1 but worth its own STAR+R |
| 8 | Building / shipping on your own as proof of AI-curious operator | AI portfolio + Lumen Health Pendo install | partial | not yet a STAR+R in story-bank.md |

**Recommended new STAR+R stories to draft (3 gaps):**

1. **[Political vs Technical] Phocas — MYOB ERP integration** — the technical answer was easy; the exec-level political answer required separate conversations.
2. **[Translating to Business] UbiPark — Melbourne Airport ROI narrative** — analytics into dollar figures for C-level; full story not just the bullet from eval.
3. **[AI-curious Operator / Building to Learn] Lumen Health + Pendo install via Claude Code** — built and instrumented a working demo app for this very interview using Pendo's own AI Setup Assistant. The story IS the proof.

Want me to draft any of these as STAR+R now?

---

## Technical Prep Checklist

- [ ] **Pendo product fluency** — be able to live-tag Pages + Features, build a Guide, schedule NPS, configure a segment without fumbling. Pre-tagged the night before per `pendo-micro-demo-workflow.md` §1.4.
- [ ] **The `pendo.initialize()` shape** — visitor + account objects, why ID must be defined synchronously (or hardcoded), why we split the snippet across loader + initialize in React.
- [ ] **App Router `pendo.pageLoad()` gotcha** — be able to point at `pendo-page-tracker.tsx`, explain why `usePathname()` is the trigger, why Paths reports are broken without it.
- [ ] **`data-pendo-id` selector pattern** — why CSS-class selectors break, what production teams should do, where you've added them in Lumen Health.
- [ ] **Paths vs Funnels vs Feature engagement-time** — when each is the right report. The "10-second bounce" is NOT a native Paths metric (per workflow §2 Segment B honest call-out).
- [ ] **Pendo for CS recipe** — Goal → Segment → Guide → Measure. From the *Onboard New Users* article. Reference verbatim if asked about onboarding methodology.
- [ ] **Free vs Trial vs Paid** — table in `pendo-micro-demo-workflow.md` §5. Don't accidentally pitch a feature behind paywall.
- [ ] **Glossary**: Subscription = the workspace, Application = the tracked product, Visitor = end-user, Account = customer org, Guide = in-app message, Feature = tagged element, Page = tagged route. Use Pendo's vocabulary, not generic.

---

## Company Signals

### Values they screen for `[inferred from public Pendo materials + job description]`
- **Customer obsession** — Pendo's own product is sold to customer-obsessed PMs
- **Build in public / show your work** — they ship engineering blogs, conference talks
- **AI-curious operators** — explicitly named in the JD; not optional
- **Bias to action** — typical of late-stage US-HQ SaaS

### Vocabulary to use
- **Subscription** (not "tenant" or "workspace" — use Pendo's term)
- **Tagged Pages and Features** (not "tracked events" — that's a Mixpanel framing)
- **Guides** (not "in-app messages" or "tooltips" generically — Guides is the product noun)
- **Customer Engineer** (not "Sales Engineer" if you're talking about the role at Pendo)
- **Goal → Segment → Guide → Measure** — name the recipe verbatim if asked about onboarding methodology. Cited from the Pendo Help Center *Onboard New Users* article.

### Things to avoid
- Don't fabricate stats off the Paths report — read real numbers off the chart (workflow §2 Segment B)
- Don't oversell "no code required" — true for content, not for the snippet install (workflow §2 Segment C honest gotcha)
- Don't pitch features behind paywall on a Free workspace (workflow §5)
- Don't use Heap / Mixpanel / Amplitude vocabulary when the Pendo word exists for the same concept

### Questions to ask them (3 sharp ones)
1. *"How is Pendo Listen / agent-experience changing the CE motion in 2026? What new conversations is it opening with existing customers?"* — signals you've tracked their AI strategy beyond marketing fluff
2. *"For ANZ Enterprise customers, what's the biggest install gotcha your CE team sees in the first 30 days? Anything you wish your install docs covered better?"* — sets up the App Router page-load gotcha as a follow-up if they bite
3. *"How is the CE function structured against AE quotas in ANZ? What's the install-base ratio per CE today, and where do you want it to land?"* — signals you understand the variable-comp + capacity dimensions of the role

---

## Pre-Interview 24h Checklist (Interview Day)

- [ ] Pendo workspace logged in, 30-day trial active
- [ ] Lumen Health open at `lumen-health-niroo.vercel.app`
- [ ] Loom link copied to clipboard
- [ ] All Pages + Features pre-tagged in Pendo
- [ ] Paths report pre-built and showing real numbers (8 mock patients seeded across browsers)
- [ ] Guide draft + NPS draft + Segment built and saved
- [ ] CV PDF latest version saved to Desktop
- [ ] Eval report (008) re-read for archetype framing
- [ ] Story bank re-read; 5 stories memorised cold
- [ ] Three new STAR+R stories drafted (political, business-translation, AI-curious operator)
- [ ] Three "questions to ask them" written down
- [ ] LinkedIn search done on every interviewer; one personal observation per person
- [ ] Sydney relocation framing rehearsed once out loud

---

## Post-Research Notes

- **Live web research skipped.** This prep doc is built from internal artefacts only (eval report, story bank, JD analysis, the Pendo demo workflow you've already shipped). Recommend supplementing with a manual Glassdoor / LinkedIn pass on the day before the interview to fill the Process Overview section with real candidate data points if any have been posted.
- **Story Bank gaps** — three new STAR+R stories need drafting (political-vs-technical, business-translation, AI-curious operator). Want me to draft these now and append to `interview-prep/story-bank.md`?
- **No interview date set yet.** When you have one, tell me and I'll set a reminder to re-review this doc 48h before.
