
const SUPPORT_MAP = {
  'css.var': '--a:0',
  'css.env': 'top:env(a)',
  'css.constant': 'top:constant(a)',
};


function cssSupports(css: string) {
  return window.CSS && CSS.supports && (CSS.supports(css) || CSS.supports.apply(CSS, css.split(':') as any));
}


export function canIUse(key: keyof typeof SUPPORT_MAP) {
  if (SUPPORT_MAP[key]) {
    return cssSupports(SUPPORT_MAP[key]);
  }
  return false;
}

