import { createPopper, offsetModifier  } from '../../common/popper/create';


export const popoverMixin = {
  // #ifdef H5
  watch: {
    value: 'updateLocation',
    modelValue: 'updateLocation',
    placement: 'updateLocation',
    getContainer: 'updateLocation',
  },
  mounted() {
    this.updateLocation();
  },
  beforeDestroy() {
    this.destroyPopper();
  },
  methods: {
    createPopper() {
      const { wrapper } = this.$refs;
      const popover = this.$refs.popover.$el;

      const popper = createPopper(wrapper, popover, {
        placement: this.placement,
        modifiers: [
          {
            name: 'computeStyles',
            options: {
              adaptive: false,
              gpuAcceleration: false,
            },
          },
          {
            ...offsetModifier,
            options: {
              offset: this.offset,
            },
          },
        ],
      });
      window.addEventListener('animationend', this.updateLocation);
      window.addEventListener('transitionend', this.updateLocation);
      return popper;
    },
    destroyPopper() {
      if (this.popper) {
        window.removeEventListener('animationend', this.updateLocation);
        window.removeEventListener('transitionend', this.updateLocation);
        this.popper.destroy();
        this.popper = null;
      }
    },
    updateLocation() {
      if (!this.getContainer) {
        this.destroyPopper();
        return;
      }

      setTimeout(() => {
        if (!this.value && !this.modelValue) {
          return;
        }

        if (!this.popper) {
          this.popper = this.createPopper();
        } else {
          this.popper.setOptions({
            placement: this.placement,
          });
        }
      }, 50);
    },
  },
  // #endif
};
