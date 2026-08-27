function parseYearMonth(value) {
  const { year, month } = getYearAndMonth(value);
  return `${year}/${month}`;
}


export const defaultFormatter = (type, value) => {
  if (type === 'yearMonth') {
    return parseYearMonth(value);
  }

  return value;
};


export const YEAR_AND_MONTH_AND_DATE = 'yearMonth-day-hour-minute';
export const YEAR_AND_MONTH = 'yearMonth';


export function getYearAndMonth(value) {
  const month = value % 12;
  const year = parseInt(`${(value - month) / 12}`, 10);

  if (!month) {
    return {
      year: year - 1,
      month: 12,
    };
  }

  return {
    year,
    month,
  };
}
