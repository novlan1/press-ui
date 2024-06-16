
export function setScrollTop(el, value) {
  if ('scrollTop' in el) {
    el.scrollTop = value;
  } else {
    el.scrollTo(el.scrollX, value);
  }
}

export function getRootScrollTop() {
  return (
    window.pageYOffset
    || document.documentElement.scrollTop
    || document.body.scrollTop
    || 0
  );
}

export function setRootScrollTop(value) {
  setScrollTop(window, value);
  setScrollTop(document.body, value);
}
