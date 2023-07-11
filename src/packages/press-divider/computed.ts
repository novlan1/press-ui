import { style } from '../common/utils/style';
import { addUnit } from '../common/utils/add-unit';

function rootStyle(data) {
  return style([
    {
      'border-color': data.borderColor,
      color: data.textColor,
      'font-size': addUnit(data.fontSize),
    },
    data.customStyle,
  ]);
}

export default {
  rootStyle,
};
