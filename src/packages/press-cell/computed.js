import { addUnit } from '../common/utils/add-unit';
import { style } from '../common/utils/style';

function titleStyle(data) {
  return style([
    {
      'max-width': addUnit(data.titleWidth),
      'min-width': addUnit(data.titleWidth),
    },
    data.titleStyle,
  ]);
}

export default {
  titleStyle,
};
