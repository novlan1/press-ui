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


export function sendMessageToIframe({
  type,
  data,
  iframe,
}) {
  if (!iframe) {
    iframe = document.getElementsByTagName('iframe')[0];
  }
  iframe.contentWindow.postMessage({ type, data }, '*');
}


export function watchMessageFromIFrame(callback) {
  window.addEventListener('message', callback, false);
}
