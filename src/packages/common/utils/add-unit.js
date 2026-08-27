import { isNumber } from './validator';
const REGEXP = /^-?\d+(\.\d+)?$/;

export function addUnit(value) {
  if (value == null) {
    return undefined;
  }
  return REGEXP.test(`${value}`) ? `${value}px` : value;
}

export default addUnit;


/**
 * @description 用于获取用户传递值的px值  如果用户传递了"xxpx"或者"xxrpx"，取出其数值部分，如果是"xxxrpx"还需要用过uni.upx2px进行转换
 * @param {number|string} value 用户传递值的px值
 * @param {boolean} unit
 * @returns {number|string}
 */
export function getPx(value, unit = false) {
  if (isNumber(value)) {
    return unit ? `${value}px` : Number(value);
  }
  // 如果带有rpx，先取出其数值部分，再转为px值
  if (/(rpx|upx)$/.test(value)) {
    return unit ? `${uni.upx2px(parseInt(value, 10))}px` : Number(uni.upx2px(parseInt(value, 10)));
  }
  return unit ? `${parseInt(value, 10)}px` : parseInt(value, 10);
}
