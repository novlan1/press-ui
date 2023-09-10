type ScrollElement = HTMLElement | Window;

export function setScrollTop(el: ScrollElement, value: number) {
  if ('scrollTop' in el) {
    el.scrollTop = value;
  } else {
    el.scrollTo(el.scrollX, value);
  }
}

export function getRootScrollTop(): number {
  return (
    window.pageYOffset
    || document.documentElement.scrollTop
    || document.body.scrollTop
    || 0
  );
}

export function setRootScrollTop(value: number) {
  setScrollTop(window, value);
  setScrollTop(document.body, value);
}
