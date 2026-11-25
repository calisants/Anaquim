/* ================= ANALORG v13: RMN, aba "Leitor" (¹H e ¹³C, com modo prova) =================
   Trazido do leitor montado no chat "Leitura de RMN de H1". Os 4.3 A–H de ¹H vêm de window.PROVA_EX (analorg11) e os passos das
   resoluções (4.3 e 5.7) vêm de window.RES_BANCO (Praticar). Os espectros de ¹³C 5.7 A–H têm δ lidos das fotos pelo Anaquim (v257), aproximados.
   Exemplos "valores estimados" são típicos de livro-texto, sem fonte conferida. Sem estado salvo. */
(function(){
const CATS={
 alq:{n:'H de alquila simples',r:'1 a 2 ppm',c:'#2f6f8f'},
 alfa:{n:'H em carbono vizinho de C=O, C=C ou anel',r:'2 a 2,5 ppm (até cerca de 3)',c:'#7a5c9e'},
 het:{n:'H em carbono ligado a O, N ou halogênio',r:'3 a 4 ppm (até cerca de 4,5)',c:'#b5651d'},
 vin:{n:'H de alceno (vinílico)',r:'4,5 a 6 ppm',c:'#3d7a4a'},
 aro:{n:'H aromático',r:'6,5 a 8,5 ppm',c:'#a13d63'},
 ald:{n:'H de aldeído',r:'9 a 10 ppm',c:'#8a6d00'},
 acid:{n:'H de ácido carboxílico',r:'10 a 12 ppm',c:'#6b3b2e'},
 troc:{n:'H de OH ou NH (troca rápida)',r:'1 a 5 ppm, muito variável (amida em DMSO chega perto de 10)',c:'#555555'}
};
const CATS13={
 alq:{n:'C sp3 de alquila (CH3, CH2, CH)',r:'8 a 55 ppm'},
 het:{n:'C sp3 ligado a O ou N',r:'30 a 90 ppm (O: 50 a 90; N: 30 a 65)'},
 alk:{n:'C de alceno (sp2)',r:'100 a 150 ppm'},
 aro:{n:'C aromático',r:'110 a 165 ppm'},
 est:{n:'C=O de éster, ácido, amida ou carbamato',r:'160 a 185 ppm (carbamato perto de 157)'},
 ald:{n:'C=O de aldeído',r:'190 a 205 ppm'},
 cet:{n:'C=O de cetona',r:'195 a 220 ppm'}
};
const LC=['#2a5d84','#b5651d','#3d7a4a','#a13d63','#7a5c9e','#8a6d00'];
const MN={s:'singleto',d:'dupleto',t:'tripleto',q:'quarteto',quint:'quinteto',sext:'sexteto',sept:'septeto',dd:'dupleto de dupletos (dd)',sd:'septeto de dupletos',m:'multipleto (m)'};
const NV={s:0,d:1,t:2,q:3,quint:4,sext:5,sept:6,dd:2,sd:7,m:null};
const HL={s:0,d:1,t:2,q:3};
const GL=['C sem H','CH','CH₂','CH₃'];
const nview=s=>s.m==='m'?'multipleto: vários acoplamentos, não se contam vizinhos':(NV[s.m]+(NV[s.m]===1?' vizinho':' vizinhos')+(s.m==='dd'?' (dois H diferentes, um desdobramento para cada)':s.m==='sd'?' (6 H iguais mais 1 H diferente)':''));
const EST='Valores típicos de livro-texto, escritos aqui sem fonte conferida nesta sessão. Confirme no SDBS ou no Silverstein.';
const SRC13="Problemas 5.7 A a H do Silverstein (7ª ed. em português): espectros de 13C fora de ressonância, 25,2 MHz, CDCl3. Os δ e as multiplicidades foram lidos das fotos das páginas pelo Anaquim (v257), então são aproximados. O número de C de cada sinal foi deduzido pela fórmula. As alturas no desenho são só indicativas (em 13C a altura não conta C). O sinal perto de 77 nos espectros do livro é o solvente CDCl3. Resolução: passos de Praticar > Problemas resolvidos.";
const SRCH="Problemas 4.3 do Silverstein (7ª ed. em português). Os δ foram lidos das fotos das páginas pelo Anaquim (v257), então são aproximados. A integração foi deduzida pela fórmula e pelas multiplicidades, não lida da curva. Os J do multipleto ampliado são típicos, não medidos.";
function H(id,nome,fs,f,dbeNota,s,frag,concl,est,fonte){return {nome:nome,fs:fs,f:f,dbeNota:dbeNota,s:s,frag:frag,concl:concl,est:est,fonte:fonte||EST};}
const EXH=[
{nome:'Acetato de etila',fs:'C4H8O2',f:{C:4,H:8,N:0,X:0},dbeNota:'Uma ligação dupla (como C=O) ou um anel.',
 s:[{d:4.12,h:2,m:'q',J:7.1,cat:'het',sig:'CH2 ligado ao O do éster. O oxigênio puxa elétrons e leva o sinal para 4,12. É quarteto porque o CH3 vizinho tem 3 H.'},
    {d:2.05,h:3,m:'s',cat:'alfa',sig:'CH3 ligado ao C=O (acetila). Fica perto de 2 por causa do C=O e é singleto porque o C=O não tem H.'},
    {d:1.26,h:3,m:'t',J:7.1,cat:'alq',sig:'CH3 do grupo etila, longe do O. É tripleto porque o CH2 vizinho tem 2 H.'}],
 frag:'CH3CH2– (A e C têm o mesmo J, então são vizinhos) e CH3C(=O)– (B, sem vizinhos). Sobra 1 O na fórmula.',
 concl:'CH3CH2–O–C(=O)CH3. DBE = 1 (o C=O). Total de H = 2 + 3 + 3 = 8, bate com a fórmula.',
 est:[['CH3','C'],['CH2','A'],['–O–C(=O)–',null],['CH3','B']],
 fonte:'Sigma-Aldrich, tabela de deslocamentos de impurezas em CDCl3 (CH3CO 2,05 s; CH2 4,12 q, J = 7; CH3 1,26 t, J = 7). Conferido na sessão em que o leitor foi montado.'},
{nome:'2-Bromopropano',fs:'C3H7Br',f:{C:3,H:7,N:0,X:1},dbeNota:'Zero: só ligações simples, sem anel.',
 s:[{d:4.32,h:1,m:'sept',J:6.7,cat:'het',sig:'CH ligado ao Br. O halogênio desloca o sinal para cerca de 4,3. É septeto porque os 2 CH3 vizinhos somam 6 H.'},
    {d:1.71,h:6,m:'d',J:6.7,cat:'alq',sig:'Dois CH3 equivalentes. Dupleto porque cada um vê 1 H vizinho (o CH).'}],
 frag:'Dupleto de 6H + septeto de 1H com o mesmo J é a assinatura do isopropila, (CH3)2CH–. O Br completa a valência.',
 concl:'(CH3)2CH–Br. DBE = 0. Total de H = 1 + 6 = 7, bate com a fórmula.',
 est:[['(CH3)2','B'],['CH','A'],['–Br',null]]},
{nome:'4\'-Metilacetofenona',fs:'C9H10O',f:{C:9,H:10,N:0,X:0},dbeNota:'Cinco: por exemplo um anel aromático (4) mais um C=O (1).',
 s:[{d:7.86,h:2,m:'d',J:8.2,cat:'aro',sig:'2 H do anel ao lado do C=O. O C=O puxa elétrons e esses H ficam mais à esquerda. Dupleto porque cada um vê 1 H vizinho no anel.'},
    {d:7.25,h:2,m:'d',J:8.2,cat:'aro',sig:'2 H do anel ao lado do CH3. Menos desblindados que os de 7,86. Dupleto com o mesmo J.'},
    {d:2.57,h:3,m:'s',cat:'alfa',sig:'CH3 do acetil, ligado ao C=O. Singleto: sem H vizinho.'},
    {d:2.41,h:3,m:'s',cat:'alfa',sig:'CH3 ligado ao anel (benzílico). Singleto: sem H vizinho.'}],
 frag:'Dois dupletos de 2H com o mesmo J: anel para-dissubstituído, C6H4. Dois CH3 singletos: um no C=O e um no anel.',
 concl:'CH3–C6H4–C(=O)CH3 (posições 1 e 4). DBE = 5 (anel 4 + C=O 1). Total de H = 2 + 2 + 3 + 3 = 10, bate com a fórmula.',
 est:[['CH3','D'],['–(C6H4)–','A'],['C(=O)',null],['CH3','C']]},
{nome:'Etanol',fs:'C2H6O',f:{C:2,H:6,N:0,X:0},dbeNota:'Zero: só ligações simples, sem anel.',
 s:[{d:3.69,h:2,m:'q',J:7.0,cat:'het',sig:'CH2 ligado ao O. Quarteto porque o CH3 vizinho tem 3 H.'},
    {d:2.60,h:1,m:'s',cat:'troc',sig:'OH. Singleto largo, sem acoplamento, porque o H troca rápido. A posição muda com concentração e solvente.'},
    {d:1.22,h:3,m:'t',J:7.0,cat:'alq',sig:'CH3 do etila. Tripleto porque o CH2 vizinho tem 2 H.'}],
 frag:'CH3CH2– (tripleto + quarteto com o mesmo J). O sinal que sobra, de 1H e largo, é o OH.',
 concl:'CH3CH2–OH. DBE = 0. Total de H = 2 + 1 + 3 = 6, bate com a fórmula.',
 est:[['CH3','C'],['CH2','A'],['OH','B']]},
{nome:'Propanoato de metila',fs:'C4H8O2',f:{C:4,H:8,N:0,X:0},dbeNota:'Uma ligação dupla (como C=O) ou um anel.',
 s:[{d:3.67,h:3,m:'s',cat:'het',sig:'CH3 ligado ao O (OCH3). Singleto: o O não tem H, então não há vizinho.'},
    {d:2.32,h:2,m:'q',J:7.6,cat:'alfa',sig:'CH2 ao lado do C=O. Quarteto porque o CH3 vizinho tem 3 H.'},
    {d:1.14,h:3,m:'t',J:7.6,cat:'alq',sig:'CH3 do etila. Tripleto porque o CH2 vizinho tem 2 H.'}],
 frag:'Mesmos formatos do acetato de etila (s 3H, q 2H, t 3H), mas os δ trocaram. Aqui o CH2 está perto de 2,3 (ao lado do C=O) e o singleto perto de 3,7 (CH3 no O). Só o δ separa os dois isômeros.',
 concl:'CH3CH2–C(=O)–O–CH3. DBE = 1. Total de H = 3 + 2 + 3 = 8, bate com a fórmula.',
 est:[['CH3','C'],['CH2','B'],['–C(=O)–O–',null],['CH3','A']]},
{nome:'Acetaldeído',fs:'C2H4O',f:{C:2,H:4,N:0,X:0},dbeNota:'Uma ligação dupla (como C=O) ou um anel.',
 s:[{d:9.79,h:1,m:'q',J:2.9,cat:'ald',sig:'H do aldeído, muito à esquerda por causa do C=O. Quarteto porque o CH3 vizinho tem 3 H. O J é pequeno, cerca de 3 Hz.'},
    {d:2.21,h:3,m:'d',J:2.9,cat:'alfa',sig:'CH3 ao lado do C=O. Dupleto porque vê 1 H (o do CHO), com o mesmo J pequeno.'}],
 frag:'Um sinal perto de 9,8 só pode ser CHO. O CH3 em 2,2 está ao lado do C=O. Os dois têm o mesmo J, então são vizinhos.',
 concl:'CH3–CHO. DBE = 1. Total de H = 1 + 3 = 4, bate com a fórmula.',
 est:[['CH3','B'],['–CHO','A']]},
{nome:'Desafio: C4H10O',fs:'C4H10O',f:{C:4,H:10,N:0,X:0},dbeNota:'Zero: só ligações simples, sem anel.',
 s:[{d:3.48,h:4,m:'q',J:7.0,cat:'het',sig:'2 CH2 equivalentes, ligados ao O. Quarteto porque cada um vê um CH3 com 3 H.'},
    {d:1.21,h:6,m:'t',J:7.0,cat:'alq',sig:'2 CH3 equivalentes. Tripleto porque cada um vê um CH2 com 2 H.'}],
 frag:'Integração 4:6 reduz a 2:3 (CH2 e CH3 de um etila). Como a fórmula tem 10 H, os dois etilas são idênticos: molécula simétrica. Não há OH.',
 concl:'CH3CH2–O–CH2CH3 (éter dietílico). DBE = 0. Total de H = 4 + 6 = 10, bate com a fórmula.',
 est:[['CH3','B'],['CH2','A'],['–O–',null],['CH2','A'],['CH3','B']]}
];
EXH.forEach(e=>{if(!e.fonte)e.fonte=EST;});
EXH[0].fonte='Sigma-Aldrich, tabela de deslocamentos de impurezas em CDCl3 (CH3CO 2,05 s; CH2 4,12 q, J = 7; CH3 1,26 t, J = 7). Conferido na sessão em que o leitor foi montado.';
for(let i=1;i<EXH.length;i++)EXH[i].fonte=EST;

function c13(id,rot,nome,fs,f,enun,s,est){s.forEach(x=>{x.J=130;x.hl=HL[x.m]});return {id:id,grp:'sv',rot:rot,nome:nome,fs:fs,f:f,enun:enun,s:s,est:est,fonte:SRC13,jt:true};}
const EX13=[
 {nome:'Acetato de etila',fs:'C4H8O2',f:{C:4,H:8,N:0,X:0},dbeNota:'Uma ligação dupla (o C=O).',fonte:EST,
  s:[{d:171.1,n:1,m:'s',cat:'est',sig:'C=O de éster. Singleto: não tem H. Fica na faixa de 160 a 185.'},
     {d:60.5,n:1,m:'t',cat:'het',sig:'OCH2. Tripleto fora de ressonância: 2 H. O oxigênio leva o C para perto de 60.'},
     {d:21.0,n:1,m:'q',cat:'alq',sig:'CH3 da acetila, ligado ao C=O. Quarteto: 3 H.'},
     {d:14.2,n:1,m:'q',cat:'alq',sig:'CH3 do etila, longe do O. Quarteto: 3 H.'}],
  frag:'Quatro sinais para 4 C: nenhum carbono equivalente. O s em 171 é C=O de éster e o t em 60 é OCH2. Os dois q são CH3: um em 21 (ao lado do C=O) e um em 14 (etila).',
  concl:'CH3CH2–O–C(=O)CH3. H nos C–H: 3 + 2 + 3 = 8, igual à fórmula, então não sobra OH nem NH.',
  est:[['CH3','D'],['CH2','B'],['–O–',null],['C(=O)','A'],['CH3','C']]},
 {nome:'4\'-Metilacetofenona',fs:'C9H10O',f:{C:9,H:10,N:0,X:0},dbeNota:'Cinco: anel (4) mais C=O (1).',fonte:EST,
  s:[{d:197.7,n:1,m:'s',cat:'cet',sig:'C=O de cetona aromática (conjugada, um pouco abaixo de 200).'},
     {d:143.9,n:1,m:'s',cat:'aro',sig:'C do anel ligado ao CH3. Singleto: sem H.'},
     {d:134.7,n:1,m:'s',cat:'aro',sig:'C do anel ligado ao C=O. Singleto: sem H.'},
     {d:129.2,n:2,m:'d',cat:'aro',sig:'2 CH do anel equivalentes, ao lado do CH3. Dupleto: 1 H.'},
     {d:128.4,n:2,m:'d',cat:'aro',sig:'2 CH do anel equivalentes, ao lado do C=O. Dupleto: 1 H.'},
     {d:26.5,n:1,m:'q',cat:'alq',sig:'CH3 da acetila. Quarteto: 3 H.'},
     {d:21.6,n:1,m:'q',cat:'alq',sig:'CH3 ligado ao anel. Quarteto: 3 H.'}],
  frag:'Sete sinais para 9 C: dois pares de CH do anel são equivalentes (os dois d valem 2 C cada). Quatro sinais entre 128 e 144 (2 s + 2 d) são o anel para-dissubstituído. O s em 197,7 é C=O de cetona. Os dois q são CH3: um de acetila (26,5) e um no anel (21,6).',
  concl:'CH3–C6H4–C(=O)CH3 (posições 1 e 4). DBE = 5. H nos C–H: 2 + 2 + 3 + 3 = 10, igual à fórmula. É a mesma molécula do exemplo 3 de 1H.',
  est:[['CH3','G'],['–C6H4–','B'],['C(=O)','A'],['CH3','F']]},
 {nome:'Éter dietílico (desafio de simetria)',fs:'C4H10O',f:{C:4,H:10,N:0,X:0},dbeNota:'Zero: só ligações simples.',fonte:EST,
  s:[{d:65.9,n:2,m:'t',cat:'het',sig:'2 OCH2 equivalentes. Tripleto: 2 H. O oxigênio leva o C para perto de 66.'},
     {d:15.2,n:2,m:'q',cat:'alq',sig:'2 CH3 equivalentes. Quarteto: 3 H.'}],
  frag:'Dois sinais para 4 C: cada sinal vale 2 C, então a molécula é simétrica. t + q é uma etila repetida duas vezes.',
  concl:'CH3CH2–O–CH2CH3. DBE = 0. H nos C–H: 2×2 + 2×3 = 10, igual à fórmula. É o desafio C4H10O do 1H visto pelo 13C.',
  est:[['CH3','B'],['CH2','A'],['–O–',null],['CH2','A'],['CH3','B']]},
 c13('57A','5.7 A · C5H10O, C=O em 211,8','5.7 A · 3-metil-2-butanona','C5H10O',{C:5,H:10,N:0,X:0},'C5H10O, C=O em 211,8 ppm. 25,2 MHz, CDCl3, fora de ressonância.',
  [{d:211.8,n:1,m:'s',cat:'cet',sig:'C=O de cetona (aldeído seria d, em 190 a 205). Singleto: sem H.'},
   {d:42,n:1,m:'d',cat:'alq',sig:'CH do isopropila, ao lado do C=O. Dupleto: 1 H.'},
   {d:27,n:1,m:'q',cat:'alq',sig:'CH3 da acetila. Quarteto: 3 H.'},
   {d:18,n:2,m:'q',cat:'alq',sig:'2 CH3 equivalentes do isopropila. É o sinal mais intenso porque vale 2 C.'}],
  [['CH3','C'],['C(=O)','A'],['CH','B'],['(CH3)2','D']]),
 c13('57B','5.7 B · C4H10O','5.7 B · 2-butanol','C4H10O',{C:4,H:10,N:0,X:0},'C4H10O. 25,2 MHz, CDCl3, fora de ressonância.',
  [{d:69,n:1,m:'d',cat:'het',sig:'CH ligado ao O (CH–OH). Dupleto: 1 H.'},
   {d:32,n:1,m:'t',cat:'alq',sig:'CH2. Tripleto: 2 H.'},
   {d:23,n:1,m:'q',cat:'alq',sig:'CH3 ligado ao CH(OH). Quarteto: 3 H.'},
   {d:10,n:1,m:'q',cat:'alq',sig:'CH3 da etila. Quarteto: 3 H.'}],
  [['CH3','D'],['CH2','B'],['CH(OH)','A'],['CH3','C']]),
 c13('57C','5.7 C · C11H14O2','5.7 C · benzoato de butila','C11H14O2',{C:11,H:14,N:0,X:0},'C11H14O2. 25,2 MHz, CDCl3, fora de ressonância.',
  [{d:166,n:1,m:'s',cat:'est',sig:'C=O de éster conjugado com o anel (benzoato). Éster alifático ficaria perto de 173.'},
   {d:133,n:1,m:'d',cat:'aro',sig:'CH para do anel (atribuição típica de benzoato; confira na tabela 5.9).'},
   {d:130,n:1,m:'s',cat:'aro',sig:'C ipso do anel (o que carrega o C=O). Singleto: sem H.'},
   {d:129.5,n:2,m:'d',cat:'aro',sig:'2 CH orto do anel, equivalentes (atribuição típica).'},
   {d:128,n:2,m:'d',cat:'aro',sig:'2 CH meta do anel, equivalentes (atribuição típica).'},
   {d:65,n:1,m:'t',cat:'het',sig:'OCH2 da butila. Tripleto: 2 H.'},
   {d:31,n:1,m:'t',cat:'alq',sig:'CH2 seguinte da cadeia. Tripleto: 2 H.'},
   {d:19,n:1,m:'t',cat:'alq',sig:'CH2 seguinte da cadeia. Tripleto: 2 H.'},
   {d:14,n:1,m:'q',cat:'alq',sig:'CH3 terminal. Quarteto: 3 H.'}],
  [['C6H5','B'],['–C(=O)–O–','A'],['CH2','F'],['CH2','G'],['CH2','H'],['CH3','I']]),
 c13('57D','5.7 D · C3H6O','5.7 D · álcool alílico','C3H6O',{C:3,H:6,N:0,X:0},'C3H6O. 25,2 MHz, CDCl3, fora de ressonância.',
  [{d:137,n:1,m:'d',cat:'alk',sig:'=CH– do vinil. Dupleto: 1 H.'},
   {d:115,n:1,m:'t',cat:'alk',sig:'=CH2 do vinil. Tripleto: 2 H.'},
   {d:63,n:1,m:'t',cat:'het',sig:'CH2 ligado ao OH. Tripleto: 2 H.'}],
  [['CH2','B'],['=CH','A'],['–CH2','C'],['OH',null]]),
 c13('57E','5.7 E · C5H11Br','5.7 E · 1-bromo-3-metilbutano','C5H11Br',{C:5,H:11,N:0,X:1},'C5H11Br. 25,2 MHz, CDCl3, fora de ressonância.',
  [{d:42,n:1,m:'t',cat:'alq',sig:'CH2 do meio, vizinho do CH. Tripleto: 2 H.'},
   {d:32,n:1,m:'t',cat:'alq',sig:'CH2Br. O Br (átomo pesado) deixa esse C perto de 32, e não acima de 50. Tripleto: 2 H.'},
   {d:27,n:1,m:'d',cat:'alq',sig:'CH do isopropila. Dupleto: 1 H.'},
   {d:22,n:2,m:'q',cat:'alq',sig:'2 CH3 equivalentes. É o sinal mais alto porque vale 2 C.'}],
  [['(CH3)2','D'],['CH','C'],['–CH2','A'],['–CH2','B'],['–Br',null]]),
 c13('57F','5.7 F · C7H7ClO','5.7 F · 4-cloroanisol','C7H7ClO',{C:7,H:7,N:0,X:1},'C7H7ClO. 25,2 MHz, CDCl3, fora de ressonância.',
  [{d:158,n:1,m:'s',cat:'aro',sig:'C do anel ligado ao OCH3. O oxigênio desblinda esse C. Singleto: sem H.'},
   {d:129.5,n:2,m:'d',cat:'aro',sig:'2 CH do anel, ao lado do Cl, equivalentes. Dupleto: 1 H.'},
   {d:125.5,n:1,m:'s',cat:'aro',sig:'C do anel ligado ao Cl. Singleto: sem H.'},
   {d:115,n:2,m:'d',cat:'aro',sig:'2 CH do anel, ao lado do OCH3, equivalentes. O O doa elétrons e protege esses C.'},
   {d:55,n:1,m:'q',cat:'het',sig:'OCH3 aromático (55 a 56). Quarteto: 3 H.'}],
  [['CH3','E'],['–O–',null],['C6H4','A'],['–Cl','C']]),
 c13('57G','5.7 G · C8H19N','5.7 G · diisobutilamina','C8H19N',{C:8,H:19,N:1,X:0},'C8H19N. 25,2 MHz, CDCl3, fora de ressonância.',
  [{d:58,n:2,m:'t',cat:'het',sig:'2 N–CH2 equivalentes. Tripleto: 2 H. O N leva o C para perto de 58.'},
   {d:28.5,n:2,m:'d',cat:'alq',sig:'2 CH equivalentes. Dupleto: 1 H.'},
   {d:20.5,n:4,m:'q',cat:'alq',sig:'4 CH3 equivalentes. É o sinal mais alto porque vale 4 C.'}],
  [['(CH3)2','C'],['CH','B'],['CH2','A'],['–NH–',null],['CH2','A'],['CH','B'],['(CH3)2','C']]),
 c13('57H','5.7 H · C4H9NO2','5.7 H · N-metilcarbamato de etila','C4H9NO2',{C:4,H:9,N:1,X:0},'C4H9NO2. 25,2 MHz, CDCl3, fora de ressonância.',
  [{d:157,n:1,m:'s',cat:'est',sig:'C=O de carbamato (ligado a O e a N ao mesmo tempo, 150 a 160). Singleto: sem H.'},
   {d:61,n:1,m:'t',cat:'het',sig:'O–CH2 da etila. Tripleto: 2 H.'},
   {d:27.5,n:1,m:'q',cat:'alq',sig:'N–CH3 (25 a 40). Quarteto: 3 H. Se fosse O–CH3, estaria perto de 52.'},
   {d:14.5,n:1,m:'q',cat:'alq',sig:'CH3 da etila. Quarteto: 3 H.'}],
  [['CH3','D'],['CH2','B'],['–O–',null],['C(=O)','A'],['–NH–',null],['CH3','C']])
];
EX13.forEach(e=>{e.s.forEach(x=>{if(x.J===undefined)x.J=130;if(x.hl===undefined)x.hl=HL[x.m];});});
function prep(L){L.forEach(e=>{e.s.sort((a,b)=>b.d-a.d);e.s.forEach((s,i)=>{s.id=String.fromCharCode(65+i);s.col=LC[i%LC.length];});});}
prep(EX13);
let EXHALL=null;
function exh(){
 if(EXHALL)return EXHALL;
 const base=(window.PROVA_EX||[]).map(p=>{const c=JSON.parse(JSON.stringify({id:p.id,grp:'sv',rot:p.rot,nome:p.nome,fs:p.fs,f:p.f,enun:p.enun,s:p.s,est:p.est}));c.fonte=SRCH;c.jt=true;return c;}).filter(c=>/^43[A-H]$/.test(c.id));
 EXHALL=EXH.concat(base);prep(EXHALL);return EXHALL;
}
const S={rows13:{},ex:0,sel:null,prova:false,integral:false,steps:0,nuc:'h'};
const E=()=>(S.nuc==='c'?EX13:exh())[S.ex];
const FQ=()=>S.nuc==='c'?25.2:300;
const CAT=()=>S.nuc==='c'?CATS13:CATS;
const $=id=>document.getElementById('lt_'+id);
const fmt=(x,d=2)=>x.toFixed(d).replace('.',',');
const gcd=(a,b)=>b?gcd(b,a%b):a;
const sub=t=>t.replace(/([A-Za-z\)])(\d+)/g,'$1<sub>$2</sub>');
function binom(n){let r=[1];for(let i=0;i<n;i++){const nr=[1];for(let j=1;j<r.length;j++)nr.push(r[j-1]+r[j]);nr.push(1);r=nr;}return r;}
function ratio(e){const hs=e.s.map(s=>s.h);const g=hs.reduce(gcd);return hs.map(h=>h/g);}
function dbe(f){return (2*f.C+2+f.N-f.H-f.X)/2;}
function linesOf(s){
 if(s.m==='m'){const w=s.w||0.1;let L=[];for(let k=0;k<9;k++){const t=(k-4)/4;L.push({p:s.d+t*w/2,w:Math.exp(-2.2*t*t)});}const sm=L.reduce((a,l)=>a+l.w,0);return L.map(l=>({p:l.p,w:l.w/sm}));}
 const cp=s.cp||(NV[s.m]?[[NV[s.m],s.J]]:[]);let L=[{p:s.d,w:1}];
 for(const c of cp){const n=c[0],J=c[1];const pc=binom(n),sm=pc.reduce((a,b)=>a+b);const N2=[];for(const l of L)pc.forEach((cc,k)=>N2.push({p:l.p+(k-n/2)*J/FQ(),w:l.w*cc/sm}));L=N2;}
 return L;
}
function drawOverview(){
 const e=E();const C=S.nuc==='c';let g='';
 if(!C){
  const W=1000,L=20,R=20,base=250,pk=140;
  const dmax=Math.max.apply(null,e.s.map(s=>s.d));const pmax=Math.max(6,Math.ceil(dmax+0.9)),pmin=0;
  const X=p=>L+(pmax-p)/(pmax-pmin)*(W-L-R);
  const sg=0.035,N=900;const ys=[];let mx=0;
  for(let i=0;i<=N;i++){const p=pmin+(pmax-pmin)*i/N;let y=0;for(const s of e.s)y+=s.h*Math.exp(-0.5*Math.pow((p-s.d)/sg,2));ys.push(y);if(y>mx)mx=y;}
  let path='';for(let i=0;i<=N;i++){const p=pmin+(pmax-pmin)*i/N;path+=(i?'L':'M')+X(p).toFixed(1)+' '+(base-ys[i]/mx*pk).toFixed(1);}
  if(S.sel!==null){const s=e.s[S.sel];g+='<rect x="'+X(s.d+0.25)+'" y="10" width="'+(X(s.d-0.25)-X(s.d+0.25))+'" height="'+(base-10)+'" fill="'+s.col+'" opacity=".12"/>';}
  for(let p=0;p<=pmax;p++)g+='<line x1="'+X(p)+'" y1="'+base+'" x2="'+X(p)+'" y2="'+(base+6)+'" stroke="#555"/><text x="'+X(p)+'" y="'+(base+22)+'" text-anchor="middle" font-size="13" fill="#333">'+p+'</text>';
  g+='<line x1="'+L+'" y1="'+base+'" x2="'+(W-R)+'" y2="'+base+'" stroke="#555"/><text x="'+(W-R)+'" y="'+(base+40)+'" text-anchor="end" font-size="13" fill="#555">δ (ppm)</text>';
  g+='<path d="'+path+'" fill="none" stroke="#1d1d1b" stroke-width="1.6"/>';
  if(S.integral){const tot=e.s.reduce((a,s)=>a+s.h,0);let ip='';
   for(let i=0;i<=N;i++){const p=pmax-(pmax-pmin)*i/N;let v=0;for(const s of e.s)v+=s.h/(1+Math.exp(-(s.d-p)/0.03));ip+=(i?'L':'M')+X(p).toFixed(1)+' '+(80-v/tot*65).toFixed(1);}
   g+='<path d="'+ip+'" fill="none" stroke="#b5651d" stroke-width="1.6"/>';}
  e.s.forEach((s,i)=>{let y=0;for(const t of e.s)y+=t.h*Math.exp(-0.5*Math.pow((s.d-t.d)/sg,2));const top=base-y/mx*pk;
   g+='<text x="'+X(s.d)+'" y="'+(top-8)+'" text-anchor="middle" font-size="16" font-weight="700" fill="'+s.col+'">'+s.id+'</text>';
   g+='<rect data-i="'+i+'" x="'+X(s.d+0.3)+'" y="20" width="'+Math.max(24,X(s.d-0.3)-X(s.d+0.3))+'" height="'+(base-20)+'" fill="transparent" style="cursor:pointer"/>';});
 } else {
  const W=1000,L=20,R=20,base=250,pk=165,pmax=220,pmin=0;
  const X=p=>L+(pmax-p)/(pmax-pmin)*(W-L-R);
  if(S.sel!==null){const s=e.s[S.sel];g+='<rect x="'+X(s.d+9)+'" y="10" width="'+(X(s.d-9)-X(s.d+9))+'" height="'+(base-10)+'" fill="'+s.col+'" opacity=".12"/>';}
  for(let p=0;p<=pmax;p+=20)g+='<line x1="'+X(p)+'" y1="'+base+'" x2="'+X(p)+'" y2="'+(base+6)+'" stroke="#555"/><text x="'+X(p)+'" y="'+(base+22)+'" text-anchor="middle" font-size="13" fill="#333">'+p+'</text>';
  g+='<line x1="'+L+'" y1="'+base+'" x2="'+(W-R)+'" y2="'+base+'" stroke="#555"/><text x="'+(W-R)+'" y="'+(base+40)+'" text-anchor="end" font-size="13" fill="#555">δ (ppm)</text>';
  [75.7,77.0,78.3].forEach(p=>{g+='<line x1="'+X(p)+'" y1="'+base+'" x2="'+X(p)+'" y2="'+(base-34)+'" stroke="#aaa" stroke-width="2"/>';});
  g+='<text x="'+X(77)+'" y="'+(base-40)+'" text-anchor="middle" font-size="12" fill="#888">CDCl3</text>';
  e.s.forEach((s,i)=>{const lines=linesOf(s);const mw=Math.max.apply(null,lines.map(l=>l.w));const nf=Math.min(1,0.55+0.18*s.n);let top=base;
   lines.forEach(l=>{const hh=pk*(0.25+0.75*(l.w/mw))*nf;if(base-hh<top)top=base-hh;g+='<line x1="'+X(l.p)+'" y1="'+base+'" x2="'+X(l.p)+'" y2="'+(base-hh)+'" stroke="#1d1d1b" stroke-width="2.2"/>';});
   g+='<text x="'+X(s.d)+'" y="'+(top-8)+'" text-anchor="middle" font-size="16" font-weight="700" fill="'+s.col+'">'+s.id+'</text>';
   const hw=lines.length>1?9:5;
   g+='<rect data-i="'+i+'" x="'+X(s.d+hw)+'" y="20" width="'+Math.max(24,X(s.d-hw)-X(s.d+hw))+'" height="'+(base-20)+'" fill="transparent" style="cursor:pointer"/>';});
 }
 $('ov').innerHTML=g;
}
function drawZoom(){
 const e=E();const svg=$('zoom');
 if(S.sel===null){svg.innerHTML='<text x="300" y="100" text-anchor="middle" fill="#777">Escolha um sinal</text>';$('zt').textContent='Multipleto ampliado';$('zinfo').textContent='';return;}
 const s=e.s[S.sel];const lines=linesOf(s);
 const ps=lines.map(l=>l.p);const span=Math.max.apply(null,ps)-Math.min.apply(null,ps);
 const C13=S.nuc==='c';const half=C13?Math.max(6,span/2+3):Math.max(0.1,span/2+0.07);const a=s.d-half,b=s.d+half;
 const W=600,Lm=20,Rm=20,base=150,pk=110;const X=p=>Lm+(b-p)/(b-a)*(W-Lm-Rm);
 const gw=s.m==='m'?0.012:(C13?3.5:1.6)/FQ(),N=700;let ys=[],mx=0;
 for(let i=0;i<=N;i++){const p=a+(b-a)*i/N;let y=0;for(const l of lines){const u=(p-l.p)/(gw/2);y+=l.w/(1+u*u);}ys.push(y);if(y>mx)mx=y;}
 let path='';for(let i=0;i<=N;i++){const p=a+(b-a)*i/N;path+=(i?'L':'M')+X(p).toFixed(1)+' '+(base-ys[i]/mx*pk).toFixed(1);}
 let g='<path d="'+path+'" fill="none" stroke="'+s.col+'" stroke-width="2"/><line x1="'+Lm+'" y1="'+base+'" x2="'+(W-Rm)+'" y2="'+base+'" stroke="#555"/>';
 for(let i=0;i<=4;i++){const p=a+(b-a)*i/4;g+='<line x1="'+X(p)+'" y1="'+base+'" x2="'+X(p)+'" y2="'+(base+5)+'" stroke="#555"/><text x="'+X(p)+'" y="'+(base+20)+'" text-anchor="middle" font-size="12" fill="#333">'+(S.prova?'':fmt(p,C13?1:3))+'</text>';}
 if(s.m!=='m'&&lines.length<=8){const mw=Math.max.apply(null,lines.map(q=>q.w));lines.slice().sort((x,y)=>y.p-x.p).forEach((l,k)=>{g+='<text x="'+X(l.p)+'" y="'+(base-(l.w/mw)*pk-8)+'" text-anchor="middle" font-size="12" fill="#555">'+(k+1)+'</text>';});}
 if(!s.cp&&s.m!=='m'&&NV[s.m]>=1){const sl=lines.slice().sort((x,y)=>y.p-x.p),x1=X(sl[0].p),x2=X(sl[1].p);g+='<line x1="'+x1+'" y1="'+(base+34)+'" x2="'+x2+'" y2="'+(base+34)+'" stroke="#333"/><line x1="'+x1+'" y1="'+(base+29)+'" x2="'+x1+'" y2="'+(base+39)+'" stroke="#333"/><line x1="'+x2+'" y1="'+(base+29)+'" x2="'+x2+'" y2="'+(base+39)+'" stroke="#333"/><text x="'+((x1+x2)/2)+'" y="'+(base+52)+'" text-anchor="middle" font-size="12" fill="#333">J '+(e.jt?'≈ ':'= ')+fmt(s.J,1)+' Hz</text>';}
 svg.innerHTML=g;
 $('zt').textContent=S.prova?'Sinal '+s.id+', ampliado':'Sinal '+s.id+', δ '+fmt(s.d)+' ppm';
 let info;
 if(C13){info=s.hl===0?'0 H ligados: 1 linha só (singleto) no espectro fora de ressonância.':s.hl+(s.hl===1?' H ligado dá ':' H ligados dão ')+(s.hl+1)+' linhas no espectro fora de ressonância, separadas por cerca de 130 Hz (J C–H, que na prática vai de 125 a 160 Hz).';}
 else if(s.m==='m')info='Multipleto: vários acoplamentos sobrepostos, não dá para contar picos. Use δ, integração e o padrão do anel.';
 else if(s.cp)info=lines.length+' picos. Acoplamentos: '+s.cp.map(c=>c[0]+' H com J ≈ '+fmt(c[1],1)+' Hz').join(' e ')+'. Cada acoplamento desdobra o sinal de novo.';
 else{const n=NV[s.m];info=(n+1)+' '+(n+1===1?'pico':'picos')+(n>=1?', alturas relativas '+binom(n).join(' : ')+'. A distância entre picos vizinhos (em Hz) é a constante J.':'. Um pico só.');}
 $('zinfo').textContent=info+(e.jt&&s.m!=='m'&&!C13?' Larguras e J aqui são típicos, não medidos do gráfico do livro.':'');
}
function drawTable(){
 const e=E();let h;
 if(S.nuc==='c'){
  h='<table><tr><th>Sinal</th><th>δ (ppm)</th>'+(S.prova?'':'<th>Fora de ressonância</th><th>H ligados</th><th>C no sinal</th>')+'</tr>';
  e.s.forEach(s=>{h+='<tr><td><b style="color:'+s.col+'">'+s.id+'</b></td><td>'+(S.prova?'ler no eixo':fmt(s.d,1))+'</td>'+(S.prova?'':'<td>'+MN[s.m]+'</td><td>'+s.hl+'</td><td>'+s.n+'</td>')+'</tr>';});
  const tot=e.s.reduce((a,s)=>a+s.n,0);
  $('tbl').innerHTML=h+'</table><div class="lsm" style="margin-top:6px">'+(S.prova?'Fórmula '+e.fs+': conte quantos C a fórmula tem e compare com o número de sinais. Em 13C a altura do sinal não conta C.':e.s.length+' sinais para '+tot+' C ('+(tot===e.s.length?'nenhum equivalente':'há carbonos equivalentes')+').')+'</div>';
 } else {
  const r=ratio(e);
  h='<table><tr><th>Sinal</th><th>δ (ppm)</th><th>Integração (proporção)</th>'+(S.prova?'':'<th>H por sinal</th><th>Formato</th>')+'</tr>';
  e.s.forEach((s,i)=>{h+='<tr><td><b style="color:'+s.col+'">'+s.id+'</b></td><td>'+(S.prova?'ler no eixo':fmt(s.d))+'</td><td>'+r[i]+'</td>'+(S.prova?'':'<td>'+s.h+'</td><td>'+MN[s.m]+'</td>')+'</tr>';});
  $('tbl').innerHTML=h+'</table>'+(S.prova?'<div class="lsm" style="margin-top:6px">A integração é só proporção. Use a fórmula '+e.fs+' para achar o número real de H de cada sinal.</div>':'');
 }
}
const SK13='anaquim-leitor-analise-v1';
function k13(){const e=E();return e.id||('x:'+e.nome);}
function sa13Ler(){try{return JSON.parse(localStorage.getItem(SK13)||'{}')||{};}catch(x){return {};}}
function msg13(x){const m=$('amsg');if(m)m.textContent=x;}
function quando(ts){const d=new Date(ts);return d.toLocaleDateString('pt-BR')+' às '+d.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});}
function sa13Salvar(){const A=sa13Ler();A[k13()]={t:Date.now(),rows:S.rows13};try{localStorage.setItem(SK13,JSON.stringify(A));msg13('Análise salva em '+quando(A[k13()].t)+'. Ela volta quando você abrir este espectro.');}catch(x){msg13('Não consegui salvar (o navegador bloqueou o armazenamento).');}}
function sa13Limpar(){const A=sa13Ler();delete A[k13()];try{localStorage.setItem(SK13,JSON.stringify(A));}catch(x){}S.rows13={};drawRows13();msg13('Análise apagada neste espectro.');}
function rows13Restaura(){const a=S.nuc==='c'?sa13Ler()[k13()]:null;S.rows13=a?(a.rows||{}):{};return a;}
function avisoRest(){const a=S.nuc==='c'?sa13Ler()[k13()]:null;msg13(a?'Análise salva em '+quando(a.t)+' (restaurada).':'');}
function drawRows13(){
 const el=$('tab');if(!el)return;const e=E();
 const ks=Object.keys(S.rows13).map(Number).sort((a,b)=>a-b);
 if(!ks.length){el.innerHTML='<span class="lsm">Cada sinal que você conferir certo entra aqui, na ordem do seu caderno.</span>';return;}
 let h='<div style="overflow-x:auto"><table><thead><tr><th>Sinal</th><th>nº C</th><th>δ</th><th>Tipo de C</th><th>Tipo</th><th>H lig.</th><th>Grupo</th></tr></thead><tbody>'+ks.map(k=>{const r=S.rows13[k],s=e.s[k];return '<tr><td><b style="color:'+s.col+'">'+s.id+'</b></td><td>'+r.n+'</td><td>'+r.d+'</td><td>'+r.c+'</td><td>'+r.m+'</td><td>'+r.h+'</td><td>'+r.g+'</td></tr>';}).join('')+'</tbody></table></div>';
 const nC=ks.reduce((a,k)=>a+S.rows13[k].n,0),nH=ks.reduce((a,k)=>a+S.rows13[k].n*S.rows13[k].h,0);
 h+='<div class="lsm" style="margin-top:6px">Até agora: '+nC+' C e '+nH+' H em C–H. A fórmula '+e.fs+' tem '+e.f.C+' C e '+e.f.H+' H'+(ks.length===e.s.length?(nH===e.f.H?', então não sobra OH nem NH.':(nH<e.f.H?', então sobram '+(e.f.H-nH)+' H (OH ou NH).':'. Confira os H.')):'.')+'</div>';
 el.innerHTML=h;
}
function drawChips(){
 const e=E();
 $('chips').innerHTML=e.s.map((s,i)=>'<button type="button" class="lchip" data-i="'+i+'" aria-pressed="'+(S.sel===i)+'" style="border-color:'+s.col+'"><b style="color:'+s.col+'">'+s.id+'</b> '+(S.prova?'ler no eixo':fmt(s.d,S.nuc==='c'?1:2)+' ppm')+'</button>').join('');
}
function drawPanel(){
 const e=E();const C=S.nuc==='c';const CT=CAT();
 if(S.sel===null){$('panel').innerHTML='<span class="lsm">Clique em um sinal do espectro.</span>';$('pt').textContent='Significado do pico';return;}
 const s=e.s[S.sel];$('pt').textContent='Significado do sinal '+s.id;
 const dd=fmt(s.d,C?1:2);
 if(!S.prova){
  $('panel').innerHTML=C?'<dl><dt>Posição</dt><dd>δ '+dd+' ppm</dd><dt>Fora de ressonância</dt><dd>'+MN[s.m]+', '+s.hl+' H ligados</dd><dt>C no sinal</dt><dd>'+s.n+(s.n>1?' (carbonos equivalentes)':'')+'</dd><dt>Tipo de C</dt><dd>'+CT[s.cat].n+', faixa '+CT[s.cat].r+'</dd><dt>Atribuição</dt><dd>'+s.sig+'</dd></dl>':'<dl><dt>Posição</dt><dd>δ '+dd+' ppm</dd><dt>Quantos H</dt><dd>'+s.h+'</dd><dt>Formato</dt><dd>'+MN[s.m]+' ('+nview(s)+')</dd><dt>Tipo de H</dt><dd>'+CT[s.cat].n+', faixa '+CT[s.cat].r+'</dd><dt>Atribuição</dt><dd>'+s.sig+'</dd></dl>';
  return;
 }
 const opt=Object.keys(CT).map(k=>'<option value="'+k+'">'+CT[k].n+' ('+CT[k].r+')</option>').join('');
 const mkeys=C?['s','d','t','q']:Object.keys(MN);
 const mo=mkeys.map(k=>'<option value="'+k+'">'+MN[k]+'</option>').join('');
 $('panel').innerHTML=C?'<div class="lsm" style="margin-bottom:8px">Na ordem do seu método: nº de C, δ, faixa, tipo, H ligados e grupo. Leia o δ no eixo, como na prova. Em ¹³C não existe H vizinho (não há acoplamento C–C): o tipo diz quantos H o próprio carbono tem.</div><dl><dt>1. Nº de C neste sinal</dt><dd><input type="number" id="lt_fn" min="1" max="8" style="width:80px"></dd><dt>2. δ que você lê (ppm)</dt><dd><input type="number" id="lt_fd" step="0.1" style="width:100px"></dd><dt>3. Faixa do δ (tipo de C)</dt><dd><select id="lt_fcat"><option value="">escolha</option>'+opt+'</select></dd><dt>4. Tipo (s, d, t, q)</dt><dd><select id="lt_fm"><option value="">escolha</option>'+mo+'</select></dd><dt>5. H ligados ao C</dt><dd><input type="number" id="lt_fh" min="0" max="3" style="width:80px"></dd><dt>6. Grupo possível</dt><dd><select id="lt_fg"><option value="">escolha</option><option value="0">C sem H (C=O, C quaternário)</option><option value="1">CH</option><option value="2">CH₂</option><option value="3">CH₃</option></select></dd></dl><div class="lrow" style="margin-top:10px"><button type="button" class="lbtn pri" id="lt_check">Conferir</button></div><div id="lt_fb" style="margin-top:10px"></div>'
 :'<div class="lsm" style="margin-bottom:8px">Leia o δ do pico no eixo, como na prova, e responda.</div><dl><dt>δ que você lê (ppm)</dt><dd><input type="number" id="lt_fd" step="0.05" style="width:100px"></dd><dt>Tipo de H</dt><dd><select id="lt_fcat"><option value="">escolha</option>'+opt+'</select></dd><dt>Quantos H</dt><dd><input type="number" id="lt_fh" min="0" max="12" style="width:80px"></dd><dt>Formato</dt><dd><select id="lt_fm"><option value="">escolha</option>'+mo+'</select></dd><dt>Vizinhos</dt><dd>'+(s.m==='m'?'<span class="lsm">não se conta em multipleto</span>':'<input type="number" id="lt_fv" min="0" max="12" style="width:80px">')+'</dd></dl><div class="lrow" style="margin-top:10px"><button type="button" class="lbtn pri" id="lt_check">Conferir</button></div><div id="lt_fb" style="margin-top:10px"></div>';
}
function checkAnswer(){
 const e=E();const s=e.s[S.sel];const C=S.nuc==='c';const CT=CAT();
 const cat=$('fcat').value,h=$('fh').value,m=$('fm').value;const R=[];
 const dl=$('fd').value;const tol=C?3:0.15;
 R.push(dl===''?['bad','δ: leia no eixo onde o pico cai e escreva o valor. Neste sinal o valor do gráfico é '+fmt(s.d,C?1:2)+' ppm.']:Math.abs(+dl-s.d)<=tol?['ok','δ lido certo (o valor do gráfico é '+fmt(s.d,C?1:2)+' ppm; aceito até '+(C?'3':'0,15')+' ppm de diferença na leitura a olho).']:['bad','δ: você leu '+dl+' e o valor do gráfico é '+fmt(s.d,C?1:2)+' ppm. Trace uma linha reta do topo do pico até o eixo e veja entre quais números ela cai.']);
 R.push(cat===s.cat?['ok',C?'Tipo de C certo.':'Tipo de H certo.']:['bad',(C?'Tipo de C':'Tipo de H')+': olhe a faixa. Em δ '+fmt(s.d,C?1:2)+' o esperado é: '+(CT[s.cat]?CT[s.cat].n+' ('+CT[s.cat].r+')':'')+'.']);
 if(C){
  const n=$('fn').value;
  R.push(m===s.m?['ok','Formato certo.']:['bad','Formato: conte as linhas na ampliação. 1 linha é s, 2 é d, 3 é t, 4 é q.']);
  R.push(h!==''&&+h===s.hl?['ok','H ligados certo.']:['bad','H ligados: linhas menos 1 (s = 0, d = 1, t = 2, q = 3).']);
  R.push(n!==''&&+n===s.n?['ok','Número de C certo.']:['bad','Número de C: compare o número de sinais com o número de C da fórmula '+e.fs+'. Se faltam sinais, há carbonos equivalentes em algum deles (um sinal mais alto costuma valer 2 ou mais C).']);
  R.unshift(R.pop());
  const gv=$('fg').value;R.push(gv!==''&&+gv===s.hl?['ok','Grupo certo: '+GL[s.hl]+'.']:['bad','Grupo: '+MN[s.m]+' quer dizer '+s.hl+' H ligados. Que grupo tem esse número de H?']);
 } else {
  const vi=$('fv'),v=vi?vi.value:'';
  R.push(+h===s.h&&h!==''?['ok','Número de H certo.']:['bad','Número de H: some as proporções, multiplique até bater com '+e.fs+' e confira o sinal.']);
  R.push(m===s.m?['ok','Formato certo.']:['bad','Formato: conte os picos na ampliação ao lado e veja se há mais de um J.']);
  if(s.m!=='m')R.push(+v===NV[s.m]&&v!==''?['ok','Vizinhos certo.']:['bad','Vizinhos: picos menos 1. Em dd e septeto de dupletos, some os H de cada acoplamento (1 + 1 ou 6 + 1).']);
 }

 if(C&&R.every(r=>r[0]==='ok')){S.rows13[S.sel]={n:s.n,d:fmt(s.d,1),g:GL[s.hl],m:s.m,h:s.hl,c:CT[s.cat].n};drawRows13();}
 $('fb').innerHTML=R.map(r=>'<div class="'+(r[0]==='ok'?'lok':'lbad')+'">'+(r[0]==='ok'?'Certo':'Revisar')+': '+r[1]+'</div>').join('')+'<div class="ltip"><b>Atribuição:</b> '+s.sig+'</div>';
}
function stepsList(){
 const e=E();
 if(e.id){const r=(window.RES_BANCO||[]).find(x=>x.id===e.id);if(r&&r.passos)return r.passos.map(p=>'<b>'+p[0]+'.</b> '+p[1]);}
 if(S.nuc==='c'){const f=e.f;const d=dbe(f);const tot=e.s.reduce((a,s)=>a+s.n,0);const hx=e.s.reduce((a,s)=>a+s.n*s.hl,0);
  return [
   '<b>DBE.</b> (2×'+f.C+' + 2 + '+f.N+' − '+f.H+' − '+f.X+') / 2 = '+d+'. '+e.dbeNota,
   '<b>Sinais e C.</b> '+e.s.length+' sinais para '+f.C+' C. '+(f.C===e.s.length?'Nenhum carbono equivalente.':'Faltam '+(f.C-e.s.length)+' sinais, então há carbonos equivalentes (simetria): '+e.s.filter(s=>s.n>1).map(s=>s.id+' vale '+s.n+' C').join(', ')+'.'),
   '<b>Multiplicidade fora de ressonância.</b> '+e.s.map(s=>s.id+' é '+MN[s.m]+' ('+s.hl+' H)').join('; ')+'. H nos C–H: '+hx+'. A fórmula tem '+f.H+' H'+(f.H>hx?', então '+(f.H-hx)+' H estão em OH ou NH':'')+'.',
   '<b>δ.</b> '+e.s.map(s=>s.id+' ('+fmt(s.d,1)+'): '+CATS13[s.cat].n).join('; ')+'.',
   '<b>Fragmentos.</b> '+e.frag,
   '<b>Montar e conferir.</b> '+e.concl];}
 const f=e.f;const d=dbe(f);const r=ratio(e);const sumR=r.reduce((a,b)=>a+b);
 return [
  '<b>DBE.</b> (2×'+f.C+' + 2 + '+f.N+' − '+f.H+' − '+f.X+') / 2 = '+d+'. '+e.dbeNota,
  '<b>Sinais.</b> São '+e.s.length+', então '+e.s.length+' tipos de H diferentes.',
  '<b>Integração.</b> Proporção '+r.join(' : ')+'. A fórmula tem '+f.H+' H e a soma das proporções é '+sumR+', então multiplica por '+(f.H/sumR)+'. H por sinal: '+e.s.map(s=>s.id+' = '+s.h).join(', ')+'.',
  '<b>δ.</b> '+e.s.map(s=>s.id+' ('+fmt(s.d)+'): '+CATS[s.cat].n).join('; ')+'.',
  '<b>Multiplicidade.</b> '+e.s.map(s=>s.id+' é '+MN[s.m]+', '+nview(s)).join('; ')+'.',
  '<b>Fragmentos.</b> '+e.frag,
  '<b>Montar e conferir.</b> '+e.concl
 ];
}
function drawSteps(){
 const e=E();const L=stepsList();
 $('steps').innerHTML=L.slice(0,S.steps).map(x=>'<li>'+x+'</li>').join('');
 $('nextstep').disabled=S.steps>=L.length;
 $('struct').innerHTML=(S.steps>=L.length&&e.est)?'<div class="ltip"><div class="lsm">Estrutura (a cor sublinhada liga cada grupo ao sinal do espectro):</div><div class="lformula">'+e.est.map(x=>x[1]?'<span class="lgrp" style="border-color:'+e.s.find(s=>s.id===x[1]).col+'">'+sub(x[0])+'</span>':sub(x[0])).join('')+'</div></div>':'';
 $('src').textContent=e.fonte||'';
}
function head(){const e=E();$('head').innerHTML='<b>'+(S.prova?(e.rot||'Espectro sem nome'):e.nome)+'</b> · fórmula '+sub(e.fs)+' · '+(e.grp==='sv'?'<span class="ltag">δ lidos do gráfico (aproximados)</span>':e.fonte===EST?'<span class="ltag">valores típicos, sem fonte conferida</span>':'<span class="ltag">valores conferidos na sessão de origem</span>')+(e.enun?'<div style="margin-top:4px">'+e.enun+'</div>':'');}
function renderAll(){drawRows13();head();drawChips();drawOverview();drawTable();drawZoom();drawPanel();drawSteps();}
function pick(i){S.sel=i;drawChips();drawOverview();drawZoom();drawPanel();}
function fillSel(){
 const L=S.nuc==='c'?EX13:exh();
 const o=(e,i)=>'<option value="'+i+'"'+(i===S.ex?' selected':'')+'>'+(S.prova?(e.rot||'Exemplo '+(i+1)+' · '+e.fs):e.nome)+'</option>';
 $('exsel').innerHTML='<optgroup label="Exemplos resolvidos">'+L.map((e,i)=>e.grp?'':o(e,i)).join('')+'</optgroup><optgroup label="'+(S.nuc==='c'?'Silverstein 5.7 (13C, dos problemas do Anaquim)':'Silverstein 4.3 (dos problemas do Anaquim)')+'">'+L.map((e,i)=>e.grp?o(e,i):'').join('')+'</optgroup>';
}
let ROOT=null,CUR=null;
function build(host){
 ROOT=document.createElement('div');ROOT.className='lt-wrap';
 ROOT.innerHTML='<div class="lt"><h3 style="margin:0 0 4px">Leitor de espectros: ¹H e ¹³C</h3><p class="lsm" style="margin:0 0 6px">Escolha um espectro, clique em cada pico e veja o que ele significa. Para treinar com correção, use a aba Prova.</p>'
 +'<div class="lcard"><div class="lrow"><label class="lt-hn" for="lt_nuc"><b>Núcleo:</b></label><select class="lt-hn" id="lt_nuc"><option value="h">¹H</option><option value="c">¹³C</option></select><label for="lt_exsel"><b>Espectro:</b></label><select id="lt_exsel"></select><label class="lchk lt-hn"><input type="checkbox" id="lt_integral"> Mostrar curva de integração</label></div><div id="lt_head" class="lsm" style="margin-top:8px"></div><svg id="lt_ov" viewBox="0 0 1000 290" role="img" aria-label="Espectro de RMN"></svg><div class="lchips" id="lt_chips"></div><div class="lsm" style="margin-top:6px">O eixo vai de δ alto (esquerda) para δ baixo (direita). Clique em um pico ou em uma letra para ampliar o multipleto.</div></div>'
 +'<div class="lcard"><h3>Integração e posições</h3><div id="lt_tbl"></div></div>'
 +'<div class="lgrid"><div class="lcard"><h3 id="lt_zt">Multipleto ampliado</h3><svg id="lt_zoom" viewBox="0 0 600 216" role="img" aria-label="Multipleto ampliado"></svg><div id="lt_zinfo" class="lsm"></div></div><div class="lcard"><h3 id="lt_pt">Significado do pico</h3><div id="lt_panel"><span class="lsm">Clique em um sinal do espectro.</span></div></div></div>'
 +'<div class="lcard lt-pt"><h3>Sua tabela do caderno</h3><div id="lt_tab"></div><div class="lrow" style="margin-top:10px"><button type="button" class="lbtn pri" id="lt_asave">Salvar análise</button><button type="button" class="lbtn" id="lt_aclear">Apagar análise</button></div><div class="lsm" id="lt_amsg" style="margin-top:6px"></div></div>'
 +'<div class="lcard"><h3>Resolução passo a passo</h3><div class="lrow"><button type="button" class="lbtn pri" id="lt_nextstep">Mostrar próximo passo</button><button type="button" class="lbtn" id="lt_allsteps">Mostrar todos</button><button type="button" class="lbtn" id="lt_resetsteps">Esconder</button></div><ol class="lsteps" id="lt_steps"></ol><div id="lt_struct"></div><details style="margin-top:10px"><summary>Fonte dos valores deste espectro</summary><div id="lt_src" class="lsm" style="margin-top:6px"></div></details></div></div>';
 host.appendChild(ROOT);
 $('nuc').onchange=ev=>{S.nuc=ev.target.value;S.ex=0;S.sel=null;S.steps=0;$('integral').disabled=S.nuc==='c';fillSel();renderAll();rows13Restaura();drawRows13();avisoRest();};
 fillSel();
 $('exsel').onchange=ev=>{S.ex=+ev.target.value;S.sel=null;S.steps=0;renderAll();rows13Restaura();drawRows13();avisoRest();};
 $('integral').onchange=ev=>{S.integral=ev.target.checked;drawOverview();};
 $('chips').onclick=ev=>{const b=ev.target.closest('[data-i]');if(b)pick(+b.dataset.i);};
 $('ov').onclick=ev=>{const r=ev.target.closest('rect[data-i]');if(r)pick(+r.dataset.i);};
 $('panel').onclick=ev=>{if(ev.target.id==='lt_check')checkAnswer();};
 $('asave').onclick=sa13Salvar;$('aclear').onclick=sa13Limpar;
 $('nextstep').onclick=()=>{S.steps=Math.min(stepsList().length,S.steps+1);drawSteps();};
 $('allsteps').onclick=()=>{S.steps=stepsList().length;drawSteps();};
 $('resetsteps').onclick=()=>{S.steps=0;drawSteps();};
 renderAll();
}
function attach(host,mode){
 if(typeof host==='string')host=document.getElementById(host);if(!host)return;
 if(!ROOT)build(host);else if(ROOT.parentNode!==host)host.appendChild(ROOT);
 if(CUR!==mode){CUR=mode;ROOT.dataset.mode=mode;S.ex=0;S.sel=null;S.steps=0;S.integral=false;
  if(mode==='prova13'){S.nuc='c';S.prova=true;}else{S.nuc='h';S.prova=false;}
  $('nuc').value=S.nuc;$('integral').checked=false;$('integral').disabled=S.nuc==='c';fillSel();renderAll();rows13Restaura();drawRows13();avisoRest();}
}
function leitorDraw(){attach(document.querySelector('[data-rpane="leitor"]'),'explore');}
window.leitorAttach=attach;
window.leitorDraw=leitorDraw;
window.LEITOR_EX=()=>({h:exh(),c:EX13});
})();
