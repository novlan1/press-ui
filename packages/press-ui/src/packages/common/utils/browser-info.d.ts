export declare function getTheme(): 'light' | 'dark';
/**
 * 获取系统信息-同步
 */
export declare function getBrowserInfo(): {
  deviceBrand: undefined;
  brand: undefined;
  deviceModel: string | undefined;
  deviceOrientation: string;
  model: string | undefined;
  system: string;
  platform: string;
  browserName: string;
  browserVersion: string;
  language: string;
  deviceType: string;
  ua: string;
  osname: string;
  osversion: string | undefined;
  theme: string;
};
