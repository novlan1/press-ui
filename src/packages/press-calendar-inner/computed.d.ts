type IDate = string | number | Date;
declare function getMonths(minDate: IDate, maxDate: IDate): number[];
declare function getButtonDisabled(type: string, currentDate?: any): boolean;
declare const innerDefault: {
  getMonths: typeof getMonths;
  getButtonDisabled: typeof getButtonDisabled;
};
export default innerDefault;
