// Halogênio na leitura do IV, com PDFs reais do SDBS (pasta ANAQUIM_PDFS: dcm_ir, ccl_ir, brbz_ir, clbz_ir, etanol_ir, acetona_ir).
const { chromium } = require('/opt/npm-tools/node_modules/playwright');
const fs = require('fs'); const path = require('path'); const assert = require('assert');
const PDFS = process.env.ANAQUIM_PDFS || '/home/claude/pdfs';
(async () => {
  const br = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--allow-file-access-from-files'] });
  const page = await (await br.newContext({ serviceWorkers: 'block' })).newPage();
  await page.goto('file://' + path.join(__dirname, '..', 'index.html'));
  await page.waitForFunction(() => { try { return typeof SY_ALF !== 'undefined' && typeof ivLe === 'function'; } catch (e) { return false; } });
  const hal = async n => page.evaluate(async b64 => { const bin = Uint8Array.from(atob(b64), c => c.charCodeAt(0)); const r = await pdfIVArquivo(new File([bin], 'x.pdf')); const g = ivLe(r.peaks, '').grupos.find(x => x.k === 'hal'); return g.estado; }, fs.readFileSync(path.join(PDFS, n)).toString('base64'));
  const esperado = { 'dcm_ir.pdf': 'provavel', 'ccl_ir.pdf': 'provavel', 'brbz_ir.pdf': 'provavel', 'clbz_ir.pdf': 'indefinido', 'etanol_ir.pdf': 'excluido', 'acetona_ir.pdf': 'excluido' };
  const falhas = []; let ok = 0;
  for (const [n, e] of Object.entries(esperado)) { const g = await hal(n); if (g === e) ok++; else falhas.push(n + ': ' + g + ' (esperado ' + e + ')'); }
  falhas.forEach(f => console.log('FALHOU ' + f));
  console.log(falhas.length ? falhas.length + ' falha(s), ' + ok + ' ok' : 'PASSOU ' + ok + '/' + ok);
  await br.close(); process.exit(falhas.length ? 1 : 0);
})();
