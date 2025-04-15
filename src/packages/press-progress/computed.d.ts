declare function pivotText(pivotText: any, percentage: any): any;
declare function rootStyle(data: Record<string, any>): string;
declare function portionStyle(data: Record<string, any>): string;
declare function pivotStyle(data: Record<string, any>): string;
declare const innerDefault: {
  pivotText: typeof pivotText;
  rootStyle: typeof rootStyle;
  portionStyle: typeof portionStyle;
  pivotStyle: typeof pivotStyle;
};
export default innerDefault;
