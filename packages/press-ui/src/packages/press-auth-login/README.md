---
url : pages/press/auth-login/auth-login
---

## AuthLogin 授权登录

展示授权登录面板，用户点击确认允许后继续流程。

## 引入

```ts
import PressAuthLogin from 'press-ui/press-auth-login/press-auth-login';

export default {
  components: {
    PressAuthLogin,
  }
}
```

## 代码演示

### 基础用法

```html
<PressAuthLogin
  v-if="show"
  :after-cancel="afterCancel"
  :after-confirm="afterConfirm"
/>
```

```ts
let that;

export default {
  data() {
    that = this;
    return {
      show: true,
    };
  },
  methods: {
    afterCancel() {
      that.onGTip('[afterCancel]');
      that.show = false;
    },
    afterConfirm() {
      that.onGTip('[afterConfirm]');
      that.show = false;
    },
  },
};
```

### 函数式调用

目前仅支持在 H5 端使用。

```ts
import PressAuthLogin from 'press-ui/press-auth-login/press-auth-login';
import { initH5Instance } from 'press-ui/common/component-handler/h5-handler';

let that;

export default {
  components: {
    PressAuthLogin,
  },
  data() {
    that = this;
    return {
    };
  },
  methods: {
    showFunctionalDialog() {
      initH5Instance(PressAuthLogin, 'press-auth-login', {
        isShowByFunction: true,
        afterCancel: this.afterCancel,
        afterConfirm: this.afterConfirm,
      });
    },
    afterCancel() {
      that.onGTip('[afterCancel]');
      that.show = false;
    },
    afterConfirm() {
      that.onGTip('[afterConfirm]');
      that.show = false;
    },
  },
};
```

## API

### Props

| 参数                | 说明                                          | 类型       | 默认值                                                                 |
| ------------------- | --------------------------------------------- | ---------- | ---------------------------------------------------------------------- |
| logo                | 图标                                          | _string_   | `https://image-1251917893.file.myqcloud.com/Esports/common/gamers.png` |
| tip-desc            | 描述文案                                      | _string_   | `授权登录获得更多服务`                                                 |
| btn-text            | 按钮文案                                      | _string_   | `授权登录`                                                             |
| validate-confirm    | 点击确认时的验证方法，返回 `false` 则不会关闭 | _function_ | -                                                                      |
| after-cancel        | 点击关闭图标的回调                            | _function_ | -                                                                      |
| after-confirm       | 点击确认按钮的回调                            | _function_ | -                                                                      |
| is-show-by-function | 是否为函数式调用                              | _boolean_  | `false`                                                                |
| use-tip-class       | 是否使用 `tip-comp` 为前缀的类名              | _boolean_  | `false`                                                                |


