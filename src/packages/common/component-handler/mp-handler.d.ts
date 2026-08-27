export declare function getMPComponentHandler({ defaultOptions, name, defaultKey }: any): {
  (toastOptions: any): any;
  clear(): void;
  setDefaultOptions(type: any, options: any): void;
  resetDefaultOptions(type: any): void;
  install(): void;
};
