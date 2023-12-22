import { style } from '../common/utils/style';
import { addUnit } from '../common/utils/add-unit';

function isImage(name: string) {
  return name.indexOf('/') !== -1;
}

function rootClass(data: Record<string, any>) {
  const classes = [data.customClass || ''];

  if (data.classPrefix != null) {
    classes.push(data.classPrefix);
  }

  if (isImage(data.name)) {
    classes.push('press-icon-plus--image');
  } else if (data.classPrefix != null) {
    classes.push(`${data.classPrefix}-${data.name}`);
  }

  return classes.join(' ');
}

function rootStyle(data: Record<string, any>) {
  return style([
    {
      color: data.color,
      'font-size': addUnit(data.size),
    },
    data.customStyle,
  ]);
}

export default {
  isImage,
  rootClass,
  rootStyle,
};
