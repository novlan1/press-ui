import { isNotInUni } from '../packages/common/utils/utils';


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


export function fetchData(url: string) {
  return new Promise((resolve, reject) => {
    // #ifdef H5
    if (isNotInUni()) {
      fetch(url).then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return {};
      })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });

      return;
    }
    // #endif
    uni.request({
      url,
      data: {},
      method: 'GET',
      sslVerify: true,
      success: ({ data }) => {
        resolve(data);
      },
      fail: (error) => {
        reject(error);
      },
    });
  });
}


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


export function routerPush(url: string, notUniUrl?: string) {
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

