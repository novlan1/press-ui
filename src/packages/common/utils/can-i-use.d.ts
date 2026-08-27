declare const SUPPORT_MAP: {
  'css.var': string;
  'css.env': string;
  'css.constant': string;
};
export declare function canIUse(key: keyof typeof SUPPORT_MAP): boolean;
export {};
