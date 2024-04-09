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

由于 `Press UI` 提供的是源码，`scss` 样式需业务侧自行编译。

这里报告一个问题，如果 `sass` 版本 `<= 1.39.2` 时，包含 `calc` 的样式会可能不生效。

## 3. Typescript 配置

`Press UI` 中大部分脚本文件为 `Typescript`，而非 `Javascript`。

同样由于 `Press UI` 提供的是源码，`tsconfig.json` 需正确配置，否则会报编译问题。

可以参考 [Press Plus](https://github.com/novlan1/press-plus/blob/release/tsconfig.json) 项目的 `tsconfig.json` 的配置。


## 4. Vue3 兼容

对于 `v-model`，Press UI 内部使用了一个 `adapter`，`Vue2` 会接收 `value`，`Vue3` 会接收 `modelValue`，同时 `Vue2` 会触发 `input` 事件，而 `Vue3` 会触发 `update:modelValue` 事件。

Press UI 中使用了此 `adapter` 的组件有：

- press-field
- press-list
- press-popover-plus
