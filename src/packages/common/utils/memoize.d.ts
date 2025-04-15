/**
 * Simple memoize
 * wxs doesn't support fn.apply, so this memoize only support up to 2 args
 */
export declare function memoize(fn: Function): () => any;
export default memoize;
