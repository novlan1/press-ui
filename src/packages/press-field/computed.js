import { addUnit } from '../common/utils/add-unit';
import { style } from '../common/utils/style';

function inputStyle(autosize) {
  if (autosize && autosize.constructor === 'Object') {
    return style({
      'min-height': addUnit(autosize.minHeight),
      'max-height': addUnit(autosize.maxHeight),
    });
  }

  return '';
}

export default {
  inputStyle,
};
