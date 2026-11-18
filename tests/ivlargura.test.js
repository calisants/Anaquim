// Largura das bandas lidas de PDF (SDBS). PDFs de teste: pasta ANAQUIM_PDFS (padrão /home/claude/pdfs),
// com etanol_ir.pdf, acetona_ir.pdf e ac_salicilico_ir.pdf (projeto Orgânica).
const { chromium } = require('/opt/npm-tools/node_modules/playwright');
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const PDFS = process.env.ANAQUIM_PDFS || '/home/claude/pdfs';
const INDEX = 'file://' + path.join(__dirname, '..', 'index.html');
// posições lidas pela v273 no ácido salicílico (não podem sumir)
const SAL_V273 = [3235, 3061, 3046, 3008, 2865, 2850, 2722, 2608, 2593, 1665, 1612, 1581, 1483, 1467, 1445, 1323, 1297, 1251, 1209, 1191, 1156, 1031, 895, 853, 788, 762, 697, 663, 534, 470];
(async () => {
  const br = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--allow-file-access-from-files'] });
  const page = await (await br.newContext({ serviceWorkers: 'block' })).newPage();
  const erros = []; page.on('pageerror', e => erros.push(String(e)));
  await page.goto(INDEX);
  await page.waitForFunction(() => typeof pdfIVArquivo === 'function');
  const le = async nome => {
    const b64 = fs.readFileSync(path.join(PDFS, nome)).toString('base64');
    return page.evaluate(async b64 => {
      const bin = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
      const r = await pdfIVArquivo(new File([bin], 'x.pdf'));
      return r ? r.peaks.map(p => ({ v: p.v, w: p.w, h: p.h })) : null;
    }, b64);
  };
  const falhas = []; let ok = 0;
  const caso = async (nome, fn) => { try { await fn(); ok++; } catch (e) { falhas.push(nome + ': ' + e.message); } };
  await caso('etanol_OH_larga', async () => {
    const p = (await le('etanol_ir.pdf')).filter(x => x.v >= 3200 && x.v <= 3500).sort((a, b) => b.h - a.h)[0];
    assert.ok(p, 'sem banda em 3500–3200'); assert.ok(p.w >= 110, 'w=' + p.w + ' (esperado >= 110)');
  });
  await caso('acetona_CO_estreita', async () => {
    const p = (await le('acetona_ir.pdf')).filter(x => x.v >= 1700 && x.v <= 1730).sort((a, b) => b.h - a.h)[0];
    assert.ok(p, 'sem banda em 1700–1730'); assert.ok(p.w > 0 && p.w <= 60, 'w=' + p.w + ' (esperado 1..60)');
  });
  await caso('salicilico_continua_igual', async () => {
    const r = await le('ac_salicilico_ir.pdf');
    assert.deepStrictEqual(r.map(x => x.v), SAL_V273);
    assert.ok(r.every(x => typeof x.w === 'number' && x.w > 0), 'w ausente ou 0 em: ' + r.filter(x => !(x.w > 0)).map(x => x.v));
  });
  await caso('sem_erros_na_pagina', async () => assert.deepStrictEqual(erros, []));
  falhas.forEach(f => console.log('FALHOU ' + f));
  console.log(falhas.length ? falhas.length + ' falha(s), ' + ok + ' ok' : 'PASSOU ' + ok + '/' + ok);
  await br.close(); process.exit(falhas.length ? 1 : 0);
})();
