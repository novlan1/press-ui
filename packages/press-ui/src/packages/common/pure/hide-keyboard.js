import { isNotInUni } from '../utils/utils';

function innerHideKeyboard() {
  const { activeElement } = document;
  if (activeElement && (activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'INPUT')) {
    activeElement.blur();
  }
}


export function hideKeyboard() {
  // #ifdef H5
  if (isNotInUni()) {
    innerHideKeyboard();
  }
  // #endif

  // #ifndef H5
  uni.hideKeyboard();
  // #endif
}
