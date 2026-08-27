# 快速开始

`Press UI` 可看作 `Vant` 组件库的超集。

`Press UI` 目前支持 `n + 1` 端，`n` 为 `uni-app` 提供的能力，包括H5、微信小程序、QQ小程序等，`1` 为普通 Vue 项目，并且同时兼容 Vue2 和 Vue3。

## 1. Vue3 的 uni-app 项目

对于 Vue3 版本的 `uni-app` 项目，`Press UI` 的使用方法如下。

### 1.1. npm 模式

1. 安装`npm`包

```bash
npm i press-ui
```

2. 在页面中引入并使用

比如 `button` 组件：

```vue
<template>
  <PressButton>
    按钮
  </PressButton>
</template>

<script lang="ts" setup>
import PressButton from 'press-ui/press-button/press-button.vue'
</script>
```

[点此查看](https://github.com/novlan1/press-ui-demo-vue3-uni/) Vue3 的 uni-app 示例项目。

### 1.2. uni_modules 方式

[插件市场](https://ext.dcloud.net.cn/plugin?id=18798)直接导入即可


## 2. Vue2 的 uni-app 项目

对于 Vue2 版本的 `uni-app` 项目，`Press UI` 的使用方法如下。

### 2.1. npm 模式

1. 安装`npm`包

```bash
npm i press-ui
```

2. 在页面中引入并使用

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

[点此查看](https://github.com/novlan1/press-ui-demo-vue2-uni/) Vue2 的 uni-app 示例项目。

### 2.2. uni_modules 方式

[插件市场](https://ext.dcloud.net.cn/plugin?id=18798)直接导入即可

## 3. 普通 Vue3 项目

与 `uni-app` & `Vue3` 项目使用方式相似，只是需要多使用一个 `Vite` 版本的[条件编译插件](https://novlan1.github.io/docs/plugin-light/zh/vite-plugin-ifdef.html)，使用方式如下。

```bash
npm i @plugin-light/vite-plugin-ifdef -D
```

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import { ifdefVitePlugin } from '@plugin-light/vite-plugin-ifdef';

export default defineConfig({
  plugins: [
    ifdefVitePlugin({
      context: { H5: true, VUE3: true },
      type: ['css', 'js', 'html'],
    })
  ],
});
```

## 4. 普通 Vue2 项目

与 `uni-app` & `Vue2` 项目使用方式相似，只是需要多使用一个 `Webpack` 版本的[条件编译工具](https://novlan1.github.io/docs/plugin-light/zh/webpack-loader-ifdef.html)，使用方式如下。

```bash
npm i @plugin-light/webpack-loader-ifdef -D
```

```js
// vue.config.js

const IF_DEF_LOADER = '@plugin-light/webpack-loader-ifdef';

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

[点此查看](https://github.com/novlan1/press-ui-demo-vue2-pure) Vue2 非 uni-app 的示例项目。
