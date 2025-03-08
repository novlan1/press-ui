type IOptions = Partial<{
  context: any;
  selector: string;

  show: boolean;
  src: string;
  dialogType: number;
  title: string;
  content: string;

  canTouchRemove: boolean;
  confirmText: string;
  cancelText: string;
  onClickCancel: null | Function;
  onConfirmClick: null | Function;

  htmlContent: string;
  zIndex: string | number;
  useScrollView:  boolean;

  onClickImage: null | Function;
  onLongPressImage: null | Function;
  showField:  boolean;

  fieldPlaceHolder: string;
  fieldValue: string;
  customClass: string;
}>;

interface IDialog {
  (options: IOptions): any;
  show: (options: IOptions) => Promise<any>;
  clear: () => any;

  setDefaultOptions: (options: IOptions) => void;
  resetDefaultOptions: () => void;
}


declare const Dialog: IDialog;

export default Dialog;

export const showDialog: typeof Dialog.show;
export const setDialogDefaultOptions: typeof Dialog.setDefaultOptions;
export const resetDialogDefaultOptions: typeof Dialog.resetDefaultOptions;
