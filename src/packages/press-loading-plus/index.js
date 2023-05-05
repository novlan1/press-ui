import style from '../common/utils/style';
import addUnit from '../common/utils/add-unit';

function spinnerStyle(data) {
  return style({
    color: data.color,
    width: addUnit(data.size),
    height: addUnit(data.size),
  });
}

function textStyle(data) {
  return style({
    'font-size': addUnit(data.textSize),
  });
}

export default {
  spinnerStyle,
  textStyle,
};
