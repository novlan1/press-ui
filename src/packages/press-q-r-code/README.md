---
url : pages/press/q-r-code/q-r-code
---

## QRCode 二维码


## 引入

```ts
import PressQRCode from 'press-ui/press-q-r-code/press-q-r-code.vue';

export default {
  components: {
    PressQRCode,
  }
}
```

`PressQRCode` 使用了第三方库：

- H5 下 Vue2 使用 `vue-qrcode`，Vue3 使用 `qrcode.vue` 或者 `vue-qrcode`
- 微信小程序下，Vue2 和 Vue3 都使用 `weapp-qrcode-canvas-2d`
- 其他小程序及 APP 下都使用 `uqrcodejs`

## 代码演示

### 基础用法

```html
<PressQRCode
  :value="value"
  :size="size"
/>
```

```ts
export default {
  data() {
    return {
      value: 'https://novlan1.github.io/press-ui/',
      size: 200,
    }
  }
}
```

## API

### Props

| 参数                   | 说明                                                                                     | 类型      | 默认值  |
| ---------------------- | ---------------------------------------------------------------------------------------- | --------- | ------- |
| value                  | 二维码值                                                                                 | _string_  | -       |
| size                   | 二维码尺寸，单位 `px`                                                                    | _number_  | `287`   |
| margin                 | 边框距离                                                                                 | _number_  | `0`     |
| init-h5-attr           | H5 下，是否将 `size/margin` 传给三方库 `vue-qrcode` 或 `qrcode.vue`                      | _boolean_ | `false` |
| vue3-image             | Vue3 时，是否使用 `image` 模式，即转为 `image`，这时会将 `width/height` 设为父元素的宽高 | _boolean_ | `false` |
| use-vue-qrcode-in-vue3 | 是否在 vue3 时也使用 `vue-qrcode` 三方库                                                 | _boolean_ | `false` |
| wx-mp-padding          | 微信小程序下 `padding`，`-1`时会传递 `undefined`，表示用三方库默认值                     | _number_  | `-1`    |


### Events

| 事件名         | 说明     | 参数  |
| -------------- | -------- | ----- |
| result         | 生成成功 | `img` |
| longPressImage | 长按图片 | `img` |

### Inject

| 参数                     | 说明                                                                               | 类型      | 默认值  |
| ------------------------ | ---------------------------------------------------------------------------------- | --------- | ------- |
| globalUseVueQrcodeInVue3 | 同 `props` 中的 `use-vue-qrcode-in-vue3`，任意一个不为 `false` 时使用 `vue-qrcode` | _boolean_ | `false` |

## 在线调试

<debug-online />

## 常见问题

### 尺寸单位

由于使用了三方库，`size` 仅支持 `px` 单位，如果业务使用了 `rpx/rem` 等单位，可以自行转换成 `px` 后传入。

下面是一个例子：

```ts
const windowInfo = uni.getWindowInfo();
const cliWidth = systemInfo.windowWidth || 375;

if (this.isMPQQ) {
  this.qrSize = 4.76 * cliWidth / 10;
} else {
  // 目标是 238
  this.qrSize = 4.76 * 50 * (cliWidth / 375);
}
```

另外，`size` 不能为`0`，否则二维码将不能显示。
