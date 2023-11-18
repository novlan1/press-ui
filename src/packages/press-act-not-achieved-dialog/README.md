---
url : pages/act/act-not-achieved-dialog/act-not-achieved-dialog
---

## ActNotAchievedDialog 领取失败弹窗


## 引入

```ts
import PressActNotAchievedDialog from 'press-ui/press-act-not-achieved-dialog/press-act-not-achieved-dialog';

export default {
  components: {
    PressActNotAchievedDialog,
  }
}
```

## 代码演示

### 基础用法

```html
<PressActNotAchievedDialog
  :show.sync="show"
/>
```

## API

### Props


| 参数           | 说明                                            | 类型      | 默认值  |
| -------------- | ----------------------------------------------- | --------- | ------- |
| show           | 是否展示弹窗                                    | _boolean_ | `false` |
| props-data     | 组件数据                                        | _Object_  | -       |
| use-tip-class  | 是否使用 `tip-comp` 为前缀的类名                | _boolean_ | `false` |
| hide-tip-style | 是否隐藏 `@TIP_STYLE_NAME` 关键词编译时加的样式 | _boolean_ | `false` |

### Events

| 事件名           | 说明       | 回调参数 |
| ---------------- | ---------- | -------- |
| clickCloseButton | 点击关闭   |          |
| clickButton      | 点击主按钮 |          |

## 自定义样式

<custom-style />
