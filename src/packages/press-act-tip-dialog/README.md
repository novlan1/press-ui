---
url : pages/press/act-tip-dialog/act-tip-dialog
---

## ActTipDialog 活动提示弹窗

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
import PressActTipDialog from 'src/packages/press-act-tip-dialog/press-act-tip-dialog.vue';
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

|       属性名        |    类型    |  默认值  |       说明       |
| :-----------------: | :--------: | :------: | :--------------: |
|        show         | _boolean_  | `false`  |   是否显示弹窗   |
|        title        |  _string_  | 温馨提示 |       标题       |
|       message       |  _string_  |    -     |       内容       |
| show-cancel-button  | _boolean_  |  `true`  | 是否显示取消按钮 |
| show-confirm-button | _boolean_  |  `true`  | 是否显示确认按钮 |
|    confirm-text     |  _string_  |   确定   |   确认按钮文案   |
|     cancel-text     |  _string_  |   取消   |   取消按钮文案   |
|       cancel        | _function_ |  `null`  |  点击取消的事件  |
|       confirm       | _function_ |  `null`  |  点击确认的事件  |


### Events

| 事件名  | 说明     | 参数 |
| ------- | -------- | ---- |
| confirm | 点击确认 | show |
| cancel  | 点击取消 | show |
