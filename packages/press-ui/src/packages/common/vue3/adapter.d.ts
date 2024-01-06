export function initGlobalMixin(list: any, app?: any): void;
export function initGlobalComponent(list: any, app?: any): void;
export function initGlobalProps(list: any, app?: any): void;
export function nextTick(cb: any): void;
export function extendComponent(el: any, component: any, propsData?: {}): any;
export function extendComponentMore({ el, component, propsData, initApp }: {
  el: string;
  component: any;
  propsData?: {};
  initApp?: any;
}): [any, any];

export function getIsServer(): boolean;
export function toProvideThis(key: any): {
  provide(): {
    [x: number]: any;
  };
  setup(): {
    proxy: any;
  };
};
export function toInject(key: any): {
  inject: {
    [x: number]: {
      default: any;
    };
  };
  setup(): {
    [x: number]: any;
  };
};
export function forceUpdate(instance: any): void;
export function usePlugin(plugin: any, app?: any): void;
export function setCustomElements(customElements: any, app?: any): void;
export const vModelMixin: any;
