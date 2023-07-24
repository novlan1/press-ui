<template>
  <div class="home-container">
    <scroll-view
      scroll-y
      :scroll-top="scrollTop"
      @scroll="onScroll"
    >
      <div class="home-header">
        <image
          class="home-header__bg"
          src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/uniui-header-bg.png"
          mode="widthFix"
        />
        <image
          class="home-header__logo"
          src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/press-ui-full-logo.png"
          mode="aspectFit"
          @longpress.stop="onMorsePwdLongPress"
          @click.stop="onMorsePwdClick"
        />
        <div class="home-header__content">
          <div class="home-header__content-title">
            {{ t('introduce.name') }}
          </div>
          <div class="home-header__content-info">
            <text class="home-header__content-subtitle">
              {{ t('introduce.detail') }}
            </text>
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
            v-if="showToggleLanguage"
            :key="getUniqueKey('section', 111111)"
          >
            <uni-section
              key="other-ability-section"
              :title="t('introduce.otherAbility')"
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
                :title="t('introduce.toggleLanguage')"
                @click="onToggleLanguage"
              />
              <!-- #ifdef H5 -->
              <uni-list-item
                custom-class="list-item"
                :border="false"
                show-arrow
                clickable
                :title="t('introduce.openVConsole')"
                @click="onOpenVConsole"
              />
              <!-- #endif -->
            </uni-list>
          </div>
        </press-card>
      </div>
    </scroll-view>
  </div>
</template>
<script>
import { morsePwdMixin } from '../../utils/morse-password/morse-password-mixin';
import { toggleI18n } from '../../utils/i18n/toggle-i18n';
import PressCard from 'src/packages/press-card/press-card.vue';
import UniList from 'src/pages/components/uni-list/components/uni-list/uni-list.vue';
import UniListItem from 'src/pages/components/uni-list/components/uni-list-item/uni-list-item.vue';
import UniSection from 'src/pages/components/uni-section/components/uni-section/uni-section.vue';

import { loadVConsole } from 't-comm/lib/v-console/v-console';

const pagesConfig = require('./page-config.json');
const SCROLL_TOP_KEY = 'INDEX_SCROLL_TOP';

export default {
  components: {
    PressCard,
    UniList,
    UniListItem,
    UniSection,
  },
  mixins: [morsePwdMixin([1, 1, 1], toggleI18n)],
  data() {
    return {
      scrollTop: 0,
      pages: pagesConfig.pages.filter(item => item.list && item.list.length),
      showToggleLanguage: false,
    };
  },
  onLoad() {
    // #ifdef MP-QQ
    qq.showShareMenu({
      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment'],
    });
    // #endif
  },
  onShow() {
    // #ifdef H5
    this.scrollTop = +uni.getStorageSync(SCROLL_TOP_KEY) || 0;
    // #endif
    setTimeout(() => {
      this.showToggleLanguage = true;
    }, 2000);
  },
  onHide() {
    uni.setStorageSync(SCROLL_TOP_KEY, this.scrollTop);
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
      toggleI18n();
    },
    getUniqueKey(a, b) {
      return `${a}-${b}`;
    },
    onOpenVConsole() {
      loadVConsole();
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
