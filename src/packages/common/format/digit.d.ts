export function times(...nums: any[]): number;
export function plus(...nums: any[]): any;
export function minus(...nums: any[]): any;
export function divide(...nums: any[]): any;
export function round(num: any, ratio: any): any;
export function enableBoundaryChecking(flag?: boolean): void;

export default {
  times,
  plus,
  minus,
  divide,
  round,
  enableBoundaryChecking,
};
