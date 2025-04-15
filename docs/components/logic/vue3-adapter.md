# Vue3 适配器

Press UI 内部有一些稳定的、适配 Vue3 的方法，外界也可以使用。

## 基础用法

以 `initGlobalMixin` 为例，该方法用来注册全局 `mixin`。

```ts
import { initGlobalMixin } from 'press-ui/common/vue3/adapter';

const mixin = {
  data() {
    return {
      xxx: 'xxx',
    }
  },
}

// app 为 createApp 返回的应用实例，仅 Vue3 会用到
initGlobalMixin(mixin, app);
```

## API

下面是可以使用的适配器列表。

### 1. initGlobalMixin

注册全局 `mixin`，`list` 可为1个或多个 `mixin`。

该方法兼容了 `Vue.mixin` 和 `app.mixin`。

```ts
initGlobalMixin(list, app);
```

### 2. initGlobalComponent

注册全局组件，`list` 可为1个或多个组件。

该方法兼容了 `Vue.component` 和 `app.component`。

```ts
initGlobalComponent(list: IList, app);
type IList = {
  name: string;
  component: IComponent;
} | Array<{
  name: string;
  component: IComponent;
}>
```

### 3. initGlobalProps

注册全局变量，`list` 可为1个或多个 `props`。

该方法兼容了 `Vue.prototype[name] = prop` 和 `app.config.globalProperties[name] = prop`。

```ts
initGlobalProps(list: IPropsList, app);

type IPropsList = {
  name: string;
  prop: any;
} | Array<{
  name: string;
  prop: any;
}>
```

### 4. usePlugin

对于 `Vue.use(plugin)` 和 `app.use(plugin)` 的兼容。

```ts
usePlugin(plugin, app)
```

### 5. setCustomElements

对 `Vue.config.ignoredElements` 和 `app.config.compilerOptions.isCustomElement` 的封装。

```ts
setCustomElements(customElements, app);
```

比如：

```ts
setCustomElements([
  'uni-scroll-view',
  'uni-swiper',
  'uni-swiper-item',
], app);
```


### 6. extendComponent

该方法兼容了 `Vue.extend` 和 Vue3 中的`createApp`，函数式调用组件时会用到。

```ts
extendComponent('#domId', component, propsData);
```


### 7. extendComponentMore

同样是兼容了 `Vue.extend` 和 Vue3 中的`createApp`，并支持初始化应用实例的时候传入回调，比如注册一些指令。

```ts
import VueLazyLoad from 'vue3-lazyload'
import { initGlobalVue3EBus } from 't-comm/lib/e-bus/init'

extendComponent({
  el: '#domId',
  component,
  propsData,
  initApp: () => {
    initGlobalVue3EBus(app)
    app.directive('treport', treport as any)
    app.use(VueLazyLoad, {})
  },
});
```

### 8. vModelMixin

对 `v-model` 的兼容。

```ts
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
```


### 9. nextTick

该方法兼容了 `Vue.nextTick(cb)` 和 Vue3 中的`nextTick`。

```ts
nextTick(cb);
```

### 10. forceUpdate

该方法一般只在 Vue2 才会用到。

```ts
// instance 为 Vue2 中的组件实例，即 this
forceUpdate(instance);
```

### 11. setAdapter

封装了 Vue2.x 的 $set，和 Vue3.x 的直接赋值。

```ts
import { setAdapter } from 'press-ui/common/vue3/set';


setAdapter(this.info, 'key', [])
// 对应 Vue2.x 的 this.$set(this.info, 'key', [])
// 对应 Vue3.x 的 this.info['key'] = []
```
