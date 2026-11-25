"""Desenhos (RDKit) das estruturas dos exercícios de RMN, usados só no relatório (Prova e Leitor).
A chave é o nome do composto em minúsculas, igual ao que o JS calcula com relChave(). Cores em hexadecimal, sem variáveis CSS,
porque o relatório é uma página separada e não tem o tema do app."""
import re
from rdkit import Chem
from rdkit.Chem.Draw import rdMolDraw2D
import estilo
SMI={
 '2-hexanona':'CCCCC(C)=O','álcool 4-metoxibenzílico':'OCc1ccc(OC)cc1','acrilato de etila':'C=CC(=O)OCC','2-metilpropanal':'CC(C)C=O',
 '4-nitrotolueno':'Cc1ccc(cc1)[N+](=O)[O-]','acetanilida':'CC(=O)Nc1ccccc1','éter etil vinílico':'C=COCC','benzoato de propila':'CCCOC(=O)c1ccccc1',
 'n,n-dietilacetamida':'CCN(CC)C(C)=O','butanoato de benzila':'CCCC(=O)OCc1ccccc1','benzamida':'NC(=O)c1ccccc1','1,3-dioxano':'C1COCOC1',
 'ácido butanoico':'CCCC(=O)O','3-metil-2-butanona':'CC(C)C(C)=O','2-butanol':'CCC(C)O','benzoato de butila':'CCCCOC(=O)c1ccccc1',
 'álcool alílico':'C=CCO','1-bromo-3-metilbutano':'CC(C)CCBr','4-cloroanisol':'COc1ccc(Cl)cc1','diisobutilamina':'CC(C)CNCC(C)C',
 'n-metilcarbamato de etila':'CCOC(=O)NC','acetato de etila':'CCOC(C)=O','2-bromopropano':'CC(C)Br',"4'-metilacetofenona":'Cc1ccc(cc1)C(C)=O',
 'etanol':'CCO','propanoato de metila':'CCC(=O)OC','acetaldeído':'CC=O','éter dietílico':'CCOCC',
}
def svg1(smi,w=300,h=190):
    m=Chem.MolFromSmiles(smi);assert m is not None,smi
    d=rdMolDraw2D.MolDraw2DSVG(w,h);o=d.drawOptions();o.clearBackground=False;o.fixedBondLength=34;o.padding=0.12;estilo.opts(o)
    d.DrawMolecule(m);d.FinishDrawing();s=d.GetDrawingText()
    s=re.sub(r'<\?xml.*?\?>','',s);s=re.sub(r'<!--.*?-->','',s)
    s=re.sub(r"<rect[^>]*?style='opacity:1\.0;fill:#FFFFFF[^>]*?/>",'',s)
    s=s.replace('#000000','#15202B')
    s=re.sub(r"<svg[^>]*>",'<svg viewBox="0 0 %d %d" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Estrutura">'%(w,h),s,count=1)
    return re.sub(r'\s+',' ',s).strip()
def build(): return {k:svg1(v) for k,v in SMI.items()}
