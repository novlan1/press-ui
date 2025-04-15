declare const innerDefault: {
  props: {
    accept: {
      type: StringConstructor;
      default: string;
    };
    capture: {
      type: (ArrayConstructor | StringConstructor)[];
      default: () => string[];
    };
    compressed: {
      type: BooleanConstructor;
      default: boolean;
    };
    camera: {
      type: StringConstructor;
      default: string;
    };
    maxDuration: {
      type: NumberConstructor;
      default: number;
    };
    uploadIcon: {
      type: StringConstructor;
      default: string;
    };
    uploadIconColor: {
      type: StringConstructor;
      default: string;
    };
    useBeforeRead: {
      type: BooleanConstructor;
      default: boolean;
    };
    afterRead: {
      type: FunctionConstructor;
      default: null;
    };
    beforeRead: {
      type: FunctionConstructor;
      default: null;
    };
    previewFullImage: {
      type: BooleanConstructor;
      default: boolean;
    };
    maxCount: {
      type: (NumberConstructor | StringConstructor)[];
      default: number;
    };
    disabled: {
      type: BooleanConstructor;
      default: boolean;
    };
    imageMode: {
      type: StringConstructor;
      default: string;
    };
    name: {
      type: StringConstructor;
      default: string;
    };
    sizeType: {
      type: ArrayConstructor;
      default: () => string[];
    };
    multiple: {
      type: BooleanConstructor;
      default: boolean;
    };
    deletable: {
      type: BooleanConstructor;
      default: boolean;
    };
    maxSize: {
      type: (NumberConstructor | StringConstructor)[];
      default: number;
    };
    fileList: {
      type: ArrayConstructor;
      default: () => never[];
    };
    uploadText: {
      type: StringConstructor;
      default: string;
    };
    width: {
      type: (NumberConstructor | StringConstructor)[];
      default: number;
    };
    height: {
      type: (NumberConstructor | StringConstructor)[];
      default: number;
    };
    previewImage: {
      type: BooleanConstructor;
      default: boolean;
    };
    customStyle: {
      type: StringConstructor;
      default: string;
    };
  };
};
export default innerDefault;
