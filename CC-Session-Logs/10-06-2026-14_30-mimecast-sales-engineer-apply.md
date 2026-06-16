# Session Log: 10-06-2026 14:30 - Mimecast Sales Engineer Apply

## Quick Reference (for AI scanning)
**Confidence keywords:** mimecast, sales-engineer, R6376, cybersecurity, apply-mode, workday, channel-enablement, MSP, essential-eight, M365-security, inforcer, sydney-relocation, comp-below-floor, cover-letter, cv-tailoring, report-017
**Projects:** career-ops (job search pipeline); Mimecast Sales Engineer application
**Outcome:** Generated tailored Mimecast cybersecurity SE CV + cover letter (PDFs), wrote report #017 (4.0/5), added tracker entry as Evaluated, and drafted Workday screening answers. Application not yet submitted.

## Decisions Made
- Scored Mimecast SE at **4.0/5**: excellent role fit (one of the strongest JD-to-CV matches), dragged down by comp band ($160k OTE ceiling vs $180k floor) and Sydney relocation requirement.
- Tailored materials toward **cybersecurity SE + channel/MSP partner enablement** (the role's two pillars), reframing inforcer's M365 security work as email security / DLP / identity / endpoint.
- Led cover letter and CV header with **relocation-to-Sydney willingness up front** (per user's "yes" to that framing).
- Marked tracker status **Evaluated**, NOT Applied — user hasn't submitted. Will flip to Applied on confirmation.
- Built from `config/cv-niroo-avepoint.html` + `config/cover-letter-niroo-avepoint.html` as the base template (most recent equivalent ANZ security SE application).

## Key Learnings
- **Workday JDs are pullable without a browser** via the CXS JSON API: `https://{tenant}.wd5.myworkdayjobs.com/wday/cxs/{tenant}/{site}/job/{location}/{slug}` returns `jobPostingInfo` with full `jobDescription` HTML, `canApply`, `postedOn`, salary, and `questionnaireId`. Used this instead of Playwright (no browser MCP available this session).
- The Workday **questionnaire (screening questions) sits behind login** — `questionnaireId` is exposed but the actual questions are not fetchable unauthenticated. Had to pre-draft generic SE answers instead of reading live fields.
- Mimecast posted band ($80–110k base, up to $160k OTE AUD) is pitched at "2+ years SE" — a mid/junior band. Niroo (5+ yrs) is overqualified for the band → flagged overqualification + comp-anchoring risk.

## Solutions & Fixes
- Fetch Workday JD: `curl -s "https://mimecast.wd5.myworkdayjobs.com/wday/cxs/mimecast/Mimecast-Careers/job/Australia---New-South-Wales/Sales-Engineer_R6376" -H "Accept: application/json" -H "User-Agent: Mozilla/5.0"`
- PDF generation: `node generate-pdf.mjs config/cv-niroo-mimecast.html output/cv-niroo-arjuna-mimecast-2026-06-10.pdf` (CV 2 pages, cover letter 1 page).
- Tracker merge: wrote TSV to `batch/tracker-additions/017-mimecast.tsv` then `node merge-tracker.mjs` (added #17).

## Files Modified
- `config/cv-niroo-mimecast.html`: NEW — tailored CV (cybersecurity SE summary, security-domain competencies, inforcer role reframed to email security/DLP/identity/endpoint + channel enablement, security-focused skills).
- `config/cover-letter-niroo-mimecast.html`: NEW — cover letter to Mimecast ANZ SE team, relocation up front, channel-multiplier angle, Essential Eight + SC-900.
- `output/cv-niroo-arjuna-mimecast-2026-06-10.pdf`: NEW (2 pages).
- `output/cover-letter-niroo-arjuna-mimecast-2026-06-10.pdf`: NEW (1 page).
- `reports/017-mimecast-2026-06-10.md`: NEW — A–G report + Machine Summary, 4.0/5.
- `batch/tracker-additions/017-mimecast.tsv`: NEW (merged → moved to merged/).
- `data/applications.md`: entry #17 Mimecast added via merge-tracker.

## Setup & Config
- career-ops update available: **v1.8.1 → v1.9.0** (user not yet decided; data untouched either way).
- CVs MUST be generated from `config/cv-template.html` / `config/*` (NOT `templates/` which auto-update overwrites) — per `modes/_profile.md`.
- No browser/Playwright MCP available this session; Workday JSON API was the workaround.
- Memory rule honored: no em dashes / double dashes in candidate-facing docs (CV + cover letter use "100-plus", "30 percent", etc.).

## Pending Tasks
- **User to submit the Workday application** (auth-gated; not done in-session).
- On confirmed submission: flip tracker #17 + report status from Evaluated → Applied.
- Offered (awaiting user): run `/career-ops contacto` to find ANZ SE Manager / Mimecast recruiter on LinkedIn.
- Open decision for user: whether to apply at all given OTE $160k < $180k floor and Sydney relocation. Materials are ready; final call is the user's.
- Optional: apply career-ops v1.9.0 update (`node update-system.mjs apply`).

## Errors & Workarounds
- **AskUserQuestion tool not available** in this context → proceeded with defaults (all sections, no custom note, suggested topic name).
- **Edit failed "File has not been read yet"** on the freshly `cp`-copied mimecast CV → had to Read the new path before editing even though content matched avepoint.
- **No Playwright/browser MCP** → used Workday CXS JSON API for JD; pre-drafted form answers instead of reading live Workday questionnaire.
- Initially wrote tracker TSV status as **Applied** prematurely → corrected to **Evaluated** before merge (apply mode only flips to Applied after user confirms submission).

## Key Exchanges
- User: `/career-ops apply {mimecast workday URL} use puppeteer if required` → no browser MCP, so pulled JD via Workday JSON API.
- Assistant flagged comp gap + Sydney relocation before building anything; asked whether to lead with relocation willingness. User: "yes" → proceeded, relocation up front.
- Delivered: tailored CV + cover letter PDFs, report #017, tracker entry, and pre-drafted Workday screening answers (Sydney/working rights/experience/salary/why-Mimecast/source).

## Custom Notes
None

---

## Quick Resume Context
Mimecast Sales Engineer (R6376, Sydney, cybersecurity) application is fully prepped: tailored CV + cover letter PDFs in `output/` (dated 2026-06-10), report #017 at 4.0/5, tracker entry #17 as Evaluated. Application is NOT yet submitted — it's a Workday form with login-gated screening questions, so pre-drafted answers were provided for paste. Key tension: OTE ceiling $160k is below Niroo's $180k floor and it requires Sydney relocation. Next: user submits → flip to Applied; optionally run `/career-ops contacto` for LinkedIn outreach to the ANZ SE Manager/recruiter.

---

## Raw Session Log

### User
`/model opus`, then `/career-ops apply https://mimecast.wd5.myworkdayjobs.com/Mimecast-Careers/job/Australia---New-South-Wales/Sales-Engineer_R6376?source=LinkedIn use pupeteer if required`

### Assistant
Ran silent update check (v1.8.1 → v1.9.0 available, mentioned to user). Loaded `modes/_shared.md` + `modes/apply.md`. Checked for existing Mimecast report/tracker (none). Read `modes/_profile.md`, `cv.md`, `config/profile.yml`. No `article-digest.md` (doesn't exist). Searched for browser MCP tools — only Gmail/Calendar/Drive/Notion MCP available, no Playwright/puppeteer.

Fetched JD via Workday CXS JSON API (curl). Key JD facts: Sales Engineer, ANZ team, reports to ANZ SE Manager, owns technical path to close for midmarket/upper-SMB, big channel/partner enablement component, Sydney-based hybrid + interstate travel, cybersecurity (email security, insider risk/DLP, security awareness, endpoint, identity), 2+ yrs SE at cybersec vendor, salary $80–110k base / up to $160k OTE, posted 4 days ago, canApply true, questionnaireId present. Legitimacy: High Confidence.

Presented quick read: strongest JD-to-CV match yet (inforcer cybersecurity pre-sales, M365 security stack, MSP/channel enablement, Essential Eight, SC-900 all direct hits). Flagged two concerns honestly: (1) comp below floor — $160k OTE ceiling vs $180k min / $200–240k target; role pitched at "2+ years" so overqualified/underpaid; (2) Sydney-based, relocation needed (Niroo Melbourne, CV says open to relocation). Verdict ~4.0/5. Asked whether to proceed and whether to lead with relocation willingness up front.

### User
"yes"

### Assistant
Read `config/cv-niroo-avepoint.html` + `config/cover-letter-niroo-avepoint.html` as base. Copied to mimecast variants. Tailored CV: cybersecurity SE summary bullets, security-domain competency tags (email security/DLP/identity, Microsoft Defender/Purview/Entra/Sentinel, channel & MSP enablement, ASD Essential Eight, ANZ midmarket/SMB), reframed inforcer role bullets toward email security/DLP/identity/endpoint + MSP/channel enablement + RFP/tender, security-focused skills section. Tailored cover letter: addressed to Mimecast ANZ SE Team, "Re: Sales Engineer (R6376)", relocation willingness in opening line, channel-multiplier angle matching JD, Essential Eight + GDPR + SC-900, presence/communication emphasis. Avoided em/en dashes per memory rule.

Generated PDFs via `node generate-pdf.mjs` — CV 2 pages (104.8 KB), cover letter 1 page (54.1 KB). Found next report number (017). Wrote `reports/017-mimecast-2026-06-10.md` (A–G blocks + Machine Summary, 4.0/5, High Confidence legitimacy). Wrote tracker TSV — initially status "Applied", corrected to "Evaluated" before merge. Ran `node merge-tracker.mjs` → added #17.

Delivered final package: file paths for CV + cover letter PDFs, pre-drafted Workday answers (Sydney/relocation, Australian working rights, years of cybersec SE experience, salary expectations with caveat about the band gap, why-Mimecast free-text, how-did-you-hear), and two honest pre-submit reminders (comp gap, Sydney move). Offered to run `/career-ops contacto` for LinkedIn outreach. Noted to tell me on submission to flip tracker to Applied.

### User
`/compress all employer`

### Assistant
AskUserQuestion unavailable → proceeded with defaults (all sections, no custom note, topic `mimecast-sales-engineer-apply`). Wrote this session log.
