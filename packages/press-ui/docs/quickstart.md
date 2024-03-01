# 快速开始

`Press UI` 目前支持`n+1`端，`n`为`uni-app`提供的能力，包括H5、微信小程序、QQ小程序等，`1`为普通 Vue 项目。并且同时兼容 Vue2 和 Vue3。

## 1. Vue2 的 uni-app 项目

对于 Vue2 的 `uni-app` 项目，`Press UI` 的使用方法如下。

1. 安装`npm`包


```bash
npm i press-ui
```


2. 在页面中正常引入并使用

比如 `button` 组件：

```vue
<template>
  <PressButton>
    按钮
  </PressButton>
</template>
<script>
import PressButton from 'press-ui/press-button/press-button.vue'

export default {
  components: {
    PressButton, 
  }
}
</script>
```

3. 配置

注意，需要在 `vue.config.js` 中配置下 `transpileDependencies`：

```js
module.exports = {
  transpileDependencies: ['press-ui'],
}
```


## 2. 普通 Vue2 项目

`Press UI` 支持非 `uni-app` 的普通 Vue 项目。

`Press UI` 组件比普通的组件多了以下内容：

1. 条件编译，跨平台的核心，普通 Vue 项目中可以用这个 [loader](https://novlan1.github.io/uni-plugin-light/zh/loader/ifdef-loader.html) 实现
2. `scroll-view`、`swiper`、`swiper-item` 等全局组件


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

3. 引入全局组件，可以直接使用 `Press UI` 封装好的方法。

```ts
// main.js
import { initPureAdapter } from 'press-ui/common/pure/adapter';

initPureAdapter();
```

此外，针对非 `uni-app` 环境的 Vue 项目，在函数式调用组件时，需要传入 `context: this`，比如：

```ts
import { imagePreview } from 'press-ui/press-image-preview/index';

export default {
  methods: {
    show() {
      imagePreview({
        context: this,
        selector: `#${FUNCTIONAL_ID_MAP.IMAGE_PREVIEW}`,
        images: this.images,
      })
    }
  }
}
```

`Press UI` 支持函数式调用的组件有：

- [popup](./components/press/press-popup.html)
- [toast](./components/press/press-toast.html)
- [picker](./components/press/press-picker.html)
- [datetime-picker](./components/press/press-datetime-picker.html)
- [dialog](./components/press/press-dialog.html)
- [dialog-plus](./components/press/press-dialog-plus.html)
- [image-view](./components/press/press-image-view.html)
- [popup-cell](./components/press/press-popup-cell.html)


## 3. Vue3 的 uni-app 项目

`Press UI` 支持 Vue3 项目。

对于 Vue3 的 `uni-app` 项目，在函数式调用组件时，需传入`ref`，而非`id`。

之前：

```html
<press-popup
  :id="PRESS_PICKER_ID"
  mode="functional"
>
 xxx
</press-popup>
```

现在：

```html
<press-popup
  :ref="PRESS_PICKER_ID"
  mode="functional"
>
  xxx
</press-popup>
```

## 4. 普通 Vue3 项目

Vite 中不支持 `transpileDependencies` 选项，`Press UI` 提供了两种方案：

1. 直接使用编译后的包 `press-ui-vue3`
2. 拷贝 `node_modules/press-ui` 的代码到 `src` 某目录下， 并配置 `alias` 指向该目录

第1种方式的好处是，对于只用于 `Vue3` 项目的开发者来说，使用成本低，心智负担小。缺点是使用了 `Press UI` 的组件（比如 `Press Plus` 中的组件），如果也想兼容 `Vue2` 和 `Vue3` 的话，需要添加条件编译，另外，组件库更新频繁的也比较麻烦。

第2种方式符合 `transpileDependencies` 的本意，即然作为源码来编译，那就直接放到源码位置即可。这种处理方式的好处是，不用处理之前的组件，比如 `Press Plus` 组件。

这里提供了一个 [Vite 插件](https://novlan1.github.io/uni-plugin-light/zh/vite/alias-for-library.html)，可以自动化的进行拷贝。
