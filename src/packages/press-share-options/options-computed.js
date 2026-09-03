const PRESET_ICONS = ['qq', 'link', 'weibo', 'wechat', 'poster', 'qrcode', 'weapp-qrcode', 'wechat-moments'];

function getIconURL(icon) {
  if (PRESET_ICONS.indexOf(icon) !== -1) {
    return `https://cdn.uwayfly.com/press%2Fimg%2Fshare-sheet-${icon}.png`;
  }

  return icon;
}

export default {
  getIconURL,
};
