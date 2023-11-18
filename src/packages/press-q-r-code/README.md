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
      value: 'https://h5.igame.qq.com/pmd-mobile.support.press-ui.press-ui/',
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

| 事件名 | 说明     | 参数  |
| ------ | -------- | ----- |
| result | 生成成功 | `img` |


