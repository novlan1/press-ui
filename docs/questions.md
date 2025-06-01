# 常见问题

下面是使用中的常见问题。

## 1. 配置 `transpileDependencies`

由于 `Press UI` 提供的是源码，Vue2 项目下，需在 `vue.config.js` 中配置 `transpileDependencies`，示例如下。

```js
module.exports = {
  transpileDependencies: ['press-ui'],
}
```

## 2. sass 版本

由于 `Press UI` 提供的是源码，`sass` 样式需业务侧自行编译。

这里报告一个问题，如果 `sass` 版本 `<= 1.39.2` 时，包含 `calc` 的样式会可能不生效。

## 3. v-model

对于 `v-model`，Press UI 部分组件使用了一个 `adapter`，作用是在 `Vue2` 下会接收 `value`，在 `Vue3` 下会接收 `modelValue`，同时在 `Vue2` 下抛出事件名称为 `input`，而在 `Vue3` 下抛出事件名称为 `update:modelValue`。

Press UI 中使用了此策略的组件有：

- [field](./components/press/press-field.html)
- [list](./components/press/press-list.html)
- [number-keyboard](./components/press/press-number-keyboard.html)
- [popover-plus](./components/press/press-popover-plus.html)
- [pull-refresh](./components/press/press-pull-refresh.html)

## 4. Vue3 非 uni-app 项目

如果报警告 `Failed to resolve component: Button`，可以在 `main.ts` 中设置

```ts
app.component('Button', 'button');
```

如果报 `Failed to resolve component: uni-scroll-view` 等，可以在 `vite.config.ts` 中按需设置：

```ts
const customElements = [
  'uni-scroll-view',
  'uni-image',        // image
  'Button',           // dialog
  'cover-view',       // circle
  'navigator'         // notice-bar
]

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag: string) => customElements.includes(tag),
        },
      },
    }),
})
```

## 5. 桌面端适配

Press UI 是一个面向移动端的组件库，因此默认只适配了移动端设备，这意味着组件只监听了移动端的 `touch` 事件，没有监听桌面端的 `mouse` 事件。

如果你需要在桌面端使用 Press UI，可以引入我们提供的 `touch-emulator`，这个库会在桌面端自动将 `mouse` 事件转换成对应的 `touch` 事件，使得组件能够在桌面端使用。

```ts
import 'press-ui/common/touch-emulator';
```

## 6. windowTop

`windowTop` 表示页面距离顶部的距离，是 `uni-app` 仿微信小程序中 `navigationBar` 的高度，在 H5 中一般是 `44px`。

非 `uni-app` 项目可以这样模拟 `windowTop`

设置：

```ts
document.documentElement.style.setProperty('--window-top', '44px'); 
```

取值：

```ts
const style = document.documentElement.style
const windowTop = parseInt((style.getPropertyValue('--window-top').match(/\d+/) || ['0'])[0])
```

Press UI 兼容非 `uni-app` 项目时，在以下地方对 `windowTop` 进行了处理：

- `getBoundingClient()` 中的 `top` 和 `bottom`
- `touch` 事件中的 `pageY` 和 `clientY`
- `getWindowInfo` 中的 `windowHeight`

上面列举的这些属性值都减去了 `windowTop`。

## 7. 函数式调用

函数式调用就是通过执行函数，来引入组件并展示。`Press UI` 支持函数式调用的组件有：

- [popup](./components/press/press-popup.html)
- [toast](./components/press/press-toast.html)
- [picker](./components/press/press-picker.html)
- [datetime-picker](./components/press/press-datetime-picker.html)
- [dialog](./components/press/press-dialog.html)
- [dialog-plus](./components/press/press-dialog-plus.html)
- [image-preview](./components/press/press-image-preview.html)
- [popup-cell](./components/press/press-popup-cell.html)

### 7.1. 预埋 Dom 节点

在小程序下，必须**在页面中**预埋DOM节点，注意不是在子组件中。H5 环境可以不预埋，找不到节点时，H5 下会动态创建。

```html
<PressDialogPlus id="press-dialog" />
```

```ts
import PressDialogPlus from 'press-ui/press-dialog-plus/press-dialog-plus.vue';

export default {
  components: {
    PressDialogPlus,
  }
}
```

### 7.2. 非 `uni-app` 项目

注意，针对非 `uni-app` 项目，在函数式调用组件时，需要传入 `context: this`。

```diff
imagePreview({
+  context: this,
   images: this.images,
})
```

### 7.3. Vue3 项目

对于 Vue3 的 `uni-app` 项目，在预埋组件节点时，需传入 `ref`，而非`id`。

```diff
<press-popup
- :id="PRESS_PICKER_ID"
+ :ref="PRESS_PICKER_ID"
   mode="functional"
>
 xxx
</press-popup>
```
