export const visibilityChangeMixin = callback => ({
  mounted() {
    // @ts-ignore
    window.addEventListener('visibilitychange', this._watchVisibleChange);
  },
  destroyed() {
    // @ts-ignore
    window.removeEventListener('visibilitychange', this._watchVisibleChange);
  },
  methods: {
    _watchVisibleChange() {
      if (document.visibilityState !== 'hidden') {
        callback.call(this);
      }
    },
  },
});
