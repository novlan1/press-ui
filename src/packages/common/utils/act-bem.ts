const PREFIX = 'press__';

function getClassList(args: any) {
  const list = args.reduce((acc: Array<any>, item: any) => {
    if (Array.isArray(item)) {
      acc.push(...item);
    } else {
      acc.push(item);
    }
    return acc;
  }, []);

  const parsed = list.reduce((acc: Array<any>, item: any) => {
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

export function getActClass(useTipClass: boolean, tipClassMap: Record<string, any>, args: any) {
  const list = getClassList(args);

  const tipClasses = list.map((item: any) => (item ? tipClassMap[item] || '' : ''));
  const pressClasses = list.map((item: any) => {
    const reg = new RegExp(`^${PREFIX}`);
    if (!item) {
      return '';
    }
    if (reg.test(item)) {
      return item;
    }
    return `${PREFIX}${item}`;
  });

  if (!useTipClass) {
    return pressClasses.join(' ');
  }

  return [...pressClasses, ...tipClasses].join(' ');
}
