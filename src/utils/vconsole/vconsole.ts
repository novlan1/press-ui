import { loadJS } from './loader';

const V_CONSOLE_URL = 'https://image-1251917893.cos.ap-guangzhou.myqcloud.com/igame/npm/vconsole-fork/vconsole.min.js';

export function loadVConsole() {
  if (typeof window.VConsole === 'undefined') {
    loadJS(V_CONSOLE_URL).then(() => {
      initVConsole();
    });
  } else {
    initVConsole();
  }
}

function initVConsole() {
  new VConsole({
  });
}
