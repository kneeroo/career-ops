# Interview Prep: Heidi Health — Forward Deployed Engineer

**Date:** 2026-05-14
**Report:** [001](../reports/001-heidi-health-2026-05-14.md) | Score: 4.1/5
**Status:** Contacted (Donna Hughes, Hang Lee, Shahil Prasad)

---

## 1. What Heidi Is

Ambient AI documentation platform — transcribes clinical consultations in real time and generates structured clinical notes. Evolving into a full **"AI Care Partner"** platform.

| Product | What it does | Launched |
|---|---|---|
| **Heidi Scribe** | Ambient transcription → SOAP notes, 110+ languages | Original |
| **Heidi Evidence** | Citation-backed clinical decision support (BMJ, NICE, HealthPathways) | Feb 2026 |
| **Heidi Comms** | AI patient communications: calls, bookings, reminders, follow-ups | Feb 2026 |
| **Heidi Remote** | 21g wearable mic, on-device transcription, offline-first | Mar 2026 |

**Scale:** 2M+ clinicians/week, 70M+ patient visits, 116 countries, 18M+ hours returned to clinicians in 18 months.

**AI stack:**
- On-device speech-to-text via **Argmax** (iOS + Android) — sub-1 second p95 latency, offline-capable
- Server-side LLM pipeline on medical training data (vendor undisclosed)
- ISO 27001, SOC 2, HIPAA, GDPR, PIPEDA, Cyber Essentials certified
- No audio recordings saved; PHI de-identified at processing

---

## 2. Recent Moves (Know These)

- **Oct 2025:** $65M Series B led by Point72 (Steve Cohen), valuation **$465M post-money**
- **Feb 2026:** Acquired **AutoMedica** (UK) — MHRA AI Regulatory Airlock participant, locks in NHS regulatory relationships
- **Apr 2026:** **Beth Israel Lahey Health (BILH)** — 6,000+ providers, 14 hospitals, 175 practices — full system-wide rollout after 1,000-provider pilot. Results: 89% note quality satisfaction, 82% reduced cognitive load, 74% less overtime. **This is their biggest US deal and the template for enterprise motion.**
- **EHR integrations:** Epic (SMART on FHIR), athenahealth, eClinicalWorks (via Vim), Cerner Millennium

---

## 3. Engineering Culture

- "Ship small, iterate constantly, don't wait for perfect when progress is more powerful."
- Flat hierarchy, direct C-level access
- Stack: TypeScript/React, Node, Python, REST APIs, FHIR, SAML/OIDC/SCIM, likely AWS ap-southeast-2
- Hybrid — Melbourne HQ, Sydney, Brisbane, London, New York
- **Glassdoor watch-outs:** Management inexperience, inner-circle dynamics — don't raise in interview but be aware

---

## 4. FDE Challenges (What You're Walking Into)

| Challenge | Detail |
|---|---|
| **EMR integration complexity** | Epic, Athena, eClinicalWorks, Cerner all have different auth models and note-write-back mechanisms |
| **Clinician adoption gap** | Industry average 20-40%; Heidi achieves 60-70%. FDE owns closing the remaining gap |
| **BILH-scale rollout** | 6,000 physicians, 14 hospitals — the FDE makes this not become a support disaster |
| **SSO/SCIM per health system** | Every enterprise customer has a different IdP (usually Entra ID or Okta). FDE configures each |
| **No playbook** | Job spec: "comfortable owning ambiguous, high-stakes problems end-to-end without a playbook" |

---

## 5. Competitors (Know the Landscape)

| Competitor | Their edge | Heidi's advantage |
|---|---|---|
| Nuance DAX (Microsoft) | Enterprise, Azure distribution | Cheaper, more international, free tier |
| Abridge | Epic-native, US enterprise | Global, multilingual, hardware-capable |
| Suki | Voice-first, admin tasks | Narrower scope vs Heidi's platform play |
| Nabla | EU SMB, GPT-4 based | Less enterprise depth, no hardware |
| Freed | US consumer | No enterprise, no EMR integration |

**Heidi's moat:** Free tier at 2M+ clinicians as distribution; 110+ languages; offline hardware (Remote); full-stack platform (scribe + decision support + comms); AutoMedica for UK regulatory depth.

---

## 6. Your Angle — What to Lead With

### The Monash Health Play (Use First, Every Time)

> "I've already operated inside Monash Health's enterprise IT environment. I know how they procure, how long their approval cycles run, and what their clinical operations stakeholders care about. That's not a learning curve for me."

### The BILH Problem Is Your 30% Story

> "At UbiPark I had no deployment template when I started. I built one from scratch after the second enterprise rollout. By the fourth, onboarding time was down 30%. For Heidi replicating BILH across the next 10 health systems, that template-building and automation work is exactly what turns a one-off win into a repeatable motion."

### SSO / Entra ID Depth

> Most health systems use Azure AD / Entra ID as their IdP. Your hands-on SAML, SCIM, and Entra ID work at inforcer maps directly to what the FDE configures for every new enterprise customer.

---

## 7. Stories to Have Ready

| Story | Why |
|---|---|
| Monash Health onboarding at UbiPark | Direct customer overlap — Heidi serves Monash Health |
| 30% deployment time reduction | Maps to BILH-scale rollout problem |
| SSO/SAML configuration at inforcer | Exact technical skill in the FDE spec |
| AI-queryable portfolio (Claude + Supabase) | Builder instinct + AI credibility in Heidi's space |
| Product roadmap influence at UbiPark | FDE spec explicitly asks for field-to-product feedback loop |
| $25K ARR inforcer bug escalation | Technical escalation under commercial pressure — FDE does this constantly |
| AE over-promised feature at inforcer | Cross-functional partnership under pressure |

Full STAR+R stories: see [question-bank.md](question-bank.md) and [story-bank.md](story-bank.md)

---

## 8. Gap Responses

| Gap | Response |
|---|---|
| No FHIR/HL7 | "I reviewed Heidi's developer docs — the patterns are familiar from REST API and EHR-adjacent work at Monash Health. Actively closing it." |
| No pure healthtech background | "I've onboarded Monash Health, Melbourne Airport, Charter Hall — all regulated, complex procurement environments. The clinical workflow context is the layer to add, not the enterprise muscle." |
| No direct EMR admin experience | Offset with Monash Health reference and SSO/identity configuration depth |
| 5-month tenure at inforcer | "Redundancy. Used the time to build — shipped two production websites, deepened Python and JavaScript, and focused my search on FDE roles. That's why Heidi is at the top of my list." |

---

## 9. Questions to Ask Them

- "What does the current enterprise onboarding motion look like — is there a repeatable playbook, or is each health system still bespoke?"
- "BILH was a step-change in scale. What does the FDE team need to build to make that repeatable for the next 10 health systems?"
- "How does the FDE function sit relative to Product — is there a formal channel for surfacing field patterns into roadmap?"
- "What does the first 90 days look like for an FDE joining now?"
- "Heidi Remote is in Early Access — is there an opportunity for the FDE team to shape the enterprise deployment model for that?"

---

## 10. Key People at Heidi

| Name | Role | LinkedIn | Notes |
|---|---|---|---|
| Donna Hughes | Recruiter | — | Primary TA contact. Emailed + LinkedIn connection sent. |
| Hang Lee | TA Partner | [/in/hanglee1](https://www.linkedin.com/in/hanglee1/) | Secondary TA contact |
| Shahil Prasad | Forward Deployed Engineer | [/in/shahilprasad](https://au.linkedin.com/in/shahilprasad) | Direct peer — LinkedIn message sent |
| Tim Wang | Engineering Manager | [/in/overocean](https://www.linkedin.com/in/overocean/) | Possible hiring manager |
| Yu Liu | CTO & Co-Founder | [/in/yu-liu-535245154](https://au.linkedin.com/in/yu-liu-535245154) | Executive |
| Gabe Warren | Commercial Director | [/in/gabe-warren-a8099083](https://www.linkedin.com/in/gabe-warren-a8099083/) | FDE commercial partner |
