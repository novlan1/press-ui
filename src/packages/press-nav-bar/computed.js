import { style } from '../common/utils/style';

function barStyle({
  zIndex,
  safeAreaInsetTop,
  statusBarHeight,
  customStyle,
}) {
  return style([
    {
      'z-index': zIndex,
      'padding-top': safeAreaInsetTop ? `${statusBarHeight}px` : 0,
    },
    customStyle,
  ]);
}

export default {
  barStyle,
};
