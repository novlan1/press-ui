<template>
  <div class="home-container">
    <scroll-view
      scroll-y
      class="scroll-view"
      :scroll-top="scrollTop"
      @scroll="onScroll"
    >
      <div class="home-header">
        <img
          class="home-header__bg"
          src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/uniui-header-bg.png"
          mode="widthFix"
        >
        <img
          class="home-header__logo"
          src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/press-ui-full-logo.png"
          mode="aspectFit"
          @longpress.stop="onMorsePwdLongPress"
          @click.stop="onMorsePwdClick"
        >
        <div class="home-header__content">
          <div class="home-header__content-title">
            {{ t('name') }}
          </div>
          <div class="home-header__content-info">
            <span class="home-header__content-subtitle">
              {{ t('detail') }}
            </span>
          </div>
        </div>
      </div>

      <div
        class="home-content"
      >
        <press-card
          padding="0"
        >
          <div
            v-for="(item, index) of pages"
            :key="getUniqueKey('section', index)"
          >
            <uni-section
              :title="getComponentTypeTitle(item)"
              color="#007aff"
              type="line"
              header-style="font-weight: 500;margin-bottom: 6px;"
            />
            <uni-list
              :key="`list-${index}`"
              :border="false"
            >
              <uni-list-item
                v-for="(nav, idx) in item.list"
                :key="getUniqueKey('nav', idx)"
                custom-class="list-item"
                :border="false"
                show-arrow
                :title="getNavName(nav)"
                link
                :to="`/pages${nav.url}`"
              />
            </uni-list>
          </div>
          <div
            v-if="showMoreList"
            :key="getUniqueKey('section', 111111)"
          >
            <uni-section
              key="other-ability-section"
              :title="t('otherAbility')"
              color="#007aff"
              type="line"
              header-style="font-weight: 500;margin-bottom: 6px;"
            />

            <uni-list
              key="other-ability-list"
              :border="false"
            >
              <uni-list-item
                custom-class="list-item"
                :border="false"
                show-arrow
                clickable
                :title="t('toggleLanguage')"
                @click="onToggleLanguage"
              />
              <!-- #ifdef H5 -->
              <uni-list-item
                custom-class="list-item"
                :border="false"
                show-arrow
                clickable
                :title="t('toggleVConsole')"
                @click="onOpenVConsole"
              />
              <!-- #endif -->
              <!-- #ifdef H5 -->
              <uni-list-item
                v-if="showLaunchApp"
                custom-class="list-item"
                :border="false"
                show-arrow
                clickable
                :title="t('launchApp')"
                @click="onJumpToLaunchApp"
              />
              <!-- #endif -->
              <uni-list-item
                custom-class="list-item"
                :border="false"
                show-arrow
                clickable
                :title="t('share')"
                @click="onJumpToSharePage"
              />
            </uni-list>
          </div>
        </press-card>
      </div>
    </scroll-view>
  </div>
</template>
<script>

import PressCard from 'src/packages/press-card/press-card.vue';
import UniList from 'src/pages/components/uni-list/components/uni-list/uni-list.vue';
import UniListItem from 'src/pages/components/uni-list/components/uni-list-item/uni-list-item.vue';
import UniSection from 'src/pages/components/uni-section/components/uni-section/uni-section.vue';

import { LAUNCH_APP_STORAGE } from '../launch-app/config';
import { isInIFrame } from '../../utils/index';
import { toggleVConsole } from '../../utils/v-console/v-console';
import { morsePwdMixin } from '../../utils/morse-password/morse-password-mixin';
import { toggleI18n } from '../../utils/i18n/toggle-i18n';
import { isNotInUni } from '../../packages/common/utils/utils';

const pagesConfig = require('./page-config.json');
const SCROLL_TOP_KEY = 'INDEX_SCROLL_TOP';


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
    },
    'en-US': {
      share: 'Share',
      name: 'Fully Compatible',
      detail: 'Press UI is an easy-to-use, uni-app-based component library',
      otherAbility: 'Other Ability',
      toggleLanguage: 'Toggle Language',
      toggleVConsole: 'Toggle VConsole',
      launchApp: 'Launch App',
    },
  },
  components: {
    PressCard,
    UniList,
    UniListItem,
    UniSection,
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
    let pages = pagesConfig.pages.filter(item => item.list && item.list.length);

    // #ifndef H5
    pages = pages.map(item => ({
      ...item,
      list: item.list.filter(item => !item.url.startsWith('/press/hor-match-')),
    }));
    // #endif


    let showLaunchApp = false;
    // #ifdef H5
    showLaunchApp = sessionStorage.getItem(LAUNCH_APP_STORAGE.kEY) === LAUNCH_APP_STORAGE.VALUE;
    // #endif

    return {
      scrollTop: 0,
      pages,
      showMoreList: false,
      showLaunchApp,
    };
  },
  mounted() {
    // #ifdef H5
    this.scrollTop = +localStorage.getItem(SCROLL_TOP_KEY) || 0;
    this.showMoreList = true;
    // #endif

    // #ifndef H5
    setTimeout(() => {
      this.showMoreList = true;
    }, 2000);
    // #endif
  },
  beforeDestroy() {
    // #ifdef H5
    localStorage.setItem(SCROLL_TOP_KEY, this.scrollTop);
    // #endif
  },
  methods: {
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
      toggleI18n(this.onGTip);
    },
    getUniqueKey(a, b) {
      return `${a}-${b}`;
    },
    onOpenVConsole() {
      toggleVConsole();
    },
    onJumpToLaunchApp() {
      // #ifdef H5
      if (isNotInUni()) {
        this.$router.push('/pages/press/launch-app/launch-app');
        return;
      }
      // #endif
      uni.navigateTo({
        url: '/pages/launch-app/launch-app',
      });
    },
    onShowLaunchApp() {
      this.showLaunchApp = true;
      sessionStorage.setItem(LAUNCH_APP_STORAGE.kEY, LAUNCH_APP_STORAGE.VALUE);
      this.onGTip('展示成功');
    },
    onJumpToSharePage() {
      // #ifdef H5
      if (isNotInUni()) {
        this.$router.push('/pages/press/share/share');
        return;
      }
      // #endif

      uni.navigateTo({
        url: '/pages/share/share',
      });
    },
  },

};
</script>

<style lang="scss">
.home-container {
  position: relative;
  background-color: #fff;
  height: 100%;
  overflow: auto;

  .scroll-view,
  scroll-view {
    height: 100%;
    overflow: auto;
  }
}

.home-header {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  /* #ifndef APP-NVUE */
  box-sizing: border-box;

  /* #endif */
  &__bg {
    display: flex;
    margin-top: 20px;
    /* #ifdef APP-NVUE */
    flex: 1;
    /* #endif */
    /* #ifndef APP-NVUE */
    width: 100%;
    /* #endif */
  }

  &__logo {
    position: absolute;
    top: 22px;
    left: 20px;
    width: 112px;
    height: 22px;
    z-index: 1;
  }

  &__content {
    position: absolute;
    top: 58px;
    left: 48px;
    width: 200px;
    z-index: 1;

    &-title {
      font-size: 16px;
      font-weight: 600;
      color: #1f1f1f;
    }

    &-info {
      /* #ifdef H5 */
      font-size: 16px;
      /* #endif */
    }

    &-subtitle {
      margin-top: 8px;
      font-size: 12px;
      font-weight: 400;
      color: #666;
    }
  }
}

.home-content {
  margin-top: 170px;
  overflow: hidden;

  .list-item {
    background: #f7f8fa;
    border-radius: 99px;
    margin: 0 0 12px;
    padding-left: 20px;
  }
}
</style>
