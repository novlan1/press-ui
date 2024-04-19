---
url : pages/press/q-r-code/q-r-code
---

## QRCode 二维码


## 引入

```ts
import PressQRCode from 'press-ui/press-q-r-code/press-q-r-code';

export default {
  components: {
    PressQRCode,
  }
}
```

`PressQRCode` 在微信小程序使用了 `weapp-qrcode-canvas-2d` 库，其他端使用了 `uqrcodejs`，请自行下载。

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

| 参数   | 说明                  | 类型     | 默认值 |
| ------ | --------------------- | -------- | ------ |
| value  | 二维码值              | _string_ | -      |
| size   | 二维码尺寸，单位 `px` | _number_ | `287`  |
| margin | 边框距离              | _number_ | `0`    |



### Events

| 事件名         | 说明     | 参数  |
| -------------- | -------- | ----- |
| result         | 生成成功 | `img` |
| longPressImage | 长按图片 | `img` |


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
