import { isObjectEqual } from '../utils/object';

type PropType =  Record<string, {
  type: any;
  default: any;
}>;

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

export function getDefaultProps(props: Record<string, any>) {
  const defaultProps = Object.keys(props).reduce((acc: Record<string, any>, key) => {
    acc[key] = getDefaultValue(props, key);
    return acc;
  }, {});
  return defaultProps;
}


export function genAllProps(newProps: Record<string, any>, propsMap: Record<string, any>) {
  if (!newProps || !propsMap) return {};
  return Object.keys(propsMap).reduce((acc, key) => {
    const oldKey = propsMap[key];
    if (newProps[key]) {
      acc[oldKey] = acc[key];
    }
    return acc;
  }, newProps);
}

function getDefaultValue(allProps: PropType, key: string) {
  let result: any = allProps[key]?.default;
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
}: {
  isFunctionMode: boolean;
  functionModeData: Record<string, any>;
  allProps: PropType;
  propsKeyMap: Record<string, string>;
  context: any;
  key: string;
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


function findObjectDeepValue(obj: Record<string, any>, key: string) {
  const list = key.split('.');
  let cur = obj;
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < list.length;i++) {
    cur = cur[list[i]];
    if (cur === undefined) return;
  }
  return cur;
}
