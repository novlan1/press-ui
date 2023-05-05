const PRESET_ICONS = ['qq', 'link', 'weibo', 'wechat', 'poster', 'qrcode', 'weapp-qrcode', 'wechat-moments'];

function getIconURL(icon) {
  if (PRESET_ICONS.indexOf(icon) !== -1) {
    return `https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fshare-sheet-${icon}.png`;
  }

  return icon;
}

export default {
  getIconURL,
};
