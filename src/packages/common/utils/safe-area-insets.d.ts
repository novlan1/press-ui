declare function onChange(callback: Function): void;
declare function offChange(callback: Function): void;
export declare const safeAreaInsets: {
  readonly support: boolean;
  readonly top: number;
  readonly left: number;
  readonly right: number;
  readonly bottom: number;
  onChange: typeof onChange;
  offChange: typeof offChange;
};
export default safeAreaInsets;
