const utils = require('../../utils');

function getDate(date) {
  return new Date(date);
}

function getMark(date) {
  return getDate(date).getMonth() + 1;
}

const ROW_HEIGHT = 64;

function getDayStyle(type, index, date, rowHeight, color, firstDayOfWeek) {
  const style = [];
  const current = getDate(date).getDay() || 7;
  const offset = current < firstDayOfWeek
    ? (7 - firstDayOfWeek + current)
    : current === 7 && firstDayOfWeek === 0 ? 0
      : (current - firstDayOfWeek);

  if (index === 0) {
    style.push(['margin-left', `${(100 * offset) / 7}%`]);
  }

  if (rowHeight !== ROW_HEIGHT) {
    style.push(['height', `${rowHeight}px`]);
  }

  if (color) {
    if (
      type === 'start'
      || type === 'end'
      || type === 'start-end'
      || type === 'multiple-selected'
      || type === 'multiple-middle'
    ) {
      style.push(['background', color]);
    } else if (type === 'middle') {
      style.push(['color', color]);
    }
  }

  return style
    .map(item => item.join(':'))
    .join(';');
}

function formatMonthTitle(date) {
  date = getDate(date);
  return `${date.getFullYear()}年${date.getMonth() + 1}月`;
}

function getMonthStyle(visible, date, rowHeight) {
  if (!visible) {
    date = getDate(date);

    const totalDay = utils.getMonthEndDay(
      date.getFullYear(),
      date.getMonth() + 1,
    );
    const offset = getDate(date).getDay();
    const padding = Math.ceil((totalDay + offset) / 7) * rowHeight;

    return `padding-bottom:${padding}px`;
  }
}

export default {
  getMark,
  getDayStyle,
  formatMonthTitle,
  getMonthStyle,
};
