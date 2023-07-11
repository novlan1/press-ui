# 快速开始

## uni-app跨端项目

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


## 普通H5项目


`press-ui` 比普通的组件只是多了条件编译，所以加一个支持条件编译的`loader`就可以解决了，`loader`代码地址在[这里](https://github.com/novlan1/uni-plugin-light/tree/master/loader/ifdef-loader)。


`loader`使用方法如下：

1. 安装 npm 包：

```bash
npm i uni-plugin-light -D
```

2. 在 `vue.config.js` 中添加如下设置：

```js
const LOADER_IFDEF = 'uni-plugin-light/lib/loader/ifdef-loader';

module.export = {
  chainWebpack(config) {
    config.module
      .rule('ifdef-loader')
      // 根据项目实际配置文件类型
      .test(/press-ui.*(\.vue|\.ts|\.js|\.css|\.scss)$/)
      .use(LOADER_IFDEF)
      .loader(LOADER_IFDEF)
      .options({
        context: { H5: true },
        type: ['css', 'js', 'html'],
      })
      .end();
  }
}
```
