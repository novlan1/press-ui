<template>
  <div class="index-page">
    <scroll-view
      scroll-y
      class="scroll-view"
      :scroll-top="scrollTop"
      @scroll="onScroll"
    >
      <div class="index-page__header">
        <img
          class="index-page__header-bg"
          src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/uniui-header-bg.png"
          mode="widthFix"
        >
        <img
          class="index-page__header-logo"
          src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/press-ui-full-logo.png"
          mode="aspectFit"
        >
        <div class="index-page__header-content">
          <div class="index-page__header-title">
            {{ t('name') }}
          </div>
          <div class="index-page__header-info">
            <span class="index-page__header-subtitle">
              {{ t('detail') }}
            </span>
          </div>
        </div>
      </div>

      <div
        class="index-page__main"
      >
        <div class="index-page__card">
          <div
            v-for="(item, index) of pages"
            :key="getUniqueKey('section', index)"
          >
            <press-section
              :title="getComponentTypeTitle(item)"
              :color="sectionStyle.color"
              type="line"
              :header-style="sectionStyle.header"
            />

            <PressCell
              v-for="(nav, idx) in item.list"
              :key="getUniqueKey('nav', idx)"
              is-link
              :title="getNavName(nav)"
              link-type="navigateTo"
              :url="`/pages${nav.url}`"
            />
          </div>

          <press-section
            key="other-ability-section"
            :title="t('otherAbility')"
            :color="sectionStyle.color"
            type="line"
            :header-style="sectionStyle.header"
          />
          <PressCell
            is-link
            :title="t('toggleLanguage')"
            @click="onToggleLanguage"
          />

          <!-- #ifdef H5 -->
          <PressCell
            is-link
            :title="t('toggleVConsole')"
            @click="onOpenVConsole"
          />
          <!-- #endif -->

          <PressCell
            is-link
            :title="t('share')"
            @click="onJumpToSharePage"
          />

          <QuickListComp
            @onBeforeDestroy="onBeforeDestroy"
          />
        </div>
      </div>
    </scroll-view>
  </div>
</template>
<script>

import PressSection from '../components/press-section/press-section.vue';
import QuickListComp from '../components/quick-list/quick-list.vue';
import PressCell from '../../packages/press-cell/press-cell.vue';

import { toggleVConsole } from 't-comm/lib/v-console/toggle';

import { routerPush } from '../../utils/index';
import { toggleI18n } from '../../utils/i18n/toggle-i18n';

import { isNotInUni } from '../../packages/common/utils/utils';

import pagesConfig from './page-config.json';
import {
  SCROLL_TOP_KEY,
  NOT_SHOW_IN_MP_COMPONENTS,
  NOT_SHOW_IN_PURE_PROJECT,
} from './index-config';

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
const detail = 'Press UI 是一套易用的、灵活的、基于 uni-app 的组件库';


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
    PressSection,
    QuickListComp,
    PressCell,
  },
  mixins: [
  ],
  data() {
    return {
      scrollTop: 0,
      pages: getAllPages(),
      isNotInUni: isNotInUni(),

      sectionStyle: {
        header: 'font-weight: 500;margin-bottom: 6px;',
        color: '#007aff',
      },
    };
  },

  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.onBeforeDestroy();
  },
  beforeUnmount() {
    this.onBeforeDestroy();
  },
  methods: {
    init() {
      // #ifdef H5
      this.scrollTop = +localStorage.getItem(SCROLL_TOP_KEY) || 0;
      // #endif
    },
    onBeforeDestroy() {
      // #ifdef H5
      localStorage.setItem(SCROLL_TOP_KEY, this.scrollTop);
      // #endif
    },
    onScroll(e) {
      // #ifdef H5
      this.scrollTop = e.target.scrollTop;
      // #endif
    },
    getNavName(item) {
      const list = item.url.split('/');
      return this.t(`titleMap.${list[list.length - 1]}`);
    },
    getComponentTypeTitle(item) {
      return this.t(`titleMap.${item.name}`) || item.name;
    },
    onToggleLanguage() {
      console.log('[onToggleLanguage]');
      toggleI18n(this.onGTip);
    },
    getUniqueKey(a, b) {
      return `${a}-${b}`;
    },
    onOpenVConsole() {
      toggleVConsole();
    },
    onJumpToSharePage() {
      routerPush.call(
        this,
        '/pages/share/share',
        '/pages/press/share/share',
      );
      // const url = 'https://baidu.com';
      // uni.navigateTo({
      //   url: `/pages/webview/webview?url=${url}`,
      // });
    },

  },

};
</script>

<style lang="scss" scoped src="./index.scss"></style>
