
import { isObject, isDef, isPlainObject } from '../utils/validator';

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

const { hasOwnProperty } = Object.prototype;


export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}


function assignKey(to, from, key) {
  const val = from[key];

  if (!isDef(val)) {
    return;
  }

  if (!hasOwnProperty.call(to, key) || !isObject(val)) {
    to[key] = val;
  } else {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    to[key] = deepAssign(Object(to[key]), from[key]);
  }
}

export function deepAssign(to, from) {
  Object.keys(from).forEach((key) => {
    assignKey(to, from, key);
  });

  return to;
}


// export default { keys };


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

export const isObjectEqual = (obj1, obj2) => {
  const o1 = obj1 instanceof Object;
  const o2 = obj2 instanceof Object;

  // 如果不是对象 直接判断数据是否相等
  if (!o1 || !o2) {
    return obj1 === obj2;
  }

  // 判断对象的可枚举属性组成的数组长度
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const attr in obj1) {
    const type1 = Object.prototype.toString.call(obj1[attr]) == '[object Object]';
    const type2 = Object.prototype.toString.call(obj2[attr]) == '[object Object]';
    const arr1 = Object.prototype.toString.call(obj1[attr]) == '[object Array]';

    if (type1 && type2) {
      // 如果是对象继续判断
      return isObjectEqual(obj1[attr], obj2[attr]);
    }
    if (arr1) {
      // 如果是对象 判断
      if (obj1[attr].toString() != obj2[attr].toString()) {
        return false;
      }
    } else if (obj1[attr] !== obj2[attr]) {
      // 不是对象的就判断数值是否相等
      return false;
    }
  }
  return true;
};
