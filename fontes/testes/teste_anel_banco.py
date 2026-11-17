"""Padrão do anel para compostos do banco sem H (hexaclorobenzeno etc.) e benzeno."""
import os,sys
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from playwright.sync_api import sync_playwright
from _nav import abrir
with sync_playwright() as p:
    b=abrir(p);pg=b.new_page(viewport={'width':390,'height':900});er=[];pg.on('pageerror',lambda e:er.append(str(e)))
    pg.goto('file:///home/claude/massas/index.html');pg.wait_for_timeout(1500)
    r=pg.evaluate("""()=>{const o={};bdAll().forEach(c=>{o[c.n.toUpperCase()]=ringPat(c)===null&&/mais de um anel isolado/.test(JSON.stringify(c.ot||[]))?'multi':ringPat(c)});return o}""")
    esp={'HEXACLOROBENZENO':'t4','HEXACLOROETANO':'nenhum','PENTACLORONITROBENZENO':'t4','DISSULFETO DE CARBONO':'nenhum'}
    for n,v in esp.items():assert r.get(n)==v,(n,r.get(n),v)
    nulos=[n for n,v in r.items() if v is None];assert not nulos,nulos[:5]
    assert sum(v=='multi' for v in r.values())>20,'compostos com dois anéis isolados deveriam ficar sem etiqueta'
    print('ok  anel do banco:',len(r),'compostos, nenhum sem dado');assert not er,er;b.close()
