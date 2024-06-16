type IConfig = number | string | Array<Record<string, string | number>> | Record<string, string | number>;
export declare function bem(name: string, conf: IConfig): string;
export declare function bem2(name: string, conf: IConfig): string;
export declare function bem3(name: string, conf: IConfig, extraClassPrefix: string): string;
export default bem;
