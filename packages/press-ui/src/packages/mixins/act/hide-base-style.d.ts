export declare function getHideBaseStyleMixin(): {
  props: {
    hideBaseStyle: {
      type: BooleanConstructor;
      default: boolean;
    };
  };
  watch: {
    hideBaseStyle: {
      handler(value: boolean): void;
      immediate: boolean;
    };
  };
};
