#!/usr/bin/env node
// Load curated demo Opportunities into a Salesforce Developer org.
//
// Auth: SOAP login (username + password+securitytoken). By default it RESETS the org:
// deletes every existing Opportunity, then inserts the curated set below via the REST
// Composite sObjects API. Use --insert-only to add without deleting.
//
// Credentials are read from a local gitignored ".sf-creds" file (KEY=VALUE) in this
// folder, or from env vars: SF_USERNAME, SF_PASSWORD (password immediately followed by
// the security token, no space), SF_LOGIN_URL (default https://login.salesforce.com).
//
// Usage:
//   node load-sf-opportunities.mjs               # delete all opps + insert curated set
//   node load-sf-opportunities.mjs --insert-only # insert without deleting
//   node load-sf-opportunities.mjs --dry-run     # show what it would do, no API writes

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const API = 'v60.0';
const here = dirname(fileURLToPath(import.meta.url));

// --- curated 20 opportunities (deterministic, AUD). [Name, Amount, Stage, CloseDate] ---
const OPPS = [
  // over $1M -> approval path (6)
  ['Bluestone Manufacturing - Equipment Order', 1500000, 'Proposal/Price Quote', '2026-12-18'],
  ['Outback Mining Services - Fleet Generators', 2300000, 'Negotiation/Review', '2026-11-30'],
  ['Pilbara Resources - Site Power Installation', 3150000, 'Negotiation/Review', '2026-10-22'],
  ['Meridian Logistics - National Rollout', 1850000, 'Proposal/Price Quote', '2026-12-05'],
  ['Darling Downs Agribusiness - Irrigation Systems', 1200000, 'Value Proposition', '2026-11-14'],
  ['Top End Construction - Generator Fleet', 1050000, 'Qualification', '2026-12-20'],
  // under $1M -> auto-process path (14)
  ['Yarra Valley Distributors - Quarterly Restock', 250000, 'Closed Won', '2026-08-17'],
  ['Harbour City Supplies - Warehouse Order', 480000, 'Proposal/Price Quote', '2026-09-30'],
  ['Great Dividing Engineering - Spare Parts', 95000, 'Closed Won', '2026-07-22'],
  ['Coastal Freight Co - Annual Contract', 720000, 'Negotiation/Review', '2026-10-15'],
  ['Brisbane Valley Traders - Restock Order', 130000, 'Qualification', '2026-09-08'],
  ['Southern Cross Retail - Seasonal Order', 340000, 'Proposal/Price Quote', '2026-11-02'],
  ['Kakadu Tourism Group - Equipment Lease', 65000, 'Closed Won', '2026-08-01'],
  ['Snowy Mountains Hydro - Maintenance Package', 890000, 'Negotiation/Review', '2026-10-28'],
  ['Adelaide Hills Wines - Bottling Line Parts', 175000, 'Value Proposition', '2026-09-19'],
  ['Fremantle Ports - Crane Spares', 610000, 'Proposal/Price Quote', '2026-11-25'],
  ['Gold Coast Hospitality - Kitchen Fitout', 220000, 'Closed Won', '2026-08-30'],
  ['Tasman Seafood Co - Cold Storage Units', 455000, 'Qualification', '2026-10-10'],
  ['Red Centre Mining - Drill Components', 980000, 'Negotiation/Review', '2026-12-12'],
  ['Blue Mountains Council - Fleet Service', 78000, 'Closed Won', '2026-07-29'],
];

function loadCreds() {
  const creds = { ...process.env };
  try {
    const raw = readFileSync(join(here, '.sf-creds'), 'utf8');
    for (const line of raw.split('\n')) {
      const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)$/);
      if (m && !line.trim().startsWith('#')) creds[m[1]] = m[2].trim();
    }
  } catch { /* no file -> rely on env */ }
  const SF_LOGIN_URL = creds.SF_LOGIN_URL || 'https://login.salesforce.com';
  if (!creds.SF_USERNAME || !creds.SF_PASSWORD) {
    console.error('Missing SF_USERNAME / SF_PASSWORD. Fill interview-prep/boomi-demo-assets/.sf-creds (copy from .sf-creds.example).');
    process.exit(1);
  }
  return { SF_USERNAME: creds.SF_USERNAME, SF_PASSWORD: creds.SF_PASSWORD, SF_LOGIN_URL };
}

const xmlEsc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

async function soapLogin({ SF_USERNAME, SF_PASSWORD, SF_LOGIN_URL }) {
  const body = `<?xml version="1.0" encoding="utf-8"?>
<env:Envelope xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:env="http://schemas.xmlsoap.org/soap/envelope/">
  <env:Body>
    <n1:login xmlns:n1="urn:partner.soap.sforce.com">
      <n1:username>${xmlEsc(SF_USERNAME)}</n1:username>
      <n1:password>${xmlEsc(SF_PASSWORD)}</n1:password>
    </n1:login>
  </env:Body>
</env:Envelope>`;
  const res = await fetch(`${SF_LOGIN_URL}/services/Soap/u/${API}`, {
    method: 'POST',
    headers: { 'Content-Type': 'text/xml; charset=UTF-8', SOAPAction: 'login' },
    body,
  });
  const text = await res.text();
  const fault = text.match(/<faultstring>([^<]+)<\/faultstring>/);
  if (fault) throw new Error(`SOAP login failed: ${fault[1]}`);
  const sid = text.match(/<(?:\w+:)?sessionId>([^<]+)<\/(?:\w+:)?sessionId>/);
  const surl = text.match(/<(?:\w+:)?serverUrl>([^<]+)<\/(?:\w+:)?serverUrl>/);
  if (!sid || !surl) throw new Error('Could not parse SOAP login response.');
  const instanceUrl = surl[1].match(/^(https:\/\/[^/]+)/)[1];
  return { sessionId: sid[1], instanceUrl };
}

async function sf(instanceUrl, sessionId, path, opts = {}) {
  const res = await fetch(`${instanceUrl}${path}`, {
    ...opts,
    headers: { Authorization: `Bearer ${sessionId}`, 'Content-Type': 'application/json', ...(opts.headers || {}) },
  });
  const txt = await res.text();
  let json; try { json = txt ? JSON.parse(txt) : null; } catch { json = txt; }
  if (!res.ok) throw new Error(`${res.status} ${path}: ${JSON.stringify(json)}`);
  return json;
}

async function main() {
  const insertOnly = process.argv.includes('--insert-only');
  const dryRun = process.argv.includes('--dry-run');
  const over = OPPS.filter((o) => o[1] > 1000000).length;

  if (dryRun) {
    console.log(`DRY RUN. Would ${insertOnly ? 'insert' : 'delete all existing opps, then insert'} ${OPPS.length} Opportunities.`);
    console.log(`Fork: ${over} over $1M (approval) / ${OPPS.length - over} normal (process).`);
    OPPS.forEach((o) => console.log(`  ${o[1] > 1000000 ? '!' : ' '} ${o[0]} — $${o[1].toLocaleString()} — ${o[2]}`));
    return;
  }

  const creds = loadCreds();
  console.log(`Logging in as ${creds.SF_USERNAME} ...`);
  const { sessionId, instanceUrl } = await soapLogin(creds);
  console.log(`OK -> ${instanceUrl}`);

  if (!insertOnly) {
    const q = encodeURIComponent('SELECT Id FROM Opportunity');
    const existing = await sf(instanceUrl, sessionId, `/services/data/${API}/query?q=${q}`);
    const ids = (existing.records || []).map((r) => r.Id);
    console.log(`Found ${ids.length} existing Opportunities.`);
    for (let i = 0; i < ids.length; i += 200) {
      const batch = ids.slice(i, i + 200);
      await sf(instanceUrl, sessionId, `/services/data/${API}/composite/sobjects?ids=${batch.join(',')}&allOrNone=false`, { method: 'DELETE' });
    }
    if (ids.length) console.log(`Deleted ${ids.length} Opportunities.`);
  }

  const records = OPPS.map(([Name, Amount, StageName, CloseDate]) => ({
    attributes: { type: 'Opportunity' }, Name, Amount, StageName, CloseDate,
  }));
  const result = await sf(instanceUrl, sessionId, `/services/data/${API}/composite/sobjects`, {
    method: 'POST', body: JSON.stringify({ allOrNone: false, records }),
  });
  const ok = result.filter((r) => r.success).length;
  const failed = result.filter((r) => !r.success);
  console.log(`Inserted ${ok}/${records.length} Opportunities.`);
  if (failed.length) console.log('Failures:', JSON.stringify(failed, null, 2));
  console.log(`Fork: ${over} over $1M (approval) / ${OPPS.length - over} normal (process).`);
}

main().catch((e) => { console.error('ERROR:', e.message); process.exit(1); });
