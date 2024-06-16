import { bem2, bem3 } from './bem';
import { memoize } from './memoize';
import { addUnit } from './add-unit';
export declare const isNotInUni: () => boolean;
declare const _default: {
  bem: () => any;
  memoize: typeof memoize;
  addUnit: typeof addUnit;
  bem2: typeof bem2;
  bem3: typeof bem3;
};
export default _default;
export declare function random(min: number, max: number): number;
export declare function updateElementStyle(element: {
  style: Record<string, string>;
}, styles: Record<string, string>): void;
