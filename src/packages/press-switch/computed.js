import { addUnit } from '../common/utils/add-unit';
import { style } from '../common/utils/style';

function rootStyle(data) {
  const currentColor = data.checked === data.activeValue ? data.activeColor : data.inactiveColor;

  return style({
    'font-size': addUnit(data.size),
    'background-color': currentColor,
  });
}

const BLUE = '#1989fa';
const GRAY_DARK = '#969799';

function loadingColor(data) {
  return data.checked === data.activeValue
    ? data.activeColor || BLUE
    : data.inactiveColor || GRAY_DARK;
}

export default {
  rootStyle,
  loadingColor,
};
