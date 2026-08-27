import { loadStyles, loadCssCode } from './util';


export const IFRAME_MESSAGE_TYPE_MAP = {
  CHANGE_IFRAME_STYLE_TYPE: 'CHANGE_IFRAME_STYLE_TYPE',
  CHANGE_DEMO_PAGE_DIRECTION: 'CHANGE_DEMO_PAGE_DIRECTION',
  CHANGE_EXTERNAL_STYLE_LINK: 'CHANGE_EXTERNAL_STYLE_LINK',
  CHANGE_EXTERNAL_STYLE_CONTENT: 'CHANGE_EXTERNAL_STYLE_CONTENT',
};

export const DEMO_PAGE_DIRECTION = {
  HOR: 'HOR',
  VERT: 'VERT',
};

const POST_MESSAGE_CALLBACK_MAP = {
  [IFRAME_MESSAGE_TYPE_MAP.CHANGE_IFRAME_STYLE_TYPE]: watchCssToken,
  [IFRAME_MESSAGE_TYPE_MAP.CHANGE_EXTERNAL_STYLE_LINK]: watchExternalStyleLink,
  [IFRAME_MESSAGE_TYPE_MAP.CHANGE_EXTERNAL_STYLE_CONTENT]: watchExternalStyleContent,
};

function watchCssToken(data: any) {
  if (!data) return;

  const { name, value } = data;
  const html = document.getElementsByTagName('html')[0];
  html.style.setProperty(name, value);
}

function watchExternalStyleLink(data: string) {
  const list = data.split(';')
    .filter(item => item.startsWith('http'))
    .map(item => item.trim());
  loadStyles(list);
}

function watchExternalStyleContent(data: string) {
  loadCssCode(data);
}

function onMessage(e: {
  data: {
    type: string;
    data: any;
  }
}) {
  const callback = POST_MESSAGE_CALLBACK_MAP[e.data.type];
  if (!callback) return;
  callback(e.data.data);
}


export function watchMessageFromTop() {
  // #ifdef H5
  window.addEventListener('message', onMessage, false);
  // #endif
}

export function sendMessageToTop(type: string, data: any) {
  // #ifdef H5
  window.parent.postMessage({ type,  data }, '*');
  // #endif
}
