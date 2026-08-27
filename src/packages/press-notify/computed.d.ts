declare function rootStyle(data: Record<string, any>): string;
declare function notifyStyle(data: Record<string, any>): string;
declare const innerDefault: {
  rootStyle: typeof rootStyle;
  notifyStyle: typeof notifyStyle;
};
export default innerDefault;
