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
          :src="logoPic"
          mode="aspectFit"
        >
        <div class="index-page__header-content">
          <div class="index-page__header-title">
            {{ slogan }}
          </div>
          <div class="index-page__header-info">
            <span class="index-page__header-subtitle">
              {{ sloganDetail }}
            </span>
          </div>
        </div>
      </div>

      <div
        class="index-page__main"
      >
        <div class="index-page__card">
          <press-collapse
            :value="activeNames"
            default-expand-all
            @change="onChange"
          >
            <press-collapse-item
              v-for="(item, index) of showPages"
              :key="item.key"
              :name="`${index}`"
              :is-link="false"
            >
              <template #title>
                <press-section
                  :title="item.title"
                  :color="sectionStyle.color"
                  type="line"
                  :clickable="true"
                  :header-style="sectionStyle.header"
                  :active="activeNames.indexOf(`${index}`) > -1"
                />
              </template>

              <PressCell
                v-for="(nav, idx) in item.list"
                :key="getUniqueKey('nav', idx)"
                is-link
                :title="nav.title"
                custom-class="component-cell"
                @click="() => clickComponent(nav, item)"
              />
            </press-collapse-item>
          </press-collapse>
        </div>
      </div>
    </scroll-view>
  </div>
</template>
<script>
import { toggleVConsole } from 't-comm/es/v-console/toggle';

import PressSection from '../press-section/press-section.vue';
import PressCell from '../press-cell/press-cell.vue';
import PressCollapse from '../press-collapse/press-collapse.vue';
import PressCollapseItem from '../press-collapse-item/press-collapse-item.vue';

import { setClipboardData } from '../common/clipboard/clipboard';
import { routerPush } from '../common/utils/router';

import { toggleI18n } from '../locale/demo-toggle';


import {
  SCROLL_TOP_KEY,
  MAP_PAGE_URL,
} from './config';


const detail = 'Press UI 是一套易用的、灵活的、基于 uni-app 的组件库';


export default {
  name: 'PressDemoIndex',
  options: {
    styleIsolation: 'shared',
  },
  components: {
    PressSection,
    PressCell,
    PressCollapse,
    PressCollapseItem,
  },
  mixins: [
  ],
  props: {
    logoPic: {
      type: String,
      default: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/press-ui-full-logo.png',
    },
    slogan: {
      type: String,
      default: '全端兼容 高性能',
    },
    sloganDetail: {
      type: String,
      default: detail,
    },
    showPages: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      scrollTop: 0,
      sectionStyle: {
        header: 'font-weight: 500;margin-bottom: 0px;',
        color: '#007aff',
      },
      activeNames: Array.from({ length: 20 }).map((_, i) => `${i}`),
    };
  },
  computed: {
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
    /**
     * 对外暴露
     */
    onToggleLanguage() {
      console.log('[onToggleLanguage]');
      toggleI18n(this.onGTip);
    },
    getUniqueKey(a, b) {
      return `${a}-${b}`;
    },
    /**
     * 对外暴露
     */
    onOpenVConsole() {
      toggleVConsole();
    },
    /**
     * 对外暴露
     */
    onJumpToSharePage() {
      routerPush.call(
        this,
        '/pages/share/share',
        '/pages/press/share/share',
      );
    },
    onChange(e) {
      this.activeNames = e;
    },
    clickComponent(nav, item) {
      console.log('item', item);
      if (typeof nav.event === 'string') {
        this[nav.event](nav, item);
        return;
      }

      routerPush.call(
        this,
        `/pages${nav.url}`,
      );
    },
    /**
     * 对外暴露
     */
    onJumpToOtherDemo(item) {
      const { link, mpWeixin, mpQQ } = item;
      if (!link) return;

      // #ifdef H5
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
      // #endif

      // #ifndef H5
      // #ifdef MP-WEIXIN
      if (mpWeixin && mpWeixin.appId) {
        uni.navigateToMiniProgram({
          appId: mpWeixin.appId,
          path: mpWeixin.path || undefined,
          envVersion: 'release',
        });
        return;
      }
      // #endif

      // #ifdef MP-QQ
      if (mpQQ && mpQQ.appId) {
        uni.navigateToMiniProgram({
          appId: mpQQ.appId,
          path: mpQQ.path || undefined,
          envVersion: 'release',
        });
        return;
      }
      // #endif

      setClipboardData(link).then(() => {
        this.onGTip('🎉 复制成功，请到浏览器中查看');
      });
      // #endif
    },
    /**
     * 对外暴露
     */
    onJumpToMap() {
      routerPush.call(this, MAP_PAGE_URL);
    },
    /**
     * 对外暴露
     */
    onJumpToLaunchApp() {
      routerPush.call(
        this,
        '/pages/launch-app/launch-app',
        '/pages/press/launch-app/launch-app',
      );
    },
  },

};
</script>

<style lang="scss" scoped src="./css/index.scss"></style>
