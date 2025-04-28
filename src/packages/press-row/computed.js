import { addUnit } from '../common/utils/add-unit';
import { style } from '../common/utils/style';

function rootStyle(data) {
  if (!data.gutter) {
    return '';
  }

  return style({
    'margin-right': addUnit(-data.gutter / 2),
    'margin-left': addUnit(-data.gutter / 2),
  });
}

export default {
  rootStyle,
};
