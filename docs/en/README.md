<div align="center">
   <img alt="logo" src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fpress-ui-avatar-transparent.png" width="150" style=" margin-bottom: -25px;">
</div>
<h3 align="center">Easy-to-use, flexible, uni-app-based cross-end component library</h3>

---

### 1 Introduction

`press-ui` is an easy-to-use, flexible, cross-end component library based on `uni-app`.


- 70+ basic components, covering mainstream mobile scenarios
- Support H5, WeChat applet, QQ applet based on `uni-app`
- Support common H5 items
- Zero external dependencies, no third-party npm packages
- Provide rich Chinese and English documents and component examples
- Support theme customization, built-in 600+ theme variables
- Support internationalization, built-in 16+ language packs


### 2. Solve pain points


`press-ui` mainly solves the following pain points:

1. Can support the smooth migration of H5 projects containing `vant` to `uni-app` projects, only need to change the reference address and component name.
2. Rich component types and easy-to-use API make `uni-app` development easy.
3. Support internationalization, theme customization, etc., more flexible components


At the same time, depositing business components in the project into `press-ui` has the following benefits:


- Enhance maintainability and improve development efficiency
   - Make components pure, enhance maintainability, and improve efficiency by organizing code, merging attributes, separating business logic, etc.
- Reduce the coupling of business and components, reduce their respective complexity, and reduce bugs
- Encapsulate core logic and control changes
   - Don't worry about external collaborators modifying the code and overwriting problems when resolving conflicts
- UI problem location is simple
   - The codes of the three terminals are released at the same time, as well as various types of examples, with full coverage, easy to find ui problems, and inconsistent performance of the three terminals
- can improve performance
   - Locate performance bottlenecks and solve performance problems by customizing variables such as the number of teams
- Improves reusability and can be applied to other projects
- Technology precipitation, technology accumulation, and continuous polishing of component details


### 3. Application scenarios

`press-ui` can be applied to `uni-app` projects, or ordinary H5 projects, and has been applied to projects such as Wangwang Saibao, HoK Club, Saibao pro and so on.

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/4/pvp-esports-screenshort.png" width="300">


<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/4/hok-club-screenshot.png" width="300">



### 4. How to use

1. Install `npm` package


```bash
npm i press-ui
```


2. Introduce and use normally in the page

For example the `message-detail` component:

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

3. Configuration

You need to configure `transpileDependencies` in `vue.config.js`:

```js
module.exports = {
   transpileDependencies: ['press-ui'],
}
```



### 5. Try Now

The following figure is an example QR code with three terminals:

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/qrcode/press-ui-demo-qrcode-3.png" width="600">

### 6. Contribution Guidelines

Check it out [here](https://github.com/novlan1/press-ui/blob/release/CONTRIBUTING.md).
