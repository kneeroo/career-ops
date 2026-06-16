#!/usr/bin/env node
// Load curated demo Accounts + Orders into a Salesforce Developer org via API.
//
// PREREQUISITES (one-time, manual in Setup — cannot be done via the data API):
//   1. Orders enabled: Setup > Order Settings > Enable Orders.
//   2. Two custom fields on the Order object:
//        Order_Value__c    (Currency)  -- the value the Decision routes on
//        Oracle_SO_Number__c (Text 50) -- the write-back target
//
// Auth + creds are the same as load-sf-opportunities.mjs (.sf-creds in this folder).
// By default it RESETS Orders: deletes every existing Order, ensures the customer
// Accounts exist (idempotent by name), then inserts the 20 curated Orders.
//
// Usage:
//   node load-sf-orders.mjs            # reset Orders + insert curated set
//   node load-sf-orders.mjs --dry-run  # show what it would do, no API writes

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const API = 'v60.0';
const here = dirname(fileURLToPath(import.meta.url));

// [Customer (Account), Order description, Value (AUD), EffectiveDate]
const ORDERS = [
  // over $1M -> approval path (6)
  ['Bluestone Manufacturing', 'Equipment Order', 1500000, '2026-12-18'],
  ['Outback Mining Services', 'Fleet Generators', 2300000, '2026-11-30'],
  ['Pilbara Resources', 'Site Power Installation', 3150000, '2026-10-22'],
  ['Meridian Logistics', 'National Rollout', 1850000, '2026-12-05'],
  ['Darling Downs Agribusiness', 'Irrigation Systems', 1200000, '2026-11-14'],
  ['Top End Construction', 'Generator Fleet', 1050000, '2026-12-20'],
  // under $1M -> auto-process path (14)
  ['Yarra Valley Distributors', 'Quarterly Restock', 250000, '2026-08-17'],
  ['Harbour City Supplies', 'Warehouse Order', 480000, '2026-09-30'],
  ['Great Dividing Engineering', 'Spare Parts', 95000, '2026-07-22'],
  ['Coastal Freight Co', 'Annual Contract', 720000, '2026-10-15'],
  ['Brisbane Valley Traders', 'Restock Order', 130000, '2026-09-08'],
  ['Southern Cross Retail', 'Seasonal Order', 340000, '2026-11-02'],
  ['Kakadu Tourism Group', 'Equipment Lease', 65000, '2026-08-01'],
  ['Snowy Mountains Hydro', 'Maintenance Package', 890000, '2026-10-28'],
  ['Adelaide Hills Wines', 'Bottling Line Parts', 175000, '2026-09-19'],
  ['Fremantle Ports', 'Crane Spares', 610000, '2026-11-25'],
  ['Gold Coast Hospitality', 'Kitchen Fitout', 220000, '2026-08-30'],
  ['Tasman Seafood Co', 'Cold Storage Units', 455000, '2026-10-10'],
  ['Red Centre Mining', 'Drill Components', 980000, '2026-12-12'],
  ['Blue Mountains Council', 'Fleet Service', 78000, '2026-07-29'],
];

function loadCreds() {
  const creds = { ...process.env };
  try {
    const raw = readFileSync(join(here, '.sf-creds'), 'utf8');
    for (const line of raw.split('\n')) {
      const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)$/);
      if (m && !line.trim().startsWith('#')) creds[m[1]] = m[2].trim();
    }
  } catch {}
  const SF_LOGIN_URL = creds.SF_LOGIN_URL || 'https://login.salesforce.com';
  if (!creds.SF_USERNAME || !creds.SF_PASSWORD) {
    console.error('Missing SF_USERNAME / SF_PASSWORD. Fill .sf-creds.');
    process.exit(1);
  }
  return { SF_USERNAME: creds.SF_USERNAME, SF_PASSWORD: creds.SF_PASSWORD, SF_LOGIN_URL };
}

const xmlEsc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

async function soapLogin({ SF_USERNAME, SF_PASSWORD, SF_LOGIN_URL }) {
  const body = `<?xml version="1.0" encoding="utf-8"?>
<env:Envelope xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:env="http://schemas.xmlsoap.org/soap/envelope/">
  <env:Body><n1:login xmlns:n1="urn:partner.soap.sforce.com">
    <n1:username>${xmlEsc(SF_USERNAME)}</n1:username>
    <n1:password>${xmlEsc(SF_PASSWORD)}</n1:password>
  </n1:login></env:Body>
</env:Envelope>`;
  const res = await fetch(`${SF_LOGIN_URL}/services/Soap/u/${API}`, {
    method: 'POST', headers: { 'Content-Type': 'text/xml; charset=UTF-8', SOAPAction: 'login' }, body,
  });
  const text = await res.text();
  const fault = text.match(/<faultstring>([^<]+)<\/faultstring>/);
  if (fault) throw new Error(`SOAP login failed: ${fault[1]}`);
  const sid = text.match(/<(?:\w+:)?sessionId>([^<]+)<\/(?:\w+:)?sessionId>/);
  const surl = text.match(/<(?:\w+:)?serverUrl>([^<]+)<\/(?:\w+:)?serverUrl>/);
  if (!sid || !surl) throw new Error('Could not parse SOAP login response.');
  return { sessionId: sid[1], instanceUrl: surl[1].match(/^(https:\/\/[^/]+)/)[1] };
}

async function sf(instanceUrl, sessionId, path, opts = {}) {
  const res = await fetch(`${instanceUrl}${path}`, {
    ...opts, headers: { Authorization: `Bearer ${sessionId}`, 'Content-Type': 'application/json', ...(opts.headers || {}) },
  });
  const txt = await res.text();
  let json; try { json = txt ? JSON.parse(txt) : null; } catch { json = txt; }
  if (!res.ok) throw new Error(`${res.status} ${path}: ${JSON.stringify(json)}`);
  return json;
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const over = ORDERS.filter((o) => o[2] > 1000000).length;
  if (dryRun) {
    console.log(`DRY RUN. Would reset Orders and insert ${ORDERS.length} (with ${ORDERS.length} customer Accounts).`);
    console.log(`Fork: ${over} over $1M (approval) / ${ORDERS.length - over} normal (process).`);
    ORDERS.forEach((o) => console.log(`  ${o[2] > 1000000 ? '!' : ' '} ${o[0]} — ${o[1]} — $${o[2].toLocaleString()}`));
    return;
  }

  const creds = loadCreds();
  console.log(`Logging in as ${creds.SF_USERNAME} ...`);
  const { sessionId, instanceUrl } = await soapLogin(creds);
  console.log(`OK -> ${instanceUrl}`);

  // 1. delete existing Orders
  const existing = await sf(instanceUrl, sessionId, `/services/data/${API}/query?q=${encodeURIComponent('SELECT Id FROM Order')}`);
  const ids = (existing.records || []).map((r) => r.Id);
  for (let i = 0; i < ids.length; i += 200) {
    await sf(instanceUrl, sessionId, `/services/data/${API}/composite/sobjects?ids=${ids.slice(i, i + 200).join(',')}&allOrNone=false`, { method: 'DELETE' });
  }
  console.log(`Deleted ${ids.length} existing Orders.`);

  // 2. ensure Accounts exist (idempotent by name)
  const names = [...new Set(ORDERS.map((o) => o[0]))];
  const inClause = names.map((n) => `'${n.replace(/'/g, "\\'")}'`).join(',');
  const accQ = await sf(instanceUrl, sessionId, `/services/data/${API}/query?q=${encodeURIComponent(`SELECT Id, Name FROM Account WHERE Name IN (${inClause})`)}`);
  const acctByName = {};
  for (const r of accQ.records || []) acctByName[r.Name] = r.Id;
  const toCreate = names.filter((n) => !acctByName[n]);
  if (toCreate.length) {
    const res = await sf(instanceUrl, sessionId, `/services/data/${API}/composite/sobjects`, {
      method: 'POST', body: JSON.stringify({ allOrNone: false, records: toCreate.map((Name) => ({ attributes: { type: 'Account' }, Name })) }),
    });
    res.forEach((r, i) => { if (r.success) acctByName[toCreate[i]] = r.id; });
  }
  console.log(`Accounts ready: ${Object.keys(acctByName).length}.`);

  // 3. create Orders
  const records = ORDERS.map(([customer, desc, value, eff]) => ({
    attributes: { type: 'Order' },
    AccountId: acctByName[customer],
    EffectiveDate: eff,
    Status: 'Draft',
    Description: `${customer} - ${desc}`,
    Order_Value__c: value,
    Oracle_SO_Number__c: null,
  }));
  const result = await sf(instanceUrl, sessionId, `/services/data/${API}/composite/sobjects`, {
    method: 'POST', body: JSON.stringify({ allOrNone: false, records }),
  });
  const ok = result.filter((r) => r.success).length;
  const failed = result.filter((r) => !r.success);
  console.log(`Inserted ${ok}/${records.length} Orders.`);
  if (failed.length) console.log('Failures:', JSON.stringify(failed.slice(0, 3), null, 2));
  console.log(`Fork: ${over} over $1M (approval) / ${ORDERS.length - over} normal (process).`);
}

main().catch((e) => { console.error('ERROR:', e.message); process.exit(1); });
