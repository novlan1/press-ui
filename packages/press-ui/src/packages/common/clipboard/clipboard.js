import { clipboardMp, clipboardWeb } from 't-comm/lib/clipboard/index';

// 注意组件本身不要引用，示例可以使用
export function setClipboardData(text) {
  let clipboard = clipboardMp;
  // #ifdef H5
  clipboard = clipboardWeb;
  // #endif
  return clipboard(`${text}`);
}
