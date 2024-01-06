export function getWxSignaturePromise() {
  return  new Promise((resolve) => {
    const url = 'https://m.igame.qq.com/pvp/share/get_share_cfg';

    const referpath = encodeURIComponent(encodeURIComponent(`${window.location.protocol}//${window.location.host}${window.location.pathname}${window.location.search}`));
    uni.request({
      url: `${url}?referpath=${referpath}&tstamp=${Date.now()}`,
      method: 'POST',
      success: (res) => {
        resolve(res.data || {});
        console.log('[getWxSignaturePromise]', res.data);
      },
    });
  });
}
