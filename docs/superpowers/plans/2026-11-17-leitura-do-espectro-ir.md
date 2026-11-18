# Leitura do espectro de IV Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** O Anaquim lê todas as bandas de IV juntas e dá, por grupo funcional, um veredito (presente, excluído ou indefinido) com motivo, fonte e o que confirmaria.

**Architecture:** Um motor puro `ivLe` (sem DOM) dentro de `index.html`, entre marcadores que um teste em Node extrai e executa. A tela e o ranking de compostos só consomem a saída dele. O leitor de PDF passa a estimar a largura de cada banda.

**Tech Stack:** JavaScript puro em arquivo único (`index.html`), PWA. Testes em Node 22 e Playwright com `/usr/bin/google-chrome` (`/opt/npm-tools/node_modules/playwright`).

**Spec:** `docs/superpowers/specs/2026-11-17-leitura-do-espectro-ir-design.md`

## Global Constraints

- Sem IA ao rodar, offline, mesma saída para a mesma entrada.
- Não chuta: ambíguo vira `indefinido` e diz o que confirmaria (`falta`).
- Cada regra mostra a fonte: `Mapa (Ingham e Henson, 1984)`, `tabela do app` ou `regra do Claude, sem fonte conferida`.
- Texto na voz dela: sem travessão, sem frase de efeito, sem avisos de novidade dentro do app.
- Não altera MS, RMN nem `bdScoreIV`. Não coleta dado pessoal novo.
- Todo push vai direto para `main` com `VERSAO` (index.html:2504) e `CACHE` (sw.js:3) subindo juntos. Atual: v273, próxima: v274.
- Mensagens de commit terminam com as linhas de atribuição do ambiente.

## Review Focus

1. Uma banda só (ex.: só 1715): `co` presente, o resto indefinido ou excluído por falta de banda, nunca um palpite de aldeído ou ácido.
2. Lista vazia, ou só bandas abaixo de 1500: sem erro e com mensagem "nenhuma banda acima de 1500".
3. Entradas ruins: fora de 400–4000, repetidas, `NaN`: ignoradas sem quebrar.
4. Sim/Não que ela já marcou à mão: a leitura nunca sobrescreve; só atualiza os que ela mesma preencheu antes.
5. Meio `sol` ou `gas` (`#icMeio`): O–H livre em 3650–3580 conta como `oh` presente.

## Tabela de regras (valores fixos; bandas = `{v, w, h, forte}`)

`w` pode ser número (cm⁻¹), `'l'` (larga), `'e'` (estreita) ou vazio (desconhecida). "Larga" = `w==='l'` ou `w>=110`; "estreita" = `w==='e'` ou (`w` numérico `<110`).

| grupo (`k`) | presente | excluído | indefinido (e `falta`) | fonte |
|---|---|---|---|---|
| `co` | banda `forte` em 1850–1630 | nenhuma banda em 1850–1630 | há banda mas não `forte`: "intensidade da banda" | Mapa (1660–1770 intensas) e faixa do app |
| `oh` | meio sólido ou líquido: larga em 3550–3200. Meio `sol`/`gas`: qualquer em 3650–3580 | nenhuma banda em 3700–3100; ou só estreitas em 3550–3200 (sólido ou líquido) | banda em 3550–3200 sem largura: "largura (larga é O–H, fina é N–H)" | Mapa; a parte das estreitas é regra do Claude |
| `nh` | 1 ou 2 estreitas em 3500–3300 (2 = NH₂, 1 = NH) | nenhuma em 3500–3300 | banda sem largura | Mapa (banda dupla ou simples) |
| `ald` | banda em 2750–2700 e em 2860–2800, com `co` presente | nenhuma em 2750–2700 | só uma das duas: "o par 2820 e 2720" | Mapa (nota do 2720) e tabela do app |
| `cn` | banda em 2260–2210 | nenhuma em 2260–2100 | n/d | tabela do app |
| `cc` | banda em 2260–2100 e banda estreita em 3330–3270 | nenhuma em 2260–2100 | banda em 2260–2100 sem a de 3300: "banda ≡C–H em ~3300" | faixa: tabela do app; critério de 3300: regra do Claude |
| `dc` | banda em 1680–1620 e em 3100–3000 | nenhuma em 1680–1620 | só a de 1680–1620: "C–H acima de 3000" | Mapa |
| `no2` | bandas em 1550–1500 e em 1370–1300 | nenhuma em 1550–1500 | só uma das duas | tabela do app |
| `ar` | bandas em 1620–1580, em 1520–1480 e em 3100–3000 | nenhuma em 1620–1480 | falta alguma das três | Mapa (médias perto de 1600 e 1500) |

Extras mostrados na tela e **não** ligados ao ranking (sem `k` em `IDIR`): `ch3` (banda em 1385–1365), `ch2` (1470–1440, e 730–710 para cadeia longa), `c-o` (forte em 1300–1050, só `presente` ou `indefinido`), `anel-sub` (padrão de substituição abaixo de 900: mono 710–690 e 770–730; orto 770–735; meta 735–680 e 810–750; para 860–800, só se `ar` for `presente`). Fonte: Mapa, páginas 3 e 4.

Ordem de apresentação (regiões do Mapa): acima de 2700 (`oh`, `nh`, `ald`), 2000–1500 (`cn`, `cc`, `co`, `dc`, `no2`, `ar`), 1500–1100 (`ch3`, `ch2`, `c-o`), abaixo de 900 (`anel-sub`).

## Estrutura de arquivos

- Modificar `index.html`: bloco `/* IVLEITURA:INICIO */ ... /* IVLEITURA:FIM */` (motor, perto de `icBands`, linha ~3126); `pdfIV` (~4776) para largura; `icBands`/`icRun` (3126, 3166) e o bloco do Espectros (`spTabela`, ~6165) para a tela.
- Modificar `sw.js`: número do cache.
- Criar `tests/ivleitura.test.js` (Node puro), `tests/ivleitura-ui.test.js` (Playwright), `tests/ivlargura.test.js` (Playwright com PDFs). Os PDFs de teste vêm de `ANAQUIM_PDFS` (padrão `/home/claude/pdfs`); buscar `etanol_ir.pdf`, `acetona_ir.pdf`, `ac_salicilico_ir.pdf` no projeto Orgânica.

---

### Task 1: Motor `ivLe`

**Files:**
- Modify: `index.html` (novo bloco entre marcadores `IVLEITURA`)
- Test: `tests/ivleitura.test.js`

**Interfaces:**
- Produces: `ivLe(bandas: {v:number,w?:number|'l'|'e'|'',h?:number,forte?:boolean}[], meio: ''|'sol'|'gas') -> {vazio:boolean, aviso:string, grupos:{k:string,lab:string,regiao:string,estado:'presente'|'excluido'|'indefinido',motivo:string,falta:string,fonte:string}[]}`. `k` dos nove primeiros = chaves de `IDIR` (`oh,nh,co,ald,cn,cc,dc,no2,ar`); extras: `ch3,ch2,c-o,anel-sub`.
- Produces: `ivBandasDeTexto(s: string) -> bandas[]` (usa `bdIvQuery`, ver `index.html:4231`).

- [ ] **Step 1: Escrever os testes que falham.** O teste extrai o bloco entre os marcadores e executa com `new Function`. Nomes e asserções:
  - `aldeido`: bandas 1715 (forte), 2820, 2720, 3030 → `ald.estado==='presente'`, `co.estado==='presente'`, `oh.estado==='excluido'`, `nh.estado==='excluido'`.
  - `acido_carboxilico`: 3000 (w='l'), 1710 (forte) → `oh.estado==='presente'`, `co.estado==='presente'`, `ald.estado==='excluido'`.
  - `banda_unica`: só 1715 forte → `co` presente; `ald.estado` é `excluido`; nenhum grupo de `oh,nh,ald,cn,cc,dc,no2,ar` é `presente`.
  - `largura_desconhecida`: só 3300 sem `w` → `oh.estado==='indefinido'` e `oh.falta` contém `largura`.
  - `nitro`: 1530, 1350 (fortes), 3080 → `no2` presente. Só 1530 → `no2` indefinido.
  - `meio_solucao`: 3620 estreita com `meio='sol'` → `oh` presente; mesma entrada com `meio=''` → `oh` excluído.
  - `vazio_e_ruido`: `[]` e `[{v:NaN},{v:200},{v:5000}]` → `vazio===true`, `aviso` contém `nenhuma banda`, sem exceção. Duplicatas (1715 duas vezes) contam uma.
  - `fonte_sempre`: para todo grupo de todos os casos acima, `fonte` é uma das três etiquetas da seção Global Constraints.
- [ ] **Step 2: Rodar `node tests/ivleitura.test.js`.** Esperado: FAIL (`ivLe` não definida).
- [ ] **Step 3: Implementar `ivLe` e `ivBandasDeTexto`** no bloco `IVLEITURA`, com as regras da tabela acima como dados (um array de regras com `k, lab, regiao, avalia(bandas, meio) -> {estado,motivo,falta}, fonte`), sem tocar no DOM. Normalizar entrada: descartar `v` fora de 400–4000 ou não finito e fundir bandas a menos de 1 cm⁻¹ de distância.
- [ ] **Step 4: Rodar `node tests/ivleitura.test.js`.** Esperado: todos PASS.
- [ ] **Step 5: Commit** (`index.html`, `tests/ivleitura.test.js`).

### Task 2: Largura da banda no leitor de PDF

**Files:**
- Modify: `index.html` (`pdfIV`, ~4776; `pdfIVJunta`, ~4956)
- Test: `tests/ivlargura.test.js`

**Interfaces:**
- Produces: cada banda de `pdfIV` e de `pdfIVArquivo(...).peaks` passa a ter `w: number` (largura a meia altura da queda, em cm⁻¹, arredondada para inteiro; `0` só quando não der para medir). `pdfIVJunta` preserva `w`.
- Consumes: o campo `#icIV` já escreve `l` quando `w>=110 && v>2400` (ver `ivPreenche`, ~4972); ajustar para `w>=110` em qualquer `v>=2400`, e `e` quando `w` medido `<=40`.

- [ ] **Step 1: Escrever o teste que falha** (Playwright, mesmo molde de `lepdf.js` desta sessão: carrega `index.html`, chama `pdfIVArquivo(new File(...))`). Casos:
  - `etanol_ir.pdf`: a banda mais forte entre 3500 e 3200 tem `w>=110`.
  - `acetona_ir.pdf`: a banda do C=O (1700–1730) tem `w<=40`.
  - `ac_salicilico_ir.pdf`: todas as bandas continuam presentes (mesma lista de posições que a v273) e todas com `w` numérico.
- [ ] **Step 2: Rodar `node tests/ivlargura.test.js`.** Esperado: FAIL (`w` é 0).
- [ ] **Step 3: Implementar a medição** em `pdfIV`: para cada pico aceito, andar para os dois lados na curva `T` até a transmitância subir metade da proeminência (`pr`) e converter a distância em pixels para cm⁻¹ com o mesmo mapeamento de `V`. Limitar a busca a 600 cm⁻¹ de cada lado; usar a curva suavizada com janela de 3 pontos para não parar numa ondulação.
- [ ] **Step 4: Rodar o teste.** Esperado: PASS. Se o O–H do etanol não passar de 110, parar e reavaliar o método antes de ajustar o limiar (o limiar 110 é o do app, não se mexe).
- [ ] **Step 5: Commit.**

### Task 3: Tela no Identificar e ligação com o ranking

**Files:**
- Modify: `index.html` (`icBands` ~3126; `icRun` ~3165; `icReset`, `icLoad`, `icSave` ~3040–3046; marcação perto de `#icBandOut`, linha 1601)
- Test: `tests/ivleitura-ui.test.js`

**Interfaces:**
- Consumes: `ivLe`, `ivBandasDeTexto` (Task 1); `icSt.ir` (mapa `k -> 'sim'|'nao'`).
- Produces: `icLeituraDesenha() -> void` (escreve em `#icLeitura`); `icSt.irAuto: {[k]: true}` (chaves que a leitura preencheu; persistido em `icSave` e lido em `icLoad`, zerado em `icReset`).

- [ ] **Step 1: Escrever o teste que falha** (Playwright). Casos:
  - `mostra_leitura`: digitar `1715 2820 2720 3030` em `#icIV` → `#icLeitura` mostra "aldeído"/"C–H de aldeído" como presente e cada linha tem a fonte; a lista antiga por banda fica dentro de um `<details>` fechado.
  - `liga_ao_ranking`: após o caso acima, `icSt.ir.ald==='sim'`, `icSt.ir.oh==='nao'`, `icSt.irAuto.ald===true`.
  - `respeita_manual`: marcar `oh` como `sim` à mão antes de digitar; depois de digitar as bandas, `icSt.ir.oh` continua `'sim'` e `icSt.irAuto.oh` é falso.
  - `atualiza_auto`: apagar `2720` → `icSt.ir.ald` deixa de ser `'sim'` (volta a vazio se ficou `indefinido`).
  - `vazio`: campo vazio → `#icLeitura` vazio e `icSt.irAuto` vazio. Sem exceções no console em todos os casos.
- [ ] **Step 2: Rodar `node tests/ivleitura-ui.test.js`.** Esperado: FAIL.
- [ ] **Step 3: Implementar `icLeituraDesenha`:** lê `#icIV` e `#icMeio`, chama `ivLe`, desenha uma linha por grupo (estado, motivo, "falta: ..." quando indefinido, fonte discreta recolhida, como ela pediu), agrupadas pelas quatro regiões do Mapa. Aplicar `presente→'sim'` e `excluido→'nao'` em `icSt.ir` só onde `!icSt.ir[k] || icSt.irAuto[k]`; `indefinido` remove a marca automática. Chamar de `icBands()`. Envolver a lista por banda existente em `<details>` fechado com o título "Cada banda isolada (pode ser muita coisa)".
- [ ] **Step 4: Rodar o teste.** Esperado: PASS; rodar também `tests/ivleitura.test.js`.
- [ ] **Step 5: Commit.**

### Task 4: Mesma leitura em Espectros > IV

**Files:**
- Modify: `index.html` (bloco `met==='iv'` do desenho do painel, ~6160–6172; `spLevar`, ~6196)
- Test: `tests/ivleitura-ui.test.js` (novos casos)

**Interfaces:**
- Consumes: `ivLe(r.peaks, meio)` com `r.peaks` do `pdfIVArquivo` (Task 2 entrega `w`).

- [ ] **Step 1: Escrever o teste que falha:** carregar `acetona_ir.pdf` pelo input do painel IV de Espectros → o painel mostra o bloco "Leitura do espectro" com `co` presente e a tabela "O que pode ser" passa a ficar em `<details>` fechado.
- [ ] **Step 2: Rodar.** Esperado: FAIL.
- [ ] **Step 3: Implementar:** reaproveitar a função de desenho de linhas da Task 3 (extrair `ivLeituraHtml(res) -> string` e usar nos dois lugares), sem copiar código. "Levar as bandas para o Identificar" continua igual.
- [ ] **Step 4: Rodar todos os testes** (`node tests/*.test.js`). Esperado: PASS.
- [ ] **Step 5: Commit.**

### Task 5: Publicar e registrar

**Files:**
- Modify: `index.html:2504` (`VERSAO='v274 · <data>'`), `sw.js:3` (`anaquim-v274`)

- [ ] **Step 1:** Rodar `node tests/*.test.js` e os dois testes anteriores desta sessão (`repro.js`, `remoto.js`, em `/home/claude/tests`). Esperado: tudo PASS.
- [ ] **Step 2:** Subir versão e cache, commit, `git push origin HEAD:main`.
- [ ] **Step 3:** Acrescentar uma linha na planilha "Avisos do Claude" (id `1GtXULxxrZzSAWrw3ca3Ze2PPxIVheOKP80Q7whDksgY`, aba `Versões`, colunas Versão, Data, Tipo, Onde, O que mudou, Observação) dizendo o que foi testado e o que não foi.
