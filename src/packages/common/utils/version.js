let systemInfo = {};
let appBaseInfo = {};
let windowInfo = {};

export function getSystemInfoSync() {
  try {
    if (!Object.keys(systemInfo).length
      && typeof uni !== 'undefined'
      && typeof uni.getSystemInfoSync === 'function'
    ) {
      systemInfo = uni.getSystemInfoSync();
    }
  } catch (err) {
    console.log('[getSystemInfoSync] err', err);
  }

  return systemInfo;
}


export function getAppBaseInfo() {
  try {
    if (!Object.keys(appBaseInfo).length
      && typeof uni !== 'undefined'
    ) {
      if (typeof uni.getAppBaseInfo === 'function') {
        appBaseInfo = uni.getAppBaseInfo();
      } else if (typeof uni.getSystemInfoSync === 'function') {
        appBaseInfo = uni.getSystemInfoSync();
      }
    }
  } catch (err) {
    console.log('[getAppBaseInfo] err', err);
  }

  return appBaseInfo;
}


export function getWindowInfo() {
  try {
    if (!Object.keys(windowInfo).length
      && typeof uni !== 'undefined'
    ) {
      if (typeof uni.getWindowInfo === 'function') {
        windowInfo = uni.getWindowInfo();
      } else if (typeof uni.getSystemInfoSync === 'function') {
        windowInfo = uni.getSystemInfoSync();
      }
    }
  } catch (err) {
    console.log('[getAppBaseInfo] err', err);
  }

  return windowInfo;
}


function compareVersion(v1 = '', v2 = '') {
  const v1List = v1.split('.');
  const v2List = v2.split('.');
  const len = Math.max(v1List.length, v2List.length);

  while (v1List.length < len) {
    v1List.push('0');
  }

  while (v2List.length < len) {
    v2List.push('0');
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1List[i], 10);
    const num2 = parseInt(v2List[i], 10);
    if (num1 > num2) {
      return 1;
    }

    if (num1 < num2) {
      return -1;
    }
  }
  return 0;
}


function gte(version) {
  const system = getAppBaseInfo();
  return compareVersion(system.SDKVersion, version) >= 0;
}


export function canIUseModel() {
  return gte('2.9.3');
}


export function canIUseFormFieldButton() {
  return gte('2.10.3');
}


export function canIUseAnimate() {
  return gte('2.9.0');
}


export function canIUseGroupSetData() {
  return gte('2.4.0');
}


export function canIUseCanvas2d() {
  return gte('2.9.0');
}


export function canIUseGetUserProfile() {
  let result = false;

  // #ifndef H5
  result = !!wx.getUserProfile;
  // #endif
  return result;
}
