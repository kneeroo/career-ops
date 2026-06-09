# Session Log: 09-06-2026 16:53 - Pendo Next-Round Prep (Sales + Technical)

## Quick Reference (for AI scanning)
**Confidence keywords:** Pendo, Senior Customer Engineer, ANZ, interview-prep, DOM, CSS selectors, dev tools, feature tagging, Pages, install script, crm.pendoexperience.io, acmeCRM, Material-UI, Emotion, Playwright probe, STAR+R, story-bank, AE partnership, Hiltsje Smilde, career-ops update v1.8.1
**Projects / Employers:** Pendo (the entire session)
**Outcome:** Built a focused next-round prep doc (MD + styled HTML) for Pendo's two confirmed interviews, grounded in a live headless-browser probe of the official CRM sandbox; added the missing AE-partnership STAR+R story; bumped tracker to Interview; applied career-ops v1.8.1.

---

## By Employer

### PENDO — Senior Customer Engineer, ANZ (Pre-sales & Post-sales)

**Stage:** Advanced past HM (Hiltsje Smilde). Recruiter email confirmed the next round = **two interviews**, scheduled via https://mloop.in/s/8zVmPfkc76W:
1. **30 min — Cross-functional partner in Sales** → pre-sales approach, experience, commercial experience.
2. **45 min — Sr. Customer Engineer** → technical + post-sales. Technical portion on client-side solutions. *Not a coding exercise*, but must be fluent in DOM, web apps, selectors, browser dev tools. Named prep areas: install script, tagging Features & Pages, Pendo Microdemo on capturing analytics, DOM/selectors for tagging & guides, dev tools to inspect/diagnose.

**Official sandbox given by recruiter:** https://crm.pendoexperience.io/ (Pendo pre-installed).

**What changed vs prior prep:** structure is now concrete (2 interviews, not the 5-round guess in the intel doc); the technical round is the round prior prep predicted he'd win; one pivot = practise on the official sandbox, not just his own Lumen Health app; one explicit knock-out bar = "basic concepts about the DOM and web applications."

---

## Decisions Made
- **Don't duplicate the 3 STAR+R stories** the intel doc flagged — they already exist in `story-bank.md` (drafted in a prior session, sourced to Report #008: Political-vs-Technical, Business-Translation, AI-Curious-Operator). Instead added the one genuinely missing for the new Sales round: an AE-partnership / commercial-close story.
- **Build a fresh focused doc** for the two specific interviews rather than editing the existing big intel doc — keeps the existing prep intact and gives a tight single-purpose artifact.
- **Probe the sandbox live with Playwright** (already installed for PDF gen) rather than trust WebFetch — the site is a client-side React SPA so static fetch returns blank. This grounded §2.7 in real selectors instead of guesses.
- **Keep the screenshot, delete the probe script** — screenshot is useful reference of the app layout; the `.mjs` was scratch.
- **HTML render hand-built** in the existing shadcn/Tailwind house style (no pandoc/marked installed; existing prep HTMLs are bespoke designs, not markdown conversions).
- **AE-partnership story flagged as needs-confirmation** — drafted from eval-report references, not ground-truth on the actual inforcer deal; Niroo should sanity-check specifics before telling it.

## Key Learnings
- **crm.pendoexperience.io is "acmeCRM"** — Material-UI (MUI) + Emotion CSS-in-JS. Pendo fully live: agent **v2.327.0_prod-io**, session replay on, guides + Resource Center firing. Sandbox visitor `Erika…@DenebCorp.com`, account **Deneb Corp**.
- **Routes:** `/` (Dashboard: Forecast chart, Quota Attainment, Pipeline donut, Open Opportunities), `/accounts`, `/contacts`, `/opportunities`, `/opportunities/{id}/details`, plus "Mobile".
- **The sandbox is a perfect selector-teaching surface:** clean stable ids exist (`#add-new`, `#profile-button` → good anchors) right next to textbook traps — MUI shared classes (`MuiButton-root MuiButton-contained`, over-match), React `useId` ids (`:rj:`, `:rp:`, regenerate every render), and Emotion `css-` hashes (change every build).
- **Console returns real values live:** `pendo.getVersion()` → `"2.327.0_prod-io"`, `pendo.getAccountId()` → `"Deneb Corp"`, `pendo.getVisitorId()` → real email, `pendo.validateInstall()` present.
- **Network = healthy-install evidence:** `cdn.pendo.io/agent/static/<guid>/pendo.js` (agent), repeated `app.pendo.io/data/ptm.gif` (event beacons), `guide.json`/`guide.gif` (guides), `rec`/`recordingconf` (session replay).
- The two winning moments: **Sales** = "I tell the AE what's *actually* blocking the deal"; **CE** = open dev tools unprompted, type `pendo.validateInstall()` from memory, explain why a hashed-class selector breaks.

## Solutions & Fixes
- **Playwright headless probe pattern** for inspecting a Pendo install on any SPA: launch chromium, capture `request` events filtered to `pendo.io|ptm.gif|data.pendo`, `goto` with `waitUntil:'networkidle'` (it times out on this site because beacons keep firing — caught with `.catch()` and a `waitForTimeout(4000)` fallback, still works), then `page.evaluate()` to read `window.pendo` getters + walk nav/buttons/`data-*`/class samples, plus a full-page screenshot.
- **career-ops update applied:** `node update-system.mjs apply` → v1.7.1 → v1.8.1 (the `.gemini/commands/` pathspec error is harmless — Gemini-specific path absent in this setup). Rollback: `node update-system.mjs rollback`.

## Files Modified
- `interview-prep/pendo-next-round-sales-and-technical.md`: **NEW** — focused prep for the two interviews. Part 1 Sales (pre-sales philosophy, 8 likely Qs S1–S8, commercial vocab, 3 AE questions). Part 2 Technical (§2.1 DOM, §2.2 selectors, §2.3 install script, §2.4 Microdemo/retroactive-capture, §2.5 dev tools, §2.6 debugging playbook, §2.7 live-probed sandbox findings). Plus checklist + win-moments + honesty notes.
- `interview-prep/pendo-next-round-sales-and-technical.html`: **NEW** — styled HTML render in shadcn/Tailwind house style (sticky nav, badges, tables, quote blocks, colour-coded selector verdict table).
- `interview-prep/story-bank.md`: appended **[Commercial Close / AE Partnership] inforcer — Carrying the Technical Win to Signature** STAR+R (sourced to #008, for the Sales round). ⚠️ specifics need Niroo's confirmation.
- `data/applications.md`: Pendo (row 8) status `Applied` → `Interview`; notes updated with the two-interview structure + sandbox + prep-doc pointer.
- `interview-prep/_pendo-crm-screenshot.png`: **NEW** — full-page screenshot of acmeCRM dashboard (kept as reference).
- `interview-prep/_pendo-crm-probe.mjs`: created then **deleted** (scratch).

## Setup & Config
- Playwright (`playwright` + `playwright-core`) is installed in the repo; chromium works headless. No puppeteer (user asked for "puppeteer" → used Playwright instead, same result).
- No `pandoc`, no `marked` module — HTML prep files are hand-authored, not generated.
- career-ops now on **v1.8.1**.

## Pending Tasks
- **Niroo:** pick availability in the mLoop link; open `crm.pendoexperience.io` in Chrome himself to build dev-tools muscle memory.
- **Niroo:** sanity-check the new AE-partnership story against the real inforcer deal before telling it.
- **When interviewer names land:** do a LinkedIn pass for one genuine observation per interviewer.
- **Not yet committed** — new prep doc, HTML, story-bank addition, and tracker update are working changes. User asked to compress before deciding on commit.

## Errors & Workarounds
- **WebFetch on crm.pendoexperience.io returned blank** → expected (client-side React SPA, no server-rendered HTML). Workaround: Playwright headless probe.
- **`page.goto` networkidle timeout** on the sandbox → the Pendo agent keeps firing beacons so the page never goes idle. Wrapped in `.catch()` + fixed `waitForTimeout`; probe completed fine.
- **`validateInstall` threw in the probe** (`Cannot read properties of undefined (reading 'slice')`) → was my JSON.stringify().slice wrapper on a non-string return, not a Pendo problem; the function exists and works in the real console.
- **Update apply pathspec error** (`.gemini/commands/`) → harmless, Gemini-only path not present; update still completed to v1.8.1.

## Key Exchanges
- User pasted the Pendo recruiter email → I read existing prep (micro-demo workflow MD, intel doc, HM HTML) before writing anything, to extend not duplicate. Identified the structure shift + sandbox pivot + DOM knock-out bar.
- User: "can you run pupeteer to poke around? and yes to all 3" → ran Playwright probe (puppeteer not installed), applied update, drafted/located stories, rendered HTML — in parallel where independent.
- Discovered the 3 requested stories already existed → pivoted to the genuinely-missing AE-partnership story so "yes to all 3" still delivered real value.
- Probe results rewrote §2.7 from generic guesses to real selectors/routes/console-values — flagged as the single most impressive thing to narrate in the technical round.

## Custom Notes
None (args were "all by employer" — all sections preserved, organized under the Pendo employer heading; this session was 100% Pendo).

---

## Quick Resume Context
Niroo is mid-process at **Pendo** for Senior Customer Engineer ANZ — through the HM, now prepping **two interviews** (30m Sales cross-functional + 45m Sr CE technical). The deliverables are `interview-prep/pendo-next-round-sales-and-technical.md` and its `.html` twin, both grounded in a live Playwright probe of `crm.pendoexperience.io` (acmeCRM / MUI+Emotion, Pendo v2.327; tag on `#add-new`/`#profile-button`, avoid `:rj:` useId + `css-` Emotion hashes). Story-bank has a new AE-partnership STAR+R needing fact-check. Tracker row 8 = Interview. Nothing committed yet — Niroo still owes: book the slots, self-practise the sandbox, send interviewer names for LinkedIn recon.

---

## Raw Session Log

### User (1)
Set model to opus. Then: "this is what i received from pendo" + pasted recruiter email. Email content: advancing to next step; two virtual interviews to schedule via https://mloop.in/s/8zVmPfkc76W — (a) 30-min with a cross-functional partner in Sales re Presales approach/experience/commercial experience; (b) 45-min with a Sr. Customer Engineer focused on technical & post-sales support skills. The CE interview includes a technical portion assessing comfort with client-side solutions — not a coding exercise, but need DOM + web-app basics. Asked to familiarize with: implementing Pendo via install script, tagging Features & Pages, Pendo Microdemo on capturing analytics. Sample site: https://crm.pendoexperience.io/. Will gauge understanding of DOM + selectors for tagging features/building guides + browser dev tools to inspect/diagnose.

### Assistant (1)
Confirmed it's an advancement. Ran silent update check → update-available v1.7.1→v1.8.1 (told user, offered to defer). Listed existing Pendo prep files; read `pendo-micro-demo-workflow.md` + `pendo-senior-customer-engineer-anz.md` (intel doc). Tried WebFetch on the sandbox → blank (SPA). Summarized what changed: structure now concrete (2 interviews not 5), technical round is the predicted win, pivot to official sandbox, DOM is a knock-out bar. Wrote NEW `interview-prep/pendo-next-round-sales-and-technical.md` — Part 1 Sales (philosophy + S1–S8 + vocab + AE questions), Part 2 Technical (DOM, selectors, install script, Microdemo retroactive-capture, dev tools, debugging playbook, sandbox walkthrough, checklist, win-moments, honesty notes). Bumped `data/applications.md` row 8 to Interview. Offered: draft 3 missing STAR+R stories, render HTML, run the update.

### User (2)
"can you run pupeteer to poke around? and yes to all 3"

### Assistant (2)
Detected Playwright installed (no puppeteer); applied career-ops update → v1.8.1 (harmless .gemini pathspec error); read story-bank format. Wrote `interview-prep/_pendo-crm-probe.mjs` (Playwright: capture pendo network requests, evaluate window.pendo getters + nav/buttons/data-attrs/class samples, screenshot). Ran it:
- App = **acmeCRM**, MUI + Emotion. Title "Dashboard". Pendo loaded, v2.327.0_prod-io, visitor `Erika040626-0@DenebCorp.com`, account "Deneb Corp".
- Network: `cdn.pendo.io/agent/static/74924fb4-.../pendo.js`, many `app.pendo.io/data/ptm.gif` beacons, `guide.json`/`guide.gif`, `recordingconf`/`rec` (session replay), feedback widget ping.
- Nav routes: `/`, `/accounts`, `/contacts`, `/opportunities`, `/opportunities/{id}/details`.
- Buttons: stable ids `#profile-button`, `#add-new` ("ADD NEW"); generic ones only MUI classes; row menus `id=":rj:"`/`:rp:"` (React useId); Pendo's own `_pendo-badge_…` + Resource Center with `data-layout`/`data-pendo-*`.
- Screenshot: acmeCRM dashboard (Forecast, Quota Attainment, Pipeline donut, Open Opportunities; nav Dashboard/Accounts/Contacts/Opportunities/Mobile; "Made with ♥ by Pendo Demo Engineering").
Rewrote §2.7 of the MD with real routes + a selector verdict table (`#add-new`/`#profile-button` = tag; MUI class = don't; `:rj:`/`css-` = traps; `_pendo-badge_` = recognise as Pendo) + kill-line + real console values + network evidence. Updated honesty note to "probed live 2026-06-04."
Checked story-bank: the 3 intel-flagged stories already exist (#008). Appended the missing **[Commercial Close / AE Partnership] inforcer** STAR+R instead. Wrote `interview-prep/pendo-next-round-sales-and-technical.html` in shadcn/Tailwind house style. Deleted the probe script, kept the screenshot. Summarized all 4 deliverables; noted nothing committed; asked about committing.

### User (3)
"compress all by employer" → this log.
