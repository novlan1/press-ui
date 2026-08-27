import { getRealPageYOrClientY } from '../common/dom/rect';

import { DEFAULT_SYSTEM_SWATCH_COLORS } from './constants';

export const getCoordinate = (e, top, left) => {
  const { pageX, pageY } = e.changedTouches[0] || {};
  let { offsetLeft = 0, offsetTop = 0 } = e.currentTarget || e.target || {};
  if (top !== undefined) {
    offsetTop = top;
  }
  if (left !== undefined) {
    offsetLeft = left;
  }

  return {
    x: pageX - offsetLeft,
    y: getRealPageYOrClientY(pageY) - offsetTop,
  };
};


export const getFormatList = (format, color) => {
  const FORMAT_MAP = {
    HSV: Object.values(color.getHsva()),
    HSVA: Object.values(color.getHsva()),

    HSL: Object.values(color.getHsla()),
    HSLA: Object.values(color.getHsla()),
    HSB: Object.values(color.getHsla()),

    RGB: Object.values(color.getRgba()),
    RGBA: Object.values(color.getRgba()),
    CMYK: [...Object.values(color.getCmyk()), 0],

    CSS: [color.css, 0],
    HEX: [color.hex, 0],
  };

  const cur = FORMAT_MAP[format];
  if (cur) {
    return [...cur.slice(0, cur.length - 1), `${color.alpha * 100}%`];
  }
  return FORMAT_MAP.RGB;
};


export const genSwatchList = (prop) => {
  if (prop === undefined) {
    return DEFAULT_SYSTEM_SWATCH_COLORS;
  }
  if (!prop || !prop.length) {
    return [];
  }
  return prop;
};
