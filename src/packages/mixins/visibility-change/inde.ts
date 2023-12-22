export const visibilityChangeMixin = (callback: Function) => ({
  mounted(this: any) {
    window.addEventListener('visibilitychange', this._watchVisibleChange);
  },
  destroyed(this: any) {
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
