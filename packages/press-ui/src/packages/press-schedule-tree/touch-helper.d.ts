export declare const REF_MAP: {
  TREE_REF: string;
  TREE_ID: string;
};
export declare const SCROLL_SELECTOR: string;
export declare function endTouch({ endX, context, scrollTime, column, autoBackToTop, setScrollParams, needLog }: Record<string, any>): true | undefined;
export declare function backToTop(context: any): void;
export declare function scrollToH5(endPosition: number | undefined, { animation }: {
  animation?: boolean | undefined;
}): void;
