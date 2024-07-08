declare function columnsStyle(data: Record<string, any>): string;
declare function maskStyle(data: Record<string, any>): string;
declare function frameStyle(data: Record<string, any>): string;
declare function columns(columns: any): any[];
declare const innerDefault: {
  columnsStyle: typeof columnsStyle;
  frameStyle: typeof frameStyle;
  maskStyle: typeof maskStyle;
  columns: typeof columns;
};
export default innerDefault;
