import os,sys;os.makedirs('/tmp/analorg_teste',exist_ok=True)
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from playwright.sync_api import sync_playwright
from _nav import abrir
RAIZ=os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))
with sync_playwright() as p:
    b=abrir(p);pg=b.new_page(viewport={'width':390,'height':900})
    er=[];pg.on('pageerror',lambda e:er.append(str(e)))
    pg.goto('file://'+RAIZ+'/index.html')
    pg.evaluate("localStorage.removeItem('anaquim-guia-v1')")
    pg.evaluate("go('p-rm')");pg.wait_for_timeout(200)
    pg.click('[data-rp="guia"]');pg.wait_for_timeout(300)
    assert pg.locator('.gd .gfolha').count()==16
    assert pg.locator('.gd nav.gidx button').count()==16
    assert pg.locator('.gd .gparte').count()==3
    assert '0 de 16' in pg.inner_text('#gd_prog')
    # toda folha tem fontes com selo
    assert pg.locator('.gd .gfolha .gfonte .gselo').count()>=16
    # barras de multiplicidade geradas
    assert pg.locator('#gd_f4 svg').count()==1
    assert pg.locator('#gd_f4 svg line').count()==sum(range(1,8))
    # treino: 8 exercícios com resolução recolhida
    assert pg.locator('#gd_f16 details').count()==8
    # marcar folha e persistir
    pg.check('input[data-gf="3"]');assert '1 de 16' in pg.inner_text('#gd_prog')
    assert pg.evaluate("document.getElementById('gd_f3').classList.contains('gdone')")
    pg.reload();pg.evaluate("go('p-rm')");pg.wait_for_timeout(200);pg.click('[data-rp="guia"]');pg.wait_for_timeout(300)
    assert '1 de 16' in pg.inner_text('#gd_prog')
    # texto sem travessão e sem a frase proibida
    t=pg.evaluate("document.querySelector('.gd').innerText")
    assert '—' not in t and 'escrito por mim' not in t
    # outras abas continuam abrindo
    pg.click('[data-rp="prova"]');pg.wait_for_timeout(200)
    assert pg.locator('[data-rpane="guia"]').evaluate("e=>e.hidden")
    assert not er,er
    print('guia ok')
