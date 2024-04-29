import { LOCALE_STORAGE_KEY, DEFAULT_LOCALE_NUMBER, LOCALE_NUMBER_MAP } from './config';
import { isInIFrame, storageUtil } from '../index';
import { setLang } from './i18n';


export function toggleI18n(onGTip: Function) {
  // #ifdef H5
  if (isInIFrame()) return;
  // #endif

  const number = storageUtil.get(LOCALE_STORAGE_KEY) || DEFAULT_LOCALE_NUMBER;
  const newNumber = Number(!Number(number));

  storageUtil.set(LOCALE_STORAGE_KEY, newNumber);

  // #ifdef H5
  onGTip('正在切换语言');

  window.location.reload();
  // #endif

  // #ifndef H5
  uni.showModal({
    title: '重新打开后生效',
    content: `语言即将切换为 ${LOCALE_NUMBER_MAP[newNumber as keyof typeof LOCALE_NUMBER_MAP]}`,
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
