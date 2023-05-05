let reported = false;

function initReport() {
  if (reported) return ;
  reported = true;

  const aegisScript = document.createElement('script');
  aegisScript.setAttribute('src', 'https://tam.cdn-go.cn/aegis-sdk/latest/aegis.min.js');
  document.head.appendChild(aegisScript);

  const script = document.createElement('script');
  script.innerHTML = `
  setTimeout(() => {
    window.Aegis && new Aegis({
      id: 'KJdZ8CqDv3JjZoaPV8', // 项目ID，即上报id
      uin: '', // 用户唯一 ID（可选）
      reportApiSpeed: true, // 接口测速
      reportAssetSpeed: true, // 静态资源测速
      spa: true, // spa 页面开启
      hostUrl: 'https://rumt-zh.com'
    })
  }, 3000)
  `;
  document.head.appendChild(script);
}

export default ({ router }) => {
  // 处理 hash 无法跳转到指定位置的问题
  if (typeof process === 'undefined' || process.env.VUE_ENV !== 'server') {
    router.onReady(() => {
      const { app } = router;

      app.$once('hook:mounted', () => {
        initReport();

        setTimeout(() => {
          const { hash } = document.location;
          if (hash.length > 1) {
            const id = decodeURIComponent(hash.substring(1));
            const element = document.getElementById(id);
            if (element) element.scrollIntoView();
          }
        }, 500);
      });
    });
  }
};
