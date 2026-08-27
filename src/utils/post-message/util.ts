import {
  loadCssCode as commLoadCssCode,
  loadStyles as commLoadStyles,
} from 't-comm/lib/css';
import {
  loaderUnity,
} from 't-comm/lib/loader/loader-unity';


const ACT_COMMON_CSS = [
  'https://image-1251917893.file.myqcloud.com/igame/component/style-reset/reset.css',
];

// 测试链接:  https://image-1251917893.file.myqcloud.com/2022/a20220408wwkhActivity/css/comm.css
export function loadStyles(urls: Array<string>) {
  loaderUnity('https://image-1251917893.file.myqcloud.com/igame/common/js/adapter.js', () => {});
  commLoadStyles([...ACT_COMMON_CSS, ...urls], 'load-style');
}

export function loadCssCode(code: string) {
  commLoadCssCode(code, 'load-css-code');
}

