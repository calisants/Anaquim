"""v241/v242: amostra por ensaio, reagente e tempo, resultado por amostra, fotos só no aparelho, PDF com tudo, link de sincronização."""
import sys,os,subprocess,re;sys.path.insert(0,os.path.dirname(__file__))
from playwright.sync_api import sync_playwright
from _nav import abrir
from PIL import Image
Image.new('RGB',(1200,900),(180,90,30)).save('/tmp/_f1.jpg',quality=85)
ok=True
def chk(n,c):
    global ok
    print(('ok  ' if c else 'FALHOU ')+n)
    if not c: ok=False
IND='file:///home/claude/massas/index.html'
with sync_playwright() as p:
    b=abrir(p,headless=True)
    c=b.new_context(user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148',viewport={'width':390,'height':844},accept_downloads=True)
    pg=c.new_page();erros=[];pg.on('pageerror',lambda e:erros.append(str(e)))
    pg.goto(IND);pg.wait_for_timeout(600)
    pg.evaluate("()=>{const d=apGet();const a=apNova(d);a.t='Teste';a.am='5A e B';['fn-tollens','pf-ign'].forEach(i=>a.ens.push({id:i,f:0,r:'',o:'',s:''}));apSave(d);}")
    pg.evaluate("go('p-ap')");pg.wait_for_timeout(400)
    it=pg.locator('#apLista details').first;it.locator('summary').click()
    it.locator('[data-a=rg]').fill('2 mL de Tollens');it.locator('[data-a=ha]').fill('2 min')
    it.locator('[data-a=sep]').click();pg.wait_for_timeout(200)
    it=pg.locator('#apLista details').first
    it.locator('[data-a=ps]').nth(0).fill('5A');it.locator('[data-a=ps]').nth(1).fill('B')
    it.locator('[data-a=pr][data-v=p]').nth(0).click();it.locator('[data-a=pr][data-v=n]').nth(1).click()
    pg.wait_for_timeout(600)
    d=pg.evaluate("apGet().l.find(a=>!a.del&&a.t==='Teste')")
    x=d['ens'][0]
    chk('reagente e tempo guardados',x.get('rg')=='2 mL de Tollens' and x.get('ha')=='2 min')
    chk('duas amostras, cada uma com o seu resultado',[q['s'] for q in x['pa']]==['5A','B'] and [q['r'] for q in x['pa']]==['p','n'] and x['r']=='')
    chk('etiqueta do ensaio resume as amostras',pg.locator('#apLista details').first.locator('.apbd-w').inner_text().lower().find('amostras')>=0)
    it.locator('[data-a=pdel]').nth(1).click();pg.wait_for_timeout(300)
    x=pg.evaluate("apGet().l.find(a=>!a.del&&a.t==='Teste').ens[0]")
    chk('ficar com 1 amostra volta ao modo simples',('pa' not in x) and x['s']=='5A' and x['r']=='p')
    pg.locator('#apLista details').first.locator('input[data-a=fil]').set_input_files('/tmp/_f1.jpg');pg.wait_for_timeout(1200)
    x=pg.evaluate("apGet().l.find(a=>!a.del&&a.t==='Teste').ens[0]")
    chk('foto guardada com id e na chave local',len(x.get('ft',[]))==1 and pg.evaluate("Object.keys(JSON.parse(localStorage.getItem('anaquim-fotos')||'{}')).length")==1)
    chk('foto fora das chaves que sincronizam e exportam',pg.evaluate("Object.keys(localStorage).filter(k=>k.indexOf('massas-')===0&&localStorage[k].indexOf('data:image')>=0).length")==0)
    pg.click('[data-a=rel]');pg.wait_for_timeout(300)
    with pg.expect_download() as dl: pg.click('[data-a=imprime]')
    dl.value.save_as('/tmp/_r.pdf')
    txt=subprocess.run(['pdftotext','-layout','/tmp/_r.pdf','-'],capture_output=True,text=True).stdout
    imgs=subprocess.run(['pdfimages','-list','/tmp/_r.pdf'],capture_output=True,text=True).stdout
    chk('PDF traz reagente, tempo e amostra','Reagente: 2 mL de Tollens' in txt and 'Tempo: 2 min' in txt and '5A' in txt)
    chk('PDF traz a foto','jpeg' in imgs)
    pg.locator('#apLista details').first.locator('[data-a=fdel]').click();pg.wait_for_timeout(300)
    chk('tirar a foto limpa a chave local',pg.evaluate("Object.keys(JSON.parse(localStorage.getItem('anaquim-fotos')||'{}')).length")==0)
    # link de sincronização
    p2=c.new_page();p2.on('pageerror',lambda e:erros.append(str(e)))
    p2.goto(IND+'#/sy/3a0j-4zbg-c558');p2.wait_for_timeout(800)
    chk('link abre a tela de sincronização com o código preenchido',p2.evaluate("CUR")=='p-sy' and p2.input_value('#syCod')=='3A0J-4ZBG-C558')
    chk('o código sai do endereço',('3a0j' not in p2.evaluate('location.href').lower()))
    chk('sem erros de código',not erros)
    b.close()
print('\nTudo passou.' if ok else '\n'+'falhas')
sys.exit(0 if ok else 1)
