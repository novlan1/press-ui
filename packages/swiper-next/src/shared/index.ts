/* eslint-disable no-redeclare */
import { isFunction, isPlainObject, isString, hyphenate, extend } from '@vue/shared';
import type {
  ComponentInternalInstance,
  RendererNode,
  VNode,
} from 'vue';


interface HTMLElementWithDataset extends HTMLElement {
  __uniDataset?: Record<string, any>;
}

export function normalizeTarget(el: HTMLElement) {
  const { id, offsetTop, offsetLeft } = el;
  return {
    id,
    dataset: getCustomDataset(el),
    offsetTop,
    offsetLeft,
  };
}

export function getCustomDataset(el: HTMLElement | HTMLElementWithDataset) {
  // eslint-disable-next-line no-underscore-dangle
  return extend({}, el.dataset, (el as HTMLElementWithDataset).__uniDataset);
}

export function cache<T>(fn: (str: string) => T) {
  const cache: Record<string, T> = Object.create(null);
  return (str: string) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

export function cacheStringFunction(fn: (string: string) => string) {
  return cache<string>(fn);
}

export function getLen(str = '') {
  // eslint-disable-next-line no-control-regex
  return (`${str}`).replace(/[^\x00-\xff]/g, '**').length;
}

function hasLeadingSlash(str: string) {
  return str.indexOf('/') === 0;
}

export function addLeadingSlash(str: string) {
  return hasLeadingSlash(str) ? str : `/${str}`;
}

export function removeLeadingSlash(str: string) {
  return hasLeadingSlash(str) ? str.slice(1) : str;
}

export const invokeArrayFns = (fns: Function[], arg?: any) => {
  let ret;
  for (let i = 0; i < fns.length; i++) {
    ret = fns[i](arg);
  }
  return ret;
};

export function updateElementStyle(
  element: HTMLElement,
  styles: Partial<CSSStyleDeclaration>,
) {
  for (const attrName in styles) {
    element.style[attrName] = styles[attrName]!;
  }
}

export function once<T extends (
  ...args: any[]) => any>(
  fn: T,
  ctx: unknown = null,
): T {
  let res: any;
  return ((...args: any[]) => {
    if (fn) {
      res = fn.apply(ctx, args);
      fn = null as any;
    }
    return res;
  }) as T;
}

export const sanitise = (val: unknown) => (val && JSON.parse(JSON.stringify(val))) || val;

const innerCompleteValue = (value: number) => (value > 9 ? value : `0${value}`);

export function formatDateTime({ date = new Date(), mode = 'date' }) {
  if (mode === 'time') {
    return (
      `${innerCompleteValue(date.getHours())}:${innerCompleteValue(date.getMinutes())}`
    );
  }
  return (
    `${date.getFullYear()
    }-${
      innerCompleteValue(date.getMonth() + 1)
    }-${
      innerCompleteValue(date.getDate())}`
  );
}

interface Options {
  success?: (res: any) => void;
  fail?: (res: any) => void;
  complete?: (res: any) => void;
}
export function callOptions(options: Options, errMsg: string): void;
export function callOptions(
  options: Options,
  data: string | { [key: string]: any; errMsg: string },
): void {
  options = options || {};
  if (isString(data)) {
    data = {
      errMsg: data,
    };
  }
  if (/:ok$/.test(data.errMsg)) {
    if (isFunction(options.success)) {
      options.success(data);
    }
  } else {
    if (isFunction(options.fail)) {
      options.fail(data);
    }
  }
  if (isFunction(options.complete)) {
    options.complete(data);
  }
}

export function getValueByDataPath(obj: any, path: string): unknown {
  if (!isString(path)) {
    return;
  }
  path = path.replace(/\[(\d+)\]/g, '.$1');
  const parts = path.split('.');
  const key: number | string = parts[0];
  if (!obj) {
    obj = {};
  }
  if (parts.length === 1) {
    return obj[key];
  }
  return getValueByDataPath(obj[key], parts.slice(1).join('.'));
}

export function sortObject<T extends Object>(obj: T) {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const sortObj: T = {} as T;
  if (isPlainObject(obj)) {
    Object.keys(obj)
      .sort()
      .forEach((key) => {
        const tempKey = key as keyof T;
        sortObj[tempKey] = obj[tempKey];
      });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}

export const ON_WXS_INVOKE_CALL_METHOD = 'onWxsInvokeCallMethod';

function isElement(el: Element) {
  // Element
  return el.nodeType === 1;
}

export function resolveOwnerEl(
  instance: ComponentInternalInstance,
  multi: true
): RendererNode[];
export function resolveOwnerEl(
  instance: ComponentInternalInstance
): RendererNode | null;
export function resolveOwnerEl(
  instance: ComponentInternalInstance,
  multi = false,
): RendererNode | null {
  const { vnode } = instance;
  if (isElement(vnode.el as Element)) {
    return multi ? (vnode.el ? [vnode.el] : []) : vnode.el;
  }
  const { subTree } = instance;
  // ShapeFlags.ARRAY_CHILDREN = 1<<4
  if (subTree.shapeFlag & 16) {
    const elemVNodes = (subTree.children as VNode[]).filter(vnode => vnode.el && isElement(vnode.el as Element));
    if (elemVNodes.length > 0) {
      if (multi) {
        return elemVNodes.map(node => node.el);
      }
      return elemVNodes[0].el;
    }
  }
  return multi ? (vnode.el ? [vnode.el] : []) : vnode.el;
}

export function isBuiltInComponent(_tag: string) {
  return false;
  // if (UNI_UI_CONFLICT_TAGS.indexOf(tag) !== -1) {
  //   return false
  // }
  // // h5 平台会被转换为 v-uni-
  // const realTag = 'uni-' + tag.replace('v-uni-', '')
  // // TODO 区分x和非x
  // return (
  //   BUILT_IN_TAGS.indexOf(realTag) !== -1 ||
  //   UVUE_WEB_BUILT_IN_TAGS.indexOf(realTag) !== -1
  // )
}

export function resolveOwnerVm(vm: ComponentInternalInstance) {
  if (!vm) {
    return;
  }
  let componentName = vm.type.name;
  while (componentName && isBuiltInComponent(hyphenate(componentName))) {
    // ownerInstance 内置组件需要使用父 vm
    vm = vm.parent!;
    componentName = vm.type.name;
  }
  return vm.proxy!;
}

export function upx2px(num: number) {
  return num;
}
