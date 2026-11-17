# Analorg

(Antes chamado "Quebra-cabeça de massas". Agora é o Analorg. O endereço continua o mesmo.)

App de uma página (`index.html`, instalável no celular) de consulta e estudo de Análise Orgânica, para graduação e ensino médio. Endereço: https://calisants.github.io/massas/

## Telas (menu fixo embaixo)
- **Início:** a ordem da análise em 6 passos e atalhos para Revisar, Orgânica Básica, Identificar, modo detetive e o bloco "O app" (Ajustes, Novidades, Salvar, Fontes).
- **Compostos:** 110 fichas (busca por nome, fórmula ou CAS; filtro por estado e grupo de solubilidade) com estrutura, fórmula, massa, GDH, cor, estado, PF, PE, solubilidade, CAS, bandas de IV esperadas, picos de MS, RMN estimado de ¹H e ¹³C e link para o SDBS.
- **Identificar:** uma tela só. Seções numeradas (aspecto, solubilidade, constantes físicas, análise elementar, IV, e fórmula/massas/RMN como opcional). Mostra as classes de compostos que sobram e o ranking de compostos do banco. O botão "Ver como funciona" preenche com um composto de exemplo. O que você digita fica salvo. Os campos de IV e de massas aceitam importar o espectro em .pdf, .jdx, .csv ou .txt: o PDF com texto é lido direto, e a impressão do SDBS (imagem) é lida pelo contorno da curva (IV) e pela altura das barras (MS). A leitura por imagem pode errar em 1 unidade de m/z ou trazer bandas a mais; sempre confira o campo preenchido. Os campos de RMN (δ de ¹H e δ de ¹³C, seção 6) também aceitam o espectro em PDF (ver v247). O leitor de PDF (pdf.js, na pasta `vendor/`) só é baixado quando você importa um PDF.
- **IV em PDF com números escritos na vertical** (rótulos dos picos girados 90°, como no PDF "IV 5B"): o app lê os números de verdade, dígito a dígito, comparando com modelos tirados desse PDF, e confere com os vales da curva azul. Testado com o PDF de 16 picos (16 de 16 certos). Com JPEG muito comprimido, 6 e 8 podem se confundir; o app pede para conferir a lista. Só vale para esse formato (fonte lisa de tela).
- **Overtones em opções:** no Identificar, seção 5, você diz o padrão do anel (mono, orto, meta, para, tri, sem anel) e marca as outras bandas fracas (aldeído 2820/2720, dobro do C=O, amina primária ~3200). O app compara com o padrão de cada composto, tirado do texto dos overtones. Não infere mais pelas bandas digitadas.
- **Ensaios:** preliminares, solubilidade, análise elementar, análise funcional (todos os grupos: álcool, fenol, carbonila, éster, amina e amida, com reagente, passo a passo e cor do tubo; a ficha do composto sugere os ensaios do grupo), problemas resolvidos, consulta rápida e notação ECGF.
- **Quatro abas:** Início, Compostos, Ensaios e Espectros (o antigo "Mais" virou seção "O app" do Início). A aba Espectros dá acesso a IV, Massas (MS) e RMN, e todas as páginas seguem o mesmo layout (voltar, título, subtítulo e barra de botões), tendo o RMN como referência. **IV:** qualquer um dos 106 compostos, espectro simulado e tabela de bandas numerada; Guia com a tabela completa. **Massas:** teoria, prática, livro e calculadora. **RMN:** quatro passos num espectro real, régua de deslocamento, laboratório de acoplamento, cálculos (Hz/ppm, integração, GDH), macetes, tabelas e espectros simulados por composto. Tocar num pico, banda ou sinal colore o trecho da molécula.
- **Início > O app:** Ajustes (zoom com os dedos, treinos sem pistas), Revisar (erros de massa e perguntas de quiz voltam em 1, 3 e 7 dias, no máximo 10 por dia), Novidades, cor do app (6 opções, com Astronomia), salvar o progresso, fontes.

## Avisos sobre os dados
- A tela Análise funcional segue a apostila de Análise Orgânica do IFRJ Nilópolis (2016) e as receitas do Receituário da Plataforma QO é Vida. Não usei os textos das páginas de análise funcional da Plataforma (não abriram na hora da conferência): os passos e as cores dos tubos vêm da apostila e do Receituário. Onde as fontes divergem (KOH ou NaOH no hidróxido ferroso, pH da hidroxilamina, KIO4 ou KIO3, concentração do amido), a página diz qual usou.
- PF e PE de 185 valores foram conferidos no PubChem (mediana de HSDB, ICSC, HMDB e outras; 7 divergiram e ficam marcados); estado, cor, CAS (só o dígito verificador) e grupo de solubilidade foram escritos sem fonte conferida; fórmula, massa, GDH, estrutura, número de sinais de RMN e multiplicidade são calculados pelo RDKit; os δ de RMN são faixas típicas de tabela.
- Os picos de MS de 75 compostos foram conferidos nos prints do SDBS (e os 12 dos exemplos com mecanismo na lousa); nos demais são picos típicos escritos sem fonte conferida. O IV de 73 compostos foi conferido contra a tabela de picos do SDBS (bandas-chave); o ¹³C de 70 compostos e o ¹H de 66 foram conferidos contra os valores de ppm dos prints do SDBS (o valor medido aparece na ficha; as faixas de tabela foram corrigidas onde não incluíam o valor real). Os prints de ¹H não trazem integração nem J, e alguns vêm truncados.
- SDBS (AIST): o app só liga para o site e mostra o texto de citação. O SDBS proíbe coleta automática e download em massa.
- A teoria de RMN resume os slides de RMN do Prof. Jeronimo (IFRJ). Os slides trazem δ de H do estireno em dois valores diferentes (6,73 e 6,37).
- B 51 (`CH2F2`), B 58 (`C2H5S`) e C 102 estão como impressos no livro, mas a massa não bate (provável erro de impressão).

## Como atualizar (quando mexer em `fontes/`)
```
cd fontes
pip install rdkit
python3 empacotar.py
```
Isso gera `index.html`, sobe a versão em `sw.js` e mostra a versão em Início > O app > Fontes e avisos. Depois é só enviar para o GitHub.

## Testes (antes de cada envio ao GitHub)
```
cd fontes
python3 empacotar.py
python3 testes/rodar.py
```
`rodar.py` roda um teste de cada vez e para no primeiro que falhar. Se o Chromium do Playwright não estiver instalado, usa o Chrome do sistema. Só envie para o GitHub com "Tudo passou."

## Formulário de sugestões (ainda não ligado)
O botão em Início > O app só aparece quando `FORM_URL` (em `fontes/analorg3.js`) tem o link de um Google Formulário. Sugestão: formulário com tipo (sugestão ou erro), tela, texto e e-mail opcional; as respostas vão para uma planilha, e uma segunda planilha controla o que já foi resolvido.

## Instalar no celular
Abra o endereço acima. Android: menu do Chrome, "Instalar app". iPhone: Safari, Compartilhar, "Adicionar à Tela de Início". Depois da primeira abertura com internet, o app funciona sem internet (as fontes do Google também ficam guardadas).

## Pasta `fontes/`
`template.html` (página), `build_app.py` e `build3.py` (exercícios e estruturas em SVG com RDKit), `why.py` e `rearr.py` (explicações), `svgmodels.py` (modelos com setas) e `empacotar.py`. Os scripts antigos já aplicados ficam só no histórico do Git.

- **Fragmentos de MS propostos:** `fontes/msfrag.py` gera, para os compostos com MS do SDBS, a estrutura de cada íon (clivagem α, benzílica, McLafferty, perda de CO ou de alceno), conferindo a massa nominal com o pico. É proposta por regras, não mecanismo medido; os picos sem regra simples aparecem como "sem proposta".


## Banco Analor
O banco do professor (UNIV1_290926.DBF, 4668 compostos) vive dentro de Compostos, não numa tela à parte. `fontes/analor_bd.py` converte o DBF (cp1252) em `fontes/analor_bd.json` (precisa de RDKit): dados do banco, coordenadas 2D da estrutura e as bandas de IV esperadas, calculadas pelo SMILES com `compostos.iv_bands`. O `build3.py` embute o JSON no app. No app:
- Fichas: buscando por nome, fórmula ou CAS, os compostos do banco aparecem junto, com ficha própria (os que já existem em COMP, pelo CAS, ficam só em COMP).
- Identificar: os compostos do banco entram na comparação (estado a 25 °C calculado pelo PF e PE, PF, PE, fórmula, GDH, grupo funcional, M nominal, picos de MS, bandas de IV). RMN (nº de sinais e faixas), subestruturas e grupo de solubilidade são calculados do SMILES por `compostos.nmr_h`, `nmr_c`, `subestruturas` e `grupo_sol` (este último é estimativa pelas regras da tabela do professor + solubilidade em água do banco, que parece estar em g/100 mL). Cor o banco não tem e conta como neutra.
- Os picos de MS aceitam `m/z:intensidade` e a importação de .jdx, .csv ou .txt. As bandas de IV aceitam `l` (larga) e `e` (estreita) e o meio da medida (filme/KBr, solução, gás). O deslocamento por meio é regra geral de livro-texto, sem fonte conferida nesta sessão.
O banco só traz picos de massas; não tem bandas de IV nem RMN, e não cita a fonte de cada número.

### Conferência do banco (10/11/2026)
`analor_pubchem.json` guarda a fórmula do PubChem (por CAS) dos registros em que a fórmula do banco não bate com a do SMILES. `confere()` em `analor_bd.py` usa isso: se o PubChem confirma a estrutura, a fórmula é corrigida; se confirma a fórmula, a estrutura não é usada; se não decide, a estrutura também não é usada. Em todos os casos a ficha mostra o aviso. Registros idênticos repetidos foram removidos (4668 para 4663), e densidade fora de 0,2–6 g/mL é descartada. Pendências conhecidas: 54 CAS que não passam no dígito verificador (alguns são outro tipo de código), 18 espectros com pico acima da massa molar (avisados na ficha), PF e PE sem correção (amostra de 70: 87% de PF e 79% de PE dentro de 5 °C do PubChem).

## v220–v225
- CAS corrigidos: `fontes/cas_corrigido.json` (gerado por `cas_aplica.py` a partir do PubChem); `analor_bd.py` aplica e registra antes/depois na ficha.
- Padrão do anel (mono/orto/meta/para) em ficha, lista e filtro; 9 compostos meta em `compostos.py`.
- Ensaios: cada um em sanfona, materiais montados do texto do procedimento (`fuMat`), ícones em `FUI`.
- Avisar erro ou sugestão: tela `p-av`; para enviar à planilha, publicar o script da aba "Como ligar o envio" e colocar o link em `AV_URL` (analorg4.js).
- PDF de IV com rótulos girados: leitura por linhas-guia dos picos; só 4 PDFs desse tipo foram vistos.

## v227
- Overtones: bifenilas (93 compostos do banco) estavam rotulados como "anel fundido". Agora o outro anel conta como substituinte e o padrão mono/orto/meta/para é mostrado, marcado como extensão da tabela de Smith sem fonte tabelada. Anéis fundidos, com 4 a 6 substituintes e heteroaromáticos continuam sem padrão ("não achei padrão tabelado").
- `fontes/analor_ot_refaz.py` recalcula só os overtones do `analor_bd.json` (o DBF não está no repositório).

## v232
- Ensaios ilustrados: Preliminares (cor, aspecto, cheiro, ignição, PF, PEb, pureza), Solubilidade (cada solvente), Análise elementar (cada elemento, halogênios, pirólise, Lassaigne) e Funcional de nitro, ácido carboxílico e cloro (tubo antes/depois e materiais). Tudo em `fontes/analorg5.js` (esquemas em SVG; as cores vêm do texto de cada ensaio).
- Novo: ficha "Cor da chama" em Preliminares: (1) cor da chama da amostra (Analor e Atividade 1 do Prof. Flávio), (2) alça de cobre / Beilstein (apostila IFRJ 2016, com as interferências), (3) cor da chama de metais do resíduo (Creative Chemistry e RSC, fonte web; passos de roteiros escolares).

## v235: Aula prática
- Nova tela em Ensaios > Aula prática (`p-ap`; código em `fontes/analorg6.js`, `.html` e `.css`). Cada ensaio (59 no catálogo: preliminares, solubilidade, elementar, funcional) tem uma estrela; a estrela põe o ensaio na aula ativa. Na tela da aula: nome, data, amostra, lista com "já fiz", resultado (positivo, negativo, inconclusivo) e o que foi observado, ordem, anotações, conclusão e relatório (copiar texto ou imprimir em PDF, com ou sem o passo a passo).
- Tudo fica numa chave só, `massas-aulas`: `{v:1, ativa, l:[{id,t,d,am,ens:[{id,f,r,o}],no,co,cr,up}]}`. Aula excluída vira lápide `{id,del,up}`. `apJuntar()` junta aulas de outro aparelho (a edição mais nova de cada aula vence, aula apagada não volta); o Salvar e levar o progresso já usa.
- O catálogo (`apCat()`) lê os ensaios das telas e de `FUN`; o id de cada um é fixo (`pf-ign`, `so-naoh`, `el-n`, `fn-tollens`...). Se um ensaio novo entrar nas telas, acrescente em `apCat()`.
- Teste: `fontes/testes/teste_aula.py`.

## v236 a v238: sincronização por código e plano de aula
- **Sincronização entre aparelhos** (`fontes/analorg7.js`, `.html`, `.css`; tela `p-sy`, em Início > O app). Sem conta nem dados pessoais: o app cria um código de 12 letras e números (60 bits) e quem digita o mesmo código em outro aparelho vê os mesmos dados. O código não vai para o servidor; vai o SHA-256 dele e o texto cifrado no aparelho (AES-GCM). Funciona sem internet e sincroniza ao abrir, ao voltar ao app, quando a internet volta e uns 4 segundos depois de cada alteração. O que sincroniza: `SY_MERGE` (aulas e revisões, juntadas) e `SY_LWW` (estudados, perguntas, análises salvas, favoritos, Identificar, notas: vence a alteração mais recente). Zoom, cor e sessão ficam só no aparelho. Na primeira ligação a um código existente, tudo é juntado e nada se perde.
- **Está desligada até haver servidor.** `SY_URL` e `SY_ANON` (começo de `analorg7.js`) estão vazios; enquanto estiverem, o item do menu não aparece. Para ligar: criar um projeto Supabase só do Anaquim, rodar `fontes/sync_supabase.sql`, colocar o endereço e a chave publicável nesses dois campos e rodar `empacotar.py`.
- **Plano de aula em código** (`ANQ1.…`), na tela Aula prática: gera um código só com o nome e a lista de ensaios, para mandar a um colega ou receber do professor. Sem servidor.
- `pgJuntaChave(k,inc)` (template) junta uma chave de outro aparelho sem apagar nada; é usada pelo Salvar e levar o progresso e pela sincronização.
- `fontes/MODO-PROFESSOR.md`: o que já está pronto e o que falta para o modo professor e a integração com o Analor e a QO é Vida.
- Testes: `teste_sync.py` (usa `testes/servidor_falso.js`, que imita as funções do Supabase; precisa de Node) e `teste_aula.py`.


### v239 e v240
- v239: sincronização ligada ao projeto Supabase "Anaquim" (sa-east-1, só dele). Código encurtado para 12 caracteres (3 grupos de 4, 60 bits). SQL aplicado e testado com as funções reais (gravar, conflito de versão, ler, apagar, tabela fechada, CORS). Os avisos do Supabase sobre funções `security definer` executáveis por `anon` são intencionais: é por elas que o app acessa os dados, e a tabela segue fechada.
- v240: "Imprimir ou salvar em PDF" não fazia nada no app instalado do iPhone (window.print não funciona ali). Em celular e app instalado o botão agora monta um PDF no próprio app e abre o menu de compartilhar (Salvar em Arquivos, Imprimir, enviar). No computador continua abrindo a impressão normal.
- Modo professor: continua sem tela e sem servidor; só os documentos e os identificadores fixos dos ensaios.

### v241: novo layout do PDF do relatório
- Cabeçalho verde com título, quadro de data/amostra/turma/nome, resumo (quantos positivos, negativos...), tabela com colunas N°, Ensaio (com a categoria embaixo), Amostra, Resultado (etiqueta colorida) e O que observei, depois Anotações, Conclusão e Procedimentos (opcional), rodapé com número da página.
- Cada ensaio da aula ganhou o campo "Amostra testada neste ensaio" (`s` no dado). A aula ganhou "Turma ou disciplina" (`tu`) e "Seu nome no relatório" (`nm`), os dois opcionais e só usados no relatório.
- A coluna Amostra, o texto copiado e o relatório da tela também mostram a amostra de cada ensaio.

### v242 e v243: reagente, tempo, resultado por amostra, fotos e link
- Cada ensaio da aula tem agora: Reagente e quantidade (`rg`), Tempo ou hora (`ha`), e resultado por amostra (`pa`: lista de {s, r, o}). O botão "Testei mais de uma amostra" separa; ficando com 1 amostra, volta ao modo simples.
- Fotos (até 3 por ensaio, reduzidas para no máximo 900 px, JPEG): ficam só no aparelho, na chave `anaquim-fotos`, fora da sincronização e do "Salvar e levar o progresso" (para não estourar o limite de 600 KB da nuvem). Fotos sem ensaio são apagadas ao abrir o app. Numa aula que veio de outro aparelho, a foto aparece como "guardada em outro aparelho".
- O PDF mostra uma linha por amostra, reagente e tempo embaixo do nome do ensaio, e uma seção de fotos (JPEG embutido sem recomprimir).
- Sincronização: botão "Copiar link para outro aparelho" (`#/sy/CODIGO`). Abrir o link preenche o código e a pessoa toca em Conectar; o código sai do endereço na hora. A máscara do código escondido passou a ter 3 grupos.
- Teste novo: `testes/teste_aula2.py`.

### v244: ilustrações com acabamento científico
- Estruturas (RDKit): `fontes/estilo.py` é o único lugar com o estilo (traço de 1,7 px, rótulos maiores, heteroátomos em tons discretos por variáveis `--at-n`, `--at-o`, `--at-s`, `--at-x`, `--at-br`, `--at-i`, que mudam no tema escuro). Todos os geradores (`build3`, `build_app`, `compostos`, `gf_tabela`, `arrows`, `msfrag`) chamam `estilo.opts(o)` e `estilo.pos(svg)`.
- Modelos de seta da teoria de MS: regerados por `svgmodels.py` e colocados no `template.html` (fonte Plex Sans, traço de 1,6 a 1,9 px, cartão com borda).
- Ensaios: tubos com vidro translúcido, menisco, brilho e escala; chamas em três camadas; ícones de vidraria com traço mais fino (`analorg5.js`, `analorg4.js`). Figuras dentro de cartão (`analorg5.css`). Variáveis `--glass` e `--glass-edge` no `template.html`.
- Os desenhos de lousa em `fontes/mech/*.webp` não foram alterados (são o material do professor).

### v246: tabelas no Android
- A tabela do relatório da Aula prática passava da borda do cartão em tela estreita. Até 600 px de largura cada linha vira um cartão empilhado (rótulo pequeno acima de cada valor); a impressão e o PDF não mudam.
- Varredura de todas as telas em 360 e 412 px de largura. Em 360 px, as tabelas de "Cola" (Notação ECGF e Consulta rápida) passavam da borda; agora as colunas quebram palavras compridas. Em 412 px nada passava. Script de varredura: ver `testes/` (não incluído, feito sob medida).

## v247: RMN em PDF e leitura de PDF em Espectros
- **Identificar, seção 6:** novo campo "δ de ¹³C (ppm)" (entra na comparação: fração dos δ dentro das faixas do composto, com folga de ±3 ppm; o campo de ¹H usa ±0,3) e dois botões de importar, um para ¹H e outro para ¹³C. Aceitam PDF (impressão do SDBS, que é imagem), PDF com texto, .jdx, .csv e .txt. O código está em `fontes/analorg8.js`.
- **Como lê a imagem do SDBS:** acha a moldura do gráfico (a mesma `pdfMoldura` do IV e MS), mede os traços grandes do eixo (10 px; os pequenos têm 5 px) e ajusta uma reta por todos eles. O último traço grande, à direita, é 0; ¹H tem um traço grande a cada 1 ppm e ¹³C a cada 20 ppm. O app descobre se o arquivo é ¹H ou ¹³C pela largura dos números escritos embaixo do eixo (¹³C tem números de 3 dígitos), então ¹³C num campo de ¹H é reconhecido e vai para o campo certo. Depois mede a altura de cada coluna acima da linha de base, acha as linhas (máximos com proeminência) e junta linhas vizinhas do mesmo multipleto num sinal só (¹H: intervalo de 1,7 vezes o espaçamento típico entre linhas; ¹³C: 0,5 ppm).
- **Conferência (17/11/2026):** com as impressões do SDBS de 2-butanona e anilina (¹H e ¹³C), contra os δ que já estão no app (`compostos_sdbs.py`): ¹H da butanona 2,449 / 2,137 / 1,065 (SDBS 2,449 / 2,139 / 1,058); ¹³C da butanona 209,16 / 36,80 / 29,53 / 8,08 (SDBS 209,28 / 36,87 / 29,43 / 7,87); ¹³C da anilina 146,43 / 129,29 / 118,21 / 115,00 (SDBS 146,51 / 129,26 / 118,39 / 115,07). A diferença máxima foi 0,007 ppm no ¹H e 0,21 ppm no ¹³C (1 pixel da imagem vale cerca de 0,02 ppm no ¹H e 0,38 ppm no ¹³C). Só 4 espectros foram testados.
- **Limites:** o número de sinais de ¹H não é preenchido, porque multipletos que se sobrepõem entram juntos (na anilina, os dois sinais de 6,73 e 6,64 viram um só, em 6,68); o de ¹³C é preenchido, porque cada linha é um carbono. A altura de cada sinal não é integração (o SDBS não imprime a integral). O CDCl₃ (77,2 no ¹³C; 7,26 no ¹H) pode aparecer como sinal e a tabela avisa. Arquivo de texto (.jdx/.csv) só funciona sem compressão (DIF/SQZ), como o de IV. Texto de PDF com tabela de picos do SDBS ("peak data") não foi testado.
- **Espectros:** cada método ganhou o painel "Ler um espectro em PDF": IV (aba "Ler PDF"), Massas (dentro de Analisar) e RMN (aba "Ler PDF"). Mostra o gráfico de varetas do que foi lido e uma tabela (IV: grupo possível pela tabela do app; MS: m/z e %; RMN: δ, linhas, altura relativa e tipo de H ou C pela tabela do app). Botões levam os números ao Identificar; no MS, "Analisar estes picos" abre a tela Analisar.
- **M no MS:** o maior m/z lido costuma ser o M+1 (isótopo ¹³C), não o M (na anilina o maior pico é 94 e o M é 93). O app marca como "provável M" o maior m/z que não parece M+1 (pico a 35% ou menos do pico logo abaixo). É só uma pista (com Cl, Br ou S há M+2; álcoois quase não têm M). Por isso o M só é preenchido na tela Analisar, com aviso; no Identificar ele não é preenchido, e o M provável e o M+1 ficam fora do campo de picos.
- A barra de abas do IV passou a rolar para o lado (5 abas não cabiam em 360 px).
- Teste: `fontes/testes/teste_rmn_pdf.py` (fixtures `sdbs_*_hnmr.pdf` e `sdbs_*_cnmr.pdf`).

## v248: aba Integral no RMN
- Espectros > RMN > Integral (sugestão do formulário, 17/11/2026): digite a fórmula molecular e, um por linha, o δ e a integral de cada sinal. O app divide o total de H da fórmula na proporção das integrais, arredonda de modo que a soma feche e avisa se algum sinal ficou longe de um número inteiro. Sem fórmula, mostra só a proporção. Botão leva os δ e a fórmula ao Identificar (o nº de sinais de ¹H não é preenchido). Código no fim de `fontes/analorg8.js`; teste: `fontes/testes/teste_integral.py`.
