type IOptions = Partial<{
  context: any;
  selector: string | ((context: any) => any);

  show: boolean;
  mask: boolean;
  message: string;

  forbidClick: boolean;
  zIndex: number;
  type: string;

  loadingType: string;
  loadingSize: string;
  loadingColor: string;

  position: string;
  duration: number;
  animationDuration: number;

  onClose: Function | null;
}>;


interface IToast {
  (options: IOptions | string): IToast;
  loading: (options: IOptions | string) => IToast;
  success: (options: IOptions | string) => IToast;
  fail: (options: IOptions | string) => IToast;
  clear: (all?: boolean) => IToast;

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
