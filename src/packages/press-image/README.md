---
url : pages/press/image/image
---

## Image 图片

增强版的 `img` 标签，提供多种图片填充模式，支持图片懒加载、加载中提示、加载失败提示。

## 引入

```ts
import PressImage from 'press-ui/press-image/press-image.vue';

export default {
  components: {
    PressImage,
  }
}
```

## 代码演示

### 基础用法

基础用法与原生 `img` 标签一致，可以设置 `src`、`width`、`height` 等原生属性。

```html
<PressImage
  src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/10/own_mike_356f9fd1f505c35fa6.jpg"
  width="100"
  height="100"
/>
```

### 模式

通过 `mode` 属性可以设置图片裁剪、缩放模式。

```html
<PressImage
  width="100"
  height="100"
  mode="aspectFit"
  :src="src"
/>
```

### 圆形图片

通过 `round` 属性可以设置图片变圆。

```html
<PressImage
  width="100"
  height="100"
  round
  :src="src"
/>
```
### 加载中提示

`Image` 组件提供了默认的加载中提示，支持通过 `loading` 插槽自定义内容。

```html
<PressImage :src="src">
  <template #loading>
    <PressLoading
      type="spinner"
      size="20"
    />
  </template>
</PressImage>
```

### 加载失败提示

`Image` 组件提供了默认的加载失败提示，支持通过 `error` 插槽自定义内容。

```html
<PressImage :src="src">
  <template #error>
    <span
      style="font-size: 14px;"
    >加载失败</span>
  </template>
</PressImage>
```


## API

### Props

| 参数                   | 说明                                                                                                | 类型               | 默认值        |
| ---------------------- | --------------------------------------------------------------------------------------------------- | ------------------ | ------------- |
| src                    | 图片地址                                                                                            | _string_           | -             |
| mode                   | 裁剪模式，与[微信小程序](https://developers.weixin.qq.com/miniprogram/dev/component/image.html)相同 | _string_           | `scaleToFill` |
| width                  | 宽度，单位任意，如果为数值，则为`px`单位                                                            | _string \| number_ | `300`         |
| height                 | 高度，单位任意，如果为数值，则为`px`单位                                                            | _string \| number_ | `225`         |
| round                  | 是否为圆形                                                                                          | _boolean_          | `false`       |
| radius                 | 圆角值，单位任意，如果为数值，则为`px`单位                                                          | _number_           | `0`           |
| lazy-load              | 是否懒加载，仅微信小程序、App、百度小程序、字节跳动小程序有效                                       | _boolean_          | `false`       |
| show-menu-by-longpress | 是否开启长按图片显示识别小程序码菜单，仅微信小程序有效                                              | _boolean_          | `false`       |
| loading-icon           | 加载中的图标，或者小图片                                                                            | _string_           | `photo`       |
| error-icon             | 加载失败的图标，或者小图片                                                                          | _string_           | `photo-fail`  |
| show-loading           | 是否显示加载中的图标，或者自定义的`slot`                                                            | _boolean_          | `true`        |
| show-error             | 是否显示加载错误的图标，或者自定义的`slot`                                                          | _boolean_          | `true`        |
| fade                   | 是否需要淡入效果                                                                                    | _boolean_          | `true`        |
| webp                   | 只支持网络资源，只对微信小程序有效                                                                  | _boolean_          | `false`       |
| duration               | 搭配`fade`参数的过渡时间，单位`ms`                                                                  | _number_           | `500`         |
| background-color       | 背景颜色，用于深色页面加载图片时，为了和背景色融合                                                  | _string_           | `#f3f4f6`     |
| custom-style           | 自定义样式                                                                                          | _string_           | -             |



### Events

| 事件名 | 说明               | 参数 |
| ------ | ------------------ | ---- |
| click  | 点击图片时触发     | -    |
| error  | 图片加载失败时触发 | -    |
| load   | 图片加载成功时触发 | -    |

## 在线调试

<debug-online />
