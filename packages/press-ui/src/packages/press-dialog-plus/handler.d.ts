interface IDialog {
  (options: any): any;
  show: (options: any) => Promise<any>;
  confirm: (options: any) => Promise<any>;
  alert: (options: any) => Promise<any>;

  clear: () => void;
  close: () => void;

  setDefaultOptions: (options: any) => void;
  resetDefaultOptions: () => void;
}
const Dialog: IDialog;

export default Dialog;
