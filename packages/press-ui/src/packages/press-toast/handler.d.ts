type IOptions = Partial<{
  context: any;
  selector: string;

  show: boolean;
  mask: boolean;
  message: string;

  forbidClick: boolean;
  zIndex: number;
  type: string;

  loadingType: string;
  position: string;
  duration: number;
  animationDuration: number;

  onClose: Function | null;
}>;


interface IToast {
  (options: IOptions | string): any;
  loading: (options: IOptions | string) => any;
  success: (options: IOptions | string) => any;
  fail: (options: IOptions | string) => any;
  clear: (all?: boolean) => any;

  setDefaultOptions: (options: IOptions) => void;
  resetDefaultOptions: () => void;
}

declare const Toast: IToast;

export default Toast;

export const showToast: typeof Toast;
export const showFailToast: typeof Toast.fail;
export const showSuccessToast: typeof Toast.success;
export const showLoadingToast: typeof Toast.loading;
export const closeToast: typeof Toast.clear;
export const setToastDefaultOptions: typeof Toast.setDefaultOptions;
export const resetToastDefaultOptions: typeof Toast.resetDefaultOptions;
