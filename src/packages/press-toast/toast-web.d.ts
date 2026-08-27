declare const Toast: {
  (options?: {
    type?: string | undefined;
    onClose?: Function | undefined;
    animationDuration?: number | undefined;
    duration: number;
  }): any;
  clear(all?: boolean | undefined): void;
  setDefaultOptions(type: any, options: Record<string, any>): void;
  resetDefaultOptions(type: any): void;
  allowMultiple(value?: boolean): void;
  install(): void;
};
export default Toast;
