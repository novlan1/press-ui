type IOptions = Partial<{
  context: any;
  selector: string | ((context: any) => any);

  show: boolean;
  title: string;
  message: string;

  useSlot: boolean;
  useTitleSlot: boolean;

  className: string;
  customStyle: string;

  asyncClose: boolean;
  beforeClose: null | Function;

  theme: string;
  messageAlign: string;
  width: string | number;
  zIndex: number;

  overlay: boolean;
  overlayStyle: string;
  transition: string;

  showConfirmButton: boolean;
  showCancelButton: boolean;

  confirmButtonText: string;
  cancelButtonText: string;
  confirmButtonColor: string;
  cancelButtonColor: string;

  closeOnClickOverlay: boolean;
  confirmButtonOpenType: string;
}>;

interface IDialog {
  (options: IOptions): any;
  show: (options: IOptions) => Promise<any>;
  confirm: (options: IOptions) => Promise<any>;
  alert: (options: IOptions) => Promise<any>;

  clear: () => void;
  close: () => void;
  stopLoading: () => void;

  setDefaultOptions: (options: IOptions) => void;
  resetDefaultOptions: () => void;
}

declare const Dialog: IDialog;

export default Dialog;

export const showDialog: typeof Dialog.alert;
export const showConfirmDialog: typeof Dialog.confirm;
export const closeDialog: typeof Dialog.close;
export const setDialogDefaultOptions: typeof Dialog.setDefaultOptions;
export const resetDialogDefaultOptions: typeof Dialog.resetDefaultOptions;
export const stopDialogLoading: typeof Dialog.stopLoading;
