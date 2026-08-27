export declare const functionalMixin: (allProps: Record<string, any>, { showProp, propsKeyMap }?: {
  showProp: boolean;
  propsKeyMap: {};
}) => {
  props: {
    mode: {
      type: StringConstructor;
      default: string;
    };
  };
  computed: {
    isFunctionMode(): boolean;
  };
  watch: {
    [x: string]: any;
  };
  methods: {
    closeDialog(): void;
    showDialog(options?: Record<string, any>): void;
    getPropOrData(key: string): Record<string, any> | undefined;
    promiseCallback(type: 'confirm' | 'cancel', options?: {}): void;
  };
  data(): {
    innerShow: boolean;
    functionModeData: {
      [x: string]: any;
    };
  };
};
