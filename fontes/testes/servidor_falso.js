// Servidor de mentira que imita as 3 funções do Supabase (fontes/sync_supabase.sql), só para os testes.
// Uso: node servidor_falso.js 8787     (guarda tudo na memória; GET /__dump mostra o que o "servidor" enxerga)
const http = require('http');
const porta = +process.argv[2] || 8787;
const db = new Map();
let offline = false;
function resp(res, code, obj) {
  res.writeHead(code, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*', 'Access-Control-Allow-Methods': 'POST,GET,OPTIONS'});
  res.end(obj === undefined ? '' : JSON.stringify(obj));
}
http.createServer((req, res) => {
  if (req.method === 'OPTIONS') return resp(res, 204);
  if (req.url === '/__dump') return resp(res, 200, [...db.entries()].map(([id, v]) => ({id, rev: v.rev, data: v.data})));
  if (req.url === '/__offline') { offline = true; return resp(res, 200, {offline}); }
  if (req.url === '/__online') { offline = false; return resp(res, 200, {offline}); }
  if (req.url === '/__reset') { db.clear(); return resp(res, 200, {}); }
  if (offline) return resp(res, 503, {message: 'fora do ar'});
  const m = /^\/rest\/v1\/rpc\/(anaquim_\w+)$/.exec(req.url);
  if (!m || req.method !== 'POST') return resp(res, 404, {});
  if (!req.headers.apikey) return resp(res, 401, {});
  let body = '';
  req.on('data', c => body += c);
  req.on('end', () => {
    let a; try { a = JSON.parse(body); } catch (e) { return resp(res, 400, {}); }
    if (typeof a.p_id !== 'string' || !/^[0-9a-f]{64}$/.test(a.p_id)) return resp(res, 400, {message: 'id invalido'});
    const f = m[1];
    if (f === 'anaquim_ler') {
      const r = db.get(a.p_id);
      return resp(res, 200, r ? {existe: true, rev: r.rev, data: r.data} : {existe: false});
    }
    if (f === 'anaquim_gravar') {
      if (JSON.stringify(a.p_data).length > 600000) return resp(res, 400, {message: 'grande'});
      const r = db.get(a.p_id);
      if (a.p_rev === 0) {
        if (!r) { db.set(a.p_id, {rev: 1, data: a.p_data}); return resp(res, 200, {ok: true, rev: 1}); }
      } else if (r && r.rev === a.p_rev) {
        r.rev++; r.data = a.p_data; return resp(res, 200, {ok: true, rev: r.rev});
      }
      return resp(res, 200, {ok: false, rev: r ? r.rev : 0});
    }
    if (f === 'anaquim_apagar') { db.delete(a.p_id); return resp(res, 204); }
    resp(res, 404, {});
  });
}).listen(porta, '127.0.0.1', () => console.log('servidor falso em ' + porta));
