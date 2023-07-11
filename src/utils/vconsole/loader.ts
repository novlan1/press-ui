const exportObj: {
  jsMap: Record<string, number>
} = {
  jsMap: {},
};

/**
 * 动态加载JS
 * @param {string} url - JS链接
 * @param {object} [options] 其他选项
 * @param {boolean} [options.defer] 是否添加 defer 属性
 * @param {boolean} [options.async] 是否添加 async 属性
 * @param {boolean} [options.crossorigin] 是否添加 crossorigin 属性
 * @returns Promise
 * @example
 *
 * loadJS('xx.js').then(() => {})
 */
export function loadJS(url: string, options: {
  defer?: boolean
  async?: boolean
  crossorigin?: boolean
} = {}) {
  return new Promise((resolve, reject) => {
    if (typeof exportObj.jsMap[url] === 'undefined') {
      exportObj.jsMap[url] = 0;

      const c: any = document.createElement('script');
      if (options?.defer) c.setAttribute('defer', 'defer');
      if (options?.async) c.setAttribute('async', 'async');
      if (options?.crossorigin) c.setAttribute('crossorigin', 'crossorigin');

      const e = document.body || document.getElementsByTagName('head')[0];
      c.onerror = function () {
        reject();
      };
      if (c.readyState) {
        c.onreadystatechange = function () {
          if (c.readyState === 'loaded' || c.readyState === 'complete') {
            c.onreadystatechange = null;
            exportObj.jsMap[url] += 1;
            resolve(1);
          }
        };
      } else {
        c.onload = function () {
          exportObj.jsMap[url] += 1;
          resolve(1);
        };
      }
      c.src = url;
      e.appendChild(c);
    } else {
      const tc = setInterval(() => {
        if (exportObj.jsMap[url]) {
          clearInterval(tc);
          resolve(1);
        }
      }, 20);
    }
  });
}

/**
 * 动态加载CSS
 * @param {string} url CSS链接
 * @example
 *
 * loadCSS('xxx.css')
 */
export function loadCSS(url: string) {
  let addSign = true;
  const links = document.getElementsByTagName('link');
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < links.length; i++) {
    if (links[i]?.href && links[i].href.indexOf(url) !== -1) {
      addSign = false;
    }
  }
  if (addSign) {
    const link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    document.getElementsByTagName('head')[0].appendChild(link);
  }
}
