import { style } from '../common/utils/style';

function popupStyle(data: Record<string, any>) {
  return style([
    {
      'z-index': data.zIndex,
      '-webkit-transition-duration': `${data.currentDuration}ms`,
      'transition-duration': `${data.currentDuration}ms`,
    },
    data.display ? null : 'display: none',
    data.customStyle,
  ]);
}

export default {
  popupStyle,
};
