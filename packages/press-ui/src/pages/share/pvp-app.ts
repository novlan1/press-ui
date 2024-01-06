import XSSFilter from './xss-filter';
import { initEnv } from 't-comm/lib/env/env';

/**
 * @module tools/pvpapp
 * @description h5与王者人生app的交互
 */


let gSSchema = '';
let gSDownload = '';


/**
 * @ignore
 * 关闭qq或者weixin webview
 * 外部引入weixin或者qq api 的js文件
 **/
function closeWXQQWebView() {
  const { isQQ, isWeixin } = initEnv();
  const { mqq, wx } =  window;

  if (isQQ && typeof mqq !== 'undefined') {
    // mqq && mqq.ui && mqq.ui.closeWebViews({mode:0,exclude:0});
    mqq?.ui?.popBack();
  } else if (isWeixin && typeof wx !== 'undefined') {
    wx?.closeWindow?.();
  }
}

/**
 * 扩展 obj 对象
 * @ignore
 * @param obj
 * @param ext
 * @param overwrite
 * @returns {*}
 */
function extend(obj: Record<string, any>, ext: Record<string, any>, overwrite = false) {
  let i;
  for (i in ext) {
    // eslint-disable-next-line no-prototype-builtins
    if ((ext.hasOwnProperty(i) && !(i in obj)) || overwrite) {
      obj[i] = ext[i];
    }
  }
  return obj;
}

/*
 发送请求
 */
function openURL(method: string, params: any) {
  const url = `igameapp://jsapi/${method}?p=${encodeURIComponent(JSON.stringify(params) || '')}`;
  const tmpIframe = document.createElement('iframe');
  tmpIframe.setAttribute('width', '0');
  tmpIframe.setAttribute('height', '0');
  tmpIframe.setAttribute('style', 'display: none;');
  document.body.appendChild(tmpIframe);
  tmpIframe.src = url;// 发请求
  setTimeout(() => {
    document.body.removeChild(tmpIframe);
  }, 0);
}

/**
 * 调用app的方法
 * @param {string} method  方法名称
 * @param {string}  params  参数
 * @param {Function} callback 回调函数
 * @example
 *  // 王者人生app内跳转物品列表
    const params = {
      action: 0,
      url: 'local://GiftActivity',
      extras: {},
    };
    pvpapp.invoke('jumpUrl', params, '');
 */
const invoke = function (method: string, params: any, callback: any) {
  extend(params, { callback });
  openURL(method, params);
};

/*
  微信6.5.6以上拉起第三方app
  与tipapp中_wechatOpenApp逻辑完全相同
 */
// eslint-disable-next-line
function _wechatOpenApp() {
  // eslint-disable-next-line
  WeixinJSBridge.invoke('launchApplication', {
    schemeUrl: gSSchema,
  }, (res: any) => {
    console.log(res);
    window.location.href = gSDownload; // 否则跳下载
  });
}

function getGSSchema(url: string, u: any) {
  let gSSchema = '';
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // //android终端或者uc浏览器
    if (url.indexOf('http://') > -1 || url.indexOf('https://') > -1) {
      gSSchema = `tencent://igame.app/open?url=${encodeURIComponent(url)}&v=${(new Date()).getTime()}`; // 拉起H5地址
    } else {
      gSSchema = `tencent://igame.app/open?url=${url}&v=${(new Date()).getTime()}`; // 拉起native地址
    }
  } else { // ios也发送
    if (url.indexOf('http://') > -1 || url.indexOf('https://') > -1) {
      gSSchema = `IGame1042198954://${encodeURIComponent(url)}`;
    } else {
      gSSchema = `IGame1042198954://?${url}`;
    }
  }
  return gSSchema;
}

function getGSDownload(downloadAdtag: string, directdownload?: boolean) {
  // 下载页改为APP官网首页
  let gSDownload = 'http://igame.qq.com/pvp/download/index.php?_t=1';
  if (downloadAdtag) {
    gSDownload += `&adtag=${downloadAdtag}`;
  }
  directdownload = directdownload || false;
  if (directdownload) {
    gSDownload += '&view=download';
  }
  return gSDownload;
}

function createIframe(gSSchema: string) {
// 创建iframe，呼起app schema
  const div = document.createElement('div');
  div.style.visibility = 'hidden';
  div.innerHTML = `<iframe id="schema" src="${XSSFilter.HtmlAttributeEncode(gSSchema)}" scrolling="no" width="1" height="1"></iframe>`;
  document.body.appendChild(div);
}

/**
 * 拉起王者人生App，不能拉起跳转下载页
 * @param {string} url  跳转app后打开的url
 */
const openApp = function (url: string, downloadAdtag: string, directdownload?: boolean) {
  const u = navigator.userAgent;
  if (typeof url === 'undefined' || url == '') {
    url = window.location.href;
  }
  gSSchema = getGSSchema(url, u);

  // 下载页改为APP官网首页
  gSDownload = getGSDownload(downloadAdtag, directdownload);

  const checkTime = 800;
  const wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d.]+)/i);
  const version = (wechatInfo?.[1] && parseInt(wechatInfo[1].replace(/\./g, ''))) || 0;
  if (!wechatInfo || version < 656) {		// 6.5.6 > 6.5.12
    // 非微信环境直接scheme拉起
    const startTime = Date.now(); // 标记呼起时间点
    createIframe(gSSchema);
    // 如果成功呼起，setTimeout不会立即执行
    setTimeout(() => {
      const delta = Date.now() - startTime; // 然后判断回来的时间戳
      if (delta < checkTime + 100) { // 如果不是我们规定的800ms，差太多，就认为是用户手动返回的, 不跳下载
        window.location.href = gSDownload; // 否则跳下载
      } else {
        closeWXQQWebView();
      }
    }, checkTime);
    // 注意：ios在safari进程挂起之后，js代码还会继续运行至少500ms，这里写800来保证起效。魔法数字，有待优化。
  } else if (version > 656) {			// 6.5.6
    // 微信6.5.6版本以上用weixinjsbridge拉起
    if (typeof WeixinJSBridge === 'undefined') {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', _wechatOpenApp, false);
      } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', _wechatOpenApp);
        document.attachEvent('onWeixinJSBridgeReady', _wechatOpenApp);
      }
    } else {
      _wechatOpenApp();
    }
  }
};

function getGSSchemaWithoutStamp(url: string, u?: string) {
  let gSSchema = '';

  u = u || navigator.userAgent;
  if (typeof url === 'undefined' || url == '') {
    url = window.location.href;
  }
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // //android终端或者uc浏览器
    if (url.indexOf('http://') > -1 || url.indexOf('https://') > -1) {
      gSSchema = `tencent://igame.app/open?url=${encodeURIComponent(url)}`; // 拉起H5地址
    } else {
      gSSchema = `tencent://igame.app/open?${url}`; // 拉起native地址
    }
  } else { // ios也发送
    if (url.indexOf('http://') > -1 || url.indexOf('https://') > -1) {
      gSSchema = `IGame1042198954://${encodeURIComponent(url)}`;
    } else {
      gSSchema = `IGame1042198954://?${url}`;
    }
  }
  return gSSchema;
}

/**
 * 拉起王者人生App，不能拉起，不跳转下载页
 * @param {string} url  跳转app后打开的url
 */
const openAppNotDownload = function (url: string, downloadAdtag: string) {
  const u = navigator.userAgent;
  const gSSchema = getGSSchemaWithoutStamp(url, u);

  // 下载页改为APP官网首页
  // let gSDownload = '//igame.qq.com/pvp/download/index.php';
  if (downloadAdtag) {
    gSDownload += `?adtag=${downloadAdtag}`;
  }

  // 创建iframe，呼起app schema
  createIframe(gSSchema);

  const startTime = Date.now(); // 标记呼起时间点
  const checkTime = 1000;		// 对于占用资源较大且呼起时需要跳转到具体APP内业务逻辑的情况，建议checkTime设置不小于2000ms，否则对于性能较差的Android机误判几率较高

  // const div = document.createElement('div');
  // div.style.visibility = 'hidden';
  // div.innerHTML = `<iframe id="schema"
  // src="${XSSFilter.HtmlAttributeEncode(gSSchema)}" scrolling="no" width="1" height="1"></iframe>`;
  // document.body.appendChild(div);

  // 如果成功呼起，setTimeout不会立即执行
  setTimeout(() => {
    // 如果没有呼起，或者呼起后，用户主动返回，还是有可能走进这个逻辑
    const delta = Date.now() - startTime; // 然后判断回来的时间戳
    if (delta < checkTime + 100) { // 如果不是我们规定的800ms，差太多，就认为是用户手动返回的, 不跳下载。"100"该值属于不稳定值，根据具体项目需要进行修改。
      // window.location.href = window.location.href;   //否则跳下载
      let oriurl = window.location.href;
      if (oriurl.indexOf('?') != -1) {
        oriurl = `${oriurl}&appinstalled=0`;
      } else {
        oriurl = `${oriurl}?appinstalled=0`;
      }
      window.location.href = oriurl;
    }
  }, checkTime);
};

function getddzoneSchema(url: string, u?: string) {
  let gSSchema = '';
  u = u || navigator.userAgent;
  if (typeof url === 'undefined' || url == '') {
    url = window.location.href;
  }
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // //android终端或者uc浏览器
    if (url.indexOf('http://') > -1 || url.indexOf('https://') > -1) {
      gSSchema = `scheme://tencent://igame.app/open?url=${encodeURIComponent(url)}`; // 拉起H5地址
    } else {
      // gSSchema = 'scheme://tencent://igame.app/open?'+url;   //拉起native地址（这个会引起选择app打开和浏览器打开的形式）
      // gSSchema = 'pkg://com.tencent.igame?'+url;				//这个会导致崩溃（已确认不支持带参数）
      gSSchema = 'pkg://com.tencent.igame';					// 正确
      // gSSchema   = 'scheme://igame.app/open?'+url;   			//无效
    }
  } else { // ios也发送
    if (url.indexOf('http://') > -1 || url.indexOf('https://') > -1) {
      gSSchema = `IGame1042198954://${encodeURIComponent(url)}`;
    } else {
      gSSchema = `IGame1042198954://?${url}`;
    }
  }
  return gSSchema;
}

/**
 * 斗地主侧拉起app，不能拉起跳转下载页
 * @param {string} url  跳转app后打开的url
 */
const ddzopenApp = function (url: string) {
  // let gSSchema = '';
  const u = navigator.userAgent;
  const gSSchema = getddzoneSchema(url, u);

  // if (typeof url === 'undefined' || url == '') {
  //   url = window.location.href;
  // }
  // if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // //android终端或者uc浏览器
  //   if (url.indexOf('http://') > -1 || url.indexOf('https://') > -1) {
  //     gSSchema = `scheme://tencent://igame.app/open?url=${encodeURIComponent(url)}`; // 拉起H5地址
  //   } else {
  //     // gSSchema = 'scheme://tencent://igame.app/open?'+url;   //拉起native地址（这个会引起选择app打开和浏览器打开的形式）
  //     // gSSchema = 'pkg://com.tencent.igame?'+url;				//这个会导致崩溃（已确认不支持带参数）
  //     gSSchema = 'pkg://com.tencent.igame';					// 正确
  //     // gSSchema   = 'scheme://igame.app/open?'+url;   			//无效
  //   }
  // } else { // ios也发送
  //   if (url.indexOf('http://') > -1 || url.indexOf('https://') > -1) {
  //     gSSchema = `IGame1042198954://${encodeURIComponent(url)}`;
  //   } else {
  //     gSSchema = `IGame1042198954://?${url}`;
  //   }
  // }
  // 创建iframe，呼起app schema
  // const startTime = Date.now(); // 标记呼起时间点
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // //android终端或者uc浏览器
    confirm(gSSchema);
  } else {
    createIframe(gSSchema);

    // const div = document.createElement('div');
    // div.style.visibility = 'hidden';
    // div.innerHTML = `<iframe id="schema"
    // src="${XSSFilter.HtmlAttributeEncode(gSSchema)}" scrolling="no" width="1" height="1"></iframe>`;
    // document.body.appendChild(div);
  }
};


export {
  getGSSchema,
  getGSSchemaWithoutStamp,
  getddzoneSchema,
  getGSDownload,
  createIframe,
  extend,
  openURL,
  closeWXQQWebView,
  invoke,
  openApp,
  openAppNotDownload,
  ddzopenApp,
};

// /*
// 调用方式
// igameapp.invoke("method", {xx: 'xx'}, 'callback');
// */

// exports.invoke = invoke;
// exports.openApp = openApp;
// exports.ddzopenApp = ddzopenApp;
// exports.openAppNotDownload = openAppNotDownload;
