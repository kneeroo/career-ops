#!/usr/bin/env node
// Delete ONLY our curated Australian demo Opportunities (by name), leaving the
// org's original sample Opportunities untouched. Reverse of load-sf-opportunities.mjs.
// Creds: same .sf-creds. Usage: node delete-sf-curated-opportunities.mjs [--dry-run]

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const API = 'v60.0';
const here = dirname(fileURLToPath(import.meta.url));

const CURATED = [
  'Bluestone Manufacturing - Equipment Order', 'Outback Mining Services - Fleet Generators',
  'Pilbara Resources - Site Power Installation', 'Meridian Logistics - National Rollout',
  'Darling Downs Agribusiness - Irrigation Systems', 'Top End Construction - Generator Fleet',
  'Yarra Valley Distributors - Quarterly Restock', 'Harbour City Supplies - Warehouse Order',
  'Great Dividing Engineering - Spare Parts', 'Coastal Freight Co - Annual Contract',
  'Brisbane Valley Traders - Restock Order', 'Southern Cross Retail - Seasonal Order',
  'Kakadu Tourism Group - Equipment Lease', 'Snowy Mountains Hydro - Maintenance Package',
  'Adelaide Hills Wines - Bottling Line Parts', 'Fremantle Ports - Crane Spares',
  'Gold Coast Hospitality - Kitchen Fitout', 'Tasman Seafood Co - Cold Storage Units',
  'Red Centre Mining - Drill Components', 'Blue Mountains Council - Fleet Service',
];

function loadCreds() {
  const creds = { ...process.env };
  try {
    for (const line of readFileSync(join(here, '.sf-creds'), 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)$/);
      if (m && !line.trim().startsWith('#')) creds[m[1]] = m[2].trim();
    }
  } catch {}
  return { SF_USERNAME: creds.SF_USERNAME, SF_PASSWORD: creds.SF_PASSWORD, SF_LOGIN_URL: creds.SF_LOGIN_URL || 'https://login.salesforce.com' };
}
const xmlEsc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

async function soapLogin({ SF_USERNAME, SF_PASSWORD, SF_LOGIN_URL }) {
  const body = `<?xml version="1.0"?><env:Envelope xmlns:env="http://schemas.xmlsoap.org/soap/envelope/"><env:Body><n1:login xmlns:n1="urn:partner.soap.sforce.com"><n1:username>${xmlEsc(SF_USERNAME)}</n1:username><n1:password>${xmlEsc(SF_PASSWORD)}</n1:password></n1:login></env:Body></env:Envelope>`;
  const text = await (await fetch(`${SF_LOGIN_URL}/services/Soap/u/${API}`, { method: 'POST', headers: { 'Content-Type': 'text/xml; charset=UTF-8', SOAPAction: 'login' }, body })).text();
  const f = text.match(/<faultstring>([^<]+)<\/faultstring>/); if (f) throw new Error(f[1]);
  return { sessionId: text.match(/<(?:\w+:)?sessionId>([^<]+)</)[1], instanceUrl: text.match(/<(?:\w+:)?serverUrl>(https:\/\/[^/]+)/)[1] };
}
async function sf(u, sid, path, opts = {}) {
  const r = await fetch(`${u}${path}`, { ...opts, headers: { Authorization: `Bearer ${sid}`, 'Content-Type': 'application/json', ...(opts.headers || {}) } });
  const t = await r.text(); let j; try { j = t ? JSON.parse(t) : null; } catch { j = t; }
  if (!r.ok) throw new Error(`${r.status} ${path}: ${JSON.stringify(j)}`); return j;
}

const creds = loadCreds();
const { sessionId, instanceUrl } = await soapLogin(creds);
console.log(`Logged in -> ${instanceUrl}`);
const inClause = CURATED.map((n) => `'${n.replace(/'/g, "\\'")}'`).join(',');
const res = await sf(instanceUrl, sessionId, `/services/data/${API}/query?q=${encodeURIComponent(`SELECT Id, Name FROM Opportunity WHERE Name IN (${inClause})`)}`);
const ids = (res.records || []).map((r) => r.Id);
console.log(`Curated opportunities found: ${ids.length}.`);
if (process.argv.includes('--dry-run')) { console.log('DRY RUN — nothing deleted.'); process.exit(0); }
for (let i = 0; i < ids.length; i += 200) {
  await sf(instanceUrl, sessionId, `/services/data/${API}/composite/sobjects?ids=${ids.slice(i, i + 200).join(',')}&allOrNone=false`, { method: 'DELETE' });
}
console.log(`Deleted ${ids.length} curated Opportunities. Original samples left intact.`);
