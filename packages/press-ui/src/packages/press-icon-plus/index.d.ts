declare function isImage(name: string): boolean;
declare function rootClass(data: Record<string, any>): string;
declare function rootStyle(data: Record<string, any>): string;
declare const innerDefault: {
  isImage: typeof isImage;
  rootClass: typeof rootClass;
  rootStyle: typeof rootStyle;
};
export default innerDefault;
