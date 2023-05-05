import style from '../common/utils/style';
import addUnit from '../common/utils/add-unit';

function columnsStyle(data) {
  return style({
    height: addUnit(data.itemHeight * data.visibleItemCount),
  });
}

function maskStyle(data) {
  return style({
    'background-size':
      `100% ${addUnit((data.itemHeight * (data.visibleItemCount - 1)) / 2)}`,
  });
}

function frameStyle(data) {
  return style({
    height: addUnit(data.itemHeight),
  });
}

function columns(columns) {
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
