---
url : pages/press/barcode/barcode
---

## Barcode 条形码


## 引入

```ts
import PressBarcode from 'press-ui/press-barcode/press-barcode.vue';

export default {
  components: {
    PressBarcode,
  }
}
```

`PressBarcode` 在 `web` 端使用了 `vue-barcode` 库，请自行下载，非 `web` 端为修改 `jsbarcode` 源码后实现。

## 代码演示

### 基础用法

```html
<PressBarcode
  :value="value"
  :width="options.width"
  :height="options.height"
  :format="options.format"
  :font-size="options.fontSize"
/>
```

```ts
export default {
  data() {
    return {
      value: '123123123123',
      options: {
        width: 1,
        height: 50,
        fontSize: 12,
        format: 'CODE128',
      },
    }
  }
}
```

## API

### Props

| 参数         | 说明                             | 类型     | 默认值    |
| ------------ | -------------------------------- | -------- | --------- |
| value        | 条形码值                         | _string_ | -         |
| format       | 格式                             | _string_ | `CODE128` |
| width        | 条之间的宽度                     | _number_ | `0.6`     |
| height       | 高度                             | _number_ | `35`      |
| font-size    | 文本的大小                       | _number_ | `10`      |
| options      | 其他选项，默认值及含义见下方说明 | _object_ | -         |
| custom-style | 自定义样式                       | _string_ | -         |



### Events

| 事件名 | 说明     | 参数  |
| ------ | -------- | ----- |
| result | 生成成功 | `img` |


### format

条形码格式， 可选值有：code128, code39, ena13, ean8, upc, itf14

### options

options 默认值及说明

```ts
const DEFAULT_OPTIONS = {
  displayValue: true, // 是否在条形码下方显示文字
  textAlign: 'center', // 设置文本的水平对齐方式
  textPosition: 'bottom', // 设置文本的垂直位置
  textMargin: 2, // 设置条形码和文本之间的间距
  fontColor: '#000000', // 设置文本的颜色
  lineColor: '#000000', // 设置条形码的颜色
  background: '#FFFFFF', // 设置条形码的背景色
  margin: 3, // 设置条形码周围的空白边距
  marginTop: undefined, // 设置条形码周围的上边距
  marginBottom: undefined, // 设置条形码周围的下边距
  marginLeft: undefined, // 设置条形码周围的左边距
  marginRight: undefined, // 设置条形码周围的右边距
};
```

## 在线调试

<debug-online />
