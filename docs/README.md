
<div align="center">
  <img alt="logo" src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fpress-ui-avatar-transparent.png" width="150" style="margin-bottom: -25px;">
</div>
<h3 align="center">易用、灵活、基于uni-app的跨端组件库</h3>

---


### 1. 介绍

`press-ui`是一套易用的、灵活的，基于`uni-app`的跨端组件库。


可用于普通`h5`项目，只需加一个 [loader](https://github.com/novlan1/uni-plugin-light/tree/master/loader/ifdef-loader) 去掉条件编译部分。



### 2. 如何使用

1. 安装`npm`包


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

3. 配置

需要在`vue.config.js`中配置下 `transpileDependencies`：

```js
module.exports = {
  transpileDependencies: ['press-ui'],
}
```



### 3. 立即体验

下图是三端示例二维码：

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/qrcode/press-ui-demo-qrcode-3.png" width="600">


### 4. 目录结构

```bash
- docs            # 文档地址
- plugin          # [demo]工程用到的插件
- script          # 脚本
- src
  - common        # [demo]公共内容
  - packages      # 对外发布的包内容
  - pages         # [demo]页面内容
  - static        # [demo]静态内容
  - App.vue       # [demo]应用入口
  - main.js
  - pages.json
```

### 5. 开发

首先要执行如下命令，进行组件的派发：

```bash
npm run init
```

#### 5.1. 组件开发


```bash
npm run dev
# h5

npm run dev:mp-weixin
# 微信小程序

npm run dev:mp-qq
# qq小程序
```



#### 5.2. 文档开发

文档开发命令：

```bash
npm run docs:dev
```

文档构建命令：

```bash
npm run docs:build
```

文档部署时，需要在`.env.local`中写入服务器地址和密码：

```
HOST_NAME=xxx
HOST_PWD=xxx
```

然后执行：

```
npm run docs:deploy
```

#### 5.3. 新增组件

执行以下命令：

```bash
npm run new:comp
```

然后交互式的输入组件英文名、中文名等内容即可。
#### 5.4. 样式规范


BEM方式命名CSS，参考[这篇文章](https://juejin.cn/post/7102980936232337445)。

最外层结构命名为`press-组件名称`，如`press-loading`。




### 6. rem单位

目前有的组件使用的单位是`rem`
- 优势：h5端适配更好，更合适
- 劣势：在小程序等其他端需要额外的插件来转换


