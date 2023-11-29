---
url : pages/press/bind-login/bind-login
---

## BindLogin 绑定登录


## 引入

```ts
import PressBindLogin from 'press-ui/press-bind-login/press-bind-login';

export default {
  components: {
    PressBindLogin,
  }
}
```

## 代码演示

### 基础用法

```html
<PressBindLogin
  v-if="show"
  :name="name"
  :description="description"
  :agreement-name="agreementName"
  :next-agreement-name="nextAgreementName"
  :show-next-agreement="showNextAgreement"
  @onCancel="show = false"
  @openAgreement="openAgreement"
  @openNextAgreement="openNextAgreement"
  @clickQQLogin="clickQQLogin"
  @clickWXLogin="clickWXLogin"
/>
```

```ts
export default {
  data() {
    let show = false;
    // #ifdef H5
    show = true;
    // #endif

    return {
      show,
      name: 'Press UI',
      description: 'Press UI 是一套 Vue 组件库，支持基础 uni-app 的 H5、微信小程序、QQ小程序、APP，支持非 uni-app 的普通 H5 项目，并兼容 Vue2 和 Vue3',
      agreementName: 'Press UI 使用协议',
      nextAgreementName: 'Press UI 隐私协议',
      showNextAgreement: true,
    };
  },
  methods: {
    showDialog() {
      this.show = true;
    },
    openAgreement() {
      this.onGTip('[openAgreement]');
    },
    openNextAgreement() {
      this.onGTip('[openNextAgreement]');
    },
    clickQQLogin() {
      this.onGTip('[clickQQLogin]');
    },
    clickWXLogin() {
      this.onGTip('[clickWXLogin]');
    },
  },
};
```

## API

### Props

| 参数                | 说明                             | 类型      | 默认值                                                        |
| ------------------- | -------------------------------- | --------- | ------------------------------------------------------------- |
| title               | 标题                             | _string_  | `绑定游戏账号`                                                |
| logo                | 图片                             | _string_  | `https://image-1251917893.file.myqcloud.com/live/tg-logo.png` |
| name                | 名称                             | _string_  | -                                                             |
| description         | 描述                             | _string_  | -                                                             |
| show-q-q            | 是否显示QQ登录                   | _boolean_ | `true`                                                        |
| show-w-x            | 是否显示微信登录                 | _boolean_ | `true`                                                        |
| agreement-name      | 协议名称                         | _string_  | `用户协议`                                                    |
| show-next-agreement | 是否展示另一个协议               | _boolean_ | `false`                                                       |
| next-agreement-name | 另一个协议名称                   | _string_  | -                                                             |
| use-tip-class       | 是否使用 `tip-comp` 为前缀的类名 | _boolean_ | `false`                                                       |



### Events


| 事件名            | 说明           | 参数 |
| ----------------- | -------------- | ---- |
| clickQQLogin      | 点击QQ登录     | -    |
| clickWXLogin      | 点击微信登录   | -    |
| onCancel          | 弹窗关闭       | -    |
| openAgreement     | 点击协议       | -    |
| openNextAgreement | 点击另一个协议 | -    |





