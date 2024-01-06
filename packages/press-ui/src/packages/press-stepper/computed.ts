import { style } from '../common/utils/style';
import { addUnit } from '../common/utils/add-unit';

function buttonStyle(data: Record<string, any>) {
  return style({
    width: addUnit(data.buttonSize),
    height: addUnit(data.buttonSize),
  });
}

function inputStyle(data: Record<string, any>) {
  return style({
    width: addUnit(data.inputWidth),
    height: addUnit(data.buttonSize),
  });
}

export default {
  buttonStyle,
  inputStyle,
};
