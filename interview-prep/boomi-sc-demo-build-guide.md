# Boomi SC Demo — Step-by-Step Build Guide

Working checklist to follow at the keyboard in the trial Boomi account. Companion to `boomi-sc-presentation-round.html` (strategy), `boomi-sc-architecture-diagram.html` (the 7-requirements diagram), and `boomi-sc-demo-deck.pptx` (deck). Build A first (your bulletproof baseline), then Build B (the headline).

Brief's own constraint: not production ready, content over format, "think through the steps and any potential pitfalls." Do not gold-plate. Two clean processes with visible logic and error handling is the target.

---

## 0. Prereqs (get these green before building)

- [ ] **Trial Boomi account** — live. Log in at the Boomi platform URL from the trial email.
- [ ] **A runtime (Atom)** — the trial includes a hosted **Boomi Atom Cloud / Test Atom**. Under Manage > Runtime Management, set one up via **In the Cloud → USA West Integration Test Cloud** (no install, ideal on a Mac). Attach it to a `Test` environment. Runtime and environment are separate things; deleting the environment does not delete the runtime.
- [ ] **Salesforce Developer org** — free at developer.salesforce.com. You need:
  - A connected app or a **security token** (Setup > reset security token, emailed to you). Boomi's Salesforce connector authenticates with username + password + security token, or OAuth.
  - At least two **Opportunities**: one with Amount > 1,000,000 and one normal. (Opportunity has a native `Amount` field, so it is the cleanest stand-in for "order amount". Document this assumption in the deck.)
- [ ] **A target for writes** — pick the reliable option:
  - Easiest / no external dependency: use **Return Documents** to display output (or a Disk connector to a file). Fine per the brief ("Salesforce accounts to a database **or CSV**").
  - If you want the DB story live: a free internet-reachable MySQL/Postgres (Aiven, Railway, or db4free.net) with a simple `customer_balance` table. Only if you have time; Return Documents is the demo-safe choice.

---

## Boomi orientation (60-second map)

- **Integration > Build** is where you create a **Process** (the canvas) and drag **shapes** onto it.
- A **Connection** = the endpoint + credentials (reusable). An **Operation** = the specific action on that connection (Query / Create / Update / Get / Send) plus the data **Profile**.
- **Profiles** define structure: **Flat File** (CSV), **XML**, **JSON**, **Database**. A profile is the *lens* used to read the current live document — a "Profile Element" reference extracts a field from whatever document is flowing at that point. Reference whichever profile matches the document's format there (flat file before a Map, the target profile after).
- Key **shapes**: Start, Connector, Map, Decision, Route, Business Rules, Cleanse, Data Process (split), Set Properties, Try/Catch, Notify, Message, Return Documents, Stop.
- **Test** runs the process against your Atom right in the canvas and shows documents at each shape — this is what you demo live.
- **Deploy** packages and pushes the process to the Atom so it can run scheduled/triggered (see A.5).

---

## A. Build A — CSV customer balances → validated → output

Demonstrates: flat-file ingestion, **data validation**, **routing**, **error handling**, batch. Requirement 7. This is the one that must work no matter what.

### A.1 — Sample CSV

`customer_balances.csv` (8 rows). Australian B2B customers fitting a $150M national corporation:

```
customer_id,customer_name,balance,currency
1001,Bluestone Manufacturing Pty Ltd,15230.50,AUD
1002,Yarra Valley Distributors,-420.00,AUD
1003,Harbour City Supplies Pty Ltd,98250.00,AUD
1004,Southern Cross Industrial,,AUD
1005,Outback Mining Services Pty Ltd,72540.75,AUD
1006,,18900.00,AUD
1007,Great Dividing Engineering,4500.25,AUD
1008,Coastal Freight Co Pty Ltd,131000.00,AUD
```

8 rows: 6 clean, 2 bad. Row 1004 (missing balance) and row 1006 (missing name) are the ones your validation should reject, both via the **Mandatory** rule. Note 1002 has a negative balance, which is valid (a customer in credit), so it must pass — a nice point to make in the demo about validating the right things.

> **Hard-won lesson (verified live in the trial):** Boomi's Cleanse step reliably enforces **Mandatory** fields, but its **data-type parsing is lenient** — a Number-typed field will NOT reject non-numeric text like `not_a_number` (it passes through as clean). Drive validation off Mandatory (and Field Length if needed), not the Number data type. For a true "must be numeric" reject, use a Business Rules shape, not the profile's data type.

### A.2 — Build steps (the path that actually worked in the trial)

Runtime: hosted **Boomi Atom Cloud** (USA West Integration Test Cloud) attached to a `Test` environment. No local install. Build left to right on the canvas:

1. **New Process** named `Demo A - Customer Balance Load`.
2. **Start shape → Type: No Data.** Self-contained trigger; emits one empty document. (In production this would be a Disk or Database connector reading the nightly file.)
3. **Message shape** ("Inject customer CSV"). Paste the CSV from A.1 into the Message box as static text (no variables). Carries all 8 rows as one document.
4. **Flat File Profile** (`Customer Balance FF Profile`):
   - Options tab: check **Use Column Headers**; **File Delimiter = Comma**; Text Qualifier N/A.
   - Data Elements tab: click **Import** and point at `customer_balances.csv` to auto-build the 4 fields.
   - `balance` → Data Type **Number**, Number Format `0.00`, **Signed** checked, **Mandatory** checked.
   - `customer_name` → **Mandatory** checked.
5. **Data Process shape** ("Split into rows") → step **Split Documents**:
   - **Split Option = Split By Line** (NOT Split By Profile — that needs a Link Element and silently passed the whole file through unsplit in testing).
   - Check **Keep Headers** so each split row keeps the header line, which the header-aware profile needs to parse each record correctly.
6. **Cleanse shape** ("Validate Records") → Profile Type Flat File → `Customer Balance FF Profile`. Auto-forks into **Clean** and **Rejected** paths. Validation is driven by the profile's **Mandatory** rules.
7. **Clean path → Return Documents** ("Load to warehouse"). In production = SQL Server warehouse connector.
8. **Rejected path → Return Documents** ("Exception Report"). In production = error file / alert to finance.

**Optional enhancement (built live): credit-routing Decision.** On the Clean path, insert a **Decision** ("Route Credits") before the warehouse: First Value = Profile Element (`Customer Balance FF Profile → balance`), Comparison = **Less Than**, Second Value = Static `0`. **True** (in credit) → Return Documents "Flag credits for finance"; **False** (normal) → Return Documents "Load to warehouse". Adds an explicit business decision + routing on top of the validation, and reuses the Decision shape you need for Build B. (A Notify shape was tried and dropped — it only writes to the execution log, so it does not actually notify finance; narrate the real notification as a production Mail connector.)

### A.3 — Test

Click **Test**, pick **SC Demo Runtime**. Expected: **6 clean** at Load to warehouse, **2 rejected** at Exception Report (1004 missing balance, 1006 missing name). With the credit Decision added: **5 → warehouse, 1 → credits (1002), 2 → rejected**. The "Documents" pane can look empty for Return Documents shapes — rely on the **Logs** tab counts as the proof.

### A.4 — Narrate (value, not clicks)

> "This is your nightly balance load. Half a million records would flow through this same process. Notice what happens to the two bad rows — a missing customer name, a missing balance amount. We do not load them blindly and corrupt your warehouse; we catch them, route them to an error report, and load the clean records. And we make a business decision on the good data — accounts in credit are flagged for finance review. Your team gets data they trust and a clear list of what needs attention."

### A.5 — Deploy + schedule nightly (satisfies R7's "nightly")

For the live demo you run Build A on demand with **Test**. But Requirement 7 says *"nightly,"* so deploy it and attach a schedule — then you can show a real cadence, not just an ad-hoc run. The **Start = No Data** shape schedules fine (the schedule simply triggers execution).

1. **Package it:** from the canvas, **Create Packaged Component** → leave **Version** blank (auto), **Sharing = Not Allowed** → Create.
2. **Deploy it:** **Deploy > Deployments** → deploy the package to the **Test** environment (SC Demo Runtime attached). Scheduling only appears once a process is *deployed*, not just packaged.
3. **Schedule it:** **Manage > Runtime Management → SC Demo Runtime → Deployed Processes → Demo A - Customer Balance Load → Schedules → Add**:
   - Type **Day**, Interval **1**, check **all 7 days** (nightly = every night).
   - **Start Time 15:00.** The runtime clock is **UTC**, and 15:00 UTC = **1:00 AM Melbourne (AEST, UTC+10 — no DST in June)**. So this represents a 1 AM local nightly run.
   - **OK**.

Caveat to know: a scheduled run reprocesses the same inline Message data — fine to prove the cadence; in production the Start is a Disk/Database connector reading that night's Oracle export.

**Demo move:** run Test live for the logic, then flip to the Schedules screen for the cadence. Line: *"It's not run by hand — deployed and scheduled to fire every night at 15:00 UTC, which is 1 AM in the customer's Melbourne time zone, right after the overnight Oracle export."* That UTC-to-local detail reads as someone who's actually shipped scheduled integrations.

---

## B. Build B — Salesforce order → Decision (>$1M) → map → create + write-back

Demonstrates: live SaaS connector, **Decision routing on the $1M rule**, mapping to a downstream system, write-back. Requirements 1 to 4. This is the headline.

### B.1 — Salesforce connection

1. **Connection: Salesforce.** Enter your Dev org username, password + security token (or OAuth). Test the connection until green.
2. **Operation: Query** on **Opportunity**. Select fields: `Id, Name, Amount, StageName, AccountId`. Optionally filter `Amount != null`.

### B.2 — Build steps

1. **New Process** named `Demo B - Order Routing to Oracle and WMS`.
2. **Start shape → Salesforce Query** (the operation above). Pulls your Opportunities as the "orders".
3. **Decision shape.** Condition: `Amount` **Greater Than** `1000000`.
   - **True path** = "needs senior approval". Set an approval status (in the real design = scheduled approval email + SFDC status write — talk to it).
   - **False path** = "auto-process". Continues to order creation.
4. **Map shape** (false path). Map the Salesforce Opportunity profile to your downstream profile:
   - "Oracle" stand-in: a **Database** profile (insert into an `orders` table) **or** an **XML** profile representing the Oracle sales order.
   - This is also where you would branch to the **WMS XML** (HTTP Client + XML profile) — build one target, describe the other.
5. **Destination connector** (false path). Database Send, or Disk/Return Documents writing the order XML. Capture a generated/returned **order number**.
6. **Write-back (optional but high-impact).** A **Salesforce Update** on Opportunity writing the new order number into a custom field (e.g. `Oracle_SO_Number__c`). The round-trip "user sees it succeeded". If short on time, describe it instead of building.
7. **Try/Catch** around the create + write-back so a downstream failure is caught and reported, not fatal.
8. **Stop** shapes.

### B.3 — The queue (talk, do not build)

You will **not** build Boomi Event Streams / a queue for the demo — too much for a prototype. But point to where the WMS branch publishes to a **queue** and explain the maintenance-window resilience (see `boomi-sc-presentation-round.html` §4). Describing the right pattern scores more than building a half one.

### B.4 — Test

**Test** against **SC Demo Runtime**. The >$1M Opportunity visibly takes the approval branch; the normal one flows through to order creation. Show both documents.

### B.5 — Narrate

> "Here is a real order coming straight out of Salesforce. The moment it arrives, Boomi checks your business rule — is this over a million dollars? This one is, so it is automatically routed for senior approval before anything else happens; no rep can quietly push a huge order through. A normal order flows straight on: we create it in Oracle, get the sales-order number back, and write it into Salesforce so your rep sees instantly that it succeeded. One platform, your governance baked in."

---

## C. Deploy + screenshot insurance

- [ ] Deploy both processes to the Atom (see A.5 for the package → deploy → schedule path).
- [ ] Run each green **within the hour before** the presentation.
- [ ] **Screenshot / screen-record both processes running green**, save locally. If a live run fails in front of the panel, you walk the screenshots and the design without losing momentum: *"here it is running a moment ago — let me take you through the design."*
- [ ] Keep the Salesforce tab logged in with the two Opportunities visible.

---

## D. Bonus expansion (one line each, for the bonus slide)

Not building these, just gesturing at them to show platform breadth (`boomi-sc-presentation-round.html` §8):

- **Agentstudio** — put a governed AI agent on top of this activated data.
- **Boomi Connect / MCP** — the same connectivity becomes how Claude/Copilot/Gemini reach Oracle safely.
- **API Management** — expose the order flow as a governed API.
- **Flow** — build the approval screen as a low-code app.
- **Master Data Hub** — one golden customer record across all four systems.

---

## E. If something is blocking you

- **Salesforce connector will not authenticate:** you almost certainly need the **security token** appended to the password, or OAuth. Reset the token in SFDC Setup; it emails you.
- **Atom Cloud cannot reach your DB:** the DB must be internet-reachable. Fall back to Return Documents output — fully acceptable per the brief.
- **Flat file split does nothing:** use **Split By Line + Keep Headers**, not Split By Profile.
- **Validation not rejecting bad rows:** drive it off **Mandatory** fields; the Number data type will not reject non-numeric text.
- **No "Schedules" option:** the process must be **deployed** first (package → Deploy > Deployments → Test environment), not just packaged. Schedules live on the deployed process under Manage > Runtime Management.
- **Out of time:** ship **Build A only** working + Build B **designed on slides**. A working baseline plus a well-explained design beats two half-broken builds.
