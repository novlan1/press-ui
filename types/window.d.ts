declare interface Window {
  vConsole?: any;
  VConsole?: any;

  customBrowserInterface?: any;
  shareCallBack?: Function;
  setTitleButtonsCallback?: Function;

  msdkCallNative?: Function;
  msdkCall?: Function;
  setMsdkCallback?: Function;
  msdkAddNativeCallbackObserver?: Function;
  msdkRemoveNativeCallbackObserver?: Function;
  msdkCloseWebview?: Function;
  msdkiOSHandler?: Function;

  WeixinJSBridge: any;

  wx: any;
  html2canvas: any;
  msdkShare: any;
  WebViewJavascriptBridge?: any;
  msdkNativeCallback?: any;
  msdkShareDelegate?: any

  getCurrentPages?: any;
}

declare interface Document {
  attachEvent: any;
}
