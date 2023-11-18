---
url : pages/act/act-get-award-dialog/act-get-award-dialog
horHeight: 450
---

## ActGetAwardDialog 恭喜获得弹窗


## 引入

```ts
import PressActGetAwardDialog from 'press-ui/press-act-get-award-dialog/press-act-get-award-dialog';

export default {
  components: {
    PressActGetAwardDialog,
  }
}
```

## 代码演示

### 基础用法

```html
<PressActGetAwardDialog
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


| 参数           | 说明                                            | 类型      | 默认值  |
| -------------- | ----------------------------------------------- | --------- | ------- |
| show           | show                                            | _boolean_ | `false` |
| show-subscribe | showSubscribe                                   | _boolean_ | `false` |
| will-subscribe | willSubscribe                                   | _boolean_ | `false` |
| props-data     | 组件数据                                        | _Object_  | -       |
| water          | water                                           | _Object_  | -       |
| use-tip-class  | 是否使用 `tip-comp` 为前缀的类名                | _boolean_ | `false` |
| hide-tip-style | 是否隐藏 `@TIP_STYLE_NAME` 关键词编译时加的样式 | _boolean_ | `false` |

### Events

| 事件名               | 说明               | 回调参数 |
| -------------------- | ------------------ | -------- |
| clickCloseButton     | 点击取消按钮       | -        |
| clickExchangeButton  | 点击确认按钮       |          |
| update:show          | 更新 show          | false    |
| update:willSubscribe | 更新 willSubscribe | checked  |

## 自定义样式

<custom-style />
