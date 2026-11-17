"""RMN em PDF no Identificar (¹H e ¹³C) e leitura de PDF nas páginas IV, Massas e RMN de Espectros.
Os valores de referência são os do SDBS que já estão no app (compostos_sdbs.py): 2-butanona e anilina."""
import os,sys,subprocess,time
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from playwright.sync_api import sync_playwright
from _nav import abrir
aqui=os.path.dirname(os.path.abspath(__file__));raiz=os.path.abspath(aqui+'/../..')
F=aqui+'/fixtures/'
srv=subprocess.Popen([sys.executable,'-m','http.server','8772','--directory',raiz],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL);time.sleep(1)
def espera(pg,sel):
    pg.wait_for_function("document.querySelector('%s').textContent.indexOf('Lendo')<0"%sel,timeout=60000)
def nums(s):return [float(x) for x in s.split()]
def perto(lido,ref,tol,nome):
    assert len(lido)==len(ref),(nome,'quantidade',lido,ref)
    for a,b in zip(sorted(lido,reverse=True),sorted(ref,reverse=True)):assert abs(a-b)<=tol,(nome,lido,ref)
try:
  with sync_playwright() as p:
    b=abrir(p);pg=b.new_page(viewport={'width':390,'height':900});er=[];pg.on('pageerror',lambda e:er.append(str(e)))
    pg.goto('http://localhost:8772/index.html');pg.wait_for_timeout(1500)
    pg.evaluate("go('p-ic')");pg.evaluate("document.getElementById('icMais').open=true")
    # ---- Identificar: 1H e 13C da 2-butanona
    pg.set_input_files('#icHFile',F+'sdbs_butanona_hnmr.pdf');espera(pg,'#icHMsg')
    perto(nums(pg.input_value('#icHd')),[2.449,2.139,1.058],0.03,'1H butanona');print('ok  Identificar, 1H da 2-butanona:',pg.input_value('#icHd'))
    assert pg.input_value('#icH')=='','o nº de sinais de 1H não deve ser preenchido'
    pg.set_input_files('#icCFile',F+'sdbs_butanona_cnmr.pdf');espera(pg,'#icCMsg')
    perto(nums(pg.input_value('#icCd')),[209.28,36.87,29.43,7.87],0.5,'13C butanona');assert pg.input_value('#icC')=='4'
    print('ok  Identificar, 13C da 2-butanona:',pg.input_value('#icCd'))
    pg.wait_for_timeout(600)
    cards=[pg.inner_text('#icOut .icr >> nth=%d'%i).lower() for i in range(3)]
    assert any('butanona' in c and '3 de 3 batem' in c and 'δ de ¹³c' in c for c in cards),cards;print('ok  a 2-butanona entra no topo do ranking, batendo 3 de 3 dados de RMN')
    # ---- ¹³C posto no campo de ¹H: o app troca sozinho
    pg.evaluate("for(const i of ['icHd','icCd','icC']){const e=document.getElementById(i);e.value='';e.dispatchEvent(new Event('input',{bubbles:true}))}")
    pg.set_input_files('#icHFile',F+'sdbs_anilina_cnmr.pdf');espera(pg,'#icHMsg')
    perto(nums(pg.input_value('#icCd')),[146.51,129.26,118.39,115.07],0.5,'13C anilina (campo trocado)')
    assert pg.input_value('#icHd')=='' and 'de ¹³C' in pg.inner_text('#icHMsg');print('ok  PDF de 13C no campo de 1H: o app detecta e preenche o de 13C')
    pg.set_input_files('#icHFile',F+'sdbs_anilina_hnmr.pdf');espera(pg,'#icHMsg')
    perto(nums(pg.input_value('#icHd')),[7.12,6.685,3.55],0.06,'1H anilina');print('ok  Identificar, 1H da anilina:',pg.input_value('#icHd'))
    # ---- Espectros > RMN
    pg.evaluate("go('p-rm')");pg.click('#p-rm [data-rp="pdf"]')
    pg.set_input_files('#spf-rmn',F+'sdbs_butanona_cnmr.pdf');espera(pg,'.sppdf[data-sp="rmn"] [data-sp-msg]')
    assert pg.locator('.sppdf[data-sp="rmn"] table tbody tr').count()==4
    t=pg.inner_text('.sppdf[data-sp="rmn"] [data-sp-out]');assert 'C=O de cetona' in t and 'não é integração' in t
    pg.click('.sppdf[data-sp="rmn"] [data-sp-go="rmn"]');assert pg.is_visible('#p-ic') and pg.input_value('#icC')=='4';print('ok  Espectros > RMN: lê, mostra a tabela e leva ao Identificar')
    # ---- Espectros > IV
    pg.evaluate("go('p-iv')");pg.click('#p-iv [data-v="v-pdf"]')
    pg.set_input_files('#spf-iv',F+'sdbs_anilina_ir.pdf');espera(pg,'.sppdf[data-sp="iv"] [data-sp-msg]')
    t=pg.inner_text('.sppdf[data-sp="iv"] [data-sp-out]');assert pg.locator('.sppdf[data-sp="iv"] table tbody tr').count()>=5
    pg.click('.sppdf[data-sp="iv"] [data-sp-go="iv"]');v=[int(x) for x in pg.input_value('#icIV').replace('l','').split()]
    assert any(abs(x-3384)<=15 for x in v),v;print('ok  Espectros > IV: lê, mostra a tabela e leva ao Identificar (',len(v),'bandas )')
    # ---- Espectros > Massas
    pg.evaluate("go('p-an')");pg.evaluate("document.querySelectorAll('#p-an details.sec').forEach(d=>d.open=true)")
    pg.set_input_files('#spf-ms',F+'sdbs_anilina_ms.pdf');espera(pg,'.sppdf[data-sp="ms"] [data-sp-msg]')
    assert pg.locator('.sppdf[data-sp="ms"] table tbody tr').count()>=4
    pg.click('.sppdf[data-sp="ms"] [data-sp-go="msan"]');pg.wait_for_timeout(400)
    assert pg.input_value('#inM')=='93' and '94' not in pg.input_value('#inP') and pg.is_visible('#an-res');print('ok  Espectros > Massas: lê, mostra a tabela e abre a análise (M =',pg.input_value('#inM'),')')
    # arquivo que não é espectro: mensagem de erro, sem quebrar
    pg.evaluate("go('p-rm')");pg.click('#p-rm [data-rp="pdf"]')
    pg.set_input_files('#spf-rmn',F+'iv_rotulos_5A.pdf');espera(pg,'.sppdf[data-sp="rmn"] [data-sp-msg]')
    m=pg.inner_text('.sppdf[data-sp="rmn"] [data-sp-msg]');print('ok  PDF que não é de RMN:',m[:80]);assert 'Lendo' not in m
    assert not er,er;print('ok  sem erros de código')
    b.close()
finally:srv.terminate()
