declare function iconStyle(data: Record<string, any>): string;
declare function iconCustomStyle(data: Record<string, any>): string;
declare const innerDefault: {
  iconStyle: typeof iconStyle;
  iconCustomStyle: typeof iconCustomStyle;
};
export default innerDefault;
