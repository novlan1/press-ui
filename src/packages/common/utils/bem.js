const PREFIX = 'van-';
const PREFIX2 = 'press-';

function join(name, mods, prefix) {
  name = prefix + name;
  mods = mods.map(mod => `${name}--${mod}`);
  mods.unshift(name);
  return mods.join(' ');
}


function traversing(mods, conf) {
  if (!conf) {
    return;
  }

  if (typeof conf === 'string' || typeof conf === 'number') {
    mods.push(conf);
  } else if (Array.isArray(conf)) {
    conf.forEach((item) => {
      traversing(mods, item);
    });
  } else if (typeof conf === 'object') {
    Object.keys(conf).forEach((key) => {
      conf[key] && mods.push(key);
    });
  }
}

export function bem(name, conf) {
  const mods = [];
  traversing(mods, conf);
  return join(name, mods, PREFIX);
}

export function bem2(name, conf) {
  const mods = [];
  traversing(mods, conf);
  return join(name, mods, PREFIX2);
}

export function bem3(name, conf, extraClassPrefix) {
  if (!extraClassPrefix) {
    return bem2(name, conf);
  }
  const mods = [];
  traversing(mods, conf);
  const classA = join(name, mods, extraClassPrefix);
  const classB = join(name, mods, PREFIX2);

  return `${classA} ${classB}`;
}


export default bem;
