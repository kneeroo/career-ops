# Session Log: 10-06-2026 15:10 - Dialpad FDE Apply (Informed SKIP Override)

## Quick Reference (for AI scanning)
**Confidence keywords:** dialpad, forward-deployment-engineer, FDE, apply, SKIP-override, greenhouse, cover-letter, CV, AI-depth-gap, LLM-application-integration, multi-agent-orchestration, Lumen-Health, AI-queryable-portfolio, Anthropic-Claude-API, Sydney-relocation, how-are-you-using-AI, tracker-update
**Projects:** career-ops (AI job-search pipeline), report #003 Dialpad
**Outcome:** Applied to Dialpad Forward Deployment Engineer (Sydney) despite a prior 3.1/5 SKIP verdict — informed override; generated tailored CV + cover letter + form answers leading on AI-builder proof, then flipped tracker #003 SKIP → Applied.

## Decisions Made
- **Apply despite SKIP (3.1/5).** Same Greenhouse posting (job ID 8514908002) was already evaluated 2026-05-14 → SKIP. User made an informed override ("lets apply anyways" / "applied"). Flagged risks up front, then proceeded.
- **Honest AI-depth framing, no overclaiming.** Cover letter explicitly states hands-on depth is LLM-application integration, NOT multi-agent orchestration at scale — framed as the growth edge. Chosen over pretending, because it's more credible to a technical screener and pre-empts the obvious objection.
- **Lead on "How are you using AI today?" form question** as the strongest available angle, using real proof (Lumen Health on Claude API, AI-queryable portfolio, Claude Code daily, Anthropic AI Fluency cert).
- **Project section retitled** "AI & Engineering Projects"; Lumen + AI-Queryable Portfolio promoted above Dhaniro to front-load AI credibility. Stack lines made explicit about "Anthropic Claude API".

## Key Learnings
- Dialpad FDE JD demands "deep, demonstrable expertise in the modern AI/ML stack: LLMs, GenAI, vector databases, agent orchestration frameworks" + Python/Go/JS-TS + LLM frameworks. That AI-engineering depth is a CORE requirement, not nice-to-have — the central gap in Niroo's profile.
- Posting carries dual risk beyond fit: near-annual layoff pattern (AI-driven headcount pressure) + comp likely AUD $120K–160K base vs Niroo's $200K–240K OTE target.
- The May report's "revisit in 3-6 months after shipping 1-2 AI projects with a vector DB + agent framework" still stands — nothing in the role moved.

## Solutions & Fixes
- No browser MCP / Playwright available this session → verified posting live via WebFetch fallback (acceptable given human-in-the-loop review before submit).
- Matched exact house CV/cover-letter format by reading the most recent session artifacts (`config/cv-niroo-mimecast.html`, `config/cover-letter-niroo-mimecast.html`) rather than the template.
- PDF generation: `node generate-pdf.mjs config/{file}.html output/{file}.pdf` → CV 2pp / cover 1pp, both clean.
- `node verify-pipeline.mjs` → 0 errors, 0 warnings after tracker edit.

## Files Modified
- `config/cv-niroo-dialpad.html`: new tailored CV (FDE + AI-builder framing).
- `config/cover-letter-niroo-dialpad.html`: new cover letter, honest AI-depth-gap line.
- `output/cv-niroo-arjuna-dialpad-2026-06-10.pdf`: generated CV (107.8 KB, 2pp).
- `output/cover-letter-niroo-arjuna-dialpad-2026-06-10.pdf`: generated cover letter (52.8 KB, 1pp).
- `data/applications.md`: tracker #003 Dialpad updated SKIP → Applied, date 2026-05-14 → 2026-06-10, PDF ❌ → ✅, note rewritten to log informed override + risk acknowledgment.

## Setup & Config
- Generate CVs from `config/cv-template.html` (protected), NOT `templates/` (auto-update clobbers it). Reference format = Pendo/Boomi CVs.
- No `article-digest.md` and no real `writing-samples/` (only README) — worked from `cv.md` + `config/profile.yml`.
- career-ops update available v1.8.1 → v1.9.0 (mentioned, not applied — user data untouched either way).
- Profile: Melbourne, open to Sydney relocation; no sponsorship needed; comp target AUD $200K–240K OTE, floor $180K.

## Pending Tasks
- Offered `/career-ops contacto` for a Dialpad FDE/hiring contact + LinkedIn follow-up (highest-leverage next move for a stretch app) — not yet run.
- career-ops v1.9.0 update still pending user decision.
- Longer-term: the May "revisit after shipping vector-DB + agent-framework project" recommendation remains the real path to a strong-fit Dialpad application.

## Errors & Workarounds
- Playwright/browser MCP unavailable despite "use puppeteer if required" → fell back to WebFetch for liveness + JD extraction; noted human review gates submission.

## Key Exchanges
- Opened by flagging the existing 3.1 SKIP and the three compounding issues; gave user three honest paths (upskilled / want the shot / skip).
- User: "lets apply anyways" → built strongest honest package.
- User: "applied" → flipped tracker #003 to Applied, ran verify-pipeline, offered contacto follow-up.

## Custom Notes
None

---

## Quick Resume Context
Niroo applied to Dialpad Forward Deployment Engineer (Sydney, Greenhouse job 8514908002) on 2026-06-10 as an informed override of a prior 3.1/5 SKIP. Tailored CV + cover letter live in `config/` and `output/` dated 2026-06-10; tracker #003 is now Applied with the AI-depth gap and layoff/comp risk logged in the note. Next move if continuing: run `/career-ops contacto` to warm-touch a Dialpad hiring contact, since the recruiter keyword filter would otherwise flag the multi-agent/vector-DB depth gap.

---

## Raw Session Log

**User:** `/career-ops apply https://job-boards.greenhouse.io/dialpad/jobs/8514908002?gh_src=7e75743e2us use pupeteer if required`

**Assistant:** Ran update check (v1.8.1 → v1.9.0 available, mentioned). Loaded `modes/_shared.md` + `modes/apply.md`. Searched reports → found existing `reports/003-dialpad-2026-05-14.md` and tracker entry. Read `cv.md`, `modes/_profile.md`, the report, and the tracker line.

Flagged that this is the **exact same posting already evaluated → 3.1/5 SKIP**, with three compounding issues: (1) core AI-engineering depth gap (LLMs, vector DBs, agent orchestration, LangChain/LlamaIndex, multi-agent, MCP); (2) recurring layoff pattern; (3) comp likely AUD $120K–160K vs $200K–240K target. Verified posting still **live and unchanged** via WebFetch (no browser MCP available). Noted one favorable change: the form now asks "How are you using AI today?" — a genuine opening given Lumen Health, the AI-queryable portfolio, and career-ops itself. Recommended skip-tier but offered three honest override paths.

**User:** "lets apply anyways"

**Assistant:** Treated as informed override. Read `article-digest.md` (absent), `config/profile.yml`, listed `writing-samples/` (only README) and `config/` CVs/cover letters. Read `config/cover-letter-niroo-mimecast.html` + `config/cv-niroo-mimecast.html` to match exact house format. Wrote `config/cv-niroo-dialpad.html` (FDE + honest AI-builder framing; promoted Lumen + AI-Queryable Portfolio; explicit Anthropic Claude API in stacks) and `config/cover-letter-niroo-dialpad.html` (honest line: depth is LLM-app integration, not multi-agent orchestration at scale, framed as growth edge). Generated both PDFs to `output/` dated 2026-06-10 (CV 2pp, cover 1pp). Presented full package: file paths, copy-paste form answers (sponsorship: no; preferred name: Niroo; hybrid: yes + relocating; "How are you using AI today?" lead answer; voluntary self-ID note), upload guidance, and an honesty note about the AI-depth line. Stopped before submit per ethical rule; offered to flip tracker on confirmation and to run contacto.

**User:** "applied"

**Assistant:** Read `data/applications.md`, located line 18 (#003 Dialpad SKIP). Edited it: SKIP → Applied, date → 2026-06-10, PDF → ✅, note rewritten to log informed override + AI-depth honesty + acknowledged layoff/comp risk. Ran `node verify-pipeline.mjs` → 0 errors / 0 warnings. Summarized and offered `/career-ops contacto` as highest-leverage next move for the stretch application.

**User:** `/compress all employer`

**Assistant:** AskUserQuestion unavailable; honored `all` arg → all sections preserved, no custom note, topic `dialpad-fde-apply-override`. Wrote this session log.
