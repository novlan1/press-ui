
<div align="center">
  <img alt="logo" src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fpress-ui-avatar-transparent.png" width="150" style="margin-bottom: -25px;">
</div>
<h3 align="center">易用、灵活、基于 uni-app 的跨端组件库</h3>

---

[查看文档](https://novlan1.github.io/press-ui/) | [查看示例](https://novlan1.github.io/press-ui-demo/)

### 1. 介绍

`Press UI`是一套易用的、灵活的，基于`uni-app`的跨端组件库。

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

同时，将项目中业务组件沉淀到`Press UI`中，有以下好处：

1. **减少业务和组件的耦合**，**降低各自复杂度**，并减少bug
2. **增强组件可维护性**，提升开发效率
    - 通过整理代码，合并属性，分离业务逻辑等，让组件变纯粹，增强可维护性，进而提升效率
3. **封装核心逻辑，控制变化**
    - 不用担心外部合作人员改乱代码，以及解决冲突时的覆盖问题
4. **UI问题定位简单**
    - 三端代码同时发布，以及多种类型的示例，覆盖面全，容易发现UI问题，以及三端表现不一致问题
5. 可提升性能
    - 通过示例中的自定义变量，可定位性能瓶颈，并解决性能问题
6. 提高可复用性，可应用到其他项目
7. 技术沉淀，技术积累，不断打磨组件细节

### 3. 应用场景

`Press UI`可应用于`uni-app`项目，或者普通的H5项目，同时支持 Vue2 和 Vue3。

目前已应用在王者赛宝、HoK Club、赛宝Pro、和平赛事、高能赛事、商户赛等项目中。

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/4/pvp-esports-screenshort.png" width="300">

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fhok-club-screenshot.gif" width="300">

<br/>

<!-- <img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/10/own_mike_fa5d34c18c86ae412c.jpg" width="300"> -->

<!-- <img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/10/own_mike_fb1530d4d6e351383c.jpg" width="300"> -->

<!-- <br/> -->

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fown_mike_2bfb54a9ad6b9bc0ff.gif" width="600">

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
<script>
import PressButton from 'press-ui/press-button/press-button.vue'

export default {
  components: {
    PressButton, 
  },
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


#### 4.2. uni_modules 方式

[插件市场](https://ext.dcloud.net.cn/plugin?id=18798)直接导入即可


### 5. 立即体验

下图是示例二维码，第一行分别为基于 `uni-app` 的 `Vue2.x` 版本的 H5、微信小程序、QQ小程序、支付宝小程序。

第二行分别为非 `uni-app` 环境的 `Vue2.x` 项目、基于 `uni-app` 的 `Vue3.x` 版本的H5、微信小程序，及 `Vue2.x` 版本的安卓项目。

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fpress-demo-cluster-2.gif" width="700">

