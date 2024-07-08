declare function buttonStyle(data: Record<string, any>): string;
declare function inputStyle(data: Record<string, any>): string;
declare const innerDefault: {
  buttonStyle: typeof buttonStyle;
  inputStyle: typeof inputStyle;
};
export default innerDefault;
