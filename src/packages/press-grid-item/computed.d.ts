declare function wrapperStyle(data: Record<string, any>): string;
declare function contentStyle(data: Record<string, any>): string;
declare const innerDefault: {
  wrapperStyle: typeof wrapperStyle;
  contentStyle: typeof contentStyle;
};
export default innerDefault;
