export declare function isPlainObject(obj: any): boolean;
export declare function sortObject(obj: any): any;
export declare function getDeviceInfo(): {
  brand: any;
  deviceBrand: any;
  deviceModel: any;
  devicePixelRatio: number;
  deviceId: string;
  deviceOrientation: any;
  deviceType: any;
  model: any;
  platform: any;
  system: any;
};
export declare function getAppBaseInfo(): {
  appId: string;
  appName: string;
  appVersion: string;
  appVersionCode: string;
  appLanguage: any;
  enableDebug: boolean;
  hostSDKVersion: undefined;
  hostPackageName: undefined;
  hostFontSizeSetting: undefined;
  hostName: any;
  hostVersion: any;
  hostTheme: any;
  hostLanguage: any;
  language: any;
  SDKVersion: string;
  theme: any;
  version: string;
};
/**
 * 获取系统信息-同步
 */
export declare function getSystemInfoSync(): any;
/**
 * 获取系统信息-异步
 */
export declare function getSystemInfo(): any;
