import localeEn from '../../packages/locale/lang/en-US';
import locale, { t } from '../../packages/locale';
import { initGlobalMixin } from '../../packages/common/vue3/adapter';

import localeEnDemo from './lang/en-US';
import localeZhDemo from './lang/zh-CN';
import { isInIFrame, storageUtil } from '../index';

import {
  LOCALE_STORAGE_KEY,
  DEFAULT_LOCALE_NUMBER,
  LOCALE_NUMBER_MAP,
  NO_I18N_TITLE_LIST,
} from './config';

const DEFAULT_LANG = 'zh-CN';

const LOCALE_MAP = {
  'en-US': localeEn,
};
const LOCALE_DEMO_AMP = {
  'en-US': localeEnDemo,
  'zh-CN': localeZhDemo,
};

let curLang = DEFAULT_LANG;
if (LOCALE_MAP[curLang as keyof typeof LOCALE_MAP]) {
  locale.use(LOCALE_MAP[curLang as keyof typeof LOCALE_MAP]);
}
if (LOCALE_DEMO_AMP[curLang as keyof typeof LOCALE_DEMO_AMP]) {
  locale.add(LOCALE_DEMO_AMP[curLang as keyof typeof LOCALE_DEMO_AMP]);
}


function getLocaleFromLocation() {
  const { href } = window.location;
  if (href.indexOf('?') <= -1) return;

  const search = href.split('?')[1];
  const map: {
    locale?: string
    lang?: string
  } = search.split('&').reduce((acc: Record<string, any>, value) => {
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
  return LOCALE_NUMBER_MAP[(locale || DEFAULT_LOCALE_NUMBER) as keyof typeof LOCALE_NUMBER_MAP];
}

let set = false;

export function setLang(force = false) {
  if (set && !force) return ;
  set = true;
  curLang = getLocale() || DEFAULT_LANG;
  console.log('[curLang] ', curLang);

  if (LOCALE_MAP[curLang as keyof typeof LOCALE_MAP]) {
    locale.use(LOCALE_MAP[curLang as keyof typeof LOCALE_MAP]);
  }
  if (LOCALE_DEMO_AMP[curLang as keyof typeof LOCALE_DEMO_AMP]) {
    locale.add(LOCALE_DEMO_AMP[curLang as keyof typeof LOCALE_DEMO_AMP]);
  }
}

function getPage() {
  const pages = getCurrentPages();
  const path: string = pages[pages.length - 1].route || '';

  if (NO_I18N_TITLE_LIST.includes(path)) {
    return;
  }

  // const { path } = this.$route;
  const list = path.split('/');
  const name = list[list.length - 1];

  return name;
}

export function initDemoI18n(app?: any) {
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
      t(key: string, ...args: Array<any>) {
        // @ts-ignore
        const { i18n } = this.$options;
        if (i18n?.[curLang]?.[key]) {
          const value: any = i18n[curLang][key];
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
