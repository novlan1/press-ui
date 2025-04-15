export const visibilityChangeMixin = callback => ({
  mounted() {
    window.addEventListener('visibilitychange', this._watchVisibleChange);
  },
  destroyed() {
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
