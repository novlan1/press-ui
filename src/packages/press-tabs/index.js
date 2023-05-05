import style from '../common/utils/style';
import utils from '../common/utils/utils';

function tabClass(active, ellipsis) {
  const classes = ['tab-class'];

  if (active) {
    classes.push('tab-active-class');
  }

  if (ellipsis) {
    classes.push('press-ellipsis');
  }

  return classes.join(' ');
}

function tabStyle(data) {
  const titleColor = data.active
    ? data.titleActiveColor
    : data.titleInactiveColor;

  const ellipsis = data.scrollable && data.ellipsis;

  // card theme color
  if (data.type === 'card') {
    return style({
      'border-color': data.color,
      'background-color': !data.disabled && data.active ? data.color : null,
      color: titleColor || (!data.disabled && !data.active ? data.color : null),
      'flex-basis': ellipsis ? `${88 / data.swipeThreshold}%` : null,
    });
  }

  return style({
    color: titleColor,
    'flex-basis': ellipsis ? `${88 / data.swipeThreshold}%` : null,
  });
}

function navStyle(color, type) {
  return style({
    'border-color': type === 'card' && color ? color : null,
  });
}

function trackStyle(data) {
  if (!data.animated) {
    return '';
  }

  return style({
    left: `${-100 * data.currentIndex}%`,
    'transition-duration': `${data.duration}s`,
    '-webkit-transition-duration': `${data.duration}s`,
  });
}

function lineStyle(data) {
  const width = utils.addUnit(data.lineWidth);
  return style({
    width,
    transform: `translateX(${data.lineOffsetLeft}px)`,
    '-webkit-transform': `translateX(${data.lineOffsetLeft}px)`,
    'background-color': data.color,
    height: data.lineHeight !== -1 ? utils.addUnit(data.lineHeight) : null,
    'border-radius':
      data.lineHeight !== -1 ? utils.addUnit(data.lineHeight) : null,
    'transition-duration': !data.skipTransition ? `${data.duration}s` : null,
    '-webkit-transition-duration': !data.skipTransition
      ? `${data.duration}s`
      : null,
  });
}

export default {
  tabClass,
  tabStyle,
  trackStyle,
  lineStyle,
  navStyle,
};
