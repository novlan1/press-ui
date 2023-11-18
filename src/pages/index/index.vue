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
          @longpress.stop="onMorsePwdLongPress"
          @click.stop="onMorsePwdClick"
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
          <PressCell
            v-if="showLaunchApp"
            is-link
            :title="t('launchApp')"
            @click="onJumpToLaunchApp"
          />
          <!-- #endif -->

          <PressCell
            is-link
            :title="t('share')"
            @click="onJumpToSharePage"
          />

          <press-section
            v-if="showOtherDemoMap.vue2Uni
              || showOtherDemoMap.vue2NotUni
              || showOtherDemoMap.vue3Uni"
            key="other-project-section"
            :title="t('otherProject')"
            :color="sectionStyle.color"
            type="line"
            :header-style="sectionStyle.header"
          />

          <PressCell
            v-if="showOtherDemoMap.vue2Uni"
            is-link
            :title="t('checkNormal')"
            @click="onJumpToOtherDemo('vue2-uni')"
          />
          <PressCell
            v-if="showOtherDemoMap.vue2NotUni"
            is-link
            :title="t('checkPure')"
            @click="onJumpToOtherDemo('vue2-not-uni')"
          />
          <PressCell
            v-if="showOtherDemoMap.vue3Uni"
            is-link
            :title="t('checkVue3')"
            @click="onJumpToOtherDemo('vue3-uni')"
          />
        </div>
      </div>
    </scroll-view>


    <!-- <Tabbar /> -->
  </div>
</template>
<script>

import PressSection from '../components/press-section/press-section.vue';
import PressCell from '../../packages/press-cell/press-cell.vue';

import { LAUNCH_APP_STORAGE } from '../launch-app/config';
import { isInIFrame, routerPush } from '../../utils/index';
import { toggleVConsole } from '../../utils/v-console/v-console';
import { morsePwdMixin } from '../../utils/morse-password/morse-password-mixin';
import { toggleI18n } from '../../utils/i18n/toggle-i18n';
import { isNotInUni } from '../../packages/common/utils/utils';

import pagesConfig from './page-config.json';

const SCROLL_TOP_KEY = 'INDEX_SCROLL_TOP';
const DEMO_LINK_MAP = {
  'vue2-uni': 'https://novlan1.github.io/press-ui-demo/',
  'vue2-not-uni': 'https://novlan1.github.io/press-ui-pure/',
  'vue3-uni': 'https://novlan1.github.io/press-ui-v3/',
};

const NOT_SHOW_IN_MP_COMPONENTS = [
  'hor-match-header',
  'hor-match-index',
  'hor-owner-index',
  'hor-schedule-manage',
  'p-c-scan-login',
];

function getShowDemoMap() {
  let showOtherDemoMap = {
    vue2Uni: false,
    vue2NotUni: false,
    vue3Uni: false,
  };
  // #ifdef H5
  showOtherDemoMap = {
    vue2Uni: true,
    vue2NotUni: true,
    vue3Uni: true,
  };
  // #endif

  // #ifdef VUE3
  showOtherDemoMap.vue3Uni = false;
  // #endif

  if (isNotInUni()) {
    showOtherDemoMap.vue2NotUni = false;
  }

  // #ifndef VUE3
  if (!isNotInUni()) {
    showOtherDemoMap.vue2Uni = false;
  }
  // #endif

  return showOtherDemoMap;
}

function getAllPages() {
  let pages = pagesConfig.pages.filter(item => item.list && item.list.length);

  // #ifndef H5
  pages = pages.map(item => ({
    ...item,
    list: item.list.filter((item) => {
      const list = item.url.split('/');
      const name = list[list.length - 1];
      return NOT_SHOW_IN_MP_COMPONENTS.indexOf(name) <= -1;
    }),
  }));
  // #endif
  return pages;
}


function getShowLaunchApp() {
  let showLaunchApp = false;
  // #ifdef H5
  showLaunchApp = sessionStorage.getItem(LAUNCH_APP_STORAGE.kEY) === LAUNCH_APP_STORAGE.VALUE;
  // #endif
  return showLaunchApp;
}

export default {
  i18n: {
    'zh-CN': {
      share: '分享',
      name: '全端兼容 高性能',
      detail: 'Press UI 是一套易用的、灵活的、基于 uni-app 的组件库',
      otherAbility: '其他功能',
      toggleLanguage: '切换语言',
      toggleVConsole: '切换VConsole',
      launchApp: '拉起APP',
      otherProject: '其他项目',
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
    PressCell,
    // Tabbar,
  },
  mixins: [
    morsePwdMixin([1, 1, 1, 1, 1], function () {
      // #ifdef H5
      if (isInIFrame()) return;
      this.onShowLaunchApp();
      // #endif
    }),
  ],
  data() {
    return {
      scrollTop: 0,
      pages: getAllPages(),
      // showMoreList: true,
      showLaunchApp: getShowLaunchApp(),
      isNotInUni: isNotInUni(),
      showOtherDemoMap: getShowDemoMap(),
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
      // this.showMoreList = true;
      // #endif

      // #ifndef H5
      // setTimeout(() => {
      //   this.showMoreList = true;
      // }, 2000);
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
      return this.t(`titleMap.${item.name}`);
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
    onJumpToLaunchApp() {
      routerPush.call(
        this,
        '/pages/launch-app/launch-app',
        '/pages/press/launch-app/launch-app',
      );
    },
    onShowLaunchApp() {
      this.showLaunchApp = true;
      sessionStorage.setItem(LAUNCH_APP_STORAGE.kEY, LAUNCH_APP_STORAGE.VALUE);
      this.onGTip('展示成功');
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
    onJumpToOtherDemo(type) {
      const link = DEMO_LINK_MAP[type];
      if (!link) return;

      this.$toast.loading({
        message: '正在跳转...',
        forbidClick: true,
        duration: 300,
        loadingType: 'spinner',
      });

      this.onBeforeDestroy();
      setTimeout(() => {
        window.location.href = link;
      }, 300);
    },
  },

};
</script>

<style lang="scss" scoped src="./index.scss"></style>
