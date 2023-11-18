---
url : pages/act/act-input-phone-dialog/act-input-phone-dialog
---

## ActInputPhoneDialog 填写手机号弹窗


## 引入

```ts
import PressActInputPhoneDialog from 'press-ui/press-act-input-phone-dialog/press-act-input-phone-dialog';

export default {
  components: {
    PressActInputPhoneDialog,
  }
}
```

## 代码演示

### 基础用法

```html
<PressActInputPhoneDialog
  :show.sync="show"
  :phone.sync="inputPhone"
  :is-agree-protocol.sync="isAgreeProtocol"
  :code.sync="code"
  :need-phone-check="true"
  protocol-name="Press UI 协议"
  @clickButton="onclickButton"
  @clickProtocol="onClickProtocol"
  @clickUserProtocol="onClickUserProtocol"
  @clickCloseButton="closeGetTaskRewardDialog"
/>
```

## API

### Props


| 参数               | 说明                                            | 类型      | 默认值                           |
| ------------------ | ----------------------------------------------- | --------- | -------------------------------- |
| show               | 是否展示弹窗                                    | _boolean_ | `false`                          |
| phone              | 手机号码                                        | _String_  | -                                |
| code               | 手机号码                                        | _String_  | -                                |
| need-phone-check   | 是否需要验证手机号合法性                        | _boolean_ | `false`                          |
| remark             | 兑换说明                                        | _String_  | `请填写手机号，将兑换到对应账号` |
| title              | 弹窗标题                                        | _String_  | `填写手机号码`                   |
| protocol-name      | 协议名称                                        | _String_  | -                                |
| user-protocol-name | 用户协议名称                                    | _String_  | -                                |
| is-agree-protocol  | 是否选中协议                                    | _boolean_ | `false`                          |
| use-tip-class      | 是否使用 `tip-comp` 为前缀的类名                | _boolean_ | `false`                          |
| hide-tip-style     | 是否隐藏 `@TIP_STYLE_NAME` 关键词编译时加的样式 | _boolean_ | `false`                          |



### Events

| 事件名                 | 说明             | 回调参数         |
| ---------------------- | ---------------- | ---------------- |
| clickCloseButton       | 点击关闭图标     | -                |
| clickButton            | 点击主按钮       | -                |
| clickProtocol          | 点击协议         | -                |
| clickUserProtocol      | 点击用户协议     | -                |
| update:show            | 更新展示状态     | `show`           |
| update:isAgreeProtocol | 更新是否同意协议 | `checked`        |
| update:phone           | 更新手机号       | `e.target.value` |

## 自定义样式

<custom-style />
