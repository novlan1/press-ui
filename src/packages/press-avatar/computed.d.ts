declare const innerDefault: {
  props: {
    src: {
      type: StringConstructor;
      default: string;
    };
    round: {
      type: BooleanConstructor;
      default: boolean;
    };
    size: {
      type: (NumberConstructor | StringConstructor)[];
      default: string;
    };
    mode: {
      type: StringConstructor;
      default: string;
    };
    text: {
      type: StringConstructor;
      default: string;
    };
    backgroundColor: {
      type: StringConstructor;
      default: string;
    };
    color: {
      type: StringConstructor;
      default: string;
    };
    fontSize: {
      type: (NumberConstructor | StringConstructor)[];
      default: number;
    };
    icon: {
      type: StringConstructor;
      default: string;
    };
    mpAvatar: {
      type: BooleanConstructor;
      default: boolean;
    };
    randomBackgroundColor: {
      type: BooleanConstructor;
      default: boolean;
    };
    defaultUrl: {
      type: StringConstructor;
      default: string;
    };
    colorIndex: {
      type: (NumberConstructor | StringConstructor)[];
      default: number;
      validator(n: any): boolean;
    };
    name: {
      type: StringConstructor;
      default: string;
    };
    customStyle: {
      type: StringConstructor;
      default: string;
    };
  };
};
export default innerDefault;
