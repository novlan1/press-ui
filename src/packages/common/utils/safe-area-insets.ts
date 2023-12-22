import { PASSIVE_OPTIONS } from './support-passive';

const attrs: string[] = ['top', 'left', 'right', 'bottom'];
const elementComputedStyle: Record<string, any> = {};
const callbacks: Function[] = [];

let inited: boolean;
let support: string;


function getSupport() {
  if (!('CSS' in window) || typeof CSS.supports !== 'function') {
    support = '';
  } else if (CSS.supports('top: env(safe-area-inset-top)')) {
    support = 'env';
  } else if (CSS.supports('top: constant(safe-area-inset-top)')) {
    support = 'constant';
  } else {
    support = '';
  }
  return support;
}


function setStyle(el: HTMLElement, style: Record<string, any>) {
  const elStyle: CSSStyleDeclaration = el.style;
  Object.keys(style).forEach((key: any) => {
    const val: string = style[key];
    elStyle[key] = val;
  });
}

const cbs: Function[] = [];
function parentReady(callback?: Function) {
  if (callback) {
    cbs.push(callback);
  } else {
    cbs.forEach((cb) => {
      cb();
    });
  }
}

function init() {
  support = typeof support === 'string' ? support : getSupport();
  if (!support) {
    attrs.forEach((attr: string) => {
      elementComputedStyle[attr] = 0;
    });
    return;
  }

  function addChild(parent: HTMLElement, attr: string) {
    const a1: HTMLElement = document.createElement('div');
    const a2: HTMLElement = document.createElement('div');
    const a1Children: HTMLElement = document.createElement('div');
    const a2Children: HTMLElement = document.createElement('div');
    const W = 100;
    const MAX = 10000;
    const aStyle = {
      position: 'absolute',
      width: `${W}px`,
      height: '200px',
      boxSizing: 'border-box',
      overflow: 'hidden',
      paddingBottom: `${support}(safe-area-inset-${attr})`,
    };
    setStyle(a1, aStyle);
    setStyle(a2, aStyle);
    setStyle(a1Children, {
      transition: '0s',
      animation: 'none',
      width: '400px',
      height: '400px',
    });
    setStyle(a2Children, {
      transition: '0s',
      animation: 'none',
      width: '250%',
      height: '250%',
    });
    a1.appendChild(a1Children);
    a2.appendChild(a2Children);
    parent.appendChild(a1);
    parent.appendChild(a2);

    parentReady(() => {
      a2.scrollTop = MAX;
      a1.scrollTop = MAX;

      let a1LastScrollTop: number = a1.scrollTop;
      let a2LastScrollTop: number = a2.scrollTop;
      function onScroll() {
        // @ts-ignore
        if (this.scrollTop === (this === a1 ? a1LastScrollTop : a2LastScrollTop)) {
          return;
        }
        a2.scrollTop = MAX;
        a1.scrollTop = MAX;
        a1LastScrollTop = a1.scrollTop;
        a2LastScrollTop = a2.scrollTop;
        attrChange(attr);
      }
      a1.addEventListener('scroll', onScroll, PASSIVE_OPTIONS);
      a2.addEventListener('scroll', onScroll, PASSIVE_OPTIONS);
    });

    const computedStyle: CSSStyleDeclaration = getComputedStyle(a1);
    Object.defineProperty(elementComputedStyle, attr, {
      configurable: true,
      get() {
        return parseFloat(computedStyle.paddingBottom);
      },
    });
  }

  const parentDiv: HTMLElement = document.createElement('div');
  setStyle(parentDiv, {
    position: 'absolute',
    left: '0',
    top: '0',
    width: '0',
    height: '0',
    zIndex: '-1',
    overflow: 'hidden',
    visibility: 'hidden',
  });
  attrs.forEach((key) => {
    addChild(parentDiv, key);
  });
  document.body.appendChild(parentDiv);
  parentReady();
  inited = true;
}

function getAttr(attr: string): number {
  if (!inited) {
    init();
  }
  return elementComputedStyle[attr];
}

const changeAttrs: string[] = [];
function attrChange(attr: string) {
  if (!changeAttrs.length) {
    setTimeout(() => {
      const style: Record<string, any> = {};
      changeAttrs.forEach((attr) => {
        style[attr] = elementComputedStyle[attr];
      });
      changeAttrs.length = 0;
      callbacks.forEach((callback) => {
        callback(style);
      });
    }, 0);
  }
  changeAttrs.push(attr);
}


function onChange(callback: Function) {
  if (!getSupport()) {
    return;
  }
  if (!inited) {
    init();
  }
  if (typeof callback === 'function') {
    callbacks.push(callback);
  }
}

function offChange(callback: Function) {
  const index = callbacks.indexOf(callback);
  if (index >= 0) {
    callbacks.splice(index, 1);
  }
}

export const safeAreaInsets = {
  get support(): boolean {
    return (typeof support === 'string' ? support : getSupport()).length != 0;
  },
  get top(): number {
    return getAttr('top');
  },
  get left(): number {
    return getAttr('left');
  },
  get right(): number {
    return getAttr('right');
  },
  get bottom(): number {
    return getAttr('bottom');
  },
  onChange,
  offChange,
};

export default safeAreaInsets;


