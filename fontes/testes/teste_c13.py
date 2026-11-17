import os,sys;os.makedirs('/tmp/analorg_teste',exist_ok=True)
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from playwright.sync_api import sync_playwright
from _nav import abrir
with sync_playwright() as p:
    b=abrir(p);pg=b.new_page(viewport={'width':390,'height':900})
    er=[];pg.on('pageerror',lambda e:er.append(str(e)))
    pg.goto('file:///home/claude/massas/index.html')
    pg.evaluate("go('p-rm')");pg.wait_for_timeout(200)
    pg.click('[data-rp="tab"]');pg.wait_for_timeout(300)
    n=pg.locator('#c13Box > details.sec').count();assert n>=18,n
    pg.evaluate("document.querySelectorAll('#c13Box details').forEach(d=>d.open=true)")
    assert pg.locator('#c13Box .fonte, #c13Box .srcl').count()>=18
    t=lambda i:pg.inner_text(i)
    assert '11,3' in t('#c13out'),t('#c13out')
    assert '75,7' in t('#c3out'),t('#c3out')
    assert '142,7' in t('#ckout'),t('#ckout')
    def aro(x,y,pos):
        pg.select_option('#arX',label=x);pg.select_option('#arY',label=y);pg.select_option('#arP',pos);return t('#arOut')
    o=aro('CH₃','NO₂','4');assert '145,2' in o and '143,8' in o and '130,1' in o and '123,1' in o,o
    o=aro('CH₂OH','OCH₃','4');assert '159,5' in o and '134,1' in o and '128,7' in o and '113,5' in o,o
    o=aro('NHCOCH₃','nenhum','4');assert '139,6' in o and '118,6' in o and '128,7' in o and '122,9' in o,o
    pg.select_option('#c3y',label='NH₂');pg.select_option('#c3t',value='t');pg.fill('#c3b','13.4')
    assert '42,4' in t('#c3out'),t('#c3out')
    pg.select_option('#c3y',label='NO₂');pg.select_option('#c3p',value='g')
    assert 'não traz' in t('#c3out')
    assert not er,er
    print('c13 ok');b.close()
