export declare const ROW_HEIGHT = 64;
type IDate = string | number | Date;
export declare function formatMonthTitle(date: IDate): any;
export declare function compareMonth(date1: IDate, date2: IDate): 0 | 1 | -1;
export declare function compareDay(day1: IDate, day2: IDate): 0 | 1 | -1;
export declare function getDayByOffset(date: IDate, offset: number): Date;
export declare function getPrevDay(date: IDate): Date;
export declare function getNextDay(date: IDate): Date;
export declare function getToday(): Date;
export declare function calcDateNum(date: Array<IDate>): number;
export declare function copyDates(dates: Array<IDate> | IDate): Date | Date[];
export declare function getMonthEndDay(year: number, month: number): number;
export declare function getMonths(minDate: IDate, maxDate: IDate): number[];
export declare const INITIAL_MIX_DATE: number;
export declare const INITIAL_MAX_DATE: number;
export {};