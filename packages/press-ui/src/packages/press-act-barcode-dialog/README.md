---
url : pages/act/act-barcode-dialog/act-barcode-dialog
---

## ActBarcodeDialog 核销码弹窗


## 引入

```ts
import PressActBarcodeDialog from 'press-ui/press-act-barcode-dialog/press-act-barcode-dialog';

export default {
  components: {
    PressActBarcodeDialog,
  }
}
```

## 代码演示

### 基础用法

```html
<PressActBarcodeDialog
  :show.sync="show"
  :url="url"
/>
```

```ts
export default {
  data() {
    return {
      show: true,
      url: 'https://www.qq.com',
    }
  }
}
```

## API

### Props

| 参数           | 说明                                            | 类型      | 默认值  |
| -------------- | ----------------------------------------------- | --------- | ------- |
| show           | 是否展示                                        | _boolean_ | `false` |
| url            | 条形码 url                                      | _String_  | -       |
| use-tip-class  | 是否使用 `tip-comp` 为前缀的类名                | _boolean_ | `false` |
| hide-tip-style | 是否隐藏 `@TIP_STYLE_NAME` 关键词编译时加的样式 | _boolean_ | `false` |

## 自定义样式

<custom-style />

