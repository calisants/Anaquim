/* ================= ANALORG v8: RMN em PDF e leitura de espectros em PDF na aba Espectros =================
   1) RMN (¹H e ¹³C) a partir de PDF: impressão do SDBS (imagem) ou arquivo com texto/números (.pdf, .jdx, .csv, .txt).
   2) Painel "Ler um espectro em PDF" dentro de Espectros > IV, Massas e RMN. Usa os mesmos leitores do Identificar
      (pdfIVArquivo, pdfMSArquivo, rmnArquivo) e mostra o que foi lido antes de levar os números ao Identificar.
   As partes puras (rmnEixo, rmnAlturas, rmnLinhas, rmnSinais, rmnImagem, rmnTexto) não mexem na página: dá para testar no Node. */

/* ---------- RMN pela imagem (impressão do SDBS) ----------
   Eixo: os números grandes ficam sob traços longos (10 px) e os traços curtos (5 px) marcam o meio. O último número grande, à direita, é 0.
   ¹H: um traço grande a cada 1 ppm. ¹³C: um traço grande a cada 20 ppm. O app descobre qual é pela largura dos números escritos
   embaixo (¹³C tem números de 3 dígitos: 100, 120...200). Sem isso a geometria é igual nos dois. */
const RMN_U={h:1,c:20};
const RMN_ESQ={h:[6,30],c:[120,320]};   /* faixa aceitável do ppm na borda esquerda do gráfico */

function rmnTracos(I,fr){
  const {M,W,H}=I,{xl,yb,xr}=fr,prof=[];let mx=0;
  for(let x=xl+2;x<xr-1;x++){let c=0,y=yb+1;while(y<H&&M[y*W+x]){c++;y++;}prof.push([x,c]);if(c>mx)mx=c;}
  return{prof,mx};
}
/* largura dos números escritos sob o eixo: grupos de tinta com até 5 px de intervalo */
function rmnRotulos(I,fr,mx){
  const {M,W,H}=I,{xl,xr}=fr;let y0=-1;
  for(let y=fr.yb+mx+2;y<Math.min(H,fr.yb+mx+40);y++){let t=false;for(let x=xl;x<=xr;x++)if(M[y*W+x]){t=true;break;}if(t){y0=y;break;}}
  if(y0<0)return[];
  let y1=y0;while(y1+1<H){let t=false;for(let x=xl;x<=xr;x++)if(M[(y1+1)*W+x]){t=true;break;}if(!t)break;y1++;}
  if(y1-y0>25)y1=y0+14;
  const g=[];
  for(let x=xl-4;x<=xr+4&&x<W;x++){let t=false;for(let y=y0;y<=y1;y++)if(M[y*W+x]){t=true;break;}
    if(!t)continue;const l=g[g.length-1];if(l&&x-l.b<=5)l.b=x;else g.push({a:x,b:x});}
  return g.map(q=>({a:q.a,b:q.b,w:q.b-q.a+1,c:(q.a+q.b)/2}));
}
function rmnEixo(I,fr,nuc){
  const {prof,mx}=rmnTracos(I,fr);
  if(mx<6)return null;
  const lim=Math.max(5,mx*0.75),g=[];
  prof.forEach(([x,c])=>{if(c<lim)return;const l=g[g.length-1];if(l&&x-l.b<=2){l.b=x;l.s+=x;l.n++;}else g.push({b:x,s:x,n:1});});
  const mj=g.map(q=>q.s/q.n);
  if(mj.length<4)return null;
  const df=[];for(let i=1;i<mj.length;i++)df.push(mj[i]-mj[i-1]);
  const sp=df.slice().sort((p,q)=>p-q)[df.length>>1];
  if(df.some(d=>Math.abs(d-sp)>sp*0.12))return null;
  const rot=rmnRotulos(I,fr,mx),u=RMN_U[nuc],nj=mj.length;
  const dir=rot.length?rot[rot.length-1]:null;
  /* o último número escrito tem de ser um dígito só (o 0) e estar embaixo do último traço grande */
  if(dir&&(dir.w>9||Math.abs(dir.c-mj[nj-1])>4))return null;
  /* reta pelos centros de todos os traços grandes (posição = a + b*k): erra menos que usar só o último traço */
  let sk=0,sx=0,skk=0,skx=0;mj.forEach((x,k)=>{sk+=k;sx+=x;skk+=k*k;skx+=k*x;});
  const b=(nj*skx-sk*sx)/(nj*skk-sk*sk),a=(sx-b*sk)/nj,x0=a+b*(nj-1),sp2=b;
  const ppm=x=>(x0-x)/sp2*u;
  return{ppm,x0,sp:sp2,u,esq:ppm(fr.xl),dir:ppm(fr.xr),nMaj:nj,rot};
}
/* núcleo pelo número de dígitos dos rótulos: vários números de 3 dígitos (>= 20 px) = ¹³C */
function rmnNucleo(rot){return rot.filter(r=>r.w>=20).length>=2?'c':'h';}

/* altura de cada coluna do gráfico: da linha de base (a linha reta do espectro) até o topo da curva */
function rmnAlturas(I,fr){
  const {M,W}=I,{xl,yt,yb,xr}=fr,pad=3,top=[],cnt=new Map();
  for(let x=xl+2;x<xr-1;x++){let t=-1;for(let y=yt+pad;y<yb-pad;y++)if(M[y*W+x]){t=y;break;}top.push(t);if(t>=0)cnt.set(t,(cnt.get(t)||0)+1);}
  let base=-1,bc=0;cnt.forEach((c,t)=>{const s=c+(cnt.get(t-1)||0)+(cnt.get(t+1)||0);if(s>bc){bc=s;base=t;}});
  if(base<0)return null;
  return{h:top.map(t=>t<0?0:Math.max(0,base-t)),x0:xl+2,base};
}
/* linhas (picos) de uma curva h[i]: máximos com proeminência. rel = fração mínima da altura máxima. */
function rmnLinhas(h,rel){
  const n=h.length;let hm=0;for(let i=0;i<n;i++)if(h[i]>hm)hm=h[i];
  const thr=Math.max(4,hm*rel),P=[];
  for(let i=1;i<n-1;i++){
    if(h[i]<thr||h[i]<h[i-1]||h[i]<=h[i+1])continue;
    let a=i;while(a>0&&h[a-1]===h[i])a--;
    let lm=h[i],j=i-1;while(j>=0&&h[j]<=h[i]){if(h[j]<lm)lm=h[j];j--;}
    let rm=h[i];j=i+1;while(j<n&&h[j]<=h[i]){if(h[j]<rm)rm=h[j];j++;}
    if(h[i]-Math.max(lm,rm)<Math.max(3,thr*0.7))continue;
    P.push({i:(a+i)/2,h:h[i]});}
  return{P,hm};
}
/* junta as linhas de um mesmo multipleto. No ¹H o intervalo vem do espaçamento típico entre linhas vizinhas (que muda com o aparelho). */
function rmnSinais(L,nuc){
  const ls=L.slice().sort((p,q)=>q.d-p.d);
  let gap=0.5;
  if(nuc==='h'){
    const v=[];ls.forEach((p,i)=>{let m=9;if(i>0)m=Math.min(m,ls[i-1].d-p.d);if(i<ls.length-1)m=Math.min(m,p.d-ls[i+1].d);if(m<0.2)v.push(m);});
    v.sort((a,b)=>a-b);const s=v.length>=2?v[v.length>>1]:0.06;
    gap=Math.min(0.2,Math.max(0.025,1.7*s));}
  const G=[];
  ls.forEach(p=>{const g=G[G.length-1];if(g&&g.at[g.at.length-1].d-p.d<=gap)g.at.push(p);else G.push({at:[p]});});
  const S=G.map(g=>{const sh=g.at.reduce((a,p)=>a+p.h,0);
    return{d:g.at.reduce((a,p)=>a+p.d*p.h,0)/sh,h:sh,n:g.at.length,mx:Math.max(...g.at.map(p=>p.h)),lo:g.at[g.at.length-1].d,hi:g.at[0].d};});
  const top=Math.max(...S.map(s=>nuc==='c'?s.mx:s.h),1);
  S.forEach(s=>{s.r=Math.round((nuc==='c'?s.mx:s.h)/top*100);});
  return S;
}
/* leitura completa de uma imagem (mascara de pdfMascara). nuc: 'h' ou 'c' (escolha da pessoa); o app confere pelos rótulos. */
function rmnImagem(I,nuc){
  const fr=pdfMoldura(I);if(!fr)return{erro:'moldura'};
  const {mx}=rmnTracos(I,fr);if(mx<6)return{erro:'eixo'};
  const rot=rmnRotulos(I,fr,mx),real=rot.length?rmnNucleo(rot):nuc;
  const ax=rmnEixo(I,fr,real);if(!ax)return{erro:'eixo'};
  if(ax.esq<RMN_ESQ[real][0]||ax.esq>RMN_ESQ[real][1])return{erro:'faixa'};
  const A=rmnAlturas(I,fr);if(!A)return{erro:'curva'};
  const {P,hm}=rmnLinhas(A.h,real==='c'?0.05:0.04);
  if(!P.length||hm<20)return{erro:'curva'};
  const L=P.map(p=>({d:ax.ppm(A.x0+p.i),h:p.h})).filter(p=>p.d>-1&&p.d<ax.esq);
  const S=rmnSinais(L,real);
  return{nuc:real,trocou:real!==nuc,sinais:S,linhas:L.length,esq:ax.esq,dir:ax.dir,fonte:'imagem',
    curva:{h:A.h,x0:A.x0,ppm:x=>ax.ppm(x)}};
}

/* ---------- RMN por texto: .jdx, .csv, .txt ou PDF com texto (pares δ intensidade) ---------- */
function rmnTexto(tx,nuc){
  const L=tx.split(/\r?\n/),H={};let mode='',X=[],Y=[];
  L.forEach(l=>{const m=l.match(/^##\s*([^=]+?)\s*=\s*(.*)$/);
    if(m){const k=m[1].toUpperCase().replace(/[\s_-]/g,'');H[k]=m[2];mode=/^(XYDATA|PEAKTABLE|XYPOINTS|DATATABLE)/.test(k)?k:'';return;}
    if(/##/.test(tx)&&!mode)return;
    const n=(l.replace(/[;,\t]+/g,' ').match(/-?\d+(?:\.\d+)?(?:[eE][-+]?\d+)?/g)||[]).map(Number);
    if(!n.length)return;
    if(mode==='XYDATA'){const fx=+(H.XFACTOR||1),fy=+(H.YFACTOR||1);if(H._x0===undefined)H._x0=n[0]*fx;Y.push(...n.slice(1).map(v=>v*fy));}
    else if(n.length>=2&&n.length%2===0){for(let i=0;i<n.length;i+=2){X.push(n[i]);Y.push(n[i+1]);}}
    else if(!/##/.test(tx)&&n.length===2){X.push(n[0]);Y.push(n[1]);}});
  if(H.XYDATA!==undefined&&!X.length){
    const fx=+H.FIRSTX,lx=+H.LASTX,nn=Y.length;if(!isFinite(fx)||!isFinite(lx)||nn<10)return null;
    const d=(lx-fx)/(nn-1);X=Y.map((_,i)=>fx+i*d);}
  if(X.length<10||X.length!==Y.length)return null;
  const hz=/HZ/.test(String(H.XUNITS||'').toUpperCase()),fr=+(H['.OBSERVEFREQUENCY']||H.OBSERVEFREQUENCY||0);
  if(hz){if(!(fr>0))return null;X=X.map(v=>v/fr);}
  let o=X.map((x,i)=>[x,Y[i]]).filter(p=>isFinite(p[0])&&isFinite(p[1])).sort((a,b)=>a[0]-b[0]);
  if(o.length<10)return null;
  const lo=o[0][0],hi=o[o.length-1][0];
  if(hi<=lo)return null;
  const md=o.map(p=>p[1]).sort((a,b)=>a-b)[o.length>>1],N=Math.min(2400,o.length),st=(hi-lo)/(N-1),h=new Array(N).fill(0);
  o.forEach(p=>{const k=Math.min(N-1,Math.round((p[0]-lo)/st));h[k]=Math.max(h[k],p[1]-md);});
  const mx=Math.max(...h);if(!(mx>0))return null;
  for(let i=0;i<N;i++)h[i]=Math.max(0,h[i])/mx*1000;
  /* o espectro tem de caber no intervalo de ppm do núcleo escolhido, senão não é ppm */
  const lim=nuc==='c'?[-50,320]:[-5,30];
  if(lo<lim[0]-5||hi>lim[1]+5)return null;
  const {P}=rmnLinhas(h,nuc==='c'?0.05:0.04);if(!P.length)return null;
  const S=rmnSinais(P.map(p=>({d:lo+p.i*st,h:p.h})),nuc);
  return{nuc,trocou:false,sinais:S,linhas:P.length,esq:hi,dir:lo,fonte:'texto',curva:null};
}

/* PDF ou arquivo de texto -> leitura de RMN. Devolve {erro} se não deu. */
async function rmnArquivo(f,nuc){
  if(ehPdf(f)){
    const r=await pdfLer(f);
    if(r.texto){const p=rmnTexto(r.texto,nuc);return p&&p.sinais.length?p:{erro:'texto'};}
    return rmnImagem(pdfMascara(r),nuc);}
  const p=rmnTexto(await f.text(),nuc);return p&&p.sinais.length?p:{erro:'texto'};
}
const RMN_MSG={
  moldura:'Não achei a moldura do gráfico. Este leitor foi feito para a impressão do SDBS em PDF (o espectro com o eixo de ppm embaixo). Para outro tipo de imagem, digite os δ.',
  eixo:'Achei o gráfico, mas não consegui ler o eixo de ppm (os traços e o número 0 do canto direito). Digite os δ à mão.',
  faixa:'Li o eixo, mas a escala não bate com a de um espectro de RMN. Digite os δ à mão.',
  curva:'Achei o gráfico, mas não vi picos na curva. Digite os δ à mão.',
  texto:'Não achei pares de números (ppm e intensidade) neste arquivo. Use um PDF de impressão do SDBS, .jdx ou .csv com duas colunas.'};
function rmnErro(r){return (RMN_MSG[r&&r.erro]||RMN_MSG.moldura);}
const rmnFmt=(d,nuc)=>d.toFixed(nuc==='c'?1:2);
/* texto da leitura, em linguagem simples */
function rmnResumo(r){
  const nu=r.nuc==='c'?'¹³C':'¹H',n=r.sinais.length;
  let t='Li '+n+(n===1?' sinal':' sinais')+' de '+nu+(r.fonte==='imagem'?' da imagem do espectro (impressão do SDBS), pela posição de cada linha no eixo de ppm':' do texto do arquivo')+'. ';
  if(r.nuc==='c')t+='Cada linha é um carbono diferente: o número de sinais lido vale como número de ¹³C.';
  else t+='Linhas vizinhas de um mesmo multipleto viram um sinal só, no centro. Multipletos que se sobrepõem (aromáticos, por exemplo) podem entrar juntos, e então o número de sinais sai a menos. Por isso não preencho o número de sinais de ¹H: conte você no espectro.';
  if(r.trocou)t='Este arquivo é de '+nu+' (pelos números do eixo), diferente do que você escolheu. '+t;
  return t;
}
/* faixas do app (aba Tabelas do RMN), usadas só como pista */
const RMN_FH=[['CH₃ alifático',0.8,1.2],['CH₂ alifático',1.2,1.7],['CH alifático',1.4,2.0],['C–H alílico',1.6,2.3],['C–H α à carbonila',2.0,2.8],['C–H benzílico',2.2,3.0],['≡C–H',2.0,3.1],['C–H ligado a N',2.2,3.2],['C–H ligado a halogênio',3.0,4.4],['C–H ligado a O',3.2,4.3],['H de alceno',4.5,6.5],['H aromático',6.5,8.4],['H de aldeído',9.3,10.1],['O–H de ácido carboxílico',10,13],['O–H de álcool',1,5.5],['O–H de fenol',4,8],['N–H de amina',0.5,3],['N–H de amida',5,8.5]];
const RMN_FC=[['CH₃ e C sp³ alifático',8,55],['C sp³ ligado a N',30,65],['C sp³ ligado a O',50,90],['C≡C',65,90],['C≡N',115,125],['C de alceno',100,150],['C aromático',110,165],['C=O de éster, ácido e amida',160,185],['C=O de aldeído',190,205],['C=O de cetona',195,220]];
function rmnTipos(d,nuc){
  const T=(nuc==='c'?RMN_FC:RMN_FH).filter(t=>d>=t[1]&&d<=t[2]).map(t=>t[0]);
  const nota=nuc==='c'?(Math.abs(d-77.2)<=1?'pode ser o solvente CDCl₃ (77,2)':''):(Math.abs(d-7.26)<=0.04?'pode ser resíduo de CHCl₃ (7,26)':'');
  return{tipos:T,nota};
}

/* ================= painel "Ler um espectro em PDF" (Espectros > IV, Massas, RMN) ================= */
const SP_ARQ={iv:'.pdf,.jdx,.dx,.csv,.txt,application/pdf,text/plain',ms:'.pdf,.jdx,.dx,.csv,.txt,.tsv,application/pdf',rmn:'.pdf,.jdx,.dx,.csv,.txt,application/pdf,text/plain'};
const SP_INTRO={
  iv:'Escolha um espectro de IV em PDF (a impressão do SDBS, ou um PDF/arquivo com os pontos do espectro). O app mostra as bandas que achou e a que grupo cada uma pode pertencer. Depois você leva as bandas para o Identificar.',
  ms:'Escolha um espectro de massas em PDF (a impressão do SDBS, ou um PDF/arquivo com m/z e intensidade). O app mostra os picos que achou e você pode analisá-los na tela Analisar ou levá-los ao Identificar.',
  rmn:'Escolha um espectro de RMN de ¹H ou de ¹³C em PDF (a impressão do SDBS, ou um PDF/arquivo com ppm e intensidade). O app descobre sozinho se é ¹H ou ¹³C, mostra os sinais que achou e você leva os δ ao Identificar.'};
const SPR={};   /* última leitura de cada método */
function spStick(pontos,cfg){
  /* gráfico de varetas: pontos = [[x,altura 0 a 100]]; cfg: {a,b: extremos do eixo (a à esquerda), tk: marcas, fmt} */
  const W=340,H=120,L=8,R=8,T=8,B=22,pw=W-L-R,ph=H-T-B,px=x=>L+(x-cfg.a)/(cfg.b-cfg.a)*pw;
  let s='<line class="ax" x1="'+L+'" y1="'+(T+ph)+'" x2="'+(W-R)+'" y2="'+(T+ph)+'"/>';
  cfg.tk.forEach(t=>{const x=px(t);if(x<L-1||x>W-R+1)return;s+='<line class="tk" x1="'+x.toFixed(1)+'" y1="'+(T+ph)+'" x2="'+x.toFixed(1)+'" y2="'+(T+ph+4)+'"/><text class="tl" x="'+x.toFixed(1)+'" y="'+(T+ph+15)+'" text-anchor="middle">'+t+'</text>';});
  pontos.forEach(p=>{const x=px(p[0]);if(x<L||x>W-R)return;const h=Math.max(2,p[1]/100*ph);
    s+='<line x1="'+x.toFixed(1)+'" y1="'+(T+ph)+'" x2="'+x.toFixed(1)+'" y2="'+(T+ph-h).toFixed(1)+'" stroke="var(--blue)" stroke-width="2" stroke-linecap="round"/>';});
  return '<svg viewBox="0 0 '+W+' '+H+'" class="nmrspec spsvg" role="img" aria-label="'+esc(cfg.alt)+'">'+s+'</svg>';
}
/* M provável: o maior m/z, a menos que seja o pico M+1 (isótopo ¹³C: bem menor que o pico logo abaixo). Nunca é certeza:
   com Cl, Br ou S o maior pico pode ser M+2, e em álcoois e éteres o M quase não aparece. Por isso o app só preenche o M na tela Analisar, avisando. */
function spMProvavel(pk){
  const I=new Map(pk.map(p=>[p[0],p[1]])),mz=pk.map(p=>p[0]).sort((a,b)=>b-a);
  let M=mz[0];const iso=[];
  const a=I.get(M),b=I.get(M-1);
  if(b!==undefined&&a!==null&&b!==null&&a<=0.35*b){iso.push(M);M=M-1;}
  return{M,iso};
}
function spTabela(cab,linhas){
  return '<div class="tbl"><table class="obt"><thead><tr>'+cab.map(c=>'<th>'+c+'</th>').join('')+'</tr></thead><tbody>'+linhas.map(l=>'<tr>'+l.map(c=>'<td>'+c+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
}
function spDesenha(met,r){
  const box=document.querySelector('.sppdf[data-sp="'+met+'"] [data-sp-out]');if(!box)return;
  if(!r){box.innerHTML='';return;}
  let h='';
  if(met==='iv'){
    const P=r.peaks.slice().sort((a,b)=>b.v-a.v);
    h+=spStick(P.map(p=>[p.v,Math.max(8,Math.round((p.h||0.5)*100))]),{a:4000,b:400,tk:[4000,3000,2000,1000],alt:'Bandas de IV lidas, de 4000 a 400 cm⁻¹'});
    h+=spTabela(['Banda (cm⁻¹)','O que pode ser (tabela do app)'],P.map(p=>{const hit=IRT.filter(q=>p.v<=q[0]+(q[0]===q[1]?5:0)&&p.v>=q[1]-(q[0]===q[1]?5:0)),nm=[...new Set(hit.map(q=>q[2]))];
      return['<b>'+p.v+(p.w>=110&&p.v>2400?' (larga)':'')+'</b>',nm.length?esc(nm.slice(0,3).join('; '))+(nm.length>3?'; ...':''):'nada na tabela do app'];}));
    h+='<p class="hint">As faixas se sobrepõem: use como pista e confirme com outra banda. Marquei "larga" só nas bandas muito largas acima de 2400 cm⁻¹.</p>';
    h+='<div class="row"><button class="btn" type="button" data-sp-go="iv">Levar as bandas para o Identificar</button></div>';
  }else if(met==='ms'){
    const P=r.pk.slice().sort((a,b)=>a[0]-b[0]),mm=spMProvavel(r.pk),M=Math.max(...P.map(p=>p[0]));
    h+=spStick(P.map(p=>[p[0],p[1]]),{a:Math.max(0,Math.floor(Math.min(...P.map(p=>p[0]))/10)*10-5),b:Math.ceil(M/10)*10+5,tk:(()=>{const t=[],a=Math.max(0,Math.floor(Math.min(...P.map(p=>p[0]))/10)*10),b=Math.ceil(M/10)*10,s=b-a>120?40:20;for(let v=Math.ceil(a/s)*s;v<=b;v+=s)t.push(v);return t;})(),alt:'Picos de massas lidos (m/z e intensidade relativa)'});
    h+=spTabela(['m/z','Intensidade relativa (%)'],P.map(p=>['<b>'+p[0]+'</b>'+(p[0]===mm.M?' (provável M)':mm.iso.indexOf(p[0])>=0?' (provável M+1: isótopo ¹³C)':''),p[1]===null?'sem valor':p[1]]));
    h+='<p class="hint">"Provável M" é o maior m/z que não parece o pico M+1 do isótopo ¹³C. É só uma pista: com Cl, Br ou S aparece também o M+2, e em álcoois e éteres o M quase não aparece. Confira antes de analisar.</p>';
    h+='<div class="row"><button class="btn" type="button" data-sp-go="msan">Analisar estes picos</button><button class="btn ghost" type="button" data-sp-go="ms">Levar para o Identificar</button></div>';
  }else{
    const S=r.sinais,nu=r.nuc==='c'?'¹³C':'¹H';
    const pts=S.map(s=>[s.d,s.r]),a=r.nuc==='c'?Math.max(200,Math.ceil(Math.max(...S.map(s=>s.d))/20)*20+10):12,tk=[];
    if(r.nuc==='c'){for(let v=0;v<=a;v+=40)tk.push(v);}else{for(let v=0;v<=12;v+=2)tk.push(v);}
    h+=spStick(pts,{a:a,b:r.nuc==='c'?-5:-0.5,tk:tk,alt:'Sinais de RMN de '+nu+' lidos, δ em ppm'});
    h+=spTabela(['δ (ppm)',r.nuc==='c'?'Intensidade':'Linhas','Altura relativa','Pode ser (tabela do app)'],S.map(s=>{const t=rmnTipos(s.d,r.nuc);
      return['<b>'+rmnFmt(s.d,r.nuc).replace('.',',')+'</b>',r.nuc==='c'?'':s.n,s.r+'%',(t.tipos.length?esc(t.tipos.slice(0,3).join('; '))+(t.tipos.length>3?'; ...':''):'nada na tabela do app')+(t.nota?' <i>('+t.nota+')</i>':'')];}));
    h+='<p class="hint">A altura vem da curva e <b>não é integração</b>: o SDBS não imprime a integral. Serve só para comparar um sinal com outro.</p>';
    h+='<div class="row"><button class="btn" type="button" data-sp-go="rmn">Levar os δ de '+nu+' para o Identificar</button></div>';
  }
  box.innerHTML=h;
}
function spIrIdent(campos,aviso){
  /* leva os números ao Identificar: grava nos campos, avisa a tela e abre a seção certa */
  go('p-ic');
  campos.forEach(c=>{const e=document.getElementById(c[0]);if(!e)return;e.value=c[1];e.dispatchEvent(new Event('input',{bubbles:true}));});
  const sec=document.getElementById(campos[0][0]);let d=sec&&sec.closest&&sec.closest('details');if(d)d.open=true;
  const m=document.getElementById('icExpMsg');if(m&&aviso)m.textContent=aviso;
  if(sec&&sec.scrollIntoView)setTimeout(()=>sec.scrollIntoView({block:'center'}),80);
}
function spLevar(met){
  const r=SPR[met==='msan'?'ms':met];if(!r)return;
  if(met==='iv')spIrIdent([['icIV',r.peaks.map(p=>p.v+(p.w>=110&&p.v>2400?'l':'')).join(' ')]],'Bandas de IV lidas do PDF. Confira o campo e apague as que não forem bandas de verdade.');
  else if(met==='ms'){
    const mm=spMProvavel(r.pk),pk=r.pk.filter(q=>q[0]!==mm.M&&mm.iso.indexOf(q[0])<0);
    spIrIdent([['icP',pk.map(q=>q[0]+':'+q[1]).join(' ')]],'Picos de massas lidos do PDF (sem o M provável, '+mm.M+', e sem o pico M+1). Confira os valores e digite o M se tiver certeza dele.');}
  else if(met==='msan'){
    const mm=spMProvavel(r.pk);go('p-an');
    const iM=document.getElementById('inM'),iP=document.getElementById('inP');
    if(iM)iM.value=mm.M;if(iP)iP.value=r.pk.filter(q=>q[0]!==mm.M&&mm.iso.indexOf(q[0])<0).sort((a,b)=>b[0]-a[0]).map(q=>q[0]).join(', ');
    const nr=document.getElementById('nrule');if(nr)nr.textContent='M = '+mm.M+' veio do PDF (maior m/z que não parece M+1). Confira: se o íon molecular for outro, corrija o campo M e analise de novo.';
    const g=document.getElementById('go');if(g)g.click();}
  else if(met==='rmn'){
    const S=r.sinais.map(s=>rmnFmt(s.d,r.nuc));
    if(r.nuc==='c')spIrIdent([['icCd',S.join(' ')],['icC',String(S.length)]],'δ de ¹³C lidos do PDF. O número de sinais de ¹³C foi preenchido junto. Confira.');
    else spIrIdent([['icHd',S.join(' ')]],'δ de ¹H lidos do PDF. Conte você o número de sinais de ¹H no espectro e confira os valores.');}
}
function spLer(met,f){
  const box=document.querySelector('.sppdf[data-sp="'+met+'"]'),msg=box.querySelector('[data-sp-msg]');
  msg.textContent='Lendo o arquivo…';SPR[met]=null;spDesenha(met,null);
  const falha=e=>{msg.textContent=(e&&e.erro?rmnErro(e):PDF_ERR)+(ehPdf(f)?' (Se o navegador for muito antigo, o leitor de PDF pode não abrir.)':'');};
  const fim=async()=>{
    try{
      if(met==='iv'){
        let r;if(ehPdf(f))r=await pdfIVArquivo(f);else{const p=ivParseSpec(await f.text());r=p&&p.peaks.length?{peaks:p.peaks,msg:'Li '+p.peaks.length+' bandas'}:null;}
        if(!r){falha();return;}SPR.iv=r;msg.textContent=r.msg+'. Confira a lista: a leitura pode trazer bandas a mais ou errar 1 unidade.';spDesenha('iv',r);}
      else if(met==='ms'){
        let r;if(ehPdf(f))r=await pdfMSArquivo(f);else{const p=bdParseSpec(await f.text());r=p.length?{pk:p,msg:'Li '+p.length+' picos'}:null;}
        if(!r){falha();return;}SPR.ms=r;msg.textContent=r.msg+'. Confira os valores: a leitura por imagem pode errar em 1 unidade de m/z ou em barras muito pequenas.';spDesenha('ms',r);}
      else{
        const r=await rmnArquivo(f,'h');
        if(!r||r.erro){falha(r);return;}SPR.rmn=r;msg.textContent=rmnResumo(r);spDesenha('rmn',r);}
    }catch(e){falha();}
  };
  fim();
}
function spInit(){
  document.querySelectorAll('.sppdf[data-sp]').forEach(b=>{
    if(b.dataset.ok)return;b.dataset.ok='1';const met=b.dataset.sp,id='spf-'+met;
    b.innerHTML='<h3 class="rmh">Ler um espectro em PDF</h3><p class="hint">'+SP_INTRO[met]+'</p>'
      +'<label for="'+id+'">Arquivo do espectro (.pdf, .jdx, .csv ou .txt)<input type="file" id="'+id+'" accept="'+SP_ARQ[met]+'"></label>'
      +'<p class="hint" data-sp-msg aria-live="polite">Nenhum arquivo escolhido.</p><div data-sp-out></div>';
    b.querySelector('input[type=file]').addEventListener('change',e=>{const f=e.target.files[0];if(f)spLer(met,f);});
    b.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-sp-go]');if(t)spLevar(t.dataset.spGo);});
  });
}
document.addEventListener('DOMContentLoaded',spInit);
if(document.readyState!=='loading')spInit();

/* ================= RMN em PDF no Identificar (seção 6) ================= */
async function icRmnArquivo(f,nuc){
  const out=document.getElementById(nuc==='c'?'icCMsg':'icHMsg');out.textContent='Lendo o arquivo…';
  try{
    const r=await rmnArquivo(f,nuc);
    if(!r||r.erro){out.textContent=rmnErro(r)+(ehPdf(f)?' (Se o navegador for muito antigo, o leitor de PDF pode não abrir.)':'');return;}
    const S=r.sinais.map(s=>rmnFmt(s.d,r.nuc)),fx=(c,v)=>{const e=document.getElementById(c);e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));};
    if(r.nuc==='c'){fx('icCd',S.join(' '));fx('icC',String(S.length));}
    else fx('icHd',S.join(' '));
    out.textContent=rmnResumo(r)+' Confira os δ no campo acima e apague o que não for sinal do composto (solvente, impureza).';
  }catch(e){out.textContent=RMN_MSG.moldura+' (Este navegador pode ser antigo demais para o leitor de PDF.)';}
}
document.addEventListener('change',e=>{
  const t=e.target;if(!t||(t.id!=='icHFile'&&t.id!=='icCFile'))return;
  const f=t.files[0];if(f)icRmnArquivo(f,t.id==='icCFile'?'c':'h');
});
