export declare function getScrollTop(id: string, event: Event): any;
export declare function getScrollHeight(id: string, event: Event): any;
export declare function holdWhenScroll({ context, eleId, targetId, scrollHeight, scrollTopThreshold }: any): void;
export declare function scrollToBottom(context: any, eleId: string, targetId: string): void;
/**
 * 小程序中scrollView的移动
 * @param {string} element scrollView的选择器
 * @param {object} context 上下文
 * @param {string} target 目标dom的选择器皿
 */
export declare function mpScrollInto({ element, context, target }: any): void;
