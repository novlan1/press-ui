import { requestAnimationFrame } from '../common/utils/system';
import { getRect } from '../common/dom/rect';

function getAnimation({ height, duration }: {
  height: string | number;
  duration: string | number;
}) {
  return [
    `height: ${height};`,
    `transition: height ${duration}ms ease-in-out 0ms, top ${duration}ms ease-in-out 0ms, -webkit-transform ${duration}ms ease-in-out 0ms, transform ${duration}ms ease-in-out 0ms;`,
    'transform-origin: 50% 50% 0px;',
  ].join('');
}

function useAnimation(context: any, expanded?: boolean, mounted?: boolean, height?: string | number) {
  if (expanded) {
    if (height === 0) {
      const duration = 0;
      context.animationStyle = getAnimation({ height: 'auto', duration });
    } else {
      const duration = mounted ? 300 : 1;
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
    context.animationStyle = getAnimation({ height: 0, duration: 300 });
  });
}


export function setContentAnimate(context: any, expanded?: boolean, mounted?: boolean) {
  getRect(context, '.press-collapse-item__content')
    .then((rect: any) => rect.height)
    .then((height: string | number) => {
      useAnimation(context, expanded, mounted, height);
    });
}
