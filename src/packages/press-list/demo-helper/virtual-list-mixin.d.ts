export declare const virtualListMixin: (virtualListThreshold?: number) => {
  computed: {
    upMissed(): number;
    showingData(): any;
    hiddenUpPartStyle(): string;
    wrapStyle(): string;
  };
  methods: {
    updateCurrentIndex(event: any, scrollerHeight: number): void;
  };
  data(): {
    currentIndex: number;
    useVirtualList: boolean;
  };
};
