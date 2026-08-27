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
    if (typeof Vue.mixin === 'function') {
      Vue.mixin(mixin);
    }
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
    if (typeof Vue.component === 'function') {
      Vue.component(name, component);
    }
    // #endif

    // #ifdef VUE3
    if (app && !app.component(name)) {
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
  if (typeof Vue.nextTick === 'function') {
    Vue.nextTick(cb);
  }
  // #endif

  // #ifdef VUE3
  vue3NextTick(cb);
  // #endif
}


export function extendComponent(el, component, propsData = {}) {
  let result;
  // #ifndef VUE3
  if (typeof Vue.extend === 'function') {
    result = new (Vue.extend(component))({
      el,
      propsData,
    });
  }
  // #endif

  // #ifdef VUE3
  result = createApp(component, {
    ...propsData,
  }).mount(el);
  // #endif

  return result;
}

export function extendComponentMore({
  el,
  component,
  propsData = {},
  initApp,
}) {
  let app;
  let componentInstance;

  // #ifndef VUE3
  if (typeof Vue.extend === 'function') {
    app = new (Vue.extend(component))({
      el,
      propsData,
    });
  }

  componentInstance = app;
  // #endif

  // #ifdef VUE3
  app = createApp(component, {
    ...propsData,
  });
  if (typeof initApp === 'function') {
    initApp(app);
  }
  componentInstance = app.mount(el);
  // #endif

  return [app, componentInstance];
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


export const getVModelMixin = ({
  type = String,
  defaultValue = '',
}) => ({
  props: {
    // #ifndef VUE3
    value: {
      type,
      default: defaultValue,
    },
    // #endif
    // #ifdef VUE3
    modelValue: {
      type,
      default: defaultValue,
    },
    // #endif
  },
  computed: {
    realModelValue() {
      let result = typeof defaultValue === 'function' ? defaultValue() : defaultValue;

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

});

export const vModelMixin = getVModelMixin({
  type: [String, Boolean],
  defaultValue: '',
});

export function usePlugin(plugin, app) {
  // #ifndef VUE3
  if (typeof Vue.use === 'function') {
    Vue.use(plugin);
  }
  // #endif

  // #ifdef VUE3
  if (app) {
    app.use(plugin);
  }
  // #endif
}


export function setCustomElements(customElements) {
  // #ifndef VUE3
  if (Vue.config) {
    Vue.config.ignoredElements = [
      ...(Vue.config.ignoredElements || []),
      ...customElements,
    ];
  }
  // #endif

  // #ifdef VUE3
  // 在 vite.config.ts 中配置
  // if (app?.config?.compilerOptions) {
  //   app.config.compilerOptions.isCustomElement = tag => customElements.indexOf(tag) > -1;
  // }
  // #endif
}
