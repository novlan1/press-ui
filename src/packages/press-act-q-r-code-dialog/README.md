---
url : pages/act/act-q-r-code-dialog/act-q-r-code-dialog
horHeight: 425
---

## ActQRCodeDialog 二维码弹窗


## 引入

```ts
import PressActQRCodeDialog from 'press-ui/press-act-q-r-code-dialog/press-act-q-r-code-dialog';

export default {
  components: {
    PressActQRCodeDialog,
  }
}
```

## 代码演示

### 基础用法

```html
<PressActQRCodeDialog
  :show.sync="show"
/>
```

```ts
export default {
  data() {
    return {
      show: true,
    }
  }
}
```

## API

### Props

| 参数           | 说明                                            | 类型      | 默认值                                                                                 |
| -------------- | ----------------------------------------------- | --------- | -------------------------------------------------------------------------------------- |
| show           | show                                            | _boolean_ | `false`                                                                                |
| url            | url                                             | _String_  | `null`                                                                                 |
| image          | image                                           | _String_  | `https://image-1251917893.file.myqcloud.com/2020/TIP-igame-H5/gh_9e4c56699893_258.jpg` |
| title          | title                                           | _String_  | `扫一扫二维码`                                                                         |
| use-tip-class  | 是否使用 `tip-comp` 为前缀的类名                | _boolean_ | `false`                                                                                |
| hide-tip-style | 是否隐藏 `@TIP_STYLE_NAME` 关键词编译时加的样式 | _boolean_ | `false`                                                                                |

### Events

| 事件名      | 说明        | 回调参数 |
| ----------- | ----------- | -------- |
| update:show | update:show | false    |

## 自定义样式

<custom-style />
