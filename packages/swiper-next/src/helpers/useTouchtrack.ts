import { onBeforeUnmount } from 'vue';
import { isFunction } from '@vue/shared';

const addListenerToElement = function (
  element: HTMLElement,
  type: string,
  callback: Function,
  _capture?: boolean,
) {
  // 暂时忽略 capture
  element.addEventListener(
    type,
    ($event: Event) => {
      if (isFunction(callback)) {
        if (callback($event) === false) {
          if (
            typeof $event.cancelable !== 'undefined' ? $event.cancelable : true
          ) {
            $event.preventDefault();
          }
          $event.stopPropagation();
        }
      }
    },
    {
      passive: false,
    },
  );
};
type State = 'start' | 'move' | 'end' | 'cancel';
type TouchOrMouseEvent = TouchEvent | MouseEvent;
type Detail = {
  state: State
  x: number
  y: number
  dx: number
  dy: number
  ddx: number
  ddy: number
  timeStamp: Event['timeStamp']
};
export interface TouchtrackEvent {
  target: Event['target']
  currentTarget: Event['currentTarget']
  preventDefault: Event['preventDefault']
  stopPropagation: Event['stopPropagation']
  touches: TouchEvent['touches']
  changedTouches: TouchEvent['changedTouches']
  detail: Detail
}

let innerMouseMoveEventListener: (this: Document, ev: MouseEvent) => any;
let innerMouseUpEventListener: (this: Document, ev: MouseEvent) => any;

export function useTouchtrack(
  element: HTMLElement,
  method: (event: TouchtrackEvent) => boolean | void,
  useCancel?: boolean,
) {
  onBeforeUnmount(() => {
    document.removeEventListener('mousemove', innerMouseMoveEventListener);
    document.removeEventListener('mouseup', innerMouseUpEventListener);
  });

  let x0 = 0;
  let y0 = 0;
  let x1 = 0;
  let y1 = 0;
  const fn = function (
    $event: TouchOrMouseEvent,
    state: State,
    x: number,
    y: number,
  ) {
    if (
      method({
        // @ts-expect-error
        cancelable: $event.cancelable,
        target: $event.target,
        currentTarget: $event.currentTarget,
        preventDefault: $event.preventDefault.bind($event),
        stopPropagation: $event.stopPropagation.bind($event),
        touches: ($event as TouchEvent).touches,
        changedTouches: ($event as TouchEvent).changedTouches,
        detail: {
          state,
          x,
          y,
          dx: x - x0,
          dy: y - y0,
          ddx: x - x1,
          ddy: y - y1,
          timeStamp: $event.timeStamp,
        },
      }) === false
    ) {
      return false;
    }
  };

  let $eventOld: TouchOrMouseEvent | null = null;
  let hasTouchStart: boolean;
  let hasMouseDown: boolean;
  addListenerToElement(element, 'touchstart', ($event: TouchEvent) => {
    hasTouchStart = true;
    if ($event.touches.length === 1 && !$eventOld) {
      $eventOld = $event;
      x1 = $event.touches[0].pageX;
      x0 = x1;
      y1 = $event.touches[0].pageY;
      y0 = y1;
      return fn($event, 'start', x0, y0);
    }
  });
  addListenerToElement(element, 'mousedown', ($event: MouseEvent) => {
    hasMouseDown = true;
    if (!hasTouchStart && !$eventOld) {
      // TODO touches changedTouches
      $eventOld = $event;
      x1 = $event.pageX;
      x0 = x1;
      y1 = $event.pageY;
      y0 = y1;
      return fn($event, 'start', x0, y0);
    }
  });
  addListenerToElement(element, 'touchmove', ($event: TouchEvent) => {
    if ($event.touches.length === 1 && $eventOld) {
      const res = fn(
        $event,
        'move',
        $event.touches[0].pageX,
        $event.touches[0].pageY,
      );
      x1 = $event.touches[0].pageX;
      y1 = $event.touches[0].pageY;
      return res;
    }
  });
  innerMouseMoveEventListener = function ($event) {
    if (!hasTouchStart && hasMouseDown && $eventOld) {
      // TODO target currentTarget touches changedTouches
      const res = fn($event, 'move', $event.pageX, $event.pageY);
      x1 = $event.pageX;
      y1 = $event.pageY;
      return res;
    }
  };
  const mouseMoveEventListener = innerMouseMoveEventListener;
  document.addEventListener('mousemove', mouseMoveEventListener);
  addListenerToElement(element, 'touchend', ($event: TouchEvent) => {
    if ($event.touches.length === 0 && $eventOld) {
      hasTouchStart = false;
      $eventOld = null;
      return fn(
        $event,
        'end',
        $event.changedTouches[0].pageX,
        $event.changedTouches[0].pageY,
      );
    }
  });
  innerMouseUpEventListener = function ($event) {
    hasMouseDown = false;
    if (!hasTouchStart && $eventOld) {
      // TODO target currentTarget touches changedTouches
      $eventOld = null;
      return fn($event, 'end', $event.pageX, $event.pageY);
    }
  };
  const mouseUpEventListener = innerMouseUpEventListener;
  document.addEventListener('mouseup', mouseUpEventListener);
  addListenerToElement(element, 'touchcancel', ($event: TouchEvent) => {
    if ($eventOld) {
      hasTouchStart = false;
      const $eventTemp = $eventOld;
      $eventOld = null;
      return fn(
        $event,
        useCancel ? 'cancel' : 'end',
        ($eventTemp as TouchEvent).touches[0].pageX,
        ($eventTemp as TouchEvent).touches[0].pageY,
      );
    }
  });
}
