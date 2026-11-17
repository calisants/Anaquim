/* ================= ANALORG v9: RMN, problemas resolvidos (¹H e ¹³C) =================
   Painel "Resolvidos" dentro de RMN. Problemas 4.3 A–H, 5.1 a–h, 5.2, 5.3, 5.4, 5.5 e 5.7 A–H do Silverstein (7ª ed. em português).
   Cada problema tem passos que aparecem um a um e um quiz curto. O quiz usa miniQuiz, então os erros entram na revisão espaçada (1, 3 e 7 dias).
   Os dados (δ, multiplicidade) foram lidos das fotos das páginas; onde o valor é de tabela e não do gráfico, o texto diz. */
(function(){
const TG={g:'<span class="tag sv">Lido do gráfico:</span>',t:'<span class="tag sm">Valor de tabela:</span>'};
const tb=(h,r)=>'<div class="tbl"><table class="obt"><thead><tr>'+h.map(x=>'<th style="text-transform:none">'+x+'</th>').join('')+'</tr></thead><tbody>'+r.map(l=>'<tr>'+l.map((c,i)=>'<td'+(/^[−\-]?[\d≈<>][\d,.≈ –−\-]*$/.test(c)?' class="n"':'')+'>'+c+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
const P=s=>'<p>'+s+'</p>';
/* quiz: q, [certa, erradas...], explicação */
const Q=(q,o,w)=>({q:q,o:o,ok:0,w:w});

const RES=[
/* ============ 4.3 ============ */
{id:'43A',g:'43',t:'4.3 A · C₆H₁₂O, cetona',
 dados:P('<b>Dado:</b> C₆H₁₂O, cetona. ¹H em 300 MHz, CDCl₃. '+TG.g+' ≈2,45 (t) · ≈2,14 (s) · ≈1,55 (quint) · ≈1,30 (rotulado sept no livro) · ≈0,90 (t). O espectro de ¹³C acima mostra 6 linhas.'),
 passos:[
 ['Fórmula e GDH',P('GDH = (2·6 + 2 − 12) ÷ 2 = <b>1</b>. O enunciado diz cetona, então a única insaturação é o C=O. Não há anel nem C=C.')],
 ['Integração',P('A única proporção inteira que soma 12 H e acompanha as multiplicidades é <b>2 : 3 : 2 : 2 : 3</b> (2,45 · 2,14 · 1,55 · 1,30 · 0,90). Foi o que usei; confira com a altura dos degraus no seu livro.')],
 ['Multiplicidade (n + 1)',tb(['δ','H','Sinal','Vizinhos','Leitura'],[['2,45','2','t','2 H','CH₂ ao lado de outro CH₂, deslocado pelo C=O'],['2,14','3','s','0','CH₃ colado no C=O, sem vizinho'],['1,55','2','quint','4 H','CH₂ entre dois CH₂'],['1,30','2','sext','5 H','CH₂ entre CH₂ e CH₃'],['0,90','3','t','2 H','CH₃ da cadeia']])+P('O livro rotula o sinal de 1,30 como "sept". Pela regra n + 1, 5 vizinhos dão <b>sexteto</b>; segui a regra e deixo a divergência anotada.')],
 ['Montagem',P('CH₃–C(=O)–CH₂–CH₂–CH₂–CH₃. Cada CH₂ está encaixado entre os vizinhos que a multiplicidade pediu. O CH₂ em 2,45 é o único ao lado do C=O; o CH₃ em 2,14 também.')],
 ['¹³C (problema 5.6)',P('6 C, 6 sinais (nenhum equivalente). Esperado, '+TG.t+': C=O ≈209 (s) · CH₂ α ≈43 (t) · CH₃CO ≈30 (q) · CH₂ ≈26 (t) · CH₂ ≈22 (t) · CH₃ ≈14 (q). O C=O é o sinal mais à esquerda e é um singleto, porque não tem H.')]],
 resp:'2-hexanona',
 q:[Q('Problema 4.3 A (C₆H₁₂O, cetona): qual é a estrutura?',['2-hexanona','3-hexanona','4-metil-2-pentanona','2-metil-3-pentanona'],'O singleto de 3 H em 2,14 é CH₃–C=O. A cadeia t (2 H), quint, sext, t (3 H) só fecha com uma cadeia linear de quatro carbonos depois do C=O.'),
    Q('Problema 4.3 A: por que o CH₂ em 1,55 é um quinteto?',['Tem 4 H vizinhos (dois CH₂), e 4 + 1 = 5 linhas','Tem 5 H vizinhos','Tem 1 H vizinho','Está acoplado ao C=O'],'Está entre dois CH₂ (2 + 2 H). O C=O não tem H, então não acopla.')]},

{id:'43B',g:'43',t:'4.3 B · C₈H₁₀O₂, álcool-éter',
 dados:P('<b>Dado:</b> C₈H₁₀O₂, álcool-éter. '+TG.g+' ≈7,2 (m) · ≈6,9 (m) · ≈4,5 (s) · ≈3,8 (s) · ≈2,5 (s). O ¹³C mostra 6 linhas.'),
 passos:[
 ['Fórmula e GDH',P('GDH = (2·8 + 2 − 10) ÷ 2 = <b>4</b>. Quatro insaturações com 8 C: um anel aromático (3 C=C + 1 anel). Sobra nenhum C=O, então os dois O são álcool e éter.')],
 ['Integração',P('Dois multipletos aromáticos de 2 H cada (4 H no anel), singleto de 2 H em ≈4,5, singleto de 3 H em ≈3,8 e singleto de 1 H em ≈2,5. Soma: 4 + 2 + 3 + 1 = 10 H.')],
 ['Quatro H aromáticos em dois grupos de 2',P('Dois multipletos simétricos (AA′BB′) com 2 H cada indicam anel <b>para</b>-dissubstituído. Confirmação pelo ¹³C: 8 C com 6 linhas, porque no anel para só há 4 C diferentes (2 pares equivalentes + 2 com substituinte), mais os 2 C da cadeia.')],
 ['Os singletos',P('3,8 (3 H, s) é O–CH₃ de éter aromático. 4,5 (2 H, s) é Ar–CH₂–OH: o CH₂ sem vizinho com H. 2,5 (1 H, s) é o O–H, que não acopla (troca rápida) e muda de posição com a concentração.')],
 ['Cálculo de δ',P('<b>Shoolery para o CH₂:</b> δ = 0,23 + σ(Ph) 1,83 + σ(OH) 2,56 = <b>4,62</b>. Medido ≈4,5. <br><b>H aromático por aditividade</b> (benzeno 7,27; tabela D.1): H orto ao OCH₃ = 7,27 + (7,00 − 7,27) + (7,15 − 7,27) = <b>6,88</b>; H orto ao CH₂OH = 7,27 + (7,15 − 7,27) + (7,35 − 7,27) = <b>7,23</b>. Bate com 6,9 e 7,2.')],
 ['Montagem e ¹³C',P('HO–CH₂–C₆H₄–OCH₃ (para): <b>álcool 4-metoxibenzílico</b>. ¹³C esperado, '+TG.t+': C–O aromático ≈159 (s) · C–CH₂ ≈133 (s) · CH ≈129 (d, 2 C) · CH ≈114 (d, 2 C) · CH₂OH ≈65 (t) · OCH₃ ≈55 (q). Seis sinais, como no gráfico.')]],
 resp:'álcool 4-metoxibenzílico',
 q:[Q('Problema 4.3 B (C₈H₁₀O₂): o que o par de multipletos de 2 H cada na região aromática indica?',['Anel para-dissubstituído (AA′BB′)','Anel monossubstituído','Anel orto-dissubstituído com grupos iguais','Dois anéis'],'Um anel monossubstituído daria 5 H aromáticos (2 + 2 + 1). Dois grupos de 2 H que se repetem é a assinatura do para.'),
    Q('Problema 4.3 B: pela regra de Shoolery, qual o δ esperado do CH₂ em C₆H₅–CH₂–OH? (σ Ph = 1,83; σ OH = 2,56)',['≈ 4,6','≈ 3,3','≈ 2,4','≈ 5,4'],'δ = 0,23 + 1,83 + 2,56 = 4,62.')]},

{id:'43C',g:'43',t:'4.3 C · C₅H₈O₂, éster',
 dados:P('<b>Dado:</b> C₅H₈O₂, éster. '+TG.g+' três sinais entre ≈5,8 e ≈6,4 (cada um dd, indicados como CH₂=CH) · ≈4,2 (q) · ≈1,3 (t).'),
 passos:[
 ['Fórmula e GDH',P('GDH = (2·5 + 2 − 8) ÷ 2 = <b>2</b>: um C=O de éster e uma C=C. O rótulo "CH₂=CH" no próprio espectro entrega o vinil.')],
 ['Integração',P('1 + 1 + 1 (os três H do vinil) + 2 (q) + 3 (t) = <b>8 H</b>.')],
 ['Etila de éster',P('Quarteto de 2 H em ≈4,2 com tripleto de 3 H em ≈1,3 é um –O–CH₂–CH₃. O CH₂ em 4,2 está ligado ao oxigênio do éster (compare com o acetato de etila do app, 4,12).')],
 ['Os três H do vinil (sistema AMX)',P('Cada um acopla com os outros dois com J diferente, por isso cada sinal é um dubleto de dubletos. J trans ≈ 17 Hz, J cis ≈ 10 Hz, J gem ≈ 1,5 Hz. O H do CH (geminal ao COOR) abre em ≈17 e ≈10 Hz; os dois H do =CH₂ têm um acoplamento grande e o gem pequeno.')],
 ['Cálculo pelas constantes Z (alceno)',P('δ = 5,25 + Z. Para R = COOR: gem 0,84 · cis 1,15 · trans 0,56.<br>H do CH= (gem): 5,25 + 0,84 = <b>6,09</b>.<br>H do =CH₂ trans ao COOR: 5,25 + 0,56 = <b>5,81</b>.<br>H do =CH₂ cis ao COOR: 5,25 + 1,15 = <b>6,40</b>.<br>No gráfico os três dd caem perto de 5,8, 6,1 e 6,4.')],
 ['Montagem e ¹³C',P('CH₂=CH–C(=O)–O–CH₂CH₃: <b>acrilato de etila</b>. ¹³C, '+TG.t+': C=O ≈166 (s) · CH₂= ≈130 (t) · =CH ≈128 (d) · OCH₂ ≈60 (t) · CH₃ ≈14 (q). Cinco sinais.')]],
 resp:'acrilato de etila',
 q:[Q('Problema 4.3 C (C₅H₈O₂): qual a estrutura?',['Acrilato de etila','Propanoato de vinila','Acetato de alila','Metacrilato de metila'],'O vinil (3 dd entre 5,8 e 6,4) mais etila de éster (q 4,2 e t 1,3) fecham C₅H₈O₂. Metacrilato de metila teria CH₃ vinílico em ≈1,9 e OCH₃ singleto.'),
    Q('Problema 4.3 C: qual o δ calculado (Z) do H geminal ao COOR no CH=? (5,25 + Z gem = 0,84)',['≈ 6,09','≈ 5,81','≈ 6,40','≈ 4,41'],'Z gem do COOR é 0,84: 5,25 + 0,84 = 6,09.')]},

{id:'43D',g:'43',t:'4.3 D · C₄H₈O',
 dados:P('<b>Dado:</b> C₄H₈O. '+TG.g+' ≈9,7 (d, 1 H) · ≈2,4 (septeto de dubletos, 1 H) · ≈1,1 (d, 6 H).'),
 passos:[
 ['Fórmula e GDH',P('GDH = (2·4 + 2 − 8) ÷ 2 = <b>1</b>. Com o sinal em 9,7, a insaturação é um C=O de aldeído.')],
 ['Integração',P('1 + 1 + 6 = 8 H. Um dubleto de 6 H são dois CH₃ equivalentes.')],
 ['9,7 ppm',P('Um H em 9 a 10 ppm é H–C=O de aldeído. Aparece como dubleto com J pequena (≈1,5 Hz): acopla com o CH vizinho.')],
 ['Septeto de dubletos',P('O CH em ≈2,4 vê 6 H (dois CH₃) com J ≈ 7 Hz: 6 + 1 = <b>7 linhas</b> (septeto), e vê o H do CHO com J ≈ 1,5 Hz: cada linha vira dubleto. Os dois CH₃ em ≈1,1 são um dubleto (1 vizinho), 6 H.')],
 ['Montagem e ¹³C',P('(CH₃)₂CH–CHO: <b>2-metilpropanal</b> (isobutiraldeído). ¹³C, '+TG.t+': CHO ≈205 (d) · CH ≈41 (d) · 2 CH₃ ≈16 (q). Três sinais para 4 C, porque os dois CH₃ são equivalentes.')]],
 resp:'2-metilpropanal',
 q:[Q('Problema 4.3 D: por que o CH em ≈2,4 é um "septeto de dubletes"?',['6 H vizinhos dos CH₃ (septeto) e 1 H do CHO (dubleto)','7 H vizinhos no total','Dois CH₂ vizinhos','Acopla com o O–H'],'Os dois CH₃ dão 6 H vizinhos: 6 + 1 = 7 linhas. O H do aldeído divide cada uma em duas.'),
    Q('Problema 4.3 D: o que um sinal de 1 H em 9,7 ppm sugere?',['Aldeído (H–C=O)','Ácido carboxílico (H de OH ≈ 11)','Fenol','Alceno terminal'],'H ligado direto a C=O de aldeído aparece entre 9 e 10 ppm.')]},

{id:'43E',g:'43',t:'4.3 E · C₇H₇NO₂',
 dados:P('<b>Dado:</b> C₇H₇NO₂. '+TG.g+' ≈8,1 (m, 2 H) · ≈7,3 (m, 2 H) · ≈2,4 (s, 3 H). O ¹³C mostra 5 linhas.'),
 passos:[
 ['Fórmula e GDH',P('GDH = (2·7 + 2 + 1 − 7) ÷ 2 = <b>5</b>. Anel (4) mais 1: o NO₂ (N=O) fecha as cinco insaturações.')],
 ['Integração',P('2 + 2 + 3 = 7 H. O singleto de 3 H é um CH₃ ligado ao anel (≈2,4).')],
 ['Anel dissubstituído',P('7 C e <b>5 sinais de ¹³C</b>: simetria. Os isômeros orto e meta dariam 7 sinais de ¹³C e 4 H aromáticos diferentes; só o <b>para</b> dá 4 C aromáticos + CH₃ = 5, e dois pares de H (2 + 2).')],
 ['Cálculo de δ aromático',P('Tabela D.1: NO₂ orto 8,25, meta 7,55; CH₃ 7,15. H orto ao NO₂ = 7,27 + (8,25 − 7,27) + (7,15 − 7,27) = <b>8,13</b>. H orto ao CH₃ = 7,27 + (7,15 − 7,27) + (7,55 − 7,27) = <b>7,43</b>. Medido ≈8,1 e ≈7,3.')],
 ['Montagem e ¹³C',P('<b>4-nitrotolueno</b>. ¹³C, '+TG.t+': C–NO₂ ≈147 (s) · C–CH₃ ≈146 (s) · CH ≈130 (d, 2 C) · CH ≈124 (d, 2 C) · CH₃ ≈22 (q).')]],
 resp:'4-nitrotolueno',
 q:[Q('Problema 4.3 E (C₇H₇NO₂, 5 sinais de ¹³C): qual a estrutura?',['4-nitrotolueno','2-nitrotolueno','3-nitrotolueno','Benzoato de metila'],'Só o isômero para tem simetria que reduz 7 C a 5 sinais. Orto e meta dão 7.'),
    Q('Problema 4.3 E: GDH de C₇H₇NO₂?',['5','4','6','3'],'(2·7 + 2 + 1 − 7) ÷ 2 = 5. O N entra somando 1.')]},

{id:'43F',g:'43',t:'4.3 F · C₈H₉NO, amida (em DMSO-d₆)',
 dados:P('<b>Dado:</b> C₈H₉NO, amida, em <b>DMSO-d₆</b> (a exceção do enunciado). '+TG.g+' sinal largo em ≈9,9 · ≈7,6 (m) · ≈7,3 (m) · ≈7,0 (m) · ≈2,1 (s). No ¹³C há um septeto em ≈39,5, que é o solvente.'),
 passos:[
 ['Fórmula e GDH',P('GDH = (2·8 + 2 + 1 − 9) ÷ 2 = <b>5</b>: anel (4) e C=O de amida (1).')],
 ['Integração',P('1 (largo, 9,9) + 2 + 2 + 1 (aromáticos, 5 H de anel monossubstituído) + 3 (s, 2,1) = 9 H.')],
 ['Anel monossubstituído',P('Três multipletos com 2 : 2 : 1 H: orto, meta, para. O substituinte é N–H amida: tabela D.1, NHC(=O)R, orto 7,60 · meta 7,30 · para 7,15. Medido ≈7,6 · 7,3 · 7,0.')],
 ['N–H e CH₃',P('O sinal largo em ≈9,9 é N–H de amida: largo por troca e pelo quadrupolo do ¹⁴N, e em DMSO fica bem à esquerda por ligação de H com o solvente. O singleto de 3 H em ≈2,1 é CH₃–C(=O): não tem vizinho com H.')],
 ['Solvente',P('Em DMSO-d₆ o ¹H residual está em 2,50 (quinteto) e o ¹³C em 39,5 (<b>septeto</b>: o C está ligado a 3 D, 2·3·1 + 1 = 7 linhas). O septeto em ≈39,5 no gráfico de ¹³C não é do composto.')],
 ['Montagem e ¹³C',P('C₆H₅–NH–C(=O)–CH₃: <b>acetanilida</b>. ¹³C, '+TG.t+': C=O ≈169 (s) · C ipso ≈140 (s) · CH ≈129 (d, 2 C) · CH ≈123 (d) · CH ≈119 (d, 2 C) · CH₃ ≈24 (q). Seis sinais para 8 C.')]],
 resp:'acetanilida',
 q:[Q('Problema 4.3 F: por que o gráfico de ¹³C tem um septeto perto de 39,5 ppm?',['É o DMSO-d₆: C ligado a 3 D dá 7 linhas','É um CH₂ do composto','É o TMS','É o C=O da amida'],'Linhas = 2nI + 1 = 2·3·1 + 1 = 7, com I(D) = 1. É sinal do solvente.'),
    Q('Problema 4.3 F (C₈H₉NO, amida): qual a estrutura?',['Acetanilida','Benzamida N-metilada','4-aminoacetofenona','Fenilacetamida'],'Anel monossubstituído (5 H), CH₃ singleto em 2,1 e N–H largo em ≈9,9: C₆H₅–NH–CO–CH₃.')]},

{id:'43G',g:'43',t:'4.3 G · C₄H₈O, éter',
 dados:P('<b>Dado:</b> C₄H₈O, éter. '+TG.g+' ≈6,5 (dd) · ≈4,2 (dd) · ≈4,0 (dd) · ≈3,7 (q) · ≈1,3 (t).'),
 passos:[
 ['Fórmula e GDH',P('GDH = (2·4 + 2 − 8) ÷ 2 = <b>1</b>. É éter, então a insaturação é uma C=C (não há C=O).')],
 ['Integração',P('1 + 1 + 1 + 2 + 3 = 8 H. Os três dd de 1 H cada são o vinil; o q de 2 H e o t de 3 H são uma etila ligada a O.')],
 ['Z para o vinil',P('R = OR alifático: gem 1,18 · cis −1,06 · trans −1,28.<br>H do O–CH=: 5,25 + 1,18 = <b>6,43</b> (obs ≈6,5, dd).<br>H do =CH₂ cis ao OR: 5,25 − 1,06 = <b>4,19</b> (obs ≈4,2).<br>H do =CH₂ trans ao OR: 5,25 − 1,28 = <b>3,97</b> (obs ≈4,0).')],
 ['J do vinil',P('O H do =CH₂ cis ao O tem J trans com o H do CH (≈14 Hz) e o outro, J cis (≈6,5 Hz). A J geminal entre os dois H do =CH₂ é ≈2 Hz.')],
 ['Montagem e ¹³C',P('CH₂=CH–O–CH₂CH₃: <b>éter etil vinílico</b>. O OCH₂ fica em ≈3,7, mais alto que um éter saturado (≈3,4), porque o O está conjugado com a C=C. ¹³C, '+TG.t+': O–CH= ≈152 (d) · =CH₂ ≈86 (t) · OCH₂ ≈63 (t) · CH₃ ≈15 (q). O =CH₂ fica em 86 porque o O doa elétrons e blinda o carbono β.')]],
 resp:'éter etil vinílico',
 q:[Q('Problema 4.3 G: o H do =CH₂ trans ao OR calculado por Z (OR: trans −1,28) fica em:',['≈ 3,97','≈ 4,19','≈ 6,43','≈ 6,53'],'5,25 − 1,28 = 3,97.'),
    Q('Problema 4.3 G (C₄H₈O, éter): qual a estrutura?',['Etil vinil éter','Éter metil alílico','Tetraidrofurano','Éter dietílico'],'Três dd de 1 H (vinil), quarteto de 2 H + tripleto de 3 H (etila em O). O THF e o éter dietílico não têm H vinílico.')]},

{id:'43H',g:'43',t:'4.3 H · C₁₀H₁₂O₂, éster',
 dados:P('<b>Dado:</b> C₁₀H₁₂O₂, éster. '+TG.g+' ≈8,05 (m, 2 H) · ≈7,5 (m, 1 H) · ≈7,4 (m, 2 H) · ≈4,3 (t, 2 H) · ≈1,8 (rotulado sept) · ≈1,0 (t, 3 H).'),
 passos:[
 ['Fórmula e GDH',P('GDH = (2·10 + 2 − 12) ÷ 2 = <b>5</b>: anel (4) e C=O de éster (1).')],
 ['Integração',P('2 + 1 + 2 + 2 + 2 + 3 = 12 H. Aromáticos 5 H (anel monossubstituído) e cadeia propila.')],
 ['Aromático',P('Tabela D.1, C(=O)OR: orto 8,15 · meta 7,45 · para 7,55. O sinal de 2 H em ≈8,05 são os H orto ao C=O (muito desblindados). 1 H em 7,5 é o para; 2 H em 7,4 são os meta.')],
 ['A cadeia',P('Tripleto de 2 H em ≈4,3: O–CH₂ (parecido com o 4,12 do acetato de etila, mais alto porque o C=O é de benzoato). Tripleto de 3 H em 1,0: CH₃ terminal. O CH₂ do meio em ≈1,8 tem 2 + 3 = 5 vizinhos: <b>sexteto</b>. O livro rotula "sept"; segui a regra n + 1.')],
 ['Montagem e ¹³C',P('C₆H₅–C(=O)–O–CH₂CH₂CH₃: <b>benzoato de propila</b>. ¹³C, '+TG.t+': C=O ≈166 (s) · C ipso ≈130 (s) · CH ≈133 (d) · CH ≈129,5 (d, 2 C) · CH ≈128 (d, 2 C) · OCH₂ ≈66 (t) · CH₂ ≈22 (t) · CH₃ ≈10 (q). Oito sinais para 10 C.')]],
 resp:'benzoato de propila',
 q:[Q('Problema 4.3 H (C₁₀H₁₂O₂): qual a estrutura?',['Benzoato de propila','Fenilacetato de etila','Propanoato de fenila','Benzoato de isopropila'],'O OCH₂ é tripleto (precisa de CH₂ vizinho). Benzoato de isopropila teria um septeto de 1 H em ≈5,2 e um dubleto de 6 H.'),
    Q('Problema 4.3 H: quantos vizinhos tem o CH₂ do meio da propila (O–CH₂–CH₂–CH₃)?',['5 (resultando em sexteto)','3 (quarteto)','2 (tripleto)','6 (septeto)'],'2 H do OCH₂ + 3 H do CH₃ = 5 vizinhos, 5 + 1 = 6 linhas.')]},

/* ============ 5.7 ============ */
{id:'57A',g:'57',t:'5.7 A · C₅H₁₀O, C=O em 211,8',
 dados:P('<b>Dado:</b> C₅H₁₀O, C=O em 211,8 ppm (espectro fora de ressonância, 25,2 MHz, CDCl₃). '+TG.g+' s 211,8 · d ≈42 · q ≈27 · q ≈18 (o mais intenso). O sinal em ≈77 é o CDCl₃.'),
 passos:[
 ['GDH e carbonila',P('GDH = (2·5 + 2 − 10) ÷ 2 = <b>1</b> (o C=O). δ 211,8 é típico de cetona (aldeído ficaria em 190 a 205, e seria um d).')],
 ['Multiplicidade = nº de H',P('s = 0 H, d = 1 H, t = 2 H, q = 3 H. Soma de H: C=O 0 + CH 1 + CH₃ 3 + CH₃ (×2) 6 = 10 H. Fecha com a fórmula.')],
 ['Contar sinais',P('5 C, mas só <b>4 sinais</b>: o q mais alto (≈18) é de dois CH₃ equivalentes. Isso aponta para um grupo isopropila.')],
 ['Montagem',P('CH₃–C(=O)–CH(CH₃)₂: <b>3-metil-2-butanona</b>. d ≈42 é o CH vizinho do C=O; q ≈27 é o CH₃ do acetil; q ≈18 são os 2 CH₃ do isopropil.')]],
 resp:'3-metil-2-butanona',
 q:[Q('Problema 5.7 A: o que significa o q de maior intensidade em ≈18 ppm?',['Dois CH₃ equivalentes (isopropila)','Um CH₃ com mais H','Um CH₂','Ruído'],'Carbonos equivalentes por simetria dão um só sinal, mais intenso.'),
    Q('Problema 5.7 A (C₅H₁₀O, s em 211,8; d; q; q): qual a estrutura?',['3-metil-2-butanona','2-pentanona','3-pentanona','Pentanal'],'3-pentanona teria só 3 sinais (simetria) e 2-pentanona teria 5. O pentanal teria um d perto de 202.')]},

{id:'57B',g:'57',t:'5.7 B · C₄H₁₀O',
 dados:P('<b>Dado:</b> C₄H₁₀O. '+TG.g+' d ≈69 · t ≈32 · q ≈23 · q ≈10.'),
 passos:[
 ['GDH',P('GDH = (2·4 + 2 − 10) ÷ 2 = <b>0</b>. Saturado: álcool ou éter.')],
 ['O carbono ≈69',P('Um d (1 H) em ≈69 é C–H ligado a O. Se fosse éter com dois C–O, haveria dois sinais entre 50 e 80. Um só C–O e um CH: <b>CH–OH</b> de álcool secundário.')],
 ['Multiplicidades',P('d (1 H) + t (2 H) + 2 q (3 + 3 H) = 9 H de C–H, mais 1 H do OH = 10. Quatro sinais para 4 C: nenhum equivalente.')],
 ['Montagem',P('CH₃–CH(OH)–CH₂–CH₃: <b>2-butanol</b>. q ≈23 é o CH₃ ligado ao CH(OH); t ≈32 é o CH₂; q ≈10 é o CH₃ da etila.')]],
 resp:'2-butanol',
 q:[Q('Problema 5.7 B (C₄H₁₀O): d ≈69, t ≈32, q ≈23, q ≈10. Qual a estrutura?',['2-butanol','1-butanol','2-metil-2-propanol','Éter dietílico'],'1-butanol teria um t em ≈62 (CH₂OH). O 2-metil-2-propanol tem só 2 sinais e um s em ≈69.'),
    Q('Problema 5.7 B: um d em ≈69 ppm corresponde a:',['CH ligado a O','CH₂ ligado a O','C=O','CH₃ ligado a N'],'d = 1 H e a faixa 50 a 90 é de C–O.')]},

{id:'57C',g:'57',t:'5.7 C · C₁₁H₁₄O₂',
 dados:P('<b>Dado:</b> C₁₁H₁₄O₂. '+TG.g+' s ≈166 · d ≈133 · s ≈130 · d ≈129,5 · d ≈128 · t ≈65 · t ≈31 · t ≈19 · q ≈14.'),
 passos:[
 ['GDH',P('GDH = (2·11 + 2 − 14) ÷ 2 = <b>5</b>: anel (4) + C=O (1).')],
 ['Anel monossubstituído',P('Entre 128 e 133 há 1 s (≈130, o C ipso) e 3 d. Seis C aromáticos em 4 sinais: ipso (s), orto ×2 (d), meta ×2 (d), para (d). Esse padrão (1 s e 3 d) é de anel <b>monossubstituído</b>.')],
 ['C=O e O–CH₂',P('s ≈166: C=O de éster conjugado com anel (benzoato; ácido alifático ficaria perto de 173). t ≈65: O–CH₂.')],
 ['Cadeia',P('Três t e 1 q = CH₂CH₂CH₂ e CH₃: butila. Total: 6 C do anel + 1 C=O + 4 C da cadeia = 11 C. 9 sinais.')],
 ['Montagem',P('C₆H₅–C(=O)–O–CH₂CH₂CH₂CH₃: <b>benzoato de butila</b>. t ≈65 (OCH₂), ≈31, ≈19 (CH₂), q ≈14 (CH₃).')]],
 resp:'benzoato de butila',
 q:[Q('Problema 5.7 C: 3 d e 1 s entre 128 e 133 ppm, para 6 C aromáticos, indicam:',['Anel monossubstituído','Anel para-dissubstituído com grupos iguais','Benzeno','Anel trissubstituído'],'Ipso (s) + orto (2 C, d) + meta (2 C, d) + para (d): 6 C, 4 sinais.'),
    Q('Problema 5.7 C: por que o C=O em ≈166 e não em ≈173?',['Conjugação com o anel (benzoato)','Efeito do solvente','É amida','É cetona'],'Éster de ácido alifático fica perto de 173; o anel conjugado desloca para ≈166.')]},

{id:'57D',g:'57',t:'5.7 D · C₃H₆O',
 dados:P('<b>Dado:</b> C₃H₆O. '+TG.g+' d ≈137 · t ≈115 · t ≈63.'),
 passos:[
 ['GDH',P('GDH = (2·3 + 2 − 6) ÷ 2 = <b>1</b>. Sem sinal de C=O (≥190), então é C=C (ou anel).')],
 ['C=C',P('d (1 H) em ≈137 e t (2 H) em ≈115: um =CH– e um =CH₂ de vinil. Os dois ficam entre 100 e 150.')],
 ['O terceiro C',P('t em ≈63: CH₂ ligado a O. Sobram 1 H para o OH: 1 + 2 + 2 + 1 = 6 H.')],
 ['Montagem',P('CH₂=CH–CH₂–OH: <b>álcool alílico</b> (2-propen-1-ol).')]],
 resp:'álcool alílico',
 q:[Q('Problema 5.7 D (C₃H₆O: d ≈137, t ≈115, t ≈63): qual a estrutura?',['Álcool alílico','Propanal','Acetona','Óxido de propileno'],'Aldeído e cetona teriam sinal acima de 190. O óxido de propileno não tem C sp² (≥100).'),
    Q('Problema 5.7 D: o t em ≈115 é:',['=CH₂ terminal do vinil','CH₂–OH','CH₃','C=O'],'t = 2 H, e 100 a 150 é região de C=C.')]},

{id:'57E',g:'57',t:'5.7 E · C₅H₁₁Br',
 dados:P('<b>Dado:</b> C₅H₁₁Br. '+TG.g+' t ≈42 · t ≈32 · d ≈27 · q ≈22 (alto).'),
 passos:[
 ['GDH',P('GDH = (2·5 + 2 − 11 − 1) ÷ 2 = <b>0</b>. O Br conta como H na conta.')],
 ['Sinais e H',P('t + t + d + q = 2 + 2 + 1 + 3 = 8 H, e a fórmula tem 11. Faltam 3 H: o q é <b>dois CH₃ equivalentes</b> (6 H). 5 C em 4 sinais.')],
 ['Isopropila',P('O d (1 H) e o q duplo apontam para (CH₃)₂CH–. Os dois t são CH₂CH₂.')],
 ['Montagem',P('(CH₃)₂CH–CH₂–CH₂–Br: <b>1-bromo-3-metilbutano</b>. t ≈32: CH₂Br (o Br leva o C para ≈32, e não para ≥50, o efeito do átomo pesado); t ≈42: CH₂ do meio; d ≈27: CH; q ≈22: 2 CH₃.')]],
 resp:'1-bromo-3-metilbutano',
 q:[Q('Problema 5.7 E: por que há 4 sinais para C₅H₁₁Br?',['Dois CH₃ equivalentes dão um só sinal','Um C não aparece','Um é do solvente','Há um duplo sinal do Br'],'Em (CH₃)₂CH– os dois CH₃ são trocados pela simetria.'),
    Q('Problema 5.7 E: GDH de C₅H₁₁Br?',['0','1','2','−1'],'(2·5 + 2 − 11 − 1) ÷ 2 = 0.')]},

{id:'57F',g:'57',t:'5.7 F · C₇H₇ClO',
 dados:P('<b>Dado:</b> C₇H₇ClO. '+TG.g+' s ≈158 · d ≈129,5 · s ≈125,5 · d ≈115 · q ≈55.'),
 passos:[
 ['GDH',P('GDH = (2·7 + 2 − 7 − 1) ÷ 2 = <b>4</b>: anel aromático.')],
 ['Anel com 2 s e 2 d',P('Dois d e dois s para 6 C aromáticos: 2 C com substituinte (s) e 4 CH em 2 pares (d, 2 C cada). É <b>para</b>-dissubstituído.')],
 ['q ≈55',P('q em ≈55: CH₃ ligado a O (OCH₃ aromático, 55 a 56).')],
 ['Quem é quem',P('s ≈158: C–OCH₃ (o O desblinda). s ≈125,5: C–Cl. d ≈115: CH orto ao OCH₃ (blindado por doação do O). d ≈129,5: CH orto ao Cl.')],
 ['Montagem',P('<b>4-cloroanisol</b> (1-cloro-4-metoxibenzeno).')]],
 resp:'4-cloroanisol',
 q:[Q('Problema 5.7 F: qual a estrutura?',['4-cloroanisol','2-cloroanisol','3-cloroanisol','Cloreto de benzila'],'Quatro sinais aromáticos (2 s, 2 d) só aparecem no para. Orto e meta dão 6.'),
    Q('Problema 5.7 F: o d em ≈115 é do CH orto a:',['OCH₃ (blindado por doação do O)','Cl','C=O','CH₃'],'O oxigênio doa por ressonância e blinda os C orto e para.')]},

{id:'57G',g:'57',t:'5.7 G · C₈H₁₉N',
 dados:P('<b>Dado:</b> C₈H₁₉N. '+TG.g+' t ≈58 · d ≈28,5 · q ≈20,5 (alto).'),
 passos:[
 ['GDH',P('GDH = (2·8 + 2 + 1 − 19) ÷ 2 = <b>0</b>. Amina saturada.')],
 ['Sinais',P('3 sinais para 8 C: simetria grande. Uma unidade N–CH₂–CH(CH₃)₂ tem 4 C e 2 + 1 + 6 = 9 H. A fórmula tem 8 C e 19 H: <b>duas unidades</b> (8 C, 18 H) mais 1 H do N–H.')],
 ['Cada unidade',P('N–CH₂–CH(CH₃)₂: t em ≈58 (CH₂ ligado a N), d em ≈28,5 (CH), q em ≈20,5 (2 CH₃).')],
 ['Montagem',P('Duas unidades isobutila ligadas a N: (CH₃)₂CHCH₂–NH–CH₂CH(CH₃)₂, <b>diisobutilamina</b>. C: 2 × 4 = 8. H: 18 + 1 (NH) = 19.')]],
 resp:'diisobutilamina',
 q:[Q('Problema 5.7 G (C₈H₁₉N, três sinais: t, d, q): qual a estrutura?',['Diisobutilamina','Octilamina','Dibutilamina','Trietilamina com mais C'],'Octilamina teria 8 sinais. A dibutilamina teria 4 sinais (sem d).'),
    Q('Problema 5.7 G: por que só 3 sinais para 8 C?',['As duas isobutilas são equivalentes e os 2 CH₃ de cada uma também','Falta resolução','Os CH₂ se sobrepõem por acaso','O N elimina sinais'],'Simetria da molécula e simetria da isopropila.')]},

{id:'57H',g:'57',t:'5.7 H · C₄H₉NO₂',
 dados:P('<b>Dado:</b> C₄H₉NO₂. '+TG.g+' s ≈157 · t ≈61 · q ≈27,5 · q ≈14,5 (alto).'),
 passos:[
 ['GDH',P('GDH = (2·4 + 2 + 1 − 9) ÷ 2 = <b>1</b>. Um C=O (o s ≈157) ou N=O.')],
 ['s ≈157',P('Cetona fica em ≈210, aldeído em 190 a 205, éster e amida em 165 a 175. Um C=O em ≈157 é de um C ligado a O e a N ao mesmo tempo: <b>carbamato</b> (150 a 160).')],
 ['t ≈61 e q ≈27,5',P('t ≈61: O–CH₂ (de uma etila de éster). q ≈27,5: CH₃ ligado a N (N–CH₃ tem 25 a 40). Se fosse CH₃–O estaria em ≈52 (q) e o CH₂ ligado a N em ≈35 (t); os valores observados mostram o outro arranjo.')],
 ['Montagem',P('CH₃CH₂–O–C(=O)–NH–CH₃: <b>N-metilcarbamato de etila</b>. q ≈14,5: CH₃ da etila. H: 2 + 3 + 3 + 1 (NH) = 9.')]],
 resp:'N-metilcarbamato de etila',
 q:[Q('Problema 5.7 H: por que um C=O em ≈157 sugere carbamato e não éster?',['O C está ligado a O e a N ao mesmo tempo e fica mais blindado que o éster','É um C=O de cetona','Porque há um anel aromático','Porque é um aldeído'],'Éster/amida ficam perto de 170, cetona perto de 210. Carbamato e ureia ficam entre 150 e 160.'),
    Q('Problema 5.7 H: o t em ≈61 prova que o CH₂ está ligado a:',['O','N','C=O','Ar'],'CH₂–O fica em 60 a 70; CH₂–N em 35 a 50.')]},

/* ============ 5.1 ============ */
{id:'51a',g:'51',t:'5.1 a · 4-(4-formilfenoxi)butanoato de metila',
 dados:P('<b>Pedido:</b> desenhar o espectro de ¹H e o de ¹³C desacoplado (CDCl₃), com proporções. Estrutura: OHC–C₆H₄–O–CH₂CH₂CH₂–C(=O)–OCH₃ (para), C₁₂H₁₄O₄.'),
 passos:[
 ['GDH',P('(2·12 + 2 − 14) ÷ 2 = <b>6</b>: anel (4) + C=O de aldeído + C=O de éster.')],
 ['¹H esperado',tb(['δ','H','Sinal','Quem'],[['≈9,9','1','s','CHO'],['≈7,8','2','d, J ≈ 9 Hz','H orto ao CHO'],['≈7,0','2','d, J ≈ 9 Hz','H orto ao O'],['≈4,1','2','t','O–CH₂'],['3,7','3','s','O–CH₃ do éster'],['≈2,5','2','t','CH₂–C=O'],['≈2,1','2','quint','CH₂ do meio']])+P('Total 14 H. Aditividade aromática (tabela D.1): H orto ao CHO = 7,27 + 0,68 + 0,08 = 8,03; H orto ao O = 7,27 − 0,27 + 0,23 = 7,23. Para doador e receptor em para (efeito push-pull) o real fica mais separado, em ≈7,8 e ≈7,0.')],
 ['¹³C esperado',P(TG.t+' <b>10 sinais</b> para 12 C (os 4 CH do anel dão 2). CHO ≈191 (d) · C=O éster ≈173 (s) · C–O ≈164 (s) · CH ≈132 (d, 2 C) · C–CHO ≈130 (s) · CH ≈115 (d, 2 C) · OCH₂ ≈67 (t) · OCH₃ ≈52 (q) · CH₂C=O ≈30 (t) · CH₂ ≈24 (t).')]],
 resp:'10 sinais de ¹³C; 7 de ¹H',
 q:[Q('Problema 5.1 a: quantos sinais de ¹³C tem o 4-(4-formilfenoxi)butanoato de metila (C₁₂)?',['10','12','8','6'],'Os 4 CH do anel dão 2 sinais (2 pares): 12 − 2 = 10.'),
    Q('Problema 5.1 a: como se vê o H do CHO no ¹H?',['Singleto de 1 H em ≈9,9','Tripleto de 1 H em ≈4,1','Dubleto de 2 H em ≈7,8','Singleto de 3 H em 3,7'],'O H de aldeído sem vizinho com H em 9 a 10 ppm.')]},

{id:'51b',g:'51',t:'5.1 b · ácido 3-metil-4-pentenoico',
 dados:P('<b>Estrutura:</b> CH₂=CH–CH(CH₃)–CH₂–COOH, C₆H₁₀O₂.'),
 passos:[
 ['GDH',P('(2·6 + 2 − 10) ÷ 2 = <b>2</b>: C=C + C=O do ácido.')],
 ['¹H esperado',tb(['δ','H','Sinal','Quem'],[['≈11,5','1','s largo','COOH'],['≈5,8','1','ddd (J ≈ 17, 10, 7 Hz)','CH='],['≈5,0','2','2 dd (J ≈ 17 e 10; geminal ≈ 1,5)','=CH₂'],['≈2,8','1','m','CH(CH₃)'],['≈2,3','2','m (H diastereotópicos)','CH₂C=O'],['≈1,1','3','d (J ≈ 7)','CH₃']])+P('Os 2 H do CH₂ estão ao lado de um carbono quiral (o CH): são diastereotópicos e podem aparecer como dois dd, e não como um d simples.')],
 ['¹³C esperado',P(TG.t+' <b>6 sinais</b> para 6 C: C=O ≈179 (s) · CH= ≈142 (d) · =CH₂ ≈114 (t) · CH₂ ≈41 (t) · CH ≈35 (d) · CH₃ ≈19 (q).')]],
 resp:'6 sinais de ¹³C',
 q:[Q('Problema 5.1 b: por que os 2 H do CH₂C(=O) podem não ser equivalentes?',['Estão ao lado de um C quiral (diastereotópicos)','Porque têm J diferentes com o OH','São de grupos funcionais diferentes','Não são equivalentes nunca'],'O CH(CH₃) é um centro quiral; os H do CH₂ vizinho ficam em ambientes diferentes.'),
    Q('Problema 5.1 b: GDH do C₆H₁₀O₂?',['2','1','3','0'],'(2·6 + 2 − 10) ÷ 2 = 2.')]},

{id:'51c',g:'51',t:'5.1 c · dipropilamina',
 dados:P('<b>Estrutura:</b> CH₃CH₂CH₂–NH–CH₂CH₂CH₃, C₆H₁₅N.'),
 passos:[
 ['GDH',P('(2·6 + 2 + 1 − 15) ÷ 2 = <b>0</b>.')],
 ['¹H esperado',tb(['δ','H','Sinal','Quem'],[['≈2,6','4','t','N–CH₂'],['≈1,5','4','sexteto','CH₂ do meio'],['≈0,9','6','t','CH₃'],['≈1 (varia)','1','s largo','N–H']])+P('A simetria reduz os 14 H de C–H a 3 sinais. O N–H varia com concentração e troca.')],
 ['¹³C esperado',P(TG.t+' <b>3 sinais</b> para 6 C: N–CH₂ ≈52 (t) · CH₂ ≈23 (t) · CH₃ ≈12 (q).')]],
 resp:'3 sinais de ¹³C; 4 de ¹H',
 q:[Q('Problema 5.1 c: quantos sinais de ¹³C tem a dipropilamina?',['3','6','4','2'],'As duas propilas são equivalentes: 3 tipos de C.'),
    Q('Problema 5.1 c: o N–CH₂ da dipropilamina aparece como:',['Tripleto em ≈2,6','Sexteto em 1,5','Singleto em 0,9','Quarteto em 3,4'],'Vizinho = CH₂ (2 H) → t. O δ é alto por estar ligado a N.')]},

{id:'51d',g:'51',t:'5.1 d · 3-metil-1H-pirrol-2-carbaldeído',
 dados:P('<b>Estrutura:</b> pirrol com CHO no C2 (ao lado do N) e CH₃ no C3, C₆H₇NO.'),
 passos:[
 ['GDH',P('(2·6 + 2 + 1 − 7) ÷ 2 = <b>4</b>: anel pirrol (2 C=C + anel = 3) + C=O (1).')],
 ['¹H esperado',tb(['δ','H','Sinal','Quem'],[['≈9–10','1','s largo','N–H'],['≈9,5','1','s','CHO'],['≈6,9','1','m (J ≈ 2,5 a 3 Hz)','H5 (α ao N)'],['≈6,1','1','m','H4'],['≈2,3','3','s','CH₃']])+P(TG.t+' A multiplicidade de H4 e H5 vem de J ≈ 2,5 a 3 Hz entre si e com o N–H.')],
 ['¹³C esperado',P(TG.t+' <b>6 sinais</b>: CHO ≈177 (d) · C3 ≈133 (s) · C2 ≈130 (s) · C5 ≈125 (d) · C4 ≈112 (d) · CH₃ ≈11 (q).')]],
 resp:'6 sinais de ¹³C; 5 de ¹H',
 q:[Q('Problema 5.1 d: o CHO ligado a pirrol aparece em ¹³C como:',['d perto de 177','s perto de 177','t perto de 60','q perto de 177'],'C=O de aldeído tem 1 H: dubleto no fora de ressonância, e fica entre 175 e 190.'),
    Q('Problema 5.1 d: quantos sinais de ¹H dá o 3-metil-1H-pirrol-2-carbaldeído?',['5','7','3','6'],'N–H, CHO, H5, H4 e CH₃: 5 sinais, sem equivalência.')]},

{id:'51e',g:'51',t:'5.1 e · acetofenona',
 dados:P('<b>Estrutura:</b> C₆H₅–C(=O)–CH₃, C₈H₈O.'),
 passos:[
 ['GDH',P('(2·8 + 2 − 8) ÷ 2 = <b>5</b>.')],
 ['¹H esperado',tb(['δ','H','Sinal','Quem'],[['≈7,95','2','m (dd)','H orto ao C=O'],['≈7,55','1','m (t)','H para'],['≈7,45','2','m (t)','H meta'],['≈2,6','3','s','CH₃']])+P('Tabela D.1, C(=O)CH₃: orto 7,90 · meta 7,55 · para 7,55.')],
 ['¹³C esperado',P(TG.t+' <b>6 sinais</b> para 8 C: C=O ≈198 (s) · C ipso ≈137 (s) · CH para ≈133 (d) · CH ≈128,6 (d, 2 C) · CH ≈128,3 (d, 2 C) · CH₃ ≈27 (q).')]],
 resp:'6 sinais de ¹³C; 4 de ¹H',
 q:[Q('Problema 5.1 e: quantos sinais de ¹³C tem a acetofenona?',['6','8','4','5'],'Os 6 C do anel dão 4 sinais, mais C=O e CH₃: 6.'),
    Q('Problema 5.1 e: no fora de ressonância, o C ipso do anel aparece como:',['Singleto','Dubleto','Tripleto','Quarteto'],'O C ipso não tem H.')]},

{id:'51f',g:'51',t:'5.1 f · (E)-2-butenoato de metila',
 dados:P('<b>Estrutura:</b> CH₃–CH=CH–C(=O)–OCH₃ com os H em lados opostos (E), C₅H₈O₂.'),
 passos:[
 ['GDH',P('(2·5 + 2 − 8) ÷ 2 = <b>2</b>.')],
 ['Cálculo Z',P('H do carbono β (com CH₃): gem alquila 0,44 + cis COOR 1,15 = 5,25 + 1,59 = <b>6,84</b>. H do carbono α: gem COOR 0,84 + cis alquila (−0,26) = 5,25 + 0,58 = <b>5,83</b>.')],
 ['¹H esperado',tb(['δ','H','Sinal','Quem'],[['≈6,95','1','dq (J ≈ 15,6 e 6,9)','H β'],['≈5,85','1','dq (J ≈ 15,6 e 1,7)','H α'],['3,7','3','s','OCH₃'],['≈1,9','3','dd (J ≈ 6,9 e 1,7)','CH₃']])+P('J ≈ 15,6 Hz entre os H da dupla é <b>trans</b> (cis fica em 6 a 12 Hz).')],
 ['¹³C esperado',P(TG.t+' <b>5 sinais</b>: C=O ≈167 (s) · CH β ≈145 (d) · CH α ≈122 (d) · OCH₃ ≈51 (q) · CH₃ ≈18 (q).')]],
 resp:'5 sinais de ¹³C; 4 de ¹H',
 q:[Q('Problema 5.1 f: uma J de ≈15,6 Hz entre dois H de uma dupla indica:',['Configuração trans (E)','Configuração cis (Z)','Acoplamento geminal','Acoplamento a longa distância'],'Trans: 12 a 18 Hz; cis: 6 a 12 Hz.'),
    Q('Problema 5.1 f: δ calculado (Z) do H α: 5,25 + 0,84 (gem COOR) − 0,26 (cis alquila):',['≈5,83','≈6,84','≈4,0','≈6,4'],'5,25 + 0,84 − 0,26 = 5,83.')]},

{id:'51g',g:'51',t:'5.1 g · (E)-1-metoxipropeno',
 dados:P('<b>Estrutura:</b> CH₃–CH=CH–O–CH₃, H em lados opostos (E), C₄H₈O.'),
 passos:[
 ['GDH',P('(2·4 + 2 − 8) ÷ 2 = <b>1</b>.')],
 ['Cálculo Z',P('H do O–CH=: gem OR 1,18 + cis alquila (−0,26): 5,25 + 0,92 = <b>6,17</b>. H do =CH–CH₃: gem alquila 0,44 + cis OR (−1,06): 5,25 − 0,62 = <b>4,63</b>.')],
 ['¹H esperado',tb(['δ','H','Sinal','Quem'],[['≈6,2','1','dq (J ≈ 12,7 e 1,5)','O–CH='],['≈4,7','1','dq (J ≈ 12,7 e 6,7)','=CH–CH₃'],['3,5','3','s','OCH₃'],['≈1,55','3','dd (J ≈ 6,7 e 1,5)','CH₃']])],
 ['¹³C esperado',P(TG.t+' <b>4 sinais</b>: O–CH= ≈147 (d) · =CH ≈101 (d) · OCH₃ ≈55 (q) · CH₃ ≈13 (q). O C β ao O (≈101) é blindado pela doação do oxigênio.')]],
 resp:'4 sinais de ¹³C; 4 de ¹H',
 q:[Q('Problema 5.1 g: por que o =CH–CH₃ de um enol éter fica perto de 4,7 e não em 5,3?',['O oxigênio doa elétrons e blinda o C β (Z cis OR = −1,06)','O CH₃ blinda mais','Por causa do solvente','Porque é trans'],'5,25 + 0,44 − 1,06 = 4,63.'),
    Q('Problema 5.1 g: quantos sinais de ¹H dá o (E)-1-metoxipropeno?',['4','3','5','2'],'OCH=, =CH, OCH₃ e CH₃.')]},

{id:'51h',g:'51',t:'5.1 h · 3-butin-1-ol',
 dados:P('<b>Estrutura:</b> HC≡C–CH₂–CH₂–OH, C₄H₆O.'),
 passos:[
 ['GDH',P('(2·4 + 2 − 6) ÷ 2 = <b>2</b>: uma ligação tripla.')],
 ['¹H esperado',tb(['δ','H','Sinal','Quem'],[['≈3,7','2','t (J ≈ 6)','CH₂–OH'],['≈2,45','2','td (J ≈ 6 e 2,7)','C≡C–CH₂'],['≈2,0','1','t (J ≈ 2,7)','≡C–H'],['≈2 (varia)','1','s largo','O–H']])+P('O H do alcino acopla a longa distância (4 ligações, J ≈ 2,7 Hz) com o CH₂: por isso é um tripleto e o CH₂ vira td.')],
 ['¹³C esperado',P(TG.t+' <b>4 sinais</b>: C≡ (interno) ≈82 (s) · ≡C–H ≈70 (d) · CH₂O ≈61 (t) · CH₂ ≈23 (t).')]],
 resp:'4 sinais de ¹³C; 4 de ¹H',
 q:[Q('Problema 5.1 h: por que o H do alcino terminal é um tripleto?',['Acoplamento a longa distância (4J ≈ 2,7 Hz) com o CH₂','Dois H vizinhos diretos','Acopla com o O–H','É um erro de desenho'],'C≡C–CH₂ tem 4 ligações entre os H; a J é pequena mas visível.'),
    Q('Problema 5.1 h: o carbono ≡C–H no fora de ressonância é:',['Dubleto (≈70)','Singleto (≈70)','Tripleto','Quarteto'],'Tem 1 H.')]},

/* ============ 5.2 a 5.5 ============ */
{id:'52',g:'52',t:'5.2 · Quantos sinais de ¹³C? (benzeno, tolueno, naftaleno, dodecano e dois bicíclicos)',
 dados:P('<b>Pedido:</b> número de sinais no espectro desacoplado e a multiplicidade de cada um no fora de ressonância (s, d, t, q = 0, 1, 2, 3 H).'),
 passos:[
 ['a, b, c, d',tb(['Composto','C','Sinais','Multiplicidade (fora de ressonância)'],[['a. benzeno','6','1','d'],['b. tolueno','7','5','q (CH₃), s (C1), d (C2/C6), d (C3/C5), d (C4)'],['c. naftaleno','10','3','d (C1/4/5/8), d (C2/3/6/7), s (C4a/C8a)'],['d. dodecano','12','6','q (CH₃, ×2 C), t (5 CH₂, cada um ×2 C)']])+P('Dodecano: C1 = C12, C2 = C11, … C6 = C7. Pares simétricos pelo plano no meio da cadeia: 12 C em 6 sinais.')],
 ['e. 1,4-dimetilbiciclo[2.2.2]octan-2-ona',P('C₁₀H₁₆O. Existe um plano de simetria que contém C1, C2, C3, C4 e os dois CH₃. Os dois outros pontes (CH₂CH₂) são trocados por esse plano. Sinais: <b>8</b> para 10 C.')+tb(['Sinal','Tipo'],[['C2 (C=O)','s'],['C1 e C4 (cabeças de ponte, cada um separado)','s, s'],['C3','t'],['C5 = C8','t'],['C6 = C7','t'],['2 CH₃ (um em C1, outro em C4)','q, q']])],
 ['f. biciclo[3.2.1]octan-2-ona',P('C₈H₁₂O. Não há simetria: os 8 C são diferentes. <b>8 sinais</b>: C2 (C=O) s · C1 d · C5 d · C3, C4, C6, C7, C8 t.')]],
 resp:'a 1 · b 5 · c 3 · d 6 · e 8 · f 8',
 q:[Q('Problema 5.2: quantos sinais de ¹³C tem o naftaleno?',['3','10','2','5'],'C1/4/5/8, C2/3/6/7 e C4a/8a: três tipos de C.'),
    Q('Problema 5.2: quantos sinais de ¹³C tem o dodecano?',['6','12','3','4'],'Plano de simetria no meio: 12 C em 6 pares.'),
    Q('Problema 5.2: e o tolueno, e quais as multiplicidades?',['5 sinais: q, s, d, d, d','7 sinais','4 sinais: q, s, d, d','5 sinais: t, s, d, d, d'],'O CH₃ é q; o C1 é s; C2/C6, C3/C5 e C4 são d.')]},

{id:'53',g:'53',t:'5.3 · C₆H₈ com dois sinais de ¹³C',
 dados:P('<b>Dado:</b> C₆H₈, muito simétrico, 2 sinais de ¹³C. DEPT mostra um sinal de CH e um de CH₂.'),
 passos:[
 ['GDH',P('(2·6 + 2 − 8) ÷ 2 = <b>3</b>: pode ser 1 anel + 2 C=C.')],
 ['Contar H',P('Um CH (1 H por C) e um CH₂ (2 H por C). Com 8 H e 6 C: se CH = a carbonos e CH₂ = b: a + b = 6 e a + 2b = 8, então <b>b = 2 e a = 4</b>. Quatro CH e dois CH₂.')],
 ['Montagem',P('Quatro CH em sp² (as duas C=C) e dois CH₂ sp³ em um anel de 6: <b>1,4-ciclo-hexadieno</b>. Cada C=C é simétrica à outra, e os dois CH₂ também: 2 sinais. ¹³C, '+TG.t+': CH= ≈125 (d, 4 C) · CH₂ ≈26 (t, 2 C).')],
 ['Por que não o 1,3?',P('O 1,3-ciclo-hexadieno tem só um eixo C₂ e daria 3 sinais (C1/C4, C2/C3, C5/C6), com 4 CH e 2 CH₂ em tipos diferentes. O benzeno tem GDH 4.')]],
 resp:'1,4-ciclo-hexadieno',
 q:[Q('Problema 5.3: com C₆H₈, 2 sinais, 1 CH e 1 CH₂ (DEPT), quantos C são CH?',['4 (os outros 2 são CH₂)','3','2','6'],'a + b = 6 C e a + 2b = 8 H dão b = 2 e a = 4.'),
    Q('Problema 5.3: qual a estrutura?',['1,4-ciclo-hexadieno','1,3-ciclo-hexadieno','Benzeno','Ciclo-hexeno'],'Só o 1,4 tem simetria suficiente para 2 sinais com 4 CH e 2 CH₂.')]},

{id:'54',g:'54',t:'5.4 · Linhas de ¹³C–D (CDCl₃, CD₂Cl₂, CD₃Cl)',
 dados:P('<b>Pedido:</b> o número de linhas do sinal de ¹³C de Cl₃¹³C–D, Cl₂¹³C(D)₂ e Cl¹³C(D)₃, adaptando o triângulo de Pascal ao acoplamento ¹³C–D.'),
 passos:[
 ['A regra',P('Linhas = <b>2nI + 1</b>, n = número de núcleos acoplados, I = spin. Para ¹H, I = ½: n + 1 (Pascal). Para D, I = 1: <b>3 sinais por núcleo</b>, e as intensidades vêm do triângulo trinomial: cada linha é a soma dos 3 números acima dela (esquerda, centro, direita).')],
 ['Triângulo para D',tb(['n (D)','Linhas','Razão'],[['1','3','1 : 1 : 1'],['2','5','1 : 2 : 3 : 2 : 1'],['3','7','1 : 3 : 6 : 7 : 6 : 3 : 1']])],
 ['Respostas',tb(['Composto','D','Linhas','Aparência'],[['Cl₃¹³C–D (CDCl₃)','1','3','tripleto 1:1:1 (o do solvente, ≈77)'],['Cl₂¹³C(D)₂ (CD₂Cl₂)','2','5','quinteto 1:2:3:2:1'],['Cl¹³C(D)₃ (CD₃Cl)','3','7','septeto 1:3:6:7:6:3:1']])+P('Por isso o CDCl₃ aparece como tripleto 1 : 1 : 1 e o DMSO-d₆ (3 D no CD₃) como septeto. Aplique em qualquer solvente deuterado: acetona-d₆ (CD₃, septeto).')]],
 resp:'3, 5 e 7 linhas',
 q:[Q('Problema 5.4: quantas linhas tem o ¹³C do Cl₂¹³C(D)₂ (dois D)?',['5','3','4','7'],'2nI + 1 = 2·2·1 + 1 = 5; razão 1:2:3:2:1.'),
    Q('Problema 5.4: a razão do septeto do ¹³C–D₃ é:',['1:3:6:7:6:3:1','1:6:15:20:15:6:1','1:2:3:2:1','1:1:1:1:1:1:1'],'Triângulo trinomial (I = 1): 1 : 3 : 6 : 7 : 6 : 3 : 1.'),
    Q('Problema 5.4: por que ¹H dá n + 1 e D dá 2n + 1?',['I(¹H) = ½ e I(D) = 1: linhas = 2nI + 1','Porque D é mais pesado','Porque o D não tem spin','Porque ¹³C tem I = 1'],'Fórmula geral: 2nI + 1.')]},

{id:'55',g:'55',t:'5.5 · Ftalatos de dietila (orto, meta, para)',
 dados:P('<b>Pedido:</b> elementos de simetria, C e H não equivalentes de cada isômero e espectro de ¹³C desacoplado.'),
 passos:[
 ['Simetria (texto do livro)',P('O isômero <b>para</b> tem dois eixos e dois planos de simetria. <b>Orto</b> e <b>meta</b> têm um eixo e um plano; no meta, esses elementos passam por dois C do anel. O plano do anel existe nos três e não afeta os C do anel.')],
 ['Carbonos',tb(['Isômero','C do anel','Todos os sinais','Sinais'],[['orto','C1/C2 · C3/C6 · C4/C5','C=O · 3 do anel · OCH₂ · CH₃','6'],['meta','C1/C3 · C2 · C4/C6 · C5','C=O · 4 do anel · OCH₂ · CH₃','7'],['para','C1/C4 · C2/C3/C5/C6','C=O · 2 do anel · OCH₂ · CH₃','5']])],
 ['Hidrogênios',tb(['Isômero','H aromáticos','Sinais de ¹H (com OCH₂ e CH₃)'],[['orto','H3/H6 · H4/H5','4'],['meta','H2 · H4/H6 · H5','5'],['para','todos os 4 equivalentes','3']])+P('Fora de ressonância: os C do anel com substituinte são s; os CH, d; OCH₂ t; CH₃ q; o C=O é s. O δ típico: C=O ≈166 · C aromáticos 128 a 135 · OCH₂ ≈61 · CH₃ ≈14 ('+TG.t+').')]],
 resp:'orto 6 · meta 7 · para 5 sinais de ¹³C',
 q:[Q('Problema 5.5: quantos sinais de ¹³C tem o p-ftalato de dietila?',['5','6','7','4'],'C=O, C1/C4, os 4 CH iguais, OCH₂ e CH₃: 5.'),
    Q('Problema 5.5: quantos sinais de ¹³C tem o m-ftalato de dietila?',['7','5','6','8'],'C=O, C1/C3, C2, C4/C6, C5, OCH₂ e CH₃: 7.'),
    Q('Problema 5.5: quantos sinais de ¹H tem o o-ftalato de dietila?',['4','3','5','6'],'H3/H6, H4/H5, OCH₂ e CH₃.')]}
];

const GR=[['todos','Todos'],['43','4.3 A a H'],['57','5.7 A a H'],['51','5.1 a a h'],['52','5.2 a 5.5']];
let GSEL='todos';
const gOf=x=>x.g==='52'||x.g==='53'||x.g==='54'||x.g==='55'?'52':x.g;
const esc2=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');

function ptsDraw(){
  const n=+($('#cdN')||{}).value||0,I=($('#cdI')||{}).value==='h'?0.5:1,out=$('#cdOut');if(!out)return;
  let c=[1];
  for(let k=0;k<n;k++){const m=I===1?3:2,nc=new Array(c.length+m-1).fill(0);c.forEach((v,i)=>{for(let j=0;j<m;j++)nc[i+j]+=v;});c=nc;}
  const mx=Math.max.apply(null,c);
  out.innerHTML=P('<b>'+c.length+' linha'+(c.length>1?'s':'')+'</b>: 2·'+n+'·'+I+' + 1 = '+(2*n*I+1)+'. Razão '+c.join(' : ')+'.')
   +'<div class="cdbar" role="img" aria-label="Linhas '+c.join(', ')+'">'+c.map(v=>'<i style="height:'+Math.round(v/mx*54+6)+'px"><b>'+v+'</b></i>').join('')+'</div>';
}
function passosHtml(x){
  return x.passos.map((s,i)=>'<div class="rstp"'+(i?' hidden':'')+' data-i="'+i+'"><h4><b class="rmn">'+(i+1)+'</b> '+s[0]+'</h4>'+s[1]+'</div>').join('');
}
function resDraw(){
  const box=$('#resBox');if(!box)return;
  const vis=RES.filter(x=>GSEL==='todos'||gOf(x)===GSEL);
  box.innerHTML='<p class="hint" style="margin:0 0 8px">Problemas do Silverstein (7ª ed. em português, fotos que você mandou). Tente cada um antes de abrir os passos: os passos aparecem um por vez. As respostas do quiz que você errar voltam em 1, 3 e 7 dias, na Revisão.</p>'
   +'<div class="chipbar" role="group" aria-label="Grupo de problemas">'+GR.map(g=>'<button class="chip" type="button" data-rg="'+g[0]+'" aria-pressed="'+(g[0]===GSEL?'true':'false')+'">'+g[1]+'</button>').join('')+'</div>'
   +'<div class="row" style="margin:6px 0 10px"><button class="btn" type="button" id="resTr">Treinar estes problemas</button></div>'
   +'<div id="resQuiz"></div>'
   +vis.map(x=>'<details class="sec" data-rid="'+x.id+'"><summary>'+x.t+'</summary>'+x.dados+'<div class="rsb">'+passosHtml(x)+'</div>'
     +'<div class="row rsc"><button class="btn ghost" type="button" data-rn="'+x.id+'">Mostrar o próximo passo</button><button class="btn ghost" type="button" data-ra="'+x.id+'">Mostrar tudo</button></div>'
     +'<p class="rres" hidden><b>Resposta:</b> '+x.resp+'</p><div class="row"><button class="btn" type="button" data-rq="'+x.id+'">Testar-me neste problema</button></div><div class="rqz" id="rq_'+x.id+'"></div>'
     +'<p class="srcl" style="margin-top:6px"><b>Fonte:</b> enunciado e espectros do Silverstein (fotos das páginas, 7ª ed. em português). Resolução escrita aqui; os δ marcados "valor de tabela" não foram lidos do gráfico.</p></details>').join('')
   +'<h3 class="rmh">Quantas linhas tem o sinal de ¹³C–D (ou ¹³C–H)?</h3><div class="row"><label>Núcleos acoplados (n)<input type="number" id="cdN" min="0" max="6" value="3" inputmode="numeric"></label><label>Tipo<select id="cdI"><option value="d">D (I = 1)</option><option value="h">H (I = ½)</option></select></label></div><div class="rmout" id="cdOut"></div>';
  ptsDraw();
}
document.addEventListener('input',e=>{if(e.target&&(e.target.id==='cdN'||e.target.id==='cdI'))ptsDraw();});
document.addEventListener('change',e=>{if(e.target&&e.target.id==='cdI')ptsDraw();});
document.addEventListener('click',e=>{
  const rg=e.target.closest('[data-rg]');if(rg){GSEL=rg.dataset.rg;resDraw();return;}
  const rn=e.target.closest('[data-rn]'),ra=e.target.closest('[data-ra]'),rq=e.target.closest('[data-rq]');
  if(rn||ra){
    const id=(rn||ra).dataset.rn||(rn||ra).dataset.ra,d=document.querySelector('[data-rid="'+id+'"]');if(!d)return;
    const hs=[...d.querySelectorAll('.rstp[hidden]')];
    if(ra){hs.forEach(h=>h.hidden=false);}else if(hs[0])hs[0].hidden=false;
    if(!d.querySelectorAll('.rstp[hidden]').length){const r=d.querySelector('.rres');if(r)r.hidden=false;const c=d.querySelector('.rsc');if(c)c.hidden=true;}
    return;}
  if(rq){const x=RES.find(y=>y.id===rq.dataset.rq);if(x)miniQuiz('#rq_'+x.id,x.q,'Pergunta');return;}
  if(e.target.id==='resTr'){
    const bank=[];RES.filter(x=>GSEL==='todos'||gOf(x)===GSEL).forEach(x=>x.q.forEach(q=>bank.push(q)));
    miniQuiz('#resQuiz',bank,'Problemas resolvidos');
    const b=$('#resQuiz');if(b&&b.scrollIntoView)b.scrollIntoView({block:'nearest'});}
});
window.resDraw=resDraw;
window.RES_BANCO=RES;
})();
