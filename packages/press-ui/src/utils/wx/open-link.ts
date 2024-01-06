const JUMP_TYPES = {
  GOODS: 1,
  STORE: 2,
  OTHER: 3,
  CUSTOM: 4, // 传递参数会后台被处理为 param=xxx&type=4，因此参数需要编码
  CUSTOM_NO_ENCODE: 5, // 完全透传前端参数，后台不做任何处理
};

export function getMiniProgramOpenLink() {
  return new Promise((resolve) => {
    const host = 'https://a.igame.qq.com';

    uni.request({
      method: 'POST',
      url: `${host}/merc.merccgi.accountBind.accountBind/GetMiniProgramOpenLink`,
      data: {
        appid: 'wx94057b049312ffec',
        path: '/convert-cross/views/x5m/index/index',
        param_data: 'brandid=b1689820502&configid=gGVLomFG&inviteid=ILG6f2cfa387b694e6077f52edc0c302322&shareId=o5P-Ojory9Xh7lkreheBWF7yrFv4&adtag=share&gid=507',
        jump_type: JUMP_TYPES.CUSTOM_NO_ENCODE,
      },
      success: (res) => {
        resolve(res.data || {});
        console.log('[getMiniProgramOpenLink]', res.data);
      },
    });
  });
}
