import { style } from '../common/utils/style';
import { addUnit } from '../common/utils/add-unit';

function buttonStyle(data) {
  return style({
    width: addUnit(data.buttonSize),
    height: addUnit(data.buttonSize),
  });
}

function inputStyle(data) {
  return style({
    width: addUnit(data.inputWidth),
    height: addUnit(data.buttonSize),
  });
}

export default {
  buttonStyle,
  inputStyle,
};
