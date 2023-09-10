# 快速开始

`Press UI` 目前支持`n+1`端，`n`为`uni-app`提供的能力，包括H5、微信小程序、QQ小程序等，`1`为普通Vue项目。

## uni-app 项目

对于`uni-app`项目，`Press UI` 的使用方法如下。

1. 安装`npm`包


```bash
npm i press-ui
```


2. 在页面中正常引入并使用

比如 `message-detail` 组件：

```js
<template>
  <PressMessageDetail />
</template>
import PressMessageDetail from 'press-ui/press-message-detail/press-message-detail.vue'

export default {
  components: {
    PressMessageDetail, 
  }
}
```

3. 配置

注意，需要在`vue.config.js`中配置下 `transpileDependencies`：

```js
module.exports = {
  transpileDependencies: ['press-ui'],
}
```


## 普通Vue项目

`Press UI` 支持普通Vue项目，可扫描下面二维码体验。

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/8/own_mike_32e3f24500cdc9b1c0.png" width="300">

`Press UI` 组件比普通的组件多了以下内容：

1. 条件编译，跨平台的核心，普通Vue项目中可以用这个[loader](https://novlan1.github.io/uni-plugin-light/zh/loader/ifdef-loader.html)实现
2. `scroll-view`、`swiper`、`swiper-item`全局组件


所以，要在普通Vue项目中使用 `Press UI`，除了执行上面的步骤外，还需要做下面几个事情。

1. 安装 npm 包：

```bash
npm i uni-plugin-light -D
```

2. 在 `vue.config.js` 中添加如下设置：

```js
const IF_DEF_LOADER = 'uni-plugin-light/lib/loader/ifdef-loader';

module.export = {
  chainWebpack(config) {
    config.module
      .rule('ifdef-loader')
      // 根据项目实际配置文件类型
      .test(/press-ui.*(\.vue|\.ts|\.js|\.css|\.scss)$/)
      .use(IF_DEF_LOADER)
      .loader(IF_DEF_LOADER)
      .options({
        context: { H5: true },
        type: ['css', 'js', 'html'],
      })
      .end();
  }
}
```

3. 引入全局组件，可以直接使用`Press UI`封装好的方法。

```ts
// main.js
import { initPureAdapter } from 'press-ui/common/pure/adapter';

initPureAdapter();
```
