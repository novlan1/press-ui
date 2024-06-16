export declare function BindEventMixin(handler: Function): {
  mounted: () => void;
  activated: () => void;
  deactivated: () => void;
  beforeDestroy: () => void;
};
