export declare function noop(): void;
export declare function get(object: any, path: string): any;
export declare function keys(obj: Record<string, any>): string[];
export declare function hasOwn(obj: Record<string, any>, key: string): boolean;
export declare function deepAssign(to: Record<string, any>, from: Record<string, any>): Record<string, any>;
export declare function pickExclude(obj: Record<string, any>, keys: Array<string>): Record<string, any>;
export declare function isEmpty(object: any): boolean;
export declare const isObjectEqual: (obj1: any, obj2: any) => boolean;
export declare const deepClone: (obj: any, cache?: WeakMap) => any;
