import type { ComponentOptionsMixin } from 'vue';
import { upx2px } from '../shared';


function converPx(value: string) {
  if (/^-?\d+[ur]px$/i.test(value)) {
    return value.replace(/(^-?\d+)[ur]px$/i, (text, num) => `${upx2px(parseFloat(num))}px`);
    // eslint-disable-next-line no-useless-escape
  } if (/^-?[\d\.]+$/.test(value)) {
    return `${value}px`;
  }
  return value || '';
}

function converType(type: string) {
  return type
    .replace(/[A-Z]/g, text => `-${text.toLowerCase()}`)
    .replace('webkit', '-webkit');
}

function getStyle(action: any) {
  const animateTypes1 = [
    'matrix',
    'matrix3d',
    'scale',
    'scale3d',
    'rotate3d',
    'skew',
    'translate',
    'translate3d',
  ];
  const animateTypes2 = [
    'scaleX',
    'scaleY',
    'scaleZ',
    'rotate',
    'rotateX',
    'rotateY',
    'rotateZ',
    'skewX',
    'skewY',
    'translateX',
    'translateY',
    'translateZ',
  ];
  const animateTypes3 = ['opacity', 'background-color'];
  const animateTypes4 = ['width', 'height', 'left', 'right', 'top', 'bottom'];
  const { animates } = action;
  const { option } = action;
  const { transition } = option;
  const style: Partial<CSSStyleDeclaration> = {};
  const transform: string[] = [];
  animates.forEach((animate) => {
    let { type } = animate;
    let args = [...animate.args];
    if (animateTypes1.concat(animateTypes2).includes(type)) {
      if (type.startsWith('rotate') || type.startsWith('skew')) {
        args = args.map(value => `${parseFloat(value)}deg`);
      } else if (type.startsWith('translate')) {
        args = args.map(converPx);
      }
      if (animateTypes2.indexOf(type) >= 0) {
        args.length = 1;
      }
      transform.push(`${type}(${args.join(',')})`);
    } else if (animateTypes3.concat(animateTypes4).includes(args[0])) {
      type = args[0];
      const value = args[1]
      ;(style as any)[type] = animateTypes4.includes(type)
        ? converPx(value)
        : value;
    }
  });
  style.webkitTransform = transform.join(' ');
  style.transform = style.webkitTransform;
  style.webkitTransition = Object.keys(style)
    .map(type => `${converType(type)} ${transition.duration}ms ${
      transition.timingFunction
    } ${transition.delay}ms`)
    .join(',');
  style.transition = style.webkitTransition;
  style.webkitTransformOrigin = option.transformOrigin;
  style.transformOrigin = style.webkitTransformOrigin;
  return style;
}

function startAnimation(context: ComponentOptionsMixin) {
  const animation = context.animation as any;
  if (!animation?.actions?.length) {
    return;
  }
  let index = 0;
  const { actions } = animation;
  const { length } = animation.actions;
  function animate() {
    const action = actions[index];
    const { transition } = action.option;
    const style = getStyle(action);
    Object.keys(style).forEach((key) => {
      context.$el.style[key] = (style as any)[key];
    });

    index += 1;
    if (index < length) {
      setTimeout(animate, transition.duration! + transition.delay!);
    }
  }

  setTimeout(() => {
    animate();
  }, 0);
}

export default {
  props: ['animation'],
  watch: {
    animation: {
      deep: true,
      handler() {
        startAnimation(this);
      },
    },
  },
  mounted() {
    startAnimation(this);
  },
};
