import { style } from '../common/utils/style';
import utils from '../common/utils/utils';

function pivotText(pivotText: any, percentage: any) {
  return pivotText || `${percentage}%`;
}

function rootStyle(data: Record<string, any>) {
  return style({
    height: data.strokeWidth ? utils.addUnit(data.strokeWidth) : '',
    background: data.trackColor,
  });
}

function portionStyle(data: Record<string, any>) {
  return style({
    background: data.inactive ? '#cacaca' : data.color,
    width: data.percentage ? `${data.percentage}%` : '',
  });
}

function pivotStyle(data: Record<string, any>) {
  return style({
    color: data.textColor,
    right: `${data.right}px`,
    background: data.pivotColor ? data.pivotColor : data.inactive ? '#cacaca' : data.color,
  });
}

export default {
  pivotText,
  rootStyle,
  portionStyle,
  pivotStyle,
};
