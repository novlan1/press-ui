import style from '../common/utils/style';

function barStyle(data) {
  return style({
    'z-index': data.zIndex,
    'padding-top': data.safeAreaInsetTop ? `${data.statusBarHeight}px` : 0,
  });
}

export default {
  barStyle,
};
