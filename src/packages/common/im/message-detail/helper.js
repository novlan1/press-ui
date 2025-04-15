import { timeStampFormat } from '../../format/time';


const isToday = (time) => {
  const aDay = timeStampFormat(time, 'yyyyMMdd');
  const bDay = timeStampFormat(Date.now(), 'yyyyMMdd');
  return aDay === bDay;
};


function isYesterday(time) {
  let gap = 24 * 60 * 60;
  if (time.toString().length >= 11) {
    gap = gap * 1000;
  }
  const aDay = timeStampFormat(time + gap, 'yyyyMMdd');
  const bDay = timeStampFormat(Date.now(), 'yyyyMMdd');
  return aDay === bDay;
}


export function formatTime(time) {
  if (!time) return '';

  if (isToday(time)) {
    return timeStampFormat(time, 'hh:mm');
  }
  if (isYesterday(time)) {
    return timeStampFormat(time, '昨天 hh:mm');
  }
  return timeStampFormat(time, 'MM-dd hh:mm');
}


export function isJsonStr(content) {
  return content.startsWith('{') && content.endsWith('}');
}
