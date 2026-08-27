import { addUnit } from '../common/utils/add-unit';
import { style } from '../common/utils/style';

function isObj(x) {
  const type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function optionText(option, valueKey) {
  return isObj(option) && option[valueKey] != null ? option[valueKey] : option;
}


function optionTextHtml(option) {
  return isObj(option) && option.html;
}

function rootStyle(data) {
  return style({
    height: addUnit(data.itemHeight * data.visibleItemCount),
  });
}

function wrapperStyle(data) {
  const offset = addUnit(data.offset + (data.itemHeight * (data.visibleItemCount - 1)) / 2);

  return style({
    transition: `transform ${data.duration}ms`,
    'line-height': addUnit(data.itemHeight),
    transform: `translate3d(0, ${offset}, 0)`,
  });
}

export default {
  optionText,
  optionTextHtml,
  rootStyle,
  wrapperStyle,
};
