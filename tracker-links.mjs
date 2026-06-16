/**
 * tracker-links.mjs — report-link normalization for the tracker.
 *
 * The TSV tracker additions always carry a ROOT-RELATIVE markdown link of the
 * form `[NNN](reports/NNN-slug-date.md)`. Markdown links resolve relative to
 * the file that contains them, so before a link is written into the tracker it
 * must be rewritten relative to the tracker file's own directory:
 *   - tracker at `data/applications.md`  -> `../reports/...`
 *   - tracker at repo-root `applications.md` -> `reports/...`
 *
 * normalizeReportLink operates on an arbitrary string (a single report field
 * or a whole `| ... |` tracker row) and rewrites every reports/ link found in
 * it. It is idempotent: links already in `../reports/...` form normalize back
 * to the same value.
 *
 * @param {string} input        report field or full tracker line
 * @param {string} trackerDir   absolute dir of the tracker file
 * @param {string} reportsRoot  absolute dir that `reports/` is relative to
 * @returns {string}
 */
import { relative, resolve } from 'path';

export function normalizeReportLink(input, trackerDir, reportsRoot) {
  if (!input) return input;
  return input.replace(/\]\(((?:\.\.\/|\.\/)*reports\/[^)]+)\)/g, (_match, linkPath) => {
    // Canonical form is root-relative `reports/...`; strip any leading ./ or ../
    const cleaned = linkPath.replace(/^(?:\.\.\/|\.\/)+/, '');
    const abs = resolve(reportsRoot, cleaned);
    let rel = relative(trackerDir, abs).split('\\').join('/');
    rel = rel.replace(/^\.\//, '');
    return `](${rel})`;
  });
}

export default normalizeReportLink;
