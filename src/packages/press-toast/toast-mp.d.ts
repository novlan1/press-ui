declare const Toast: {
  (toastOptions: any): any;
  clear(): void;
  setDefaultOptions(type: any, options: any): void;
  resetDefaultOptions(type: any): void;
  install(): void;
};
export default Toast;
