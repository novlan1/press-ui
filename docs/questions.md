# 常见问题

下面是使用中的常见问题。

## 1. 必须配置 `transpileDependencies`

由于 `Press UI` 提供的是源码，在 `vue.config.js` 中必须配置 `transpileDependencies`，示例如下。

```js
module.exports = {
  transpileDependencies: ['press-ui'],
}
```

## 2. sass 版本

由于 `Press UI` 提供的是源码，`sass` 样式需业务侧自行编译。

这里报告一个问题，如果 `sass` 版本 `<= 1.39.2` 时，包含 `calc` 的样式会可能不生效。


## 3. Vue3 兼容

对于 `v-model`，Press UI 内部使用了一个 `adapter`，`Vue2` 会接收 `value`，`Vue3` 会接收 `modelValue`，同时 `Vue2` 会触发 `input` 事件，而 `Vue3` 会触发 `update:modelValue` 事件。

Press UI 中使用了此 `adapter` 的组件有：

- [press-field](./components/press/press-field.html)
- [press-list](./components/press/press-list.html)
- [press-popover-plus](./components/press/press-popover-plus.html)

## 4. Plus 组件

由于 Press UI 是在王者赛宝项目开发中，同步搭建的，一些组件直接由王者赛宝项目中沉淀而来，比如 `popup`、`icon`、`picker` 等。

后面引入了更通用的、API 与 Vant 相同的同名组件，但之前的名称被占用了，所以采用了 `xx-plus` 这样的命名方式，比如 `popup-plus`、`icon-plus`、`picker-plus`等。

| Vant 组件 | Press UI 组件                                              |
| --------- | ---------------------------------------------------------- |
| dialog    | [dialog-plus](./components/press/press-dialog-plus.html)   |
| icon      | [icon-plus](./components/press/press-icon-plus.html)       |
| loading   | [loading-plus](./components/press/press-loading-plus.html) |
| picker    | [picker-plus](./components/press/press-picker-plus.html)   |
| popover   | [popover-plus](./components/press/press-popover-plus.html) |
| popup     | [popup-plus](./components/press/press-popup-plus.html)     |

## 5. Vue3 非 uni-app 项目

如果报警告 `Failed to resolve component: Button`，可以在 main.ts 中设置

```ts
app.component('Button', 'button');
```

如果报 `Failed to resolve component: uni-scroll-view` 等，可以在 `vite.config.ts` 中按需设置：

```ts
const customElements = [
  'uni-scroll-view',
  // image
  'uni-image',
  // dialog
  'Button',
  // circle
  'cover-view',
  // notice-bar
  'navigator'
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

## 6. 一些不做的组件

### 6.1. Space

评估了下 `Space` 组件的实现，用了 `$slots.default`，然后给每个子元素都包裹了 `space-item` 类名。由于小程序的 `$slots.default` 为 布尔值，所以小程序无法实现。

当然也可以提供 `Space` 和 `SpaceItem` 两个组件，就像 `Collapse` 和 `CollapseItem` 一样，不过感觉意义不大，自己写成本也不高。


### 6.2. TextEllipsis

原理是在文档下生成了一个不可见的元素，通过它获取真实内容的宽高。同样由于小程序不支持动态创建元素，所以 Press UI 暂不考虑实现。


## 7. 桌面端适配

Press UI 是一个面向移动端的组件库，因此默认只适配了移动端设备，这意味着组件只监听了移动端的 `touch` 事件，没有监听桌面端的 `mouse` 事件。

如果你需要在桌面端使用 Press UI，可以引入我们提供的 `touch-emulator`，这个库会在桌面端自动将 `mouse` 事件转换成对应的 `touch` 事件，使得组件能够在桌面端使用。

```ts
import 'press-ui/common/touch-emulator';
```


## 8. windowTop

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