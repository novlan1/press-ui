declare function containerStyle(data: Record<string, any>): string;
declare function wrapStyle(data: Record<string, any>): string;
declare const innerDefault: {
  containerStyle: typeof containerStyle;
  wrapStyle: typeof wrapStyle;
};
export default innerDefault;
