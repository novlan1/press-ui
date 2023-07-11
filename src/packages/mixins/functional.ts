import { getDefaultProps, FUNCTIONAL, getPropOrData } from '../common/component-handler/press-component';

const ANIMATION_TIME = 300;

export const functionalMixin = (allProps, {
  showProp,
  propsKeyMap,
} = {
  showProp: true,
  propsKeyMap: {},
}) => {
  const props: Record<string, any> = {};
  const watch: Record<string, any> = {};

  if (showProp) {
    props.show = {
      type: Boolean,
      default: true,
    };
    watch.show = {
      handler(val) {
        if ((this as any).isFunctionMode) return;
        if (!val) {
          setTimeout(() => {
            (this as any).innerShow = false;
          }, ANIMATION_TIME);
        } else {
          (this as any).innerShow = true;
        }
      },
      immediate: true,
    };
  }

  return {
    props: {
      ...allProps,
      ...props,
      mode: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        innerShow: false,
        functionModeData: { ...getDefaultProps(allProps) },
      };
    },
    computed: {
      isFunctionMode() {
        return (this as any).mode === FUNCTIONAL;
      },
    },
    watch: {
      ...watch,
    },
    methods: {
      closeDialog() {
        (this as any).innerShow = false;
      },
      showDialog(options) {
        if (options) {
          (this as any).functionModeData = {
            ...getDefaultProps(allProps),
            ...options,
          };
        }
        (this as any).innerShow = true;
      },
      getPropOrData(key) {
        const { isFunctionMode, functionModeData } = this as any;
        return getPropOrData({
          allProps,
          isFunctionMode,
          functionModeData,
          propsKeyMap,
          key,
          context: this,
        });
      },
      promiseCallback(type: 'confirm' | 'cancel', options = {}) {
        const { callback } = (this as any).functionModeData;
        if (typeof callback === 'function') {
          callback(type, {
            context: this,
            ...options,
          });
        }
      },
    },
  };
};
