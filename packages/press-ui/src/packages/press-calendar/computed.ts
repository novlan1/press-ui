import { compareMonth } from './utils';

type IDate = string | number | Date;


function getDate(date: IDate) {
  return new Date(date);
}

function getMonths(minDate: IDate, maxDate: IDate) {
  const months: Array<number> = [];
  const cursor = getDate(minDate);

  cursor.setDate(1);

  do {
    months.push(cursor.getTime());
    cursor.setMonth(cursor.getMonth() + 1);
  } while (compareMonth(cursor, getDate(maxDate)) !== 1);

  return months;
}

function getButtonDisabled(type: string, currentDate?: any) {
  if (currentDate == null) {
    return true;
  }

  if (type === 'range') {
    return !currentDate[0] || !currentDate[1];
  }

  if (type === 'multiple') {
    return !currentDate.length;
  }

  return !currentDate;
}

export default {
  getMonths,
  getButtonDisabled,
};
