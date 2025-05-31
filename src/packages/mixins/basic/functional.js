import { getDefaultProps, FUNCTIONAL, getPropOrData } from '../../common/component-handler/press-component';

const ANIMATION_TIME = 300;

export const functionalMixin = (allProps, {
  showProp,
  propsKeyMap,
} = {
  showProp: true,
  propsKeyMap: {},
}) => {
  const props = {};
  const watch = {};

  if (showProp) {
    props.show = {
      type: Boolean,
      default: true,
    };
    watch.show = {
      handler(val) {
        if (this.isFunctionMode) return;
        if (!val) {
          setTimeout(() => {
            this.innerShow = false;
          }, ANIMATION_TIME);
        } else {
          this.innerShow = true;
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
        return this.mode === FUNCTIONAL;
      },
    },
    watch: {
      ...watch,
    },
    methods: {
      closeDialog() {
        this.innerShow = false;
      },
      showDialog(options) {
        if (options) {
          this.functionModeData = {
            ...getDefaultProps(allProps),
            ...options,
          };
        }
        this.innerShow = true;
      },
      getPropOrData(key) {
        const { isFunctionMode, functionModeData } = this;
        const res = getPropOrData({
          allProps,
          isFunctionMode,
          functionModeData,
          propsKeyMap,
          key,
          context: this,
        });
        // console.log('[getPropOrData] key: ', key, res);
        return res;
      },
      promiseCallback(type, options = {}) {
        const { callback } = this.functionModeData;
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
