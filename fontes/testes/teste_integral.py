"""RMN > Integral: H de cada sinal a partir da fórmula e das integrais."""
import os,sys
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from playwright.sync_api import sync_playwright
from _nav import abrir
with sync_playwright() as p:
    b=abrir(p);pg=b.new_page(viewport={'width':390,'height':900});er=[];pg.on('pageerror',lambda e:er.append(str(e)))
    pg.goto('file:///home/claude/massas/index.html');pg.wait_for_timeout(1200)
    pg.evaluate("go('p-rm')");pg.evaluate("rmPane('integ')")
    pg.fill('#igF','C4H8O');pg.fill('#igT','2.45 20.3\n2.14 30.4\n1.06 30.0')
    t=pg.inner_text('#igOut');assert '8 H' in t,t
    hs=[c.inner_text() for c in pg.locator('#igOut tbody tr td:nth-child(4)').all()];assert hs==['2','3','3'],hs
    print('ok  C4H8O: 2, 3 e 3 H')
    pg.fill('#igF','');t=pg.inner_text('#igOut');assert 'proporção' in t.lower()
    pg.fill('#igF','C4H8O');pg.click('#igLeva');assert pg.input_value('#icHd')=='2.45 2.14 1.06' and pg.input_value('#icF')=='C4H8O'
    print('ok  leva δ e fórmula ao Identificar');assert not er,er;b.close()
