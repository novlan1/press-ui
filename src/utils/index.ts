export function isInIFrame() {
  const res = window.frames.length != parent.frames.length;
  return res;
}
export const storageUtil = {
  get(key: string) {
    let res;
    // #ifdef H5
    res = localStorage.getItem(key);
    // #endif
    // #ifndef H5
    res = uni.getStorageSync(key);
    // #endif
    return res;
  },
  set(key: string, value: string | number) {
    let res ;
    // #ifdef H5
    res = localStorage.setItem(key, `${value}`);
    // #endif
    // #ifndef H5
    res = uni.setStorageSync(key, `${value}`);
    // #endif
    return res;
  },
};
