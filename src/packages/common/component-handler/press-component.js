export function PressComponent(options = {}) {
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
