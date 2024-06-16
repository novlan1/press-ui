/**
 * datetimePicker的formatter，增加后缀
 */
export declare function addPostfixDateTimeFormatter(type: string, value: number): string | number;
/**
 * datetimePicker的formatter，增加后缀，第1个设置为其他选项
 */
export declare function otherOptionDateTimeFormatter({ type, value, minDate, currentDate, otherOption }: {
  type: string;
  value: number;
  minDate: number;
  currentDate: number;
  otherOption?: string;
}): string | number;
/**
 * datetimePicker 的 filter，5分钟间隔
 */
export declare function fiveMinutesDateTimeFilter(type: string, options: Array<number>, _: number, distance?: number): number[];
/**
 * datetimePicker 的 filter，5分钟间隔，搭配 otherOptionDateTimeFormatter 使用
 */
export declare function otherOptionDateTimePickerFilter({ type, options, currentDate, delaySeconds, distance }: {
  type: string;
  options: Array<number>;
  currentDate: number;
  delaySeconds?: number;
  distance?: number;
}): number[];
