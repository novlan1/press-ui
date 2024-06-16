export declare const link: {
  props: {
    url: {
      type: StringConstructor;
      default: string;
    };
    linkType: {
      type: StringConstructor;
      default: string;
    };
  };
  methods: {
    jumpLink(this: any, urlKey?: string): void;
  };
};
