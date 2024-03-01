interface IToast {
  (options: any): any;
  loading: (options: any) => any;
  success: (options: any) => any;
  fail: (options: any) => any;
  clear: () => any;
}
const Toast: IToast;

export default Toast;
