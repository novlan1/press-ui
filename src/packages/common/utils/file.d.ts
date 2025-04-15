/**
 * 从url读取File
 * @param {string} url
 * @param {boolean} local
 * @param {Promise}
 */
export declare function urlToFile(url: string, local?: boolean): Promise<unknown>;
/**
 * base64转File
 * @param {string} base64
 * @return {File}
 */
export declare function base64ToFile(base64: string): any;
/**
 * 简易获取文件名
 * @param {*} url
 */
export declare function getFileName(url: string): string;
/**
 * blob转File
 * @param {Blob} blob
 * @param {string} type
 * @return {File}
 */
export declare function blobToFile(blob: any, type?: string): any;
/**
 * 从本地file或者blob对象创建url
 * @param {Blob|File} file
 * @return {string}
 */
export declare function fileToUrl(file: any): string;
export declare function getSameOriginUrl(url: string): Promise<string>;
export declare function revokeObjectURL(url: string): void;
