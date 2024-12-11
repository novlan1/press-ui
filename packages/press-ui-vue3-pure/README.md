
<div align="center">
  <img alt="logo" src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fpress-ui-avatar-transparent.png" width="150" style="margin-bottom: -25px;">
</div>
<h3 align="center">易用、灵活、基于 uni-app 的跨端组件库</h3>

---

[查看文档](https://novlan1.github.io/press-ui/) | [查看示例](https://novlan1.github.io/press-ui/h5/)

### 1. 介绍

`Press UI`是一套易用、灵活、基于`uni-app`的跨端组件库。

- 🚀 70+ 基础组件，覆盖移动端主流场景
- 🚀 支持基于`uni-app`的H5、微信小程序、QQ小程序、APP、支付宝小程序、抖音小程序等
- 💪 支持普通H5项目
- 💪 支持 Vue2 和 Vue3
- 💪 零外部依赖，不依赖三方 npm 包
- 📖 提供丰富的中英文文档和组件示例
- 🍭 支持主题定制，内置 600+ 个主题变量
- 🌍 支持国际化，内置 16+ 种语言包

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/services.gif" width="600">

### 2. 解决痛点

`Press UI`作为基础组件库，解决了以下痛点：

1. 支持包含`vant`的H5项目平滑迁移至`uni-app`项目，仅需改下引用地址和组件名称
2. 丰富的组件类型，以及易用的API，让`uni-app`开发变得简单
3. 支持国际化、主题定制等，组件灵活性更强
4. 支持普通Vue项目，达到一套代码`n+1`端复用

### 3. 应用场景

`Press UI`可应用于`uni-app`项目，或者普通的H5项目，同时支持 Vue2 和 Vue3。

目前已应用在王者赛宝、HoK Club、赛宝Pro、和平赛事、高能赛事、商户赛等项目中。

<div style="display:flex;flex-wrap:wrap;margin-top:10px;">
  <img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/4/pvp-esports-screenshort.png" width="300">
  <img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fhok-club-screenshot.gif" width="300">
</div>

<br />

<div style="display:flex;flex-wrap:wrap;margin-top:10px;">
  <img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/6/own_mike_b0eb6091b6559d4a0e.gif" width="300">
  <img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/6/own_mike_5f18fe9ffb82583da3.gif" width="300">
</div>

<br />

<div style="display:flex;flex-wrap:wrap;margin-top:10px;">
  <img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fown_mike_2bfb54a9ad6b9bc0ff.gif" width="600">
</div>

### 4. 如何使用

#### 4.1. npm 方式

1. 安装`npm`包

```bash
npm i press-ui-vue3
```

2. 在 main.ts 中引入

```ts
import PressUIVue3 from 'press-ui-vue3';

const app = createApp(App)

app.use(PressUIVue3)
```

3. 在页面中正常引入并使用

比如 `button` 组件：

```html
<template>
  <Button />
</template>
```

```ts
<script>
import { Button } from 'press-ui-vue3'

export default {
  components: {
    Button, 
  },
}
</script>
```

### 5. 立即体验

下图是示例二维码，第一行分别为基于 `uni-app` 的 `Vue2.x` 版本的 H5、微信小程序、QQ小程序、支付宝小程序、安卓项目。

第二行分别为基于 `uni-app` 的 `Vue3.x` 版本的H5、微信小程序，及非 `uni-app` 环境的 `Vue2.x` 、`Vue3.x` 版本的H5项目。

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fpress-demo-cluster-3.gif" width="800">

### 6. 示例项目

点击下方链接查看示例项目。

1. [Vue2](https://github.com/novlan1/press-ui-demo-vue2)
2. [Vue3](https://github.com/novlan1/press-ui-demo-vue3)
3. [Vue2 非 uni-app](https://github.com/novlan1/press-ui-demo-vue2-pure)
4. [Vue3 非 uni-app](https://github.com/novlan1/press-ui-demo-vue3-pure)
