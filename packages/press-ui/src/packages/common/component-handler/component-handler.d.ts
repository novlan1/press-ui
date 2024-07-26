export declare function formatPropKey(key: string): string;
export declare function getPropsWatch(props: Record<string, any>): Record<string, any>;
export declare function getPropsData(context: any, props: Record<string, any>): Record<string, any>;
export declare function setPropsToData(this: any, data: Record<string, any>): void;
export declare function parseOptions(message: any, defaultKey?: string): any;
export declare function makeExtraMethods(obj:
Function & Record<string, any>, methodList: Array<string>, defaultKey?: string): void;
