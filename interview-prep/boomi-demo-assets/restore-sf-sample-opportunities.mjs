#!/usr/bin/env node
// Restore (undelete) the original Developer-org SAMPLE Opportunities from the
// Recycle Bin, leaving our curated Australian demo set out of it.
//
// How: queryAll for deleted Opportunities (IsDeleted = true), keep only the ones
// whose Name is NOT in our curated set (those are the org's original samples),
// then SOAP undelete() them. Deleted records are recoverable for ~15 days.
//
// Creds: same .sf-creds as the other loaders.
// Usage: node restore-sf-sample-opportunities.mjs [--dry-run]

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const API = 'v60.0';
const here = dirname(fileURLToPath(import.meta.url));

// Our curated opportunity names — these are NOT samples, so we exclude them.
const CURATED = new Set([
  'Bluestone Manufacturing - Equipment Order',
  'Outback Mining Services - Fleet Generators',
  'Pilbara Resources - Site Power Installation',
  'Meridian Logistics - National Rollout',
  'Darling Downs Agribusiness - Irrigation Systems',
  'Top End Construction - Generator Fleet',
  'Yarra Valley Distributors - Quarterly Restock',
  'Harbour City Supplies - Warehouse Order',
  'Great Dividing Engineering - Spare Parts',
  'Coastal Freight Co - Annual Contract',
  'Brisbane Valley Traders - Restock Order',
  'Southern Cross Retail - Seasonal Order',
  'Kakadu Tourism Group - Equipment Lease',
  'Snowy Mountains Hydro - Maintenance Package',
  'Adelaide Hills Wines - Bottling Line Parts',
  'Fremantle Ports - Crane Spares',
  'Gold Coast Hospitality - Kitchen Fitout',
  'Tasman Seafood Co - Cold Storage Units',
  'Red Centre Mining - Drill Components',
  'Blue Mountains Council - Fleet Service',
]);

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
  if (!creds.SF_USERNAME || !creds.SF_PASSWORD) { console.error('Missing creds in .sf-creds'); process.exit(1); }
  return { SF_USERNAME: creds.SF_USERNAME, SF_PASSWORD: creds.SF_PASSWORD, SF_LOGIN_URL };
}

const xmlEsc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

async function soapLogin({ SF_USERNAME, SF_PASSWORD, SF_LOGIN_URL }) {
  const body = `<?xml version="1.0" encoding="utf-8"?>
<env:Envelope xmlns:env="http://schemas.xmlsoap.org/soap/envelope/"><env:Body><n1:login xmlns:n1="urn:partner.soap.sforce.com">
<n1:username>${xmlEsc(SF_USERNAME)}</n1:username><n1:password>${xmlEsc(SF_PASSWORD)}</n1:password>
</n1:login></env:Body></env:Envelope>`;
  const res = await fetch(`${SF_LOGIN_URL}/services/Soap/u/${API}`, { method: 'POST', headers: { 'Content-Type': 'text/xml; charset=UTF-8', SOAPAction: 'login' }, body });
  const text = await res.text();
  const fault = text.match(/<faultstring>([^<]+)<\/faultstring>/);
  if (fault) throw new Error(`SOAP login failed: ${fault[1]}`);
  const sid = text.match(/<(?:\w+:)?sessionId>([^<]+)<\/(?:\w+:)?sessionId>/);
  const surl = text.match(/<(?:\w+:)?serverUrl>([^<]+)<\/(?:\w+:)?serverUrl>/);
  return { sessionId: sid[1], instanceUrl: surl[1].match(/^(https:\/\/[^/]+)/)[1] };
}

async function sf(instanceUrl, sessionId, path) {
  const res = await fetch(`${instanceUrl}${path}`, { headers: { Authorization: `Bearer ${sessionId}` } });
  const txt = await res.text();
  let json; try { json = JSON.parse(txt); } catch { json = txt; }
  if (!res.ok) throw new Error(`${res.status} ${path}: ${JSON.stringify(json)}`);
  return json;
}

async function soapUndelete(instanceUrl, sessionId, ids) {
  const idXml = ids.map((id) => `<urn:ids>${id}</urn:ids>`).join('');
  const body = `<?xml version="1.0" encoding="utf-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:partner.soap.sforce.com">
<soapenv:Header><urn:SessionHeader><urn:sessionId>${sessionId}</urn:sessionId></urn:SessionHeader></soapenv:Header>
<soapenv:Body><urn:undelete>${idXml}</urn:undelete></soapenv:Body></soapenv:Envelope>`;
  const res = await fetch(`${instanceUrl}/services/Soap/u/${API}`, { method: 'POST', headers: { 'Content-Type': 'text/xml; charset=UTF-8', SOAPAction: 'undelete' }, body });
  const text = await res.text();
  const fault = text.match(/<faultstring>([^<]+)<\/faultstring>/);
  if (fault) throw new Error(`undelete fault: ${fault[1]}`);
  const ok = (text.match(/<success>true<\/success>/g) || []).length;
  return ok;
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const creds = loadCreds();
  console.log(`Logging in as ${creds.SF_USERNAME} ...`);
  const { sessionId, instanceUrl } = await soapLogin(creds);
  console.log(`OK -> ${instanceUrl}`);

  const q = encodeURIComponent('SELECT Id, Name FROM Opportunity WHERE IsDeleted = true');
  const res = await sf(instanceUrl, sessionId, `/services/data/${API}/queryAll?q=${q}`);
  const deleted = res.records || [];
  const samples = deleted.filter((r) => !CURATED.has(r.Name));
  const sampleIds = [...new Set(samples.map((r) => r.Id))];
  console.log(`Deleted opps in bin: ${deleted.length}. Original samples to restore: ${sampleIds.length}.`);
  samples.slice(0, 40).forEach((r) => console.log(`  + ${r.Name}`));

  if (dryRun) { console.log('DRY RUN — nothing restored.'); return; }
  let restored = 0;
  for (let i = 0; i < sampleIds.length; i += 200) {
    restored += await soapUndelete(instanceUrl, sessionId, sampleIds.slice(i, i + 200));
  }
  console.log(`Restored ${restored} sample Opportunities.`);
}

main().catch((e) => { console.error('ERROR:', e.message); process.exit(1); });
