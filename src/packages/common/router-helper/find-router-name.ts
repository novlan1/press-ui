import pathToRegexp from './path-to-regexp';


export function getQueryBaseStr(str = '') {
  if (!str) {
    return {};
  }
  return str.split('&').reduce((acc, item) => {
    const list = item.split('=');
    acc[list[0]] = list[1];
    return acc;
  }, {});
}

export function isMatchPath(meta, path) {
  const { rawPath = [] } = meta;
  if (!rawPath?.length) return;
  for (const item of rawPath) {
    // eslint-disable-next-line prefer-const
    let keys = [];
    const regexp = pathToRegexp(item, keys);
    const match = path.match(regexp);

    if (match) {
      return {
        match,
        regexp,
        keys,
      };
    }
  }

  return;
}


export function findRouteName(path, routes) {
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0;i < routes.length;i++) {
    const item = routes[i];
    const { name, meta = {}, path: itemPath } = item;

    let purePath = path;
    let queryStr = '';
    if (path.includes('?')) {
      const idx = path.indexOf('?');
      purePath = path.slice(0, idx);
      queryStr = path.slice(idx + 1);
    }

    const match = isMatchPath(meta, purePath);

    const queryBasePath = getQueryBaseStr(queryStr);
    if (match) {
      const { match: iMatch, keys } = match;

      const params = keys.reduce((acc: {[k: string]: string}, key, index) => {
        const { name } = key;
        acc[name] =  iMatch[index + 1];
        return acc;
      }, {});


      return {
        name,
        params: {
          ...params,
          ...queryBasePath,
        },
        path: itemPath,
        meta,
      };
    }
  }
}
