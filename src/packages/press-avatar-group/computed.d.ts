declare const innerDefault: {
  props: {
    urls: {
      type: ArrayConstructor;
      default: () => never[];
    };
    maxCount: {
      type: (NumberConstructor | StringConstructor)[];
      default: number;
    };
    round: {
      type: BooleanConstructor;
      default: boolean;
    };
    mode: {
      type: StringConstructor;
      default: string;
    };
    showMore: {
      type: BooleanConstructor;
      default: boolean;
    };
    size: {
      type: (NumberConstructor | StringConstructor)[];
      default: number;
    };
    keyName: {
      type: StringConstructor;
      default: string;
    };
    gap: {
      type: (NumberConstructor | StringConstructor)[];
      default: string;
      validator(value: any): boolean;
    };
    extraValue: {
      type: (NumberConstructor | StringConstructor)[];
      default: string;
    };
    customStyle: {
      type: StringConstructor;
      default: string;
    };
  };
};
export default innerDefault;
