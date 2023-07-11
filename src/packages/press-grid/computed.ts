import { style } from '../common/utils/style';
import { addUnit } from '../common/utils/add-unit';

function rootStyle(data) {
  return style({
    'padding-left': addUnit(data.gutter),
  });
}

export default {
  rootStyle,
};
