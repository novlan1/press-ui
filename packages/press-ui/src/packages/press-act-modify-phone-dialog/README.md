---
url : pages/act/act-modify-phone-dialog/act-modify-phone-dialog
---

## ActModifyPhoneDialog 修改手机号弹窗


## 引入

```ts
import PressActModifyPhoneDialog from 'press-ui/press-act-modify-phone-dialog/press-act-modify-phone-dialog';

export default {
  components: {
    PressActModifyPhoneDialog,
  }
}
```

## 代码演示

### 基础用法

```html
<PressActModifyPhoneDialog
  :show.sync="show"
  :is-disable-get-code="isDisableGetCode"
  @clickButton="clickButton"
  @clickGetCodeButton="clickGetCodeButton"
/>
```

```ts
export default {
  data() {
    return {
      show: true,
      isDisableGetCode: false,
    };
  },

  mounted() {
  },
  methods: {
    clickButton() {
      this.onGTip('[clickButton]');
    },
    clickGetCodeButton() {
      this.onGTip('[clickGetCodeButton]');
    },
  },
}
```

## API

### Props

| 参数                | 说明                                            | 类型      | 默认值       |
| ------------------- | ----------------------------------------------- | --------- | ------------ |
| show                | 是否显示弹窗                                    | _boolean_ | `false`      |
| phone               | 电话号码                                        | _String_  | ``           |
| code                | 验证码                                          | _String_  | ``           |
| title               | 弹窗标题                                        | _String_  | `修改手机号` |
| is-disable-get-code | 是否获取验证码                                  | _boolean_ | `false`      |
| get-code-text       | 获取验证码文案描述                              | _String_  | `获取验证码` |
| use-tip-class       | 是否使用 `tip-comp` 为前缀的类名                | _boolean_ | `false`      |
| hide-tip-style      | 是否隐藏 `@TIP_STYLE_NAME` 关键词编译时加的样式 | _boolean_ | `false`      |


### Events

| 事件名             | 说明           | 回调参数 |
| ------------------ | -------------- | -------- |
| clickCloseButton   | 点击关闭按钮   | -        |
| clickButton        | 点击主按钮     |          |
| clickGetCodeButton | 点击获取验证码 |          |

## 自定义样式

<custom-style />
