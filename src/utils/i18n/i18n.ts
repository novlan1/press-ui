import localeEn from '../../packages/locale/lang/en-US';
import locale, { t } from '../../packages/locale';
import { initGlobalMixin } from '../../packages/common/vue3/adapter';

import localeEnDemo from './lang/en-US';
import localeZhDemo from './lang/zh-CN';
import { isInIFrame, storageUtil } from '../index';

import { LOCALE_STORAGE_KEY, DEFAULT_LOCALE_NUMBER, LOCALE_NUMBER_MAP } from './config';

const DEFAULT_LANG = 'zh-CN';

const LOCALE_MAP = {
  'en-US': localeEn,
};
const LOCALE_DEMO_AMP = {
  'en-US': localeEnDemo,
  'zh-CN': localeZhDemo,
};

let curLang = DEFAULT_LANG;
if (LOCALE_MAP[curLang]) {
  locale.use(LOCALE_MAP[curLang]);
}
if (LOCALE_DEMO_AMP[curLang]) {
  locale.add(LOCALE_DEMO_AMP[curLang]);
}


function getLocaleFromLocation() {
  const { href } = window.location;
  if (href.indexOf('?') <= -1) return;

  const search = href.split('?')[1];
  const map: {
    locale?: string
    lang?: string
  } = search.split('&').reduce((acc, value) => {
    const temp = value.split('=');
    acc[temp[0]] = temp[1];
    return acc;
  }, {});

  console.log('[map] ', map);

  return map.locale || map.lang;
}


function getLocale() {
  // #ifdef H5
  if (isInIFrame()) {
    return getLocaleFromLocation();
  }
  // #endif

  const locale = storageUtil.get(LOCALE_STORAGE_KEY);
  console.log('[locale] ', locale);
  return LOCALE_NUMBER_MAP[locale || DEFAULT_LOCALE_NUMBER];
}

let set = false;

export function setLang() {
  if (set) return ;
  set = true;
  curLang = getLocale() || DEFAULT_LANG;
  console.log('[curLang] ', curLang);

  if (LOCALE_MAP[curLang]) {
    locale.use(LOCALE_MAP[curLang]);
  }
  if (LOCALE_DEMO_AMP[curLang]) {
    locale.add(LOCALE_DEMO_AMP[curLang]);
  }
}

function getPage() {
  const pages = getCurrentPages();
  const path: string = pages[pages.length - 1].route || '';

  // const { path } = this.$route;
  const list = path.split('/');
  const name = list[list.length - 1];

  return name;
}

export function initDemoI18n(app) {
  const mixin = {
    // @ts-ignore
    onReady() {
      const name = getPage();
      if (!name) return;

      const newTitle = (this as any).t(`titleMap.${name}`);
      if (!newTitle) return;

      uni.setNavigationBarTitle({
        title: newTitle,
      });
    },
    methods: {
      t(key, ...args) {
        // @ts-ignore
        const { i18n } = this.$options;
        if (i18n?.[curLang]?.[key]) {
          const value = i18n[curLang][key];
          if (typeof value === 'function') {
            return value(...args);
          }
          return value;
        }
        return t.call(this, key, ...args);
      },
    },
  };

  initGlobalMixin(mixin, app);
}

setLang();
// initDemoI18n();
