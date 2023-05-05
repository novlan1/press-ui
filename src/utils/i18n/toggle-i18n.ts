import { LOCALE_STORAGE_KEY, DEFAULT_LOCALE_NUMBER, LOCALE_NUMBER_MAP } from './config';
import { isInIFrame, storageUtil } from '../index';

export function toggleI18n() {
  // #ifdef H5
  if (isInIFrame()) return;
  // #endif

  const number = storageUtil.get(LOCALE_STORAGE_KEY) || DEFAULT_LOCALE_NUMBER;
  const newNumber = Number(!Number(number));

  storageUtil.set(LOCALE_STORAGE_KEY, newNumber);

  // #ifdef H5
  uni.showToast({
    title: '正在切换语言',
    icon: 'none',
  });
  window.location.reload();
  // #endif

  // #ifndef H5
  uni.showModal({
    title: '重新打开后生效',
    content: `语言即将切换为 ${LOCALE_NUMBER_MAP[newNumber]}`,
    showCancel: false,
    success(res) {
      if (res.confirm) {
        uni.exitMiniProgram({

        });
      }
    },
  });
  // #endif
}
