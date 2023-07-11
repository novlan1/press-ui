function getUA() {
  return window.navigator.userAgent.toLowerCase();
}
function isWeiXin() {
  const ua = getUA();
  return ua.indexOf('micromessenger') > -1;
}

function isPc() {
  const { userAgent } = navigator;
  const agents = [
    'Android',
    'iPhone',
    'SymbianOS',
    'Windows Phone',
    'iPad',
    'iPod',
  ];
  let flag = true;
  for (let v = 0; v < agents.length; v++) {
    if (userAgent.indexOf(agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}


function shutdown() {
  const { userAgent } = navigator;
  if (window.mqq?.ui) {
    window.mqq.ui?.popBack();
  }
  if (isWeiXin()) {
    WeixinJSBridge.call('closeWindow');
  }
  if (!isPc()) {
    window.opener = null;
    window.open('about:blank', '_self', '')?.close();
  }

  if (userAgent.indexOf('Firefox') !== -1 || userAgent.indexOf('Chrome') !== -1) {
    window.location.href = 'about:blank';
  } else {
    window.opener = null;
    window.open('about:blank', '_self');
    window.close();
  }
}


export function closeWebview() {
  // #ifdef H5
  shutdown();
  // #endif

  // #ifndef H5
  uni.exitMiniProgram({});
  // #endif
}
