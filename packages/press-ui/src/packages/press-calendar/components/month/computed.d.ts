type IDate = string | number | Date;
declare function getMark(date: IDate): number;
declare function getDayStyle(type: string, index: null, date: IDate, rowHeight: string | number, color: string, firstDayOfWeek: number): string;
declare function formatMonthTitle(date: IDate): string;
declare function getMonthStyle(visible: boolean, date: IDate, rowHeight: number): string | undefined;
declare const _default: {
  getMark: typeof getMark;
  getDayStyle: typeof getDayStyle;
  formatMonthTitle: typeof formatMonthTitle;
  getMonthStyle: typeof getMonthStyle;
};
export default _default;
