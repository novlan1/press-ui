export declare function getH5ComponentHandler({ defaultOptions, component }: {
  defaultOptions: Record<string, any>;
  component: any;
}): {
  (options?: {
    type?: string;
    onClose?: Function;
    animationDuration?: number;
    duration: number;
  }): any;
  clear(all?: boolean): void;
  setDefaultOptions(type: any, options: Record<string, any>): void;
  resetDefaultOptions(type: any): void;
  allowMultiple(value?: boolean): void;
  install(): void;
};
export declare function initH5Instance(vueDialog: any, id: string, options?: {}): any;
