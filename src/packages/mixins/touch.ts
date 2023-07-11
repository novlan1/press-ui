const MIN_DISTANCE = 10;
function getDirection(x, y) {
  if (x > y && x > MIN_DISTANCE) {
    return 'horizontal';
  }
  if (y > x && y > MIN_DISTANCE) {
    return 'vertical';
  }
  return '';
}
export const touch = {
  methods: {
    resetTouchStatus() {
      const that = this as any;
      that.direction = '';
      that.deltaX = 0;
      that.deltaY = 0;
      that.offsetX = 0;
      that.offsetY = 0;
    },
    touchStart(event) {
      const that = this as any;
      that.resetTouchStatus();
      const touch = event.touches[0];
      if (!touch) return;
      that.startX = touch.clientX;
      that.startY = touch.clientY;
    },
    touchMove(event) {
      const touch = event.touches[0];
      const that = this as any;
      if (!touch) return;
      that.deltaX = touch.clientX - that.startX;
      that.deltaY = touch.clientY - that.startY;
      that.offsetX = Math.abs(that.deltaX);
      that.offsetY = Math.abs(that.deltaY);
      that.direction = that.direction || getDirection(that.offsetX, that.offsetY);
    },
  },
};
