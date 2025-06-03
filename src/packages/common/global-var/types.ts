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


export interface GlobalThis {
  $window: Object,
  $location: Object,
  $navigator: Object,
  $localStorage: Object,
  $sessionStorage: Object,
  $document: Object,
}


export type GlobalVarVue3 = (options?: GlobalVarQuery) => {
  $window: any;
};
