export const basic = {
  methods: {
    $emit(name: string, detail: any, options: any) {
      (this as any).triggerEvent(name, detail, options);
    },
    set(data: Record<string, any>) {
      (this as any).setData(data);
      return new Promise(resolve => wx.nextTick(resolve));
    },
  },
};
