import { style } from '../common/utils/style';
import { addUnit } from '../common/utils/add-unit';

function iconStyle(data: Record<string, any>) {
  const styles: Record<string, string> = {
    'font-size': addUnit(data.iconSize),
  };

  if (
    data.checkedColor
    && !(data.disabled || data.parentDisabled)
    && data.value === data.name
  ) {
    styles['border-color'] = data.checkedColor;
    styles['background-color'] = data.checkedColor;
  }

  return style(styles);
}

function iconCustomStyle(data: Record<string, any>) {
  const styles: Record<string, string> = {
    'font-size': addUnit(data.iconSize),
    'line-height': addUnit(data.iconSize),
    display: 'block',
  };

  if (
    data.checkedColor
    && !(data.disabled || data.parentDisabled)
    && data.value === data.name
  ) {
    styles['border-color'] = data.checkedColor;
    styles['background-color'] = data.checkedColor;
  }

  return style(styles);

  // return style({
  //   'line-height': addUnit(data.iconSize),
  //   'font-size': '.8em',
  //   display: 'block',
  // });
}

export default {
  iconStyle,
  iconCustomStyle,
};
