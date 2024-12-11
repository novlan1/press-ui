interface IDialog {
  (options: any): any;
  show: (options: any) => Promise<any>;
  clear: () => any;

  setDefaultOptions: (options: any) => void;
  resetDefaultOptions: () => void;
}
const Dialog: IDialog;

export default Dialog;
