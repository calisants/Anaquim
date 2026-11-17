/* ================= ANALORG v10: RMN, tabelas de ¹³C do capítulo 5 do Silverstein =================
   Valores transcritos das páginas 224 a 238 (Silverstein e Webster, 6ª ed.). Onde a tabela do livro é um desenho de estruturas,
   só entram as linhas em que o número está claramente ao lado do carbono; o resto fica de fora em vez de adivinhado. */
(function(){
const f=s=>String(s).replace(/-/g,'−').replace(/\./g,',');
const fc=c=>/^[+\-−\d.,]*$/.test(c)?f(c):String(c).replace(/\./g,',');
const sg=v=>v===0?'0,0':(v>0?'+':'')+f(v.toFixed(1));
const tb=(h,r)=>'<div class="tbl"><table class="obt nostk"><thead><tr>'+h.map(x=>'<th style="text-transform:none">'+x+'</th>').join('')+'</tr></thead><tbody>'+r.map(l=>'<tr>'+l.map(c=>'<td>'+c+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
const src=t=>'<p class="srcl" style="margin-top:6px"><b>Fonte:</b> '+t+'</p>';
const S='Silverstein e Webster, Spectrometric Identification of Organic Compounds, 6ª ed., cap. 5';
const D=(t,body,open)=>'<details class="sec"'+(open?' open':'')+'><summary>'+t+'</summary>'+body+'</details>';

/* ---------- Tabela 5.1 ---------- */
const T51=[['α','+9.1'],['β','+9.4'],['γ','-2.5'],['δ','+0.3'],['ε','+0.1'],['1° (3°)','-1.1'],['1° (4°)','-3.4'],['2° (3°)','-2.5'],['2° (4°)','-7.2'],['3° (2°)','-3.7'],['3° (3°)','-9.5'],['4° (1°)','-1.5'],['4° (2°)','-8.4']];
/* ---------- Tabela 5.2 ---------- */
const T52=[['Metano','-2.3'],['Etano','5.7'],['Propano','15.8','16.3','15.8'],['Butano','13.4','25.2','25.2'],['Pentano','13.9','22.8','34.7','22.8','13.9'],['Hexano','14.1','23.1','32.2','32.2','23.1'],['Heptano','14.1','23.2','32.6','29.7','32.6'],['Octano','14.2','23.2','32.6','29.9','29.9'],['Nonano','14.2','23.3','32.6','30.0','30.3'],['Decano','14.2','23.2','32.6','31.1','30.5'],['Isobutano','24.5','25.4'],['Isopentano','22.2','31.1','32.0','11.7'],['Isohexano','22.7','28.0','42.0','20.9','14.3'],['Neopentano','31.7','28.1'],['2,2-Dimetilbutano','29.1','30.6','36.9','8.9'],['3-Metilpentano','11.5','29.5','36.9','18.8 (3-CH₃)'],['2,3-Dimetilbutano','19.5','34.3'],['2,2,3-Trimetilbutano','27.4','33.1','38.3','16.1'],['2,3-Dimetilpentano','7.0','25.3','36.3','14.6 (3-CH₃)']];
/* ---------- Tabela 5.3: [Y, αT, αI, βT, βI, γ] ---------- */
const T53=[['CH₃','+9','+6','+10','+8','-2'],['CH=CH₂','+20','','+6','','-0.5'],['C≡CH','+4.5','','+5.5','','-3.5'],['COOH','+21','+16','+3','+2','-2'],['COO⁻','+25','+20','+5','+3','-2'],['COOR','+20','+17','+3','+2','-2'],['COCl','+33','+28','','+2',''],['CONH₂','+22','','+2.5','','-0.5'],['COR','+30','+24','+1','+1','-2'],['CHO','+31','','0','','-2'],['Fenila','+23','+17','+9','+7','-2'],['OH','+48','+41','+10','+8','-5'],['OR','+58','+51','+8','+5','-4'],['OCOR','+51','+45','+6','+5','-3'],['NH₂','+29','+24','+11','+10','-5'],['NH₃⁺','+26','+24','+8','+6','-5'],['NHR','+37','+31','+8','+6','-4'],['NR₂','+42','','+6','','-3'],['NR₃⁺','+31','','+5','','-7'],['NO₂','+63','+57','+4','+4',''],['CN','+4','+1','+3','+3','-3'],['SH','+11','+11','+12','+11','-4'],['SR','+20','','+7','','-3'],['F','+68','+63','+9','+6','-4'],['Cl','+31','+32','+11','+10','-4'],['Br','+20','+25','+11','+10','-3'],['I','-6','+4','+11','+12','-1']];
/* ---------- Tabela 5.9: [subst, C1, C2, C3, C4, C do substituinte] ---------- */
const T59=[['H',0,0,0,0,''],['CH₃',9.3,0.7,-0.1,-2.9,'21,3'],['CH₂CH₃',15.6,-0.5,0.0,-2.6,'29,2 (CH₂), 15,8 (CH₃)'],['CH(CH₃)₂',20.1,-2.0,0.0,-2.5,'34,4 (CH), 24,1 (CH₃)'],['C(CH₃)₃',22.2,-3.4,-0.4,-3.1,'34,5 (C), 31,4 (CH₃)'],['CH=CH₂',9.1,-2.4,0.2,-0.5,'137,1 (CH), 113,3 (CH₂)'],['C≡CH',-5.8,6.9,0.1,0.4,'84,0 (C), 77,8 (CH)'],['C₆H₅',12.1,-1.8,-0.1,-1.6,''],['CH₂OH',13.3,-0.8,-0.6,-0.4,'64,5'],['CH₂OCOCH₃',7.7,0,0,0,'20,7 (CH₃), 66,1 (CH₂), 170,5 (C=O)'],['OH',26.6,-12.7,1.6,-7.3,''],['OCH₃',31.4,-14.4,1.0,-7.7,'54,1'],['OC₆H₅',29.0,-9.4,1.6,-5.3,''],['OCOCH₃',22.4,-7.1,-0.4,-3.2,'23,9 (CH₃), 169,7 (C=O)'],['CHO',8.2,1.2,0.6,5.8,'192,0'],['COCH₃',7.8,-0.4,-0.4,2.8,'24,6 (CH₃), 195,7 (C=O)'],['COC₆H₅',9.1,1.5,-0.2,3.8,'196,4 (C=O)'],['COCF₃',-5.6,1.8,0.7,6.7,''],['COOH',2.9,1.3,0.4,4.3,'168,0'],['COOCH₃',2.0,1.2,-0.1,4.8,'51,0 (CH₃), 166,8 (C=O)'],['COCl',4.6,2.9,0.6,7.0,''],['CONH₂',5.0,-1.2,0.0,3.4,''],['C≡N',-16.0,3.6,0.6,4.3,'119,5'],['NH₂',19.2,-12.4,1.3,-9.5,''],['N(CH₃)₂',22.4,-15.7,0.8,-11.8,'40,3'],['NHCOCH₃',11.1,-9.9,0.2,-5.6,''],['NO₂',19.6,-5.3,0.9,6.0,''],['N=C=O',5.7,-3.6,1.2,-2.8,'129,5'],['F',35.1,-14.3,0.9,-4.5,''],['Cl',6.4,0.2,1.0,-2.0,''],['Br',-5.4,3.4,2.2,-1.0,''],['I',-32.2,9.9,2.6,-7.3,''],['CF₃',2.6,-3.1,0.4,3.4,''],['SH',2.3,0.6,0.2,-3.3,''],['SCH₃',10.2,-1.8,0.4,-3.6,'15,9'],['SO₂NH₂',15.3,-2.9,0.4,3.3,''],['Si(CH₃)₃',13.4,4.4,-1.1,-1.1,'']];

const secs=[];
/* ===== alcanos ===== */
secs.push(D('¹³C de alcanos: parâmetros aditivos (Tabela 5.1)',
 '<p>Cada carbono recebe um valor base de −2,5 (o δ do metano) mais uma contribuição por carbono vizinho, conforme a distância: α é o vizinho direto, β está a duas ligações, γ a três e assim por diante. A correção de ramificação entra quando o carbono é primário, secundário, terciário ou quaternário e está ligado a outro de grau maior. A notação 2° (3°) quer dizer um CH₂ ligado a um CH.</p>'
 +tb(['Carbono','Parâmetro (ppm)'],T51.map(r=>[r[0],f(r[1])]))
 +'<p><b>Exemplo do livro, C-1 do 3-metilpentano:</b> 1 α, 1 β, 2 γ e 1 δ. δ = −2,5 + 9,1 + 9,4 + 2·(−2,5) + 0,3 = <b>11,3</b>. O valor observado também é 11,3 (Tabela 5.2 dá 11,5).</p>'
 +'<p>Para C-3 (CH com 3 α e 2 β, ligado a dois CH₂): −2,5 + 3·9,1 + 2·9,4 + 2·(−3,7) = <b>36,2</b>. Observado 36,7.</p>'
 +'<div class="row"><label>n de α<input type="number" id="c13a" min="0" max="4" value="1" inputmode="numeric"></label><label>n de β<input type="number" id="c13b" min="0" max="12" value="1" inputmode="numeric"></label><label>n de γ<input type="number" id="c13g" min="0" max="12" value="2" inputmode="numeric"></label><label>n de δ<input type="number" id="c13d" min="0" max="12" value="1" inputmode="numeric"></label><label>n de ε<input type="number" id="c13e" min="0" max="12" value="0" inputmode="numeric"></label></div>'
 +'<div class="row"><label>Correção de ramificação<select id="c13r"><option value="0">nenhuma</option>'+T51.slice(5).map((r,i)=>'<option value="'+r[1]+'">'+r[0]+' ('+f(r[1])+')</option>').join('')+'</select></label><label>Quantas vezes<input type="number" id="c13rn" min="0" max="6" value="0" inputmode="numeric"></label></div>'
 +'<div class="rmout" id="c13out" aria-live="polite"></div>'
 +src(S+', tabela 5.1 (p. 224) e exemplo do texto. A conta é δ = −2,5 + Σ n·A.')),'open');
secs.push(D('¹³C de alcanos lineares e ramificados (Tabela 5.2)',
 tb(['Composto','C-1','C-2','C-3','C-4','C-5'],T52.map(r=>{const a=r.slice(0,1).concat(r.slice(1).map(fc));while(a.length<6)a.push('');return a;}))
 +src(S+', tabela 5.2 (p. 224). δ em ppm a partir do TMS.')));
secs.push(D('Efeito de um substituinte sobre o alcano (Tabela 5.3)',
 '<p>Some o incremento ao δ do carbono correspondente da tabela 5.2 (ou ao valor calculado pela 5.1). “Terminal” é o substituinte na ponta da cadeia, “interno” é no meio. O α é o carbono que carrega o substituinte, o β é o vizinho dele e o γ o seguinte.</p>'
 +tb(['Y','α term.','α int.','β term.','β int.','γ'],T53.map(r=>[r[0]].concat(r.slice(1).map(fc))))
 +'<p><b>Exemplo do livro, 3-pentanol:</b> C-3 do pentano é 34,7 e o OH interno soma +41, então δ(Cα) = 34,7 + 41 = <b>75,7</b> (o livro imprime 75,8; observado 73,8). Cβ = 22,8 + 8 = 30,8 (observado 29,7). Cγ = 13,9 − 5 = 8,9 (observado 9,8).</p>'
 +'<div class="row"><label>δ do carbono no alcano (ppm)<input type="number" id="c3b" step="0.1" value="34.7" inputmode="decimal"></label><label>Substituinte<select id="c3y">'+T53.map((r,i)=>'<option value="'+i+'"'+(r[0]==='OH'?' selected':'')+'>'+r[0]+'</option>').join('')+'</select></label></div>'
 +'<div class="row"><label>Posição do carbono<select id="c3p"><option value="a">α (o que tem o Y)</option><option value="b">β</option><option value="g">γ</option></select></label><label>Y está<select id="c3t"><option value="i">interno</option><option value="t">terminal</option></select></label></div>'
 +'<div class="rmout" id="c3out" aria-live="polite"></div>'
 +src(S+', tabela 5.3 (p. 225), que o livro atribui a Wehrli, Marchand e Wehrli (1983). Células vazias são vazias também no livro.')));
secs.push(D('Cicloalcanos e heterocíclicos saturados (Tabelas 5.4 e 5.5)',
 tb(['Anel','δ do CH₂'],[['Ciclopropano','−2,9'],['Ciclobutano','22,4'],['Ciclopentano','25,6'],['Ciclo-hexano','26,9'],['Cicloheptano','28,4'],['Ciclo-octano','26,9'],['Ciclononano','26,1'],['Ciclodecano','25,3']])
 +'<p>O ciclopropano fica muito à direita, como acontece com os seus H. Em ciclo-hexano rígido, um CH₃ axial protege (desloca para a direita) o C-3 e o C-5 em vários ppm, por compressão estérica γ-gauche.</p>'
 +tb(['Heterocíclico','δ (ppm)'],[['Oxirano (epóxido)','40,6'],['Oxetano','C-2 72,6 · C-3 22,9'],['Tetraidrofurano','C-2 67,9 · C-3 25,8'],['Tetraidropirano','C-2 69,5 · C-3 27,7 · C-4 24,9'],['Pirrolidina','C-2 47,1 · C-3 25,7'],['Piperidina','C-2 47,9 · C-3 27,8 · C-4 25,9'],['Azetidina','C-2 48,1 · C-3 19,0'],['Aziridina','18,2']])
 +src(S+', tabelas 5.4 e 5.5 (p. 226). Tabela 5.5 do livro é desenhada; só entram as que têm o número claro ao lado do carbono.')));
/* ===== alquenos ===== */
secs.push(D('¹³C de alquenos: contas pelos parâmetros (p. 226)',
 '<p>Para um alceno substituído só por grupos alquila, parte-se do 123,3 do etileno e soma-se por cada substituinte. α, β e γ são os substituintes do mesmo lado da dupla que o carbono de interesse, e α′, β′ e γ′ ficam do lado oposto.</p>'
 +tb(['Posição','Efeito (ppm)'],[['α','+10,6'],['β','+7,2'],['γ','−1,5'],['α′','−7,9'],['β′','−1,8'],['γ′','−1,5'],['Correção Z (cis)','−1,1']])
 +'<p><b>Exemplo do livro, (Z)-3-metil-2-penteno:</b> C-3 = 123,3 + 2·10,6 + 7,2 − 7,9 − 1,1 = <b>142,7</b> (medido 137,2). C-2 = 123,3 + 10,6 + 2·(−7,9) + (−1,8) − 1,1 = <b>115,2</b> (medido 116,8). O próprio livro diz que a concordância é razoável.</p>'
 +'<div class="row"><label>α<input type="number" id="ckA" min="0" max="3" value="2" inputmode="numeric"></label><label>β<input type="number" id="ckB" min="0" max="3" value="1" inputmode="numeric"></label><label>γ<input type="number" id="ckG" min="0" max="3" value="0" inputmode="numeric"></label><label>α′<input type="number" id="ckA2" min="0" max="3" value="1" inputmode="numeric"></label><label>β′<input type="number" id="ckB2" min="0" max="3" value="0" inputmode="numeric"></label><label>γ′<input type="number" id="ckG2" min="0" max="3" value="0" inputmode="numeric"></label><label>Z (cis)<select id="ckZ"><option value="0">não</option><option value="1" selected>sim</option></select></label></div>'
 +'<div class="rmout" id="ckout" aria-live="polite"></div>'
 +'<p>Faixa geral: carbonos sp² de alquenos só com alquila absorvem em 110 a 150 ppm. O carbono ligado a um grupo Z fica 4 a 6 ppm mais à direita que o do isômero E. O =CH₂ terminal absorve à direita do =CH– interno. Em polienos, o outro alceno conta como um substituinte alquila β.</p>'
 +src(S+', seção 5.3.4 (p. 226). A conta do livro usa só alquila; não vale para substituintes polares.')));
secs.push(D('Alquenos, enonas e outros sp² (Tabelas 5.6, 5.7, 5.15)',
 tb(['Composto','δ (ppm)'],[['Etileno','123,2'],['Propeno','CH₃ 18,7 · =CH 136,2 · =CH₂ 115,9'],['(Z)-2-buteno','CH₃ 12,1 · =CH 124,6'],['(E)-2-buteno','CH₃ 17,6 · =CH 126,0'],['Ciclobuteno','=CH 137,2 · CH₂ 30,2'],['Ciclopenteno','=CH 130,8 · CH₂ 32,6 e 22,1'],['Ciclo-hexeno','=CH 127,3 · CH₂ 24,5 e 22,1'],['Aleno','central 213,5 · terminais 74,8'],['Estireno','=CH 137,1 · =CH₂ 113,3'],['Álcool alílico','=CH 137,5 · =CH₂ 114,9 · CH₂OH 63,4'],['Éter metil vinílico','=CH–O 153,2 · =CH₂ 84,2'],['Acetato de vinila','=CH–O 141,7 · =CH₂ 96,4 · C=O 167,6 · CH₃ 20,2'],['Acrilonitrila','=CH 107,7 · =CH₂ 137,8 · CN 117,5'],['Metil vinil cetona','C=O 196,9 · =CH 138,5 · =CH₂ 129,3'],['Acroleína','CHO 192,1 · C=C 136,4 e 136,0'],['2-Ciclo-hexenona','C-3 150,7 · C-2 129,3'],['2-Ciclopentenona','C-3 165,1 · C-2 133,8']])
 +'<p>O éter vinílico e a enona se explicam pela ressonância: o O doa elétrons e protege o carbono β (84,2), enquanto na enona o C=O puxa e desprotege o carbono β (150,7). Alenos: carbono central em 200 a 215 e terminais em 75 a 97 ppm.</p>'
 +src(S+', tabelas 5.6 e 5.7 (pp. 227 e 228) e 5.15 (p. 234). As tabelas do livro são desenhadas; copiei só linhas de atribuição clara.')));
secs.push(D('¹³C de alquinos (Tabela 5.8)',
 tb(['Composto','C-1','C-2','C-3','C-4','C-5','C-6'],[['1-Butino','67,0','84,7','','','',''],['2-Butino','','73,6','','','',''],['1-Hexino','68,1','84,5','18,1','30,7','21,9','13,5'],['2-Hexino','2,7','73,7','76,9','19,6','21,6','12,1'],['3-Hexino','15,4','13,0','80,9','','','']])
 +'<p>Alquinos só com alquila: sp entre 65 e 90 ppm. O ≡C–H terminal fica mais à direita que o ≡C–R interno. A tripla desloca de 5 a 15 ppm para a direita os carbonos sp³ ligados a ela. Éteres alquinílicos, em que um O está na tripla, vão de 20 a 95 ppm (HC≡C–OCH₂CH₃: 23,2 e 89,4).</p>'
 +src(S+', tabela 5.8 e seção 5.3.5 (p. 228). No 2-butino a tabela traz só o carbono sp, que é o C-2 (e o C-3, equivalente).')));
/* ===== aromáticos ===== */
secs.push(D('¹³C aromático: incrementos do benzeno (Tabela 5.9)',
 '<p>O benzeno absorve em 128,5. Cada substituinte soma um incremento a cada posição do anel, e vale o princípio da aditividade: num anel dissubstituído, soma-se o incremento do primeiro e o do segundo, cada um pela sua distância ao carbono em questão (C-1 é o ipso, C-2 o orto, C-3 o meta, C-4 o para). O carbono ipso é o de pico mais baixo, porque não tem H (T₁ longo e pouco NOE). Na tabela, arraste para o lado para ver a última coluna.</p>'
 +tb(['Substituinte','C-1 (ipso)','C-2 (orto)','C-3 (meta)','C-4 (para)','C do substituinte'],T59.map(r=>[r[0],sg(r[1]),sg(r[2]),sg(r[3]),sg(r[4]),r[5]]))
 +'<p><b>Calculadora de anel até dissubstituído</b></p>'
 +'<div class="row"><label>Substituinte em C-1<select id="arX">'+T59.slice(1).map((r,i)=>'<option value="'+(i+1)+'">'+r[0]+'</option>').join('')+'</select></label><label>Segundo substituinte<select id="arY"><option value="0">nenhum</option>'+T59.slice(1).map((r,i)=>'<option value="'+(i+1)+'">'+r[0]+'</option>').join('')+'</select></label><label>Posição do segundo<select id="arP"><option value="2">orto (C-2)</option><option value="3">meta (C-3)</option><option value="4" selected>para (C-4)</option></select></label></div>'
 +'<div class="rmout" id="arOut" aria-live="polite"></div>'
 +src(S+', tabela 5.9 (p. 229), que o livro atribui a Ewing (1979). Os incrementos são aproximados: orto varia até 15 ppm e é o menos previsível. A coluna do C do substituinte lista só os valores que a tabela traz.')));
secs.push(D('¹³C de policíclicos e heteroaromáticos (p. 228 e Tabela 5.10)',
 '<p>Naftaleno: C-1 128,1 · C-2 125,9 · C-4a 133,7. Antraceno: C-1 130,1 · C-2 125,4 · C-4a 132,2 · C-9 132,6. Fenantreno: C-1 128,3 · C-2 126,3 · C-3 126,3 · C-4 122,2 · C-9 126,6 (C-4a 131,9 e C-10a 130,1, atribuição incerta, segundo o livro).</p>'
 +tb(['Composto','C-2','C-3','C-4','C-5','C-6','Substituinte'],[['Furano','142,7','109,6','','','',''],['2-Metilfurano','152,2','106,2','110,9','141,2','','13,4'],['Furano-2-carbaldeído','153,3','121,7','112,9','148,5','','178,2'],['2-Furoato de metila','144,8','117,9','111,9','146,4','','159,1 (C=O), 51,8 (CH₃)'],['Pirrol','118,4','108,0','','','',''],['2-Metilpirrol','127,2','105,9','108,1','116,7','','12,4'],['Pirrol-2-carbaldeído','134,0','123,0','112,0','129,0','','178,9'],['Tiofeno','124,4','126,2','','','',''],['2-Metiltiofeno','139,0','124,7','126,4','122,6','','14,8'],['Tiofeno-2-carbaldeído','143,3','136,4','128,1','134,6','','182,8'],['Tiazol','152,2','','142,4','118,5','',''],['Imidazol','136,2','','122,3','122,3','',''],['Piridina','150,2','123,9','135,9','','',''],['Pirimidina','159,5','','157,4','122,1','157,4',''],['Pirazina','145,6','','','','',''],['2-Metilpirazina','154,0','141,8*','143,8*','144,7*','','21,6']])
 +'<p>Regra geral do livro: em anéis com O ou N, o C-2 fica mais à esquerda que o C-3. Há grande efeito de solvente e de pH. * Atribuição incerta, segundo o livro.</p>'
 +src(S+', seção 5.3.6 (p. 228) e tabela 5.10 (p. 230). Amostras puras (neat).')));
/* ===== alcoois, eteres, halogenetos, aminas, S ===== */
secs.push(D('¹³C de álcoois (Tabela 5.11)',
 '<p>O OH desloca o C-1 para a esquerda em 35 a 52 ppm, o C-2 em 5 a 12 ppm, e o C-3 para a direita em 0 a 6 ppm. Acetilar o álcool move o C-1 de 2,5 a 4,5 ppm para a esquerda e o C-2 outro tanto para a direita.</p>'
 +tb(['Álcool','δ (ppm)'],[['Metanol','49,0'],['Etanol','CH₃ 17,6 · CH₂OH 57,0'],['1-Propanol','CH₃ 10,0 · CH₂ 25,8 · CH₂OH 63,6'],['2-Propanol','CH₃ 25,1 · CHOH 63,4'],['1-Butanol','CH₃ 13,6 · CH₂ 19,1 · CH₂ 35,0 · CH₂OH 61,4'],['2-Butanol','CH₃ 9,9 · CH₂ 32,0 · CHOH 68,7 · CH₃ 22,6'],['1-Pentanol','CH₃ 13,8 · 22,6 · 28,2 · 32,5 · CH₂OH 61,8'],['1-Hexanol','CH₃ 14,2 · 22,8 · 32,0 · 25,8 · 32,8 · CH₂OH 61,9'],['Isobutanol','CH₃ 18,9 · CH 30,8 · CH₂OH 68,9'],['terc-Butanol','CH₃ 31,1 · C–OH 68,4'],['Ciclopentanol','C-1 73,3 · C-2 35,0 · C-3 23,4'],['Ciclo-hexanol','C-1 69,5 · C-2 35,5 · C-3 24,4 · C-4 25,9']])
 +src(S+', seção 5.3.8 (p. 230) e tabela 5.11 (p. 231). Álcoois puros; só entram as estruturas com número claramente atribuído.')));
secs.push(D('¹³C de éteres, acetais e epóxidos (Tabela 5.12)',
 '<p>O grupo alcóxi desloca o C-1 uns 11 ppm mais à esquerda que o OH, porque o C-1′ do alcóxi age como um carbono β. Acetais: o carbono com dois O absorve em 88 a 112 ppm. Em éteres aromáticos, o orto fica muito à direita pela doação do O (ressonância). O THF aparece como 67,9 e 25,8 na tabela 5.5 e como 68,4 e 26,5 na 5.12; o livro não comenta a diferença.</p>'
 +tb(['Composto','δ (ppm)'],[['Éter dimetílico','59,7'],['Etil metil éter','CH₃ 14,7 · OCH₂ 67,9 · OCH₃ 57,6'],['Oxirano','40,6'],['Oxetano','C-2 72,6 · C-3 22,9'],['Tetraidrofurano','C-2 68,4 · C-3 26,5'],['Tetraidropirano','C-2 69,5 · C-3 27,7 · C-4 24,9'],['1,3-Dioxolano','C-2 95,0 · C-4/5 64,5'],['1,4-Dioxano','66,5'],['1,3-Dioxano','C-2 92,8 · C-4/6 65,9 · C-5 26,6'],['Dimetoximetano','CH₂ 109,9 · OCH₃ 53,7'],['Acetal dietílico do acetaldeído','CH 99,6 · CH₃ 19,9 · OCH₂ 60,7 · CH₃ 15,4'],['Anisol','C-1 159,9 · C-2 114,1 · C-3 129,5 · C-4 120,8 · OCH₃ 54,1']])
 +src(S+', seção 5.3.9 (p. 230), tabela 5.12 (p. 231) e figura do anisol (p. 232).')));
secs.push(D('¹³C de halogenetos (Tabela 5.13)',
 '<p>F, Cl: quanto mais halogênio no mesmo carbono, mais à esquerda (eletronegatividade). Br e I seguem outra regra, o <b>efeito do átomo pesado</b>: o δ vai para a direita. O CH₃I (−20,7) cai abaixo do metano (−2,3), e o CI₄ chega a −292,5. No C-2, o deslocamento para a esquerda segue I &gt; Br &gt; F. Cl e Br mostram proteção γ-gauche no C-3; I não.</p>'
 +tb(['Composto','C-1','C-2','C-3'],[['CH₄','−2,3','',''],['CH₃F','75,4','',''],['CH₃Cl','24,9','',''],['CH₂Cl₂','54,0','',''],['CHCl₃','77,5','',''],['CCl₄','96,5','',''],['CH₃Br','10,0','',''],['CH₂Br₂','21,4','',''],['CHBr₃','12,1','',''],['CBr₄','−28,5','',''],['CH₃I','−20,7','',''],['CH₂I₂','−54,0','',''],['CHI₃','−139,9','',''],['CI₄','−292,5','',''],['CH₃CH₂F','79,3','14,6',''],['CH₃CH₂Cl','39,9','18,7',''],['CH₃CH₂Br','28,3','20,3',''],['CH₃CH₂I','−0,2','21,6',''],['CH₃CH₂CH₂Cl','46,7','26,5','11,5'],['CH₃CH₂CH₂Br','35,7','26,8','13,2'],['CH₃CH₂CH₂I','10,0','27,6','16,2']])
 +src(S+', seção 5.3.10 (p. 232), tabela 5.13 (p. 232). O livro nota grande efeito de solvente: o C-1 do iodoetano é −6,6 em ciclo-hexano e −0,4 em DMF.')));
secs.push(D('¹³C de aminas, tióis, sulfetos e dissulfetos (Tabelas 5.14A e 5.14B)',
 '<p>NH₂ terminal: C-1 cerca de 30 ppm à esquerda, C-2 cerca de 11 ppm à esquerda e C-3 cerca de 4 ppm à direita. O NH₃⁺ tem efeito um pouco menor. N-alquilar desloca o C-1 mais para a esquerda. Enxofre é bem menos eletronegativo que oxigênio, então os deslocamentos são menores.</p>'
 +tb(['Amina','C-1','C-2','C-3','C-4'],[['CH₃NH₂','26,9','','',''],['CH₃CH₂NH₂','35,9','17,7','',''],['CH₃CH₂CH₂NH₂','44,9','27,3','11,2',''],['CH₃(CH₂)₃NH₂','42,3','36,7','20,4','14,0'],['(CH₃)₃N','47,5','','',''],['CH₃CH₂N(CH₃)₂','58,2','13,8','',''],['Ciclo-hexilamina','50,4','36,7','25,7','25,1'],['N-Metilciclo-hexilamina','58,6','33,3','25,1','26,3 (N–CH₃ 33,5)']])
 +tb(['Composto','C-1','C-2','C-3'],[['CH₃SH','6,5','',''],['CH₃CH₂SH','19,8','17,3',''],['CH₃CH₂CH₂SH','26,4','27,6','12,6'],['CH₃(CH₂)₃SH','23,7','35,7','21,0'],['(CH₃)₂S','19,3','',''],['(CH₃CH₂)₂S','25,5','14,8',''],['(CH₃CH₂CH₂)₂S','34,3','23,2','13,7'],['(CH₃CH₂CH₂CH₂)₂S','34,1','31,4','22,0'],['CH₃SSCH₃','22,0','',''],['CH₃CH₂SSCH₂CH₃','32,8','14,5','']])
 +src(S+', tabelas 5.14A e 5.14B (p. 233). Para os butil-derivados a tabela traz só C-1 a C-3.')));
/* ===== carbonilas ===== */
secs.push(D('¹³C de C=O: cetonas e aldeídos (Tabela 5.15)',
 '<p>R₂C=O e RCH=O absorvem em região própria. Substituir o CH₃ da acetona ou do acetaldeído por fenila ou por uma C=C (conjugação) desloca o C=O para a direita. Ciclopentanona tem deslocamento marcante para a esquerda entre os cicloalcanonas. Há diferenças de alguns ppm entre fontes, por causa do solvente; o livro dá a acetona em 203,8 no texto e 206,7 na tabela.</p>'
 +tb(['Composto','δ (ppm)'],[['Acetona','C=O 206,7 · CH₃ 30,6'],['3-Pentanona','C=O 211,0 · CH₂ 35,4 · CH₃ 7,9'],['2,3-Butanodiona','C=O 197,1 · CH₃ 22,4'],['2,5-Hexanodiona','C=O 206,9 · CH₂ 37,0 · CH₃ 29,6'],['2,4-Pentanodiona, forma ceto','C=O 203,5 · CH₂ 58,7 · CH₃ 30,9'],['2,4-Pentanodiona, forma enol','C–OH 192,6 · =CH 101,1 · CH₃ 24,8'],['Ciclobutanona','C=O 208,2 · C-2 47,8 · C-3 9,9'],['Ciclopentanona','C=O 219,6 · C-2 37,9 · C-3 22,7'],['Ciclo-hexanona','C=O 209,7 · C-2 41,85 · C-3 26,6 · C-4 24,6'],['Cicloheptanona','C=O 215,0 · C-2 43,9 · C-3 24,4 · C-4 30,6'],['Acetofenona','C=O 197,6 · CH₃ 26,3 · ipso 137,1 · orto e meta 128,2 e 128,4 · para 132,9'],['Acetaldeído','CHO 199,7 · CH₃ 30,7'],['Butanal','CHO 202,5 · CH₂ 45,9 · CH₂ 15,8 · CH₃ 13,8'],['Benzaldeído','CHO 192,4 · ipso 136,4 · para 134,2 · orto/meta 129,5 e 128,9'],['Acroleína','CHO 192,1 · C=C 136,4 e 136,0'],['Tricloroacetaldeído','CHO 175,3']])
 +'<p>Um α-CH₂ de cetona acíclica sai uns 10 a 14 ppm à esquerda do alcano de origem, e o β fica vários ppm à direita. Cada alquila no carbono α desloca o C=O de 2 a 3 ppm para a esquerda, até a estérica atrapalhar.</p>'
 +src(S+', seção 5.3.13.1 (p. 232) e tabela 5.15 (p. 234). Na tabela do livro, a atribuição o/m do benzaldeído não é marcada.')));
secs.push(D('¹³C de ácidos, ésteres, amidas e nitrilas (Tabela 5.16)',
 '<p>Os C=O de ácidos e derivados ficam em 150 a 185 ppm. O ânion carboxilato vai mais à esquerda. Substituintes e deslocalização de elétrons agem como nas cetonas. Nitrilas absorvem em 115 a 125 ppm. Alquilas no N de amidas deslocam o C=O alguns ppm para a direita.</p>'
 +tb(['Composto','δ (ppm)'],[['Ácido acético','C=O 178,1 · CH₃ 20,6'],['Ácido isobutírico','C=O 184,8 · CH 34,1 · CH₃ 18,8'],['Ácido tricloroacético','C=O 168,0 · CCl₃ 89,1'],['Ácido trifluoroacético','C=O 163,0 · CF₃ 115,0'],['Ácido benzoico','C=O 172,6 · ipso 129,4 · orto 130,2 · meta 128,4 · para 133,7'],['Acetato de sódio (aq.)','C=O 181,5'],['Alanina (D₂O)','C=O 176,5 · CH 51,5 · CH₃ 17,2'],['Acetato de etila','C=O 170,3 · OCH₂ 60,0 · CH₃CO 20,0 · CH₃ 13,8'],['Propanoato de metila','C=O 173,3 · OCH₃ 50,8 · CH₂ 27,2 · CH₃ 9,2'],['Acetato de isopropila','C=O 170,0 · OCH 66,8 · CH₃CO 21,4 · CH₃ 20,4'],['Trifluoroacetato de etila','C=O 158,1 · CF₃ 115,3 · OCH₂ 64,7 · CH₃ 13,8'],['Benzoato de metila','C=O 166,8 · OCH₃ 51,0'],['2-Furoato de metila','C=O 159,1 · OCH₃ 51,8'],['Acrilato de metila','C=O 164,5 · =CH 128,7 e =CH₂ 129,9 (atribuição não marcada)'],['Cloreto de acetila','C=O 169,5'],['Cloreto de benzoíla','C=O 168,5 · ipso 133,1 · orto 131,3 · meta 128,9 · para 135,3'],['Anidrido acético','C=O 167,3'],['Anidrido propanoico','C=O 170,3 · CH₃ 8,4'],['Anidrido succínico','C=O 172,9 · CH₂ 28,6'],['Anidrido maleico','C=O 165,9'],['Anidrido ftálico','C=O 163,1 · 125,3 · 131,1 · 136,1'],['γ-Butirolactona','C=O 177,9 · OCH₂ 68,6 · CH₂ 27,7 e 22,2'],['δ-Valerolactona','C=O 171,2 · OCH₂ 69,4 · CH₂ 29,8 · 22,7 · 19,1'],['Formamida','C=O 165,5'],['Acetamida','C=O 172,7'],['N,N-Dimetilformamida','C=O 162,4 · N–CH₃ 36,2 e 31,1'],['N,N-Dimetilbenzamida','C=O 170,8'],['Carbamato de etila','C=O 157,8 · OCH₂ 60,9 · CH₃ 14,5'],['Acetonitrila','CN 117,7 · CH₃ 1,3'],['Propanonitrila','CN 120,8 · CH₂ 10,8 · CH₃ 10,6'],['Benzonitrila','CN 118,7 · ipso 112,3 · anel 132,7, 132,0 e 129,1']])
 +src(S+', seção 5.3.13.2 (p. 233) e tabela 5.16 (pp. 235 e 236). Solvente varia por linha na tabela (CHCl₃ 50% na maioria; aquoso, DMSO ou puro em algumas). Linhas com atribuição não marcada no desenho estão indicadas.')));
secs.push(D('¹³C de oximas (p. 233)',
 '<p>O carbono quaternário de oximas simples absorve em 145 a 165 ppm. Dá para distinguir E de Z: o C=N fica mais à direita na forma mais comprimida, e o substituinte mais impedido (do mesmo lado do OH) fica mais à direita que o menos impedido.</p>'
 +tb(['Isômero da 2-butanona oxima','C=N','CH₃','CH₂','CH₃ (etila)'],[['OH do mesmo lado do CH₃','159,2','11,50','29,00','11,00'],['OH do mesmo lado do CH₂','158,7','18,75','21,50','9,75']])
 +src(S+', seção 5.3.13.3 (p. 233).')));
/* ===== acoplamentos ===== */
secs.push(D('Constantes de acoplamento ¹³C–¹H (Tabelas 5.17 e 5.18)',
 '<p>O acoplamento a uma ligação (¹J) vai de cerca de 110 a 320 Hz e cresce com o caráter s da ligação C–H, com substituintes eletronegativos no carbono e com distorção angular. A faixa dos ²J é de cerca de −5 a 60 Hz. O ³J é parecido com o ²J em sp³; em aromáticos o ³J é maior que o ²J (benzeno: ³J 7,4 Hz e ²J 1,0 Hz).</p>'
 +tb(['Composto','¹J(CH) (Hz)'],[['CH₃CH₃ (sp³)','124,9'],['CH₃CH₂CH₃','119,2'],['(CH₃)₃CH','114,2'],['CH₃NH₂','133,0'],['CH₃OH','141,0'],['CH₃Cl','150,0'],['CH₂Cl₂','178,0'],['CHCl₃','209,0'],['Ciclo-hexano','123,0'],['Ciclopentano','128,0'],['Ciclobutano','134,0'],['Ciclopropano','161,0'],['Biciclobutano (ponte)','205,0'],['CH₂=CH₂ (sp²)','156,2'],['CH₃CH=C(CH₃)₂','148,4'],['CH₃CH=O','172,4'],['NH₂CH=O','188,3'],['C₆H₆','159,0'],['CH≡CH (sp)','249,0'],['C₆H₅C≡CH','251,0'],['HC≡N','269,0']])
 +tb(['Composto','²J(CH) (Hz)'],[['CH₃CH₃','−4,5'],['CH₃CCl₃','5,9'],['CH₃CH=O','26,7'],['CH₂=CH₂','−2,4'],['(CH₃)₂C=O','5,5'],['CH₂=CHCH=O','26,9'],['C₆H₆','1,0 (³J = 7,6)'],['CH≡CH','49,3'],['C₆H₅O–C≡CH','61,0']])
 +src(S+', tabelas 5.17 e 5.18 (p. 237).')));
secs.push(D('Acoplamento de ¹³C com ¹⁹F, ³¹P e D (Tabela 5.19)',
 '<p>Só F, P e D mostram acoplamento num espectro desacoplado de ¹H. O CDCl₃ aparece como tripleto 1:1:1 (¹J = 31,5 Hz), a acetona-d₆ como septeto (19,5 Hz no CD₃) e o DMSO-d₆ também como septeto (22,0 Hz). Veja a linha do contador de linhas em Resolvidos para a conta 2nI + 1.</p>'
 +tb(['Composto','¹J (Hz)','²J (Hz)','³J (Hz)','⁴J (Hz)'],[['CH₃CF₃','271','','',''],['CF₂H₂','235','','',''],['CF₃CO₂H','284','43,7','',''],['C₆H₅F','245','21,0','7,7','3,3'],['(CH₃CH₂CH₂CH₂)₃P','10,9','11,7','12,5',''],['(CH₃CH₂)₄P⁺ Br⁻','49','4,3','',''],['(C₆H₅)₃P⁺CH₃ I⁻','88 (CH₃: 52)','10,9','',''],['CH₃CH₂P(=O)(OCH₂CH₃)₂','143','7,1 (J C–O–P 6,9)','J C–C–O–P 6,2',''],['(C₆H₅)₃P','12,4','19,6','6,7','0,0'],['CDCl₃','31,5','','',''],['CD₃ da acetona-d₆','19,5','','',''],['(CD₃)₂SO','22,0','','',''],['C₆D₆','25,5','','','']])
 +src(S+', tabela 5.19 (p. 238). No (C₆H₅)₃P as colunas são ipso, orto, meta e para. Células vazias são vazias no livro.')));

/* ===== montagem e calculadoras ===== */
const $=s=>document.querySelector(s);
function aroCalc(){
  const o=$('#arOut');if(!o)return;
  const X=+$('#arX').value,Y=+$('#arY').value,P=+$('#arP').value;
  const cx=T59[X],cy=Y?T59[Y]:null;
  const inc=(r,d)=>r[1+d];/* d=0 ipso,1 orto,2 meta,3 para */
  const rows=[];
  for(let pos=1;pos<=6;pos++){
    const dX=Math.min((pos-1+6)%6,(1-pos+6)%6);
    let s=128.5+inc(cx,dX),txt='128,5 + '+f(inc(cx,dX).toFixed(1));
    if(cy){const dY=Math.min((pos-P+6)%6,(P-pos+6)%6);s+=inc(cy,dY);txt+=' '+(inc(cy,dY)<0?'− '+f((-inc(cy,dY)).toFixed(1)):'+ '+f(inc(cy,dY).toFixed(1)))}
    rows.push([pos,s,txt]);
  }
  /* agrupa iguais */
  const g={};rows.forEach(r=>{const k=r[1].toFixed(1);(g[k]=g[k]||{s:r[1],p:[],t:r[2]}).p.push('C-'+r[0])});
  const lista=Object.values(g).sort((a,b)=>b.s-a.s);
  o.innerHTML='<p><b>'+lista.length+' sinais de C do anel</b> (o resto da molécula vem na coluna "C do substituinte").</p>'+tb(['Carbono(s)','Conta','δ calculado'],lista.map(r=>[r.p.join(', '),r.t,f(r.s.toFixed(1))]))+'<p class="hint">Se os dois substituintes forem iguais, a simetria junta os carbonos. A conta usa só a aditividade da tabela, então espere erros de 1 a 3 ppm, mais no orto.</p>';
}
function alcCalc(){
  const o=$('#c13out');if(!o)return;
  const n=id=>+($(id)||{}).value||0;
  const A=n('#c13a'),B=n('#c13b'),G=n('#c13g'),Dd=n('#c13d'),E=n('#c13e'),r=+$('#c13r').value,rn=n('#c13rn');
  const v=-2.5+9.1*A+9.4*B-2.5*G+0.3*Dd+0.1*E+r*rn;
  o.innerHTML='<p>δ = −2,5 + '+f((9.1*A).toFixed(1))+' (α) + '+f((9.4*B).toFixed(1))+' (β) + '+f((-2.5*G).toFixed(1))+' (γ) + '+f((0.3*Dd).toFixed(1))+' (δ) + '+f((0.1*E).toFixed(1))+' (ε) + '+f((r*rn).toFixed(1))+' (ramificação) = <b>'+f(v.toFixed(1))+' ppm</b></p>';
}
function subCalc(){
  const o=$('#c3out');if(!o)return;
  const b=parseFloat($('#c3b').value)||0,y=T53[+$('#c3y').value],p=$('#c3p').value,t=$('#c3t').value;
  const col={a:{t:1,i:2},b:{t:3,i:4},g:{t:5,i:5}}[p][t];
  const raw=y[col];
  if(raw===''){o.innerHTML='<p>A tabela do livro não traz esse valor para '+y[0]+' na posição escolhida.</p>';return}
  const inc=parseFloat(raw);
  o.innerHTML='<p>δ = '+f(b)+' '+(inc<0?'− '+f(-inc):'+ '+f(inc))+' = <b>'+f((b+inc).toFixed(1))+' ppm</b></p>';
}
function kCalc(){
  const o=$('#ckout');if(!o)return;
  const n=id=>+($(id)||{}).value||0;
  const v=123.3+10.6*n('#ckA')+7.2*n('#ckB')-1.5*n('#ckG')-7.9*n('#ckA2')-1.8*n('#ckB2')-1.5*n('#ckG2')-1.1*(+$('#ckZ').value);
  o.innerHTML='<p>δ = 123,3 + 10,6·'+n('#ckA')+' + 7,2·'+n('#ckB')+' − 1,5·'+n('#ckG')+' − 7,9·'+n('#ckA2')+' − 1,8·'+n('#ckB2')+' − 1,5·'+n('#ckG2')+' − 1,1·'+(+$('#ckZ').value)+' = <b>'+f(v.toFixed(1))+' ppm</b></p>';
}
function draw(){
  const box=$('#c13Box');if(!box||box.dataset.ok)return;
  box.innerHTML='<h3 class="rmh">¹³C: tabelas do Silverstein (capítulo 5)</h3><p class="hint">Valores transcritos do capítulo 5 do seu livro, com a página. As calculadoras usam as tabelas 5.1, 5.3, 5.9 e as constantes de alquenos do texto.</p>'+secs.join('');
  box.dataset.ok='1';
  aroCalc();alcCalc();subCalc();kCalc();
}
window.c13Draw=draw;
const upd=e=>{const i=e.target&&e.target.id;if(!i)return;
  if(/^ar[XYP]$/.test(i))aroCalc();else if(/^c13/.test(i))alcCalc();else if(/^c3[bypt]$/.test(i))subCalc();else if(/^ck/.test(i))kCalc();};
document.addEventListener('input',upd);document.addEventListener('change',upd);
window.C13_T59=T59;window.C13_T53=T53;
})();
