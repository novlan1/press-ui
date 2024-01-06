import { style } from '../common/utils/style';
import { addUnit } from '../common/utils/add-unit';

function isObj(x: any) {
  const type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function optionText(option: any, valueKey?: any) {
  return isObj(option) && option[valueKey] != null ? option[valueKey] : option;
}

function rootStyle(data: Record<string, any>) {
  return style({
    height: addUnit(data.itemHeight * data.visibleItemCount),
  });
}

function wrapperStyle(data: Record<string, any>) {
  const offset = addUnit(data.offset + (data.itemHeight * (data.visibleItemCount - 1)) / 2);

  return style({
    transition: `transform ${data.duration}ms`,
    'line-height': addUnit(data.itemHeight),
    transform: `translate3d(0, ${offset}, 0)`,
  });
}

export default {
  optionText,
  rootStyle,
  wrapperStyle,
};
