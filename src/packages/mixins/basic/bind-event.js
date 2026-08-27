/**
 * Bind event when mounted or activated
 */
import { on, off } from '../../common/dom/event';

let uid = 0;

export function BindEventMixin(handler) {
  const key = `binded_${uid}`;
  uid += 1;
  function bind() {
    const that = this;
    if (!that[key]) {
      handler.call(that, on, true);
      that[key] = true;
    }
  }

  function unbind() {
    const that = this;
    if (that[key]) {
      handler.call(that, off, false);
      that[key] = false;
    }
  }

  return {
    mounted: bind,
    activated: bind,
    deactivated: unbind,
    beforeDestroy: unbind,
  };
}
