// Testes do motor ivLe (sem navegador). Extrai o bloco IVLEITURA de index.html e executa.
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const src = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const m = /\/\* IVLEITURA:INICIO \*\/([\s\S]*?)\/\* IVLEITURA:FIM \*\//.exec(src);
const bq = /function bdIvQuery\(s\)\{[^\n]*\}/.exec(src);
const ETIQUETAS = ['Mapa (Ingham e Henson, 1984)', 'tabela do app', 'regra do Claude, sem fonte conferida'];

function carrega() {
  assert.ok(m, 'bloco IVLEITURA não existe em index.html');
  assert.ok(bq, 'bdIvQuery não encontrada');
  return new Function(bq[0] + '\n' + m[1] + '\nreturn {ivLe, ivBandasDeTexto};')();
}
const F = (v, o) => Object.assign({ v, forte: true }, o || {});
const N = (v, o) => Object.assign({ v, forte: false }, o || {});
const est = (r, k) => { const g = r.grupos.find(x => x.k === k); assert.ok(g, 'grupo ausente: ' + k); return g.estado; };

const casos = {
  aldeido(L) {
    const r = L.ivLe([F(1715), N(2820), N(2720), N(3030)], '');
    assert.strictEqual(est(r, 'ald'), 'presente');
    assert.strictEqual(est(r, 'co'), 'presente');
    assert.strictEqual(est(r, 'oh'), 'excluido');
    assert.strictEqual(est(r, 'nh'), 'excluido');
    return r;
  },
  acido_carboxilico(L) {
    const r = L.ivLe([F(3000, { w: 'l' }), F(1710)], '');
    assert.strictEqual(est(r, 'oh'), 'presente');
    assert.strictEqual(est(r, 'co'), 'presente');
    assert.strictEqual(est(r, 'ald'), 'excluido');
    return r;
  },
  banda_unica(L) {
    const r = L.ivLe([F(1715)], '');
    assert.strictEqual(est(r, 'co'), 'presente');
    assert.strictEqual(est(r, 'ald'), 'excluido');
    ['oh', 'nh', 'ald', 'cn', 'cc', 'dc', 'no2', 'ar'].forEach(k => assert.notStrictEqual(est(r, k), 'presente', k));
    return r;
  },
  largura_desconhecida(L) {
    const r = L.ivLe([F(3300)], '');
    assert.strictEqual(est(r, 'oh'), 'indefinido');
    assert.ok(/largura/.test(r.grupos.find(g => g.k === 'oh').falta));
    return r;
  },
  nitro(L) {
    const r = L.ivLe([F(1530), F(1350), N(3080)], '');
    assert.strictEqual(est(r, 'no2'), 'presente');
    const r2 = L.ivLe([F(1530)], '');
    assert.strictEqual(est(r2, 'no2'), 'indefinido');
    return r;
  },
  meio_solucao(L) {
    const a = L.ivLe([F(3620, { w: 'e' })], 'sol');
    assert.strictEqual(est(a, 'oh'), 'presente');
    const b = L.ivLe([F(3620, { w: 'e' })], '');
    assert.strictEqual(est(b, 'oh'), 'excluido');
    return a;
  },
  vazio_e_ruido(L) {
    const a = L.ivLe([], '');
    assert.strictEqual(a.vazio, true);
    assert.ok(/nenhuma banda/i.test(a.aviso));
    const b = L.ivLe([{ v: NaN }, { v: 200 }, { v: 5000 }], '');
    assert.strictEqual(b.vazio, true);
    const c = L.ivLe([F(1715), F(1715)], '');
    assert.strictEqual(est(c, 'co'), 'presente');
    return c;
  },
  so_abaixo_de_1500(L) {
    const r = L.ivLe([F(1000), F(750)], '');
    assert.strictEqual(r.vazio, false);
    assert.ok(/acima de 1500/.test(r.aviso));
    assert.strictEqual(est(r, 'co'), 'excluido');
    return r;
  },
  texto_para_bandas(L) {
    const b = L.ivBandasDeTexto('3300l 1715, 2820 2720e 100');
    assert.deepStrictEqual(b.map(x => x.v), [3300, 1715, 2820, 2720]);
    assert.strictEqual(b[0].w, 'l');
    assert.strictEqual(b[3].w, 'e');
    return null;
  },
};

let ok = 0, falhas = [];
let L;
try { L = carrega(); } catch (e) { console.log('FALHOU (carga): ' + e.message); process.exit(1); }
const todos = [];
for (const [nome, fn] of Object.entries(casos)) {
  try { const r = fn(L); ok++; if (r) todos.push(r); } catch (e) { falhas.push(nome + ': ' + e.message); }
}
// fonte_sempre: toda linha de toda leitura traz uma das três etiquetas
try {
  assert.ok(todos.length > 0);
  todos.forEach(r => r.grupos.forEach(g => assert.ok(ETIQUETAS.includes(g.fonte), 'fonte inválida em ' + g.k + ': ' + g.fonte)));
  ok++;
} catch (e) { falhas.push('fonte_sempre: ' + e.message); }
falhas.forEach(f => console.log('FALHOU ' + f));
console.log(falhas.length ? falhas.length + ' falha(s), ' + ok + ' ok' : 'PASSOU ' + ok + '/' + ok);
process.exit(falhas.length ? 1 : 0);
