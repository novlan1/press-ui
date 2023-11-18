---
url : pages/press/mobile-login/mobile-login
---

## MobileLogin 移动端登录

可用来选择QQ、微信登录，包含扫码登录、提示弹窗。

## 引入

```ts
import PressMobileLogin from 'press-ui/press-mobile-login/press-mobile-login';

export default {
  components: {
    PressMobileLogin,
  }
}
```

## 代码演示

### 基础用法

```html
<PressMobileLogin
  :loader="loaderUnity"
  :show-choose-dialog.sync="showChooseDialog"
  :show-scan-dialog.sync="showScanDialog"
  :show-tip-dialog.sync="showTipDialog"
  :current-url="currentUrl"
  :show-q-q="showQQ"
  :show-w-x="showWX"
  :scan-code-type="scanCodeType"
  @jumpToLoginWX="jumpToLoginWX"
  @jumpToLoginQQ="jumpToLoginQQ"
  @closeDialog="closeDialog"
/>
```

```ts
import { loaderUnity } from 't-comm/lib/loader/loader-unity';

export default {
  data() {
    let currentUrl = 'https://baidu.com';
    let showChooseDialog = false;
    // #ifdef H5
    currentUrl = document.location.href;
    showChooseDialog = true;
    // #endif

    return {
      loaderUnity,
      showChooseDialog,
      showScanDialog: false,
      showTipDialog: false,

      currentUrl,
      scanCodeType: 'WX',
      showQQ: true,
      showWX: true,
    };
  },
  methods: {
    jumpToLoginWX() {
      this.onTip('[jumpToLoginWX]');
      this.showChooseDialog = false;
      this.showScanDialog = true;
    },
    jumpToLoginQQ() {
      this.onTip('[jumpToLoginQQ]');
      this.showChooseDialog = false;
      this.showTipDialog = true;
    },
    closeDialog() {
      this.onTip('[closeDialog]');
    },
    showDialog() {
      this.showChooseDialog = true;
    },
    onTip(message) {
      // #ifndef H5
      this.onGTip(message);
      // #endif

      // #ifdef H5
      this.$toast({
        message,
        zIndex: 10000,
      });
      // #endif
    },
  },
};
```


## API

### Props


| 参数                  | 说明                          | 类型       | 默认值                                                                           |
| --------------------- | ----------------------------- | ---------- | -------------------------------------------------------------------------------- |
| show-q-q              | 是否显示 QQ                   | _boolean_  | `true`                                                                           |
| show-w-x              | 是否显示微信                  | _boolean_  | `true`                                                                           |
| current-url           | 当前 URL，会据此生成二维码    | _string_   | -                                                                                |
| loader                | 动态加载方法                  | _function_ | `null`                                                                           |
| show-choose-dialog    | 是否显示选择弹窗              | _boolean_  | `false`                                                                          |
| show-scan-dialog      | 是否显示扫描弹窗              | _boolean_  | `false`                                                                          |
| show-tip-dialog       | 是否显示提示弹窗              | _boolean_  | `false`                                                                          |
| destroyed-when-closed | 是否在关闭后销毁              | _boolean_  | `false`                                                                          |
| scan-code-type        | 扫码类型，可选值位 `WX`, `QQ` | _string_   | `WX`                                                                             |
| tip-title             | 提示弹窗标题                  | _string_   | `微信中不支持QQ区账号登录`                                                       |
| tip-image             | 提示弹窗图片                  | _string_   | `https://image-1251917893.file.myqcloud.com/tipcomm/public_dialog-img/wx-zy.jpg` |


### Events

| 事件名        | 说明         | 参数 |
| ------------- | ------------ | ---- |
| jumpToLoginQQ | 点击跳转QQ   | -    |
| jumpToLoginWX | 点击跳转微信 | -    |
| closeDialog   | 关闭弹窗     | -    |


### 规范

为减轻使用者负担，Press UI 中涉及到 `QQ`、`WX` 命名的 `props` 和 `event`，一律命名为 `QQ`、`WX`，不可以出现以下命名：

- qq
- Qq
- Wx
- wx

