<div align="center">
   <img alt="logo" src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fpress-ui-avatar-transparent.png" width="150" style=" margin-bottom: -25px;">
</div>
<h3 align="center">Easy-to-use, flexible, uni-app-based cross-end component library</h3>

---


<h2 style="border-bottom: 0">1. Introduction</h2>

press-ui is an easy-to-use, flexible, cross-end component library based on uni-app.


It can also be used in ordinary h5 projects, you need to add a [loader](https://github.com/novlan1/uni-plugin-light/tree/master/loader/ifdef-loader) to remove the conditional compilation part .



## 1. Development


### 1.1. Component development


```bash
npm run dev
# h5

npm run dev:mp-weixin
# WeChat applet

npm run dev:mp-qq
# qq applet
```

**Add a new component**

```bash
npm run new:comp
```

Then interactively input the English name, Chinese name and other content of the component.

### 1.2. Document development

```
npm run docs:dev
```

### 1.3. Documentation construction

```
npm run docs:build
```

### 1.4. Document deployment

You need to write the server address and password in .env.local:

```
HOST_NAME=xxx
HOST_PWD=xxx
```

Then execute:

```
npm run docs:deploy
```


### 1.7. Style Specification


BEM named CSS, refer to [this article](https://juejin.cn/post/7102980936232337445/).

The outermost structure is named `press-component-name`, such as `press-loading`.

## 2. Directory structure

```bash
- docs # document address
- plugin # [demo] Plugins used in the project
- script # script
- src
   - common # [demo] public content
   - packages # Package content released externally
   - pages # [demo] page content
   - static # [demo] static content
   - App.vue # [demo] application entry
   - main.js
   - pages.json
```





## 3. Try Now

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/qrcode/press-ui-demo-qrcode-3.png" width="600">




## 4. How to use

1. Install the npm package


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

3. Configure `vue.config.js`

Note that you need to configure `transpileDependencies` in `vue.config.js`:

```js
module.exports = {
   transpileDependencies: ['press-ui'],
}
```

## 5. rem unit

The unit currently used by some components is rem
-Advantage: the h5 end is better adapted and more suitable
- Disadvantage: Additional plug-ins are required for conversion on other ends such as applets


## 6. Component dependency minimum principle

Components should not rely on too many external public files and maintain independence