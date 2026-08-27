export declare const propsKeyMap: {
  arrowIcon: string;
  list: string;
  current: string;
  confirm: string;
  cancel: string;
};
export declare const newProps: {
  arrowIcon: {
    type: BooleanConstructor;
    default: boolean;
  };
  title: {
    type: StringConstructor;
    default: string;
  };
  list: {
    type: ArrayConstructor;
    default: () => never[];
    required: boolean;
  };
  current: {
    type: ObjectConstructor;
    default: null;
    required: boolean;
  };
  tip: {
    type: StringConstructor;
    default: string;
    required: boolean;
  };
  confirm: {
    type: FunctionConstructor;
    default: null;
    required: boolean;
  };
  cancel: {
    type: FunctionConstructor;
    default: null;
    required: boolean;
  };
  virtualListThreshold: {
    type: NumberConstructor;
    default: number;
  };
  horizontal: {
    type: BooleanConstructor;
    default: boolean;
  };
};
export declare const allProps: Record<string, any>;
