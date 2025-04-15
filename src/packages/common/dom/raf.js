/**
 * requestAnimationFrame polyfill
 */
import { IS_SERVER } from '../utils/validator';
let prev = Date.now();

function fallback(fn) {
  const curr = Date.now();
  const ms = Math.max(0, 16 - (curr - prev));
  const id = setTimeout(fn, ms);
  prev = curr + ms;
  return id;
}

// @ts-ignore
const root = IS_SERVER ? global : window;

const iRaf = root.requestAnimationFrame || fallback;

const iCancel = root.cancelAnimationFrame || root.clearTimeout;


export function raf(fn) {
  return iRaf.call(root, fn);
}

// double raf for animation
export function doubleRaf(fn) {
  raf(() => {
    raf(fn);
  });
}
export function cancelRaf(id) {
  iCancel.call(root, id);
}
