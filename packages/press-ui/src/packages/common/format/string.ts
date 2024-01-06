const camelizeRE = /-(\w)/g;

export function camelize(str: string) {
  return str.replace(camelizeRE, (_, c) => c.toUpperCase());
}

export function padZero(num: number | string, targetLength = 2) {
  let str = `${num}`;

  while (str.length < targetLength) {
    str = `0${str}`;
  }

  return str;
}


export function hyphenate(str: string) {
  const hyphenateRE = /\B([A-Z])/g;
  return str.replace(hyphenateRE, '-$1').toLowerCase();
}
