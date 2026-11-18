// Tela "Leitura do conjunto" no Identificar: aparece, liga ao ranking, respeita o que a pessoa marcou à mão.
const { chromium } = require('/opt/npm-tools/node_modules/playwright');
const path = require('path');
const assert = require('assert');
const PDFS = process.env.ANAQUIM_PDFS || '/home/claude/pdfs';
const INDEX = 'file://' + path.join(__dirname, '..', 'index.html');
(async () => {
  const br = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--allow-file-access-from-files'] });
  const page = await (await br.newContext({ serviceWorkers: 'block' })).newPage();
  const erros = []; page.on('pageerror', e => erros.push(String(e))); page.on('console', m => { if (m.type() === 'error') erros.push(m.text()); });
  await page.goto(INDEX);
  await page.waitForFunction(() => typeof icLeituraDesenha === 'function' || typeof icBands === 'function');
  const zera = () => page.evaluate(() => { icReset(); icDraw(); icRun(); });
  const digita = async txt => { await page.evaluate(t => { const c = document.getElementById('icIV'); c.value = t; c.dispatchEvent(new Event('input', { bubbles: true })); }, txt); await page.waitForTimeout(450); };
  const estado = () => page.evaluate(() => ({ ir: JSON.parse(JSON.stringify(icSt.ir)), auto: JSON.parse(JSON.stringify(icSt.irAuto || {})), leitura: (document.getElementById('icLeitura') || {}).textContent || '', temEl: !!document.getElementById('icLeitura'), detAbertos: document.querySelectorAll('#icBandOut details[open]').length, det: document.querySelectorAll('#icBandOut details').length, fontes: document.querySelectorAll('#icLeitura .ivfonte').length, linhas: document.querySelectorAll('#icLeitura .ivl').length }));
  const falhas = []; let ok = 0;
  const caso = async (nome, fn) => { try { await fn(); ok++; } catch (e) { falhas.push(nome + ': ' + e.message); } };
  await caso('mostra_leitura', async () => {
    await zera(); await digita('1715 2820 2720 3030');
    const s = await estado();
    assert.ok(s.temEl, 'sem #icLeitura'); assert.ok(/aldeído/i.test(s.leitura), 'sem aldeído na leitura');
    assert.ok(s.linhas > 0 && s.fontes >= s.linhas, 'cada linha precisa de fonte (' + s.fontes + '/' + s.linhas + ')');
    assert.ok(s.det >= 1 && s.detAbertos === 0, 'lista por banda deve ficar em <details> fechado');
    assert.ok(/Cada banda isolada/.test(await page.evaluate(() => document.getElementById('icBandOut').textContent)), 'título da lista antiga');
  });
  await caso('liga_ao_ranking', async () => {
    await zera(); await digita('1715 2820 2720 3030');
    const s = await estado();
    assert.strictEqual(s.ir.ald, 'sim'); assert.strictEqual(s.ir.oh, 'nao'); assert.strictEqual(s.auto.ald, true);
  });
  await caso('respeita_manual', async () => {
    await zera(); await page.evaluate(() => { icSt.ir.oh = 'sim'; icDraw(); });
    await digita('1715 2820 2720 3030');
    const s = await estado();
    assert.strictEqual(s.ir.oh, 'sim'); assert.ok(!s.auto.oh, 'irAuto.oh deveria ser falso');
  });
  await caso('atualiza_auto', async () => {
    await zera(); await digita('1715 2820 2720 3030');
    assert.strictEqual((await estado()).ir.ald, 'sim');
    await digita('1715 2820 3030');
    const s = await estado();
    assert.notStrictEqual(s.ir.ald, 'sim', 'ald continuou sim sem a banda 2720');
  });
  await caso('persiste_irAuto', async () => {
    await zera(); await digita('1715 2820 2720 3030');
    await page.evaluate(() => icSave());
    await page.evaluate(() => { icSt = { est: '', cor: '', g: '', el: {}, ir: {}, sub: {}, ring: '', ot: {} }; icLoad(); });
    assert.strictEqual((await estado()).auto.ald, true);
  });
  await caso('vazio', async () => {
    await zera(); await digita('1715 2820 2720 3030'); await digita('');
    const s = await estado();
    assert.strictEqual(s.leitura.trim(), ''); assert.deepStrictEqual(s.auto, {}); assert.ok(!s.ir.ald, 'ald deveria voltar a vazio');
  });
  await caso('espectros_iv_mostra_leitura', async () => {
    await page.evaluate(() => spInit());
    await page.setInputFiles('#spf-iv', path.join(PDFS, 'acetona_ir.pdf'));
    await page.waitForFunction(() => /Leitura do espectro/.test((document.querySelector('.sppdf[data-sp="iv"] [data-sp-out]') || {}).textContent || ''), null, { timeout: 60000 });
    const r = await page.evaluate(() => { const b = document.querySelector('.sppdf[data-sp="iv"] [data-sp-out]'); const ls = [...b.querySelectorAll('.ivl')].map(x => x.textContent); return { co: ls.find(t => /^\s*C=O/.test(t)) || '', abertos: b.querySelectorAll('details[open]').length, antiga: [...b.querySelectorAll('details')].some(d => /O que pode ser/.test(d.textContent) && !d.open) }; });
    assert.ok(/presente/.test(r.co), 'C=O deveria estar presente: ' + r.co); assert.strictEqual(r.abertos, 0); assert.ok(r.antiga, 'tabela "O que pode ser" deve ficar em <details> fechado');
  });
  await caso('sem_erros', async () => assert.deepStrictEqual(erros, []));
  falhas.forEach(f => console.log('FALHOU ' + f));
  console.log(falhas.length ? falhas.length + ' falha(s), ' + ok + ' ok' : 'PASSOU ' + ok + '/' + ok);
  await br.close(); process.exit(falhas.length ? 1 : 0);
})();
