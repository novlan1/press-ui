export declare const IN_BROWSER: boolean;
export declare const IS_SERVER: boolean;
export declare function isDef(val: any): boolean;
export declare function isFunction(val: any): boolean;
export declare function isObject(val: any): boolean;
/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @function isEmpty
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */
export declare function isEmpty(value: any): boolean;
export declare function isPlainObject(val: any): boolean;
export declare function isPromise(val: any): boolean;
export declare function isObj(x: any): boolean;
export declare function isNumber(value: any): boolean;
export declare function isBoolean(value: any): boolean;
export declare function isImageUrl(url: any): boolean;
export declare function isVideoUrl(url: any): boolean;
export declare function isDate(val: any): boolean;
export declare function isEmail(value: any): boolean;
export declare function isMobile(value: any): boolean;
export declare function isNumeric(val: any): boolean;
export declare function isNaN(val: any): boolean;
export declare function isAndroid(): boolean;
export declare function isIOS(): boolean;
export declare function isH5(): boolean;
