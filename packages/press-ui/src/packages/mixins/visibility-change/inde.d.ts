export declare const visibilityChangeMixin: (callback: Function) => {
  mounted(this: any): void;
  destroyed(this: any): void;
  methods: {
    _watchVisibleChange(): void;
  };
};
