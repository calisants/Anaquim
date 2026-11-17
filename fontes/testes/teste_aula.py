"""Aula prática: estrela nos ensaios, lista da aula, resultado, relatório, junção de aulas e exclusão."""
import sys,os,json;sys.path.insert(0,os.path.dirname(__file__))
from playwright.sync_api import sync_playwright
from _nav import abrir
URL='file:///home/claude/massas/index.html'
falhas=[]
def chk(nome,ok):
    print(('ok  ' if ok else 'FALHOU ')+nome)
    if not ok:falhas.append(nome)
with sync_playwright() as p:
    b=abrir(p);ctx=b.new_context(viewport={'width':360,'height':740});pg=ctx.new_page()
    erros=[]
    pg.on('pageerror',lambda e:erros.append(str(e)))
    pg.goto(URL);pg.wait_for_timeout(400)
    def aulas():return pg.evaluate("JSON.parse(localStorage.getItem('massas-aulas')||'null')")
    def tela():return pg.evaluate('CUR')

    # catálogo: todos os ensaios têm estrela e id único
    cat=pg.evaluate("apCat().map(e=>e.id)")
    chk('catálogo tem mais de 55 ensaios',len(cat)>55)
    chk('ids únicos',len(cat)==len(set(cat)))
    nest=pg.evaluate("document.querySelectorAll('.apstar').length")
    chk('uma estrela por ensaio ('+str(nest)+' de '+str(len(cat))+')',nest==len(cat))
    sem=pg.evaluate("apCat().filter(e=>!document.querySelector('.apstar[data-ens=\"'+e.id+'\"]')).map(e=>e.id)")
    chk('nenhum ensaio sem estrela '+str(sem),not sem)
    chk('título dos ensaios não ganhou texto extra',pg.evaluate("[...document.querySelectorAll('#p-pf .el > h3')].some(h=>h.textContent.trim()==='Cor')"))

    # menu e página vazia
    pg.click('#t-en');pg.click('[data-go=p-ap]:visible >> nth=0');pg.wait_for_timeout(100)
    chk('abre Aula prática pelo menu de Ensaios',tela()=='p-ap')
    chk('sem aula, mostra criar aula',pg.query_selector('#apBox [data-a=nova]') is not None)

    # estrela cria a aula e adiciona
    pg.click('#t-en');pg.click('[data-go=p-pf]:visible >> nth=0')
    pg.click('.apstar[data-ens=pf-ign]');pg.wait_for_timeout(100)
    d=aulas()
    chk('estrela criou uma aula com o ensaio',d and len(d['l'])==1 and [x['id'] for x in d['l'][0]['ens']]==['pf-ign'])
    chk('estrela ficou marcada',pg.get_attribute('.apstar[data-ens=pf-ign]','aria-pressed')=='true')
    pg.click('.apstar[data-ens=pf-pf]')
    # funcional dinâmico, dentro do resumo: não pode abrir nem fechar o cartão
    pg.click('#t-en');pg.click('[data-go=p-fu]:visible >> nth=0')
    pg.click('#p-fu .sgm [data-fu=car]')
    pg.click('.apstar[data-ens=fn-tollens]')
    abertos=pg.evaluate("[...document.querySelectorAll('#fu-car details.fuc')].filter(d=>d.open).length")
    chk('estrela no resumo não abre o cartão',abertos==0)
    d=aulas()
    chk('Tollens entrou na aula',any(x['id']=='fn-tollens' for x in d['l'][0]['ens']))
    # elementar (cartão de elemento) e solubilidade
    pg.click('#t-en');pg.click('[data-go=p-el]:visible >> nth=0');pg.click('.apstar[data-ens=el-n]')
    pg.click('#t-en');pg.click('[data-go=p-so]:visible >> nth=0')
    pg.click('#p-so .sgm [data-so=teo]')
    pg.click('.apstar[data-ens=so-naoh]')
    d=aulas();ids=[x['id'] for x in d['l'][0]['ens']]
    chk('cinco ensaios na aula',ids==['pf-ign','pf-pf','fn-tollens','el-n','so-naoh'])

    # página da aula
    pg.click('#t-en');pg.click('[data-go=p-ap]:visible >> nth=0');pg.wait_for_timeout(100)
    chk('lista mostra 5 ensaios',pg.evaluate("document.querySelectorAll('#apLista .ap-e').length")==5)
    pg.fill('#apTit','Aula 7: identificação');pg.fill('#apAm','amostra 7');pg.wait_for_timeout(500)
    it=pg.locator('#apLista .ap-e').nth(0);it.locator('summary').click()
    it.locator('[data-a=r][data-v=p]').click()
    it.locator('textarea').fill('chama amarela com fuligem');pg.wait_for_timeout(500)
    d=aulas();a=d['l'][0]
    chk('título, amostra salvos',a['t']=='Aula 7: identificação' and a['am']=='amostra 7')
    chk('resultado e observação salvos, feito marcado',a['ens'][0]['r']=='p' and a['ens'][0]['f']==1 and a['ens'][0]['o']=='chama amarela com fuligem')
    chk('selo mudou para Positivo',pg.inner_text('#apLista .ap-e >> nth=0').find('Positivo')>=0)
    # clicar de novo limpa
    it.locator('[data-a=r][data-v=p]').click();it.locator('[data-a=r][data-v=n]').click()
    chk('trocar para Negativo',aulas()['l'][0]['ens'][0]['r']=='n')
    # reordenar
    pg.locator('#apLista .ap-e').nth(1).locator('summary').click()
    pg.locator('#apLista .ap-e').nth(1).locator('[data-a=sobe]').click()
    chk('subir troca a ordem',[x['id'] for x in aulas()['l'][0]['ens']][:2]==['pf-pf','pf-ign'])
    # estrela de ensaio com anotação não deixa tirar sem querer
    pg.click('#t-en');pg.click('[data-go=p-pf]:visible >> nth=0');pg.click('.apstar[data-ens=pf-ign]')
    chk('estrela não apaga ensaio com anotação',any(x['id']=='pf-ign' for x in aulas()['l'][0]['ens']))
    # abrir um ensaio de solubilidade pela aula leva ao painel certo
    # (feito no fim, junto de Ver procedimento)
    # abrir procedimento
    pg.click('#t-en');pg.click('[data-go=p-ap]:visible >> nth=0');pg.wait_for_timeout(100)
    pg.locator('#apLista .ap-e').nth(2).locator('summary').click()
    pg.locator('#apLista .ap-e').nth(2).locator('[data-a=abrir]').click();pg.wait_for_timeout(200)
    chk('Ver procedimento abre a tela do ensaio',tela()=='p-fu')
    # picker
    pg.click('#t-en');pg.click('[data-go=p-ap]:visible >> nth=0');pg.wait_for_timeout(100)
    pg.click('#apPick summary');pg.fill('#apBusca','schiff');
    vis=pg.evaluate("[...document.querySelectorAll('#apPick label.apit')].filter(l=>!l.hidden).map(l=>l.textContent.trim())")
    chk('busca acha Schiff '+str(vis),len(vis)==1 and 'Schiff' in vis[0])
    pg.check('#apPick [data-pick=fn-schiff]');pg.wait_for_timeout(100)
    chk('marcar no seletor adiciona',any(x['id']=='fn-schiff' for x in aulas()['l'][0]['ens']))
    pg.uncheck('#apPick [data-pick=fn-schiff]')
    chk('desmarcar tira (sem anotação)',not any(x['id']=='fn-schiff' for x in aulas()['l'][0]['ens']))
    pg.fill('#apBusca','')
    # notas e conclusão
    pg.fill('#apNo','Usar capela para o bromo.');pg.fill('#apCo','Provável aromático.');pg.wait_for_timeout(500)
    a=aulas()['l'][0]
    chk('anotações e conclusão salvas',a['no']=='Usar capela para o bromo.' and a['co']=='Provável aromático.')
    # relatório
    pg.click('#apBox [data-a=rel]');pg.wait_for_timeout(100)
    rel=pg.inner_text('#apRel')
    chk('relatório traz título, amostra, resultado e conclusão','Aula 7: identificação' in rel and 'amostra 7' in rel and 'Negativo' in rel and 'Provável aromático.' in rel and 'chama amarela' in rel)
    chk('ensaio não feito aparece como não realizado','Não realizado' in rel)
    chk('sem passo a passo por padrão','Procedimentos' not in rel)
    pg.check('#apProc');pg.click('#apBox [data-a=rel]');pg.wait_for_timeout(100)
    rel2=pg.inner_text('#apRel')
    chk('com passo a passo mostra Procedimentos e Tollens','Procedimentos' in rel2 and 'Tollens' in rel2)
    txt=pg.evaluate("apRelTexto(apAtiva(apGet()),true)")
    chk('texto simples para copiar tem as seções','ENSAIOS E RESULTADOS' in txt and 'CONCLUSÃO' in txt and 'PROCEDIMENTOS' in txt)
    chk('sem travessão no relatório','—' not in txt)

    # nova aula, troca, exclusão
    pg.click('#apBox [data-a=nova]');pg.wait_for_timeout(100)
    chk('nova aula criada e ativa',len(aulas()['l'])==2 and pg.evaluate("apAtiva(apGet()).ens.length")==0)
    chk('estrelas refletem a aula ativa (vazia)',pg.evaluate("[...document.querySelectorAll('.apstar')].every(b=>b.getAttribute('aria-pressed')==='false')"))
    pg.click('#apApaga');pg.click('#apApaga');pg.wait_for_timeout(100)
    d=aulas()
    chk('excluir deixa lápide e volta para a outra aula',sum(1 for x in d['l'] if x.get('del'))==1 and pg.evaluate("apAtiva(apGet()).t")=='Aula 7: identificação')

    # junção (importar código / sincronizar): vence a edição mais nova; apagada continua apagada
    r=pg.evaluate("""()=>{
      const d=apGet();const a=apAtiva(d);const velho=JSON.parse(JSON.stringify(d));
      const novo=JSON.parse(JSON.stringify(d));novo.l.find(x=>x.id===a.id).t='Título do outro aparelho';novo.l.find(x=>x.id===a.id).up=Date.now()+5000;
      novo.l.push({id:'zzz1',t:'Só no outro',d:'2026-11-18',am:'',ens:[],no:'',co:'',cr:1,up:5});
      apJuntar(novo);const m1=apGet();
      apJuntar(velho);const m2=apGet();
      const apagada=m1.l.find(x=>x.del);
      const rev=JSON.parse(JSON.stringify(m2));rev.l=rev.l.map(x=>x.id===apagada.id?{id:x.id,t:'ressuscitou',ens:[],up:apagada.up-1000}:x);apJuntar(rev);
      return {titulo:m1.l.find(x=>x.id===a.id).t,novaveio:m1.l.some(x=>x.id==='zzz1'),velhoNaoVence:m2.l.find(x=>x.id===a.id).t,apagadaMantida:!!apGet().l.find(x=>x.id===apagada.id).del};}""")
    chk('junção: edição mais nova vence',r['titulo']=='Título do outro aparelho')
    chk('junção: aula nova do outro aparelho entra',r['novaveio'])
    chk('junção: cópia antiga não sobrescreve',r['velhoNaoVence']=='Título do outro aparelho')
    chk('junção: aula apagada não ressuscita',r['apagadaMantida'])

    # importar pelo código do Salvar também junta aulas
    cod=pg.evaluate("pgEnc({v:1,d:pgCollect()})")
    chk('código de salvar inclui as aulas',pg.evaluate("'massas-aulas' in pgDec(%s).d"%json.dumps(cod)))

    # plano de aula para compartilhar: só nome e ensaios
    pg.evaluate("go('p-ap')");pg.wait_for_timeout(100)
    pg.click('#apPlano summary');pg.click('[data-a=plgera]')
    cod=pg.input_value('#apPlTxt')
    chk('código do plano começa com ANQ1.',cod.startswith('ANQ1.'))
    chk('o código do plano não leva resultado nem anotação','segredo' not in pg.evaluate("atob(%s.slice(5).replace(/\\s+/g,''))"%json.dumps(cod)) and 'chama amarela' not in pg.evaluate("decodeURIComponent(escape(atob(%s.slice(5))))"%json.dumps(cod)))
    n_ant=pg.evaluate("apVivas(apGet()).length");ens_ant=pg.evaluate("apAtiva(apGet()).ens.length")
    pg.click('[data-a=plcria]');pg.wait_for_timeout(200)
    nova=pg.evaluate("apAtiva(apGet())")
    chk('criar com o código faz uma aula nova com os mesmos ensaios, sem resultado',pg.evaluate("apVivas(apGet()).length")==n_ant+1 and len(nova['ens'])==ens_ant and all(x['r']=='' and not x['f'] and x['o']=='' for x in nova['ens']))
    pg.evaluate("go('p-ap')");pg.click('#apPlano summary');pg.fill('#apPlTxt','qualquer coisa');pg.click('[data-a=plcria]')
    chk('código inválido: mensagem clara',"começa com ANQ1." in pg.inner_text('#apPlMsg'))
    falso=pg.evaluate("'ANQ1.'+pgEnc({anaquim:'plano',v:1,t:'Do professor',e:['pf-ign','nao-existe','pf-ign','fn-tollens']})")
    pg.fill('#apPlTxt',falso);pg.click('[data-a=plcria]');pg.wait_for_timeout(200)
    nv=pg.evaluate("apAtiva(apGet())")
    chk('ids desconhecidos e repetidos são descartados',nv['t']=='Do professor' and [x['id'] for x in nv['ens']]==['pf-ign','fn-tollens'])

    # recarregar: tudo continua
    pg.reload();pg.wait_for_timeout(400)
    chk('depois de recarregar, estrela continua marcada',pg.evaluate("apAtiva(apGet())!==null"))
    chk('sem erros de script',not erros)
    if erros:print(erros)
    b.close()
if falhas:
    print('\n'+str(len(falhas))+' falha(s)');sys.exit(1)
print('\nteste_aula: tudo certo')
