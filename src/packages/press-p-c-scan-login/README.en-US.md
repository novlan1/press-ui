---
url: pages/press/p-c-scan-login/p-c-scan-login
---

## PCScanLogin

Scan the QR code to log in to the pop-up window.

## Introduction

```ts
import PressPCScanLogin from 'press-ui/press-p-c-scan-login/press-p-c-scan-login';

export default {
   components: {
     PressPCScanLogin,
   }
}
```

## Code Demo

### Basic usage

`url` is the `redirect_uri` parameter passed to `window.WxLogin`, which needs to be passed in advance `encodeURIComponent`.

When `loader` is passed in, the `wx sdk` file will be dynamically loaded, otherwise `window.WxLogin` will be called directly. The corresponding scenario is that it has been loaded in advance in html.

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
     let url = 'https://baidu.com';
     // #ifdef H5
     show = true;
     url = document.location.href;
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

| Parameters            | Description                    | Type       | Default value  |
| --------------------- | ------------------------------ | ---------- | -------------- |
| show                  | Whether to display             | _boolean_  | `false`        |
| url                   | Redirect URL                   | _string_   | -              |
| title                 | title                          | _string_   | `WeChat login` |
| destroyed-when-closed | Whether to destroy when closed | _boolean_  | `false`        |
| loader                | dynamic loading method         | _function_ | -              |
| wxLoginConfig         | Login parameters               | _object_   | -              |


### wxLoginConfig

`wxLoginConfig` default parameters:

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

For detailed parameters, please refer to [WeChat Open Platform Document](https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html).