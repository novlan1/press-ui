import Vue from 'vue';

export const IN_BROWSER = typeof window !== 'undefined';

export const IS_SERVER = Vue.prototype.$isServer;

export function isDef(val) {
  return val !== undefined && val !== null;
}

export function isFunction(val) {
  return typeof val === 'function';
}

export function isObject(val) {
  return val !== null && typeof val === 'object';
}

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
export function isEmpty(value) {
  if (value == null) {
    return true;
  }

  if (typeof value !== 'object') {
    return true;
  }

  return Object.keys(value).length === 0;
}


export function isPlainObject(val) {
  return val !== null && typeof val === 'object' && !Array.isArray(val);
}
export function isPromise(val) {
  return isPlainObject(val) && isFunction(val.then) && isFunction(val.catch);
}

export function isObj(x) {
  const type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

export function isNumber(value) {
  return /^\d+(\.\d+)?$/.test(value);
}
export function isBoolean(value) {
  return typeof value === 'boolean';
}

const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
const VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv)/i;

export function isImageUrl(url) {
  return IMAGE_REGEXP.test(url);
}
export function isVideoUrl(url) {
  return VIDEO_REGEXP.test(url);
}

export function isDate(val) {
  return Object.prototype.toString.call(val) === '[object Date]' && !isNaN(val.getTime());
}

export function isEmail(value) {
  const reg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return reg.test(value.trim());
}

export function isMobile(value) {
  value = value.replace(/[^-|\d]/g, '');
  return /^((\+86)|(86))?(1)\d{10}$/.test(value) || /^0[0-9-]{10,13}$/.test(value);
}

export function isNumeric(val) {
  return /^\d+(\.\d+)?$/.test(val);
}

export function isNaN(val) {
  if (Number.isNaN) {
    return Number.isNaN(val);
  }
  return val !== val;
}

export function isAndroid() {
  return IS_SERVER ? false : /android/.test(navigator.userAgent.toLowerCase());
}

export function isIOS() {
  return IS_SERVER ? false : /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
}

export function isH5() {
  return process.env.UNI_PLATFORM === 'h5';
}
