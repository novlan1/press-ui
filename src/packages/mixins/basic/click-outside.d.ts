export declare const ClickOutsideMixin: (config: any) => {
  props: {
    closeOnClickOutside: {
      type: BooleanConstructor;
      default: boolean;
    };
  };
  data(): {
    clickOutsideHandler: (event: any) => void;
  };
  mounted(): void;
  beforeDestroy(): void;
};

export const clickOutsideMixin: typeof ClickOutsideMixin;
