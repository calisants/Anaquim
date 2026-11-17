"""Sincronização entre aparelhos, contra um servidor de mentira (testes/servidor_falso.js) que imita as funções do Supabase.
Dois ou três "aparelhos" = três contextos do navegador, cada um com o seu armazenamento."""
import re as _re
import sys,os,json,re,subprocess,time,urllib.request;sys.path.insert(0,os.path.dirname(__file__))
from playwright.sync_api import sync_playwright
from _nav import abrir
PORTA=8791
AQUI=os.path.dirname(os.path.abspath(__file__))
html=open('/home/claude/massas/index.html',encoding='utf-8').read()
assert _re.search(r"let SY_URL='[^']*';",html) and _re.search(r"let SY_ANON='[^']*';",html)
cfg=_re.sub(r"let SY_URL='[^']*';","let SY_URL='http://127.0.0.1:%d';"%PORTA,html,count=1)
cfg=_re.sub(r"let SY_ANON='[^']*';","let SY_ANON='chave-de-teste';",cfg,count=1)
open('/tmp/anaquim_teste_sync.html','w',encoding='utf-8').write(cfg)
open('/tmp/anaquim_teste_sync_off.html','w',encoding='utf-8').write(
    _re.sub(r"let SY_ANON='[^']*';","let SY_ANON='';",_re.sub(r"let SY_URL='[^']*';","let SY_URL='';",html,count=1),count=1))
URL='file:///tmp/anaquim_teste_sync.html'
srv=subprocess.Popen(['node',os.path.join(AQUI,'servidor_falso.js'),str(PORTA)],stdout=subprocess.PIPE,text=True)
srv.stdout.readline()
def api(c):return json.loads(urllib.request.urlopen('http://127.0.0.1:%d/__%s'%(PORTA,c)).read() or b'null')
falhas=[]
def chk(nome,ok):
    print(('ok  ' if ok else 'FALHOU ')+nome)
    if not ok:falhas.append(nome)
try:
  with sync_playwright() as p:
    b=abrir(p)
    erros=[]
    def novo(url=URL):
        ctx=b.new_context(viewport={'width':390,'height':780});pg=ctx.new_page()
        pg.on('pageerror',lambda e:erros.append(str(e)))
        pg.goto(url);pg.wait_for_timeout(500);return pg
    def ls(pg,k):return pg.evaluate("(k)=>JSON.parse(localStorage.getItem(k)||'null')",k)

    # 0) sem configuração: item do menu escondido e tela explica
    off=novo('file:///tmp/anaquim_teste_sync_off.html')
    off.evaluate("go('p-sy')");chk('tela mostra que ainda não está ligada','ainda não está ligada' in off.inner_text('#syBox'))
    off.context.close()

    A=novo();B=novo()
    A.evaluate("go('p-sy')");chk('com servidor configurado a tela de Ajustes mostra criar código',A.query_selector('[data-sy=cria]') is not None)

    # 1) A cria dados e o código
    A.evaluate("""()=>{const d=apGet();const a=apNova(d,'Aula do A');a.ens.push({id:'pf-ign',f:1,r:'p',o:'chama amarela segredo123'});apSave(d);
      LS.set('massas-stud',['ex1','ex2']);LS.set('massas-nota-1-0','nota privada do A');}""")
    A.evaluate("go('p-sy')");A.click('[data-sy=cria]');A.wait_for_timeout(1500)
    cod=A.evaluate('SYE.cod')
    chk('código no formato XXXX-XXXX-XXXX '+cod,bool(re.fullmatch(r'[0-9A-HJKMNP-TV-Z]{4}(-[0-9A-HJKMNP-TV-Z]{4}){2}',cod)))
    dump=api('dump')
    chk('servidor guarda uma linha só',len(dump)==1 and dump[0]['rev']>=1)
    chk('o id no servidor é um SHA-256 (64 hex), não o código',bool(re.fullmatch(r'[0-9a-f]{64}',dump[0]['id'])) and cod.replace('-','') not in json.dumps(dump))
    txt=json.dumps(dump)
    chk('o servidor não enxerga o texto (cifrado)','segredo123' not in txt and 'Aula do A' not in txt and 'nota privada' not in txt and 'pf-ign' not in txt)
    chk('tela mostra o código mascarado por padrão e liberado depois de criar',cod in A.inner_text('#syBox') or '••••' in A.inner_text('#syBox'))
    chk('logo depois de criar, o código aparece para anotar',cod in A.inner_text('#syBox'))
    A.click('[data-sy=mostra]');chk('Esconder código mascara',cod not in A.inner_text('#syBox') and '••••' in A.inner_text('#syBox'))
    A.click('[data-sy=mostra]');chk('Mostrar código revela',cod in A.inner_text('#syBox'))
    A.click('[data-sy=mostra]')

    # 2) B conecta com o código (minúsculas, sem hífen, com O no lugar do zero: o app normaliza)
    B.evaluate("go('p-sy')")
    B.fill('#syCod',cod.replace('-','').lower());B.click('[data-sy=conecta]');B.wait_for_timeout(1800)
    chk('B ficou ligado',B.evaluate('!!SYE.cod'))
    chk('B recebeu as aulas de A',B.evaluate("apVivas(apGet()).map(a=>a.t)")==['Aula do A'])
    chk('B recebeu os estudados e a nota',ls(B,'massas-stud')==['ex1','ex2'] and ls(B,'massas-nota-1-0')=='nota privada do A')
    chk('B recebeu o resultado do ensaio',B.evaluate("apGet().l[0].ens[0].o")=='chama amarela segredo123')

    # 3) B altera; A pega ao sincronizar
    B.evaluate("""()=>{const d=apGet();d.l[0].t='Aula do A (editada no B)';d.l[0].up=syAgora();apSave(d);LS.set('massas-stud',['ex1','ex2','ex3']);}""")
    B.evaluate('syRodar()');B.wait_for_timeout(1200)
    A.evaluate('syRodar()');A.wait_for_timeout(1200)
    chk('A viu o título editado no B',A.evaluate("apVivas(apGet())[0].t")=='Aula do A (editada no B)')
    chk('A viu o novo estudado',ls(A,'massas-stud')==['ex1','ex2','ex3'])

    # 4) desmarcar também sincroniza (não volta sozinho)
    A.evaluate("LS.set('massas-stud',['ex1','ex3'])");A.evaluate('syRodar()');A.wait_for_timeout(1000)
    B.evaluate('syRodar()');B.wait_for_timeout(1000)
    chk('desmarcar em A some em B',ls(B,'massas-stud')==['ex1','ex3'])
    B.evaluate('syRodar()');B.wait_for_timeout(800)
    A.evaluate('syRodar()');A.wait_for_timeout(800)
    chk('e não volta depois',ls(A,'massas-stud')==['ex1','ex3'] and ls(B,'massas-stud')==['ex1','ex3'])

    # 5) excluir aula propaga
    A.evaluate("""()=>{const d=apGet();const a=apNova(d,'Aula que vai sumir');apSave(d);}""");A.evaluate('syRodar()');A.wait_for_timeout(1000)
    B.evaluate('syRodar()');B.wait_for_timeout(1000)
    chk('aula nova chegou em B',B.evaluate("apVivas(apGet()).length")==2)
    B.evaluate("""()=>{const d=apGet();const i=d.l.findIndex(x=>x.t==='Aula que vai sumir');d.l[i]={id:d.l[i].id,del:syAgora(),up:syAgora()};apSave(d);}""")
    B.evaluate('syRodar()');B.wait_for_timeout(1000);A.evaluate('syRodar()');A.wait_for_timeout(1000)
    chk('exclusão em B chegou em A',A.evaluate("apVivas(apGet()).map(a=>a.t)")==['Aula do A (editada no B)'])

    # 6) sincroniza sozinho, sem apertar botão, alguns segundos depois de alterar
    rev0=api('dump')[0]['rev']
    A.evaluate("LS.set('massas-nota-2-0','escrito sem apertar nada')");A.wait_for_timeout(6500)
    chk('sincronização automática depois de alterar',api('dump')[0]['rev']>rev0)

    # 7) servidor com problema (5xx) e depois sem internet de verdade: salva no aparelho e sincroniza depois
    api('offline')
    A.evaluate("LS.set('massas-nota-3-0','escrito com servidor fora do ar')");A.evaluate('syRodar()');A.wait_for_timeout(1200)
    chk('servidor fora: erro "falha", dado segue no aparelho',A.evaluate('SYE.erro')=='falha' and ls(A,'massas-nota-3-0')=='escrito com servidor fora do ar')
    api('online')
    A.context.set_offline(True)
    A.evaluate("LS.set('massas-nota-3-0','escrito sem internet')");A.evaluate('syRodar()');A.wait_for_timeout(1200)
    chk('sem internet: erro "offline", dado segue no aparelho',A.evaluate('SYE.erro')=='offline' and ls(A,'massas-nota-3-0')=='escrito sem internet')
    A.evaluate("go('p-sy')");chk('sem internet: tela explica sem alarme','Sem internet agora' in A.inner_text('#syStatus') and 'salvo neste aparelho' in A.inner_text('#syStatus').replace('Tudo está salvo','salvo'))
    A.context.set_offline(False);A.evaluate('syRodar()');A.wait_for_timeout(1500)
    chk('volta a internet: sincroniza e limpa o erro',A.evaluate('SYE.erro')=='')
    B.evaluate('syRodar()');B.wait_for_timeout(1000)
    chk('B recebeu o que A escreveu offline',ls(B,'massas-nota-3-0')=='escrito sem internet')

    # 8) conflito: os dois mexem sem sincronizar, depois sincronizam
    A.evaluate("""()=>{const d=apGet();const a=apNova(d,'Só no A');apSave(d);LS.set('massas-stud',['ex1','ex3','exA']);}""")
    B.evaluate("""()=>{const d=apGet();const a=apNova(d,'Só no B');apSave(d);}""")
    A.evaluate('syRodar()');B.evaluate('syRodar()');A.wait_for_timeout(2500)
    A.evaluate('syRodar()');B.evaluate('syRodar()');A.wait_for_timeout(2500)
    ta=sorted(A.evaluate("apVivas(apGet()).map(a=>a.t)"));tb=sorted(B.evaluate("apVivas(apGet()).map(a=>a.t)"))
    chk('conflito: aulas dos dois aparelhos foram juntadas '+str(ta),ta==tb and 'Só no A' in ta and 'Só no B' in ta)
    chk('conflito: estudados iguais nos dois',ls(A,'massas-stud')==ls(B,'massas-stud'))

    # 9) terceiro aparelho com dados próprios: a primeira ligação JUNTA, não apaga nada
    C=novo()
    C.evaluate("""()=>{LS.set('massas-stud',['exC']);LS.set('massas-nota-9-9','nota só do C');const d=apGet();apNova(d,'Aula do C');apSave(d);}""")
    C.evaluate("go('p-sy')");C.fill('#syCod',cod);C.click('[data-sy=conecta]');C.wait_for_timeout(2500)
    sc=ls(C,'massas-stud')
    chk('C manteve o que tinha e recebeu o resto',set(['exC','ex1','ex3'])<=set(sc))
    chk('C manteve a nota própria e recebeu a de A',ls(C,'massas-nota-9-9')=='nota só do C' and ls(C,'massas-nota-3-0')=='escrito sem internet')
    chk('C tem as aulas dele e as dos outros','Aula do C' in C.evaluate("apVivas(apGet()).map(a=>a.t)") and 'Só no A' in C.evaluate("apVivas(apGet()).map(a=>a.t)"))
    A.evaluate('syRodar()');A.wait_for_timeout(1500)
    chk('o que o C tinha chegou em A',ls(A,'massas-nota-9-9')=='nota só do C' and 'exC' in ls(A,'massas-stud'))

    # 10) dados que não devem viajar
    A.evaluate("localStorage.setItem('massas-zoom','1.4');localStorage.setItem('massas-pal','verde')");A.evaluate('syRodar()');A.wait_for_timeout(800)
    chave=A.evaluate("Object.keys(syColeta().d)")
    chk('zoom, cor e sessão ficam só no aparelho',not any(k in chave for k in ['massas-zoom','massas-pal','massas-sessao','massas-revdia']))

    # 11) código errado e código inexistente
    D=novo();D.evaluate("go('p-sy')")
    D.fill('#syCod','ABCD-1234');D.click('[data-sy=conecta]');D.wait_for_timeout(500)
    chk('código curto: mensagem clara',not D.evaluate('!!SYE.cod') and '12 letras e números' in D.inner_text('#syErro'))
    D.fill('#syCod','2222-2222-2222');D.click('[data-sy=conecta]');D.wait_for_timeout(1000)
    chk('código que não existe: não liga e avisa',not D.evaluate('!!SYE.cod') and 'Não achei esse código' in D.inner_text('#syErro'))
    D.context.close()

    # 12) dados corrompidos na nuvem (chave errada): avisa, não apaga nada local
    dump=api('dump')
    E=novo();E.evaluate("go('p-sy')")
    E.evaluate("""async()=>{SYE={cod:'2222-2222-2222',rev:0,meta:{},primeira:false};
       const id=await syId('2222-2222-2222');
       const lixo=await syCifra('3333-3333-3333-3333',{v:1,d:{}});
       await syRpc('anaquim_gravar',{p_id:id,p_data:{c:lixo},p_rev:0});}""")
    E.evaluate("LS.set('massas-stud',['meu'])");E.evaluate('syRodar()');E.wait_for_timeout(1500)
    chk('chave errada: erro de cifra e nada local foi perdido',E.evaluate('SYE.erro')=='cifra' and ls(E,'massas-stud')==['meu'])
    E.context.close()

    # 13) apagar a cópia da nuvem: some do servidor, aparelho desliga, dados locais ficam
    n0=len(api('dump'))
    A.evaluate("go('p-sy')");A.click('[data-sy=apaga]');chk('apagar pede confirmação (não apagou no primeiro toque)',len(api('dump'))==n0)
    A.click('[data-sy=apaga]');A.wait_for_timeout(1200)
    chk('cópia apagada do servidor',len(api('dump'))==n0-1)
    chk('aparelho desligou mas manteve os dados',not A.evaluate('!!SYE.cod') and len(ls(A,'massas-stud'))>=2)
    chk('tela voltou ao estado de criar/conectar',A.query_selector('[data-sy=cria]') is not None)

    # 14) recarregar com ligação ativa sincroniza sozinho ao abrir
    B.reload();B.wait_for_timeout(3500)
    chk('depois de recarregar, B continua ligado',B.evaluate('!!SYE.cod'))

    chk('sem erros de script',not erros)
    if erros:print(erros[:5])
    b.close()
finally:
  srv.terminate()
if falhas:
    print('\n'+str(len(falhas))+' falha(s)');sys.exit(1)
print('\nteste_sync: tudo certo')
