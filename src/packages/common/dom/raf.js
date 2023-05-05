/**
 * requestAnimationFrame polyfill
 */
import { isServer } from '../utils/validator';
let prev = Date.now();
/* istanbul ignore next */

function fallback(fn) {
  const curr = Date.now();
  const ms = Math.max(0, 16 - (curr - prev));
  const id = setTimeout(fn, ms);
  prev = curr + ms;
  return id;
}
/* istanbul ignore next */


const root = isServer ? global : window;
/* istanbul ignore next */

const iRaf = root.requestAnimationFrame || fallback;
/* istanbul ignore next */

const iCancel = root.cancelAnimationFrame || root.clearTimeout;
export function raf(fn) {
  return iRaf.call(root, fn);
} // double raf for animation

export function doubleRaf(fn) {
  raf(() => {
    raf(fn);
  });
}
export function cancelRaf(id) {
  iCancel.call(root, id);
}
