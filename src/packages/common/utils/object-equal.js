
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


