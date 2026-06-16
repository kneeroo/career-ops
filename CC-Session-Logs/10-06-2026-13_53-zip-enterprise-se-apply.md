# Session Log: 10-06-2026 13:53 - Zip Enterprise Solution Engineer Apply

## Quick Reference (for AI scanning)
**Confidence keywords:** zip, ashby, enterprise-solution-engineer, pre-sales, sales-engineer, procurement, AP-automation, P2P, RFx, IT-security-questionnaires, CV-tailoring, generate-pdf, merge-tracker, applications.md, report-016, sydney, relocation
**Projects:** career-ops (AI job search pipeline); Zip (target employer)
**Outcome:** Tailored CV generated, lightweight A–G report written, application registered and marked Applied for Zip Enterprise Solution Engineer (Pre-Sales), Sydney.

## Decisions Made
- Scored the role **4.4/5** (strong, apply). Bullseye on the Sales Engineer / Pre-Sales archetype.
- Lead differentiator chosen: **procurement/AP/finance domain fluency** (accounting degree + Phocas ERP/MYOB work) — most pure-SaaS SEs can't speak the finance buyer's language. Wove it into summary, competencies, and reframed Phocas as "BI & Finance Analytics SaaS."
- Strongest specific match surfaced: inforcer owned **RFx and IT security questionnaires**, which the JD explicitly lists. Called out prominently in CV + report.
- Skipped a cover letter: the Ashby form has **no** cover-letter or free-text field, so CV-only apply (per _shared.md rule "if the form allows it").
- Generated CV from `config/cv-niroo-zip.html` (protected location), not `templates/` — per _profile.md override.
- Used Ashby posting API + non-user-graphql to extract JD and form fields (WebFetch only returned the title because Ashby renders client-side).
- Held off on the v1.9.0 system update (user not yet decided).

## Key Learnings
- **Ashby JD extraction:** WebFetch fails on Ashby (client-side render). Use `curl https://api.ashbyhq.com/posting-api/job-board/{org}?includeCompensation=true` to get jobs list + `descriptionPlain`, filter by job id.
- **Ashby form fields:** POST to `https://jobs.ashbyhq.com/api/non-user-graphql?op=ApiJobPosting` with `jobPosting(applicationForm{sections{fieldEntries{field}}})`. NOTE: `field` is a `JSON!` scalar — do NOT select subfields on it or you get GRAPHQL_VALIDATION_FAILED. Parse the JSON client-side for `type`, `title`, `isRequired`.
- Zip form is minimal: Name, Email, Phone, Resume, LinkedIn, work-auth (bool), sponsorship (bool). No essays.

## Solutions & Fixes
- JD fetch: `curl -s "https://api.ashbyhq.com/posting-api/job-board/zip?includeCompensation=true"` → node parse → find job by id `c30b33c9-3649-42c6-9c9f-9c1fdb3af8e0`.
- Form fields: graphql query with `field` as a bare JSON scalar (no sub-selection).
- PDF: `node generate-pdf.mjs config/cv-niroo-zip.html output/cv-niroo-arjuna-zip-2026-06-10.pdf --format=letter` → 2 pages, 107 KB.
- Tracker: wrote `batch/tracker-additions/016-zip.tsv` (9 cols, status before score, root-relative report link) → `node merge-tracker.mjs` → added #16.
- Status flip to Applied: direct Edit of `data/applications.md` row 16 (allowed — updating existing entry, not adding) + updated report machine-summary `status: Applied`.

## Files Modified
- `config/cv-niroo-zip.html`: new Zip-tailored CV (procurement/AP angle, RFx emphasis, finance-analytics reframe).
- `output/cv-niroo-arjuna-zip-2026-06-10.pdf`: generated CV PDF (2 pages).
- `reports/016-zip-2026-06-10.md`: A–G evaluation report, 4.4/5, machine summary; status updated Evaluated → Applied.
- `batch/tracker-additions/016-zip.tsv`: tracker addition (merged, moved to merged/).
- `data/applications.md`: added row #16, then flipped status to Applied.

## Setup & Config
- CV template source of truth: `config/cv-niroo-zip.html` derived from `config/cv-niroo-avepoint.html` reference (NOT `templates/cv-template.html` — auto-update clobbers that).
- PDF generator usage: `node generate-pdf.mjs <input.html> <output.pdf> [--format=letter|a4]`.
- career-ops update available: v1.8.1 → v1.9.0 (not applied; user undecided).

## Pending Tasks
- Optional: `/career-ops contacto` for Zip pre-sales hiring manager / SE LinkedIn outreach (offered, not yet run).
- Optional: apply the v1.9.0 career-ops update.
- Interview scheduling caveat: user travel **1 Jul–7 Aug 2026** overlaps likely interview window.

## Errors & Workarounds
- WebFetch on Ashby URL → only title returned (client-side render). Workaround: Ashby posting API + non-user-graphql.
- First graphql query selected subfields on `field` → `GRAPHQL_VALIDATION_FAILED` ("field" is JSON! scalar). Workaround: request `field` bare, parse JSON in node.
- First perl in-place status edit didn't match (row uses `| 16 |` not `| 016 |`, and score-before-status ordering). Workaround: exact-string Edit tool.

## Key Exchanges
- User: `/career-ops apply <ashby-url>` → ran apply mode end-to-end (JD extract, CV tailor, report, tracker).
- User: "applied" → flipped tracker #16 and report to Applied.

## Custom Notes
None

---

## Quick Resume Context
Applied to Zip Enterprise Solution Engineer (Pre-Sales), Sydney, via Ashby — CV-only apply (minimal form, no cover letter). Tracker #16 is Applied, report at `reports/016-zip-2026-06-10.md`, CV at `output/cv-niroo-arjuna-zip-2026-06-10.pdf`. Open follow-ups: LinkedIn outreach via `/career-ops contacto`, and the pending v1.9.0 career-ops update. Note Niroo's 1 Jul–7 Aug 2026 travel for interview scheduling.

---

## Raw Session Log

**User:** `/career-ops apply https://jobs.ashbyhq.com/zip/c30b33c9-3649-42c6-9c9f-9c1fdb3af8e0`

**Assistant:** Ran update check (v1.8.1 → v1.9.0 available, notified user). Loaded `modes/_shared.md` + `modes/apply.md`. Searched reports for "zip" — none found. Read `modes/_profile.md` and `cv.md`. WebFetch on Ashby URL returned only the title (client-side render), so hit the Ashby posting API via curl to get the full JD:
- Role: Enterprise Solution Engineer (Pre-Sales), Sydney, Pre-Sales dept, FullTime.
- Zip = AI platform for enterprise procurement (P2P/AP), $2.2B valuation, $371M raised, logos T-Mobile/OpenAI/AMD/Mars/Dollar Tree.
- JD: discovery, custom demos, POCs, RFx + IT security questionnaires, objection handling, post-sales handoff, product feedback. Qualifications: 5+ yrs solution selling, F500/C-level, procurement/billing/AP familiarity, integrations/APIs. Nice-to-haves: ERP (Oracle/Ariba/Workday)/CLM/GRC, P2P fintech, REST API/middleware dev.

Fetched the Ashby application form via non-user-graphql (after fixing a JSON-scalar query error): minimal — Name, Email, Phone, Resume, LinkedIn, work-auth (Yes), sponsorship (No). No cover letter field.

Built `config/cv-niroo-zip.html` from the avepoint reference, tailoring to procurement/AP (accounting + ERP/MYOB), RFx/IT-security-questionnaires emphasis, Phocas reframed as Finance Analytics. Generated PDF (2 pages, 107 KB). Wrote `reports/016-zip-2026-06-10.md` (4.4/5, A–G + machine summary). Wrote TSV, ran `merge-tracker.mjs` → added #16.

Presented: fit 4.4/5, the RFx/security-questionnaire match, procurement differentiator, the procurement-platform-admin gap, the two boolean form answers, deliverable paths, and offered `/career-ops contacto` + the v1.9.0 update.

**User:** "applied"

**Assistant:** Flipped `data/applications.md` row #16 status to Applied (exact-string Edit after a perl regex miss) and updated the report machine-summary `status: Applied`. Re-offered `/career-ops contacto` and the pending update.

**User:** `/compress all employer`

**Assistant:** Interpreted args as "preserve all sections, topic by employer," skipped interactive prompts, wrote this session log to `CC-Session-Logs/10-06-2026-13_53-zip-enterprise-se-apply.md`.
