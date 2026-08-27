import { getRect } from '../common/dom/rect';
import { requestAnimationFrame } from '../common/utils/system';


export function getScrollDurationAndWidth({
  contentSelect = '.press-notice-bar__content',
  wrapSelector = '.press-notice-bar__wrap',
  context,

  speed = 60,
  scrollable = true,
}) {
  return new Promise((resolve, reject) => {
    requestAnimationFrame(() => {
      Promise.all([
        getRect(context, contentSelect),
        getRect(context, wrapSelector),
      ])
        .then((rects) => {
          const [contentRect, wrapRect] = rects;
          if (contentRect == null
                    || wrapRect == null
                    || !contentRect.width
                    || !wrapRect.width
                    || scrollable === false) {
            reject();
            return;
          }
          if (scrollable || wrapRect.width < contentRect.width) {
            const duration = ((wrapRect.width + contentRect.width) / speed) * 1000;

            resolve({
              wrapWidth: wrapRect.width,
              contentWidth: contentRect.width,
              duration,
            });
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}


