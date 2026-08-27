declare const innerDefault: {
  props: {
    adjustPosition: {
      type: BooleanConstructor;
      default: boolean;
    };
    maxLength: {
      type: (NumberConstructor | StringConstructor)[];
      default: number;
    };
    dot: {
      type: BooleanConstructor;
      default: boolean;
    };
    mode: {
      type: StringConstructor;
      default: string;
    };
    hairline: {
      type: BooleanConstructor;
      default: boolean;
    };
    space: {
      type: (NumberConstructor | StringConstructor)[];
      default: number;
    };
    value: {
      type: (NumberConstructor | StringConstructor)[];
      default: string;
    };
    focus: {
      type: BooleanConstructor;
      default: boolean;
    };
    bold: {
      type: BooleanConstructor;
      default: boolean;
    };
    color: {
      type: StringConstructor;
      default: string;
    };
    fontSize: {
      type: (NumberConstructor | StringConstructor)[];
      default: number;
    };
    size: {
      type: (NumberConstructor | StringConstructor)[];
      default: number;
    };
    disabledKeyboard: {
      type: BooleanConstructor;
      default: boolean;
    };
    borderColor: {
      type: StringConstructor;
      default: string;
    };
    disabledDot: {
      type: BooleanConstructor;
      default: boolean;
    };
  };
};
export default innerDefault;
/**
 * @description 用于获取用户传递值的px值  如果用户传递了"xxpx"或者"xxrpx"，取出其数值部分，如果是"xxxrpx"还需要用过uni.upx2px进行转换
 * @param {number|string} value 用户传递值的px值
 * @param {boolean} unit
 * @returns {number|string}
 */
export declare function getPx(value: string | number, unit?: boolean): string | number;
