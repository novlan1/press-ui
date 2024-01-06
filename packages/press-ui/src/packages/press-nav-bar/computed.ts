import { style } from '../common/utils/style';

function barStyle(data: Record<string, any>) {
  return style({
    'z-index': data.zIndex,
    'padding-top': data.safeAreaInsetTop ? `${data.statusBarHeight}px` : 0,
  });
}

export default {
  barStyle,
};
