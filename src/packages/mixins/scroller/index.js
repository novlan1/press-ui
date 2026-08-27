import { Scroller } from './scroller';

export default {
  methods: {
    initScroller(element, options) {
      this._touchInfo = {
        trackingID: -1,
        maxDy: 0,
        maxDx: 0,
      };
      this._scroller = new Scroller(element, options);
      this.__handleTouchStart = this._handleTouchStart.bind(this);
      this.__handleTouchMove = this._handleTouchMove.bind(this);
      this.__handleTouchEnd = this._handleTouchEnd.bind(this);
      this._initedScroller = true;
    },
    _findDelta(event) {
      const touchInfo = this._touchInfo;
      return event.detail.state === 'move' || event.detail.state === 'end' ? {
        x: event.detail.dx,
        y: event.detail.dy,
      } : {
        x: event.screenX - touchInfo.x,
        y: event.screenY - touchInfo.y,
      };
    },
    _handleTouchStart(e) {
      const t = this._touchInfo;
      const n = this._scroller;
      if (n) {
        if (e.detail.state === 'start') {
          t.trackingID = 'touch';
          t.x = e.detail.x;
          t.y = e.detail.y;
        } else {
          t.trackingID = 'mouse';
          t.x = e.screenX;
          t.y = e.screenY;
        }
        t.maxDx = 0;
        t.maxDy = 0;
        t.historyX = [0];
        t.historyY = [0];
        t.historyTime = [e.detail.timeStamp];
        t.listener = n;
        if (n.onTouchStart) {
          n.onTouchStart();
        }
        e.preventDefault();
      }
    },
    _handleTouchMove(event) {
      const touchInfo = this._touchInfo;
      if (touchInfo.trackingID !== -1) {
        event.preventDefault();
        const delta = this._findDelta(event);
        if (delta) {
          for (touchInfo.maxDy = Math.max(touchInfo.maxDy, Math.abs(delta.y)),
          touchInfo.maxDx = Math.max(touchInfo.maxDx, Math.abs(delta.x)),
          touchInfo.historyX.push(delta.x),
          touchInfo.historyY.push(delta.y),
          touchInfo.historyTime.push(event.detail.timeStamp); touchInfo.historyTime.length > 10;) {
            touchInfo.historyTime.shift();
            touchInfo.historyX.shift();
            touchInfo.historyY.shift();
          }
          if (touchInfo.listener && touchInfo.listener.onTouchMove) {
            touchInfo.listener.onTouchMove(delta.x, delta.y, event.detail.timeStamp);
          }
        }
      }
    },
    _handleTouchEnd(event) {
      const touchInfo = this._touchInfo;
      if (touchInfo.trackingID !== -1) {
        event.preventDefault();
        const delta = this._findDelta(event);
        if (delta) {
          const { listener } = touchInfo;
          touchInfo.trackingID = -1;
          touchInfo.listener = null;
          const r = touchInfo.historyTime.length;
          const o = {
            x: 0,
            y: 0,
          };
          if (r > 2) {
            for (let a = touchInfo.historyTime.length - 1,
              s = touchInfo.historyTime[a],
              l = touchInfo.historyX[a],
              c = touchInfo.historyY[a];
              a > 0;) {
              a -= 1;
              const u = touchInfo.historyTime[a];
              const d = s - u;
              if (d > 30 && d < 50) {
                o.x = (l - touchInfo.historyX[a]) / (d / 1e3);
                o.y = (c - touchInfo.historyY[a]) / (d / 1e3);
                break;
              }
            }
          }
          touchInfo.historyTime = [];
          touchInfo.historyX = [];
          touchInfo.historyY = [];
          if (listener && listener.onTouchEnd) {
            listener.onTouchEnd(delta.x, delta.y, o);
          }
        }
      }
    },
  },
};
