
export const ClickOutsideMixin = config => ({
  props: {
    closeOnClickOutside: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    const clickOutsideHandler = (event) => {
      // @ts-ignore
      if (this.closeOnClickOutside && !this.$el.contains(event.target)) {
      // @ts-ignore
        this[config.method]();
      }
    };

    return { clickOutsideHandler };
  },

  mounted() {
    // @ts-ignore
    document.addEventListener(config.event, this.clickOutsideHandler);
  },

  beforeDestroy() {
    // @ts-ignore
    document.removeEventListener(config.event, this.clickOutsideHandler);
  },
});
