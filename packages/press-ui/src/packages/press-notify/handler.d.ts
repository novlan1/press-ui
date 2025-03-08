type IOptions = Partial<{
  context: any;
  selector: string;
  show: boolean;

  type: string;
  message: string;
  background: string;
  duration: number;

  zIndex: number;
  top: number;
  color: string;
  safeAreaInsetTop: boolean;

  onClick: Function | null;
  onOpened: Function | null;
  onClose: Function | null;
  animationDuration: number;
}>;


type INotify = {
  (options: IOptions): any;
  clear: () => void;
  setDefaultOptions: (options: IOptions) => void;
  resetDefaultOptions: () => void;
};


declare const Notify: INotify;


export default Notify;

export const showNotify: typeof Notify;
export const closeNotify: typeof Notify.clear;
export const setNotifyDefaultOptions: typeof Notify.setDefaultOptions;
export const resetNotifyDefaultOptions: typeof Notify.resetDefaultOptions;
