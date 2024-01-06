import { style } from '../common/utils/style';

function rootStyle(data: Record<string, any>) {
  return style({
    'background-color': data.plain ? '' : data.color,
    color: data.textColor || data.plain ? data.textColor || data.color : '',
  });
}

export default {
  rootStyle,
};
