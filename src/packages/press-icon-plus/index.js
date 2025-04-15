import { style } from '../common/utils/style';
import { addUnit } from '../common/utils/add-unit';

function isImage(name) {
  return name.indexOf('/') !== -1;
}

function rootClass(data) {
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

function rootStyle(data) {
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
