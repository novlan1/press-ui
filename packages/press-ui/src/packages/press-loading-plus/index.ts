import { style } from '../common/utils/style';
import { addUnit } from '../common/utils/add-unit';

function spinnerStyle(data: Record<string, any>) {
  return style({
    color: data.color,
    width: addUnit(data.size),
    height: addUnit(data.size),
  });
}

function textStyle(data: Record<string, any>) {
  return style({
    'font-size': addUnit(data.textSize),
  });
}

export default {
  spinnerStyle,
  textStyle,
};
