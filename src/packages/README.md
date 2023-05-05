
<div align="center">
  <img alt="logo" src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fpress-ui-avatar-transparent.png" width="150" style="margin-bottom: -25px;">
</div>
<h3 align="center">易用、灵活、基于uni-app的跨端组件库</h3>

---


<h2 style="border-bottom: 0">1. 介绍</h2>

press-ui是一套易用的、灵活的，基于uni-app的跨端组件库。



也可用于普通h5项目，需要加一个 [loader](https://github.com/novlan1/uni-plugin-light/tree/master/loader/ifdef-loader) 去掉条件编译部分。

文档地址在[这里](https://novlan1.github.io/press-ui/)。







## 1. 如何使用

1. 安装npm包


```bash
npm i press-ui
```


2. 在页面中正常引入并使用

比如 `message-detail` 组件：

```html
<template>
  <PressMessageDetail />
</template>
```

```ts
<script>
import PressMessageDetail from 'press-ui/press-message-detail/press-message-detail.vue'

export default {
  components: {
    PressMessageDetail, 
  }
}
</script>
```

3. 配置`vue.config.js`

注意，需要在`vue.config.js`中配置下 `transpileDependencies`：

```js
module.exports = {
  transpileDependencies: ['press-ui'],
}
```

## 2. 立即体验

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/qrcode/press-ui-demo-qrcode-3.png" width="600">



