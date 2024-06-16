export declare function getScrollTop(id: string, event: Event): string | number | boolean | Document | ParentNode | HTMLElement | Element | ChildNode | ((other: Node | null) => boolean) | (<T extends Node>(node: T) => T) | (<T_1 extends Node>(child: T_1) => T_1) | ((event: Event) => boolean) | {
    <K extends keyof ElementEventMap>(type: K, listener: (this: Element, ev: ElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions | undefined): void;
    (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions | undefined): void;
} | {
    <K_1 extends keyof ElementEventMap>(type: K_1, listener: (this: Element, ev: ElementEventMap[K_1]) => any, options?: boolean | EventListenerOptions | undefined): void;
    (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions | undefined): void;
} | {
    <K_2 extends keyof HTMLElementTagNameMap>(selectors: K_2): NodeListOf<HTMLElementTagNameMap[K_2]>;
    <K_3 extends keyof SVGElementTagNameMap>(selectors: K_3): NodeListOf<SVGElementTagNameMap[K_3]>;
    <E extends Element = Element>(selectors: string): NodeListOf<E>;
} | {
  (options?: ScrollToOptions | undefined): void;
  (x: number, y: number): void;
} | NamedNodeMap | DOMTokenList | ((this: Element, ev: Event) => any) | ((this: Element, ev: Event) => any) | ShadowRoot | ((init: ShadowRootInit) => ShadowRoot) | {
    <K_4 extends keyof HTMLElementTagNameMap>(selector: K_4): HTMLElementTagNameMap[K_4] | null;
    <K_5 extends keyof SVGElementTagNameMap>(selector: K_5): SVGElementTagNameMap[K_5] | null;
    <E_1 extends Element = Element>(selectors: string): E_1 | null;
} | ((qualifiedName: string) => string | null) | ((namespace: string | null, localName: string) => string | null) | (() => string[]) | ((qualifiedName: string) => Attr | null) | ((namespace: string | null, localName: string) => Attr | null) | (() => DOMRect) | (() => DOMRectList) | ((classNames: string) => HTMLCollectionOf<Element>) | {
    <K_6 extends keyof HTMLElementTagNameMap>(qualifiedName: K_6): HTMLCollectionOf<HTMLElementTagNameMap[K_6]>;
    <K_7 extends keyof SVGElementTagNameMap>(qualifiedName: K_7): HTMLCollectionOf<SVGElementTagNameMap[K_7]>;
    (qualifiedName: string): HTMLCollectionOf<Element>;
} | {
  (namespaceURI: 'http://www.w3.org/1999/xhtml', localName: string): HTMLCollectionOf<HTMLElement>;
  (namespaceURI: 'http://www.w3.org/2000/svg', localName: string): HTMLCollectionOf<SVGElement>;
  (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
} | ((qualifiedName: string) => boolean) | ((namespace: string | null, localName: string) => boolean) | (() => boolean) | ((pointerId: number) => boolean) | ((where: InsertPosition, element: Element) => Element | null) | ((position: InsertPosition, text: string) => void) | ((where: InsertPosition, data: string) => void) | ((selectors: string) => boolean) | ((pointerId: number) => void) | ((qualifiedName: string) => void) | ((namespace: string | null, localName: string) => void) | ((attr: Attr) => Attr) | ((options?: FullscreenOptions | undefined) => Promise<void>) | (() => void) | {
  (options?: ScrollToOptions | undefined): void;
  (x: number, y: number): void;
} | ((arg?: boolean | ScrollIntoViewOptions | undefined) => void) | {
  (options?: ScrollToOptions | undefined): void;
  (x: number, y: number): void;
} | ((qualifiedName: string, value: string) => void) | ((namespace: string | null, qualifiedName: string, value: string) => void) | ((attr: Attr) => Attr | null) | ((attr: Attr) => Attr | null) | ((pointerId: number) => void) | ((qualifiedName: string, force?: boolean | undefined) => boolean) | ((selectors: string) => boolean) | NodeListOf<ChildNode> | ((deep?: boolean | undefined) => Node) | ((other: Node) => number) | ((options?: GetRootNodeOptions | undefined) => Node) | (() => boolean) | (<T_2 extends Node>(node: T_2, child: Node | null) => T_2) | ((namespace: string | null) => boolean) | ((otherNode: Node | null) => boolean) | ((otherNode: Node | null) => boolean) | ((prefix: string | null) => string | null) | ((namespace: string | null) => string | null) | (() => void) | (<T_3 extends Node>(node: Node, child: T_3) => T_3) | ((keyframes: Keyframe[] | PropertyIndexedKeyframes | null, options?: number | KeyframeAnimationOptions | undefined) => Animation) | ((options?: GetAnimationsOptions | undefined) => Animation[]) | ((...nodes: (string | Node)[]) => void) | ((...nodes: (string | Node)[]) => void) | (() => void) | ((...nodes: (string | Node)[]) => void) | HTMLCollection | ((...nodes: (string | Node)[]) => void) | ((...nodes: (string | Node)[]) => void) | {
    <K_8 extends keyof HTMLElementTagNameMap>(selectors: K_8): HTMLElementTagNameMap[K_8] | null;
    <K_9 extends keyof SVGElementTagNameMap>(selectors: K_9): SVGElementTagNameMap[K_9] | null;
    <E_2 extends Element = Element>(selectors: string): E_2 | null;
} | ((...nodes: (string | Node)[]) => void) | HTMLSlotElement | null;
export declare function getScrollHeight(id: string, event: Event): string | number | boolean | Document | ParentNode | HTMLElement | Element | ChildNode | ((other: Node | null) => boolean) | (<T extends Node>(node: T) => T) | (<T_1 extends Node>(child: T_1) => T_1) | ((event: Event) => boolean) | {
    <K extends keyof ElementEventMap>(type: K, listener: (this: Element, ev: ElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions | undefined): void;
    (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions | undefined): void;
} | {
    <K_1 extends keyof ElementEventMap>(type: K_1, listener: (this: Element, ev: ElementEventMap[K_1]) => any, options?: boolean | EventListenerOptions | undefined): void;
    (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions | undefined): void;
} | {
    <K_2 extends keyof HTMLElementTagNameMap>(selectors: K_2): NodeListOf<HTMLElementTagNameMap[K_2]>;
    <K_3 extends keyof SVGElementTagNameMap>(selectors: K_3): NodeListOf<SVGElementTagNameMap[K_3]>;
    <E extends Element = Element>(selectors: string): NodeListOf<E>;
} | {
  (options?: ScrollToOptions | undefined): void;
  (x: number, y: number): void;
} | NamedNodeMap | DOMTokenList | ((this: Element, ev: Event) => any) | ((this: Element, ev: Event) => any) | ShadowRoot | ((init: ShadowRootInit) => ShadowRoot) | {
    <K_4 extends keyof HTMLElementTagNameMap>(selector: K_4): HTMLElementTagNameMap[K_4] | null;
    <K_5 extends keyof SVGElementTagNameMap>(selector: K_5): SVGElementTagNameMap[K_5] | null;
    <E_1 extends Element = Element>(selectors: string): E_1 | null;
} | ((qualifiedName: string) => string | null) | ((namespace: string | null, localName: string) => string | null) | (() => string[]) | ((qualifiedName: string) => Attr | null) | ((namespace: string | null, localName: string) => Attr | null) | (() => DOMRect) | (() => DOMRectList) | ((classNames: string) => HTMLCollectionOf<Element>) | {
    <K_6 extends keyof HTMLElementTagNameMap>(qualifiedName: K_6): HTMLCollectionOf<HTMLElementTagNameMap[K_6]>;
    <K_7 extends keyof SVGElementTagNameMap>(qualifiedName: K_7): HTMLCollectionOf<SVGElementTagNameMap[K_7]>;
    (qualifiedName: string): HTMLCollectionOf<Element>;
} | {
  (namespaceURI: 'http://www.w3.org/1999/xhtml', localName: string): HTMLCollectionOf<HTMLElement>;
  (namespaceURI: 'http://www.w3.org/2000/svg', localName: string): HTMLCollectionOf<SVGElement>;
  (namespace: string | null, localName: string): HTMLCollectionOf<Element>;
} | ((qualifiedName: string) => boolean) | ((namespace: string | null, localName: string) => boolean) | (() => boolean) | ((pointerId: number) => boolean) | ((where: InsertPosition, element: Element) => Element | null) | ((position: InsertPosition, text: string) => void) | ((where: InsertPosition, data: string) => void) | ((selectors: string) => boolean) | ((pointerId: number) => void) | ((qualifiedName: string) => void) | ((namespace: string | null, localName: string) => void) | ((attr: Attr) => Attr) | ((options?: FullscreenOptions | undefined) => Promise<void>) | (() => void) | {
  (options?: ScrollToOptions | undefined): void;
  (x: number, y: number): void;
} | ((arg?: boolean | ScrollIntoViewOptions | undefined) => void) | {
  (options?: ScrollToOptions | undefined): void;
  (x: number, y: number): void;
} | ((qualifiedName: string, value: string) => void) | ((namespace: string | null, qualifiedName: string, value: string) => void) | ((attr: Attr) => Attr | null) | ((attr: Attr) => Attr | null) | ((pointerId: number) => void) | ((qualifiedName: string, force?: boolean | undefined) => boolean) | ((selectors: string) => boolean) | NodeListOf<ChildNode> | ((deep?: boolean | undefined) => Node) | ((other: Node) => number) | ((options?: GetRootNodeOptions | undefined) => Node) | (() => boolean) | (<T_2 extends Node>(node: T_2, child: Node | null) => T_2) | ((namespace: string | null) => boolean) | ((otherNode: Node | null) => boolean) | ((otherNode: Node | null) => boolean) | ((prefix: string | null) => string | null) | ((namespace: string | null) => string | null) | (() => void) | (<T_3 extends Node>(node: Node, child: T_3) => T_3) | ((keyframes: Keyframe[] | PropertyIndexedKeyframes | null, options?: number | KeyframeAnimationOptions | undefined) => Animation) | ((options?: GetAnimationsOptions | undefined) => Animation[]) | ((...nodes: (string | Node)[]) => void) | ((...nodes: (string | Node)[]) => void) | (() => void) | ((...nodes: (string | Node)[]) => void) | HTMLCollection | ((...nodes: (string | Node)[]) => void) | ((...nodes: (string | Node)[]) => void) | {
    <K_8 extends keyof HTMLElementTagNameMap>(selectors: K_8): HTMLElementTagNameMap[K_8] | null;
    <K_9 extends keyof SVGElementTagNameMap>(selectors: K_9): SVGElementTagNameMap[K_9] | null;
    <E_2 extends Element = Element>(selectors: string): E_2 | null;
} | ((...nodes: (string | Node)[]) => void) | HTMLSlotElement | null;
export declare function holdWhenScroll({ context, eleId, targetId, scrollHeight, scrollTopThreshold }: any): void;
export declare function scrollToBottom(context: any, eleId: string, targetId: string): void;
/**
 * 小程序中scrollView的移动
 * @param {string} element scrollView的选择器
 * @param {object} context 上下文
 * @param {string} target 目标dom的选择器皿
 */
export declare function mpScrollInto({ element, context, target }: any): void;
