export declare const t: (this: any, path?: string, ...options: Array<any>) => any;
export declare const use: (l?: Record<string, any>) => void;
export declare const i18n: (fn?: any) => void;
export declare const add: (messages?: {}) => void;
export declare const getLang: () => Record<string, any>;
declare const innerDefault: {
  use: (l?: Record<string, any> | undefined) => void;
  t: (this: any, path?: string, ...options: any[]) => any;
  i18n: (fn?: any) => void;
  add: (messages?: {}) => void;
  getLang: () => Record<string, any>;
};
export default innerDefault;
