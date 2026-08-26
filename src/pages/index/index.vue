<template>
  <PressDemoIndex
    :component-count="85"
    :pages="showPages"
    :quick-link-list="quickLinkList"
    :logo-pic="logoPic"
    :slogan="t('name')"
    :slogan-detail="t('detail')"
    :title-map="titleMap"
    :hide-demo-list="hideDemoList"
    :show-collapse-arrow="true"
    :show-v-console="true"
    :show-language-toggle="true"
    other-ability-label="其他功能"
    other-project-label="相关项目"
  />
</template>
<script>
import { isNotInUni } from 'press-ui/common/utils/utils';
import {
  NOT_SHOW_IN_MP_COMPONENTS,
  NOT_SHOW_IN_PURE_PROJECT,
} from 'press-ui/press-demo-index/config';
import { getHideDemoList } from 'press-ui/press-demo-index/helper';

import PressDemoIndex from 'press-ui/press-demo-index/press-demo-index.vue';

import pagesConfig from './page-config.json';

import { QUICK_LINK_LIST } from './help-config';


const DETAIL = 'Press UI 是一套易用、灵活、基于 uni-app 的组件库';


export default {
  i18n: {
    'zh-CN': {
      name: '全端兼容 高性能',
      detail: DETAIL,
    },
    'en-US': {
      name: 'Fully Compatible',
      detail: 'Press UI is an easy-to-use, uni-app-based component library',
    },
  },
  components: {
    PressDemoIndex,
  },
  data() {
    return {
      logoPic: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/press-ui-full-logo.png',
      isNotInUni: isNotInUni(),
      hideDemoList: getHideDemoList(),
    };
  },
  computed: {
    /**
     * 处理后传递给组件的页面列表
     * 1. 过滤不适用于当前平台的组件
     * 2. 解析 i18n 标题（分类 + 组件名）
     */
    showPages() {
      const disableList = this.getDisableList();

      return pagesConfig.pages.map((item) => {
        const filteredList = item.list.filter((comp) => {
          const name = comp.url.split('/').pop();
          return disableList.indexOf(name) < 0;
        });

        return {
          key: `section-${item.name}`,
          title: this.resolveI18nTitle(`titleMap.${item.name}`) || item.name,
          list: filteredList.map(comp => ({
            ...comp,
            title: this.resolveI18nTitle(`titleMap.${comp.url.split('/').pop()}`) || comp.url.split('/').pop(),
          })),
        };
      });
    },

    /**
     * 分类标题 i18n 映射
     */
    titleMap() {
      return {
        'Basic Components': '基础组件',
        'Form Components': '表单组件',
        'Action Components': '反馈组件',
        'Display Components': '展示组件',
        'Navigation Components': '导航组件',
        'Business Components': '业务组件',
      };
    },

    /**
     * 「相关项目」区块的快捷链接列表。
     *   - 数据来自本地配置 help-config.ts 的 QUICK_LINK_LIST（原七彩石 CDN 已下线）。
     *   - 带 url 字段的项会被 PressDemoIndex 识别为「本项目内部页面」，
     *     点击走 routerPush('/pages' + url)，而非跳外部项目。
     */
    quickLinkList() {
      return [
        ...QUICK_LINK_LIST,
        {
          url: '/bump/bump',
          label: 'Bump',
        },
      ];
    },
  },
  methods: {
    getDisableList() {
      let disableList = [];
      // #ifndef H5
      disableList = NOT_SHOW_IN_MP_COMPONENTS;
      // #endif
      // #ifdef H5
      if (this.isNotInUni) {
        disableList = NOT_SHOW_IN_PURE_PROJECT;
      }
      // #endif
      return disableList;
    },

    /**
     * 尝试从 i18n 解析标题，找不到则返回空字符串（由调用方 fallback）
     */
    resolveI18nTitle(key) {
      const result = this.t(key);
      // vue-i18n 未找到 key 时返回 key 本身，视为无翻译
      return result !== key ? result : '';
    },
  },
};
</script>
<style lang="scss" scoped>
/* 页面级样式由 press-demo-index 组件提供 */
</style>
