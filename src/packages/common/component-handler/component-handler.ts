import { isObj } from '../utils/validator';


export function formatPropKey(key: string) {
  return key.replace(/^(\w)/, (a, b) => `data${b.toUpperCase()}`);
}

export function getPropsWatch(props: Record<string, any>) {
  const watchProps = Object.keys(props).reduce((acc: Record<string, any>, item) => {
    acc[item] = {
      handler(val: any) {
        this[formatPropKey(item)] = val;
      },
    };
    return acc;
  }, {});
  return watchProps;
}


export function getPropsData(context: any, props: Record<string, any>) {
  const propsData = Object.keys(props).reduce((acc: Record<string, any>, item) => {
    acc[formatPropKey(item)] = context[item];
    return acc;
  }, {});
  return propsData;
}


export function setPropsToData(this: any, data: Record<string, any>) {
  Object.keys(data).forEach((key) => {
    this[formatPropKey(key)] = data[key];
  });
}


export function parseOptions(message: any, defaultKey = 'message') {
  return isObj(message) ? message : { [defaultKey]: message };
}


const createMethod = (obj: Function, type: string, defaultKey: string) => (options: Record<string, any>) => {
  const newOptions = {
    type,
    ...parseOptions(options, defaultKey),
  };


  return obj(newOptions);
};


export function makeExtraMethods(obj: Function & Record<string, any>, methodList: Array<string>, defaultKey = 'message') {
  methodList.forEach((method) => {
    obj[method] = createMethod(obj, method, defaultKey);
  });
}
