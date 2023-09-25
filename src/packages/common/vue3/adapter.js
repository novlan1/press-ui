import {
  // #ifndef VUE3
  Vue,
  // #endif

  // #ifdef VUE3
  nextTick as vue3NextTick,
  createApp,
  provide,
  inject,
  getCurrentInstance,
  // #endif
} from './vue';


function getTargetList(list) {
  let tList = list;
  if (!Array.isArray(tList)) {
    tList = [list];
  }
  return tList;
}

export function initGlobalMixin(list, app) {
  const tList = getTargetList(list);

  tList.forEach((mixin) => {
    // #ifndef VUE3
    Vue.mixin(mixin);
    // #endif

    // #ifdef VUE3
    if (app) {
      app.mixin(mixin);
    }
    // #endif
  });
}


export function initGlobalComponent(list, app) {
  const tList = getTargetList(list);

  tList.forEach((item) => {
    const { name, component } = item;

    // #ifndef VUE3
    Vue.component(name, component);
    // #endif

    // #ifdef VUE3
    if (app) {
      app.component(name, component);
    }
  // #endif
  });
}


export function initGlobalProps(list, app) {
  const tList = getTargetList(list);

  tList.forEach((item) => {
    const { name, prop } = item;

    // #ifndef VUE3
    Vue.prototype[name] = prop;
    // #endif

    // #ifdef VUE3
    if (app) {
      app.config.globalProperties[name] = prop;
    }
    // #endif
  });
}


export function nextTick(cb) {
  // #ifndef VUE3
  Vue.nextTick(cb);
  // #endif

  // #ifdef VUE3
  vue3NextTick(cb);
  // #endif
}


export function extendComponent(el, component, propsData = {}) {
  let result;
  // #ifndef VUE3
  result = new (Vue.extend(component))({
    el,
    propsData,
  });
  // #endif

  // #ifdef VUE3
  result = createApp(component, {
    ...propsData,
  }).mount(el);
  // #endif

  return result;
}


export function getIsServer() {
  let result;

  // #ifndef VUE3
  result = Vue.prototype.$isServer;
  // #endif

  // #ifdef VUE3
  result = false;
  // #endif

  return result;
}


export function toProvideThis(key) {
  return {
    // #ifndef VUE3
    provide() {
      return {
        [key]: this,
      };
    },
    // #endif

    // #ifdef VUE3
    setup() {
      const instance = getCurrentInstance();
      provide(key, instance.ctx);
      return instance;
    },
  // #endif
  };
}


export function toInject(key) {
  return {
    // #ifndef VUE3
    inject: {
      [key]: {
        default: null,
      },
    },
    // #endif

    // #ifdef VUE3
    setup() {
      const value = inject(key);
      return { [key]: value };
    },
    // #endif
  };
}


export function forceUpdate(instance) {
  // #ifndef VUE3
  instance.$forceUpdate();
  // #endif

  // #ifdef VUE3
  // const vue3Instance = getCurrentInstance();
  // vue3Instance?.proxy?.$forceUpdate();
  // #endif
}

export const vModelMixin = {
  props: {
    // #ifndef VUE3
    value: {
      type: [String, Boolean],
      default: '',
    },
    // #endif
    // #ifdef VUE3
    modelValue: {
      type: [String, Boolean],
      default: '',
    },
    // #endif
  },
  computed: {
    realModelValue() {
      let result = '';

      // #ifndef VUE3
      // @ts-ignore
      result = this.value;
      // #endif

      // #ifdef VUE3
      // @ts-ignore
      result = this.modelValue;
      // #endif
      return result;
    },
  },
  methods: {
    emitModelValue(value) {
      // #ifndef VUE3
      this.$emit('input', value);
      // #endif

      // #ifdef VUE3
      this.$emit('update:modelValue', value);
      // #endif
    },
  },

};

export function usePlugin(plugin, app) {
  // #ifndef VUE3
  Vue.use(plugin);
  // #endif

  // #ifdef VUE3
  if (app) {
    app.use(plugin);
  }
  // #endif
}


export function setCustomElements(customElements, app) {
  // #ifndef VUE3
  Vue.config.ignoredElements = customElements;
  // #endif

  // #ifdef VUE3
  if (app?.config?.compilerOptions) {
    app.config.compilerOptions.isCustomElement = tag => customElements.indexOf(tag) > -1;
  }
  // #endif
}
