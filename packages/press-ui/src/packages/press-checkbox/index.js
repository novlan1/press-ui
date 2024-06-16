import { style } from '../common/utils/style';
import { addUnit } from '../common/utils/add-unit';

function iconStyle(
  checkedColor,
  value,
  disabled,
  parentDisabled,
  iconSize,
) {
  const styles = {
    'font-size': addUnit(iconSize),
    'line-height': '1.25em',
  };

  if (checkedColor && value && !disabled && !parentDisabled) {
    styles['border-color'] = checkedColor;
    styles['background-color'] = checkedColor;
  }

  return style(styles);
}

export default {
  iconStyle,
};
