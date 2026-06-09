# Session Log: 28-05-2026 — Salesforce Lead SE (Agent Builder) Eval + Paul Walker Outreach

## Quick Reference (for AI scanning)
**Confidence keywords:** salesforce, agent-builder, agentforce, JR343259, JR343262, lead-solution-engineer, senior-solution-engineer, commercial, SMB, sydney, paul-walker, hiring-manager, linkedin-connection, claude-code, cursor, builder, WOP, waiting-on-parts, all-appliances, lumen-health, ai-queryable-portfolio, report-011, auto-pipeline, niroo-arjuna, trailhead, apex, flow, lwc, relocation
**Projects:** career-ops, Salesforce Agent Builder roles (JR343259 Lead/Commercial, JR343262 Senior/SMB)
**Outcome:** Ran auto-pipeline on the Salesforce Lead Solution Engineer - Agent Builder role (JR343259, Sydney Commercial), scored 4.1/5 — the Lead/Commercial twin of the earlier #010 Senior/SMB eval. Generated tailored CV PDF + report #011. Then drafted and iterated a LinkedIn connection note + follow-up to Paul Walker (Senior Manager, Solution Engineering, Salesforce ANZ — the hiring manager whose "I'm looking for a Builder" post maps to these roles).

## Decisions Made
- **Apply to BOTH #010 (Senior/SMB) and #011 (Lead/Commercial)** — same JD body, different jobReqIds posted ~9 days apart. Salesforce is staffing the ANZ Agentforce SE bench across two levels in parallel; the HM will funnel candidates into whichever level scopes them cleanly. Two shots at one hiring motion.
- **#011 scored 4.1/5 (vs #010 at 4.0/5)** — Commercial mid-market maps better to UbiPark's enterprise tender book (Monash Health, Melbourne Airport, Charter Hall, CBRE) than pure SMB does, and the comp band is higher. The Lead title raises the mentoring bar, mitigated authentically via the Phocas reusable-template story.
- **Paul Walker connection note: mirror his exact vocabulary back** ("Builder who ships prototypes in Cursor/Claude Code"). Highest-signal version for an HM screening LinkedIn at volume.
- **Kept "Hi Paul" greeting** — for cold LinkedIn outreach to an HM, the no-greeting global rule is relaxed; skipping it reads abrupt. (User asked "no hi paul?" → restored greeting.)
- **Changed "saw your post" → quote the actual post** — user flagged "saw your post" as vague. Final note references the specific "Builder who ships prototypes in Cursor/Claude Code" brief.
- **WOP framed as concrete, not vague** — user rejected "WOP" and "a Sydney workshop"; settled on "a parts-ordering app a Melbourne appliance workshop runs daily" (Melbourne, not Sydney — user corrected location).
- **Paul's post-connection reply: low-commitment "20 minutes" ask + Sydney-open line.** Specific time-box is easier to say yes to than open-ended "chat"; Sydney line matters because Paul's team is Sydney-based.

## Key Learnings
- **merge-tracker.mjs fuzzy-matches on company + role keywords** — it collapsed "Salesforce ... Agent Builder" #011 onto the existing #010 row (treated it as a re-eval, 4.0→4.1) instead of adding a new row. Had to manually restore #010 and re-add #011 as a distinct row. Watch this whenever two roles at the same company share strong title keywords.
- **Salesforce Workday JD extraction** — WebFetch returned empty on the myworkdayjobs.com SPA URL; the public JSON API endpoint works: `curl -s "https://salesforce.wd12.myworkdayjobs.com/wday/cxs/salesforce/External_Career_Site/job/{path}/{slug}_{JR}" -H "Accept: application/json"` returns full `jobPostingInfo.jobDescription`.
- **Paul Walker = Senior Manager, Solution Engineering at Salesforce (14+ yrs), Greater Sydney.** Former Principal SE. His LinkedIn post is the literal builder/AI brief for JR343259/JR343262. He's the HM, not a peer.
- **The "presales doesn't stop when the contract is signed" line in Paul's post** maps directly to WOP's post-launch weekly iteration loop — strongest single hook to use with him.

## Solutions & Fixes
- **JD fetch:** `curl` the Workday CXS JSON API when WebFetch fails on the SPA. jobReqId JR343259, posting id `945d85f9de421000f708cab9edd70000`.
- **Tracker repair:** after merge-tracker collapsed #011 onto #010, manually edited `data/applications.md` to restore #010 (2026-05-19, Senior/SMB, JR343262) and add #011 (2026-05-28, Lead/Commercial, JR343259) as separate rows.
- **PDF generation:** `node generate-pdf.mjs /tmp/cv-niroo-arjuna-salesforce-agent-builder-lead.html output/cv-niroo-arjuna-salesforce-agent-builder-lead-2026-05-28.pdf --format=a4` → 3 pages, 119.5 KB.

## Files Modified
- `reports/011-salesforce-agent-builder-lead-2026-05-28.md` — new. Full A-G eval, 4.1/5, companion to #010.
- `output/cv-niroo-arjuna-salesforce-agent-builder-lead-2026-05-28.pdf` — new. Tailored CV (A4, 3pp). Leads with Agentforce + builder framing, surfaces Phocas reusable-template + UbiPark Commercial customers.
- `data/applications.md` — added #11 (Salesforce Lead/Commercial); manually restored #10 after merge-tracker fuzzy-match collapse.
- `batch/tracker-additions/011-salesforce-agent-builder-lead.tsv` → merged.

## Setup & Config
- career-ops update available: v1.7.1 → v1.8.1 (`node update-system.mjs apply` to take it; data untouched). Not applied this session.
- Salesforce process per JD: Recruiter screen (AI-assisted) → 1:1 with HM → Coding Test → Technical Interview.

## Pending Tasks
- **Submit applications for #010 + #011** — both CV PDFs generated; ~10 min of form-filling. Not yet submitted.
- **Send Paul Walker the post-connection reply** (drafted: 20-min Zoom ask + Sydney-open line). Have the Lead CV PDF ready to attach if he asks.
- **Salesforce platform gap (Apex/Flow/LWC)** — mitigation plan is Trailhead Agentforce trail in week 1, working prototype by end of week 2 in Claude Code. Not started.
- **Offer two concrete time slots** when Paul agrees, rather than making him pick.

## Errors & Workarounds
- **merge-tracker.mjs collapsed #011 onto #010** (fuzzy company+role match). Workaround: manual edit of applications.md to split them back into two rows. Lesson: verify tracker after merging any two same-company roles with overlapping titles.
- **WebFetch empty on Salesforce Workday SPA.** Workaround: Workday CXS JSON API via curl.

## Key Exchanges
- User iterated the Paul Walker note ~6 times: restore greeting → quote the post (not "saw your post") → add WOP → make WOP concrete (parts-ordering app) → fix location (Melbourne not Sydney) → merge two drafts → add Sydney-open framing.
- Post-connection: Paul accepted the connection request. Drafted a short warm reply with a 20-minute Zoom ask + Sydney-relocation line + "no rush" tail.

## Custom Notes
**User instruction (durable, carries across sessions): session logs must be SEPARATED BY EMPLOYER. Amend existing employer logs by prepending new info on top; create new logs for employers without one.** This session spanned Salesforce, Figma, Boomi, Pendo → split into four logs. This is the Salesforce log.

---

## Quick Resume Context
Niroo ran the career-ops auto-pipeline on Salesforce's Lead Solution Engineer - Agent Builder role (JR343259, Sydney Commercial), scoring 4.1/5 (report #011) — the Lead/Commercial twin of the earlier #010 Senior/SMB role. Plan: apply to both, since Salesforce is staffing the ANZ Agentforce SE bench at two levels. Separately, Paul Walker (Senior Manager Solution Engineering, the HM) accepted a LinkedIn connection; a warm 20-min-Zoom reply is drafted and ready to send. Next: submit both applications, send Paul's reply, start Trailhead Agentforce ramp.

---

## Raw Session Log
*(Salesforce + Paul Walker portion of the 28-05-2026 conversation. Auto-pipeline eval #011 via Workday JSON API, tracker merge-collapse fix, then ~6 iterations of the Paul Walker LinkedIn note and a post-connection reply. Full conversation captured in the main transcript.)*
