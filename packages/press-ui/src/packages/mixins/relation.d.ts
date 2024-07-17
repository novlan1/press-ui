export declare function ChildrenMixin(parent: string, options?: Record<string, any>): {
  inject: {
    [x: string]: {
      default: null;
    };
  };
  computed: {
    [x: number]: () => any;
  };
  watch: {
    disableBindRelation(val: any): void;
  };
  methods: {
    bindRelation(this: any): void;
  };
  created(): void;
  mounted(): void;
  beforeDestroy(): void;
};
export declare function ParentMixin(parent: string): {
  provide(): {
    [x: string]: any;
  };
  data(): {};
};
