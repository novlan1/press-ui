import { style } from '../common/utils/style';
import { addUnit } from '../common/utils/add-unit';

function columnsStyle(data: Record<string, any>) {
  return style({
    height: addUnit(data.itemHeight * data.visibleItemCount),
  });
}

function maskStyle(data: Record<string, any>) {
  return style({
    'background-size':
      `100% ${addUnit((data.itemHeight * (data.visibleItemCount - 1)) / 2)}`,
  });
}

function frameStyle(data: Record<string, any>) {
  return style({
    height: addUnit(data.itemHeight),
  });
}

function columns(columns: any) {
  if (!Array.isArray(columns)) {
    return [];
  }

  if (columns.length && !columns[0].values) {
    return [{ values: columns }];
  }
  return columns;
}

export default {
  columnsStyle,
  frameStyle,
  maskStyle,
  columns,
};
