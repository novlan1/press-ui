/* eslint-disable no-nested-ternary */
import { getMonthEndDay } from '../../utils';

type IDate = string | number | Date;


function getDate(date: IDate) {
  return new Date(date);
}

function getMark(date: IDate) {
  return getDate(date).getMonth() + 1;
}

const ROW_HEIGHT = 64;

function getDayStyle(
  type: string,
  index: null,
  date: IDate,
  rowHeight: string | number,
  color: string,
  firstDayOfWeek: number,
) {
  const style: Array<Array<string>> = [];
  const current = getDate(date).getDay() || 7;

  const offset = current < firstDayOfWeek
    ? (7 - firstDayOfWeek + current)
    : current === 7 && firstDayOfWeek === 0
      ? 0
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

function formatMonthTitle(date: IDate) {
  date = getDate(date);
  return `${date.getFullYear()}年${date.getMonth() + 1}月`;
}

function getMonthStyle(visible: boolean, date: IDate, rowHeight: number) {
  if (!visible) {
    date = getDate(date);

    const totalDay = getMonthEndDay(
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
