interface IDialog {
  (options: any): any;
  show: (options: any) => Promise<any>;
  clear: () => any;
}
const Dialog: IDialog;

export default Dialog;
