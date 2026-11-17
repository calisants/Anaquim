/* ================= ANALORG v7: sincronização entre aparelhos =================
   Sem conta, sem e-mail, sem nome. O app cria um CÓDIGO (80 bits aleatórios, ex.: K7QF-93XM-2PDA-WH8T). Quem digita o mesmo código em
   outro aparelho vê os mesmos dados.
   O código nunca sai do aparelho. O que vai para o servidor:
     - id    = SHA-256 do código (não dá para voltar ao código);
     - dados = o texto do progresso, cifrado aqui com AES-GCM (a chave sai do código). O servidor só guarda um bloco ilegível.
   Funcionamento: salva sempre no aparelho primeiro. Com internet, sincroniza ao abrir, ao voltar para o app e alguns segundos depois de cada alteração.
   Cada chave sincronizada guarda a hora da última alteração; na sincronização vence a mais recente (LWW), exceto aulas e revisões, que são juntadas.
   Na primeira ligação de um aparelho a um código existente, tudo é JUNTADO (nada que já estava no aparelho se perde).
   O servidor (Supabase) só expõe 3 funções: anaquim_ler, anaquim_gravar, anaquim_apagar (ver fontes/sync_supabase.sql). */
let SY_URL='';   /* endereço do projeto, ex.: https://xxxx.supabase.co  (vazio = sincronização desligada e escondida) */
let SY_ANON=''; /* chave publicável do projeto: só abre as 3 funções acima */
const SY_LS='anaquim-sync';
const SY_MERGE=['massas-aulas','massas-rep','massas-repq'];
const SY_LWW=['massas-stud','massas-perg','massas-an','massas-fav','massas-ic'];
function syChave(k){return SY_MERGE.indexOf(k)>=0||SY_LWW.indexOf(k)>=0||String(k).indexOf('massas-nota-')===0;}
function syLiga(){return !!(SY_URL&&SY_ANON&&window.crypto&&crypto.subtle);}
let SYE=(function(){try{return JSON.parse(localStorage.getItem(SY_LS)||'{}')||{};}catch(e){return {};}})();
function syEstSalva(){try{localStorage.setItem(SY_LS,JSON.stringify(SYE));}catch(e){}}
function syAgora(){return Date.now()+(SYE.skew||0);}
let syAplicando=false,syRodando=false,syDeNovo=false,syTT=0,syMsg='';

/* ---- código ---- */
const SY_ALF='0123456789ABCDEFGHJKMNPQRSTVWXYZ';
function syNovoCodigo(){const b=new Uint8Array(16);crypto.getRandomValues(b);let s='';for(let i=0;i<16;i++)s+=SY_ALF[b[i]&31];return s.replace(/(.{4})/g,'$1-').slice(0,-1);}
function syNorm(c){return String(c||'').toUpperCase().replace(/[\s-]/g,'').replace(/O/g,'0').replace(/[IL]/g,'1');}
function syValido(c){return /^[0-9A-HJKMNP-TV-Z]{16}$/.test(syNorm(c));}
function syFmt(c){return syNorm(c).replace(/(.{4})/g,'$1-').slice(0,-1);}

/* ---- cifra (WebCrypto) ---- */
const SYT=new TextEncoder(),SYD=new TextDecoder();
function syB64(u8){let s='';for(let i=0;i<u8.length;i+=8192)s+=String.fromCharCode.apply(null,u8.subarray(i,i+8192));return btoa(s);}
function syDeB64(t){const s=atob(t),u=new Uint8Array(s.length);for(let i=0;i<s.length;i++)u[i]=s.charCodeAt(i);return u;}
async function syId(c){const h=await crypto.subtle.digest('SHA-256',SYT.encode('anaquim-id:'+syNorm(c)));return [...new Uint8Array(h)].map(x=>x.toString(16).padStart(2,'0')).join('');}
let syKC={c:'',k:null};
async function syAes(c){
  const n=syNorm(c);if(syKC.c===n&&syKC.k)return syKC.k;
  const base=await crypto.subtle.importKey('raw',SYT.encode(n),'PBKDF2',false,['deriveKey']);
  const k=await crypto.subtle.deriveKey({name:'PBKDF2',salt:SYT.encode('anaquim-chave-v1'),iterations:100000,hash:'SHA-256'},base,{name:'AES-GCM',length:256},false,['encrypt','decrypt']);
  syKC={c:n,k:k};return k;
}
async function syCifra(c,obj){
  const k=await syAes(c),iv=crypto.getRandomValues(new Uint8Array(12)),ct=new Uint8Array(await crypto.subtle.encrypt({name:'AES-GCM',iv:iv},k,SYT.encode(JSON.stringify(obj))));
  const o=new Uint8Array(12+ct.length);o.set(iv);o.set(ct,12);return syB64(o);
}
async function syDecifra(c,t){
  const k=await syAes(c),u=syDeB64(t),pl=await crypto.subtle.decrypt({name:'AES-GCM',iv:u.subarray(0,12)},k,u.subarray(12));
  return JSON.parse(SYD.decode(pl));
}

/* ---- rede ---- */
async function syRpc(nome,corpo){
  const r=await fetch(SY_URL.replace(/\/+$/,'')+'/rest/v1/rpc/'+nome,{method:'POST',headers:{'apikey':SY_ANON,'Authorization':'Bearer '+SY_ANON,'Content-Type':'application/json'},body:JSON.stringify(corpo)});
  if(!r.ok)throw new Error('http '+r.status);
  return r.status===204?null:r.json();
}
async function syLer(c){
  const id=await syId(c),r=await syRpc('anaquim_ler',{p_id:id});
  if(!r||!r.existe)return {existe:false,rev:0,dados:null};
  let dados=null;
  try{dados=await syDecifra(c,r.data.c);}catch(e){const er=new Error('cifra');er.cifra=true;throw er;}
  return {existe:true,rev:r.rev,dados:dados};
}
async function syGrava(c,dados,rev){
  const id=await syId(c),blob=await syCifra(c,dados);
  return syRpc('anaquim_gravar',{p_id:id,p_data:{c:blob},p_rev:rev});
}
async function syApaga(c){return syRpc('anaquim_apagar',{p_id:await syId(c)});}

/* ---- o que vai e o que volta ---- */
function syColeta(){
  const d={};
  try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);
    if(syChave(k)){let v;try{v=JSON.parse(localStorage.getItem(k));}catch(e){continue;}d[k]={u:(SYE.meta||{})[k]||0,v:v};}}}catch(e){}
  return {v:1,d:d};
}
function syIgual(a,b){
  const ka=Object.keys(a.d).sort(),kb=Object.keys(b.d).sort();
  if(ka.join('|')!==kb.join('|'))return false;
  return ka.every(k=>a.d[k].u===b.d[k].u&&JSON.stringify(a.d[k].v)===JSON.stringify(b.d[k].v));
}
/* chamado por LS.set a cada alteração */
function SYtoca(k){
  if(!syChave(k))return;
  SYE.meta=SYE.meta||{};SYE.meta[k]=syAgora();syEstSalva();
  if(SYE.cod&&!syAplicando)syAgenda(4000);
}
function syAplica(rem,primeira){
  let mudou=false;SYE.meta=SYE.meta||{};
  syAplicando=true;
  try{
    Object.keys(rem.d||{}).forEach(k=>{
      if(!syChave(k))return;const r=rem.d[k];if(!r||typeof r.u!=='number')return;
      if(r.u>syAgora()+60000)SYE.skew=Math.max(SYE.skew||0,r.u-Date.now()); /* relógio deste aparelho está atrasado: acompanha o maior visto */
      const lu=SYE.meta[k]||0,antes=localStorage.getItem(k);
      if(primeira||SY_MERGE.indexOf(k)>=0){
        pgJuntaChave(k,r.v);
        const dep=localStorage.getItem(k);if(dep!==antes)mudou=true;
        SYE.meta[k]=Math.max(lu,r.u,dep!==antes?syAgora():0);
      }else if(r.u>lu){
        try{localStorage.setItem(k,JSON.stringify(r.v));}catch(e){}
        SYE.meta[k]=r.u;if(localStorage.getItem(k)!==antes)mudou=true;
      }
    });
  }finally{syAplicando=false;}
  syEstSalva();
  return mudou;
}
function syRefresca(){
  try{buildChips();}catch(e){}try{trLabel();}catch(e){}try{drawPerg();}catch(e){}
  try{if(typeof apStarsAtualiza==='function')apStarsAtualiza();if(CUR==='p-ap')apDraw();}catch(e){}
  try{if(CUR==='p-rv')rvDraw();}catch(e){}try{if(CUR==='p-an'&&typeof anDesenha==='function')anDesenha();}catch(e){}
  try{if(CUR==='p-sy')syDraw();}catch(e){}
}

/* ---- um ciclo de sincronização ---- */
async function syRodar(){
  if(!syLiga()||!SYE.cod)return;
  if(syRodando){syDeNovo=true;return;}
  syRodando=true;syMsg='Sincronizando…';syDraw();
  let alterou=false;
  try{
    for(let t=0;t<4;t++){
      const r=await syLer(SYE.cod);
      if(r.dados&&syAplica(r.dados,!!SYE.primeira))alterou=true;
      SYE.primeira=false;
      const loc=syColeta();
      if(r.existe&&r.dados&&syIgual(loc,r.dados)){SYE.rev=r.rev;break;}
      const g=await syGrava(SYE.cod,loc,r.rev);
      if(g&&g.ok){SYE.rev=g.rev;break;}
      if(t===3)throw new Error('conflito');
    }
    SYE.ult=Date.now();SYE.erro='';syEstSalva();
  }catch(e){
    SYE.erro=e&&e.cifra?'cifra':(navigator.onLine===false||/Failed to fetch|NetworkError|Load failed/i.test(String(e&&e.message))?'offline':'falha');syEstSalva();
  }
  syRodando=false;syMsg='';
  if(alterou)syRefresca();else syDraw();
  if(syDeNovo){syDeNovo=false;syAgenda(1500);}
}
function syAgenda(ms){clearTimeout(syTT);syTT=setTimeout(syRodar,ms==null?4000:ms);}

/* ---- ligar, desligar, apagar ---- */
async function syCria(){
  const c=syNovoCodigo();
  SYE={cod:c,rev:0,meta:SYE.meta||{},primeira:false,skew:SYE.skew||0};
  /* tudo o que já existe neste aparelho entra como alteração de agora */
  try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(syChave(k))SYE.meta[k]=syAgora();}}catch(e){}
  syEstSalva();syDraw();await syRodar();return c;
}
async function syConecta(c){
  if(!syValido(c))return {ok:false,m:'O código tem 16 letras e números, em 4 grupos de 4. Confira o que digitou.'};
  const n=syFmt(c);
  try{
    const r=await syLer(n);
    if(!r.existe)return {ok:false,m:'Não achei esse código. Confira os caracteres. Se acabou de criá-lo em outro aparelho, deixe aquele aparelho com internet por um instante e tente de novo.'};
  }catch(e){return {ok:false,m:e&&e.cifra?'Esse código existe, mas não abriu os dados. Confira se digitou igual.':'Não consegui falar com o servidor. Veja a internet e tente de novo.'};}
  SYE={cod:n,rev:0,meta:SYE.meta||{},primeira:true,skew:SYE.skew||0};syEstSalva();
  await syRodar();syRefresca();return {ok:!SYE.erro,m:SYE.erro?'Conectou, mas a primeira sincronização falhou. Toque em Sincronizar agora.':''};
}
function syDesliga(){SYE={meta:SYE.meta||{},skew:SYE.skew||0};syEstSalva();syMsg='';syDraw();}
async function syApagaNuvem(){
  const c=SYE.cod;if(!c)return false;
  try{await syApaga(c);}catch(e){return false;}
  syDesliga();return true;
}

/* ---- tela ---- */
function syQuando(t){if(!t)return '';const d=new Date(t),h=new Date(),p=n=>String(n).padStart(2,'0'),hh=p(d.getHours())+':'+p(d.getMinutes());
  return d.toDateString()===h.toDateString()?'hoje às '+hh:p(d.getDate())+'/'+p(d.getMonth()+1)+' às '+hh;}
function syStatusTxt(){
  if(syMsg)return syMsg;
  if(SYE.erro==='offline')return 'Sem internet agora. Tudo está salvo neste aparelho e sincroniza quando a conexão voltar.';
  if(SYE.erro==='cifra')return 'O código deste aparelho não abre os dados na nuvem. Desligue e conecte de novo com o código certo.';
  if(SYE.erro)return 'Não consegui sincronizar agora. Tudo continua salvo neste aparelho. O app tenta de novo sozinho.';
  return SYE.ult?'Sincronizado '+syQuando(SYE.ult)+'.':'';
}
let syMostra=false;
function syDraw(){
  const box=document.getElementById('syBox');if(!box)return;
  if(!syLiga()){box.innerHTML='<p class="hint">A sincronização ainda não está ligada neste app. Enquanto isso, use <b>Salvar e levar o progresso</b> para passar seus dados de um aparelho para outro.</p>';return;}
  if(box.querySelector('input:focus'))return;
  if(!SYE.cod){
    box.innerHTML='<div class="el"><h3>Primeiro aparelho</h3><p>O app cria um código. Você anota o código e digita o mesmo nos outros aparelhos.</p><button type="button" class="btn" data-sy="cria">Criar meu código</button></div>'
     +'<div class="el"><h3>Já tenho um código</h3><label class="aplb">Código<input type="text" id="syCod" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="XXXX-XXXX-XXXX-XXXX"></label><button type="button" class="btn" data-sy="conecta">Conectar este aparelho</button><div id="syErro" role="status" class="fb bad" hidden></div></div>';
    return;
  }
  const c=SYE.cod;
  box.innerHTML='<div class="el"><h3>Este aparelho está sincronizado</h3><p id="syStatus" role="status">'+esc(syStatusTxt())+'</p>'
   +'<p class="sycod" aria-label="Seu código">'+(syMostra?esc(c):'••••-••••-••••-••••')+'</p>'
   +'<div class="aprow"><button type="button" class="btn ghost" data-sy="mostra">'+(syMostra?'Esconder código':'Mostrar código')+'</button><button type="button" class="btn ghost" data-sy="copia">Copiar código</button></div>'
   +'<p class="hint">Anote o código em algum lugar seu. Quem tem o código vê o que você guardou, e sem ele não dá para recuperar os dados se você perder o aparelho.</p>'
   +'<div class="aprow"><button type="button" class="btn" data-sy="agora">Sincronizar agora</button></div></div>'
   +'<div class="el"><h3>Desligar</h3><p>Desligar tira a sincronização só deste aparelho. Os dados continuam aqui e a cópia na nuvem continua guardada.</p><button type="button" class="btn ghost" data-sy="desliga">Desligar neste aparelho</button>'
   +'<p style="margin-top:12px">Para apagar a cópia da nuvem de vez (os dados deste aparelho ficam):</p><button type="button" class="btn ghost" data-sy="apaga">Apagar a cópia na nuvem</button></div>';
}
function syInit(){
  const m=document.getElementById('mSy');if(m)m.hidden=!syLiga();
  const ph=document.getElementById('pgSyHint');if(ph)ph.hidden=!syLiga();
  const box=document.getElementById('syBox');if(!box)return;
  box.addEventListener('click',async ev=>{
    const b=ev.target.closest('[data-sy]');if(!b)return;const k=b.dataset.sy;
    if(k==='cria'){b.disabled=true;syMostra=true;await syCria();syDraw();return;}
    if(k==='conecta'){const inp=document.getElementById('syCod'),er=document.getElementById('syErro');b.disabled=true;
      const r=await syConecta(inp.value);b.disabled=false;
      if(!r.ok){er.hidden=false;er.textContent=r.m;if(!SYE.cod)return;}
      syDraw();return;}
    if(k==='mostra'){syMostra=!syMostra;syDraw();return;}
    if(k==='copia'){const c=SYE.cod,st=document.getElementById('syStatus'),ok=()=>{st.textContent='Código copiado.';};
      const fail=()=>{const ta=document.createElement('textarea');ta.value=c;ta.style.cssText='position:fixed;opacity:0';document.body.appendChild(ta);ta.select();let r=false;try{r=document.execCommand('copy');}catch(e){}ta.remove();st.textContent=r?'Código copiado.':'Não consegui copiar sozinho. Toque em Mostrar código e anote.';};
      try{if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(c).then(ok,fail);else fail();}catch(e){fail();}return;}
    if(k==='agora'){await syRodar();return;}
    if(k==='desliga'){syDesliga();return;}
    if(k==='apaga'){
      if(b.dataset.c!=='1'){b.dataset.c='1';b.textContent='Toque de novo para apagar da nuvem';setTimeout(()=>{if(b.isConnected){b.dataset.c='';b.textContent='Apagar a cópia na nuvem';}},5000);return;}
      b.disabled=true;const ok=await syApagaNuvem();if(!ok){b.disabled=false;const st=document.getElementById('syStatus');if(st)st.textContent='Não consegui apagar agora. Veja a internet e tente de novo.';}return;}
  });
  /* quando sincronizar: ao abrir, ao voltar para o app, quando a internet volta */
  document.addEventListener('visibilitychange',()=>{if(!document.hidden&&SYE.cod)syAgenda(300);});
  window.addEventListener('online',()=>{if(SYE.cod)syAgenda(500);});
  if(SYE.cod&&syLiga())syAgenda(1200);
}
