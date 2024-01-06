import { loadJS } from 't-comm/lib/loader/loader';

export const WX_JS_SDK = 'https://image-1251917893.file.myqcloud.com/commjs/jweixin-1.6.0.js';


export function configWx({
  apiList,
  openTagList,
  getWxSignaturePromise,
}: {
  apiList: Array<string>;
  openTagList: Array<string>;
  getWxSignaturePromise: any;
}) {
  return new Promise((resolve, reject) => {
    loadJS(WX_JS_SDK).then(() => {
      getWxCfg({
        apiList,
        openTagList,
        getWxSignaturePromise,
      })
        .then((wx) => {
          resolve(wx);
        })
        .catch((error) => {
          console.log('configWx error : ', error);
          reject(error);
        });
    });
  });
}

/**
 * 请求微信鉴权接口
 * @param {*} apiList api列表
 * @param {*} openTagList openTag列表
 * @returns {Promise} 微信鉴权结果
 */
function getWxCfg({
  apiList,
  openTagList,
  getWxSignaturePromise,
}: {
  apiList: Array<string>;
  openTagList: Array<string>;
  getWxSignaturePromise: any;
}) {
  return new Promise((resolve, reject) => {
    getWxSignaturePromise()
      .then((data: any = {}) => {
        // @ts-ignore
        window?.wx?.config({
          beta: true,
          debug: false,
          appId: data.wxappid,
          timestamp: data.timestamp,
          nonceStr: data.noncestr,
          signature: data.signature,
          jsApiList: apiList,
          openTagList,
        });

        // @ts-ignore
        window.wx.ready((res) => {
          console.log('wx ready', res);
          // @ts-ignore
          resolve(window.wx);
        });
        // @ts-ignore
        window.wx.error((err: any) => {
          console.warn('wx config error : ', err);
          reject(err);
        });
      })
      .catch((error: any) => {
        reject(error);
        console.log('get_share_cfg error : ', error);
      });
  });
}
