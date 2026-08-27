declare function tabClass(active?: boolean, ellipsis?: boolean): string;
declare function tabStyle(data: Record<string, any>): string;
declare function navStyle(color: string, type?: string): string;
declare function trackStyle(data: Record<string, any>): string;
declare function lineStyle(data: Record<string, any>): string;
declare const innerDefault: {
  tabClass: typeof tabClass;
  tabStyle: typeof tabStyle;
  trackStyle: typeof trackStyle;
  lineStyle: typeof lineStyle;
  navStyle: typeof navStyle;
};
export default innerDefault;
