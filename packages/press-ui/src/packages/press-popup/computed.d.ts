export declare const propsKeyMap: {
  arrowIcon: string;
  closeIcon: string;
  showTitle: string;
  horizontal: string;
  title: string;
  button: string;
  borderButton: string;
  closeOnClickOverlay: string;
  confirm: string;
  cancel: string;
};
export declare const newProps: {
  customStyle: {
    type: StringConstructor;
    default: string;
  };
  showTitle: {
    type: BooleanConstructor;
    default: boolean;
    required: boolean;
  };
  widthNumber: {
    type: NumberConstructor;
    default: number;
    required: boolean;
  };
  horizontal: {
    type: BooleanConstructor;
    default: boolean;
    required: boolean;
  };
  closeIcon: {
    type: BooleanConstructor;
    default: boolean;
    required: boolean;
  };
  arrowIcon: {
    type: BooleanConstructor;
    default: boolean;
  };
  title: {
    type: StringConstructor;
    default: string;
    required: boolean;
  };
  button: {
    type: StringConstructor;
    default: string;
    required: boolean;
  };
  borderButton: {
    type: BooleanConstructor;
    default: boolean;
    required: boolean;
  };
  disabledButton: {
    type: BooleanConstructor;
    default: boolean;
    required: boolean;
  };
  validateConfirm: {
    type: (FunctionConstructor | null)[];
    default: null;
  };
  isShow: {
    type: BooleanConstructor;
    default: boolean;
    required: boolean;
  };
  zIndex: {
    type: StringConstructor;
    default: string;
    required: boolean;
  };
  popupClass: {
    type: StringConstructor;
    default: string;
    required: boolean;
  };
  closeOnClickOverlay: {
    type: BooleanConstructor;
    default: boolean;
  };
  asyncClose: {
    type: (FunctionConstructor | null)[];
    default: null;
  };
  asyncCancel: {
    type: (FunctionConstructor | null)[];
    default: null;
  };
  asyncConfirm: {
    type: (FunctionConstructor | null)[];
    default: null;
  };
  mode: {
    type: StringConstructor;
    default: string;
  };
  lockScroll: {
    type: BooleanConstructor;
    default: boolean;
  };
};
export declare const allProps: Record<string, any>;
