/**
 * 将时间戳格式化
 * @param {number} timestamp
 * @param {string} fmt
 * @param {string} [defaultVal]
 * @returns {string} 格式化后的日期字符串
 * @example
 *
 * const stamp = new Date('2020-11-27 8:23:24').getTime();
 *
 * const res = timeStampFormat(stamp, 'yyyy-MM-dd hh:mm:ss')
 *
 * // 2020-11-27 08:23:24
 */
export function timeStampFormat(
  timestamp,
  fmt,
  defaultVal,

  whitePrefix = '',
) {
  if (!timestamp) {
    return defaultVal || '';
  }
  const date = new Date();
  if (`${timestamp}`.length === 10) {
    timestamp *= 1000;
  }
  date.setTime(timestamp);
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };

  let reg = /(y+)/;
  if (whitePrefix) {
    reg = new RegExp(`(?:^|(?:[^${whitePrefix}y]))(y+)`);
  }

  let match = fmt.match(reg);
  if (match?.[1]) {
    fmt = fmt.replace(
      match[1],
      `${date.getFullYear()}`.slice(4 - match[1].length),
    );
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const k in o) {
    let reg = new RegExp(`(${k})`);
    if (whitePrefix) {
      reg = new RegExp(`(?:^|(?:[^${whitePrefix}${k[0]}]))(${k})`);
    }

    match = fmt.match(reg);

    if (match?.[1]) {
      const { index = 0 } = match;
      const realIndex = whitePrefix ? index + match[0].length - match[1].length : index;
      const str = `${o[k]}`;

      const len = match[1].length;
      const replacePart = len === 1 ? str : `00${str}`.slice(`${str}`.length);
      fmt = fmt.slice(0, realIndex) + replacePart + fmt.slice(realIndex + len);

      // fmt = fmt.replace(
      //   match[1],
      //   match[1].length === 1 ? str : `00${str}`.slice(`${str}`.length),
      // );
    }
  }

  if (whitePrefix) {
    fmt = fmt.replace(new RegExp(whitePrefix, 'g'), '');
  }
  return fmt;
}
