
<!-- 复制到 docs 下的时候，去掉“查看文档”和“查看示例” -->
<div align="center">
  <a href="https://github.com/novlan1/press-ui">
    <img width="150" src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fpress-ui-avatar-transparent.png" style="margin-bottom: -25px;">
  </a>

  <br>

  [![node][node]][node-url]
  [![downloads][downloads]][downloads-url]
  ![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/press-ui)
  ![NPM License](https://img.shields.io/npm/l/press-ui)
  ![GitHub last commit](https://img.shields.io/github/last-commit/novlan1/press-ui)
  ![GitHub Created At](https://img.shields.io/github/created-at/novlan1/press-ui)

  <h1>Press UI</h1>
  <p>
    易用、灵活、基于 uni-app 的跨端组件库
  </p>
</div>

[查看文档](https://novlan1.github.io/press-ui/) | [查看示例](https://novlan1.github.io/press-ui/h5/)

### 1. 介绍

`Press UI` 的 Vue3 库，适用于非 `uni-app` 项目。

为方便 Vue3 开发者使用，将 `Press UI` 组件库进行了打包，使用者无需关心条件编译、CSS预处理器等。

### 2. 使用方式

将之前引用 `Press UI` 组件的路径，改成 `press-ui-next/es`。

```js
// press-ui 引用
import PressButton from 'press-ui/press-button/press-button';

// press-ui-next 引用
import PressButton from 'press-ui-next/es/press-button/press-button';
```

`press-ui-next` 打包后的组件是 `mjs` 文件，引用组件时不能再用 `.vue` 后缀。

```ts
// 错误
import PressButton from 'press-ui-next/es/press-dialog-plus/press-dialog-plus.vue';

// 正确
import PressButton from 'press-ui-next/es/press-dialog-plus/press-dialog-plus';
```

[node]: https://img.shields.io/node/v/press-ui
[node-url]: https://nodejs.org
[downloads]: https://img.shields.io/npm/dm/press-ui
[downloads-url]: https://npmcharts.com/compare/press-ui?minimal=true
