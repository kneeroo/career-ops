# Session Log: 28-05-2026 — Figma Solutions Consultant Eval + Oscar Watson-Smith Outreach

## Quick Reference (for AI scanning)
**Confidence keywords:** figma, solutions-consultant, sydney, greenhouse, 5993635004, oscar-watson-smith, senior-sales-engineer, dev-mode, front-end, years-gap, 8-years, recruiter-screen, vanta, expansion-se, report-012, WOP, waiting-on-parts, next-js, supabase, clerk, relocation, referral, niroo-arjuna, linkedin-outreach
**Projects:** career-ops, Figma Solutions Consultant (Greenhouse jobReqId 5993635004)
**Outcome:** Ran auto-pipeline on Figma's Solutions Consultant (Sydney) role, scored 3.6/5 — strong archetype + front-end fit but the 8+ yrs total / 4+ yrs pure SE floor is a hard recruiter gate (Niroo is at ~6.4 yrs). Recommended a referral route over a cold apply. Then drafted a LinkedIn DM to Oscar Watson-Smith (Senior SE at Figma, ex-Vanta) who posted he's hiring two SCs — leading with a genuine apology for going silent after he shared his mobile number during the earlier Vanta SE conversation.

## Decisions Made
- **Figma scored 3.6/5 — apply-with-caution, NOT high priority.** The 8+ yrs total / 4+ yrs pure SE requirement is a real bar (not a screening artifact), and Niroo is ~1.5 yrs short on total experience. Front-end depth (3 production Next.js apps + WOP) and M365 security/questionnaire experience are genuine strengths but won't override the years box in most ATS flows.
- **Referral route is the best play** — ask a warm Figma ANZ contact for a referral (referrals routinely bypass the years floor). Oscar Watson-Smith's hiring post is the natural entry point.
- **Alternative play: wait 12 months** until ~7.5 yrs total with a longer pure-SE tenure, then return at full strength. Figma ANZ SC buildout is ongoing/recurring.
- **CV tailored to lead with front-end + WOP** to mitigate the years gap — surfaces React/Next.js/TypeScript and the WOP production app for a real Melbourne customer.
- **Oscar DM: lead with an apology.** He'd given his personal mobile during the earlier Vanta Expansion SE chat; Niroo never called because he didn't pass the Vanta recruiter screen. Naming the silence in one honest line clears the air before the new ask.
- **Corrected the framing repeatedly per user:** NOT "former front-end engineer turned SC" (Niroo is a pre-sales/SC who ships, not an ex-engineer); NOT "deep on front-end" (he builds full-stack — Next.js + Supabase + Clerk + auth + realtime, not just UI); post is FRESH (32 min old, not stale); coffee impossible (Oscar is Sydney) → Zoom-only ask; hadn't applied yet → "before I apply" framing; added Sydney-relocation-open + portfolio link in its own paragraph; informal register since already connected.

## Key Learnings
- **Figma JD (Greenhouse 5993635004):** Solutions Consultant, Sydney, Solutions Consulting team. Requires 8+ yrs professional experience incl. 4+ yrs SE/solution consulting in SaaS; front-end development / developer lifecycle experience; security questionnaire + IT/Security stakeholder management. Preferred: Figma/UX-UI background. No salary listed.
- **Figma comp (Sydney SC):** est. AUD 200-260K OTE, ~80/20 base/variable. Public (NYSE: FIG, IPO July 2025), post-IPO growth/hiring phase, no recent layoffs.
- **Oscar Watson-Smith** = Senior SE at Figma, ANZ's first Enterprise Solutions Consultant, ex-Vanta SE, former frontend engineer ~7 yrs. Posted (fresh) hiring two SCs, junior→senior, "happy to grab a coffee" (he's Sydney-based). Earlier exchange: Niroo asked about Vanta, Oscar shared mobile 0451 464 160 + "text before you call so iOS doesn't flag spam"; Niroo never called (didn't pass Vanta recruiter screen).
- **The years floor is the dominant variable** in Niroo's current eval set — Figma is the first role in the pipeline where total-experience-short is the headline risk rather than a platform/skill gap.

## Solutions & Fixes
- **JD fetch:** WebFetch on `https://job-boards.greenhouse.io/figma/jobs/5993635004` returned the full posting cleanly (Greenhouse static page, no SPA workaround needed).
- **PDF generation:** `node generate-pdf.mjs /tmp/cv-niroo-arjuna-figma.html output/cv-niroo-arjuna-figma-2026-05-28.pdf --format=a4` → 3 pages, 122.1 KB. Front-end-forward layout (added a Front-End skills row, WOP as lead project, AI tooling row).
- **Tracker:** `batch/tracker-additions/012-figma.tsv` → merge-tracker added cleanly as #12 (no fuzzy collision this time).

## Files Modified
- `reports/012-figma-2026-05-28.md` — new. Full A-G eval, 3.6/5, years-gap analysis + referral recommendation.
- `output/cv-niroo-arjuna-figma-2026-05-28.pdf` — new. Front-end-forward CV (A4, 3pp); WOP lead project; 6+ yrs framing.
- `data/applications.md` — added #12 (Figma SC, 3.6/5, Evaluated).
- `batch/tracker-additions/012-figma.tsv` → merged.

## Setup & Config
- WOP repo: `github.com/JNLogan/WOP_2.0` — referenced as a production proof point. Stack: Next.js 16 + React 19 + TypeScript + Tailwind v4 + Supabase (Postgres+RLS+Realtime) + Clerk. Customer: All Appliances, a Melbourne appliance repair workshop.
- Portfolio: niroo-arjuna.vercel.app (AI-queryable — worth refreshing its context on WOP + current pipeline before Oscar clicks through).

## Pending Tasks
- **Send Oscar the DM** (final: informal, apology-first, full-stack framing, Sydney-open, portfolio link in its own paragraph, "before I apply" + Zoom ask). NOT yet sent. Send while his 32-min-ago post is still top of his inbox.
- **Figma formal application: hold** — pending the Oscar conversation. If he refers/engages, that's the entry; if not, deprioritise (don't burn a top-priority slot).
- **Refresh the AI-queryable portfolio's context** (WOP, Pendo install pattern, current career-ops pipeline) before Oscar clicks.
- **If Oscar agrees:** offer two concrete Zoom slots this week; send CV PDF ahead of the call.

## Errors & Workarounds
- **Multiple framing corrections** (see Decisions). Net lesson for future Figma/SC outreach: Niroo is a pre-sales/SC who ALSO ships full-stack production apps — not an "engineer", not "front-end only", not "deep on front-end". Use "shipping production web apps end-to-end (Next.js + React + TypeScript on the front, Supabase + Clerk on the back)".

## Key Exchanges
- Drafted Figma eval → flagged the years gap honestly up front before writing the report.
- Oscar DM iterated ~8 times: post-age (stale→fresh), engineer framing (rejected), front-end depth (rejected, full-stack), coffee→Zoom (he's Sydney), not-applied-yet ("before I apply"), Sydney-relocation-open, portfolio in its own paragraph, apology-first opener (Vanta silence), informal register.

## Custom Notes
**User instruction (durable): session logs SEPARATED BY EMPLOYER; amend existing, prepend new, create new for employers without a log.** This is the Figma log (new employer this session).

---

## Quick Resume Context
Niroo evaluated Figma's Solutions Consultant (Sydney) role at 3.6/5 (report #012) — strong fit on archetype + front-end + security, but the 8+ yrs total / 4+ yrs pure SE floor is a hard gate (he's ~6.4 yrs). Plan: pursue via referral, not cold apply. Oscar Watson-Smith (Senior SE at Figma, ex-Vanta) posted he's hiring two SCs; a polished apology-first LinkedIn DM is drafted and ready to send (Niroo went silent on Oscar after an earlier Vanta SE chat where Oscar shared his mobile). Next: send the DM, hold the formal application pending Oscar's response, refresh the AI-queryable portfolio.

---

## Raw Session Log
*(Figma + Oscar Watson-Smith portion of the 28-05-2026 conversation. Auto-pipeline eval #012, then ~8 iterations of the Oscar LinkedIn DM with repeated framing corrections. Full conversation in the main transcript.)*
