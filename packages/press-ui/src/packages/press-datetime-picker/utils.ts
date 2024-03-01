const QUARTER_BUFFER = 15 * 60 * 1000;


/**
 * datetimePicker的formatter，增加后缀
 */
export function addPostfixDateTimeFormatter(type: string, value: number) {
  if (type === 'year') {
    return `${value}年`;
  } if (type === 'month') {
    return `${value}月`;
  } if (type === 'day') {
    return `${value}日`;
  } if (type === 'hour') {
    return `${value}时`;
  } if (type === 'minute') {
    return `${value}分`;
  }
  return value;
}


/**
 * datetimePicker的formatter，增加后缀，第1个设置为其他选项
 */
export function otherOptionDateTimeFormatter({
  type,
  value,
  minDate,
  currentDate,
  otherOption = '不启用',
}: {
  type: string;
  value: number;
  minDate: number;
  currentDate: number;
  otherOption?: string
}) {
  const theYear = new Date(minDate).getFullYear();
  if (type === 'year') {
    if (value == theYear) {
      return otherOption;
    }
  } else {
    if (new Date(currentDate).getFullYear() === theYear) {
      return '';
    }
  }

  return addPostfixDateTimeFormatter(type, value);
}


const filterFiveMinutes = (list: Array<number>) => {
  const res = list.filter(item => item % 5 === 0);
  return res;
};


/**
 * datetimePicker 的 filter，5分钟间隔
 */
export function fiveMinutesDateTimeFilter(type: string, options: Array<number>) {
  if (type === 'minute') {
    const res = filterFiveMinutes(options);
    if (!res.length && options?.[0]) {
      return [options[0]];
    }
    return res;
  }
  return options;
}

/**
 * datetimePicker 的 filter，5分钟间隔，搭配 otherOptionDateTimeFormatter 使用
 */
export function otherOptionDateTimePickerFilter({
  type,
  options,
  currentDate,
  delaySeconds = QUARTER_BUFFER,
}: {
  type: string;
  options: Array<number>;
  currentDate: number;
  delaySeconds?: number;
}) {
  const thisYear = new Date().getFullYear();

  const curYear = new Date(currentDate).getFullYear();
  const curMonth = new Date(currentDate).getMonth();
  const curDate = new Date(currentDate).getDate();
  const curHour = new Date(currentDate).getHours();

  const month = new Date(Date.now() + delaySeconds).getMonth();
  const day = new Date(Date.now() + delaySeconds).getDate();
  const hours = new Date(Date.now() + delaySeconds).getHours();
  const minutes = new Date(Date.now() + delaySeconds).getMinutes();

  // 过滤掉过去的时间点
  if (curYear === thisYear && type !== 'year') {
    if (type === 'month') {
      return options.slice(month);
    }
    if (type === 'day' && curMonth === month) {
      return options.slice(day - 1);
    }
    if (type === 'hour' && curMonth === month && curDate === day) {
      return options.slice(hours);
    }
    if (type === 'minute' && curMonth === month && curDate === day && curHour <= hours) {
      return filterFiveMinutes(options.slice(minutes));
    }
  }
  if (type === 'minute') {
    return filterFiveMinutes(options);
  }
  return options;
}

