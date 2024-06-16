import { style } from '../common/utils/style';

function rootStyle(data) {
  return style([
    {
      '-webkit-transition-duration': `${data.currentDuration}ms`,
      'transition-duration': `${data.currentDuration}ms`,
    },
    data.display ? null : 'display: none',
    data.customStyle,
  ]);
}

export default {
  rootStyle,
};
