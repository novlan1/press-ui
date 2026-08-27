type PropType = Record<string, {
  type: any;
  default: any;
}>;
export declare const FUNCTIONAL = 'functional';
export declare function PressComponent(options?: {
  options: {};
  props: {};
}): {
  options: {
    multipleSlots: boolean;
    addGlobalClass: boolean;
  };
  props: {
    customClass: {
      type: StringConstructor;
      default: string;
    };
  };
};
export declare const defaultProps: {
  customClass: {
    type: StringConstructor;
    default: string;
  };
};
export declare const defaultOptions: {
  multipleSlots: boolean;
  addGlobalClass: boolean;
};
export declare function getDefaultProps(props: Record<string, any>): Record<string, any>;
export declare function genAllProps(newProps: Record<string, any>, propsMap: Record<string, any>): Record<string, any>;
export declare function getPropOrData({ isFunctionMode, functionModeData, allProps, propsKeyMap, context, key }: {
  isFunctionMode: boolean;
  functionModeData: Record<string, any>;
  allProps: PropType;
  propsKeyMap: Record<string, string>;
  context: any;
  key: string;
}): Record<string, any> | undefined;
export {};

export declare function getVirtualHostOptions(value?: boolean, addDefaultOptions?: boolean): {
  virtualHost?: boolean;
  multipleSlots?: boolean;
  addGlobalClass?: boolean;
};
