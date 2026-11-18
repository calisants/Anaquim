import os,sys;sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from playwright.sync_api import sync_playwright
from _nav import abrir
import random
random.seed(7)
errs=[];clicks=0
with sync_playwright() as p:
    b=abrir(p);pg=b.new_page(viewport={'width':360,'height':780})
    pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file:///home/claude/massas/index.html');pg.wait_for_timeout(500)
    screens=['p-in','p-cp','p-ic','p-en','p-pf','p-so','p-el','p-fu','p-sp','p-iv','p-an','p-tr','p-tb','p-te','p-rm','p-ob','p-rv','p-st','p-fo']
    for rodada in range(260):
        sc=random.choice(screens)
        pg.evaluate(f"go('{sc}')")
        if sc=='p-tr' and random.random()<.7:
            pg.evaluate("document.querySelectorAll('#trmode button')[%d].click()"%random.randrange(7))
        btns=pg.query_selector_all('button:visible, summary:visible, input[type=checkbox]:visible, .optb:visible')
        if not btns: continue
        for _ in range(random.randint(1,6)):
            btns=pg.query_selector_all('button:visible, summary:visible, input[type=checkbox]:visible')
            if not btns:break
            bt=random.choice(btns)
            try: bt.click(timeout=800,force=True);clicks+=1
            except Exception: pass
        if sc=='p-an':
            pg.evaluate("(()=>{const c=document.querySelectorAll('#p-an .chip');if(c.length)c[Math.floor(Math.random()*c.length)].click();})()")
    print('cliques:',clicks,'| erros de código:',len(errs));[print(e) for e in sorted(set(errs))[:8]]
