export const storageUtil = {
  get(key) {
    let res;
    // #ifdef H5
    res = localStorage.getItem(key);
    // #endif
    // #ifndef H5
    res = uni.getStorageSync(key);
    // #endif
    return res;
  },
  set(key, value) {
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
