<template>
  <PressDemoIndex
    :show-pages="computedPages"
    :slogan="t('name')"
    :slogan-detail="t('detail')"
  />
</template>
<script>
import PressDemoIndex from '../../packages/press-demo-index/press-demo-index.vue';

import { fetchData } from '../../packages/common/utils/fetch-data';
import { isNotInUni } from '../../packages/common/utils/utils';
import  { getShowDemoMap } from '../../packages/press-demo-index/helper';

import pagesConfig from './page-config.json';
import {
  NOT_SHOW_IN_MP_COMPONENTS,
  NOT_SHOW_IN_PURE_PROJECT,
} from '../../packages/press-demo-index/config';
const HELP_DATA_URL = 'https://tip-components-1251917893.cos.ap-guangzhou.myqcloud.com/rb/front-open-config__match__default__press_ui_helpe_config.json';

function getEnvVersion() {
  const info = uni.getAccountInfoSync();
  return info?.miniProgram?.envVersion || '';
}


function getAllPages() {
  let pages = pagesConfig.pages.filter(item => item.list && item.list.length);

  let disableList = [];

  // #ifndef H5
  disableList = NOT_SHOW_IN_MP_COMPONENTS;
  // #endif
  // #ifdef H5
  if (isNotInUni()) {
    disableList = NOT_SHOW_IN_PURE_PROJECT;
  }
  // #endif

  pages = pages.map(item => ({
    ...item,
    list: item.list.filter((item) => {
      const list = item.url.split('/');
      const name = list[list.length - 1];
      return disableList.indexOf(name) < 0;
    }),
  }));


  // #ifdef VUE3 && MP-QQ
  if (['develop', 'trial'].includes(getEnvVersion())) {
    pages = pages.slice(2);
    let list = pages.reduce((acc, item) => [
      ...acc,
      ...item.list,
    ], []);
    list = list.slice(list.length - 6);
    pages = [{
      name: 'Vue3 组件',
      list,
    }];
  }
  // #endif

  return pages;
}
const detail = 'Press UI 是一套易用、灵活、基于 uni-app 的组件库';


export default {
  i18n: {
    'zh-CN': {
      share: '分享',
      name: '全端兼容 高性能',
      detail,
      otherAbility: '其他功能',
      toggleLanguage: '切换语言',
      toggleVConsole: '切换VConsole',
      launchApp: '拉起APP',
      otherProject: '相关项目',
      checkNormal: '基础',
      checkPure: '非 Uni App',
      checkVue3: 'Vue3',
    },
    'en-US': {
      share: 'Share',
      name: 'Fully Compatible',
      detail: 'Press UI is an easy-to-use, uni-app-based component library',
      otherAbility: 'Other Ability',
      toggleLanguage: 'Toggle Language',
      toggleVConsole: 'Toggle VConsole',
      launchApp: 'Launch App',
      otherProject: 'Other Project',
      checkNormal: 'Vue2 Uni App Project',
      checkPure: 'Vue2 Not Uni App Project',
      checkVue3: 'Vue3 Uni App Project',
    },
  },
  components: {
    PressDemoIndex,
  },
  mixins: [
  ],
  data() {
    return {
      pages: getAllPages(),
      isNotInUni: isNotInUni(),

      showOtherDemoMap: getShowDemoMap(),
      helpConfig: {},
    };
  },
  computed: {
    computedPages() {
      const { pages, quickLinkList } = this;
      const result = pages.map((item, index) => {
        const { list } = item;
        return {
          key: this.getUniqueKey('section', index),
          title: this.getComponentTypeTitle(item),
          list: list.map(comp => ({
            ...comp,
            title: this.getNavName(comp),
          })),
        };
      });

      result.push(...[
        {
          key: 'section-otherAbility',
          title: this.t('otherAbility'),
          list: [
            {
              title: this.t('toggleLanguage'),
              event: 'onToggleLanguage',
            },
            // #ifdef H5
            {
              title: this.t('toggleVConsole'),
              event: 'onOpenVConsole',
            },
            // #endif
          ],
        },
      ]);

      if (quickLinkList.length) {
        result.push(...[
          {
            key: 'section-quickList',
            title: this.t('otherProject'),
            list: quickLinkList.map(item => ({
              ...item,
              title: item.label,
              event: 'onJumpToOtherDemo',
            })),

          },
        ]);
      }
      return result;
    },
    quickLinkList() {
      const { showOtherDemoMap, helpConfig = {} } = this;
      let list = helpConfig.quickLinkList || [];

      if (!showOtherDemoMap.vue2Uni) {
        list = list.filter(item => item.name !== 'vue2-uni');
      }
      if (!showOtherDemoMap.vue2NotUni) {
        list = list.filter(item => item.name !== 'vue2-not-uni');
      }
      if (!showOtherDemoMap.vue3Uni) {
        list = list.filter(item => item.name !== 'vue3-uni');
      }

      // #ifdef MP-QQ
      list = list.filter(item => !!item.mpQQ);
      // #endif
      return list;
    },
  },

  mounted() {
    this.getHelpData();
  },
  beforeDestroy() {
  },
  beforeUnmount() {
  },
  methods: {
    getNavName(nav) {
      const list = nav.url.split('/');
      return this.t(`titleMap.${list[list.length - 1]}`);
    },
    getComponentTypeTitle(item) {
      return this.t(`titleMap.${item.name}`) || item.name;
    },
    getUniqueKey(a, b) {
      return `${a}-${b}`;
    },
    getHelpData() {
      fetchData(HELP_DATA_URL).then((data) => {
        this.helpConfig = data;
      });
    },
  },

};
</script>

