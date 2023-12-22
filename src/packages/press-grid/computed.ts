import { style } from '../common/utils/style';
import { addUnit } from '../common/utils/add-unit';

function rootStyle(data: Record<string, any>) {
  return style([data.customStyle, {
    'padding-left': addUnit(data.gutter),
  }]);
}

export default {
  rootStyle,
};
