import { isInIFrame } from '../common/utils/iframe';
import { storageUtil } from '../common/utils/storage';

import { LOCALE_STORAGE_KEY, DEFAULT_LOCALE_NUMBER, LOCALE_NUMBER_MAP } from './config';

import { setLang } from './demo-lang';


export function toggleI18n(onGTip) {
  // #ifdef H5
  if (isInIFrame()) return;
  // #endif

  const number = storageUtil.get(LOCALE_STORAGE_KEY) || DEFAULT_LOCALE_NUMBER;
  const newNumber = Number(!Number(number));

  storageUtil.set(LOCALE_STORAGE_KEY, newNumber);

  // #ifdef H5
  onGTip('正在切换语言');
  setTimeout(() => {
    window.location.reload();
  }, 100);
  // #endif

  // #ifndef H5
  uni.showModal({
    title: '提示',
    content: `语言即将切换为 ${LOCALE_NUMBER_MAP[newNumber]}`,
    showCancel: false,
    success(res) {
      if (res.confirm) {
        // uni?.exitMiniProgram?.({});
        console.log('[reLaunch]');
        setLang(true);
        uni?.reLaunch({
          url: '/pages/index/index',
        });
      }
    },
  });
  // #endif
}
