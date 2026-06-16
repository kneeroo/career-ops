# Session Log: 10-06-2026 12:23 - Superloop Solutions Consultant (Apply)

## Quick Reference (for AI scanning)
**Confidence keywords:** superloop, solutions-consultant, telco, pre-sales, teamtailor, apply, cover-letter, cv-pdf, playwright, tracker-links, merge-tracker, report-013, networking-gap, comp-step-down, applied
**Projects:** career-ops (AI job search pipeline)
**Outcome:** Applied to Superloop Solutions Consultant (Melbourne, telco pre-sales). Tailored CV PDF + plain-text cover letter + salary answer submitted. Tracker #013 → Applied. Flagged as B-tier (skills stretch + comp step-down).

## Employer: Superloop
- **Role:** Solutions Consultant — Melbourne, hybrid 3 days/week, ASX-listed connectivity provider
- **URL:** https://superloop-1733718881.teamtailor.com/jobs/7735102-solutions-consultant
- **Score:** 3.2/5 — primary archetype title fit, but telco networking domain gap
- **Status:** Applied 2026-06-10
- **Report:** reports/013-superloop-2026-06-10.md
- **CV:** output/cv-niroo-arjuna-superloop-2026-06-10.pdf (2 pages, A4)

## Decisions Made
- **Used Playwright, not Puppeteer.** User asked for Puppeteer; it wasn't installed, Playwright (same real-Chromium capability) already is and is what the project uses. Drove a Node script via Playwright to read the live Teamtailor form fields rather than download a new dep.
- **Salary answer = $150K–165K inc. super**, not the profile target ($200–240K, floor $180K). Market for Melbourne telco SC is ~$110–150K inc super, ceiling ~$176K. Anchoring at the floor would auto-screen; recommended realistic band to preserve the interview.
- **Honest CV/cover-letter framing on the networking gap** rather than faking carrier-networking terms. Led with transferable pre-sales motion (scoping, SOWs, technical win) + fast-ramp builder story.
- **Skipped "Additional files."** Optional field; only available attachments (SaaS project printouts, M365 certs) don't address the carrier-networking gap and read as filler.
- **Recreated missing system module** instead of hand-editing applications.md (forbidden for adds).
- Dropped IT Visions role and trimmed to 3 projects to hold the CV to 2 pages, per _profile.md format spec.

## Solutions & Fixes
- **Form extraction:** Wrote a Playwright script (run from project dir so node_modules resolves) to dump Teamtailor input/textarea/select fields with labels. Required fields: work-rights radio, salary text, name/email/phone, resume upload. Optional: cover letter textarea, additional files.
- **Missing `tracker-links.mjs`:** `merge-tracker.mjs` imports `normalizeReportLink` from `./tracker-links.mjs`, which was absent locally (ERR_MODULE_NOT_FOUND). Recreated it faithfully from documented behavior: rewrites root-relative `reports/...` links relative to tracker dir (`../reports/...` for data/ layout). Idempotent. v1.9.0 update should ship the canonical version.
- **CV font paths:** template references `./fonts/`; fonts actually live at repo-root `/fonts/`. Generated HTML sits in `output/`, so paths fixed to `../fonts/`.
- **Cover letter as plain text** for the textarea (no markdown), with salutation + sign-off included since a letter field reads as a letter.

## Files Modified
- `reports/013-superloop-2026-06-10.md`: new evaluation report (A–G blocks + machine summary), later updated with "Application Submitted" section, status → Applied.
- `data/applications.md`: added row #013 (via merge-tracker TSV), then status Evaluated → Applied with submission note.
- `batch/tracker-additions/013-superloop.tsv`: TSV addition (merged, moved to merged/).
- `output/cv-niroo-arjuna-superloop-2026-06-10.pdf`: tailored 2-page CV (kept).
- `output/cv-niroo-arjuna-superloop-2026-06-10.html`: intermediate render (deleted at user request).
- `tracker-links.mjs`: **recreated** missing system module (stopgap until v1.9.0 update).

## Setup & Config
- career-ops update available: **v1.8.1 → v1.9.0** (not yet applied). User's data untouched. v1.9.0 expected to restore `tracker-links.mjs` and add structured machine summaries + npx scaffolder.
- No Playwright/Puppeteer MCP server configured; drive browser via Node scripts using the installed `playwright` package (must run from project dir).
- CVs generated from `config/cv-template.html` (protected) NOT `templates/` (auto-update overwrites). Fonts at repo-root `/fonts/`.

## Pending Tasks
- **Suggested next:** `/career-ops contacto` — LinkedIn outreach to a Superloop SC / hiring manager (highest leverage for a B-tier app to get past the salary/networking screen).
- **Consider applying career-ops v1.9.0 update** (restores tracker-links.mjs properly).
- Optional: `node merge-tracker.mjs --migrate` to standardize older tracker rows' `reports/` links to `../reports/` (older rows are inconsistent with #013).

## Errors & Workarounds
- `ERR_MODULE_NOT_FOUND: playwright` when running script from /tmp → run from project dir so node_modules resolves.
- `ERR_MODULE_NOT_FOUND: tracker-links.mjs` in merge-tracker → recreated the module (see Solutions).
- Merge wrote `#` column as `13` not zero-padded → manually fixed to `013` for consistency with other rows.

## Key Exchanges
- User: "use puppeteer" → clarified not installed, used Playwright instead to read live form.
- User: "1. Citizen 2. N/A" → work rights = Australian citizen, no networking exposure to add.
- User: "cover letter is a text box" → provided clean plain-text version with salutation/sign-off.
- User: "should I add any additional files?" → recommended no (filler, doesn't close the gap).
- User: "applied" → flipped #013 to Applied, logged submission in report.

## Custom Notes
Recurring infra note: `tracker-links.mjs` was missing locally and broke `merge-tracker.mjs`. Stopgap module created; the real fix is applying the v1.9.0 update.

---

## Quick Resume Context
Applied to Superloop Solutions Consultant (telco pre-sales, Melbourne) on 2026-06-10 — tracker #013, status Applied, report at reports/013-superloop-2026-06-10.md, CV at output/cv-niroo-arjuna-superloop-2026-06-10.pdf. Flagged B-tier: pre-sales motion transfers but carrier-networking (routing/switching/WAN/SD-WAN/firewalls) is a real gap, and comp band (~$110-150K inc super) sits below Niroo's $180K floor. Next logical step is LinkedIn outreach via `/career-ops contacto`. Note: a missing `tracker-links.mjs` was recreated as a stopgap; applying career-ops v1.9.0 is the proper fix.

---

## Raw Session Log

**User:** `/career-ops apply https://superloop-1733718881.teamtailor.com/jobs/7735102-solutions-consultant` (model set to opus)

**Assistant:** Ran update check (v1.8.1 → v1.9.0 available, surfaced to user). Searched reports/ + tracker for Superloop — no prior evaluation. Loaded cv.md, _profile.md, profile.yml. No Playwright MCP available; fetched JD via WebFetch.

**JD summary:** Solutions Consultant, Superloop (ASX telco), Melbourne hybrid 3 days/week. Pre-sales case design, capacity/cost guidance, network diagrams, NBN/Telstra/Vocus site pre-qual, SOWs/proposals, customer meetings, managed services on Palo Alto/Fortinet/Cisco. Requires routing/switching/WAN/LAN/Wi-Fi; SD-WAN/SASE desirable.

**Assistant fit read:** ~3.2/5. Pre-sales motion transfers cleanly (deep dives, POCs, scoping, SOWs, technical win); core technical bar (carrier networking + vendor firewalls) is a genuine gap. Asked: (1) any networking exposure? (2) lean in or skip?

**User:** "use pupeteer"

**Assistant:** Puppeteer not installed; Playwright is. Wrote a Playwright script to extract the live Teamtailor form. Fields: work-rights radio (Australian citizen / PR / Working-Student visa / None), salary range inc. super (required text), name/email/phone, resume upload (required), additional files (optional), cover letter (textarea, optional). Pulled profile (visa: no sponsorship needed; target $200-240K, floor $180K). WebSearch on Melbourne telco SC comp → ~$110-150K inc super, ceiling ~$176K. Presented comp reality (step-down below floor), draft salary answers, plain cover letter draft, and two blocking questions (citizen vs PR; networking exposure).

**User:** "1. Citizen 2. N/A"

**Assistant:** Built tailored CV: read config/cv-template.html, wrote filled HTML to output/, fixed font paths to ../fonts/, generated 2-page A4 PDF via generate-pdf.mjs. Wrote report 013, TSV addition; merge-tracker failed on missing tracker-links.mjs → recreated the module → merged successfully (#013). Fixed # padding to 013. Presented full submission package: resume PDF, work rights = citizen, salary $150-165K inc super, cover letter, plus B-tier honesty reminder.

**User:** "remove the html output from the outputs folder"

**Assistant:** Deleted the intermediate HTML, kept the PDF.

**User:** "apply"

**Assistant:** Asked whether they'd submitted before changing tracker state.

**User:** "cover letter is a text box"

**Assistant:** Provided clean plain-text cover letter (no markdown) with salutation + sign-off for the textarea.

**User:** "should I add any additional files?"

**Assistant:** Recommended no — optional field, only available attachments don't address the networking gap and read as filler. Portfolio already linked on CV. Leave empty.

**User:** "applied"

**Assistant:** Flipped #013 Evaluated → Applied (2026-06-10), added "Application Submitted" section to report with final answers, updated machine summary status. Offered `/career-ops contacto` for LinkedIn outreach.

**User:** `/compress by employer`

**Assistant:** AskUserQuestion unavailable; proceeded with defaults, organized log by employer (Superloop), saved this session log.
