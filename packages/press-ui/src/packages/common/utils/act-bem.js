const PREFIX = 'press__';

function getClassList(args) {
  const list = args.reduce((acc, item) => {
    if (Array.isArray(item)) {
      acc.push(...item);
    } else {
      acc.push(item);
    }
    return acc;
  }, []);

  const parsed = list.reduce((acc, item) => {
    if (typeof item === 'string') {
      acc.push(item);
    } else if (typeof item === 'object') {
      Object.keys(item).map((key) => {
        if (item[key]) {
          acc.push(key);
        }
      });
    }
    return acc;
  }, []);

  return parsed;
}

export function getActClass(useTipClass, tipClassMap, args) {
  return getActClassWithPrefix(useTipClass, tipClassMap, PREFIX, args);
}

export function getActClassWithPrefix(useTipClass, tipClassMap, prefix, args) {
  const list = getClassList(args);

  const tipClasses = list.map(item => (item ? tipClassMap[item] || '' : ''));
  const pressClasses = list.map((item) => {
    const reg = new RegExp(`^${prefix}`);
    if (!item) {
      return '';
    }
    if (reg.test(item)) {
      return item;
    }
    return `${prefix}${item}`;
  });

  if (!useTipClass) {
    return pressClasses.join(' ');
  }

  return [...pressClasses, ...tipClasses].join(' ');
}
