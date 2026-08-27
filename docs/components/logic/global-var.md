# Global Var

`document/window/body` 等全局变量在非 H5 下的 `polyfill`，适用于 `Vue3.x` 项目。非 H5 下 `hook` 了以下变量：

- document
- window
- location
- navigator
- localStorage
- sessionStorage

## 使用

```ts
import { globalVarVue3 } from 'press-ui/common/global-var/index';


globalVarVue3();
```

## 参数

```ts
export interface GlobalVarQuery {
  // webview 页面的路径
  // 默认 '/views/webview'
  webviewUrl?: string;

  // 是否对 webview 的 url 参数，进行 encodeURIComponent
  // 默认 true
  encodeURIComponentWebviewUrl?: boolean;

  // 是否在将 sessionStorage 的 polyfill 设为永久存储
  // 默认 false
  isSessionStoragePersist?: boolean;
}
```

