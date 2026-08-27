export function isInIFrame() {
  const res = window.frames.length != parent.frames.length;
  return res;
}
