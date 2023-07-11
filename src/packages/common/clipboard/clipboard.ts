import { clipboardMp } from './clipboard-mp';
import { clipboardWeb } from './clipboard-web';

export function setClipboardData(text) {
  let clipboard = clipboardMp;
  // #ifdef H5
  clipboard = clipboardWeb;
  // #endif
  return clipboard(`${text}`);
}
