import { isObj } from '../utils/validator';


export function formatPropKey(key) {
  return key.replace(/^(\w)/, (a, b) => `data${b.toUpperCase()}`);
}

export function getPropsWatch(props) {
  const watchProps = Object.keys(props).reduce((acc, item) => {
    acc[item] = {
      handler(val) {
        this[formatPropKey(item)] = val;
      },
    };
    return acc;
  }, {});
  return watchProps;
}


export function getPropsData(context, props) {
  const propsData = Object.keys(props).reduce((acc, item) => {
    acc[formatPropKey(item)] = context[item];
    return acc;
  }, {});
  return propsData;
}


export function setPropsToData(data) {
  Object.keys(data).forEach((key) => {
    this[formatPropKey(key)] = data[key];
  });
}


export function parseOptions(message, defaultKey = 'message') {
  return isObj(message) ? message : { [defaultKey]: message };
}


const createMethod = (obj, type, defaultKey) => (options) => {
  const newOptions = {
    type,
    ...parseOptions(options, defaultKey),
  };


  return obj(newOptions);
};


export function makeExtraMethods(obj, methodList, defaultKey = 'message') {
  methodList.forEach((method) => {
    obj[method] = createMethod(obj, method, defaultKey);
  });
}
