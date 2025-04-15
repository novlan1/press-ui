export function range(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

function trimExtraChar(value, _char, regExp) {
  const index = value.indexOf(_char);
  let prefix = '';

  if (index === -1) {
    return value;
  }

  if (_char === '-' && index !== 0) {
    return value.slice(0, index);
  }

  if (_char === '.' && value.match(/^(\.|-\.)/)) {
    prefix = index ? '-0' : '0';
  }

  return prefix + value.slice(0, index + 1) + value.slice(index).replace(regExp, '');
}

export function formatNumber(value, allowDot, allowMinus) {
  if (allowDot === void 0) {
    allowDot = true;
  }

  if (allowMinus === void 0) {
    allowMinus = true;
  }

  if (allowDot) {
    value = trimExtraChar(value, '.', /\./g);
  } else {
    value = value.split('.')[0];
  }

  if (allowMinus) {
    value = trimExtraChar(value, '-', /-/g);
  } else {
    value = value.replace(/-/, '');
  }

  const regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g;
  return value.replace(regExp, '');
} // add num and avoid float number

export function addNumber(num1, num2) {
  const cardinal = Math.pow(10, 10);
  return Math.round((num1 + num2) * cardinal) / cardinal;
}
