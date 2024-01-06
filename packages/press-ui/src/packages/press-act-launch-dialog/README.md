---
url : pages/act/act-launch-dialog/act-launch-dialog
---

## ActLaunchDialog 拉起弹窗


## 引入

```ts
import PressActLaunchDialog from 'press-ui/press-act-launch-dialog/press-act-launch-dialog';

export default {
  components: {
    PressActLaunchDialog,
  }
}
```

## 代码演示

### 基础用法


```html
<PressActLaunchDialog
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
| show           | 是否显示动效                                    | _boolean_ | `false` |
| title          | 即将拉起微信                                    | _String_  | `标题`  |
| use-tip-class  | 是否使用 `tip-comp` 为前缀的类名                | _boolean_ | `false` |
| hide-tip-style | 是否隐藏 `@TIP_STYLE_NAME` 关键词编译时加的样式 | _boolean_ | `false` |

### Events

| 事件名           | 说明         | 回调参数 |
| ---------------- | ------------ | -------- |
| clickCloseButton | 点击关闭按钮 | -        |

## 自定义样式

<custom-style />
