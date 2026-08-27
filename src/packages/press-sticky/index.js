import { addUnit } from '../common/utils/add-unit';
import { style } from '../common/utils/style';

function containerStyle(data) {
  return style({
    height: data.fixed ? addUnit(data.height) : '',
    'z-index': data.zIndex,
  });
}

function wrapStyle({
  fixed,
  offsetTop,
  transform,
  zIndex,
  customStyle,
}) {
  return style([
    {
      transform: transform
        ? `translate3d(0, ${transform}px, 0)`
        : '',
      top: fixed ? addUnit(offsetTop) : '',
      'z-index': zIndex,
    },
    customStyle,
  ]);
}


export default {
  containerStyle,
  wrapStyle,
};
