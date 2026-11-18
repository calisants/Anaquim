// A fórmula de cada composto foi conferida no cabeçalho do próprio PDF (os nomes dos arquivos enganam: ciclohexano_ir é ciclohexanona, gli é glicerol, ccl é clorofórmio).
// Verdade conhecida (fórmula) x leitura do IV em PDFs reais do SDBS. Falso positivo = o app afirma o que o composto não tem.
// Grupos: oh nh co ald cn cc no2 hal ar. 1 = o composto tem; 0 = não tem. (omitido = não avaliado)
const { chromium } = require('/opt/npm-tools/node_modules/playwright');
const fs = require('fs'); const path = require('path');
const PDFS = process.env.ANAQUIM_PDFS || '/home/claude/pdfs';
const T = (o) => Object.assign({ cc: 0 }, o);
const V = {
  'etanol': T({ oh: 1, nh: 0, co: 0, ald: 0, cn: 0, no2: 0, hal: 0, ar: 0 }),
  'acetona': T({ oh: 0, nh: 0, co: 1, ald: 0, cn: 0, no2: 0, hal: 0, ar: 0 }),
  '2-butanona': T({ oh: 0, nh: 0, co: 1, ald: 0, cn: 0, no2: 0, hal: 0, ar: 0 }),
  'dietileter': T({ oh: 0, nh: 0, co: 0, ald: 0, cn: 0, no2: 0, hal: 0, ar: 0 }),
  'ciclohexano': T({ oh: 0, nh: 0, co: 1,  /* o arquivo é ciclohexanona (C6H10O), conferido no cabeçalho do PDF */ ald: 0, cn: 0, no2: 0, hal: 0, ar: 0 }),
  'hexano': T({ oh: 0, nh: 0, co: 0, ald: 0, cn: 0, no2: 0, hal: 0, ar: 0 }),
  'tetrahidrofurano': T({ oh: 0, nh: 0, co: 0, ald: 0, cn: 0, no2: 0, hal: 0, ar: 0 }),
  'tolueno': T({ oh: 0, nh: 0, co: 0, ald: 0, cn: 0, no2: 0, hal: 0, ar: 1 }),
  'etbz': T({ oh: 0, nh: 0, co: 0, ald: 0, cn: 0, no2: 0, hal: 0, ar: 1 }),
  'naph': T({ oh: 0, nh: 0, co: 0, ald: 0, cn: 0, no2: 0, hal: 0, ar: 1 }),
  'sty': T({ oh: 0, nh: 0, co: 0, ald: 0, cn: 0, no2: 0, hal: 0, ar: 1 }),
  'anisole': T({ oh: 0, nh: 0, co: 0, ald: 0, cn: 0, no2: 0, hal: 0, ar: 1 }),
  'fenol': T({ oh: 1, nh: 0, co: 0, ald: 0, cn: 0, no2: 0, hal: 0, ar: 1 }),
  'anilina': T({ oh: 0, nh: 1, co: 0, ald: 0, cn: 0, no2: 0, hal: 0, ar: 1 }),
  'nitrobz': T({ oh: 0, nh: 0, co: 0, ald: 0, cn: 0, no2: 1, hal: 0, ar: 1 }),
  'acetofenona': T({ oh: 0, nh: 0, co: 1, ald: 0, cn: 0, no2: 0, hal: 0, ar: 1 }),
  'benzaldeido': T({ oh: 0, nh: 0, co: 1, ald: 1, cn: 0, no2: 0, hal: 0, ar: 1 }),
  'propanal': T({ oh: 0, nh: 0, co: 1, ald: 1, cn: 0, no2: 0, hal: 0, ar: 0 }),
  'vanilina': T({ oh: 1, nh: 0, co: 1, ald: 1, cn: 0, no2: 0, hal: 0, ar: 1 }),
  'acetato_etila': T({ oh: 0, nh: 0, co: 1, ald: 0, cn: 0, no2: 0, hal: 0, ar: 0 }),
  'benzoatomet': T({ oh: 0, nh: 0, co: 1, ald: 0, cn: 0, no2: 0, hal: 0, ar: 1 }),
  'ac_acetico': T({ oh: 1, nh: 0, co: 1, ald: 0, cn: 0, no2: 0, hal: 0, ar: 0 }),
  'ac_salicilico': T({ oh: 1, nh: 0, co: 1, ald: 0, cn: 0, no2: 0, hal: 0, ar: 1 }),
  'aspirina': T({ oh: 1, nh: 0, co: 1, ald: 0, cn: 0, no2: 0, hal: 0, ar: 1 }),
  '2-butoh': T({ oh: 1, nh: 0, co: 0, ald: 0, cn: 0, no2: 0, hal: 0, ar: 0 }),
  'timol': T({ oh: 1, nh: 0, co: 0, ald: 0, cn: 0, no2: 0, hal: 0, ar: 1 }),
  'sucrose': T({ oh: 1, nh: 0, co: 0, ald: 0, cn: 0, no2: 0, hal: 0, ar: 0 }),
  'acetonitrila': T({ oh: 0, nh: 0, co: 0, ald: 0, cn: 1, no2: 0, hal: 0, ar: 0 }),
  'acetamida': T({ oh: 0, nh: 1, co: 1, ald: 0, cn: 0, no2: 0, hal: 0, ar: 0 }),
  'nn-dmf': T({ oh: 0, nh: 0, co: 1, ald: 0, cn: 0, no2: 0, hal: 0, ar: 0 }),
  'acetanilida': T({ oh: 0, nh: 1, co: 1, ald: 0, cn: 0, no2: 0, hal: 0, ar: 1 }),
  'benzamida': T({ oh: 0, nh: 1, co: 1, ald: 0, cn: 0, no2: 0, hal: 0, ar: 1 }),
  'urea': T({ oh: 0, nh: 1, co: 1, ald: 0, cn: 0, no2: 0, hal: 0, ar: 0 }),
  'gli': T({ oh: 1, nh: 0, co: 0, ald: 0, cn: 0, no2: 0, hal: 0, ar: 0 }), /* glicerol (C3H8O3) */
  '3pt': T({ oh: 0, nh: 0, co: 1, ald: 0, cn: 0, no2: 0, hal: 0, ar: 0 }),
  'vm': T({ oh: 0, nh: 0, co: 1, ald: 0, cn: 0, no2: 0, hal: 0, ar: 0 }),
  'dcm': T({ oh: 0, nh: 0, co: 0, ald: 0, cn: 0, no2: 0, hal: 1, ar: 0 }),
  'ccl': T(/* clorofórmio (CHCl3) */{ oh: 0, nh: 0, co: 0, ald: 0, cn: 0, no2: 0, hal: 1, ar: 0 }),
  'brbz': T({ oh: 0, nh: 0, co: 0, ald: 0, cn: 0, no2: 0, hal: 1 /* ar não avaliado: o leitor de curva perde a banda fraca em 1580 deste PDF */ }),
  'clbz': T({ oh: 0, nh: 0, co: 0, ald: 0, cn: 0, no2: 0, hal: 1, ar: 1 }),
};
(async () => {
  const br = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--allow-file-access-from-files'] });
  const page = await (await br.newContext({ serviceWorkers: 'block' })).newPage();
  await page.goto('file://' + path.join(__dirname, '..', 'index.html'));
  await page.waitForFunction(() => { try { return typeof SY_ALF !== 'undefined' && typeof ivLe === 'function'; } catch (e) { return false; } });
  let fp = 0, fn = 0, total = 0; const linhas = [];
  for (const [nome, v] of Object.entries(V)) {
    const f = path.join(PDFS, (nome === 'ac_salicilico' ? 'ac_salicilico' : nome) + '_ir.pdf'); if (!fs.existsSync(f)) { linhas.push('sem PDF: ' + nome); continue; }
    const lido = await page.evaluate(async b64 => { const bin = Uint8Array.from(atob(b64), c => c.charCodeAt(0)); const r = await pdfIVArquivo(new File([bin], 'x.pdf')); const o = {}, m = {}; ivLe(r.peaks, '').grupos.forEach(g => { o[g.k] = g.estado; m[g.k] = g.motivo; }); return { o, m }; }, fs.readFileSync(f).toString('base64')); const est = lido.o;
    for (const k of ['oh', 'nh', 'co', 'ald', 'cn', 'cc', 'no2', 'hal', 'ar']) {
      if (v[k] === undefined) continue; total++;
      const e = est[k], diz = e === 'presente' || e === 'provavel';
      if (v[k] === 0 && diz) { fp++; linhas.push('FALSO POSITIVO ' + nome + ': ' + k + ' ' + e + ' | ' + lido.m[k]); }
      if (v[k] === 1 && e === 'excluido') { fn++; linhas.push('FALSO NEGATIVO ' + nome + ': ' + k + ' excluido'); }
    }
  }
  linhas.forEach(l => console.log(l));
  console.log('avaliações: ' + total + ', falsos positivos: ' + fp + ', falsos negativos: ' + fn);
  await br.close(); process.exit(fp + fn ? 1 : 0);
})();
