import { addUnit } from '../common/utils/add-unit';
import { style } from '../common/utils/style';

function rootStyle(data) {
  return style([
    data.customStyle,
    {
      'padding-left': addUnit(data.gutter),
    },
  ]);
}

export default {
  rootStyle,
};
