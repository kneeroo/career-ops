# Session Log: 10-06-2026 13:07 - AvePoint Pre-Sales Engineer Apply

## Quick Reference (for AI scanning)
**Confidence keywords:** avepoint, pre-sales-engineer, solutions-engineer, greenhouse, sydney, hybrid, microsoft-365, purview, sharepoint, teams, inforcer, cover-letter, cv-tailoring, career-ops, apply, relocation, tracker, report-015
**Projects:** career-ops (AI job search pipeline); AvePoint application package
**Outcome:** Built tailored CV + cover letter PDFs for AvePoint Pre-Sales Engineer (Sydney), wrote report 015 (4.4/5), generated form answers, user submitted — tracker marked Applied.

## Decisions Made
- Scored AvePoint Pre-Sales Engineer 4.4/5 — near-exact match because inforcer role was Pre-Sales Engineer on a Microsoft 365 security platform (same stack AvePoint sells around).
- Main friction = Sydney hybrid 3 days/week vs candidate in Melbourne. Resolved by framing "open to Sydney relocation" in CV header + cover letter, plus explicit readiness for 3-day hybrid and travel.
- Generated CVs/cover letters from `config/` (protected location), NOT `templates/` — per `modes/_profile.md` override (templates/ gets clobbered by auto-update).
- Tailored CV away from fortiro's finance/fraud framing toward M365 architecture (Purview, SharePoint, Teams), technical-win strategy, RFx, discovery → demo → POC, ANZ market.
- Did NOT auto-mark Applied at generation time — held at Evaluated until user confirmed submission (ethics rule), then flipped to Applied on "applied".
- Salary guidance: profile target $200-240K AUD OTE may be top-of-band for Sydney mid-senior Pre-Sales Engineer (~$160-220K market); advised staying open on base/variable split rather than anchoring hard.

## Key Learnings
- Greenhouse JD content does not render via WebFetch (JS form shell only). Fix: hit the public API `https://boards-api.greenhouse.io/v1/boards/{org}/jobs/{id}` and strip HTML for the full JD, location, offices, metadata, updated_at.
- AvePoint posting updated 2026-06-08 (2 days fresh) → Legitimacy High Confidence.

## Solutions & Fixes
- Fetch full Greenhouse JD: `curl -s "https://boards-api.greenhouse.io/v1/boards/avepoint/jobs/7562657" | python3 -c "...json/html strip..."`
- PDF generation: `node generate-pdf.mjs config/cv-niroo-avepoint.html output/cv-niroo-arjuna-avepoint-2026-06-10.pdf` (and cover letter). CV = 2 pages, cover letter = 1 page.
- Tracker add via TSV + merge: wrote `batch/tracker-additions/015-avepoint.tsv` then `node merge-tracker.mjs` (never edit applications.md to ADD).

## Files Modified
- `config/cv-niroo-avepoint.html`: tailored CV (M365/Purview/technical-win emphasis), created.
- `config/cover-letter-niroo-avepoint.html`: tailored cover letter addressed to AvePoint Solution Engineering APAC, created.
- `output/cv-niroo-arjuna-avepoint-2026-06-10.pdf`: generated CV PDF (2pp, 106KB).
- `output/cover-letter-niroo-arjuna-avepoint-2026-06-10.pdf`: generated cover letter PDF (1pp, 53KB).
- `reports/015-avepoint-2026-06-10.md`: A-G evaluation report, 4.4/5, with Machine Summary YAML.
- `batch/tracker-additions/015-avepoint.tsv` → merged into `data/applications.md` (entry #15).
- `data/applications.md`: entry #15 AvePoint, status Evaluated → Applied (after user confirmed submission).

## Setup & Config
- Update available: career-ops v1.8.1 → v1.9.0 (deferred, not applied this session — user data untouched either way).
- CV/cover-letter source of truth for generation = `config/cv-template.html` + per-company `config/cv-niroo-{company}.html` (protected from auto-update). Recover template from git if missing: `git show 62c6b80:templates/cv-template.html`.
- Candidate: Niroo Arjuna, Melbourne (open to relocation), niroo.arjuna@gmail.com, +61 451 425 315, linkedin.com/in/nirooa, portfolio niroo-arjuna.vercel.app.

## Pending Tasks
- `/career-ops contacto` — find AvePoint ANZ Solution Engineering lead/hiring manager, draft short LinkedIn touch (not yet run).
- Follow-up nudge if no response by ~17 June 2026 (~5 business days). Reminder not yet set.

## Errors & Workarounds
- WebFetch returned only the application form shell for the Greenhouse URL (no JD body). Workaround: Greenhouse boards API + HTML strip (see Solutions).
- Prematurely set tracker status to Applied during merge; corrected back to Evaluated until user confirmed, per ethics rule (never mark applied before user submits).

## Key Exchanges
- User: `/career-ops apply {avepoint greenhouse URL}` → ran apply mode; no prior report existed, so read JD, evaluated inline, built full package + form answers.
- User: "applied" → flipped tracker entry #15 to Applied; offered contacto + follow-up cadence.

## Custom Notes
None

---

## Quick Resume Context
Applied to AvePoint Pre-Sales Engineer (Sydney, hybrid 3d/wk) via career-ops apply mode. Strong 4.4/5 match — inforcer Pre-Sales Engineer on M365 stack maps directly to AvePoint's Purview/SharePoint/Teams asks. Package (tailored CV + cover letter PDFs in output/, report 015) built and submitted; tracker #15 = Applied. Open threads: run `/career-ops contacto` for AvePoint ANZ SE lead LinkedIn outreach, and follow up ~17 June if no reply. Note the relocation framing (Melbourne → Sydney) in case it comes up in screening.

---

## Raw Session Log

**User:** `/career-ops apply https://job-boards.greenhouse.io/avepoint/jobs/7562657?gh_src=s3dzagkz1us`

**Assistant:** Ran silent update check (v1.8.1 → v1.9.0 available, deferred). Loaded `modes/_shared.md` + `modes/apply.md`. Searched reports/ and tracker for AvePoint — none found. Read `cv.md`, `modes/_profile.md`, `config/profile.yml`. WebFetch on the Greenhouse URL returned only the form shell; fetched full JD via Greenhouse boards API. JD = Pre-Sales Engineer, Sydney NSW, hybrid 3d/wk, M365 architecture (Purview/SharePoint/Teams), discovery→demo→POC→RFx, high autonomy. Read `config/cover-letter-niroo-fortiro.html` and `config/cv-niroo-fortiro.html` to match format. Ran `node cv-sync-check.mjs` (passed). Built `config/cv-niroo-avepoint.html` (M365/technical-win emphasis) and `config/cover-letter-niroo-avepoint.html` (relocation framed). Generated both PDFs into output/. Wrote `reports/015-avepoint-2026-06-10.md` (4.4/5, A-G + Machine Summary). Wrote tracker TSV and ran merge-tracker (entry #15). Corrected status from Applied → Evaluated pending submission. Presented full form answers (basic info, LinkedIn, how-heard, visa = no sponsorship, salary $200-240K OTE guidance, voluntary self-id optional), flagged Sydney relocation friction, offered to open browser to verify field labels or tweak salary/relocation.

**User:** "applied"

**Assistant:** Updated `data/applications.md` entry #15 status Evaluated → Applied. Suggested next moves: `/career-ops contacto` for AvePoint ANZ Solution Engineering lead LinkedIn outreach, and follow-up nudge ~17 June if no response. Asked whether to run contacto now.

**User:** `/compress all employer`

**Assistant:** Generated this session log (all sections) and saved to CC-Session-Logs/.
