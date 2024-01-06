import { style } from '../common/utils/style';

export const DEFAULT_SIZE_LIST = [
  'normal', 'large', 'small', 'mini',
];

function getSizeStyle(data: Record<string, any>) {
  const properties: Record<string, any> = {};
  const { size } = data;

  if (size) {
    if (size === 'string' && DEFAULT_SIZE_LIST.indexOf(size) <= -1) {
      properties.height = size;
      properties.width = size;
    } else if (typeof size === 'object') {
      if (size.height) {
        properties.height = size.height;
      }
      if (size.width) {
        properties.width = size.width;
      }
    }
  }
  return properties;
}

export function rootStyle(data: Record<string, any>) {
  const sizeStyle = getSizeStyle(data);
  if (!data.color) {
    return style([sizeStyle, data.customStyle]);
  }

  const properties: Record<string, any> = {
    color: data.plain ? data.color : '#fff',
    background: data.plain ? null : data.color,
    ...sizeStyle,
  };


  // hide border when color is linear-gradient
  if (data.color.indexOf('gradient') !== -1) {
    properties.border = 0;
  } else {
    properties['border-color'] = data.color;
  }

  return style([properties, data.customStyle]);
}

export function loadingColor(data: Record<string, any>) {
  if (data.plain) {
    return data.color ? data.color : '#c9c9c9';
  }

  if (data.type === 'default') {
    return '#c9c9c9';
  }

  return '#fff';
}


