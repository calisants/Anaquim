/* ================= ANALORG v6: Aula prática =================
   Estrela de favorito em cada ensaio, página para montar a aula, anotar o resultado de cada ensaio e gerar o relatório.
   Tudo fica em UMA chave ('massas-aulas'), no formato:
     {v:1, ativa:<id da aula>, l:[ {id, t:título, d:'AAAA-MM-DD', am:amostra, ens:[{id,f:feito,r:'p|n|i',o:observação}], no:anotações, co:conclusão, cr, up} ]}
   Uma aula apagada vira {id, del, up} (lápide), para a exclusão chegar aos outros aparelhos. */
const AP_KEY='massas-aulas';
const AP_RES=[['p','Positivo'],['n','Negativo'],['i','Inconclusivo']];
const AP_STAR='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L3.4 9.8l6-.8z"/></svg>';
function apHoje(){const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function apData(s){const m=/^(\d{4})-(\d\d)-(\d\d)$/.exec(s||'');return m?m[3]+'/'+m[2]+'/'+m[1]:'';}
function apId(){return 'a'+Date.now().toString(36)+Math.random().toString(36).slice(2,6);}
function apGet(){const d=LS.get(AP_KEY,null);return d&&Array.isArray(d.l)?d:{v:1,ativa:null,l:[]};}
function apSave(d){LS.set(AP_KEY,d);}
function apVivas(d){return d.l.filter(a=>!a.del);}
function apAtiva(d){const v=apVivas(d);return v.find(a=>a.id===d.ativa)||v[0]||null;}
function apNova(d,t){const n=Date.now(),a={id:apId(),t:t||'Aula prática',d:apHoje(),am:'',ens:[],no:'',co:'',cr:n,up:n};d.l.push(a);d.ativa=a.id;return a;}
function apSlug(s){return String(s).normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');}
function apTemDado(x){return !!(x.f||x.r||(x.o&&x.o.trim()));}

/* ---- catálogo dos ensaios: junta os que estão escritos nas telas e os de FUN (análise funcional) ---- */
let APCAT=null;
function apCat(){
  if(APCAT)return APCAT;
  const c=[];
  const st=(id,g,sg,n,tela,sel,rx,pan)=>c.push({id:id,g:g,sg:sg,n:n,tela:tela,sel:sel,rx:rx,pan:pan||null});
  const P='#p-pf .el > h3',S='#p-so .el > h3';
  st('pf-cor','Preliminares','','Cor','p-pf',P,/^Cor$/);
  st('pf-asp','Preliminares','','Aspecto e cheiro','p-pf',P,/^Aspecto e cheiro/);
  st('pf-ign','Preliminares','','Teste de ignição','p-pf',P,/^Teste de ignição/);
  st('pf-chama','Preliminares','','Cor da chama','p-pf',P,/^Cor da chama/);
  st('pf-pf','Preliminares','','Ponto de fusão','p-pf',P,/^Ponto de fusão/);
  st('pf-peb','Preliminares','','Ponto de ebulição','p-pf',P,/^Ponto de ebulição/);
  [['agua','Água',/^Água$/],['eter','Éter',/^Éter$/],['tor','Tornassol',/^Tornassol$/],['naoh','NaOH 5%',/^NaOH 5%/],['nahco3','NaHCO₃ 5%',/^NaHCO/],['hcl','HCl 5%',/^HCl 5%/],['h2so4','H₂SO₄ 96%',/^H₂SO₄ 96%/]]
    .forEach(x=>st('so-'+x[0],'Solubilidade','',x[1],'p-so',S,x[2],['so','teo']));
  (typeof ELEM!=='undefined'?ELEM:[]).forEach(e=>st('el-'+e.f.toLowerCase(),'Elementar','Elementos',e.e,'p-el','#p-el #elCards .el > h3',new RegExp(e.e+'$'),['el','ele']));
  st('el-hal','Elementar','Métodos','Halogênios','p-el','#el-hal .el > h3',/^Como se faz/,['el','hal']);
  st('el-pir','Elementar','Métodos','Pirólise reativa','p-el','#el-met .el > h3',/^Pirólise reativa/,['el','met']);
  st('el-las','Elementar','Métodos','Mineralização (Lassaigne)','p-el','#el-met .el > h3',/^Mineralização/,['el','met']);
  [['fu-nit-1','Nitrocomposto','Nitro: hidróxido ferroso','#fu-nit .el > h3',/^1\. Hidróxido ferroso/,'nit'],
   ['fu-nit-2','Nitrocomposto','Nitro: zinco e nitroprussiato','#fu-nit .el > h3',/^2\. Zinco/,'nit'],
   ['fu-aci-1','Ácido carboxílico','Ácido: iodeto e iodato','#fu-aci .el > h3',/^1\. Iodeto/,'aci'],
   ['fu-aci-2','Ácido carboxílico','Ácido: hidroxamato férrico','#fu-aci .el > h3',/^2\. Hidroxamato/,'aci'],
   ['fu-aci-3','Ácido carboxílico','Ácido: resorcinol (1,2-dicarboxílicos)','#fu-aci .el > h3',/^3\. Resorcinol/,'aci'],
   ['fu-aci-4','Ácido carboxílico','Ácido: tiobarbitúrico (oxálico)','#fu-aci .el > h3',/^4\. Ácido tiobarbitúrico/,'aci'],
   ['fu-clo-a','Cloro e halogênios','Cloro: combustão úmida e papel de Villier','#fu-clo .el > h3',/^A\. Tem cloro/,'clo'],
   ['fu-clo-b','Cloro e halogênios','Cloro: AgNO₃ e NaI (tipo de C–Cl)','#fu-clo .el > h3',/^B\. De que tipo/,'clo'],
   ['fu-clo-c','Cloro e halogênios','Cloro: Lassaigne e AgNO₃','#fu-clo .el > h3',/^C\. Alternativa/,'clo']]
    .forEach(x=>st(x[0],'Funcional',x[1],x[2],'p-fu',x[3],x[4],['fu',x[5]]));
  (typeof FUN!=='undefined'?FUN:[]).forEach((a,i)=>{const g=FUG.find(q=>q[0]===a.g);
    c.push({id:'fn-'+apSlug(a.n.replace(/ \(.*$/,'')),g:'Funcional',sg:g?g[1]:'',n:a.n,tela:'p-fu',fun:i});});
  APCAT=c;return c;
}
function apPorId(id){return apCat().find(e=>e.id===id)||null;}
function apH3(e){if(!e.sel)return null;return [...document.querySelectorAll(e.sel)].find(h=>e.rx.test(h.textContent.trim()))||null;}
function apAbrir(id){
  const e=apPorId(id);if(!e)return;
  if(e.fun!=null){fuGo(FUN[e.fun].g,e.fun);return;}
  go(e.tela);
  if(e.pan){const b=document.querySelector('#'+e.tela+' .sgm [data-'+e.pan[0]+'="'+e.pan[1]+'"]');if(b)b.click();}
  const h=apH3(e);if(!h)return;
  for(let p=h.parentElement;p;p=p.parentElement)if(p.tagName==='DETAILS')p.open=true;
  const bl=h.closest('.el')||h;bl.scrollIntoView({block:'start'});bl.classList.add('fuhl');setTimeout(()=>bl.classList.remove('fuhl'),1800);
}
/* passo a passo e resultado esperado de um ensaio, para o relatório */
function apProc(e){
  if(e.fun!=null){const a=FUN[e.fun];return {pas:a.st.slice(),pos:a.pos||''};}
  const h=apH3(e);if(!h)return {pas:[],pos:''};
  const bl=h.closest('.el'),pas=[...bl.querySelectorAll('.steps2 > li')].map(x=>x.textContent.trim());
  const pos=bl.querySelector('.pos'),ps=[...bl.querySelectorAll(':scope > p')].filter(p=>!p.matches('.src,.pos,.fucu,.fusrc,.hint'));
  if(e.id.indexOf('el-')===0&&typeof ELEM!=='undefined'){const el=ELEM.find(q=>'el-'+q.f.toLowerCase()===e.id);if(el)return {pas:[el.p.replace(/<[^>]+>/g,'')],pos:el.r.replace(/<[^>]+>/g,'')};}
  return {pas:pas.length?pas:(ps[0]?[ps[0].textContent.trim()]:[]),pos:pos?pos.textContent.trim().replace(/^Positivo:\s*/,''):''};
}

/* ---- estrelas nos ensaios ---- */
function apStarHtml(e){return '<button type="button" class="apstar" data-ens="'+esc(e.id)+'" aria-pressed="false" aria-label="Pôr «'+esc(e.n)+'» na minha aula">'+AP_STAR+'</button>';}
function apStarsMontar(){
  apCat().forEach(e=>{
    if(e.fun!=null){
      const box=document.getElementById('fu-'+FUN[e.fun].g);if(!box)return;
      const idx=FUN.filter(a=>a.g===FUN[e.fun].g).indexOf(FUN[e.fun]),card=box.querySelectorAll('details.fuc')[idx];
      const sm=card&&card.querySelector(':scope > summary');if(sm&&!sm.querySelector('.apstar'))sm.querySelector('.fudots').insertAdjacentHTML('afterend',apStarHtml(e));
      return;
    }
    const h=apH3(e);if(h&&!h.querySelector('.apstar'))h.insertAdjacentHTML('afterbegin',apStarHtml(e));
  });
  apStarsAtualiza();
}
function apStarsAtualiza(){
  const a=apAtiva(apGet()),ids=a?a.ens.map(x=>x.id):[];
  document.querySelectorAll('.apstar').forEach(b=>{const on=ids.indexOf(b.dataset.ens)>=0,e=apPorId(b.dataset.ens);
    b.setAttribute('aria-pressed',on?'true':'false');
    b.setAttribute('aria-label',(on?'Tirar «':'Pôr «')+(e?e.n:'')+(on?'» da minha aula':'» na minha aula'));});
}
let apTT=0;
function apToast(t){
  let b=document.getElementById('apToast');
  if(!b){b=document.createElement('div');b.id='apToast';b.className='aptoast';b.setAttribute('role','status');document.body.appendChild(b);}
  b.textContent=t;b.hidden=false;clearTimeout(apTT);apTT=setTimeout(()=>{b.hidden=true;},2600);
}
function apAlterna(id){
  const d=apGet();let a=apAtiva(d);if(!a)a=apNova(d);
  const i=a.ens.findIndex(x=>x.id===id),e=apPorId(id);
  if(i>=0){
    if(apTemDado(a.ens[i])){apToast('Esse ensaio já tem anotação. Para tirar, use a página Aula prática.');return false;}
    a.ens.splice(i,1);a.up=Date.now();apSave(d);apToast('Tirado da aula: '+(e?e.n:''));
  }else{
    a.ens.push({id:id,f:0,r:'',o:''});a.up=Date.now();apSave(d);apToast('Na aula «'+a.t+'»: '+(e?e.n:''));
  }
  apStarsAtualiza();return true;
}

/* ---- relatório ---- */
function apResRot(x){const r=AP_RES.find(q=>q[0]===x.r);return r?r[1]:(x.f?'Feito, sem resultado marcado':'Não realizado');}
function apRelDados(a,comProc){
  return {t:a.t,d:apData(a.d),am:a.am,tu:(a.tu||'').trim(),nm:(a.nm||'').trim(),no:a.no,co:a.co,it:a.ens.map(x=>{const e=apPorId(x.id);
    return {n:e?e.n:'(ensaio que saiu do app)',g:e?(e.sg||e.g):'',s:(x.s||'').trim(),rc:x.r||'',fz:x.f?1:0,res:apResRot(x),o:(x.o||'').trim(),pr:comProc&&e?apProc(e):null};})};
}
function apRelHtml(a,comProc){
  const r=apRelDados(a,comProc);
  let h='<h3>'+esc(r.t)+'</h3><p>'+[r.nm?'Nome: '+esc(r.nm):'',r.tu?'Turma: '+esc(r.tu):'',r.d?'Data: '+esc(r.d):'',r.am?'Amostra: '+esc(r.am):''].filter(Boolean).join('. ')+'</p>';
  if(r.it.length){
    h+='<h4>Ensaios e resultados</h4><table><thead><tr><th>Ensaio</th><th>Amostra</th><th>Resultado</th><th>O que observei</th></tr></thead><tbody>'
      +r.it.map(x=>'<tr><td>'+esc(x.n)+'</td><td>'+esc(x.s||'-')+'</td><td>'+esc(x.res)+'</td><td>'+esc(x.o)+'</td></tr>').join('')+'</tbody></table>';
    if(comProc){const com=r.it.filter(x=>x.pr&&(x.pr.pas.length||x.pr.pos));
      if(com.length)h+='<h4>Procedimentos</h4>'+com.map(x=>'<p><b>'+esc(x.n)+'</b></p>'+(x.pr.pas.length?'<ol>'+x.pr.pas.map(s=>'<li>'+esc(s)+'</li>').join('')+'</ol>':'')+(x.pr.pos?'<p>Resultado esperado: '+esc(x.pr.pos)+'</p>':'')).join('');}
  }
  if(r.no.trim())h+='<h4>Anotações da aula</h4><p class="apnl">'+esc(r.no.trim())+'</p>';
  if(r.co.trim())h+='<h4>Conclusão</h4><p class="apnl">'+esc(r.co.trim())+'</p>';
  return h;
}
function apRelTexto(a,comProc){
  const r=apRelDados(a,comProc),L=[r.t];
  if(r.nm||r.tu||r.d||r.am)L.push([r.nm?'Nome: '+r.nm:'',r.tu?'Turma: '+r.tu:'',r.d?'Data: '+r.d:'',r.am?'Amostra: '+r.am:''].filter(Boolean).join('. '));
  if(r.it.length){L.push('','ENSAIOS E RESULTADOS');
    r.it.forEach((x,i)=>{L.push((i+1)+'. '+x.n+(x.s?' (amostra '+x.s+')':'')+': '+x.res+(x.o?'. '+x.o:''));});
    if(comProc){const com=r.it.filter(x=>x.pr&&(x.pr.pas.length||x.pr.pos));
      if(com.length){L.push('','PROCEDIMENTOS');com.forEach(x=>{L.push(x.n);x.pr.pas.forEach((s,i)=>L.push('  '+(i+1)+') '+s));if(x.pr.pos)L.push('  Resultado esperado: '+x.pr.pos);});}}}
  if(r.no.trim())L.push('','ANOTAÇÕES DA AULA',r.no.trim());
  if(r.co.trim())L.push('','CONCLUSÃO',r.co.trim());
  return L.join('\n');
}


/* ---- PDF próprio: window.print() não faz nada no app instalado do iPhone, então o PDF é montado aqui e entregue pelo menu de compartilhar ---- */
function apPdfBytes(r,comProc){
  const W=595,H=842,M=46,AREA=W-2*M,MB=58;
  const VERDE=[0.086,0.2,0.125],ACE=[0.45,0.78,0.32],CINZA=[0.38,0.42,0.38],TXT=[0.1,0.12,0.1],LIN=[0.82,0.86,0.82],ZEB=[0.955,0.97,0.955],FUNDO=[0.93,0.96,0.92];
  const cp={'–':'\x96','—':'\x97','‘':'\x91','’':'\x92','“':'\x93','”':'\x94','•':'\x95','…':'\x85','₀':'0','₁':'1','₂':'2','₃':'3','₄':'4','₅':'5','₆':'6','₇':'7','₈':'8','₉':'9','⁺':'+','⁻':'-','→':'->','≥':'>=','≤':'<=','°':'\xb0','×':'\xd7','·':'\xb7','µ':'\xb5','μ':'\xb5','Δ':'delta ','−':'-'};
  function l1(t){let o='';for(const ch of String(t)){const c=ch.charCodeAt(0);if(cp[ch]!==undefined)o+=cp[ch];else if(c<256)o+=ch;else o+='?';}return o;}
  const esc=t=>l1(t).replace(/\\/g,'\\\\').replace(/\(/g,'\\(').replace(/\)/g,'\\)');
  const cv=document.createElement('canvas').getContext('2d'),FN={F1:'',F2:'bold ',F3:'italic '};
  const larg=(t,f,sz)=>{cv.font=FN[f]+sz+'px Helvetica, Arial, sans-serif';return cv.measureText(t).width;};
  const cor=c=>c.map(v=>v.toFixed(3)).join(' ');
  const pages=[];let pg,y;
  const ret=(x,yy,w,h,c)=>pg.push(cor(c)+' rg '+x.toFixed(2)+' '+yy.toFixed(2)+' '+w.toFixed(2)+' '+h.toFixed(2)+' re f');
  const lin=(x1,y1,x2,y2,c,lw)=>pg.push(lw+' w '+cor(c)+' RG '+x1.toFixed(2)+' '+y1.toFixed(2)+' m '+x2.toFixed(2)+' '+y2.toFixed(2)+' l S');
  const txt=(t,x,yy,f,sz,c)=>pg.push('BT '+cor(c)+' rg /'+f+' '+sz+' Tf 1 0 0 1 '+x.toFixed(2)+' '+yy.toFixed(2)+' Tm ('+esc(t)+') Tj ET');
  function quebra(t,w,f,sz){const out=[];String(t).split('\n').forEach(par=>{const pal=par.trim().split(/\s+/).filter(Boolean);if(!pal.length){out.push('');return;}let cur='';
    pal.forEach(p0=>{let p=p0;while(larg(p,f,sz)>w&&p.length>1){let k=p.length;while(k>1&&larg(p.slice(0,k),f,sz)>w)k--;if(cur){out.push(cur);cur='';}out.push(p.slice(0,k));p=p.slice(k);}
      const t2=cur?cur+' '+p:p;if(cur&&larg(t2,f,sz)>w){out.push(cur);cur=p;}else cur=t2;});if(cur)out.push(cur);});return out;}
  function nova(){pg=[];pages.push(pg);y=H-M;}
  function garante(h,depois){if(y-h<MB){nova();if(depois)depois();}}
  /* cabeçalho */
  nova();
  const tl=quebra(r.t||'Aula prática',AREA,'F2',20).slice(0,2),hb=62+22*tl.length;
  ret(0,H-hb,W,hb,VERDE);ret(0,H-hb-4,W,4,ACE);
  tl.forEach((l,i)=>txt(l,M,H-38-22*i,'F2',20,[1,1,1]));
  txt('RELATÓRIO DE AULA PRÁTICA · ANÁLISE ORGÂNICA',M,H-hb+14,'F1',8.5,[0.7,0.88,0.62]);
  y=H-hb-26;
  /* quadro de informações */
  const info=[['DATA',r.d||'-'],['AMOSTRA DA AULA',r.am||'-']];if(r.tu)info.push(['TURMA OU DISCIPLINA',r.tu]);if(r.nm)info.push(['NOME',r.nm]);
  const cw=AREA/info.length,cel=info.map(c=>quebra(c[1],cw-18,'F1',10.5).slice(0,3)),hi=Math.max(...cel.map(l=>l.length))*13+34;
  ret(M,y-hi,AREA,hi,FUNDO);ret(M,y-hi,3,hi,ACE);
  info.forEach((c,i)=>{const x=M+i*cw+12;txt(c[0],x,y-15,'F2',7.5,CINZA);cel[i].forEach((l,k)=>txt(l,x,y-30-13*k,'F1',10.5,TXT));if(i>0)lin(M+i*cw,y-8,M+i*cw,y-hi+8,LIN,0.7);});
  y-=hi+16;
  /* resumo */
  if(r.it.length){
    const c={p:0,n:0,i:0,f:0,nr:0};r.it.forEach(x=>{if(x.rc==='p')c.p++;else if(x.rc==='n')c.n++;else if(x.rc==='i')c.i++;else if(x.fz)c.f++;else c.nr++;});
    const pt=[r.it.length+(r.it.length===1?' ensaio':' ensaios')];if(c.p)pt.push(c.p+(c.p===1?' positivo':' positivos'));if(c.n)pt.push(c.n+(c.n===1?' negativo':' negativos'));if(c.i)pt.push(c.i+(c.i===1?' inconclusivo':' inconclusivos'));if(c.f)pt.push(c.f+' sem resultado marcado');if(c.nr)pt.push(c.nr+(c.nr===1?' não realizado':' não realizados'));
    txt(pt.join('  ·  '),M,y-4,'F1',9.5,CINZA);y-=24;
    secao('Ensaios e resultados');
    /* tabela */
    const col=[{t:'N°',w:24},{t:'Ensaio',w:152},{t:'Amostra',w:72},{t:'Resultado',w:78},{t:'O que observei',w:AREA-326}];
    const xs=[];let ax=M;col.forEach(q=>{xs.push(ax);ax+=q.w;});
    const cab=()=>{ret(M,y-20,AREA,20,VERDE);col.forEach((q,i)=>txt(q.t.toUpperCase(),xs[i]+6,y-13.5,'F2',7.5,[1,1,1]));y-=20;};
    garante(60);cab();
    const PIL={p:{bg:[0.84,0.94,0.82],fg:[0.1,0.38,0.12],t:'Positivo'},n:{bg:[0.9,0.92,0.94],fg:[0.28,0.33,0.4],t:'Negativo'},i:{bg:[1,0.93,0.74],fg:[0.55,0.36,0],t:'Inconclusivo'},f:{bg:[0.88,0.93,0.97],fg:[0.15,0.32,0.5],t:'Feito'},nr:{bg:[0.95,0.95,0.95],fg:[0.45,0.45,0.45],t:'Não feito'}};
    r.it.forEach((x,k)=>{
      const nl=quebra(x.n,col[1].w-12,'F2',9.5),gl=x.g?quebra(x.g,col[1].w-12,'F1',7.5).slice(0,1):[],sl=quebra(x.s||'-',col[2].w-12,'F1',9.5),ol=quebra(x.o||'-',col[4].w-12,'F1',9.5);
      const hn=nl.length*12+(gl.length?10:0),h=Math.max(hn,sl.length*12,ol.length*12,16)+14;
      garante(h,cab);
      if(k%2===0)ret(M,y-h,AREA,h,ZEB);
      lin(M,y-h,M+AREA,y-h,LIN,0.5);
      txt(String(k+1),xs[0]+6,y-15,'F1',9.5,CINZA);
      nl.forEach((l,q)=>txt(l,xs[1]+6,y-15-12*q,'F2',9.5,TXT));gl.forEach(l=>txt(l,xs[1]+6,y-15-12*nl.length+1,'F1',7.5,CINZA));
      sl.forEach((l,q)=>txt(l,xs[2]+6,y-15-12*q,'F1',9.5,x.s?TXT:CINZA));
      const pl=PIL[x.rc]||(x.fz?PIL.f:PIL.nr),pw=larg(pl.t,'F2',8)+12;
      ret(xs[3]+6,y-20,pw,15,pl.bg);txt(pl.t,xs[3]+12,y-15.5,'F2',8,pl.fg);
      ol.forEach((l,q)=>txt(l,xs[4]+6,y-15-12*q,'F1',9.5,x.o?TXT:CINZA));
      y-=h;
    });
    y-=10;
  }
  function secao(t){garante(46);ret(M,y-13,3,15,ACE);txt(t,M+10,y-10,'F2',12,VERDE);y-=28;}
  function par(t,f,sz,ind,cr){quebra(t,AREA-ind,f,sz).forEach(l=>{garante(sz+5);if(l)txt(l,M+ind,y-sz,f,sz,cr||TXT);y-=sz+4.5;});}
  if(r.no.trim()){secao('Anotações da aula');par(r.no.trim(),'F1',10.5,0);y-=8;}
  if(r.co.trim()){secao('Conclusão');par(r.co.trim(),'F1',10.5,0);y-=8;}
  if(comProc){const com=r.it.filter(x=>x.pr&&(x.pr.pas.length||x.pr.pos));
    if(com.length){secao('Procedimentos');com.forEach(x=>{garante(40);par(x.n,'F2',10.5,0,VERDE);x.pr.pas.forEach((p0,i)=>par((i+1)+') '+p0,'F1',9.5,12));if(x.pr.pos)par('Resultado esperado: '+x.pr.pos,'F3',9.5,12,CINZA);y-=8;});}}
  /* rodapé em todas as páginas */
  const n=pages.length;
  pages.forEach((p,i)=>{pg=p;lin(M,44,M+AREA,44,LIN,0.6);txt('Gerado pelo Anaquim',M,30,'F1',8,CINZA);const t='Página '+(i+1)+' de '+n;txt(t,M+AREA-larg(t,'F1',8),30,'F1',8,CINZA);});
  const obj=[];
  obj[1]='<< /Type /Catalog /Pages 2 0 R >>';
  obj[2]='<< /Type /Pages /Kids ['+pages.map((_,i)=>(6+2*i)+' 0 R').join(' ')+'] /Count '+n+' >>';
  obj[3]='<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>';
  obj[4]='<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>';
  obj[5]='<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>';
  pages.forEach((p,i)=>{const c=p.join('\n');
    obj[6+2*i]='<< /Type /Page /Parent 2 0 R /MediaBox [0 0 '+W+' '+H+'] /Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R >> >> /Contents '+(7+2*i)+' 0 R >>';
    obj[7+2*i]='<< /Length '+c.length+' >>\nstream\n'+c+'\nendstream';});
  let out='%PDF-1.4\n',off=[];
  for(let i=1;i<obj.length;i++){off[i]=out.length;out+=i+' 0 obj\n'+obj[i]+'\nendobj\n';}
  const xr=out.length;out+='xref\n0 '+obj.length+'\n0000000000 65535 f \n';
  for(let i=1;i<obj.length;i++)out+=String(off[i]).padStart(10,'0')+' 00000 n \n';
  out+='trailer\n<< /Size '+obj.length+' /Root 1 0 R >>\nstartxref\n'+xr+'\n%%EOF';
  const b=new Uint8Array(out.length);for(let i=0;i<out.length;i++)b[i]=out.charCodeAt(i)&255;return b;
}
async function apPdfEntrega(a,comProc,msg){
  const nome=('Anaquim - '+(a.t||'aula')).replace(/[^\w\- À-ÿ]/g,'').trim()+'.pdf';
  let blob;try{blob=new Blob([apPdfBytes(apRelDados(a,comProc),comProc)],{type:'application/pdf'});}catch(e){msg.textContent='Não consegui montar o PDF neste aparelho. Use Copiar texto.';return;}
  try{const f=new File([blob],nome,{type:'application/pdf'});
    if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],title:a.t||'Aula prática'});msg.textContent='';return;}}
  catch(e){if(e&&e.name==='AbortError'){msg.textContent='';return;}}
  try{const u=URL.createObjectURL(blob),l=document.createElement('a');l.href=u;l.download=nome;document.body.appendChild(l);l.click();l.remove();setTimeout(()=>URL.revokeObjectURL(u),60000);msg.textContent='PDF salvo nos downloads do aparelho.';}
  catch(e){msg.textContent='Não consegui entregar o PDF. Use Copiar texto.';}
}
function apSoPdf(){try{return !!(navigator.standalone||(window.matchMedia&&matchMedia('(display-mode: standalone)').matches)||/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));}catch(e){return true;}}

/* ---- plano de aula para compartilhar: só o nome e a lista de ensaios (nada de resultado nem anotação) ---- */
function apPlanoGera(a){return 'ANQ1.'+pgEnc({anaquim:'plano',v:1,t:a.t,e:a.ens.map(x=>x.id)});}
function apPlanoLe(txt){
  const m=/ANQ1\.([A-Za-z0-9+\/=\s]+)/.exec(txt||'');if(!m)return null;
  let o;try{o=pgDec(m[1]);}catch(e){return null;}
  return o&&o.anaquim==='plano'&&o.v===1&&Array.isArray(o.e)?o:null;
}
function apPlanoCria(o){
  const d=apGet(),a=apNova(d,String(o.t||'Aula importada').slice(0,80)),ja={};
  o.e.forEach(id=>{if(typeof id==='string'&&apPorId(id)&&!ja[id]){ja[id]=1;a.ens.push({id:id,f:0,r:'',o:''});}});
  apSave(d);return {n:a.ens.length,fora:o.e.length-a.ens.length};
}
/* ---- página ---- */
function apBadge(x){
  const r=AP_RES.find(q=>q[0]===x.r);
  if(r)return '<span class="apbd '+(x.r==='p'?'p':'n')+'">'+r[1]+'</span>';
  return x.f?'<span class="apbd f">Feito</span>':'<span class="apbd">A fazer</span>';
}
function apItemHtml(x,i,n,abertos){
  const e=apPorId(x.id),nome=e?e.n:'(ensaio que saiu do app)',sub=e?(e.sg?e.g+' · '+e.sg:e.g):'';
  return '<details class="el ap-e" data-id="'+esc(x.id)+'"'+(abertos&&abertos[x.id]?' open':'')+'><summary><span class="apn">'+esc(nome)+'<span class="apg">'+esc(sub)+'</span></span><span class="apbd-w">'+apBadge(x)+'</span></summary>'
   +'<label class="apck"><input type="checkbox" data-a="f"'+(x.f?' checked':'')+'><span>Já fiz este ensaio</span></label>'
   +'<div class="sgm" role="group" aria-label="Resultado">'+AP_RES.map(r=>'<button type="button" data-a="r" data-v="'+r[0]+'" aria-pressed="'+(x.r===r[0]?'true':'false')+'">'+r[1]+'</button>').join('')+'</div>'
   +'<label class="aplb">Amostra testada neste ensaio<input type="text" class="apin" data-a="s" value="'+esc(x.s||'')+'" maxlength="60" placeholder="Ex.: 5A, amostra B, branco"></label>'
   +'<label class="aplb">O que observei (cor, bolhas, cheiro, tempo)<textarea class="apta" data-a="o" rows="3">'+esc(x.o||'')+'</textarea></label>'
   +'<div class="apacts">'+(e?'<button type="button" class="btn ghost" data-a="abrir">Ver procedimento</button>':'')
   +(i>0?'<button type="button" class="btn ghost" data-a="sobe" aria-label="Subir na lista">↑</button>':'')+(i<n-1?'<button type="button" class="btn ghost" data-a="desce" aria-label="Descer na lista">↓</button>':'')
   +'<button type="button" class="btn ghost" data-a="tira">Tirar da aula</button></div></details>';
}
function apListaDesenha(){
  const box=document.getElementById('apLista');if(!box)return;
  const a=apAtiva(apGet());if(!a)return;
  const ab={};box.querySelectorAll('details[open]').forEach(d=>{ab[d.dataset.id]=1;});
  box.innerHTML=a.ens.length?a.ens.map((x,i)=>apItemHtml(x,i,a.ens.length,ab)).join(''):'<p class="hint">Nenhum ensaio ainda. Marque as caixas abaixo, ou toque na estrela (☆) no título de qualquer ensaio.</p>';
}
function apPickHtml(a){
  const ids=a.ens.map(x=>x.id),gr={};
  apCat().forEach(e=>{const k=e.g+(e.sg&&e.g!=='Funcional'?' · '+e.sg:'');(gr[k]=gr[k]||[]).push(e);});
  return '<details class="el" id="apPick"><summary>Escolher ensaios para a aula</summary><label class="aplb">Buscar<input type="search" id="apBusca" placeholder="Ex.: Tollens, solubilidade, ponto de fusão"></label>'
   +Object.keys(gr).map(k=>'<p class="apgrp">'+esc(k)+'</p>'+gr[k].map(e=>'<label class="apit" data-n="'+esc(apSlug(e.n+' '+e.g+' '+e.sg))+'"><input type="checkbox" data-pick="'+esc(e.id)+'"'+(ids.indexOf(e.id)>=0?' checked':'')+'><span>'+esc(e.n)+'</span></label>').join('')).join('')+'</details>';
}
function apDraw(){
  const box=document.getElementById('apBox');if(!box)return;
  apFlush();
  const d=apGet(),a=apAtiva(d),keepPick=document.getElementById('apPick')&&document.getElementById('apPick').open;
  if(!a){
    box.innerHTML='<div class="el"><h3>Monte a sua aula</h3><p>Escolha os ensaios que quer fazer e deixe tudo pronto antes de ir para a bancada. Depois, anote o resultado de cada um e gere o relatório.</p></div>'
     +'<div class="aprow"><button type="button" class="btn" data-a="nova">Criar uma aula</button></div>'
     +'<p class="hint">Atalho: toque na estrela (☆) no título de qualquer ensaio e ele entra numa aula nova.</p>';
    return;
  }
  const vivas=apVivas(d).slice().sort((p,q)=>String(q.d).localeCompare(String(p.d))||q.cr-p.cr);
  box.innerHTML='<label class="aplb">Aula<select id="apSel">'+vivas.map(v=>'<option value="'+esc(v.id)+'"'+(v.id===a.id?' selected':'')+'>'+esc((apData(v.d)?apData(v.d)+' · ':'')+v.t)+'</option>').join('')+'</select></label>'
   +'<div class="aprow"><button type="button" class="btn ghost" data-a="nova">Nova aula</button><button type="button" class="btn ghost" data-a="apaga" id="apApaga">Excluir esta aula</button></div>'
   +'<label class="aplb">Nome da aula<input type="text" id="apTit" value="'+esc(a.t)+'" maxlength="80"></label>'
   +'<label class="aplb">Data<input type="date" id="apDat" value="'+esc(a.d||'')+'"></label>'
   +'<label class="aplb">Amostra ou código do composto desconhecido<input type="text" id="apAm" value="'+esc(a.am||'')+'" maxlength="80" placeholder="Ex.: amostra 7"></label>'
   +'<label class="aplb">Turma ou disciplina (opcional)<input type="text" id="apTu" value="'+esc(a.tu||'')+'" maxlength="60" placeholder="Ex.: Análise Orgânica I, turma 2"></label>'
   +'<label class="aplb">Seu nome no relatório (opcional)<input type="text" id="apNm" value="'+esc(a.nm||'')+'" maxlength="60" autocomplete="off"></label><p class="hint">O nome só aparece no relatório que você gerar. Se preferir, deixe em branco.</p>'
   +'<h2 class="mh">Ensaios da aula</h2><div id="apLista"></div>'+apPickHtml(a)
   +'<h2 class="mh">Anotações da aula</h2><textarea class="apta" id="apNo" rows="5" aria-label="Anotações da aula" placeholder="O que o professor disse, cuidados, dúvidas, medidas.">'+esc(a.no||'')+'</textarea>'
   +'<h2 class="mh">Conclusão</h2><textarea class="apta" id="apCo" rows="4" aria-label="Conclusão" placeholder="O que os resultados indicam sobre a amostra.">'+esc(a.co||'')+'</textarea>'
   +'<h2 class="mh">Relatório</h2><label class="apck" style="display:flex;gap:10px;align-items:center;min-height:44px"><input type="checkbox" id="apProc" style="width:22px;height:22px"><span>Incluir o passo a passo de cada ensaio</span></label>'
   +'<div class="aprow"><button type="button" class="btn" data-a="rel">Montar relatório</button></div><div id="apRelBox" hidden></div>'
   +'<details class="el" id="apPlano" style="margin-top:16px"><summary style="cursor:pointer;font-weight:600;min-height:44px;display:flex;align-items:center">Compartilhar ou importar um plano de aula</summary>'
   +'<p class="hint">O plano leva só o nome da aula e a lista de ensaios, sem resultados nem anotações. Mande o código para um colega, ou cole aqui o que o professor mandar.</p>'
   +'<div class="aprow"><button type="button" class="btn ghost" data-a="plgera">Gerar o código desta aula</button><button type="button" class="btn ghost" data-a="plcopia">Copiar</button></div>'
   +'<textarea class="apta" id="apPlTxt" rows="3" aria-label="Código do plano" placeholder="Código do plano"></textarea>'
   +'<div class="aprow" style="margin-top:8px"><button type="button" class="btn" data-a="plcria">Criar uma aula com este código</button></div><div id="apPlMsg" role="status"></div></details>';
  apListaDesenha();
  if(keepPick)document.getElementById('apPick').open=true;
}
function apRelMostra(){
  const a=apAtiva(apGet()),box=document.getElementById('apRelBox');if(!a||!box)return;
  const cp=document.getElementById('apProc').checked;
  box.hidden=false;
  box.innerHTML='<div id="apRel">'+apRelHtml(a,cp)+'</div><div class="aprow noprint" style="margin-top:12px"><button type="button" class="btn" data-a="copia">Copiar texto</button><button type="button" class="btn ghost" data-a="imprime">Imprimir ou salvar em PDF</button></div><div id="apRelMsg" role="status" class="noprint"></div>';
  box.scrollIntoView({block:'start'});
}
function apAplica(fn){const d=apGet(),a=apAtiva(d);if(!a)return null;const r=fn(a,d);a.up=Date.now();apSave(d);return r;}
let apDeb=0,apPend=null;
/* texto digitado: junta os campos editados e grava depois de uma pausa (ou na hora, ao trocar de tela ou fechar o app) */
function apTexto(fn){const prev=apPend;apPend=prev?(a,d)=>{prev(a,d);fn(a,d);}:fn;clearTimeout(apDeb);apDeb=setTimeout(apFlush,350);}
function apFlush(){clearTimeout(apDeb);const f=apPend;apPend=null;if(f)apAplica(f);}
function apInit(){
  apStarsMontar();
  const box=document.getElementById('apBox');if(!box)return;
  document.addEventListener('click',ev=>{const b=ev.target.closest&&ev.target.closest('.apstar');if(!b)return;ev.preventDefault();ev.stopPropagation();apAlterna(b.dataset.ens);},true);
  box.addEventListener('input',ev=>{
    const t=ev.target,id=t.id;
    if(id==='apTit')apTexto(a=>{a.t=t.value.trim()||'Aula prática';});
    else if(id==='apDat')apTexto(a=>{a.d=t.value;});
    else if(id==='apAm')apTexto(a=>{a.am=t.value;});
    else if(id==='apTu')apTexto(a=>{a.tu=t.value;});
    else if(id==='apNm')apTexto(a=>{a.nm=t.value;});
    else if(t.dataset&&t.dataset.a==='s'){const eid=t.closest('.ap-e').dataset.id,v=t.value;apTexto(a=>{const x=a.ens.find(q=>q.id===eid);if(x)x.s=v;});}
    else if(id==='apNo')apTexto(a=>{a.no=t.value;});
    else if(id==='apCo')apTexto(a=>{a.co=t.value;});
    else if(t.dataset&&t.dataset.a==='o'){const eid=t.closest('.ap-e').dataset.id,v=t.value;apTexto(a=>{const x=a.ens.find(q=>q.id===eid);if(x)x.o=v;});}
    else if(id==='apBusca'){const q=apSlug(t.value);
      box.querySelectorAll('#apPick label.apit').forEach(l=>{l.hidden=!!q&&l.dataset.n.indexOf(q)<0;});
      box.querySelectorAll('#apPick .apgrp').forEach(g=>{let n=g.nextElementSibling,ok=false;while(n&&n.classList.contains('apit')){if(!n.hidden)ok=true;n=n.nextElementSibling;}g.hidden=!ok;});}
  });
  document.addEventListener('visibilitychange',()=>{if(document.hidden)apFlush();});window.addEventListener('pagehide',apFlush);
  box.addEventListener('change',ev=>{
    const t=ev.target;
    if(t.id==='apSel'){apFlush();const d=apGet();d.ativa=t.value;apSave(d);apDraw();apStarsAtualiza();return;}
    if(t.dataset&&t.dataset.pick){
      const ok=apAlterna(t.dataset.pick);if(!ok)t.checked=true;apListaDesenha();return;}
    if(t.dataset&&t.dataset.a==='f'){const eid=t.closest('.ap-e').dataset.id,on=t.checked;
      apAplica(a=>{const x=a.ens.find(q=>q.id===eid);if(x)x.f=on?1:0;});
      const x=apAtiva(apGet()).ens.find(q=>q.id===eid);t.closest('.ap-e').querySelector('.apbd-w').innerHTML=apBadge(x);}
  });
  box.addEventListener('click',ev=>{
    const b=ev.target.closest('[data-a]');if(!b||b.tagName==='TEXTAREA'||b.tagName==='INPUT')return;
    const k=b.dataset.a,it=b.closest('.ap-e'),eid=it?it.dataset.id:null;
    apFlush();
    if(k==='nova'){const d=apGet();apNova(d);apSave(d);apDraw();apStarsAtualiza();const t=document.getElementById('apTit');if(t){t.focus();t.select();}return;}
    if(k==='apaga'){
      if(b.dataset.c!=='1'){b.dataset.c='1';b.textContent='Toque de novo para excluir';setTimeout(()=>{if(b.isConnected){b.dataset.c='';b.textContent='Excluir esta aula';}},5000);return;}
      const d=apGet(),a=apAtiva(d);if(!a)return;const i=d.l.indexOf(a);d.l[i]={id:a.id,del:Date.now(),up:Date.now()};
      d.ativa=(apVivas(d)[0]||{}).id||null;apSave(d);apDraw();apStarsAtualiza();apToast('Aula excluída.');return;}
    if(k==='r'){const v=b.dataset.v;
      apAplica(a=>{const x=a.ens.find(q=>q.id===eid);if(!x)return;x.r=x.r===v?'':v;if(x.r)x.f=1;});
      const x=apAtiva(apGet()).ens.find(q=>q.id===eid);
      it.querySelectorAll('[data-a="r"]').forEach(s=>s.setAttribute('aria-pressed',s.dataset.v===x.r?'true':'false'));
      it.querySelector('[data-a="f"]').checked=!!x.f;it.querySelector('.apbd-w').innerHTML=apBadge(x);return;}
    if(k==='abrir'){apAbrir(eid);return;}
    if(k==='sobe'||k==='desce'){apAplica(a=>{const i=a.ens.findIndex(q=>q.id===eid),j=i+(k==='sobe'?-1:1);if(i<0||j<0||j>=a.ens.length)return;const t=a.ens[i];a.ens[i]=a.ens[j];a.ens[j]=t;});apListaDesenha();
      const n=document.querySelector('#apLista [data-id="'+eid+'"]');if(n){n.open=true;n.scrollIntoView({block:'nearest'});}return;}
    if(k==='tira'){const a0=apAtiva(apGet()),x0=a0&&a0.ens.find(q=>q.id===eid);
      if(x0&&apTemDado(x0)&&b.dataset.c!=='1'){b.dataset.c='1';b.textContent='Tem anotação. Toque de novo para tirar';return;}
      apAplica(a=>{a.ens=a.ens.filter(q=>q.id!==eid);});apListaDesenha();apStarsAtualiza();
      const c=document.querySelector('#apPick [data-pick="'+eid+'"]');if(c)c.checked=false;return;}
    if(k==='rel'){apRelMostra();return;}
    if(k==='plgera'){const a=apAtiva(apGet());if(a){document.getElementById('apPlTxt').value=apPlanoGera(a);document.getElementById('apPlMsg').textContent='';}return;}
    if(k==='plcopia'){const ta=document.getElementById('apPlTxt'),m=document.getElementById('apPlMsg');if(!ta.value)document.querySelector('[data-a=plgera]').click();ta.select();
      const ok=()=>{m.className='fb good';m.textContent='Copiado.';};
      const fail=()=>{let r=false;try{r=document.execCommand('copy');}catch(e){}m.className=r?'fb good':'fb bad';m.textContent=r?'Copiado.':'Não consegui copiar sozinho. O código está selecionado: use o Copiar do seu aparelho.';};
      try{if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(ta.value).then(ok,fail);else fail();}catch(e){fail();}return;}
    if(k==='plcria'){const m=document.getElementById('apPlMsg'),o=apPlanoLe(document.getElementById('apPlTxt').value);
      if(!o){m.className='fb bad';m.textContent='Esse código não é de um plano de aula do Anaquim. Cole o código inteiro, que começa com ANQ1.';return;}
      const r=apPlanoCria(o);apDraw();apStarsAtualiza();apToast('Aula criada com '+r.n+' ensaio'+(r.n===1?'':'s')+(r.fora?'. '+r.fora+' não existe nesta versão do app.':'.'));return;}
    if(k==='copia'){const a=apAtiva(apGet());if(!a)return;const t=apRelTexto(a,document.getElementById('apProc').checked),m=document.getElementById('apRelMsg');
      const ok=()=>{m.textContent='Copiado.';};
      const fail=()=>{const ta=document.createElement('textarea');ta.value=t;ta.style.cssText='position:fixed;opacity:0';document.body.appendChild(ta);ta.select();let r=false;try{r=document.execCommand('copy');}catch(e){}ta.remove();m.textContent=r?'Copiado.':'Não consegui copiar sozinho. Selecione o relatório acima e copie.';};
      try{if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(ok,fail);else fail();}catch(e){fail();}return;}
    if(k==='imprime'&&apSoPdf()){const a=apAtiva(apGet());if(!a)return;apPdfEntrega(a,document.getElementById('apProc').checked,document.getElementById('apRelMsg'));return;}
    if(k==='imprime'){document.body.classList.add('ap-print');const f=()=>{document.body.classList.remove('ap-print');window.removeEventListener('afterprint',f);};window.addEventListener('afterprint',f);setTimeout(()=>{try{window.print();}catch(e){}if(!('onafterprint' in window))f();},50);return;}
  });
}
/* juntar aulas de outro aparelho (importar código ou sincronizar): vence a edição mais recente de cada aula; aula apagada continua apagada */
function apJuntar(inc){
  const cur=apGet(),m={};let n=0;
  cur.l.forEach(x=>{m[x.id]=x;});
  const lim=Date.now()-90*864e5;
  ((inc&&Array.isArray(inc.l))?inc.l:[]).forEach(x=>{
    if(!x||!x.id)return;const c=m[x.id];
    if(!c||(x.up||0)>(c.up||0)){m[x.id]=x;n++;}
  });
  cur.l=Object.keys(m).map(k=>m[k]).filter(x=>!(x.del&&x.del<lim));
  if(!cur.ativa||!cur.l.some(x=>x.id===cur.ativa&&!x.del))cur.ativa=(inc&&inc.ativa&&cur.l.some(x=>x.id===inc.ativa&&!x.del))?inc.ativa:((apVivas(cur)[0]||{}).id||null);
  apSave(cur);
  if(document.getElementById('apBox')&&CUR==='p-ap')apDraw();
  apStarsAtualiza();
  return n;
}
