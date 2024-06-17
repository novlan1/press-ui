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
