import { reactive, computed } from 'vue';

import { getCurUrl, refreshCurrentPage } from './helper';


/**
 * 小程序下劫持 window/location 等
 * @param params
 * @param params.webviewUrl webview 路由
 * @param params.encodeURIComponentWebviewUrl webview query 参数是否使用 encodeURIComponent
 * @returns $window
 */
export function globalVarVue3(args) {
  const {
    webviewUrl = '/views/webview',
    encodeURIComponentWebviewUrl = true,
    isSessionStoragePersist = false,
  } = args || {};

  // @ts-ignore
  const isTestNet = process.env.NODE_ENV === 'development' || import.meta.env.VITE_NET_ENV === 'test';

  function getSystemInfoSync() {
    return uni.getSystemInfoSync();
  }


  const $navigator = reactive({
    language: getSystemInfoSync().appLanguage || '',
    userAgent: 'miniprogram',
    geolocation: {
      getCurrentPosition(_callback, errorCallback) {
        if (typeof errorCallback === 'function') {
          errorCallback({
            code: '-1',
            message: 'uniapp doesn`t support geolocation.getCurrentPosition().',
          });
        }
      },
    },
  });


  function getDefaultUrl() {
    const pages = getCurrentPages?.();
    if (!pages?.length) {
      return '';
    }
    const page = pages[pages.length - 1];
    return (page)?.$page?.fullPath || '';
  }


  const $location = reactive({
    host: '',
    origin: '',
    hostname: '',
    pathname: '',
    protocol: 'https:',

    href: computed({
      set(newVal) {
        const value = encodeURIComponentWebviewUrl ? encodeURIComponent(newVal) : newVal;

        uni.navigateTo({ url: `${webviewUrl}?url=${value}` });
      },
      get() {
        return getCurUrl() || getDefaultUrl() || '';
      },
    }),

    reload() {
      refreshCurrentPage();
    },
  });

  const $localStorage = reactive({
    setItem(key, value) {
      uni?.setStorageSync(this.convertKey(key), value);
    },
    getItem(key) {
      if (uni) {
        return uni.getStorageSync(this.convertKey(key));
      }
      return undefined;
    },
    removeItem(key) {
      uni?.removeStorageSync(this.convertKey(key));
    },
    clear() {
      uni?.clearStorageSync();
    },
    convertKey(key) {
      if (key == null) {
        return key;
      }
      const currEnvVal = (window).isTestNet ? 'test' : 'prod';
      return `${key}@${currEnvVal}`;
    },
  });

  const $sessionStorage = isSessionStoragePersist ? $localStorage : reactive({
    sessionStorage: {},
    setItem(key, value) {
      this.sessionStorage[key] = value;
    },
    getItem(key) {
      return this.sessionStorage[key];
    },
    removeItem(key) {
      this.sessionStorage[key] = undefined;
    },
    clear() {
      this.sessionStorage = {};
    },
  });


  const $body = reactive({

    clientWidth: getSystemInfoSync().windowWidth,
    clientHeight: getSystemInfoSync().windowHeight,

    addEventListener() {
    },
    removeEventListener() {
    },
    contains() {
    },
    removeChild() {
    },
  });

  const $document = reactive({
    location: $location,
    body: $body,

    cookie: computed({
      set(newVal) {
        $localStorage.setItem('uni-app-cookie', newVal);
      },
      get() {
        return $localStorage.getItem('uni-app-cookie') || '';
      },
    }),

    querySelector() {

    },
    createElement() {

    },
    addEventListener() {

    },
    removeEventListener() {

    },
  });

  const $window = reactive({
    app: null,
    document: $document,
    location: $location,
    navigator: $navigator,
    devicePixelRatio: getSystemInfoSync().pixelRatio,
    screen: {
      width: getSystemInfoSync().screenWidth,
      height: getSystemInfoSync().screenHeight,
    },
    Event: {},
    localStorage: $localStorage,
    sessionStorage: $sessionStorage, /* 其他环境没有sessionStorage，如果确实有需要，可以自己想办法加个运行时key前缀来实现*/
    isTestNet,
    userInfo: {
      ticket: '', // 小程序票据
      ticketExpireTime: '', // 小程序票据过期时间
      targetOpenid: '', // gameOpenid
      uType: 2, // 登录类型，1：QQ， 2：微信
      targetAppid: '',  // 业务目标Appid，一般为游戏appid
    },

    addEventListener() {
    },
    removeEventListener() {
    },
  });

  (globalThis).$window = $window;
  (globalThis).$location = $window.location;
  (globalThis).$navigator = $window.navigator;
  (globalThis).$localStorage = $window.localStorage;
  (globalThis).$sessionStorage = $window.sessionStorage;
  (globalThis).$document = $document;

  console.info('当前网络环境:', $window.isTestNet ? '测试环境' : '正式环境');


  return {
    $window,
  };
}
