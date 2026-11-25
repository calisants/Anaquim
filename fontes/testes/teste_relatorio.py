"""Relatório (PDF) da Prova, do Leitor e do Ler PDF: abre a página, confere o layout comum com o do Identificar."""
import os,sys,subprocess,time,json
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from playwright.sync_api import sync_playwright
from _nav import abrir
aqui=os.path.dirname(os.path.abspath(__file__));raiz=os.path.abspath(aqui+'/../..');F=aqui+'/fixtures/'
srv=subprocess.Popen([sys.executable,'-m','http.server','8773','--directory',raiz],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL);time.sleep(1)
def abre(pg,sel):
    with pg.expect_popup() as pi:pg.click(sel)
    po=pi.value;po.wait_for_load_state();return po
def layout(po):
    # as mesmas peças do relatório do Identificar: faixa colorida no topo, rodapé e botão de imprimir
    assert po.locator('header .mk').count()==1 and po.locator('footer').count()==1 and po.locator('button.imp').count()==1
    assert 'anaquim.litteraria.com.br' in po.inner_text('footer')
    assert '—' not in po.inner_text('body')
try:
  with sync_playwright() as p:
    b=abrir(p);pg=b.new_page(viewport={'width':390,'height':900});er=[];pg.on('pageerror',lambda e:er.append(str(e)))
    pg.goto('http://localhost:8773/index.html');pg.wait_for_timeout(1500)
    # ---- Prova ¹H, com uma linha da tabela do caderno vinda de análise salva
    pg.evaluate("localStorage.setItem('anaquim-prova-analise-v1',JSON.stringify({'43A':{t:Date.now(),rows:{'0':{h:3,d:'1.26',g:'CH₃',m:'t',v:2,f:'CH₃ vizinho de CH₂'}},done:[],meas:[],ints:[],chain:Array.from({length:window.PROVA_EX[0].est.length},(_,i)=>i)}}))")
    pg.reload();pg.wait_for_timeout(1200)
    pg.evaluate("go('p-rm')");pg.click('[data-rp="prova"]');pg.wait_for_timeout(300)
    po=abre(pg,'#pv_arel');layout(po);t=po.text_content('body')
    assert 'Prova de RMN' in t and 'Sua tabela do caderno' in t and 'CH₃ vizinho de CH₂' in t and 'Estrutura montada' in t
    assert 'Espectro simulado' in t and 'Cada sinal ampliado' in t and po.locator('.zc').count()==5 and po.locator('.pc').count()>=3 and po.locator('.mol svg').count()==1
    assert po.locator('table.tb').count()>=1;po.close();print('ok  relatório da Prova ¹H')
    # ---- Prova ¹³C (Leitor em modo prova)
    pg.click('#pv_nc');pg.wait_for_timeout(400)
    po=abre(pg,'#pv_chost [data-lrel]');layout(po);t=po.text_content('body')
    assert 'Prova' in t and 'Sua tabela do caderno' in t and 'Nenhum sinal conferido' in t and po.locator('.zc').count()>=3;po.close();print('ok  relatório da Prova ¹³C')
    # ---- Leitor (explorar) ¹H e ¹³C
    pg.click('[data-rp="leitor"]');pg.wait_for_timeout(400)
    po=abre(pg,'#p-rm [data-rpane="leitor"] .lt-wrap [data-lrel] >> nth=1');layout(po);t=po.text_content('body')
    assert 'Leitor de espectros' in t and 'Passo a passo' in t and 'Sinais' in t and 'Fórmula' in t and po.locator('.zc').count()==3 and po.locator('.mol svg').count()==1 and po.locator('svg.sv').count()==1;po.close()
    pg.select_option('#lt_nuc','c');pg.wait_for_timeout(200)
    po=abre(pg,'#p-rm [data-rpane="leitor"] .lt-wrap [data-lrel] >> nth=1');layout(po);t=po.text_content('body')
    assert 'RMN de ¹³C' in t and 'Fora de ressonância' in t;po.close();print('ok  relatório do Leitor (¹H e ¹³C)')
    # ---- Ler PDF
    pg.click('[data-rp="pdf"]');pg.set_input_files('#spf-rmn',F+'sdbs_butanona_hnmr.pdf')
    pg.wait_for_function("document.querySelector('.sppdf[data-sp=\"rmn\"] [data-sp-msg]').textContent.indexOf('Lendo')<0",timeout=60000)
    po=abre(pg,'.sppdf[data-sp="rmn"] [data-sp-rel]');layout(po);t=po.text_content('body')
    assert 'sdbs_butanona_hnmr.pdf' in t and 'Sinais lidos' in t and 'não é integração' in t;po.close();print('ok  relatório do Ler PDF')
    assert not er,er
    b.close()
finally:
  srv.terminate()
print('ok relatório')
