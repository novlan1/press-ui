import getWindowOffset from '../../common/utils/get-window-offset';

import { getTargetDataset } from './helper';
import { wrapperMPEvent } from './patch';


function processTarget(target, detail) {
  const res = {
    id: target.id,
    offsetLeft: target.offsetLeft,
    offsetTop: target.offsetTop,
    dataset: getTargetDataset(target),
  };
  if (detail) {
    Object.assign(res, detail);
  }
  return res;
}

function processTouches(touches) {
  if (touches) {
    const res = [];

    const {
      top,
    } = getWindowOffset();

    for (let i = 0; i < touches.length; i++) {
      const touch = touches[i];
      res.push({
        identifier: touch.identifier,
        pageX: touch.pageX,
        pageY: touch.pageY - top,
        clientX: touch.clientX,
        clientY: touch.clientY - top,
        force: touch.force || 0,
      });
    }
    return res;
  }
  return [];
}

function isMouseEvent(name) {
  return name.startsWith('mouse') || ['contextmenu'].includes(name);
}

export function processEvent(name, $event = {}, detail = {}, target = {}, currentTarget = {}) {
  if ($event._processed) {
    $event.type = detail.type || name;
    return $event;
  }

  // fixed 针对小程序 click（tap）事件，补充事件详情
  if (name === 'click') {
    const {
      top,
    } = getWindowOffset();

    detail = {
      x: $event.x,
      y: $event.y - top,
    };
    $event.changedTouches = [{
      force: 1,
      identifier: 0,
      clientX: $event.clientX,
      clientY: $event.clientY,
      pageX: $event.pageX,
      pageY: $event.pageY,
    }];

    $event.touches = $event.changedTouches;
  }

  // fixed mp-vue
  const ret = wrapperMPEvent({
    type: detail.type || name,
    timeStamp: $event.timeStamp || 0,
    detail,
    target: processTarget(target, detail),
    currentTarget: processTarget(currentTarget, false, true),
    // 只处理系统事件
    touches: ($event instanceof Event || $event instanceof CustomEvent)
      ? processTouches($event.touches) : $event.touches,
    changedTouches: ($event instanceof Event || $event instanceof CustomEvent)
      ? processTouches($event.changedTouches)
      : $event.changedTouches,
    preventDefault() {},
    stopPropagation() {},
  });

  if (isMouseEvent(name)) {
    const {
      top,
    } = getWindowOffset();
    ret.pageX = $event.pageX;
    ret.pageY = $event.pageY - top;
    ret.clientX = $event.clientX;
    ret.clientY = $event.clientY - top;
  }


  return ret;
}
