# Boomi SC Demo — Step-by-Step Build Guide

Working checklist to follow at the keyboard in the trial Boomi account. Companion to `boomi-sc-presentation-round.html` (strategy) and `boomi-sc-demo-deck.pptx` (deck). Build A first (your bulletproof baseline), then Build B (the headline).

Brief's own constraint: not production ready, content over format, "think through the steps and any potential pitfalls." Do not gold-plate. Two clean processes with visible logic and error handling is the target.

---

## 0. Prereqs (get these green before building)

- [ ] **Trial Boomi account** — live. Log in at the AtomSphere/Boomi platform URL from the trial email.
- [ ] **A runtime (Atom)** — the trial includes a hosted **Boomi Atom Cloud / Test Atom**. Confirm under `Manage > Atom Management` that you have a runtime you can deploy to. The Atom Cloud is fine for the demo; it can reach internet-facing endpoints (Salesforce, a cloud database).
- [ ] **Salesforce Developer org** — free at developer.salesforce.com. You need:
  - A connected app or a **security token** (Setup > reset security token, emailed to you). Boomi's Salesforce connector authenticates with username + password + security token, or OAuth.
  - At least two **Opportunities**: one with Amount > 1,000,000 and one normal. (Opportunity has a native `Amount` field, so it is the cleanest stand-in for "order amount". Document this assumption in the deck.)
- [ ] **A target for writes** — pick the reliable option:
  - Easiest / no external dependency: write to a **file** (Disk connector) or use **Return Documents** to display output. Fine per the brief ("Salesforce accounts to a database **or CSV**").
  - If you want the DB story live: a free internet-reachable MySQL/Postgres (Aiven, Railway, or db4free.net) loaded with a simple `customer_balance` table. Only do this if you have time; the file/Return-Documents path is the demo-safe choice.
- [ ] **A sample CSV** for Build A (see §A.1 below). Put it where your Atom can read it, or use a Disk connector path.

---

## Boomi orientation (60-second map)

- **Integration > Build** is where you create a **Process** (the canvas) and drag **shapes** onto it.
- A **Connection** = the endpoint + credentials (reusable). An **Operation** = the specific action on that connection (Query / Create / Update / Get / Send) plus the data **Profile**.
- **Profiles** define structure: **Flat File** (CSV), **XML**, **JSON**, **Database**.
- Key **shapes**: Start, Connector, Map, Decision, Route, Business Rules, Cleanse, Data Process (split), Set Properties, Try/Catch, Notify, Message, Return Documents, Stop.
- **Test** runs the process against your Atom right in the canvas (the green "Test" button) and shows documents at each shape — this is what you demo live.
- **Deploy** (`Deploy` tab) packages and pushes the process to the Atom so it can run scheduled/triggered.

---

## A. Build A — CSV customer balances → validated → output

Demonstrates: flat-file ingestion, mapping, **data validation**, **error handling**, batch. Requirement 7. This is the one that must work no matter what.

### A.1 — Sample CSV
Create `customer_balances.csv` with a header and a few rows, including one deliberately bad row to show validation catching it:

```
customer_id,customer_name,balance,currency
1001,Acme Pty Ltd,15230.50,AUD
1002,Globex Corp,-400.00,AUD
1003,,98000.00,AUD
1004,Initech,not_a_number,AUD
1005,Umbrella Co,72000.00,AUD
```

Rows 1003 (missing name) and 1004 (non-numeric balance) are the ones your validation should reject.

### A.2 — Build steps

1. **New Process.** Integration > New > Process. Name it `Demo A - Customer Balance Load`.
2. **Start shape → Connector: Disk.**
   - Connection: Disk, set the directory where `customer_balances.csv` lives (path the Atom can read).
   - Operation: Get. This reads the file in.
   - (Alternative if Disk is awkward on Atom Cloud: set Start to "No Data" and use a **Message** shape to paste the CSV inline for the demo. Reliable and visible.)
3. **Flat File Profile.** When configuring the read, create a Flat File profile matching the CSV: columns `customer_id, customer_name, balance, currency`, comma-delimited, with a header row. This is your source profile.
4. **Cleanse shape** (validation). Add a Cleanse shape after Start.
   - Mark `customer_name` as **required** (rejects 1003).
   - Set `balance` to a **number** data type / numeric validation (rejects 1004).
   - Cleanse splits output into a **clean** path and a **rejected/error documents** path automatically.
5. **Map shape** (clean path). Map the source flat-file profile to your destination profile:
   - If DB target: a **Database profile** for an INSERT/UPDATE into `customer_balance`.
   - If file target: a destination **Flat File** or **XML** profile (e.g., produce a clean `balances_loaded.csv` or an XML doc).
6. **Destination connector** (clean path).
   - DB option: Database connector, Operation = Send (Insert or Upsert) into the table.
   - File option: Disk connector, Operation = Send, write the mapped output. Or end on **Return Documents** so the Test view shows the clean records.
7. **Error path.** From the Cleanse rejected output, add a **Notify** shape ("Rejected: {customer_id}") and/or a Disk Send to an `errors.csv`. This visibly demonstrates "we do not silently drop bad data."
8. **Stop** shapes to close each branch.

### A.3 — Test
Click **Test**, pick your Atom. You should see 3 clean docs flow to the destination and 2 docs land in the error path. Click each shape to show the documents — this visual is your demo gold.

### A.4 — Narrate (value, not clicks)
> "This is your nightly balance load. Half a million records would flow through this same process. Notice what happens to the two bad rows — a missing customer name, a non-numeric balance. We do not load them blindly and corrupt your warehouse; we catch them, route them to an error report, and load the clean records. Your finance team gets the data they trust and a clear list of what needs fixing."

---

## B. Build B — Salesforce order → Decision (>$1M) → map → create + write-back

Demonstrates: live SaaS connector, **Decision routing on the $1M rule**, mapping to a downstream system, write-back. Requirements 1 to 4. This is the headline.

### B.1 — Salesforce connection
1. **Connection: Salesforce.** Enter your Dev org username, password + security token (or OAuth). Test the connection until green.
2. **Operation: Query** on **Opportunity**. Select fields: `Id, Name, Amount, StageName, AccountId`. Optionally filter `Amount != null`.

### B.2 — Build steps
1. **New Process.** Name it `Demo B - Order Routing to Oracle and WMS`.
2. **Start shape → Salesforce Query** (the operation above). Pulls your Opportunities as the "orders".
3. **Decision shape.** Condition: `Amount` **Greater Than** `1000000`.
   - **True path** = "needs senior approval". Add a **Notify** ("HIGH VALUE order {Name} / {Amount} — routed for approval") and/or set an `ApprovalStatus` value. In the real design this is the scheduled approval email + SFDC status write (talk to it).
   - **False path** = "auto-process". Continues to order creation.
4. **Map shape** (false path). Map the Salesforce Opportunity profile to your downstream profile:
   - "Oracle" stand-in: a **Database** profile (insert into an `orders` table) **or** an **XML** profile representing the Oracle sales order.
   - This is also where you would branch to the **WMS XML** (HTTP Client + XML profile) — build one target, describe the other.
5. **Destination connector** (false path). Database Send, or Disk/Return Documents writing the order XML. Capture a generated/returned **order number**.
6. **Write-back (optional but high-impact).** Add a **Salesforce Update** operation on Opportunity to write the new order number into a custom field (e.g., `Oracle_SO_Number__c`). Demonstrates the round-trip "user sees it succeeded". If short on time, describe it instead of building.
7. **Try/Catch** around the create + write-back so a downstream failure is caught and reported, not fatal.
8. **Stop** shapes.

### B.3 — The queue (talk, do not build)
You will **not** build Boomi Event Streams / a queue for the demo — too much for a prototype. But on the canvas or the slide, point to where the WMS branch publishes to a **queue** and explain the maintenance-window resilience (see `boomi-sc-presentation-round.html` §4). Describing the right pattern scores more than building a half one.

### B.4 — Test
**Test** against your Atom. The >$1M Opportunity visibly takes the approval branch; the normal one flows through to order creation. Show both documents.

### B.5 — Narrate
> "Here is a real order coming straight out of Salesforce. The moment it arrives, Boomi checks your business rule — is this over a million dollars? This one is, so it is automatically routed for senior approval before anything else happens; no rep can quietly push a huge order through. A normal order flows straight on: we create it in Oracle, get the sales-order number back, and write it into Salesforce so your rep sees instantly that it succeeded. One platform, your governance baked in."

---

## C. Deploy + screenshot insurance

- [ ] Deploy both processes to the Atom (`Deploy` tab) so they are not just canvas drafts.
- [ ] Run each green **within the hour before** the presentation.
- [ ] **Screenshot / screen-record both processes running green**, save locally. If a live run fails in front of the panel, you walk the screenshots and the design without losing momentum: *"here it is running a moment ago — let me take you through the design."*
- [ ] Keep the Salesforce tab logged in with the two Opportunities visible.

---

## D. Bonus expansion (one line each, for the bonus slide)

You are not building these, just gesturing at them to show platform breadth (`boomi-sc-presentation-round.html` §8):

- **Agentstudio** — put a governed AI agent on top of this activated data.
- **Boomi Connect / MCP** — the same connectivity becomes how Claude/Copilot/Gemini reach Oracle safely.
- **API Management** — expose the order flow as a governed API.
- **Flow** — build the approval screen as a low-code app.
- **Master Data Hub** — one golden customer record across all four systems.

---

## E. If something is blocking you

- **Salesforce connector will not authenticate:** you almost certainly need the **security token** appended to the password, or OAuth. Reset the token in SFDC Setup; it emails you.
- **Atom Cloud cannot reach your DB:** the DB must be internet-reachable. Fall back to file / Return Documents output — fully acceptable per the brief.
- **Flat file profile misreads the CSV:** check the delimiter (comma), the "data starts on row 2" header option, and column order.
- **Out of time:** ship **Build A only** working + Build B **designed on slides**. A working baseline plus a well-explained design beats two half-broken builds.
