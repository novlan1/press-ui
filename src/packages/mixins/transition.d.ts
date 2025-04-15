export declare function transition(showDefaultValue: any): {
  props: {
    customStyle: StringConstructor;
    show: {
      type: BooleanConstructor;
      default: any;
    };
    duration: {
      type: (ObjectConstructor | NumberConstructor | null)[];
      default: number;
    };
    name: {
      type: StringConstructor;
      default: string;
    };
  };
  watch: {
    show: {
      handler(...args: any[]): void;
    };
    name: {
      handler(val: any): void;
    };
  };
  methods: {
    observeShow(value: any, old: any): void;
    enter(): void;
    leave(): void;
    onTransitionEnd(): void;
  };
  data(): any;
  mounted(): void;
};
