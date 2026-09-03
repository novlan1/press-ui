
<!-- 复制到 docs 下的时候，去掉“查看文档”和“查看示例” -->
<div align="center">
  <a href="https://github.com/novlan1/press-ui">
    <img width="150" src="https://cdn.uwayfly.com/press/img/press-ui-avatar-transparent.png" style="margin-bottom: -25px;">
  </a>

  <br>

  [![node][node]][node-url]
  [![downloads][downloads]][downloads-url]
  ![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/press-ui)
  ![NPM Version](https://img.shields.io/npm/v/press-ui)
  ![NPM License](https://img.shields.io/npm/l/press-ui)
  ![GitHub last commit](https://img.shields.io/github/last-commit/novlan1/press-ui)
  ![GitHub Created At](https://img.shields.io/github/created-at/novlan1/press-ui)

  <h1>Press UI</h1>
  <p>
    易用、灵活、基于 uni-app 的跨端组件库
  </p>
</div>


### 1. 介绍

`Press UI`是一套易用、灵活，基于`uni-app`的跨端组件库。

- 🚀 70+ 基础组件，覆盖移动端主流场景
- 🚀 支持基于`uni-app`的H5、微信小程序、QQ小程序、APP、支付宝小程序、抖音小程序等
- 💪 支持普通H5项目
- 💪 支持 Vue2 和 Vue3
- 💪 零外部依赖，不依赖三方 npm 包
- 📖 提供丰富的中英文文档和组件示例
- 🍭 支持主题定制，内置 600+ 个主题变量
- 🌍 支持国际化，内置 16+ 种语言包

<img src="https://cdn.uwayfly.com/press/img/services.gif" width="600">

### 2. 解决痛点

`Press UI`作为基础组件库，解决了以下痛点：

1. 支持包含`vant`的H5项目平滑迁移至`uni-app`项目，仅需改下引用地址和组件名称
2. 丰富的组件类型，以及易用的API，让`uni-app`开发变得简单
3. 支持国际化、主题定制等，组件灵活性更强
4. 支持普通Vue项目，达到一套代码`n+1`端复用

### 3. 应用场景

`Press UI`可应用于`uni-app`项目，或者普通的H5项目，同时支持 Vue2 和 Vue3。

### 4. 如何使用

#### 4.1. npm 方式

1. 安装`npm`包

```bash
npm i press-ui
```

2. 在页面中正常引入并使用

比如 `button` 组件：

```html
<template>
  <PressButton />
</template>
```

```ts
<script lang="ts" setup>
import PressButton from 'press-ui/press-button/press-button.vue'
</script>
```

#### 4.2. uni_modules 方式

[插件市场](https://ext.dcloud.net.cn/plugin?id=18798)直接导入即可


### 5. 立即体验

下图是示例二维码，第一行分别为基于 `uni-app` 的 `Vue2.x` 版本的 H5、微信小程序、QQ小程序、支付宝小程序、安卓项目。

第二行分别为基于 `uni-app` 的 `Vue3.x` 版本的H5、微信小程序，及非 `uni-app` 环境的 `Vue2.x` 、`Vue3.x` 版本的H5项目。

<img src="https://cdn.uwayfly.com/press/img/press-demo-cluster-20250602.png" width="800">

### 6. 示例项目

点击下方链接查看示例项目。

1. [Vue3 Uniapp](https://github.com/novlan1/press-ui-demo-vue3-uni/)
2. [Vue2 Uniapp](https://github.com/novlan1/press-ui-demo-vue2-uni/)
3. [Vue3 非 Uniapp](https://github.com/novlan1/press-ui-demo-vue3-pure/)
4. [Vue2 非 Uniapp](https://github.com/novlan1/press-ui-demo-vue2-pure/)

[node]: https://img.shields.io/node/v/press-ui
[node-url]: https://nodejs.org
[downloads]: https://img.shields.io/npm/dm/press-ui
[downloads-url]: https://npmcharts.com/compare/press-ui?minimal=true

### 7. 加群交流

欢迎加入QQ群沟通。

<img src="https://cdn.uwayfly.com/press/img/qq-group-1212.png" width="180"/>

<!-- ### 8. Star History

<picture>
  <source
    media="(prefers-color-scheme: dark)"
    srcset="
      https://api.star-history.com/svg?repos=novlan1/press-ui&type=Date&theme=dark
    "
  />
  <source
    media="(prefers-color-scheme: light)"
    srcset="
      https://api.star-history.com/svg?repos=novlan1/press-ui&type=Date
    "
  />
  <img
    alt="Star History Chart"
    src="https://api.star-history.com/svg?repos=novlan1/press-ui&type=Date"
    width="500"
  />
</picture> -->
