/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
declare let __VUE__: any;
declare let Vue: any;
declare let weex: any;

declare let tt: any;
declare let qa: any;
declare let swan: any;
declare let qq: any;
declare let ks: any;
declare let jd: any;
declare let xhs: any;
declare let __NVUE__: undefined | boolean;
declare let __PLATFORM__: UniApp.PLATFORM;
declare let __PLATFORM_PREFIX__:
| 'wx'
| 'qq'
| 'my'
| 'swan'
| 'tt'
| 'qa'
| 'ks'
| 'jd'
| 'xhs';
declare let __GLOBAL__: Record<string, any>;

// importMeta(es|cjs)
declare let __IMPORT_META_ENV_BASE_URL__:
| 'import.meta.env.BASE_URL'
| '__IMPORT_META_ENV_BASE_URL__';

// Global compile-time constants
declare let __X__: boolean;
declare let __DEV__: boolean;
declare let __TEST__: boolean;
declare let __NODE_JS__: boolean;
declare let __APP_VIEW__: boolean;
declare let __PLUS__: boolean;

// Feature flags
declare let __VUE_OPTIONS_API__: boolean;
declare let __VUE_PROD_DEVTOOLS__: boolean;

declare let __UNI_FEATURE_WX__: boolean;
declare let __UNI_FEATURE_WXS__: boolean;
declare let __UNI_FEATURE_RPX__: boolean;
declare let __UNI_FEATURE_NVUE__: boolean;
declare let __UNI_FEATURE_PROMISE__: boolean;
declare let __UNI_FEATURE_LONGPRESS__: boolean;
declare let __UNI_FEATURE_ROUTER_MODE__: 'hash' | 'history';
declare let __UNI_FEATURE_UNI_CLOUD__: boolean;

declare let __UNI_FEATURE_PAGES__: boolean;
declare let __UNI_FEATURE_TABBAR__: boolean;
declare let __UNI_FEATURE_TABBAR_MIDBUTTON__: boolean;
declare let __UNI_FEATURE_TOPWINDOW__: boolean;
declare let __UNI_FEATURE_LEFTWINDOW__: boolean;
declare let __UNI_FEATURE_RIGHTWINDOW__: boolean;
declare let __UNI_FEATURE_RESPONSIVE__: boolean;
declare let __UNI_FEATURE_PULL_DOWN_REFRESH__: boolean;
declare let __UNI_FEATURE_NAVIGATIONBAR__: boolean;
declare let __UNI_FEATURE_NAVIGATIONBAR_BUTTONS__: boolean;
declare let __UNI_FEATURE_NAVIGATIONBAR_SEARCHINPUT__: boolean;
declare let __UNI_FEATURE_NAVIGATIONBAR_TRANSPARENT__: boolean;
declare let __UNI_FEATURE_I18N_LOCALE__: boolean;
declare let __UNI_FEATURE_I18N_EN__: boolean;
declare let __UNI_FEATURE_I18N_ES__: boolean;
declare let __UNI_FEATURE_I18N_FR__: boolean;
declare let __UNI_FEATURE_I18N_ZH_HANS__: boolean;
declare let __UNI_FEATURE_I18N_ZH_HANT__: boolean;
// TODO
declare let __uniRoutes: UniApp.UniRoutes;
declare let __uniConfig: UniApp.UniConfig;
declare let UniViewJSBridge: UniApp.UniViewJSBridge;
declare let UniServiceJSBridge: UniApp.UniServiceJSBridge;
// app view
declare let __id__: string;
// TODO X 引入真实类型
declare class UTSJSONObject {
  constructor(obj: Record<string, any>);
}
// 解决 test-dts 使用了小程序的Require导致编译器require.resolve,require.cache报错
interface Require {
  resolve: NodeRequire['resolve']
  cache: NodeRequire['cache']
}
