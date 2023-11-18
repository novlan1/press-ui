---
url : pages/act/act-tip-dialog/act-tip-dialog
---

## ActTipDialog 活动提示弹窗

## 引入

```ts
import PressActTipDialog from 'press-ui/press-act-tip-dialog/press-act-tip-dialog';

export default {
  components: {
    PressActTipDialog,
  }
}
```

## 代码演示

### 基础用法

**示例**

```html
<PressActTipDialog
  :show="show"
  :title="title"
  :message="message"
  :show-cancel-button="showCancelButton"
  :show-confirm-button="showConfirmButton"
  :cancel-button-text="cancelButtonText"
  :confirm-button-text="confirmButtonText"
  @confirm="confirm"
  @cancel="cancel"
/>
```

```js
import PressActTipDialog from 'press-ui/press-act-tip-dialog/press-act-tip-dialog.vue';
export default {
  components: {
    PressActTipDialog,
  },
  data() {
    return {
      show: false,
      title: 'title',
      message: 'message',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'cancel',
      confirmButtonText: 'confirm',
    };
  },
  methods: {
    cancel(show) {
      this.show = !show;
    },
    confirm(show) {
      this.show = !show;
    },
  }
};
```

## API

### Props

| 参数                | 说明             | 类型       | 默认值   |
| ------------------- | ---------------- | ---------- | -------- |
| show                | 是否显示弹窗     | _boolean_  | `false`  |
| title               | 标题             | _string_   | 温馨提示 |
| message             | 内容             | _string_   | -        |
| show-cancel-button  | 是否显示取消按钮 | _boolean_  | `true`   |
| show-confirm-button | 是否显示确认按钮 | _boolean_  | `true`   |
| confirm-text        | 确认按钮文案     | _string_   | 确定     |
| cancel-text         | 取消按钮文案     | _string_   | 取消     |
| cancel              | 点击取消的事件   | _function_ | `null`   |
| confirm             | 点击确认的事件   | _function_ | `null`   |


### Events

| 事件名  | 说明     | 参数 |
| ------- | -------- | ---- |
| confirm | 点击确认 | show |
| cancel  | 点击取消 | show |

## 自定义样式

<custom-style />
