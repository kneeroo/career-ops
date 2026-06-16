# Session Log: 10-06-2026 13:40 - Heidi Health FDE Application

## Quick Reference (for AI scanning)
**Confidence keywords:** Heidi Health, Forward Deployed Engineer, FDE, career-ops, apply mode, CV generation, generate-pdf, Playwright, Ashby application form, Lumen Health, case study, base64 image embed, font path fix, Pendo, Monash Health, salary AUD, work authorisation, vacation 1 Jul-7 Aug, tracker Applied
**Projects:** career-ops (job search pipeline), Lumen Health (Next.js healthtech portfolio app)
**Outcome:** Generated a Heidi-tailored CV + one-page Lumen Health case study PDF, viewed the live Ashby application form, prepped all form answers, user submitted the application; tracker updated to Applied.

## Decisions Made
- Generate tailored CV to `config/cv-niroo-heidi.html` (protected location), NOT `templates/` which auto-updates overwrite. PDF: `output/cv-niroo-arjuna-heidi-health-2026-06-10.pdf`.
- Led the Heidi CV with the Lumen Health project + Monash Health health-system angle, Python elevated to first skills line, SCIM/OIDC surfaced (per report 001 personalisation plan).
- Used Playwright (already installed, same Chromium engine) instead of Puppeteer (not installed) for rendering/screenshots and viewing the Ashby form. Did not install Puppeteer (redundant).
- Embedded case-study screenshots as base64 data URIs because `generate-pdf.mjs` passes a `baseURL` to Playwright `setContent()` which IGNORES it, so relative image paths resolve against about:blank and fail.
- Salary answer: AUD $180-200K base, flexible on base/equity split (target total comp $200-240K from profile.yml; FDE base market ~$130-170K).
- Notice/availability: keep it simple on the form ("Available immediately") and NOT disclose the 1 Jul-7 Aug travel on the application — raise it later with a human. User explicitly wanted "simple but not too transparent".
- Case study: removed Pendo/analytics angle and the hero "Home" screenshot per user; kept it simple, single centered visit-summary screenshot.

## Key Learnings
- `generate-pdf.mjs` only rewrites FONT urls to absolute `file://` (lines 126-138); it does NOT fix relative image paths. `setContent`'s `baseURL` option is a no-op in Playwright. => embed images as base64 for self-contained PDFs.
- CV HTML font path bug: sibling tailored CVs (avepoint/fortiro/ivalua) reference `./fonts/` from `config/`, but fonts live at repo-root `fonts/`. Correct path from config/ is `../fonts/`. Fixed only on the Heidi CV; the other three still have the bug.
- Playwright resolves from career-ops `node_modules`, not the Lumen Health repo — run screenshot scripts from the career-ops dir.
- Screenshot sharpness: capture at deviceScaleFactor 3 for crisp text in the PDF; 1.4x looked blurry.
- Heidi role now lists Melbourne/Sydney hybrid (Sydney added since the May eval).
- Lumen Health README explicitly maps Lumen onto Heidi's product line (Scribe / Evidence / Comms / Remote → Lumen = patient clinical surface) — ready-made "why Heidi" interview answer.

## Solutions & Fixes
- Render HTML→PNG preview (poppler/pdftoppm not installed): use Playwright `chromium` + `page.goto(file://...)` + `emulateMedia('print')` + `screenshot({fullPage:true})`, run from career-ops dir.
- View JS-heavy Ashby form (WebFetch can't see it): Playwright `goto` + extract labels/inputs/selects/buttons via `page.evaluate`, plus full-page screenshot.
- Embed image: `node -e` read PNG → base64 → string-replace `./img.png` with data URI in the HTML.
- Remove an embedded image cleanly: node regex replace targeting the `.shot` div by its `alt` attribute (avoids touching the base64 blob of the other image).

## Files Modified
- `config/cv-niroo-heidi.html` (NEW): Heidi-tailored CV; font path `../fonts/`.
- `output/cv-niroo-arjuna-heidi-health-2026-06-10.pdf` (NEW): final CV, 2 pages.
- `config/case-study-lumen-heidi.html` (NEW): one-page Lumen Health case study; header centered; base64-embedded single hi-res visit screenshot; Pendo removed; eyebrow "Project Case Study · Healthtech".
- `config/lumen-shot-hero.png`, `config/lumen-shot-visit.png` (NEW): screenshots (hero now unused after edit).
- `output/lumen-health-case-study-niroo.pdf` (NEW): final portfolio attachment, 1 page ~699 KB.
- `data/applications.md`: Heidi row status Contacted → Applied (2026-06-10), note updated with attachments + contacts.
- Memory: `project_travel-jul-aug-2026.md` (NEW) + MEMORY.md index line.

## Setup & Config
- career-ops update available: v1.8.1 → v1.9.0 (NOT applied this session).
- PDF gen: `node generate-pdf.mjs <input.html> <output.pdf> --format=a4`.
- Heidi application URL (Ashby): https://jobs.ashbyhq.com/heidihealth.com.au/95443f49-b1e7-4a07-b196-9e7a24adc84a/application
- Lumen live: https://lumen-health-niroo.vercel.app | repo: /Users/niroo/Documents/GitHub/Lumen Health | GitHub: github.com/kneeroo/Lumen-Health
- Profile comp target: AUD $200K-240K; visa_status: "No sponsorship needed".

## Pending Tasks
- User never confirmed work-auth radio value (Citizen vs PR) — was the last open blank before submit, but user reported "applied" so presumably resolved.
- Optional: fix `./fonts/` → `../fonts/` in avepoint/fortiro/ivalua CV HTMLs (still buggy).
- Optional next moves offered: (1) LinkedIn/email note to Alyssa (recruiter) or Shahil (peer FDE) flagging the application — `/career-ops contacto`; (2) build interview-prep talking points for the FDE loop (`interview-prep/heidi-health-fde.md` exists); (3) follow-up cadence reminder.
- Scheduling risk: 1 Jul-7 Aug travel could collide with interview loop — front-load interviews into late June.

## Errors & Workarounds
- `pdftoppm not installed` when Reading PDF pages → rendered HTML to PNG via Playwright instead.
- Case-study images not loading in PDF → root cause: `setContent` baseURL no-op → fixed via base64 embedding.
- Blurry screenshot → re-captured at deviceScaleFactor 3.
- `ERR_MODULE_NOT_FOUND` for playwright when running script from Lumen Health dir → run from career-ops dir.
- Edit tool "File has been modified since read" after base64 embed → switched to `node -e` string replace for subsequent edits.

## Key Exchanges
- User invoked `/career-ops apply` with Heidi URL → loaded report 001 (4.1/5, FDE, was "Contacted").
- "regenerate resume" → built Heidi-tailored CV + PDF.
- "use puppeteer" (x2) → used Playwright instead (puppeteer not installed); rendered CV preview, then viewed the Ashby application form + extracted all fields.
- "I have a vacation 1 July to 7 August" → saved to memory; then "keep it simple but not too transparent" → form notice = "Available immediately", disclose travel later.
- "Please provide your portfolio... is an attachment" → built one-page Lumen case study PDF with screenshots.
- "dive deep into Lumen Health" → full feature/use-case map produced.
- "ignore pendo, keep simple" / "get rid of Home image" / "font blurry" / "get rid of /Forward Deployed from header" → iterative case-study edits.
- "applied" → tracker updated to Applied.

## Custom Notes
None

---

## Quick Resume Context
User (Niroo, Melbourne FDE/Solutions Engineer) applied to Heidi Health Forward Deployed Engineer via Ashby on 2026-06-10 with a tailored CV (`output/cv-niroo-arjuna-heidi-health-2026-06-10.pdf`) and a one-page Lumen Health case study (`output/lumen-health-case-study-niroo.pdf`). Tracker is now Applied. Next logical steps: warm follow-up to recruiter Alyssa Thompson or peer FDE Shahil Prasad, build FDE interview-prep talking points (incl. Lumen→Heidi product-line mapping), and watch scheduling against the 1 Jul–7 Aug travel. Note the `generate-pdf.mjs` base64-for-images requirement and the `../fonts/` path fix for any future CV/case-study HTML.

---

## Raw Session Log

**Session focus:** career-ops `apply` mode for Heidi Health FDE → CV regen → view application form → portfolio case study → submit.

1. **/career-ops apply {Heidi Ashby URL}** — Ran update check (v1.8.1→v1.9.0 available, not applied). Confirmed onboarding files present. Loaded `modes/_shared.md` + `modes/apply.md`. Found Heidi already in pipeline as report 001 (FDE, 4.1/5, status Contacted). Read report 001 (full A–F + gaps: FHIR/HL7/SCIM/EMR nice-to-haves; Monash Health = health-system proof; ERP→EMR analogy). WebFetch on the Ashby form returned only the title (JS-rendered). Flagged the May 60-day duplicate-block risk. Asked user for screenshot/paste of form.

2. **regenerate resume** — Read `cv.md` + `config/cv-niroo-avepoint.html` (pattern) + `generate-pdf.mjs` usage + fonts location (repo-root `fonts/`). Wrote `config/cv-niroo-heidi.html` (Lumen first, Monash Health bolded, Python elevated, SCIM/OIDC surfaced, no em/double dashes). Generated PDF (2 pages). 

3. **use puppeteer** — Puppeteer not installed; Playwright is. Rendered CV to PNG via Playwright; spotted branded fonts not loading (path `./fonts/` from config/ is wrong → fixed to `../fonts/`). Regenerated; Space Grotesk/DM Sans now render. Noted siblings still have the bug.

4. **use puppeteer to view application page** — Playwright navigated the Ashby form, extracted all fields: Name*, Email*, Resume* (upload), Location*, work-authorisation radio (Citizen/Visa/PR/Other), sponsorship Yes/No, local currency, expected annual gross salary, notice period, portfolio upload (attachment), portfolio links (url), Submit. Screenshot saved. No 60-day block at form stage; role now Melbourne/Sydney hybrid. Produced full copy-paste fill plan; salary = AUD $180-200K base flexible; flagged work-auth as the one blank needing user input.

5. **vacation 1 Jul–7 Aug** — Saved `project_travel-jul-aug-2026.md` + MEMORY index. Updated notice answer. Then **"keep it simple but not too transparent"** → form answer reduced to "Available immediately"; travel to be raised with a human later.

6. **portfolio field is an attachment** — Offered + built one-page Lumen Health case study. Captured live screenshots (hero + visit) via Playwright (app references Heidi Scribe/Comms). Wrote `config/case-study-lumen-heidi.html` matching CV design; generated PDF (1 page).

7. **images not loading / center header** — Diagnosed `setContent` baseURL no-op; re-captured smaller screenshots; base64-embedded them; centered header. Regenerated.

8. **dive deep into Lumen Health** — Read routes, lumen components, mock data, nav config, Pendo instrumentation. Delivered full feature/use-case map: product thesis (patient clinical surface in the Heidi product gap); features (Home, My Visits + visit detail with glossary tooltips/action items/meds/ask-question, Action Items aggregation with streaks, Medications with refill+details dialogs, Lab Results with flags, Messages secure chat with context handoff, Notifications, Profile); mechanics (glossary regex engine, localStorage/sessionStorage persistence, composite keys); the Pendo analytics-engineering story (App Router pageLoad fix, init ordering, 8-patient demo roster); stack (Next.js 16/React 19/TS/Tailwind v4/shadcn/Clerk/Sentry/Vercel; forked from Kiranism starter); deliberate scope (no backend/LLM/HIPAA/FHIR/RBAC).

9. **update case study, ignore pendo, keep simple** — Replaced Pendo bullets with clinical-feature bullets (meds+refill, labs+flags, secure messaging); removed Pendo from stack; softened "measurable" → "shipped and working". Regenerated.

10. **get rid of Home image** — Node transform removed the hero `.shot` block; centered the single remaining shot at 62% width. (Regenerate was interrupted.)

11. **font blurry** — Re-captured the visit page at deviceScaleFactor 3 (run from career-ops dir to resolve playwright); swapped the hi-res base64 in; regenerated (1 page, ~699 KB, crisp).

12. **get rid of /Forward Deployed from header** — Eyebrow → "Project Case Study · Healthtech". Regenerated.

13. **applied** — Updated `data/applications.md` Heidi row: Contacted → Applied (2026-06-10) with attachments + contacts in the note. Offered next steps (contacto / interview-prep / follow-up cadence) and flagged the travel-vs-scheduling risk.
