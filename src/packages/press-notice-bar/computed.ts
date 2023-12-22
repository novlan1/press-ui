import { style } from '../common/utils/style';

function rootStyle(data: Record<string, any>) {
  return style({
    color: data.color,
    'background-color': data.backgroundColor,
    background: data.background,
  });
}

export default {
  rootStyle,
};
