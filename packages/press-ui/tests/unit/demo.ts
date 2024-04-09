import Vue, { CreateElement } from 'vue';
import { mount } from '@vue/test-utils';
import { t } from '../../src/packages/locale';

// @ts-ignore
global.wx = {};
// @ts-ignore
global.uni = { getSystemInfoSync() {} };
// @ts-ignore
window.getCurrentPages = () => ({});
// @ts-ignore
window.getCurrentInstance = () => ({
  ctx: {},
});
// @ts-ignore
window.IntersectionObserver = function () {};
// @ts-ignore
window.uni = {
  getSystemInfoSync() {
    return {};
  },
  createIntersectionObserve() {},
  createCanvasContext() {
    return {};
  },
};


const proto = Vue.prototype;
const Empty = {
  render(h: CreateElement): ReturnType<CreateElement> {
    return h('div', [(this as any).$slots.default]);
  },
  inheritAttrs: false,
};

Vue.component('demo-block', Empty);
Vue.component('uni-swiper-item', Empty);
Vue.component('uni-swiper', Empty);
Vue.component('uni-scroll-view', Empty);
Vue.component('scroll-view', Empty);
Vue.mixin({
  methods: {
    t(key: string, ...args: Array<any>) {
      const curLang = 'zh-CN';
      const { i18n } = this.$options as any;
      if (i18n?.[curLang]?.[key]) {
        const value: any = i18n[curLang][key];
        if (typeof value === 'function') {
          return value(...args);
        }
        return value;
      }
      return t.call(this, key, ...args);
    },
    createSelectorQuery() {
      return {
        select: () => ({
          fields: () => ({
            exec: () => {},
          }),
        }),
      };
    },
  },
});

export function snapshotDemo(Demo: any, option: any = {}) {
  test('renders demo correctly', async () => {
    if (option.beforeTest) {
      option.beforeTest();
    }

    proto.t = (value: any) =>  value;

    const wrapper = mount(Demo);
    expect(wrapper).toMatchSnapshot();

    if (option.afterTest) {
      option.afterTest();
    }
  });
}
