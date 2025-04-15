declare function optionText(option: any, valueKey?: any): any;
declare function rootStyle(data: Record<string, any>): string;
declare function wrapperStyle(data: Record<string, any>): string;
declare const innerDefault: {
  optionText: typeof optionText;
  rootStyle: typeof rootStyle;
  wrapperStyle: typeof wrapperStyle;
};
export default innerDefault;
