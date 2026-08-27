declare function rootStyle(data: Record<string, any>): string;
declare function loadingColor(data: Record<string, any>): any;
declare const innerDefault: {
  rootStyle: typeof rootStyle;
  loadingColor: typeof loadingColor;
};
export default innerDefault;
