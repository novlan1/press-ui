import { isObjectEqual } from '../utils/object-equal';


export const FUNCTIONAL = 'functional';


export function PressComponent(options = {
  options: {},
  props: {},
}) {
  return {
    ...options,
    options: {
      multipleSlots: true,
      addGlobalClass: true,
      ...(options.options || {}),
    },
    props: {
      customClass: {
        type: String,
        default: '',
      },
      ...(options.props || {}),
    },
  };
}

export const defaultProps = {
  customClass: {
    type: String,
    default: '',
  },
};

export const defaultOptions = {
  multipleSlots: true,
  addGlobalClass: true,
};

export function getDefaultProps(props) {
  const defaultProps = Object.keys(props).reduce((acc, key) => {
    acc[key] = getDefaultValue(props, key);
    return acc;
  }, {});
  return defaultProps;
}


export function genAllProps(newProps, propsMap) {
  if (!newProps || !propsMap) return {};
  return Object.keys(propsMap).reduce((acc, key) => {
    const oldKey = propsMap[key];
    if (newProps[key]) {
      acc[oldKey] = acc[key];
    }
    return acc;
  }, newProps);
}

function getDefaultValue(allProps, key) {
  let result = allProps[key]?.default;
  if (typeof result === 'function') {
    result = result();
  }
  return result;
}

export function getPropOrData({
  isFunctionMode,
  functionModeData,
  allProps,
  propsKeyMap = {},
  context,
  key,
}) {
  if (!isFunctionMode) {
    const oldKey = propsKeyMap[key];
    // 存在旧的key
    if (oldKey) {
      const oldDefaultValue = getDefaultValue(allProps, oldKey);
      const newDefaultValue = getDefaultValue(allProps, key);

      if (!isObjectEqual(context[key], newDefaultValue)) {
        return findObjectDeepValue(context, key);
      }
      if (!isObjectEqual(context[oldKey], oldDefaultValue)) {
        return findObjectDeepValue(context, oldKey);
      }
      return findObjectDeepValue(context, key);
    }
    return findObjectDeepValue(context, key);
  }
  return findObjectDeepValue(functionModeData, key);
}


function findObjectDeepValue(obj, key) {
  const list = key.split('.');
  let cur = obj;
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < list.length;i++) {
    cur = cur[list[i]];
    if (cur === undefined) return;
  }
  return cur;
}
