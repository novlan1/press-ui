const camelizeRE = /-(\w)/g;

export function camelize(str) {
  return str.replace(camelizeRE, (_, c) => c.toUpperCase());
}

export function padZero(num, targetLength) {
  if (targetLength === void 0) {
    targetLength = 2;
  }

  let str = `${num}`;

  while (str.length < targetLength) {
    str = `0${str}`;
  }

  return str;
}
