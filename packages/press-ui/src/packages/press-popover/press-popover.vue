<template>
  <div
    v-if="innerShow"
    :style="customStyle"
    :class="['press-popover',
             `press-popover--${placement}`,
             popperClass,
             customClass,
             isEnter ? 'press--animation__fade-in':'press--animation__fade-out'
    ]"
  >
    <slot />
  </div>
</template>
<script>
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';

export default {
  name: 'PressPopover',
  options: {
    ...defaultOptions,
    virtualHost: true,
  },
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    placement: {
      type: String,
      default: 'right',
    },
    popperClass: {
      type: String,
      default: '',
    },
    ...defaultProps,
    customStyle: {
      type: String,
      default: '',
    },
  },

  emits: [],
  data() {
    return {
      innerShow: false,
      isEnter: false,

      watchShowTimer: null,
    };
  },
  computed: {
  },
  watch: {
    show: {
      handler(value) {
        if (value) {
          clearTimeout(this.watchShowTimer);

          this.innerShow = value;
          this.isEnter = value;
        } else {
          // remove
          this.isEnter = value;
          clearTimeout(this.watchShowTimer);

          this.watchShowTimer = setTimeout(() => {
            this.innerShow = value;
          }, 300);
        }
      },
      immediate: true,
    },
  },
  methods: {
  },
};

</script>
<!-- 业务改造成本大，不能使用 scoped -->
<style lang="scss" src="./css/index.scss">
</style>
