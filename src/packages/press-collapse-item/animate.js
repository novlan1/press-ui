import { getRect } from '../common/dom/rect';
import { requestAnimationFrame } from '../common/utils/system';

function getAnimation({ height, duration }) {
  return [
    `height: ${height};`,
    `transition: height ${duration}ms ease-in-out 0ms, top ${duration}ms ease-in-out 0ms, -webkit-transform ${duration}ms ease-in-out 0ms, transform ${duration}ms ease-in-out 0ms;`,
    'transform-origin: 50% 50% 0px;',
  ].join('');
}

function useAnimation(context, { expanded, mounted, height, duration: originDuration = 240 }) {
  if (expanded) {
    if (height === 0) {
      const duration = 0;
      context.animationStyle = getAnimation({ height: 'auto', duration });
    } else {
      const duration = mounted ? originDuration : 1;
      context.animationStyle = getAnimation({ height: `${height}px`, duration });

      setTimeout(() => {
        context.animationStyle = getAnimation({ height: 'auto', duration: 0 });
      }, duration);
    }
    return;
  }

  const duration = 1;
  context.animationStyle = getAnimation({ height: `${height}px`, duration  });

  requestAnimationFrame(() => {
    context.animationStyle = getAnimation({ height: 0, duration: originDuration });
  });
}


export function setContentAnimate(context, expanded, mounted, duration) {
  getRect(context, '.press-collapse-item__content')
    .then(rect => rect.height)
    .then((height) => {
      useAnimation(context, { expanded, mounted, height, duration });
    });
}
