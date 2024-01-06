import { style } from '../common/utils/style';
import { addUnit } from '../common/utils/add-unit';

function wrapperStyle(data: Record<string, any>) {
  const width = `${100 / data.columnNum}%`;

  return style({
    width,
    'padding-top': data.square ? width : null,
    'padding-right': addUnit(data.gutter),
    'margin-top':
      data.index >= data.columnNum && !data.square
        ? addUnit(data.gutter)
        : null,
  });
}

function contentStyle(data: Record<string, any>) {
  return data.square
    ? style({
      right: addUnit(data.gutter),
      bottom: addUnit(data.gutter),
      height: 'auto',
      position: 'absolute',
    })
    : '';
}

export default {
  wrapperStyle,
  contentStyle,
};
