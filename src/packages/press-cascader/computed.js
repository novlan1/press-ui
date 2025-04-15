import { style } from '../common/utils/style';
import utils from '../common/utils/utils';

function isSelected(tab, valueKey, option) {
  return tab.selected && tab.selected[valueKey] === option[valueKey];
}

function optionClass(tab, valueKey, option) {
  return utils.bem2('cascader__option', { selected: isSelected(tab, valueKey, option), disabled: option.disabled });
}

function optionStyle(data) {
  const color = data.option.color || (isSelected(data.tab, data.valueKey, data.option) ? data.activeColor : undefined);
  const result = style({
    color,
  });
  return result;
}


export default {
  isSelected,
  optionClass,
  optionStyle,
};
