import { IS_SERVER } from '../utils/validator';
import { isNotInUni } from '../utils/utils';
import { SUPPORT_PASSIVE } from '../utils/support-passive';


export function on(target, event, handler, passive = false) {
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


export function getEventValue(event, ref: any = null) {
  return getEventDetail(event, ref).value || '';
}


export function getEventDetail(event, ref: any = null) {
  // #ifdef H5
  if (ref) {
    return {
      value: ref?.value || '',
      scrollTop: ref?.scrollTop || '',
      scrollHeight: ref?.scrollHeight || '',
    };
  }
  // #endif

  if (isNotInUni()) {
    return {
      value: event?.target?.value || '',
      scrollTop: event?.target?.scrollTop,
      scrollHeight: event?.target?.scrollHeight,
    };
  }
  return event.detail;
}
