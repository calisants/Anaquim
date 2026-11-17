"""Estilo único das estruturas moleculares (RDKit) do Anaquim.
Traço fino e uniforme, carbono na cor do texto e heteroátomos em tons discretos (via variáveis CSS, que mudam no tema escuro).
Uso: estilo.opts(o) depois de criar drawOptions; estilo.pos(svg) no texto do SVG pronto."""
import re

def _rgb(h): return tuple(int(h[i:i+2],16)/255 for i in (1,3,5))
# número atômico -> (hex usado só como marcador no SVG, variável CSS)
_PAL={7:('#2F5FA8','var(--at-n)'),8:('#B5382E','var(--at-o)'),16:('#9A7410','var(--at-s)'),15:('#B45F1A','var(--at-p)'),
      9:('#2F7A55','var(--at-x)'),17:('#2F7A56','var(--at-x)'),35:('#7A4A22','var(--at-br)'),53:('#6B3FA0','var(--at-i)')}

def opts(o):
    o.useBWAtomPalette()
    o.setAtomPalette({z:_rgb(h) for z,(h,_) in _PAL.items()})
    o.bondLineWidth=1.7
    o.multipleBondOffset=0.16
    o.minFontSize=12
    o.baseFontSize=0.75
    o.additionalAtomLabelPadding=0.05
    o.addAtomIndices=False
    return o

def pos(t):
    for z,(h,v) in _PAL.items():
        t=t.replace(h,v).replace(h.lower(),v)
    return t.replace('#000000','currentColor').replace('#FF0000','var(--lost)').replace('#0000FF','var(--blue)')
