export default pathToRegexp;
/**
  * Normalize the given path string, returning a regular expression.
  *
  * An empty array can be passed in for the keys, which will hold the
  * placeholder key descriptions. For example, using `/user/:id`, `keys` will
  * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
  *
  * @param  {(string|RegExp|Array)} path
  * @param  {Array=}                keys
  * @param  {Object=}               options
  * @return {!RegExp}
  */
declare function pathToRegexp(path: (string | RegExp | any[]), keys?: any[] | undefined, options?: Object | undefined): RegExp;
/**
  * Parse a string for the raw tokens.
  *
  * @param  {string}  str
  * @param  {Object=} options
  * @return {!Array}
  */
export function parse(str: string, options?: Object | undefined): any[];
/**
  * Compile a string to a template function for the path.
  *
  * @param  {string}             str
  * @param  {Object=}            options
  * @return {!function(Object=, Object=)}
  */
export function compile(str: string, options?: Object | undefined): (arg0: Object | undefined, arg1: Object | undefined) => any;
/**
  * Expose a method for transforming tokens into the path function.
  */
export function tokensToFunction(tokens: any): (data: any, options: any) => string;
/**
  * Expose a function for taking tokens and returning a RegExp.
  *
  * @param  {!Array}  tokens
  * @param  {Array=}  keys
  * @param  {Object=} options
  * @return {!RegExp}
  */
export function tokensToRegExp(tokens: any[], keys?: any[] | undefined, options?: Object | undefined): RegExp;
