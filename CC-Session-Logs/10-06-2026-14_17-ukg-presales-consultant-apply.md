# Session Log: 10-06-2026 14:17 - UKG Presales Consultant Apply

## Quick Reference (for AI scanning)
**Confidence keywords:** UKG, Eightfold, presales-consultant, solution-consultant, LEADP018078, Sydney, relocation, payroll, WFM, HCM, workforce-management, MYOB, accounting, career-ops, apply-mode, cv-tailoring, cover-letter, report-018, tracker-merge, Niroo-Arjuna
**Projects:** career-ops (AI job search pipeline)
**Outcome:** Evaluated + applied to UKG Presales Consultant (Sydney) via Eightfold; tailored CV + cover letter generated, report #018 written, tracker marked Applied.

## Decisions Made
- Scored UKG Presales Consultant **4.3/5** — primary-archetype bullseye (presales/solution consulting) with one real gap (WFM/HCM/payroll product domain), bridged via Accounting degree + MYOB payroll-data integration.
- Reframed the CV **away from cybersecurity** (the Mimecast base) toward consultative presales + enterprise SaaS implementation + payroll/workforce-ops adjacency. UKG cares about discovery, solution storytelling, demos, exec stakeholders — not the M365 security stack.
- Owned the domain gap **honestly** in cover letter para 3 rather than hiding it.
- Treated Sydney location as relocation-framed (consistent with prior Zip/AvePoint/Mimecast apps; candidate is Melbourne, open to Sydney relocation).
- Travel >25% treated as standard for SE/SC, no scoring penalty (per `modes/_profile.md` location policy).

## Key Learnings
- **Eightfold careers pages are JS-rendered** — WebFetch returns only the config/template layer, not the JD. The JD is available via the JSON API: `https://{tenant}.eightfold.ai/api/apply/v2/jobs/{jobId}?domain={company}.com`. Returns title, location, department, `display_job_id`, `t_create`/`t_update` epochs, and `job_description` (HTML). This is the zero-browser way to extract Eightfold JDs.
- Eightfold's job API had **no preset screening questions** (`questions` field absent) — UKG collects them interactively during the apply flow, so form answers had to be pre-drafted for the likely standard set (work auth, relocation, travel, why-role, experience, salary, source).
- CV/cover-letter HTML must live in `config/` because the templates reference `./fonts/` relatively and the woff2 files are in `config/fonts/`.

## Solutions & Fixes
- Extracted UKG JD via curl + node one-liner against the Eightfold JSON API, stripping HTML tags and decoding entities.
- Generated PDFs with `node generate-pdf.mjs config/{file}.html output/{file}.pdf --format=a4` (CV 2pp, cover letter 1pp).
- Tracker addition via TSV → `node merge-tracker.mjs` (added #18), then **edited** applications.md directly to flip status Evaluated → Applied (allowed for status updates on existing rows).

## Files Modified
- `config/cv-niroo-ukg.html`: new tailored CV (presales/SC framing, payroll/WFM adjacency, accounting + MYOB highlighted)
- `config/cover-letter-niroo-ukg.html`: new tailored cover letter (storytelling/discovery lead, domain gap owned)
- `output/cv-niroo-arjuna-ukg-2026-06-10.pdf`: generated (2pp, 104.6 KB)
- `output/cover-letter-niroo-arjuna-ukg-2026-06-10.pdf`: generated (1pp, 52.5 KB)
- `reports/018-ukg-2026-06-10.md`: A–G evaluation report + Machine Summary YAML
- `batch/tracker-additions/018-ukg.tsv`: tracker addition (moved to merged/ after merge)
- `data/applications.md`: row #18 added via merge, then updated to Applied

## Setup & Config
- career-ops update available (v1.8.1 → v1.9.0) — surfaced but not applied this session.
- CVs generated from `config/cv-template.html` lineage (protected location), NOT `templates/` (per `modes/_profile.md` override).
- No em-dashes / double-dashes in candidate-facing docs (per memory `feedback_punctuation`).
- Fonts: `config/fonts/{space-grotesk,dm-sans}-latin{,-ext}.woff2`.

## Pending Tasks
- Offered `/career-ops contacto ukg presales sydney` for a referral / LinkedIn outreach to ANZ presales lead + TA — not yet run.
- At recruiter screen: confirm OTE base/variable split + quota (comp estimated ~$180K–230K AUD OTE, likely in-band vs $200–240K target).
- **Scheduling constraint:** pre-booked vacation 1 Jul–7 Aug 2026 — flag in any interview-availability / start-date answer (do not commit across that window).
- v1.9.0 system update pending if/when the user wants it.

## Errors & Workarounds
- WebFetch on the UKG careers URL returned only portal config (no JD) → worked around via the Eightfold JSON API (see Key Learnings).
- First applications.md Edit failed (file not read in this session) → Read the header rows first, then Edit succeeded.

## Key Exchanges
- User invoked `/career-ops apply {UKG Eightfold URL} use puppeteer if required`. No Playwright MCP available; solved JD extraction via the Eightfold JSON API instead of a browser.
- No prior UKG report existed → ran a quick eval inline rather than a separate auto-pipeline, then produced the full apply kit (CV + cover letter + form answers).
- User replied "applied" → flipped tracker status to Applied and offered the referral next step.

## Custom Notes
"employer" — this session is an employer-application session: UKG (Ultimate Kronos Group), Presales Consultant, Sydney, applied 2026-06-10 via Eightfold (job LEADP018078). Part of an ongoing ANZ presales/SE application sprint (Zip, AvePoint, Mimecast, Fortiro, Figma, Superloop, Boomi, Pendo all in flight).

---

## Quick Resume Context
Applied to UKG Presales Consultant (Sydney, Eightfold job LEADP018078) on 2026-06-10 — score 4.3/5, primary-archetype match with WFM/payroll domain gap bridged via accounting + MYOB. Tailored CV + cover letter live in `config/cv-niroo-ukg.html` / `config/cover-letter-niroo-ukg.html` (PDFs in `output/...ukg-2026-06-10.pdf`), report at `reports/018-ukg-2026-06-10.md`, tracker row #18 = Applied. Open next step: run `/career-ops contacto` for a UKG referral; at recruiter screen confirm OTE split; mind the 1 Jul–7 Aug vacation when scheduling.

---

## Raw Session Log

**User:** `/career-ops apply https://ukg.eightfold.ai/careers/job/893394360655?src=Job+Board+-+LinkedIn use pupeteer if required`

**Assistant:** Ran update check (v1.8.1→v1.9.0 available, not applied) + onboarding file checks (all present). Loaded `modes/_shared.md` + `modes/apply.md`, `config/profile.yml`, `modes/_profile.md`, `cv.md`. Searched reports/ for UKG — no prior match. No Playwright MCP available; the Eightfold careers page is JS-rendered so WebFetch returned only portal config. Extracted the JD via the Eightfold JSON API: `https://ukg.eightfold.ai/api/apply/v2/jobs/893394360655?domain=ukg.com`.

JD extracted — **Presales Consultant / Presales Solution Consultant**, Sydney NSW, Sales org, display ID LEADP018078, created 2026-04-01, updated 2026-06-06. Responsibilities: partner with sales on discovery, design end-to-end solutions, deliver tailored demos, collaborate with Product/Services/Implementation, contribute to deal strategy, support proposals + sales-to-services transitions. Basic quals: presales/solution-consulting experience, presenting to senior leaders, translating requirements to solution designs, willing to travel >25%. Preferred: WFM/HR/payroll/enterprise software, quota-carrying partnership, facilitation, bachelor's degree.

Read the Mimecast CV + cover letter as the design base. Built `config/cv-niroo-ukg.html` (reframed presales/SC + payroll/workforce-ops adjacency, accounting + MYOB highlighted, cybersecurity de-emphasised) and `config/cover-letter-niroo-ukg.html` (storytelling/discovery lead, domain gap owned in para 3). Generated both PDFs (CV 2pp, cover letter 1pp). Wrote `reports/018-ukg-2026-06-10.md` (A–G blocks + Machine Summary, score 4.3/5, High Confidence legitimacy). Added tracker row #18 via TSV + `merge-tracker.mjs`.

Delivered the full kit: role summary, why-it-fits, generated files, and copy-paste-ready form answers (work auth, relocation to Sydney, travel >25%, why-UKG, years experience, source, salary expectations, LinkedIn/portfolio). Noted the 1 Jul–7 Aug 2026 vacation for scheduling. Stopped before submit per ethical rule. Offered `/career-ops contacto` for a referral.

**User:** applied

**Assistant:** Updated tracker row #18 status Evaluated → Applied (note: "Applied 2026-06-10 via Eightfold (LEADP018078)..."). Suggested running `/career-ops contacto ukg presales sydney` for a referral as the next play.

**User:** `/compress all employer`

**Assistant:** Generated this session log with all sections, topic centered on the UKG employer application, and saved it to CC-Session-Logs/.
