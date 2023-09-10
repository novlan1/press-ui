/**
 * mpvue event
 */
export function wrapperMPEvent(event) {
  event.mp = Object.assign({
    '@warning': 'mp is deprecated',
  }, event);
  event._processed = true;
  return event;
}
