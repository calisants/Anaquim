/* ================= ANALORG v11: RMN, treino de prova de ¹H (integração por régua) =================
   Aba "Prova" dentro de RMN. 13 exercícios: problemas 4.3 A–H do Silverstein (os mesmos de "Resolvidos") e 5 espectros da folha da aula.
   Fluxo da prova: medir os degraus com a régua, regra de três, ler cada sinal (δ, tipo de H, grupo, formato, vizinhos), montar a estrutura,
   escrever o significado de cada pico no formato da folha e só então ver a resolução.
   FONTES (honestas): δ, H e multiplicidade dos 4.3 foram lidos das fotos das páginas (v257), então são aproximados. A integração dos 4.3 foi
   deduzida pela fórmula; as ALTURAS DOS DEGRAUS são geradas aqui (escritas aqui), exceto o exercício A, que usa os números da aula.
   J são típicos, não medidos. Os 5 da folha: δ lidos do gráfico da folha; as explicações de cada sinal são escritas aqui, sem fonte conferida.
   Os passos de resolução dos 4.3 vêm de Resolvidos (analorg9.js). */
(function(){
const K='pv_',$=id=>document.getElementById(K+id);
const LC=['#2a5d84','#b5651d','#3d7a4a','#a13d63','#7a5c9e','#8a6d00'];
const CATS={
 alq:{n:'H de alquila simples',r:'1 a 2 ppm'},
 alfa:{n:'H em carbono vizinho de C=O, C=C ou anel',r:'2 a 2,5 ppm (até cerca de 3)'},
 het:{n:'H em carbono ligado a O, N ou halogênio',r:'3 a 4 ppm (até cerca de 4,5)'},
 vin:{n:'H de alceno (vinílico)',r:'4,5 a 6 ppm'},
 aro:{n:'H aromático',r:'6,5 a 8,5 ppm'},
 ald:{n:'H de aldeído',r:'9 a 10 ppm'},
 acid:{n:'H de ácido carboxílico',r:'10 a 12 ppm'},
 troc:{n:'H de OH ou NH (troca rápida)',r:'1 a 5 ppm, muito variável (amida em DMSO chega perto de 10)'}};
const MN={s:'singleto',d:'dupleto',t:'tripleto',q:'quarteto',quint:'quinteto',sext:'sexteto',sept:'septeto',dd:'dupleto de dupletos (dd)',sd:'septeto de dupletos',m:'multipleto (m)'};
const NV={s:0,d:1,t:2,q:3,quint:4,sext:5,sept:6,dd:2,sd:7,m:null};
const GR={ch3:'CH₃',ch2:'CH₂',ch:'CH',ch32:'2 × CH₃ (6 H)',ch22:'2 × CH₂ (4 H)',aro:'H aromático',vin:'H vinílico',cho:'CHO (aldeído)',oh:'OH ou NH'};
const SVF='Problemas 4.3 do Silverstein (7ª ed. em português). Os δ foram lidos das fotos das páginas pelo Anaquim (v257), então são aproximados. A integração foi deduzida pela fórmula e pelas multiplicidades, não lida da curva. Os J do multipleto ampliado são típicos, não medidos. As alturas dos degraus são geradas aqui (escritas aqui), exceto no exercício A, que usa os números da sua aula.';
const FOL='Dados lidos da sua folha (espectro HSP e tabela do professor). δ aproximados lidos do gráfico; as explicações de cada sinal são escritas aqui, sem fonte conferida.';
const EX=[];
const sv=(id,rot,nome,fs,f,enun,s,est)=>EX.push({id:id,grp:'sv',rot:rot,nome:nome,fs:fs,f:f,enun:enun,s:s,est:est,fonteNota:SVF});
sv('43A','4.3 A · C6H12O, cetona','4.3 A · 2-hexanona','C6H12O',{C:6,H:12,N:0,X:0},'C6H12O, cetona. 300 MHz, CDCl3.',
 [{d:2.45,h:2,m:'t',J:7.3,cat:'alfa',sig:'CH2 ligado ao C=O (carbono alfa). Tripleto porque o CH2 vizinho tem 2 H.'},
  {d:2.14,h:3,m:'s',cat:'alfa',sig:'CH3 colado no C=O. Singleto: o C=O não tem H.'},
  {d:1.55,h:2,m:'quint',J:7.3,cat:'alq',sig:'CH2 do meio da cadeia, entre dois CH2 (4 H vizinhos). Quinteto.'},
  {d:1.30,h:2,m:'sext',J:7.3,cat:'alq',sig:'CH2 entre um CH2 e um CH3 (5 H vizinhos): sexteto pela regra n + 1. O livro rotula "sept"; o Anaquim segue a regra.'},
  {d:0.90,h:3,m:'t',J:7.3,cat:'alq',sig:'CH3 terminal da cadeia. Tripleto porque o CH2 vizinho tem 2 H.'}],
 [['CH3','B'],['–C(=O)–',null],['CH2','A'],['CH2','C'],['CH2','D'],['CH3','E']]);
sv('43B','4.3 B · C8H10O2, álcool-éter','4.3 B · álcool 4-metoxibenzílico','C8H10O2',{C:8,H:10,N:0,X:0},'C8H10O2, álcool-éter. 300 MHz, CDCl3.',
 [{d:7.2,h:2,m:'m',w:0.1,cat:'aro',sig:'2 H do anel ao lado do CH2OH. Anel para-dissubstituído, sistema AA\'BB\', aparece como multipleto.'},
  {d:6.9,h:2,m:'m',w:0.1,cat:'aro',sig:'2 H do anel ao lado do OCH3. O O doa elétrons e protege esses H, então ficam mais à direita.'},
  {d:4.5,h:2,m:'s',cat:'het',sig:'Ar–CH2–OH. Singleto: o CH2 não tem H vizinho (o OH troca rápido). δ alto por causa do O e do anel.'},
  {d:3.8,h:3,m:'s',cat:'het',sig:'OCH3 de éter aromático. Singleto, 3 H.'},
  {d:2.5,h:1,m:'s',cat:'troc',sig:'OH. Singleto largo, sem acoplamento, posição muda com a concentração.'}],
 [['HO','E'],['–CH2','C'],['–(C6H4)–','A'],['–O–',null],['CH3','D']]);
sv('43C','4.3 C · C5H8O2, éster','4.3 C · acrilato de etila','C5H8O2',{C:5,H:8,N:0,X:0},'C5H8O2, éster. 300 MHz, CDCl3. O espectro indica CH2=CH.',
 [{d:6.40,h:1,m:'dd',cp:[[1,17.3],[1,1.5]],cat:'vin',sig:'Um dos 2 H do =CH2: acopla com o CH (J grande, ≈17 Hz) e com o outro H do =CH2 (J pequeno, ≈1,5 Hz). Os δ exatos são típicos de acrilato; o gráfico mostra três dd entre 5,8 e 6,4.'},
  {d:6.12,h:1,m:'dd',cp:[[1,17.3],[1,10.4]],cat:'vin',sig:'H do =CH ligado ao C=O: dd com J ≈17 Hz (trans) e J ≈10 Hz (cis).'},
  {d:5.82,h:1,m:'dd',cp:[[1,10.4],[1,1.5]],cat:'vin',sig:'O outro H do =CH2: J ≈10 Hz (com o CH) e ≈1,5 Hz (geminal).'},
  {d:4.2,h:2,m:'q',J:7.1,cat:'het',sig:'OCH2 do etila de éster. Quarteto porque o CH3 vizinho tem 3 H. Compare com 4,12 do acetato de etila.'},
  {d:1.3,h:3,m:'t',J:7.1,cat:'alq',sig:'CH3 do etila. Tripleto porque o CH2 vizinho tem 2 H.'}],
 [['CH2','A'],['=CH','B'],['–C(=O)–O–',null],['CH2','D'],['CH3','E']]);
sv('43D','4.3 D · C4H8O','4.3 D · 2-metilpropanal','C4H8O',{C:4,H:8,N:0,X:0},'C4H8O. 300 MHz, CDCl3.',
 [{d:9.7,h:1,m:'d',J:1.5,cat:'ald',sig:'H de aldeído. Dupleto com J pequeno (≈1,5 Hz): acopla com o CH vizinho.'},
  {d:2.4,h:1,m:'sd',cp:[[6,6.9],[1,1.5]],cat:'alfa',sig:'CH ao lado do C=O. Septeto (6 H dos dois CH3, J ≈7 Hz) de dupletos (1 H do CHO, J ≈1,5 Hz).'},
  {d:1.1,h:6,m:'d',J:6.9,cat:'alq',sig:'Dois CH3 equivalentes. Dupleto porque cada um vê 1 H (o CH).'}],
 [['(CH3)2','C'],['CH','B'],['–CHO','A']]);
sv('43E','4.3 E · C7H7NO2','4.3 E · 4-nitrotolueno','C7H7NO2',{C:7,H:7,N:1,X:0},'C7H7NO2. 300 MHz, CDCl3. O 13C mostra 5 linhas.',
 [{d:8.1,h:2,m:'m',w:0.1,cat:'aro',sig:'2 H do anel ao lado do NO2. O NO2 puxa elétrons com força e leva esses H para perto de 8.'},
  {d:7.3,h:2,m:'m',w:0.1,cat:'aro',sig:'2 H do anel ao lado do CH3, menos desblindados.'},
  {d:2.4,h:3,m:'s',cat:'alfa',sig:'CH3 ligado ao anel. Singleto.'}],
 [['CH3','C'],['–(C6H4)–','A'],['–NO2',null]]);
sv('43F','4.3 F · C8H9NO, amida (DMSO-d6)','4.3 F · acetanilida','C8H9NO',{C:8,H:9,N:1,X:0},'C8H9NO, amida. Este é o espectro em DMSO-d6 (exceção do enunciado).',
 [{d:9.9,h:1,m:'s',cat:'troc',sig:'N–H de amida. Sinal largo (troca e quadrupolo do 14N); em DMSO fica bem à esquerda por ligação de H com o solvente.'},
  {d:7.6,h:2,m:'m',w:0.1,cat:'aro',sig:'2 H orto do anel monossubstituído (ao lado do N).'},
  {d:7.3,h:2,m:'m',w:0.1,cat:'aro',sig:'2 H meta do anel.'},
  {d:7.0,h:1,m:'m',w:0.1,cat:'aro',sig:'1 H para do anel.'},
  {d:2.1,h:3,m:'s',cat:'alfa',sig:'CH3 de acetila, CH3C(=O). Singleto: sem vizinho com H.'}],
 [['C6H5','B'],['–NH','A'],['–C(=O)–',null],['CH3','E']]);
sv('43G','4.3 G · C4H8O, éter','4.3 G · éter etil vinílico','C4H8O',{C:4,H:8,N:0,X:0},'C4H8O, éter. 300 MHz, CDCl3.',
 [{d:6.5,h:1,m:'dd',cp:[[1,14],[1,6.5]],cat:'vin',sig:'H do O–CH=. Acopla com os dois H do =CH2: J trans ≈14 Hz e J cis ≈6,5 Hz.'},
  {d:4.2,h:1,m:'dd',cp:[[1,14],[1,2]],cat:'vin',sig:'H do =CH2 que acopla trans com o CH (≈14 Hz) e geminal com o outro H (≈2 Hz).'},
  {d:4.0,h:1,m:'dd',cp:[[1,6.5],[1,2]],cat:'vin',sig:'O outro H do =CH2: J cis ≈6,5 Hz com o CH e geminal ≈2 Hz.'},
  {d:3.7,h:2,m:'q',J:7.0,cat:'het',sig:'OCH2 do etila. Quarteto porque o CH3 vizinho tem 3 H.'},
  {d:1.3,h:3,m:'t',J:7.0,cat:'alq',sig:'CH3 do etila. Tripleto porque o CH2 vizinho tem 2 H.'}],
 [['CH2','B'],['=CH','A'],['–O–',null],['CH2','D'],['CH3','E']]);
sv('43H','4.3 H · C10H12O2, éster','4.3 H · benzoato de propila','C10H12O2',{C:10,H:12,N:0,X:0},'C10H12O2, éster. 300 MHz, CDCl3.',
 [{d:8.05,h:2,m:'m',w:0.1,cat:'aro',sig:'2 H orto ao C=O, muito desblindados pelo C=O do éster.'},
  {d:7.5,h:1,m:'m',w:0.1,cat:'aro',sig:'1 H para do anel.'},
  {d:7.4,h:2,m:'m',w:0.1,cat:'aro',sig:'2 H meta do anel.'},
  {d:4.3,h:2,m:'t',J:6.7,cat:'het',sig:'OCH2 da propila. Tripleto porque o CH2 vizinho tem 2 H.'},
  {d:1.8,h:2,m:'sext',J:7.0,cat:'alq',sig:'CH2 do meio, com 5 H vizinhos (2 + 3): sexteto pela regra n + 1. O livro rotula "sept".'},
  {d:1.0,h:3,m:'t',J:7.3,cat:'alq',sig:'CH3 terminal. Tripleto.'}],
 [['C6H5','A'],['–C(=O)–O–',null],['CH2','D'],['CH2','E'],['CH3','F']]);
const fo=(id,rot,nome,fs,f,enun,s,est,ana,x)=>EX.push(Object.assign({id:id,grp:'fol',rot:rot,nome:nome,fs:fs,f:f,enun:enun,s:s,est:est,ana:ana,fonteNota:FOL},x||{}));
fo('FP1','Folha: C6H13NO, amida (HSP-00-655)','Folha · N,N-dietilacetamida','C6H13NO',{C:6,H:13,N:1,X:0},'C6H13NO, IDH 1. IV: C=O em 1650. 300 MHz, CDCl3.',
 [{d:3.4,h:4,m:'q',J:7.1,cat:'het',frag:'2(CH2–CH3)–N',sig:'Dois CH2 ligados ao N da amida. Quarteto: cada CH2 tem um CH3 vizinho (3 H).'},
  {d:2.1,h:3,m:'s',cat:'alfa',frag:'CH3–C=O',sig:'CH3 colado no C=O. Singleto: o C=O não tem H.'},
  {d:1.2,h:6,m:'t',J:7.1,cat:'alq',frag:'2(CH3–CH2)',sig:'Dois CH3 equivalentes, cada um com um CH2 vizinho (2 H): tripleto de 6 H.'}],
 [['CH3','B'],['–C(=O)–',null],['N',null],['(CH2CH3)2','A e C']],
 [['Fórmula e GDH','<p>GDH = (2·6 + 2 + 1 − 13) ÷ 2 = <b>1</b>. É o C=O (IV em 1650, amida).</p>'],['Integração','<p>4 : 3 : 6 soma 13 H, que é o H da fórmula.</p>'],['Montagem','<p>O singleto de 3 H em 2,1 é um CH3–C=O. O quarteto de 4 H com o tripleto de 6 H forma dois etilas (CH2–CH3) iguais. Falta o N, que liga os dois etilas ao C=O: <b>CH3–C(=O)–N(CH2CH3)2</b>.</p>']]);
fo('FP2','Folha: C11H14O2, éster (HSP-02-821)','Folha · butanoato de benzila','C11H14O2',{C:11,H:14,N:0,X:0},'C11H14O2, IDH 5. IV: C=O em 1730 e monossubstituição (700 e 770). 300 MHz, CDCl3.',
 [{d:7.4,h:5,m:'m',cat:'aro',frag:'C6H5',sig:'Cinco H de anel monossubstituído, multipleto.'},
  {d:5.1,h:2,m:'s',cat:'het',frag:'–CH2–O',sig:'CH2 entre o anel e o O do éster. Singleto: os vizinhos (carbono do anel e O) não têm H.'},
  {d:2.4,h:2,m:'t',J:7.4,cat:'alfa',frag:'CH2CH2C=O',sig:'CH2 ligado ao C=O. Tripleto: um CH2 vizinho (2 H).'},
  {d:1.6,h:2,m:'sext',J:7.4,cat:'alq',frag:'CH2CH2CH3',sig:'CH2 do meio da cadeia, entre um CH2 e um CH3 (2 + 3 = 5 H): sexteto.'},
  {d:0.9,h:3,m:'t',J:7.4,cat:'alq',frag:'CH3CH2',sig:'CH3 terminal, vizinho de um CH2: tripleto.'}],
 [['C6H5','A'],['CH2','B'],['–O–',null],['–C(=O)–',null],['CH2','C'],['CH2','D'],['CH3','E']],
 [['Fórmula e GDH','<p>GDH = (2·11 + 2 − 14) ÷ 2 = <b>5</b>. O anel gasta 4 e o C=O gasta 1.</p>'],['Integração','<p>5 : 2 : 2 : 2 : 3 soma 14 H.</p>'],['Montagem','<p>Os 5 H aromáticos dizem fenil. O singleto em 5,1 é um CH2 entre o anel e um O. A cadeia propila (CH2, CH2, CH3) termina no C=O do éster. Resultado: <b>C6H5–CH2–O–C(=O)–CH2CH2CH3</b>.</p>']]);
fo('FP3','Folha: C7H7NO, amida (HSP-04-635)','Folha · benzamida','C7H7NO',{C:7,H:7,N:1,X:0},'C7H7NO, IDH 5. IV: N–H em 3380 e 3170, C=O em 1650. O NH2 não aparece integrado no espectro, então a regra de três usa 5 H.',
 [{d:7.8,h:2,m:'m',cat:'aro',frag:'2 H aromáticos (orto ao C=O)',sig:'Dois H do anel mais desblindados, perto do C=O. Multipleto. O δ exato é estimado.'},
  {d:7.4,h:3,m:'m',cat:'aro',frag:'3 H aromáticos (meta e para)',sig:'Três H do anel mais afastados do C=O. Multipleto. O δ exato é estimado.'}],
 [['C6H5','A e B'],['–C(=O)–',null],['NH2',null]],
 [['Fórmula e GDH','<p>GDH = (2·7 + 2 + 1 − 7) ÷ 2 = <b>5</b>. Anel (4) mais C=O (1).</p>'],['Integração','<p>No espectro só aparecem 5 H (2 + 3), todos aromáticos. Os 2 H do NH2 não aparecem. Por isso a soma da regra de três é 5 e não 7.</p>'],['Montagem','<p>Anel monossubstituído com C=O (IV 1650) e N–H (3380 e 3170, dois picos de NH2): <b>C6H5–C(=O)–NH2</b>.</p>']],{Hint:5});
fo('FP4','Folha: C4H8O2, éter cíclico (HSP-03-850)','Folha · 1,3-dioxano','C4H8O2',{C:4,H:8,N:0,X:0},'C4H8O2, IDH 1, sem C=O no IV. Aqui o IDH 1 é um anel. 300 MHz, CDCl3.',
 [{d:4.9,h:2,m:'s',cat:'het',frag:'O–CH2–O',sig:'CH2 entre dois O, por isso o δ mais alto. Singleto: os vizinhos são O, sem H.'},
  {d:3.8,h:4,m:'t',J:5.5,cat:'het',frag:'O–CH2',sig:'Dois CH2 ligados a um O cada um. Tripleto: cada um tem um CH2 vizinho (2 H).'},
  {d:1.7,h:2,m:'quint',J:5.5,cat:'alq',frag:'CH2CH2CH2',sig:'CH2 do meio, entre dois CH2 (2 + 2 = 4 H): quinteto.'}],
 [['O',null],['CH2','A'],['O',null],['CH2','B'],['CH2','C'],['CH2','B']],
 [['Fórmula e GDH','<p>GDH = <b>1</b>. Sem C=O no IV, então a insaturação é um anel.</p>'],['Integração','<p>2 : 4 : 2 soma 8 H.</p>'],['Montagem','<p>O singleto em 4,9 é um CH2 preso entre dois O (O–CH2–O). Os 4 H em 3,8 são dois CH2 ligados a O. O quinteto em 1,7 é um CH2 entre dois CH2. Fecha um anel de seis: <b>1,3-dioxano</b>.</p>']],{ring:true});
fo('FP5','Folha: C4H8O2, ácido (HSP-00-115)','Folha · ácido butanoico','C4H8O2',{C:4,H:8,N:0,X:0},'C4H8O2, IDH 1. IV: banda larga de O–H de ácido e C=O. 300 MHz, CDCl3.',
 [{d:11,h:1,m:'s',cat:'acid',frag:'OH–C (ácido)',sig:'H do OH de ácido carboxílico, bem desblindado. Singleto, porque o OH troca e não acopla.'},
  {d:2.5,h:2,m:'t',J:7.4,cat:'alfa',frag:'CH2–CH2',sig:'CH2 ligado ao C=O. Tripleto: um CH2 vizinho.'},
  {d:1.7,h:2,m:'sext',J:7.4,cat:'alq',frag:'CH2–CH2–CH3',sig:'CH2 entre um CH2 e um CH3 (2 + 3 = 5 H): sexteto.'},
  {d:1.0,h:3,m:'t',J:7.4,cat:'alq',frag:'CH3–CH2',sig:'CH3 terminal, vizinho de um CH2: tripleto.'}],
 [['HO','A'],['–C(=O)–',null],['CH2','B'],['CH2','C'],['CH3','D']],
 [['Fórmula e GDH','<p>GDH = <b>1</b>. O IV mostra C=O.</p>'],['Integração','<p>1 : 2 : 2 : 3 soma 8 H.</p>'],['Montagem','<p>O sinal em 11 ppm de 1 H é OH de ácido. Os outros formam uma propila (CH2, CH2, CH3) ligada ao C=O: <b>HO–C(=O)–CH2CH2CH3</b>.</p>']]);
EX.forEach(e=>{e.s.sort((a,b)=>b.d-a.d);e.s.forEach((s,i)=>{s.id=String.fromCharCode(65+i);s.col=LC[i%LC.length];});});
function anaOf(e){
  if(e.ana)return e.ana;
  const r=(window.RES_BANCO||[]).find(x=>x.id===e.id);
  return r?r.passos:[['Resolução','<p>A resolução deste problema está em Praticar > Problemas resolvidos.</p>']];
}

/* ---- progresso ---- */
const PK='anaquim-prova-v1';
let SAVED={};try{SAVED=JSON.parse(localStorage.getItem(PK)||'{}')||{};}catch(e){SAVED={};}
function save(){try{localStorage.setItem(PK,JSON.stringify(SAVED));}catch(e){}}

const fmt=(x,d=2)=>x.toFixed(d).replace('.',',');
const sub=t=>t.replace(/([A-Za-z\)])(\d+)/g,'$1<sub>$2</sub>');
const FQ=300,UNIT=60;
const S={rows:{},viz:[],done:[],force:false,ex:0,sel:null,meas:[],ints:[],tool:null,clicks:[],marks:{},chain:[],order:null};
const E=()=>EX[S.ex];
function binom(n){let r=[1];for(let i=0;i<n;i++){const nr=[1];for(let j=1;j<r.length;j++)nr.push(r[j-1]+r[j]);nr.push(1);r=nr;}return r;}
function linesOf(s){
 if(s.m==='m'){const w=s.w||0.1;let L=[];for(let k=0;k<9;k++){const t=(k-4)/4;L.push({p:s.d+t*w/2,w:Math.exp(-2.2*t*t)});}const sm=L.reduce((a,l)=>a+l.w,0);return L.map(l=>({p:l.p,w:l.w/sm}));}
 const cp=s.cp||(NV[s.m]?[[NV[s.m],s.J]]:[]);let L=[{p:s.d,w:1}];
 for(const c of cp){const n=c[0],J=c[1],pc=binom(n),sm=pc.reduce((a,b)=>a+b);const N2=[];for(const l of L)pc.forEach((k,j)=>N2.push({p:l.p+(j-n/2)*J/FQ,w:l.w*k/sm}));L=N2;}
 return L;
}
function rng(seed){let a=seed>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const AULA=[0.6,0.8,0.6,0.6,0.9];
function heightsFor(i){
 const e=EX[i];if(e._hs)return e._hs;
 const Ht=e.Hint||e.f.H;
 if(e.id==='43A'){e._hs=AULA.slice();return e._hs;}
 for(let seed=1;seed<500;seed++){
  const r=rng(i*7919+seed),u=0.27+r()*0.1;
  const hs=e.s.map(s=>Math.max(0.2,Math.round(s.h*u*(1+(r()-0.5)*0.16)*10)/10));
  const sum=hs.reduce((a,b)=>a+b,0);
  if(e.s.every((s,k)=>Math.round(hs[k]*Ht/sum)===s.h)){e._hs=hs;return hs;}
 }
 e._hs=e.s.map(s=>Math.round(s.h*0.3*10)/10);return e._hs;
}
function layout(){
 const e=E(),hs=heightsFor(S.ex),tot=hs.reduce((a,b)=>a+b,0)*UNIT;
 const maxd=Math.max.apply(null,e.s.map(s=>s.d)),pmax=Math.ceil(maxd+0.9),pmin=0;
 const Itop=24,ybase=Itop+tot,peakH=150,base=ybase+28+peakH,H=base+48;
 return {e:e,hs:hs,tot:tot,pmax:pmax,pmin:pmin,Itop:Itop,ybase:ybase,peakH:peakH,base:base,H:H,x0:56,x1:884};
}
const XP=(L,p)=>L.x0+(L.pmax-p)/(L.pmax-L.pmin)*(L.x1-L.x0);
function yAt(comps,p,sg){let y=0;for(const c of comps)for(const l of c){const u=(p-l.p)/sg;y+=l.w*Math.exp(-u*u/2);}return y;}
function drawSpec(){
 const L=layout(),e=L.e,hs=L.hs,svg=$('spec');
 svg.setAttribute('viewBox','0 0 900 '+L.H);
 let g='';
 if($('grade').checked){
  const n=Math.round(L.tot/6);
  for(let k=0;k<=n+6;k++){const y=L.ybase-k*6;if(y<L.Itop-12)break;const cm=k%10===0,half=k%5===0;
   g+='<line x1="'+L.x0+'" y1="'+y+'" x2="'+L.x1+'" y2="'+y+'" stroke="'+(cm?'#8d97a2':half?'#c5cbd2':'#e4e7ea')+'" stroke-width="'+(cm?1.2:1)+'"/>';
   if(cm)g+='<text x="'+(L.x0-6)+'" y="'+(y+4)+'" font-size="12" text-anchor="end" fill="#5b6672">'+(k/10)+' cm</text>';}
 }
 g+='<line x1="'+L.x0+'" y1="'+L.base+'" x2="'+L.x1+'" y2="'+L.base+'" stroke="#1f2933" stroke-width="1.4"/>';
 for(let t=L.pmax;t>=L.pmin;t--){const x=XP(L,t);g+='<line x1="'+x+'" y1="'+L.base+'" x2="'+x+'" y2="'+(L.base+6)+'" stroke="#1f2933"/><text x="'+x+'" y="'+(L.base+22)+'" font-size="13" text-anchor="middle" fill="#1f2933">'+t+'</text>';
  if(t>L.pmin)for(let m=1;m<5;m++){const xm=XP(L,t-m/5);g+='<line x1="'+xm+'" y1="'+L.base+'" x2="'+xm+'" y2="'+(L.base+3)+'" stroke="#7a838d"/>';}}
 g+='<text x="'+L.x1+'" y="'+(L.H-4)+'" font-size="12" text-anchor="end" fill="#5b6672">δ (ppm)</text>';
 const comps=e.s.map(s=>linesOf(s).map(l=>({p:l.p,w:l.w*s.h})));
 const sg=0.02,N=900;let mx=0;const ys=[];
 for(let i=0;i<=N;i++){const p=L.pmax-(L.pmax-L.pmin)*i/N,y=yAt(comps,p,sg);ys.push(y);if(y>mx)mx=y;}
 let path='';ys.forEach((y,i)=>{const p=L.pmax-(L.pmax-L.pmin)*i/N;path+=(i?'L':'M')+XP(L,p).toFixed(1)+' '+(L.base-y/mx*L.peakH).toFixed(1);});
 g+='<path d="'+path+'" fill="none" stroke="#1f2933" stroke-width="1.5"/>';
 e.s.forEach(s=>{const yy=L.base-yAt(comps,s.d,sg)/mx*L.peakH;g+='<text x="'+XP(L,s.d)+'" y="'+(yy-8)+'" font-size="18" font-weight="600" text-anchor="middle" fill="'+s.col+'">'+s.id+'</text>';});
 let cum=0,d='M'+L.x0+' '+L.ybase;
 e.s.forEach((s,i)=>{const xc=XP(L,s.d),rw=s.m==='m'?Math.max(16,(s.w||0.1)/(L.pmax-L.pmin)*(L.x1-L.x0)):14;
  d+=' L'+(xc-rw)+' '+(L.ybase-cum*UNIT);cum+=hs[i];d+=' L'+(xc+rw)+' '+(L.ybase-cum*UNIT);});
 d+=' L'+L.x1+' '+(L.ybase-cum*UNIT);
 g+='<path d="'+d+'" fill="none" stroke="#b5651d" stroke-width="2.2" stroke-linejoin="round"/>';
 Object.keys(S.marks).forEach(k=>{const m=S.marks[k],col=e.s[k].col;
  g+='<line x1="'+m.x+'" y1="'+m.y1+'" x2="'+m.x+'" y2="'+m.y2+'" stroke="'+col+'" stroke-width="2.5"/><circle cx="'+m.x+'" cy="'+m.y1+'" r="3.5" fill="'+col+'"/><circle cx="'+m.x+'" cy="'+m.y2+'" r="3.5" fill="'+col+'"/>';});
 S.clicks.forEach(c=>{g+='<circle cx="'+c.x+'" cy="'+c.y+'" r="4" fill="none" stroke="#b3261e" stroke-width="2"/>';});
 svg.innerHTML=g;
 svg.classList.toggle('medindo',S.tool!==null);
}
function svgPt(ev){const svg=$('spec'),pt=svg.createSVGPoint();pt.x=ev.clientX;pt.y=ev.clientY;return pt.matrixTransform(svg.getScreenCTM().inverse());}
function onSpecClick(ev){
 const p=svgPt(ev);
 if(S.tool!==null){
  S.clicks.push({x:p.x,y:p.y});
  if(S.clicks.length===2){
   const a=S.clicks[0],b=S.clicks[1],cm=Math.round(Math.abs(a.y-b.y)/UNIT*10)/10;
   S.marks[S.tool]={x:(a.x+b.x)/2,y1:a.y,y2:b.y};S.meas[S.tool]=cm;S.tool=null;S.clicks=[];
   $('mhint').textContent='Medido. Você pode corrigir o valor digitando.';drawTable();
  }else $('mhint').textContent='Agora clique no topo do degrau.';
  drawSpec();return;
 }
 const L=layout();if(p.y<L.base-L.peakH-30||p.y>L.base+4)return;
 const ppm=L.pmax-(p.x-L.x0)/(L.x1-L.x0)*(L.pmax-L.pmin);
 let best=-1,bd=0.35;L.e.s.forEach((s,i)=>{const dd=Math.abs(s.d-ppm);if(dd<bd){bd=dd;best=i;}});
 if(best>=0){S.sel=best;drawChips();drawZoom();drawPanel();}
}
function sumMeas(){return S.meas.reduce((a,v)=>a+(v>0?v:0),0);}
function drawTable(){
 const e=E(),Ht=e.Hint||e.f.H,sum=sumMeas();
 let h='<table><tr><th>Sinal</th><th>Degrau (cm)</th><th></th><th>Regra de três</th><th>H</th></tr>';
 e.s.forEach((s,i)=>{
  const m=S.meas[i],calc=(m>0&&sum>0)?fmt(m*Ht/sum,2):'';
  h+='<tr><td><b style="color:'+s.col+'">'+s.id+'</b></td><td><input type="text" style="width:84px" data-pvm="'+i+'" value="'+(m>0?String(m).replace('.',','):'')+'" inputmode="decimal" aria-label="Degrau do sinal '+s.id+' em cm"></td><td><button type="button" data-pvtool="'+i+'" title="Medir na curva">medir</button></td><td class="num">'+(calc?fmt(m,1)+' × '+Ht+' ÷ '+fmt(sum,1)+' = <b>'+calc+'</b>':'')+'</td><td><input type="number" step="1" min="0" data-pvi="'+i+'" value="'+(S.ints[i]!=null?S.ints[i]:'')+'" aria-label="H do sinal '+s.id+'"></td></tr>';});
 const si=S.ints.reduce((a,v)=>a+(v>0?v:0),0);
 h+='<tr><td><b>Soma</b></td><td><b>'+fmt(sum,1)+' cm</b></td><td></td><td class="psm">'+(sum>0?fmt(sum,1)+' cm equivalem a '+Ht+' H':'preencha os degraus')+'</td><td><b>'+si+'</b> de '+Ht+' H</td></tr></table>';
 $('tbl').innerHTML=h;
}
function drawTableKeep(){
 const act=document.activeElement,key=act&&act.dataset?(act.dataset.pvm!==undefined?'pvm='+act.dataset.pvm:act.dataset.pvi!==undefined?'pvi='+act.dataset.pvi:null):null;
 drawTable();
 if(key){const kv=key.split('='),el=$('tbl').querySelector('[data-'+kv[0]+'="'+kv[1]+'"]');if(el){el.focus();try{el.setSelectionRange(el.value.length,el.value.length);}catch(e){}}}
}
function onTblInput(ev){
 const t=ev.target;
 if(t.dataset.pvm!==undefined){const v=parseFloat(String(t.value).replace(',','.'));S.meas[+t.dataset.pvm]=isNaN(v)?0:v;delete S.marks[+t.dataset.pvm];drawTableKeep();drawSpec();}
 else if(t.dataset.pvi!==undefined){const v=parseInt(t.value,10);S.ints[+t.dataset.pvi]=isNaN(v)?undefined:v;drawTableKeep();}
}
function onTblClick(ev){
 const b=ev.target.closest('[data-pvtool]');if(!b)return;
 S.tool=+b.dataset.pvtool;S.clicks=[];delete S.marks[S.tool];
 $('mhint').textContent='Medindo o sinal '+E().s[S.tool].id+': clique na base do degrau (onde o patamar de baixo termina).';
 drawSpec();$('spec').scrollIntoView({block:'center',behavior:'smooth'});
}
function chk1(){
 const e=E(),Ht=e.Hint||e.f.H,hs=heightsFor(S.ex),sum=sumMeas(),R=[];
 if(!(sum>0)){$('fb1').innerHTML='<div class="pbad">Revisar: meça os degraus primeiro.</div>';return;}
 let allOk=true,tot=0;
 e.s.forEach((s,i)=>{
  const v=S.ints[i];tot+=(v>0?v:0);
  if(v==null||isNaN(v)){allOk=false;R.push(['pbad','Sinal '+s.id+': escreva o H arredondado.']);return;}
  const calc=(S.meas[i]||0)*Ht/sum;
  if(v===s.h)R.push(['pok','Sinal '+s.id+': '+v+' H certo.']);
  else{allOk=false;const mc=S.meas[i]>0&&Math.round(calc)===s.h;
   R.push(['pbad','Sinal '+s.id+': você escreveu '+v+' H. '+(Math.round(calc)!==v?'O arredondamento da regra de três dá '+Math.round(calc)+'. ':'')+(mc?'':'Meça de novo esse degrau: o desenhado tem perto de '+fmt(hs[i],1)+' cm.')]);}
 });
 if(tot!==Ht)R.push(['pbad','A soma dos H dá '+tot+' e a fórmula tem '+Ht+'. A soma dos inteiros tem de bater com a fórmula.']);
 else R.push(['pok','A soma dos H bate com a fórmula.']);
 if(allOk&&tot===Ht)R.push(['ptip','Integração fechada. Agora leia cada sinal (δ, tipo de H, formato e vizinhos) no painel abaixo.']);
 $('fb1').innerHTML=R.map(r=>'<div class="'+r[0]+'">'+(r[0]==='pok'?'Certo: ':r[0]==='pbad'?'Revisar: ':'')+r[1]+'</div>').join('');
}
function drawZoom(){
 const e=E(),svg=$('zoom');
 if(S.sel===null){svg.innerHTML='<text x="300" y="100" text-anchor="middle" fill="#777">Escolha um sinal</text>';$('zt').textContent='Multipleto ampliado';$('zinfo').textContent='';return;}
 const s=e.s[S.sel],lines=linesOf(s),ps=lines.map(l=>l.p),span=Math.max.apply(null,ps)-Math.min.apply(null,ps);
 const half=Math.max(0.1,span/2+0.07),a=s.d-half,b=s.d+half,W=600,Lm=20,Rm=20,base=150,pk=110,X=p=>Lm+(b-p)/(b-a)*(W-Lm-Rm);
 const gw=s.m==='m'?0.012:1.6/FQ,N=700;let ys=[],mx=0;
 for(let i=0;i<=N;i++){const p=a+(b-a)*i/N;let y=0;for(const l of lines){const u=(p-l.p)/(gw/2);y+=l.w/(1+u*u);}ys.push(y);if(y>mx)mx=y;}
 let path='';for(let i=0;i<=N;i++){const p=a+(b-a)*i/N;path+=(i?'L':'M')+X(p).toFixed(1)+' '+(base-ys[i]/mx*pk).toFixed(1);}
 let g='<path d="'+path+'" fill="none" stroke="'+s.col+'" stroke-width="2"/><line x1="'+Lm+'" y1="'+base+'" x2="'+(W-Rm)+'" y2="'+base+'" stroke="#555"/>';
 for(let i=0;i<=4;i++){const p=a+(b-a)*i/4;g+='<line x1="'+X(p)+'" y1="'+base+'" x2="'+X(p)+'" y2="'+(base+5)+'" stroke="#555"/>';}
 if(s.m!=='m'&&lines.length<=8){const mw=Math.max.apply(null,lines.map(q=>q.w));lines.slice().sort((x,y)=>y.p-x.p).forEach((l,k)=>{g+='<text x="'+X(l.p)+'" y="'+(base-(l.w/mw)*pk-8)+'" text-anchor="middle" font-size="12" fill="#555">'+(k+1)+'</text>';});}
 if(!s.cp&&s.m!=='m'&&NV[s.m]>=1){const sl=lines.slice().sort((x,y)=>y.p-x.p),x1=X(sl[0].p),x2=X(sl[1].p);g+='<line x1="'+x1+'" y1="'+(base+34)+'" x2="'+x2+'" y2="'+(base+34)+'" stroke="#333"/><line x1="'+x1+'" y1="'+(base+29)+'" x2="'+x1+'" y2="'+(base+39)+'" stroke="#333"/><line x1="'+x2+'" y1="'+(base+29)+'" x2="'+x2+'" y2="'+(base+39)+'" stroke="#333"/><text x="'+((x1+x2)/2)+'" y="'+(base+52)+'" text-anchor="middle" font-size="12" fill="#333">J ≈ '+fmt(s.J,1)+' Hz</text>';}
 svg.innerHTML=g;$('zt').textContent='Sinal '+s.id+', ampliado';
 let info;
 if(s.m==='m')info='Multipleto: vários acoplamentos sobrepostos, não dá para contar picos.';
 else if(s.cp)info=lines.length+' picos. Cada acoplamento desdobra o sinal de novo.';
 else{const n=NV[s.m];info=(n+1)+' '+(n+1===1?'pico':'picos')+(n>=1?', alturas relativas '+binom(n).join(' : ')+'. A distância entre picos vizinhos (em Hz) é a constante J.':'. Um pico só.');}
 $('zinfo').textContent=info+' Larguras e J são típicos, não medidos do gráfico do livro.';
}
function drawChips(){
 const e=E();
 $('chips').innerHTML=e.s.map((s,i)=>'<button type="button" class="pchip" data-pvchip="'+i+'" aria-pressed="'+(S.sel===i)+'" style="border-color:'+s.col+'">'+(S.done[i]?'✓ ':'')+'<b style="color:'+s.col+'">'+s.id+'</b> ler no eixo</button>').join('');
}
function grupoOf(s){if(s.cat==='aro')return 'aro';if(s.cat==='vin')return 'vin';if(s.cat==='ald')return 'cho';if(s.cat==='troc'||s.cat==='acid')return 'oh';return s.h===6?'ch32':s.h===4?'ch22':s.h===3?'ch3':s.h===2?'ch2':'ch';}
const SAK='anaquim-prova-analise-v1';
function saLer(){try{return JSON.parse(localStorage.getItem(SAK)||'{}')||{};}catch(x){return {};}}
function saMsg(txt){const m=$('amsg');if(m)m.textContent=txt;}
function saSalvar(){const e=E(),A=saLer();A[e.id]={t:Date.now(),rows:S.rows,done:S.done,meas:S.meas,ints:S.ints,chain:S.chain};try{localStorage.setItem(SAK,JSON.stringify(A));const d=new Date(A[e.id].t);saMsg('Análise salva em '+d.toLocaleDateString('pt-BR')+' às '+d.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})+'. Ela volta quando você abrir este exercício.');}catch(x){saMsg('Não consegui salvar (o navegador bloqueou o armazenamento).');}}
function saLimpar(){const e=E(),A=saLer();delete A[e.id];try{localStorage.setItem(SAK,JSON.stringify(A));}catch(x){}load(S.ex);saMsg('Análise apagada neste exercício.');}
function saRestaurar(i){const a=saLer()[EX[i].id];if(!a)return false;S.rows=a.rows||{};S.done=a.done||[];if(a.meas)S.meas=a.meas;if(a.ints)S.ints=a.ints;S.chain=a.chain||[];return true;}
const UNI={ch22:'CH₂',ch32:'CH₃'};
function marcaViz(b,on){b.style.background=on?'#cfe6ff':'';b.style.borderWidth=on?'3px':'';const m=b.querySelector('.pvok');if(on&&!m){const i=document.createElement('span');i.className='pvok';i.textContent='✓ ';b.insertBefore(i,b.firstChild);}else if(!on&&m)m.remove();}
function lerViz(){S.viz=[].slice.call(document.querySelectorAll('#pv_fz [data-pvz]')).filter(b=>b.getAttribute('aria-pressed')==='true').map(b=>+b.dataset.pvz);}
function vizOpts(e,i){
 const s=e.s[i],n=NV[s.m];if(n==null)return [];
 const O=[];e.s.forEach((x,k)=>{if(k!==i&&x.cat!=='troc')O.push(k);});
 const out=[];
 (function go(q,sum,acc){
  if(q===O.length){if(sum===n&&acc.length)out.push(acc);return;}
  go(q+1,sum,acc);
  const x=e.s[O[q]];
  go(q+1,sum+x.h,acc.concat([{k:O[q],half:false}]));
  if(UNI[grupoOf(x)])go(q+1,sum+x.h/2,acc.concat([{k:O[q],half:true}]));
 })(0,0,[]);
 return out;
}
function fragTxt(e,i,as){
 const s=e.s[i];if(!as.length)return GR[grupoOf(s)]+' sem vizinho com H';
 return as.map(a=>{const x=e.s[a.k];return (a.half?UNI[grupoOf(x)]:GR[grupoOf(x)])+' ('+x.id+')';}).join(' + ')+' ↔ ['+GR[grupoOf(s)]+']';
}
function drawPanel(){
 const e=E();
 if(S.sel===null){$('panel').innerHTML='<span class="psm">Escolha um sinal (ou clique no pico).</span>';$('pt').textContent='2. Significado do pico';return;}
 const s=e.s[S.sel];$('pt').textContent='2. Significado do sinal '+s.id;S.viz=[];
 const opt=Object.keys(CATS).map(k=>'<option value="'+k+'">'+CATS[k].n+' ('+CATS[k].r+')</option>').join('');
 const mo=Object.keys(MN).map(k=>'<option value="'+k+'">'+MN[k]+'</option>').join('');
 const outros=e.s.map((x,k)=>({x:x,k:k})).filter(o=>o.k!==S.sel&&o.x.cat!=='troc');
 $('panel').innerHTML='<div class="psm" style="margin-bottom:8px">Na ordem do seu método: H do sinal, δ, faixa, grupo, tipo, H vizinhos e as possibilidades de grupos vizinhos. Leia o δ no eixo, como na prova.</div>'
 +'<dl><dt>1. Nº de H do sinal</dt><dd><input type="number" id="pv_fh" min="0" max="12"></dd>'
 +'<dt>2. δ que você lê (ppm)</dt><dd><input type="number" id="pv_fd" step="0.05"></dd>'
 +'<dt>3. Faixa do δ (tipo de H)</dt><dd><select id="pv_fcat"><option value="">escolha</option>'+opt+'</select></dd>'
 +'<dt>4. Grupo possível</dt><dd><select id="pv_fg"><option value="">escolha</option>'+Object.keys(GR).map(k=>'<option value="'+k+'">'+GR[k]+'</option>').join('')+'</select></dd>'
 +'<dt>5. Tipo (s, d, t, q...)</dt><dd><select id="pv_fm"><option value="">escolha</option>'+mo+'</select></dd>'
 +'<dt>6. H vizinhos</dt><dd>'+(s.m==='m'?'<span class="psm">não se conta em multipleto</span>':'<input type="number" id="pv_fv" min="0" max="12">')+'</dd>'
 +'<dt>7. Possibilidades de vizinhos</dt><dd>'+(s.m==='m'?'<span class="psm">não se monta em multipleto</span>':'<div class="psm" style="margin-bottom:4px">Marque os sinais cujos H somam os H vizinhos do item 6. Sem vizinho com H, não marque nada.</div><div class="pchips" id="pv_fz">'+outros.map(o=>'<button type="button" data-pvz="'+o.k+'" aria-pressed="false" style="border-color:'+o.x.col+'"><b style="color:'+o.x.col+'">'+o.x.id+'</b> '+GR[grupoOf(o.x)]+' ('+o.x.h+' H)</button>').join('')+'</div>')+'</dd></dl>'
 +'<div class="prow" style="margin-top:10px"><button type="button" class="pri" id="pv_check">Conferir</button></div><div id="pv_fb" class="pfb" style="margin-top:10px"></div>';
 $('check').onclick=checkAnswer;
 const z=$('fz');if(z)z.onclick=ev=>{const b=ev.target.closest('[data-pvz]');if(!b)return;const agora=Date.now();if(b._t&&agora-b._t<350)return;b._t=agora;const on=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',on?'true':'false');marcaViz(b,on);lerViz();};
}
function checkAnswer(){
 const e=E(),s=e.s[S.sel],R=[];lerViz();
 const dl=$('fd').value,cat=$('fcat').value,g=$('fg').value,m=$('fm').value,hh=$('fh').value;
 R.push(hh!==''&&+hh===s.h?['pok','Nº de H certo.']:['pbad','Nº de H: use o degrau do passo 1 (regra de três). Se ainda não fez, confira a integração acima.']);
 R.push(dl===''?['pbad','δ: leia no eixo onde o pico cai. O valor do gráfico é '+fmt(s.d,2)+' ppm.']:Math.abs(+dl-s.d)<=0.15?['pok','δ lido certo (o gráfico dá '+fmt(s.d,2)+' ppm; aceito até 0,15 ppm de diferença).']:['pbad','δ: você leu '+dl+' e o gráfico dá '+fmt(s.d,2)+' ppm. Trace uma linha do topo do pico até o eixo e veja entre quais números ela cai.']);
 R.push(cat===s.cat?['pok','Faixa certa: '+CATS[s.cat].n+' ('+CATS[s.cat].r+').']:['pbad','Faixa: em δ '+fmt(s.d,2)+' o esperado é '+CATS[s.cat].n+' ('+CATS[s.cat].r+').']);
 R.push(g===grupoOf(s)?['pok','Grupo certo: '+GR[grupoOf(s)]+'.']:['pbad','Grupo: o sinal tem '+s.h+' H e δ '+fmt(s.d,2)+'. Que grupo tem esse número de H?']);
 R.push(m===s.m?['pok','Tipo certo.']:['pbad','Tipo: conte os picos na ampliação e veja se há mais de um J.']);
 const vi=$('fv');
 if(vi)R.push(vi.value!==''&&+vi.value===NV[s.m]?['pok','H vizinhos certo.']:['pbad','H vizinhos: picos menos 1.']);
 if(vi){
  const n=NV[s.m],op=vizOpts(e,S.sel),mark=S.viz.slice().sort((a,b)=>a-b).join(',');
  const lista=op.length?op.map(as=>fragTxt(e,S.sel,as)).join('; '):'nenhuma combinação dos outros sinais soma '+n;
  const casa=op.filter(as=>as.map(a=>a.k).sort((x,y)=>x-y).join(',')===mark);
  if(n===0)R.push(S.viz.length===0?['pok','Sem vizinho com H: o vizinho é C=O, O ou carbono sem H.']:['pbad','Singleto: 0 H vizinhos, então não marque nenhum sinal.']);
  else R.push(casa.length?['pok','Possibilidade certa: '+fragTxt(e,S.sel,casa[0])+' (soma '+n+' H).'+(op.length>1?' Há '+op.length+' possibilidades pelos H: '+lista+'. A estrutura decide qual vale.':'')]:['pbad','Possibilidades: você marcou '+(S.viz.length?S.viz.map(k=>e.s[k].id).sort().join(' + '):'nenhum sinal')+' e isso não dá '+n+' H vizinhos. Combinações que fecham: '+lista+'.']);
  S.fragOK=casa.length?fragTxt(e,S.sel,casa[0]):'';
 }
 const ok=R.every(r=>r[0]==='pok');S.done[S.sel]=ok;
 if(ok){S.rows[S.sel]={h:s.h,d:fmt(s.d,2),g:GR[grupoOf(s)],m:s.m,v:s.m==='m'?'x':NV[s.m],f:s.m==='m'?'multipleto':(S.fragOK||GR[grupoOf(s)]+' sem vizinho com H')};}
 drawChips();drawGate();drawRows();
 $('fb').innerHTML=R.map(r=>'<div class="'+r[0]+'">'+(r[0]==='pok'?'Certo':'Revisar')+': '+r[1]+'</div>').join('');
}
function drawRows(){
 const e=E(),el=$('tab');if(!el)return;
 const ks=Object.keys(S.rows).map(Number).sort((a,b)=>a-b);
 el.innerHTML=ks.length?'<table><thead><tr><th>Sinal</th><th>H</th><th>δ</th><th>Grupo</th><th>Tipo</th><th>H viz.</th><th>Vizinhos possíveis</th></tr></thead><tbody>'+ks.map(k=>{const r=S.rows[k],s=e.s[k];return '<tr><td><b style="color:'+s.col+'">'+s.id+'</b></td><td>'+r.h+'</td><td>'+r.d+'</td><td>'+r.g+'</td><td>'+r.m+'</td><td>'+r.v+'</td><td>'+r.f+'</td></tr>';}).join('')+'</tbody></table>':'<span class="psm">Cada sinal que você conferir certo entra aqui, na ordem do seu caderno.</span>';
}
function drawEnun(){
 const e=E(),f=e.f;
 $('enun').innerHTML='<h2>'+e.nome+'</h2><p style="margin:0 0 8px"><b>Fórmula:</b> '+sub(e.fs)+' · '+e.enun+'</p>'
 +'<div class="prow"><label>GDH (grau de insaturação) <input type="number" id="pv_gdh"></label><button type="button" id="pv_gdhb">Conferir</button><span id="pv_gdhr" class="psm"></span></div>'
 +'<p class="psm" style="margin:6px 0 0">H total que a regra de três usa: <b>'+(e.Hint||f.H)+'</b>'+(e.Hint?' (a fórmula tem '+f.H+', mas só '+e.Hint+' H aparecem integrados)':' (é o H da fórmula)')+'.</p><p class="psm" style="margin:4px 0 0">'+e.fonteNota+'</p>';
 $('gdhb').onclick=()=>{const v=$('gdh').value,d=(2*f.C+2+f.N-f.H-f.X)/2;$('gdhr').innerHTML=(v!==''&&+v===d)?'<span class="pok">Certo: (2·'+f.C+' + 2 '+(f.N?'+ '+f.N+' ':'')+'− '+f.H+') ÷ 2 = '+d+'.</span>':'<span class="pbad">Revisar: GDH = (2C + 2 + N − H − X) ÷ 2. Aqui dá '+d+'.</span>';};
}
function atomC(txt,letra){const e=E(),i=e.s.findIndex(s=>s.id===letra),col=i>=0?e.s[i].col:'#1f2933';return '<span class="pat" style="color:'+col+'">'+sub(txt)+(letra?'<i>'+letra+'</i>':'')+'</span>';}
function drawSol(){
 const e=E();
 let h='<div class="pmol" style="font-size:19px">'+e.est.map(a=>atomC(a[0],a[1])).join(' ')+'</div>';
 h+=anaOf(e).map(p=>'<div class="ppr"><h4>'+p[0]+'</h4>'+p[1]+'</div>').join('');
 h+='<div class="prow" style="margin-top:8px"><span>Você chegou à estrutura certa?</span><button type="button" class="pok" id="pv_acertei">Acertei</button><button type="button" class="pbad" id="pv_errei">Errei</button></div>';
 $('sol').innerHTML=h;
 $('acertei').onclick=()=>{SAVED[e.id]='ok';save();drawProg();};
 $('errei').onclick=()=>{SAVED[e.id]='no';save();drawProg();};
}
function drawGate(){
 const e=E(),n=e.s.filter((s,i)=>S.done[i]).length,all=n===e.s.length;
 ['c4'].forEach(id=>{$(id).style.opacity=(all||S.force)?'1':'.45';});
 $('gate').innerHTML=all||S.force?'':'<div class="pcuid">Antes de montar a estrutura, confira cada sinal no passo 2 ('+n+' de '+e.s.length+' certos). <button type="button" id="pv_skipg">Pular e montar assim mesmo</button></div>';
 const sk=$('skipg');if(sk)sk.onclick=()=>{S.force=true;drawGate();};
}
const pl=p=>sub(p[0])+(p[1]?' <b>('+p[1]+')</b>':'');
function poolOrder(){const e=E(),r=rng(S.ex*131+7),idx=e.est.map((_,i)=>i);for(let i=idx.length-1;i>0;i--){const j=Math.floor(r()*(i+1));const t=idx[i];idx[i]=idx[j];idx[j]=t;}return idx;}
function drawBuild(){
 const e=E();if(!S.order)S.order=poolOrder();
 $('pool').innerHTML=S.order.filter(i=>S.chain.indexOf(i)<0).map(i=>{const p=e.est[i],sg=p[1]?e.s.find(s=>s.id===p[1]):null;
  return '<button type="button" class="pchip" data-pvp="'+i+'" style="border-color:'+(sg?sg.col:'#888')+'">'+pl(p)+'</button>';}).join('')||'<span class="psm">todas colocadas</span>';
 $('chain').innerHTML=S.chain.length?S.chain.map((i,k)=>'<button type="button" class="pchip" data-pvc="'+k+'" style="border-color:#1f2933">'+pl(e.est[i])+'</button>').join('<span>–</span>'):'<span class="psm">vazia</span>';
}
function chk4(){
 const e=E(),n=e.est.length,lab=i=>{const p=e.est[i];return p[0]+(p[1]?' ('+p[1]+')':'');},key=i=>e.est[i][0]+'|'+(e.est[i][1]||'');
 if(S.chain.length<n){$('fb4').innerHTML='<div class="pbad">Revisar: faltam peças ('+S.chain.length+' de '+n+').</div>';return;}
 const tgt=e.est.map((_,i)=>key(i)),usr=S.chain.map(key),eq=(a,b)=>a.every((v,k)=>v===b[k]);
 let ok=eq(usr,tgt)||eq(usr,tgt.slice().reverse());
 if(!ok&&e.ring){for(let r=0;r<n&&!ok;r++){const rot=tgt.map((_,k)=>tgt[(k+r)%n]);if(eq(usr,rot)||eq(usr,rot.slice().reverse()))ok=true;}}
 if(ok){$('fb4').innerHTML='<div class="pok">Certo: estrutura montada. '+(e.ring?'Lembre que as duas pontas se ligam e fecham o anel. ':'')+'Escreva no caderno e confira os H de cada grupo com a fórmula.</div>';return;}
 const good={};for(let i=0;i<n-(e.ring?0:1);i++){const x=key(i),y=key((i+1)%n);good[x+'#'+y]=1;good[y+'#'+x]=1;}
 const bad=[];for(let k=0;k<n-1;k++)if(!good[usr[k]+'#'+usr[k+1]])bad.push(lab(S.chain[k])+' ligado a '+lab(S.chain[k+1]));
 $('fb4').innerHTML=(bad.length?'<div class="pbad">Revisar: estas ligações não existem: '+bad.join('; ')+'.</div>':'<div class="pbad">Revisar: as ligações estão certas, mas a ordem das peças não bate.</div>')+'<div class="ptip">Use a regra: o número de H que um sinal enxerga é o número de H do grupo ao lado dele. Peça "Dica de encaixe" se quiser a frase de cada sinal.</div>';
}
function dica4(){
 const e=E(),L=e.s.filter(s=>s.m!=='m').map(s=>'<div class="ptip">Sinal '+s.id+' ('+GR[grupoOf(s)]+', '+MN[s.m]+'): enxerga '+NV[s.m]+' H do lado.'+(NV[s.m]===0?' O vizinho não tem H (C=O, O, anel sem H).':'')+'</div>').join('');
 $('fb4').innerHTML=L+'<div class="ptip">Procure pares: se um sinal enxerga 3 H, o vizinho é um CH₃, e esse CH₃ tem de enxergar o H dele de volta.</div>';
}
function drawProg(){
 const ok=EX.filter(e=>SAVED[e.id]==='ok').length,no=EX.filter(e=>SAVED[e.id]==='no').length;
 $('prog').textContent='Acertei '+ok+' de '+EX.length+(no?' · para refazer: '+no:'');
 [].slice.call($('exsel').options).forEach((o,i)=>{const e=EX[i];o.textContent=(SAVED[e.id]==='ok'?'✓ ':SAVED[e.id]==='no'?'↻ ':'')+(e.rot||e.nome);});
}
function load(i){
 S.ex=i;S.sel=null;S.meas=[];S.ints=[];S.tool=null;S.clicks=[];S.marks={};S.chain=[];S.order=null;S.done=[];S.rows={};S.viz=[];S.force=false;
 $('fb1').innerHTML='';$('sol').innerHTML='';$('fb4').innerHTML='';
 if(EX[i].id==='43A')S.meas=AULA.slice();
 const _rest=saRestaurar(i);
 drawEnun();drawTable();drawSpec();drawChips();drawZoom();drawPanel();drawRows();drawBuild();drawGate();
 if(_rest){const d=new Date(saLer()[EX[i].id].t);saMsg('Análise salva em '+d.toLocaleDateString('pt-BR')+' às '+d.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})+' (restaurada).');}else saMsg('');
}
const HTML='<div class="pv">'
+'<h3 style="margin:0 0 4px">Treino de prova</h3>'
+'<div class="prow" style="margin-bottom:8px"><button type="button" class="pri" id="pv_nh">¹H com régua</button><button type="button" id="pv_nc">¹³C: leitura dos sinais</button></div><div id="pv_hbody">'
+'<p class="hint" style="margin:0 0 8px">Você mede os degraus da curva de integração, faz a regra de três, lê cada sinal (δ, grupo, formato, vizinhos), monta a estrutura e escreve o significado de cada pico, como na prova. 8 problemas 4.3 do Silverstein e 5 espectros da folha da aula.</p>'
+'<div class="pcard" id="pv_metodo"><h2>O método da sua aula</h2><div class="ppasso"><ol><li><mark class="b">Meça</mark> o degrau de cada sinal com a régua (em cm).</li><li><mark class="b">Some</mark> todos os degraus.</li><li>Regra de três: <mark class="y">soma dos degraus ↔ H total da fórmula</mark>, então <mark class="y">degrau ↔ x</mark>. Fórmula: <b>x = degrau × H total ÷ soma</b>.</li><li><mark class="b">Arredonde</mark> cada x para inteiro. A soma dos inteiros tem de dar o H total.</li></ol></div><p class="psm" style="margin:6px 0 0">Exemplo da aula, 2-hexanona (C₆H₁₂O, 12 H): degraus 0,6; 0,8; 0,6; 0,6; 0,9. Soma = 3,5. Então 0,6 × 12 ÷ 3,5 = 2,06, que arredonda para <b>2 H</b>. O exercício A já vem com esses números.</p></div>'
+'<div class="pcard prow"><label><b>Exercício</b> <select id="pv_exsel" style="max-width:calc(100vw - 80px)"></select></label><label class="psm"><input type="checkbox" id="pv_grade" checked> linhas de régua (1 mm)</label><span class="pprog" id="pv_prog"></span></div>'
+'<div class="pcard" id="pv_enun"></div>'
+'<div class="pcard" style="overflow-x:auto"><svg id="pv_spec" style="min-width:720px" viewBox="0 0 900 500" role="img" aria-label="Espectro com curva de integração"></svg><div class="psm" id="pv_mhint" style="margin-top:6px">As linhas finas são de 1 mm e as mais escuras de 5 mm. A curva sobe em degraus: cada degrau é o sinal que está embaixo dele.</div></div>'
+'<div class="pcard" id="pv_c1"><h2>1. Integração: medir, somar, regra de três</h2><div id="pv_tbl"></div><div class="prow" style="margin-top:8px"><button type="button" class="pri" id="pv_chk1">Conferir integração</button></div><div id="pv_fb1" class="pfb" style="margin-top:8px"></div></div>'
+'<div class="pgrid"><div class="pcard"><h2 id="pv_zt">Multipleto ampliado</h2><svg id="pv_zoom" viewBox="0 0 600 216" role="img" aria-label="Multipleto ampliado"></svg><div id="pv_zinfo" class="psm"></div></div><div class="pcard"><h2 id="pv_pt">2. Significado do pico</h2><div class="pchips" id="pv_chips"></div><div id="pv_panel"><span class="psm">Escolha um sinal.</span></div></div></div>'
+'<div class="pcard"><h2>Sua tabela do caderno</h2><div id="pv_tab" style="overflow-x:auto"></div><div class="prow" style="margin-top:10px"><button type="button" class="pok" id="pv_asave">Salvar análise</button><button type="button" class="pbad" id="pv_aclear">Apagar análise</button></div><div class="psm" id="pv_amsg" style="margin-top:6px"></div></div>'
+'<div id="pv_gate"></div>'
+'<div class="pcard" id="pv_c4"><h2>3. Montar a estrutura</h2><p class="psm" style="margin-top:0">Clique nas peças na ordem em que elas ficam ligadas, da esquerda para a direita. Clique numa peça já colocada para tirar. As peças <b>sem letra</b> (O, C=O, NO₂) não dão sinal de H: vêm da fórmula e do GDH.</p><div class="psm" style="margin-bottom:4px">Peças:</div><div class="pchips" id="pv_pool"></div><div class="psm" style="margin:8px 0 4px">Sua estrutura:</div><div class="pmol" id="pv_chain" style="min-height:48px;display:flex;flex-wrap:wrap;gap:4px;align-items:center;width:100%"></div><div class="prow" style="margin-top:10px"><button type="button" class="pri" id="pv_chk4">Conferir estrutura</button><button type="button" id="pv_dica4">Dica de encaixe</button><button type="button" id="pv_clr4">Limpar</button></div><div id="pv_fb4" class="pfb" style="margin-top:8px"></div></div>'
+'<div class="pcard" id="pv_c5"><h2>4. Conferir com a resolução</h2><p class="psm" style="margin-top:0">Escreva a estrutura no caderno, depois revele a resolução passo a passo.</p><div class="prow"><button type="button" class="pri" id="pv_reveal">Revelar resolução</button></div><div id="pv_sol" style="margin-top:10px"></div></div>'
+'<div class="pcuid"><b>Fontes.</b> <span class="pselo">lido do gráfico</span> δ, H e multiplicidades dos 4.3 vêm do Anaquim (problemas 4.3 do Silverstein, 7ª ed. em português), lidos das páginas, então são aproximados. Os J são típicos, não medidos. <b>As alturas dos degraus são minhas</b>: o Anaquim deduziu a integração pela fórmula e não mediu a curva. Gerei alturas em cm a partir do H real, com uma imprecisão de régua. O exercício A usa os números da sua aula. Nos 5 da folha, as explicações de cada sinal são minhas, sem fonte conferida. No livro, use as alturas que você mesma medir.</div>'
+'</div><div id="pv_chost" hidden></div></div>';
let INI=false;
function provaDraw(){
 const pane=document.querySelector('[data-rpane="prova"]');if(!pane)return;
 if(!INI){
  INI=true;pane.innerHTML=HTML;
  EX.forEach((e,i)=>{const o=document.createElement('option');o.value=i;o.textContent=e.rot||e.nome;$('exsel').appendChild(o);});
  $('spec').addEventListener('click',onSpecClick);
  $('tbl').addEventListener('input',onTblInput);$('tbl').addEventListener('click',onTblClick);
  $('chk1').addEventListener('click',chk1);
  $('chips').addEventListener('click',ev=>{const b=ev.target.closest('[data-pvchip]');if(!b)return;S.sel=+b.dataset.pvchip;drawChips();drawZoom();drawPanel();});
  $('pool').addEventListener('click',ev=>{const b=ev.target.closest('[data-pvp]');if(!b)return;S.chain.push(+b.dataset.pvp);$('fb4').innerHTML='';drawBuild();});
  $('chain').addEventListener('click',ev=>{const b=ev.target.closest('[data-pvc]');if(!b)return;S.chain.splice(+b.dataset.pvc,1);$('fb4').innerHTML='';drawBuild();});
  $('clr4').addEventListener('click',()=>{S.chain=[];$('fb4').innerHTML='';drawBuild();});
  $('chk4').addEventListener('click',chk4);$('dica4').addEventListener('click',dica4);
  $('reveal').addEventListener('click',drawSol);
  $('exsel').addEventListener('change',()=>load(+$('exsel').value));
  $('grade').addEventListener('change',drawSpec);
  drawProg();load(0);
  $('asave').addEventListener('click',saSalvar);$('aclear').addEventListener('click',saLimpar);$('nh').addEventListener('click',()=>setNuc('h'));$('nc').addEventListener('click',()=>setNuc('c'));
 }
 setNuc(PVN);
}
let PVN='h';
function setNuc(n){
 PVN=n;const c=n==='c';
 $('hbody').hidden=c;$('chost').hidden=!c;
 $('nh').className=c?'':'pri';$('nc').className=c?'pri':'';
 if(c&&window.leitorAttach)window.leitorAttach('pv_chost','prova13');
}
window.provaDraw=provaDraw;
window.PROVA_VIZ=(i,k)=>vizOpts(EX[i],k).map(as=>as.map(a=>a.k));window.PROVA_EX=EX;window.PROVA_HS=heightsFor;
})();
