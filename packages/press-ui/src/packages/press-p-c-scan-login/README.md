---
url : pages/press/p-c-scan-login/p-c-scan-login
---

## PCScanLogin PC扫码登录

扫码登录弹窗。

## 引入

```ts
import PressPCScanLogin from 'press-ui/press-p-c-scan-login/press-p-c-scan-login';

export default {
  components: {
    PressPCScanLogin,
  }
}
```

## 代码演示

### 基础用法

`url` 为传给 `window.WxLogin` 的 `redirect_uri` 参数，传入时需提前 `encodeURIComponent`。

当传入 `loader` 时，会动态加载 `wx sdk` 文件，否则会直接调用 `window.WxLogin`，对应场景为，在html中已提前加载好。

```html
<PressPCScanLogin
  :show.sync="show"
  :url="url"
  :loader="loader"
/>
```

```ts
import { loaderUnity } from 't-comm/lib/loader/loader-unity';

export default {
  data() {
    let show = false;
    const url = 'https://igame.qq.com';
    // #ifdef H5
    show =  true;
    // #endif

    return {
      show,
      loader: loaderUnity,
      url: encodeURIComponent(`https://igame.qq.com/prod/pmdtrpc.commcgi.user.user/QueryUserInfo?_ltype=tiploginwxpc&_jumpurl=${encodeURIComponent(url)}`),
    };
  },
  methods: {
    showDialog() {
      this.show = true;
    },
  },
};
```

## API

### Props

| 参数                  | 说明                             | 类型       | 默认值     |
| --------------------- | -------------------------------- | ---------- | ---------- |
| show                  | 是否显示                         | _boolean_  | `false`    |
| url                   | 重定向URL                        | _string_   | -          |
| title                 | 标题                             | _string_   | `微信登录` |
| destroyed-when-closed | 是否在关闭时销毁                 | _boolean_  | `false`    |
| loader                | 动态加载方法                     | _function_ | -          |
| wx-login-config       | 登录参数                         | _object_   | -          |
| use-tip-class         | 是否使用 `tip-comp` 为前缀的类名 | _boolean_  | `false`    |


### wxLoginConfig

`wxLoginConfig` 默认参数：

```ts
{
  id: 'login_container',
  self_redirect: false,
  appid: 'wx224053afb6d8a600',
  scope: 'snsapi_login',
  redirect_uri: this.url, 
  state: '7a6d6ed5589082dd6c41d64d5206b064',
  style: 'black',
  href: 'https://image-1251917893.file.myqcloud.com/igame-admin/weixinlogin.css',
}
```

详细参数可以参考[微信开放平台文档](https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html)。

