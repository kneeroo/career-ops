# Pendo — Next Round Prep (Two Interviews)

**Role:** Senior Customer Engineer, ANZ (Pre-sales & Post-sales)
**Stage:** Post-HM. Two interviews to schedule via https://mloop.in/s/8zVmPfkc76W
**Confirmed structure (from recruiter email):**
1. **30 min — Cross-functional partner in Sales.** Pre-sales approach, experience, commercial experience.
2. **45 min — Sr. Customer Engineer.** Technical + post-sales support. Includes a technical portion on client-side solutions. *Not a coding exercise* — but you must be fluent in the DOM, web apps, selectors, and browser dev tools.

**Official sandbox to practice on:** https://crm.pendoexperience.io/ (Pendo pre-installed CRM demo app)
**Named prep areas (their words):** install script · tagging Features & Pages · Pendo Microdemo on capturing analytics · DOM & selectors for tagging/guides · browser dev tools to inspect & diagnose.

**Cross-refs:** [pendo-senior-customer-engineer-anz.md](pendo-senior-customer-engineer-anz.md) (full intel) · [pendo-micro-demo-workflow.md](pendo-micro-demo-workflow.md) (Lumen Health Loom) · [pendo-hm-hiltsje-smilde.html](pendo-hm-hiltsje-smilde.html) (HM round) · story-bank.md

---

## TL;DR — what each interview is really testing

| Interview | Surface question | What they're actually scoring |
|---|---|---|
| Sales partner (30m) | "Tell me about your pre-sales approach" | Can I drop you into a live deal next week and trust you to carry the technical win without me babysitting? Do you get the commercial side, not just the tech? |
| Sr CE (45m) | "Tag this feature / inspect this issue" | Can you sit in front of a customer's app, open dev tools, and not panic? Do you genuinely understand the DOM, or did you memorise a demo? |

The Sales round wants a **partner**. The CE round wants someone who is **unfakeable on fundamentals**. Prep them differently.

---

# PART 1 — Sales Cross-Functional (30 min)

This is a peer from the AE/Sales org checking that the CE they'll be paired with is a force multiplier in deals. Keep it commercial. Lead with outcomes and dollars, not features.

## Your one-paragraph pre-sales philosophy (memorise the shape, not the words)

> "My job in pre-sales isn't to demo features — it's to de-risk the technical decision so the deal can close. I run discovery first, find the one or two things that have to be true for them to buy, and I build the demo or POC around proving exactly those. I qualify hard and early, because a POC that drags is a deal that dies. And I stay close to the AE on commercials — I never want to be the engineer who technically wins the eval and then gets surprised by the price."

## Likely questions + angles

| # | Question | Angle / story |
|---|---|---|
| S1 | "Walk me through your pre-sales approach." | Discovery → identify the technical win criteria → tailored demo/POC → hand the AE a clean technical close. Use **inforcer — Personalised M365 Security Demo** as the proof. |
| S2 | "Tell me about a deal you helped win." | **inforcer 100+ POCs / commercial close** — you ran the technical eval *and* understood what unblocked the commercial signature. |
| S3 | "How do you partner with an AE in a contested deal?" | Division of labour: AE owns the commercial relationship and champion; you own the technical proof and the multi-threaded technical buyers. You feed the AE risk signals from the eval ("their security team is the real blocker, not price"). |
| S4 | "How do you qualify a deal technically — when do you say no?" | Name your kill criteria: no clear technical win condition, no access to a real environment, no engaged technical champion, or a requirement the product genuinely can't meet. Walking away from a bad POC protects everyone's time. |
| S5 | "How do you handle a feature gap on a live deal?" | Don't lie, don't over-promise the roadmap. Reframe to the underlying job-to-be-done, show the supported path, and if it's a real gap, log it and bring Product in. Story: **UbiPark — influencing roadmap via customer patterns.** |
| S6 | "How do you talk about ROI / business value?" | Translate usage into money. Story: **UbiPark — Melbourne Airport ROI narrative for C-level.** Low adoption in week 4 predicted churn at month 6 — analytics is the leading indicator the buyer pays for. |
| S7 | "Why Pendo, commercially? Why do customers buy it?" | Adoption data is the leading indicator of both churn (CS) and expansion (Sales). Pendo sells to PMs and CS leaders who are flying blind on adoption. The land is analytics; the expand is guides + the broader platform. You understand it's a land-and-expand motion, not a one-and-done. |
| S8 | "What's the difference between a CE and a CSM/AE to you?" | The CE owns *technical trust* across the whole lifecycle — pre-sales eval through post-sales adoption. You don't see the SE/CSM boundary as a hard line, which is exactly why a hybrid CE role fits you. |

## Commercial vocabulary to use naturally
- **Land and expand**, **net revenue retention**, **time-to-value**, **technical win**, **champion / economic buyer**, **mutual close plan**, **POC exit criteria**, **OTE / quota-carrying vs quota-supporting**.
- Pendo nouns: **Subscription** (the workspace), **adoption**, **Guides**, **tagged Pages and Features**.

## Sharp questions to ask the Sales partner
1. "When a CE is doing their job well in a Pendo deal, what does that look like to you as the AE — what do you *not* have to worry about?"
2. "What's the most common reason a technically-strong Pendo eval still doesn't close in ANZ?"
3. "How is the CE-to-AE ratio set in ANZ, and how does the team split pre-sales vs the post-sales install base?"

---

# PART 2 — Sr CE Technical (45 min)

The CE peer will assess "comfort working with solutions installed and run client-side." Expect: a shared screen on `crm.pendoexperience.io` (or your own workspace), and questions like "tag this feature," "why might this selector break," "this guide isn't showing — how do you debug it." **Open dev tools without being asked. That alone signals comfort.**

## 2.1 The DOM — be able to explain it in plain English (knock-out criterion)

The recruiter literally said you need "basic concepts about the DOM." Have these crisp:

- **What the DOM is:** the browser's live, in-memory tree of the page. Every element — a `<div>`, a `<button>`, a table row — is a node in that tree. HTML is the static source the server sends; the DOM is the living version the browser builds from it, and JavaScript (and Pendo) read and change *the DOM*, not the original HTML.
- **Why "live" matters for a CRM/SPA:** apps like this CRM are single-page apps. When you click "Accounts," the URL and the visible content change *without a full page reload* — JS swaps nodes in the DOM. This is exactly why Pendo needs page-load signals on route changes (your App Router `pendo.pageLoad()` gotcha) — there's no browser navigation event to hang off.
- **Elements have:** a tag (`button`), an `id` (unique), `class`es (reusable styling), `data-*` attributes (custom data), and text. These are the hooks selectors grab onto.

## 2.2 Selectors — how Pendo finds an element

A **CSS selector** is the address of an element in the DOM tree. Pendo records a selector when you tag a Feature; when a user clicks something matching it, Pendo fires a Feature event.

| Selector | Example | Matches |
|---|---|---|
| Element/tag | `button` | every button |
| Class | `.btn-primary` | elements with that class |
| ID | `#save-account` | the one element with that id |
| Attribute | `[data-pendo-id="save-account"]` | elements with that attribute/value |
| Descendant | `.toolbar button` | buttons anywhere inside `.toolbar` |
| Child | `.toolbar > button` | buttons directly inside `.toolbar` |
| Position | `tr:nth-child(2)` | the 2nd row |

**Specificity (rough hierarchy):** `id` beats `class` beats `tag`. Prefer the most stable, most specific *and* most human-meaningful hook.

**Why selectors break (say this unprompted — it's the senior signal):**
- **Hashed/auto-generated class names.** Modern CSS tooling (CSS Modules, styled-components, Tailwind JIT) emits classes like `css-1a2b3c` or `Button_root__9f2x1`. They change every build, so a Feature tagged on them silently stops matching.
- **Position-based selectors** (`nth-child`) break the moment the layout reorders.
- **Dynamic content** — IDs that include a record id (`#account-4821`) won't match the next record.

**The fix, and what you'd advise a customer's dev team:** add stable, semantic `data-pendo-id` attributes to the elements that matter ("instrument-for-analytics"). It's a five-minute PR, it survives redesigns, and it makes the whole tagging process self-documenting. This is the single most valuable thing a CE can teach a new customer's engineers.

- **Pages vs Features:** **Pages are matched by URL rules**, not selectors (e.g., `/accounts/*`). **Features are matched by element selectors.** Pages = where users go; Features = what they click.

## 2.3 The install script — what it actually does

- It's **one JavaScript snippet** dropped in the `<head>`. It loads the Pendo **agent** asynchronously so it never blocks the page.
- You call **`pendo.initialize({ visitor: { id, ... }, account: { id, ... } })`** once you know who the logged-in user is. A **visitor id is mandatory** — no id, no events.
- From that moment the agent **passively auto-captures** every page view and click, plus serves Guides. You don't have to decide in advance what to track.
- **Snippet/agent vs Track Events API:** the agent captures anything that happens in the UI (client-side). The **Track Events API** is for things with no UI surface — server-side events, backend jobs, batch backfills — fired explicitly. If asked "snippet or Track API?": snippet for everything UI-driven, Track API for server-side/headless events.

## 2.4 The Microdemo concept — *capture everything, tag later* (the differentiator)

Pendo's "capturing analytics" pitch rests on **retroactive analytics**: from the moment the snippet is installed, Pendo records *all* page and click activity. So when you tag a Feature next month, you get historical data going back to install date — you don't have to have known in advance what you'd care about. Contrast with event-based tools (Mixpanel/Amplitude) where you only get data for events you instrumented *before* the user acted.

Say it like this: **"With Pendo you instrument the app once, then ask questions later. With event-based analytics you have to predict every question before you ship. That's why a CE can walk into a customer 90 days post-install and immediately produce adoption data on a feature nobody thought to track on day one."**

## 2.5 Browser dev tools — your live diagnostic kit (open these on camera)

**Elements panel** (right-click → Inspect):
- Read the DOM tree, find the element you want to tag, check whether it has a stable `id`/`data-*` or only hashed classes.
- "Copy → Copy selector" gives Chrome's auto-selector — *use it as a starting point, not gospel*; it's often brittle nth-child junk. Narrate that you'd harden it.

**Console** — Pendo health checks you should be able to type from memory:
- `window.pendo` → is the agent even loaded?
- `pendo.validateInstall()` → Pendo's built-in install validator.
- `pendo.getVersion()`, `pendo.getVisitorId()`, `pendo.getAccountId()` → confirm initialize ran with real metadata.
- `document.querySelector('your-selector')` → test whether a selector actually matches *one* element (returns the node or `null`).
- `pendo.flushNow()` → force-send queued events instead of waiting.

**Network panel** (filter for `pendo` or `data.pendo.io`):
- `data.pendo.io/data/...` (incl. the `ptm.gif` beacon) = events/analytics going out. 200s = healthy.
- `pendo.io/...guide...` requests = guide content loading.
- No requests at all → snippet not installed or `initialize` never ran.

**Application/Storage panel:** Pendo stores visitor id and "guide already seen" state here — useful when debugging "why does this guide keep showing / never show."

## 2.6 Debugging playbook — "this guide isn't appearing"

Have a crisp, ordered answer ready (this is the most likely live diagnostic prompt):
1. **Is the agent loaded?** Console: `window.pendo` defined? Network: is the snippet request 200?
2. **Did initialize run with a real visitor?** `pendo.getVisitorId()` — is it a real id or undefined/anonymous?
3. **Is the visitor in the guide's segment?** Segments evaluate periodically, not instantly — a just-published guide or a just-changed segment can lag a few minutes.
4. **Does the activation element/selector still match?** `document.querySelector(...)` — did a hashed class change break the anchor?
5. **Is the guide actually published and scheduled for now**, and has this visitor already dismissed it (Storage)?
6. **Network:** is the guide payload loading at all?

## 2.7 The actual sandbox — what's really in `crm.pendoexperience.io` (probed live)

I drove a headless browser into the site and inspected the real DOM. This is **acmeCRM**, a sales CRM built with **Material-UI (MUI) + Emotion** CSS-in-JS. Pendo is fully live: agent **v2.327**, session replay on, guides + Resource Center firing. The sandbox visitor is `Erika...@DenebCorp.com`, account **Deneb Corp** — so the Console commands below return *real* values you can show on screen.

**Routes (tag these as Pages by URL rule):**
- `/` → Dashboard (Forecast chart, Quota Attainment, Pipeline donut, Open Opportunities)
- `/accounts` → Accounts list
- `/contacts` → Contacts list
- `/opportunities` → Opportunities list
- `/opportunities/{id}/details` → Opportunity detail (use a wildcard: `/opportunities/*/details`)
- plus a "Mobile" nav item

**The selector lesson is handed to you on a plate here — this is the single most impressive thing you can narrate.** The app has a clean split between good and bad anchors:

| Element | Real selector available | Verdict — say this out loud |
|---|---|---|
| "ADD NEW" button | `id="add-new"` | **Tag on this.** Clean, semantic, stable id. Textbook good anchor. |
| Profile button | `id="profile-button"` | **Tag on this.** Same — a stable, meaningful id. |
| Generic buttons (Cancel, submit, Sort) | only `MuiButton-root MuiButton-contained` etc. | **Don't tag on the MUI class** — *every* contained button in the app shares it, so the Feature would over-match. Anchor on a stable parent + structure, or ask for a `data-pendo-id`. |
| Row "Menu" buttons | `id=":rj:"`, `id=":rp:"` | **Trap.** These are React `useId`-generated ids — they regenerate on every render. Never tag on a colon-wrapped id. Great example to call out unprompted. |
| Emotion styles | classes like `css-1a2b3c` | Hashed CSS-in-JS — changes every build. The classic "why did my Feature stop matching" cause. |
| `_pendo-badge_...`, Resource Center | `data-layout="badgeResourceCenter"`, `data-pendo-*` | **Recognise these are Pendo's own injected elements, not the app's.** Knowing the difference is a senior tell. |

**The kill line for the tagging exercise:**
> "Good news — whoever built this gave the primary actions real ids: `#add-new`, `#profile-button`. I'd tag straight onto those. But look at these row menu buttons — `id=':rj:'` — that's a React `useId`, it regenerates every render, so tagging on it would silently break. And the styling is Emotion, so the `css-` hashes are useless as anchors. This is exactly the conversation I'd have with a customer's dev team: 'give me a handful of `data-pendo-id` attributes on the actions that matter and your analytics never break again.'"

**Rehearse this loop on 3–4 elements (Dashboard → Accounts → Opportunities detail):**
1. Inspect. "Let me see what I've got." Open Elements, look for a stable id/`data-*`.
2. Call the selector honestly (stable id vs MUI-shared-class vs hashed/`useId` trap).
3. Name the **Feature by user intent, not button copy.** "ADD NEW" on `/accounts` → Feature `Create Account`. "If they rename the button, my report doesn't break."
4. Tag the **Page by URL rule** (`/opportunities/*/details`), not by an element.
5. Tie to analytics: "Because Pendo captured this retroactively from install, I can build a Path on `Create Account` and show adoption back to day one."

**Console commands that return real values here (verified live) — type these on camera:**
- `window.pendo` → defined (agent loaded)
- `pendo.getVersion()` → `"2.327.0_prod-io"`
- `pendo.getVisitorId()` → a real visitor email
- `pendo.getAccountId()` → `"Deneb Corp"`
- `pendo.validateInstall()` → Pendo's built-in health check
- `document.querySelector('#add-new')` → returns the button node (proves the selector matches exactly one)

**Network evidence of a healthy install (filter `pendo`):**
- `cdn.pendo.io/agent/static/<guid>/pendo.js` → the agent loading
- repeated `app.pendo.io/data/ptm.gif?...` → the event beacons firing (every page/feature ping)
- `app.pendo.io/data/guide.json` + `guide.gif` → guides loading
- `app.pendo.io/data/rec` + `recordingconf` → session replay is enabled on this sandbox
> Point at the stream of `ptm.gif` calls and say: "That's the agent shipping page and feature events back to Pendo in real time — that's what 'capturing analytics' looks like on the wire."

---

## Pre-interview checklist (do the night before)

- [ ] Open `crm.pendoexperience.io` in Chrome. Click every nav item. Inspect 5–6 elements and note which have stable `data-*`/`id` vs only hashed classes.
- [ ] In the Console on that site, run `window.pendo`, `pendo.getVersion()`, `pendo.validateInstall()` — see what a real Pendo install reports.
- [ ] Open the Network tab, reload, filter `pendo` — watch the agent load and the event beacons fire. Know what healthy looks like so you'd spot broken.
- [ ] Re-read §2.1–§2.3 out loud once. If you can explain the DOM and why selectors break to a non-technical friend, you've cleared the bar.
- [ ] Pendo workspace logged in, Lumen Health (`lumen-health-niroo.vercel.app`) ready as your *own* proof-of-build offer.
- [ ] Loom link on clipboard for the "I already built this" moment.
- [ ] Sales round: 3 commercial stories memorised (inforcer demo, inforcer commercial close, UbiPark ROI). 3 questions for the AE written down.
- [ ] CE round: debugging playbook (§2.6) memorised as an ordered list.
- [ ] LinkedIn-stalk both interviewers once availability is confirmed; one genuine observation each.

## The two moments that win these rounds

- **Sales round:** "I don't just win the technical eval — I tell the AE what's *actually* blocking the deal." (Be the partner who reads the commercial room.)
- **CE round:** open dev tools unprompted, type `pendo.validateInstall()` from memory, and say out loud why a hashed-class selector will break. That's the difference between someone who *demoed* Pendo once and someone who *understands* it.

---

## Verify before the call (honesty notes)
- §2.7 was probed live with a headless browser on 2026-06-04 — the routes, ids (`#add-new`, `#profile-button`, `:rj:`), MUI/Emotion stack, agent version, and Network beacons are all real as of that date. **Still open it in Chrome yourself** so the muscle memory is yours, not mine — and confirm nothing changed.
- The Console API surface (`validateInstall`, `getVisitorId`, `getVersion`, `getAccountId`) is stable across Pendo installs and confirmed present here. Run each one once so you're not surprised live.
- "Microdemo on capturing analytics" = Pendo's own short demo of retroactive/auto-capture analytics. The *concept* (capture everything, tag later) is the thing to internalise; find and watch the actual asset if the recruiter linked one.
