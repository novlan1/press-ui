const CHANGE_IFRAME_STYLE_TYPE = 'CHANGE_IFRAME_STYLE_TYPE';


function onMessage(e: {
  data: {
    type: string,
    data: {
      name: string;
      value: string;
    }
  }
}) {
  if (e.data.type !== CHANGE_IFRAME_STYLE_TYPE) {
    return ;
  }
  if (!e.data.data) return;

  const { name, value } = e.data.data;
  const html = document.getElementsByTagName('html')[0];
  html.style.setProperty(name, value);
}

export function watchMessage() {
  // #ifdef H5
  window.addEventListener('message', onMessage, false);
  // #endif
}
