# Leitura do espectro de IV (design curto, aprovado em 17/11/2026)

## Intenção e por quê

Hoje o Anaquim consulta cada banda de IV sozinha. Para 1715 cm⁻¹ ele lista tudo que absorve ali (cetona, ácido, aldeído, éster, amida), sem usar o que as outras bandas dizem. A leitura fica confusa. No módulo Analin do futuro Analor o espectro é a única entrada, então o app precisa ler o conjunto como uma pessoa que sabe interpretar espectros: concluir grupos funcionais a partir de todas as bandas e recomendar as ligações.

## Metas

- Ler todas as bandas juntas, região por região, na ordem do Mapa do prof. Violante (Ingham e Henson, J. Chem. Educ. 1984, 61, 704).
- Dar um veredito por grupo funcional, sempre com o motivo: **presente**, **excluído** ou **não dá para decidir** (dizendo qual banda confirmaria).
- Exemplo: 1715 + 2820 + 2720 resulta em aldeído; a falta de O–H largo exclui ácido e álcool.
- Preencher os Sim/Não de IV (`icSt.ir`) que já alimentam o ranking de compostos, com possibilidade de desfazer à mão.
- Medir a largura da banda no leitor de PDF, porque sem ela não se distingue O–H largo de N–H fino.
- Mostrar a fonte de cada regra.

## Não metas e antimetas

- Não usa IA ao rodar: tudo no app, offline, determinístico.
- Não chuta quando é ambíguo. Se não dá para decidir, diz isso e diz o que olhar.
- Não mexe em MS nem RMN nesta etapa.
- Não troca o ranking de compostos (`bdScoreIV`); só alimenta os Sim/Não que ele já usa.
- Não mostra aviso de novidade dentro do app (regra dela). O registro vai na planilha "Avisos do Claude".

## Restrições

- App de arquivo único (`index.html`), PWA, usado por menores de 18 anos: nada de dado pessoal novo.
- Fontes rotuladas com honestidade: regra do Mapa ou da tabela do app (`IRT`, `IRREG`, coluna de banda companheira) aparece como tal; regra de ausência que não vem dessas fontes aparece como "regra do Claude, sem fonte conferida".
- Texto na voz dela: sem travessão, sem frase de efeito, sem listas de três por reflexo.
- O leitor de PDF hoje só entrega posição e altura (`w` fica 0). O O–H largo só é detectável depois de medir largura.
- Publicar direto na `main` do repositório `massas`, subindo a versão e o cache do `sw.js`.

## Abordagens consideradas

1. **Regras no app, sobre o conjunto de bandas (escolhida).** Rápida, explicável, funciona offline, mesma saída para o mesmo espectro, e cada passo cita a fonte.
2. **Casar o espectro inteiro com um banco de espectros.** Já existe parcialmente no ranking de compostos, mas só vale para composto que está no banco e não explica grupos. Fica como complemento, não substituto.
3. **IA lendo o espectro durante o uso.** Descartada: precisa de internet, custa por uso, o resultado varia entre execuções e o app é usado por estudantes, inclusive menores.

## Desenho

- **Entrada:** lista de bandas `{v, h, w, forte}` (do campo `#icIV` ou do leitor de PDF) e o meio (`#icMeio`).
- **Motor de leitura** (função pura, testável no Node): percorre as regiões na ordem do Mapa (acima de 2700; 2000 a 1500; 1500 a 1100; abaixo de 900) e aplica regras de combinação. Cada regra declara grupo, bandas exigidas, bandas que excluem, fonte.
- **Saída:** lista de grupos com `estado` (presente, excluído, indefinido), `motivo` e `falta` (o que confirmaria).
- **Tela:** bloco "Leitura do espectro" no Identificar e em Espectros > IV, no lugar da lista "o que pode ser" por banda. A tabela por banda continua disponível, recolhida.
- **Ligação com o ranking:** vereditos "presente" e "excluído" preenchem `icSt.ir`; "indefinido" não preenche nada.
- **Leitor de PDF:** estimar a largura de cada banda pela curva (largura a meia altura em cm⁻¹) e passar `w` adiante.

## Fica para quem constrói

- Quais grupos entram primeiro (sugestão: os de `IDIR`, que já alimentam o ranking).
- Limiares de largura para "larga" e "estreita".
- Texto exato dos motivos, no tom dela.
- Testes: espectros reais do projeto (SDBS) com a tabela de picos impressa como gabarito.
