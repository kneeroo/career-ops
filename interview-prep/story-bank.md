# Story Bank — Master STAR+R Stories

This file accumulates your best interview stories over time. Each evaluation (Block F) adds new stories here. Instead of memorizing 100 answers, maintain 5-10 deep stories that you can bend to answer almost any behavioral question.

## How it works

1. Every time `/career-ops oferta` generates Block F (Interview Plan), new STAR+R stories get appended here
2. Before your next interview, review this file — your stories are already organized by theme
3. The "Big Three" questions can be answered with stories from this bank:
   - "Tell me about yourself" → combine 2-3 stories into a narrative
   - "Tell me about your most impactful project" → pick your highest-impact story
   - "Tell me about a conflict you resolved" → find a story with a Reflection

## Stories

<!-- Stories will be added here as you evaluate offers -->
<!-- Format:
### [Theme] Story Title
**Source:** Report #NNN — Company — Role
**S (Situation):** ...
**T (Task):** ...
**A (Action):** ...
**R (Result):** ...
**Reflection:** What I learned / what I'd do differently
**Best for questions about:** [list of question types this story answers]
-->

### [Onboarding Automation] UbiPark — Reducing Enterprise Onboarding Time by 30%
**Source:** Report #001 — Heidi Health — Forward Deployed Engineer
**S:** Enterprise onboarding at UbiPark was fully manual, taking 4–6 weeks per client with no standardised process.
**T:** Reduce onboarding time without sacrificing quality for enterprise accounts.
**A:** Built reusable configuration templates and automated workflow triggers that replaced repetitive manual steps across each new client deployment.
**R:** Reduced onboarding time by 30%; templates were adopted team-wide across all future implementations.
**Reflection:** Template-first thinking should be the default from project kick-off, not after repeating the same steps five times manually.
**Best for questions about:** Process improvement, scale, efficiency, "tell me about a time you improved a workflow", FDE delivery speed

---

### [Enterprise Technical Onboarding] UbiPark — Melbourne Airport
**Source:** Report #001 — Heidi Health — Forward Deployed Engineer
**S:** Melbourne Airport was switching from a legacy parking management system to UbiPark's enterprise platform.
**T:** Own the full technical onboarding including API integration, data migration, and staff enablement.
**A:** Mapped the data model, built the API connection, resolved edge cases in the data transformation, and ran onboarding workshops with operations and IT staff.
**R:** Went live on schedule; account retained and expanded. Learnings fed directly into the onboarding templates.
**Reflection:** Could have templated the data mapping earlier — did it retrospectively and it saved 30% on the next three clients.
**Best for questions about:** Enterprise onboarding, technical ownership, customer-facing delivery, "tell me about a complex implementation"

---

### [Product Feedback Loop] UbiPark — Influencing Roadmap via Customer Patterns
**Source:** Report #001 — Heidi Health — Forward Deployed Engineer
**S:** Multiple enterprise customers were independently asking for the same analytics feature that didn't exist in the product.
**T:** Translate this pattern into a product decision without losing customer trust in the meantime.
**A:** Aggregated feedback across accounts, documented the pattern with business impact context, and presented it to the Product team as a structured brief.
**R:** Feature shipped the following quarter; referenced in renewal conversations as evidence of responsiveness.
**Reflection:** Systematic feedback loops (not ad hoc escalations) are what get things onto roadmaps. Set this up structurally, not reactively.
**Best for questions about:** Field-to-product influence, customer advocacy, "how do you work with Product", FDE → PM bridge

---

### [Technical Demo] inforcer — Personalised M365 Security Demo
**Source:** Report #001 — Heidi Health — Forward Deployed Engineer
**S:** MSP prospects evaluating inforcer against two established M365 security competitors in a bake-off scenario.
**T:** Win the technical comparison in a competitive evaluation.
**A:** Built a bespoke demo environment using the prospect's own tenant configuration to show the product in their real context, not a generic sandbox.
**R:** Progressed pipeline; built a repeatable personalised demo playbook adopted by the rest of the SE team.
**Reflection:** Personalised demos beat generic ones every time — the setup cost is always worth it.
**Best for questions about:** Pre-sales demos, competitive selling, "tell me about a technical win", POC delivery

---

### [Discovery & Alignment] Phocas — BI Discovery Workshop with C-Level Stakeholders
**Source:** Report #001 — Heidi Health — Forward Deployed Engineer
**S:** C-level and IT leads had conflicting requirements about what a new BI reporting platform should do.
**T:** Align stakeholders on a data model before build began to prevent scope creep.
**A:** Ran a structured discovery workshop, whiteboarded the data model live with the group, and got formal sign-off before any configuration started.
**R:** First-time delivery with no scope creep across a 6-week implementation. Became the standard discovery format for the team.
**Reflection:** Stakeholder alignment upfront is the only thing that reliably prevents re-work downstream.
**Best for questions about:** Discovery, stakeholder management, scoping, "how do you handle conflicting requirements"

---

### [Political vs Technical] Phocas — MYOB ERP Integration Under Contested Data Model
**Source:** Report #008 — Pendo — Senior Customer Engineer, ANZ
**S:** A Phocas BI implementation required integrating with the client's MYOB ERP, but the client's IT team and Phocas's product team disagreed on the data model. The client wanted a flat denormalised feed; the product expected a star schema. Both sides escalated within their own organisations.
**T:** Get the integration delivered on schedule without forcing either side to back down publicly, and preserve the client relationship through renewal.
**A:** Separated the technical answer from the political answer. The technical fix was a staging-layer transformation that gave each side what they wanted in their own format. The political work was three separate executive conversations — one with the client's CIO to acknowledge their IT team's concerns, one with the Phocas product lead to confirm the staging layer was supported, and one joint sync to land the agreed approach. Documented the decision and the rationale so neither side could renegotiate it later.
**R:** Integration shipped on the original timeline. Client renewed and expanded the following year. The staging-layer pattern became the default approach for contested ERP integrations across the consulting team.
**Reflection:** The technical answer was easy; the political answer required separate executive conversations. Trying to solve both in one joint meeting would have forced one side to lose face. Always separate the two.
**Best for questions about:** Stakeholder conflict, technical escalation under ambiguity, customer politics, "tell me about a time you disagreed with a stakeholder", multi-party negotiation, mediation between client IT and internal product

---

### [Business Translation] UbiPark — Translating Platform Analytics into C-Level ROI at Melbourne Airport
**Source:** Report #008 — Pendo — Senior Customer Engineer, ANZ
**S:** Melbourne Airport had deployed UbiPark for enterprise parking management. Operational data was flowing into dashboards, but the airport's exec team wasn't engaging with the platform at QBR. The relationship was healthy operationally but stagnant commercially — no expansion conversations were happening because executives couldn't see the dollar value of the platform.
**T:** Translate raw operational analytics into a board-ready ROI narrative that would unlock the next phase of investment.
**A:** Reframed the existing dashboards into three financial views: revenue uplift (premium parking conversion), cost avoidance (operational efficiency), and risk reduction (compliance + audit signals). Built a single one-page executive summary that mapped each platform feature to a dollar figure using the airport's own benchmarks. Walked the airport's GM through the framing before the QBR so they could co-present it as their result, not UbiPark's pitch.
**R:** QBR moved from a status update to a strategic conversation. Account expanded by 20% in the following quarter; airport became a reference for two further enterprise prospects. The one-page financial framing became a template for all UbiPark enterprise QBRs.
**Reflection:** Executives buy the outcome, not the dashboard. Always lead with the dollar figure; let the operational detail be the appendix. And let the customer co-present the story — it stops being a vendor pitch and starts being their internal win.
**Best for questions about:** Business outcomes, executive communication, ROI framing, "how do you translate technical work to business outcomes", account expansion, C-level engagement, QBR design

---

### [AI-Curious Operator / Build to Learn] Lumen Health + Pendo Install via Claude Code
**Source:** Report #008 — Pendo — Senior Customer Engineer, ANZ
**S:** Preparing for a Senior Customer Engineer interview at Pendo. The role explicitly asks for an "AI-curious operator" with hands-on JavaScript / React / REST API experience. My background covers all three but I had no prior Pendo platform experience — the JD listed it as nice-to-have, but I wanted to close the gap as a proof point rather than a caveat.
**T:** Build a working Pendo install on a realistic demo application end-to-end, in under one week, using Pendo's own AI-assisted install tooling so the artefact doubles as evidence of how I'd onboard customers in the role.
**A:** Built Lumen Health, a Next.js 16 App Router healthcare patient-portal demo, with shadcn/ui and Tailwind v4 — a realistic mid-market SaaS surface area. Then ran Pendo's `@pendo-install` AI Setup Assistant prompt inside Claude Code, the canonical agentic developer environment. The assistant detected the framework, proposed a configuration plan, and I approved each step before any code shipped. Caught and fixed the non-obvious Next.js App Router gotcha — `usePathname()` changes don't fire the URL events Pendo's auto-tracker depends on, so without an explicit `pendo.pageLoad()` hook, Paths and Funnel reports only see the entry page per session. Added `data-pendo-id` attributes to all key tap targets so feature tagging uses stable selectors that survive classname or text changes. Replaced the anonymous random visitor ID with a roster of 8 realistic mock Australian patients assigned per-session via sessionStorage, so the Pendo dashboard fills with distinct visitors rather than a single ghost user. Deployed to Vercel, validated with `pendo.validateEnvironment()`, and recorded a 90-second Loom walking through the install.
**R:** Working Pendo install live at `lumen-health-niroo.vercel.app`. Full install took under twenty minutes including Vercel deploy. Loom and source code published as a tangible proof point for the interview. The install pattern — Claude Code + Pendo AI Setup Assistant — is something I'd bring directly into customer onboardings as a CE: meet customers where their dev teams already are, and compress a half-day install into a half-hour pairing session.
**Reflection:** Building the thing taught me more than reading about it. The Anthropic AI Fluency cert was the easy part — the App Router page-load gotcha is the kind of thing you only find by actually shipping the install. Most candidates will talk about being AI-curious; the differentiator is showing the artefact.
**Best for questions about:** AI-curious operator, hands-on technical depth, learning a new product quickly, "how do you ramp on something you've never used", "what would you change about our install docs", proof-of-build over proof-of-talk, using AI tooling as a CE multiplier
