import os,sys;os.makedirs('/tmp/analorg_teste',exist_ok=True)
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from playwright.sync_api import sync_playwright
from _nav import abrir
RAIZ=os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))
with sync_playwright() as p:
    b=abrir(p);pg=b.new_page(viewport={'width':390,'height':900})
    er=[];pg.on('pageerror',lambda e:er.append(str(e)))
    pg.goto('file://'+RAIZ+'/index.html')
    pg.evaluate("go('p-rm')");pg.wait_for_timeout(200)
    pg.click('[data-rp="leitor"]');pg.wait_for_timeout(300)
    # 1H: 6 exemplos + 8 do 4.3
    assert pg.locator('#lt_exsel option').count()==15
    # picos do overview e clique
    assert pg.locator('#lt_ov rect[data-i]').count()==3
    pg.click('#lt_chips [data-i="0"]');assert 'Significado do sinal A' in pg.inner_text('#lt_pt')
    assert 'quarteto' in pg.inner_text('#lt_panel')
    # zoom mostra 4 linhas numeradas (quarteto)
    assert pg.locator('#lt_zoom text').filter(has_text='4').count()>=1
    # passos
    pg.click('#lt_allsteps');assert pg.locator('#lt_steps li').count()==7
    assert pg.locator('#lt_struct .lgrp').count()==3
    # 4.3 usa os passos de Praticar
    pg.select_option('#lt_exsel','7');pg.click('#lt_allsteps')
    assert pg.locator('#lt_steps li').count()>=4
    # 13C
    assert pg.locator('#lt_prova').count()==0
    pg.select_option('#lt_nuc','c');pg.wait_for_timeout(100)
    assert pg.locator('#lt_exsel option').count()==11
    assert pg.is_disabled('#lt_integral')
    pg.select_option('#lt_exsel','3')  # 5.7 A
    assert pg.locator('#lt_ov rect[data-i]').count()==4
    pg.click('#lt_allsteps');assert pg.locator('#lt_steps li').count()>=4
    # aba Prova em 13C: o mesmo leitor, em modo prova
    pg.click('[data-rp="prova"]');pg.wait_for_timeout(200);pg.click('#pv_nc');pg.wait_for_timeout(200)
    assert pg.locator('#pv_chost #lt_exsel').count()==1 and pg.locator('[data-rpane="leitor"] #lt_exsel').count()==0
    assert pg.is_hidden('#lt_nuc')
    assert pg.locator('#lt_exsel option').count()==11
    pg.select_option('#lt_exsel','3');pg.click('#lt_chips [data-i="0"]')
    assert '211' not in pg.inner_text('#lt_chips')
    pg.fill('#lt_fd','212');pg.select_option('#lt_fcat','cet');pg.select_option('#lt_fm','s');pg.fill('#lt_fh','0');pg.fill('#lt_fn','1');pg.select_option('#lt_fg','0')
    pg.click('#lt_check');assert pg.locator('#lt_fb .lbad').count()==0,pg.inner_text('#lt_fb')
    assert pg.locator('#lt_tab tbody tr').count()==1 and 'Grupo certo' in pg.inner_text('#lt_fb')
    pg.fill('#lt_fn','2');pg.click('#lt_check');assert pg.locator('#lt_fb .lbad').count()==1
    pg.select_option('#lt_fg','2');pg.fill('#lt_fn','1');pg.click('#lt_check');assert pg.locator('#lt_fb .lbad').count()==1
    pg.click('#pv_nh');assert pg.is_visible('#pv_exsel')
    # voltar ao Leitor: volta o modo de estudo, ¹H
    pg.click('[data-rp="leitor"]');pg.wait_for_timeout(200)
    assert pg.locator('[data-rpane="leitor"] #lt_exsel').count()==1 and pg.is_visible('#lt_nuc')
    assert pg.locator('#lt_chips button').count()>0
    # 13C do acetato: 4 sinais, nenhum equivalente (n=1)
    pg.select_option('#lt_nuc','c');pg.select_option('#lt_exsel','0')
    assert 'nenhum equivalente' in pg.inner_text('#lt_tbl')
    t=pg.evaluate("document.querySelector('.lt').innerText")
    assert '—' not in t and 'escrito por mim' not in t
    assert not er,er
    print('leitor ok')
