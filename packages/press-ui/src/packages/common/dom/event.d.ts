export declare function on(target: Element, event: string, handler: EventListenerOrEventListenerObject, passive?: boolean): void;
export declare function off(target: Element, event: string, handler: EventListenerOrEventListenerObject): void;
export declare function stopPropagation(event: Event): void;
export declare function preventDefault(event: Event, isStopPropagation?: boolean): void;
export declare function getEventValue(event: Event): any;
export declare function getEventDetail(event: Event & any): any;
