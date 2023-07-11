import { IS_SERVER } from '../utils/validator';
// eslint-disable-next-line import/no-mutable-exports
export let SUPPORT_PASSIVE = false;

if (!IS_SERVER) {
  try {
    const opts = {};
    Object.defineProperty(opts, 'passive', {
      // eslint-disable-next-line getter-return
      get: function get() {
        /* istanbul ignore next */
        SUPPORT_PASSIVE = true;
      },
    });
    window.addEventListener('test-passive', () => {}, opts); // eslint-disable-next-line no-empty
  } catch (e) {}
}

export function on(target, event, handler, passive) {
  if (passive === void 0) {
    passive = false;
  }

  if (!IS_SERVER) {
    target.addEventListener(event, handler, SUPPORT_PASSIVE ? {
      capture: false,
      passive,
    } : false);
  }
}
export function off(target, event, handler) {
  if (!IS_SERVER) {
    target.removeEventListener(event, handler);
  }
}
export function stopPropagation(event) {
  event.stopPropagation();
}
export function preventDefault(event, isStopPropagation) {
  /* istanbul ignore else */
  if (typeof event.cancelable !== 'boolean' || event.cancelable) {
    event.preventDefault();
  }

  if (isStopPropagation) {
    stopPropagation(event);
  }
}
