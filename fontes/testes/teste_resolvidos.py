import os,sys;os.makedirs('/tmp/analorg_teste',exist_ok=True)
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from playwright.sync_api import sync_playwright
from _nav import abrir
P='/tmp/analorg_teste/'
with sync_playwright() as p:
    b=abrir(p);pg=b.new_page(viewport={'width':390,'height':900})
    er=[];pg.on('pageerror',lambda e:er.append(str(e)))
    pg.goto('file:///home/claude/massas/index.html')
    pg.evaluate("go('p-rm')");pg.wait_for_timeout(200)
    pg.evaluate("rmPane('res')");pg.wait_for_timeout(200)
    n=pg.locator('#resBox details.sec').count();assert n==len(pg.evaluate("RES_BANCO")),n
    assert n==28,n
    # passo a passo
    d=pg.locator('#resBox details.sec').first;d.locator(':scope > summary').click()
    assert d.locator('.rstp:not([hidden])').count()==1
    d.locator('[data-rn]').click();assert d.locator('.rstp:not([hidden])').count()==2
    d.locator('[data-ra]').click();assert d.locator('.rstp[hidden]').count()==0
    assert d.locator('.rres').is_visible()
    # quiz do problema: erra de propósito, confere que entra na revisão
    d.locator('[data-rq]').click();pg.wait_for_timeout(100)
    pg.evaluate("localStorage.removeItem('massas-repq')")
    opts=d.locator('.rqz .optb')
    for i in range(opts.count()):
        pass
    pg.evaluate("(()=>{const q=RES_BANCO[0].q[0];qzRec({q:q.q,o:q.o,ok:q.ok,w:q.w},false)})()")
    assert pg.evaluate("Object.keys(JSON.parse(localStorage.getItem('massas-repq')||'{}')).length")==1
    # treino geral e filtros
    pg.click('[data-rg="57"]');assert pg.locator('#resBox details.sec').count()==8
    pg.click('#resTr');pg.wait_for_timeout(100)
    assert pg.locator('#resQuiz .optb').count()>=2
    pg.locator('#resQuiz .optb').first.click();assert pg.locator('#resQuiz .why').count()==1
    # contador 13C-D
    pg.fill('#cdN','3');t=pg.inner_text('#cdOut');assert '7 linhas' in t and '1 : 3 : 6 : 7 : 6 : 3 : 1' in t,t
    pg.fill('#cdN','2');t=pg.inner_text('#cdOut');assert '1 : 2 : 3 : 2 : 1' in t,t
    pg.select_option('#cdI','h');pg.fill('#cdN','3');t=pg.inner_text('#cdOut');assert '1 : 3 : 3 : 1' in t,t
    # todas as perguntas: 1 certa na posição 0 e sem opções repetidas
    bad=pg.evaluate("RES_BANCO.flatMap(x=>x.q).filter(q=>new Set(q.o).size!==q.o.length||q.ok!==0).length");assert bad==0,bad
    pg.screenshot(path=P+'res.png')
    print('erros',er);assert not er
    print('OK resolvidos')
