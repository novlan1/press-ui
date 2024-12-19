export declare const dialogProps: {
  show: {
    type: BooleanConstructor;
    default: boolean;
  };
  src: {
    type: StringConstructor;
    default: string;
  };
  dialogType: {
    type: (NumberConstructor | StringConstructor)[];
    default: number;
  };
  title: {
    type: StringConstructor;
    default: any;
  };
  content: {
    type: StringConstructor;
    default: string;
  };
  canTouchRemove: {
    type: BooleanConstructor;
    default: boolean;
  };
  confirmText: {
    type: StringConstructor;
    default: any;
  };
  cancelText: {
    type: StringConstructor;
    default: string;
  };
  onClickCancel: {
    type: (FunctionConstructor | null)[];
    default: null;
  };
  onConfirmClick: {
    type: (FunctionConstructor | null)[];
    default: null;
  };
  htmlContent: {
    type: StringConstructor;
    default: string;
  };
  zIndex: {
    type: (NumberConstructor | StringConstructor)[];
    default: string;
  };
  useScrollView: {
    type: BooleanConstructor;
    default: boolean;
  };
  onClickImage: {
    type: (FunctionConstructor | null)[];
    default: null;
  };
  onLongPressImage: {
    type: (FunctionConstructor | null)[];
    default: null;
  };
  showField: {
    type: BooleanConstructor;
    default: boolean;
  };
  fieldPlaceHolder: {
    type: StringConstructor;
    default: string;
  };
  fieldValue: {
    type: StringConstructor;
    default: string;
  };
  customClass: {
    type: StringConstructor;
    default: string;
  },
};
