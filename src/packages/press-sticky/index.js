import { style } from '../common/utils/style';
import { addUnit } from '../common/utils/add-unit';

function containerStyle(data) {
  return style({
    height: data.fixed ? addUnit(data.height) : '',
    'z-index': data.zIndex,
  });
}

function wrapStyle(data) {
  return style({
    transform: data.transform
      ? `translate3d(0, ${data.transform}px, 0)`
      : '',
    top: data.fixed ? addUnit(data.offsetTop) : '',
    'z-index': data.zIndex,
  });
}


export default {
  containerStyle,
  wrapStyle,
};
