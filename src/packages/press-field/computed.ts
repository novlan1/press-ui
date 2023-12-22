import { style } from '../common/utils/style';
import { addUnit } from '../common/utils/add-unit';

function inputStyle(autosize: any) {
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
