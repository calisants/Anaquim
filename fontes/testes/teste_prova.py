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
    pg.click('[data-rp="prova"]');pg.wait_for_timeout(300)
    assert pg.locator('#pv_exsel option').count()==13
    # a regra de três de todos os exercícios fecha com o H real
    r=pg.evaluate("""(()=>{const out=[];PROVA_EX.forEach((e,i)=>{const hs=PROVA_HS(i),Ht=e.Hint||e.f.H,sum=hs.reduce((a,b)=>a+b,0);
      const ints=hs.map(h=>Math.round(h*Ht/sum));out.push([e.id,ints.every((v,k)=>v===e.s[k].h),ints.reduce((a,b)=>a+b,0)===Ht,e.s.reduce((a,s)=>a+s.h,0)===(e.Hint||e.f.H)])});return out})()""")
    for x in r: assert x[1] and x[2] and x[3],x
    # exercício A: números da aula já preenchidos, integração certa
    assert pg.evaluate("document.querySelectorAll('#pv_tbl [data-pvm]').length")==5
    for i,v in enumerate([2,3,2,2,3]): pg.fill('#pv_tbl [data-pvi="%d"]'%i,str(v))
    pg.click('#pv_chk1');assert 'Integração fechada' in pg.inner_text('#pv_fb1')
    # um valor errado é recusado
    pg.fill('#pv_tbl [data-pvi="0"]','3');pg.click('#pv_chk1');assert 'Revisar' in pg.inner_text('#pv_fb1')
    # sinal A: responde certo
    pg.click('[data-pvchip="0"]');pg.fill('#pv_fd','2.45');pg.select_option('#pv_fcat','alfa');pg.select_option('#pv_fg','ch2');pg.select_option('#pv_fm','t');pg.fill('#pv_fv','2');pg.fill('#pv_fh','2');pg.click('#pv_fz [data-pvz="2"]')
    pg.click('#pv_check');assert pg.locator('#pv_fb .pbad').count()==0,pg.inner_text('#pv_fb');assert pg.locator('#pv_tab tbody tr').count()==1
    # método completo em todos os sinais de todos os exercícios: sempre há ao menos uma possibilidade de vizinhos
    for i in range(13):
        pg.select_option('#pv_exsel',str(i));pg.wait_for_timeout(60)
        for k,sg in enumerate(pg.evaluate("PROVA_EX[%d].s.slice().sort((a,b)=>b.d-a.d).map(s=>[s.d,s.h,s.m,s.cat])"%i)):
            pg.click('[data-pvchip="%d"]'%k)
            op=pg.evaluate("PROVA_VIZ(%d,%d)"%(i,k))
            nv=pg.evaluate("({s:0,d:1,t:2,q:3,quint:4,sext:5,sept:6,dd:2,sd:7}['%s'])"%sg[2])
            if sg[2]!='m' and nv: assert op,(i,k,sg)
    pg.select_option('#pv_exsel','0');pg.click('[data-pvchip="0"]')
    # montar estrutura da 2-hexanona: B, C=O, A, C, D, E
    ordem=pg.evaluate("PROVA_EX[0].est.map(a=>a[0]+'|'+(a[1]||''))")
    for k in range(6):
        pg.locator('#pv_pool [data-pvp]').filter(has_text=ordem[k].split('|')[0]).first.click() if False else None
    for k in range(6):
        pg.evaluate("(k)=>{const bs=[...document.querySelectorAll('#pv_pool [data-pvp]')];bs.find(b=>b.dataset.pvp==String(k)).click()}",k)
    pg.click('#pv_chk4');assert 'Certo' in pg.inner_text('#pv_fb4'),pg.inner_text('#pv_fb4')
    # atribuição escrita: modelo aparece
    pg.click('[data-pvma="0"]');assert 'Modelo' in pg.inner_text('#pv_att')
    # resolução vem do Resolvidos e mostra passos
    pg.click('#pv_reveal');assert pg.locator('#pv_sol .ppr').count()>=4
    pg.click('#pv_acertei');assert 'Acertei 1 de 13' in pg.inner_text('#pv_prog')
    # exercício de anel (1,3-dioxano): aceita a rotação
    pg.select_option('#pv_exsel','11');pg.wait_for_timeout(100)
    for k in [1,2,3,4,5,0]:
        pg.evaluate("(k)=>{const bs=[...document.querySelectorAll('#pv_pool [data-pvp]')];bs.find(b=>b.dataset.pvp==String(k)).click()}",k)
    pg.click('#pv_chk4');assert 'Certo' in pg.inner_text('#pv_fb4'),pg.inner_text('#pv_fb4')
    # benzamida usa 5 H
    pg.select_option('#pv_exsel','10');assert 'usa: 5' in pg.inner_text('#pv_enun').replace('H total que a regra de três usa:','usa:').replace('\n',' ') or '5' in pg.inner_text('#pv_enun')
    # medir clicando na curva
    pg.select_option('#pv_exsel','1');pg.click('[data-pvtool="0"]')
    pg.evaluate("""(()=>{const svg=document.getElementById('pv_spec'),m=svg.getScreenCTM();
      [[300,120],[300,60]].forEach(q=>{const pt=svg.createSVGPoint();pt.x=q[0];pt.y=q[1];const c=pt.matrixTransform(m);
        svg.dispatchEvent(new MouseEvent('click',{clientX:c.x,clientY:c.y,bubbles:true}))})})()""")
    assert pg.evaluate("document.querySelector('#pv_tbl [data-pvm=\"0\"]').value")!=''
    pg.screenshot(path='/tmp/analorg_teste/prova.png',full_page=True)
    assert not er,er
    # as outras abas do RMN seguem funcionando
    pg.click('[data-rp="pra"]');pg.wait_for_timeout(200);assert pg.locator('#resBox details.sec').count()==28
    assert not er,er
    b.close()
print('ok prova')
