declare function spinnerStyle(data: Record<string, any>): string;
declare function textStyle(data: Record<string, any>): string;
declare const innerDefault: {
  spinnerStyle: typeof spinnerStyle;
  textStyle: typeof textStyle;
};
export default innerDefault;
