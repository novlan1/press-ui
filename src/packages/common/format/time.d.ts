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
export declare function timeStampFormat(
  timestamp: number,
  fmt: string,
  defaultVal?: string,
  whitePrefix?: string
): string;
