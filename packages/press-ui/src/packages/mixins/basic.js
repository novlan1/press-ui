export const basic = {
  methods: {
    $emit(name, detail, options) {
      this.triggerEvent(name, detail, options);
    },
    set(data) {
      this.setData(data);
      return new Promise(resolve => wx.nextTick(resolve));
    },
  },
};
