# Modo professor: o que já está pronto e o que falta

Nada aqui aparece no app para o aluno. É o mapa para quando o modo professor for construído, e para conversar com o Otton e o Pedrosa sobre a integração com o Analor e a QO é Vida.

## O que já está pronto

- **Aula prática com formato fixo.** Cada aula é `{id, t, d, am, ens:[{id,f,r,o}], no, co, cr, up}`. Os ids dos ensaios (`pf-ign`, `so-naoh`, `el-n`, `fn-tollens`...) não mudam, então uma aula escrita num aparelho, num site ou numa planilha continua valendo em qualquer versão do app. Campos novos (turma, nota, comentário do professor) entram na aula sem quebrar as antigas, porque a junção guarda a aula inteira.
- **Plano de aula em código** (`ANQ1.…`). O professor monta uma aula, gera o código e manda por WhatsApp ou pelo Classroom; o aluno cola e a aula aparece pronta. O código leva só o nome e a lista de ensaios, nunca resultado nem anotação. Já funciona, sem servidor.
- **Sincronização por código** (`analorg7.js`, `sync_supabase.sql`). Sem conta, sem e-mail, sem nome. O texto é cifrado no aparelho (AES-GCM, chave vinda do código) e o servidor só guarda o bloco e uma impressão digital do código.
- **Uma função só para juntar dados** (`pgJuntaChave`) e uma lista só do que sincroniza (`SY_MERGE`, `SY_LWW` em `analorg7.js`). Quem mexer no formato mexe em dois lugares.

## Como o modo professor poderia funcionar (proposta, ainda não construída)

1. **Turma.** O professor cria uma turma e recebe dois códigos: o da turma (vai para os alunos) e o dele (só ele lê). O app do aluno entra com o código da turma e um apelido que o próprio aluno escolhe. Nome real só se a escola exigir, e isso é decisão do professor, não do app.
2. **Envio.** O aluno toca em "Enviar ao professor" numa aula. É sempre uma ação explícita; nada sai sozinho. O envio vai cifrado com a chave da turma, então o servidor não lê o conteúdo. Só o professor, com o código dele, lista e abre os envios.
3. **Painel.** Lista de alunos (apelidos), quem enviou cada aula, resultado de cada ensaio lado a lado, e um campo de comentário que volta para o aluno.
4. **Servidor.** Mesma ideia da sincronização: tabela fechada e funções (`criar_turma`, `enviar_aula`, `listar_envios`, `apagar_envio`), cada uma conferindo a impressão digital do código antes de responder. Esboço de tabelas: `turmas(id_hash, prof_hash, criada)` e `envios(turma_id_hash, envio_id, bloco, atualizado)`.

## Decisões que não são técnicas

- **Menores de 18.** O app já coleta o mínimo (nada de nome, e-mail, telefone ou nascimento). Para o professor ver respostas por aluno, vale combinar com o IFRJ como isso deve ser tratado (apelido ou nome, quem guarda, por quanto tempo). Não sou advogada: a LGPD tem regras específicas para dados de crianças e adolescentes, e a orientação certa vem do IFRJ ou da ANPD.
- **Quem hospeda o servidor.** Hoje o Anaquim usaria um projeto Supabase só dele. Se o Anaquim, o Analor e a QO é Vida passarem a usar o mesmo servidor, é preciso decidir de quem é a conta.
- **Autoria e créditos.** Continua como a Camila definiu: o Anaquim é dela, o Analor é do Otton, a QO é Vida é compartilhada. O código aqui não depende dessa decisão.

## Integração com o Analor e a QO é Vida

- Cada site guarda dados no seu próprio endereço, então o `localStorage` de um não aparece no outro. O código de sincronização é o jeito portátil: qualquer página que fale o mesmo protocolo (3 chamadas e a cifra AES-GCM de `analorg7.js`) lê e escreve os mesmos dados do aluno.
- O catálogo de ensaios (`apCat()` em `analorg6.js`) pode virar um JSON único usado pelos três, com os mesmos ids. É o que deixa uma aula montada no Anaquim abrir no Analor e vice-versa.
- O banco de compostos do Analor continua dentro de Compostos. Para a identificação simples ficar no Analor e a avançada no Anaquim, basta cada lado abrir o outro com o composto ou os dados já preenchidos por endereço (`#/ic`).
