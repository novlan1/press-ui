import { SUPPORT_PASSIVE } from '../utils/support-passive';
import { isNotInUni } from '../utils/utils';
import { IS_SERVER } from '../utils/validator';


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


export function preventDefault(event, isStopPropagation = false) {
  if (typeof event.cancelable !== 'boolean' || event.cancelable) {
    event.preventDefault();
  }

  if (isStopPropagation) {
    stopPropagation(event);
  }
}


export function getEventValue(event) {
  return getEventDetail(event).value || '';
}


export function getEventDetail(event) {
  // #ifdef H5
  if (isNotInUni()) {
    return {
      value: event?.target?.value || '',
      scrollTop: event?.target?.scrollTop,
      scrollHeight: event?.target?.scrollHeight,
    };
  }
  // #endif

  return event.detail;
}
