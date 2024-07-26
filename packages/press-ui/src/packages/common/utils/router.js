import { isNotInUni } from './utils';


export function routerBack() {
  // #ifdef H5
  if (isNotInUni()) {
    // @ts-ignore
    this.$router.back();
    return;
  }
  // #endif
  uni.navigateBack();
}


export function routerPush(url, notUniUrl) {
  // #ifdef H5
  if (isNotInUni()) {
    // @ts-ignore
    this.$router.push(notUniUrl || url);
    return;
  }
  // #endif
  uni.navigateTo({
    url,
  });
}

