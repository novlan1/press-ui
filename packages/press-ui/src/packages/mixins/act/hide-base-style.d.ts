export declare function getHideBaseStyleMixin(): {
  props: {
    hideBaseStyle: {
      type: BooleanConstructor;
      default: boolean;
    };
  };
  watch: {
    hideBaseStyle: {
      immediate: boolean;
      handler(value: boolean): void;
    };
  };
};
