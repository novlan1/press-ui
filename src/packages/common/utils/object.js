
import { isObject, isPlainObject } from '../utils/validator';

const REGEXP = /{|}|"/g;


export function noop() {}


export function get(object, path) {
  const keys = path.split('.');
  let result = object;

  keys.forEach((key) => {
    result = isObject(result) ? (result[key] ||  '') : '';
  });

  return result;
}


export function keys(obj) {
  return JSON.stringify(obj)
    .replace(REGEXP, '')
    .split(',')
    .map(item => item.split(':')[0]);
}


export function pickExclude(obj, keys) {
  if (!isPlainObject(obj)) {
    return {};
  }
  return Object.keys(obj).reduce((prev, key) => {
    if (!keys.includes(key)) {
      prev[key] = obj[key];
    }
    return prev;
  }, {});
}


export function isEmpty(object) {
  if (!object) return true;
  if (Array.isArray(object)) {
    return !object.length;
  }
  if (typeof object === 'object') {
    return !Object.keys(object).length;
  }
  return !object;
}


