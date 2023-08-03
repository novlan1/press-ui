<template>
  <div class="press-index">
    <!-- header -->
    <MatchHeader @back="back">
      <template #middle>
        <div class="press-index__header__middle">
          商户赛
        </div>
      </template>
      <template #right>
        <div class="press-index__header__right">
          <!-- 红点--press-red-dot -->
          <div
            :class="['press-index__header__message',
                     showMessageDot ? 'press-red-dot':'']"
            @click="clickMessage"
          />
          <div
            :class="['press-index__header__home',
                     showPersonDot ? 'press-red-dot':'']"
            @click="clickPerson"
          />
        </div>
      </template>
    </MatchHeader>

    <div class="press-index__content">
      <!-- 侧边栏 -->
      <div
        :class="['press-index__sidebar',
                 sidebarIndex ? `sidebar-${sidebarIndex}`:'']"
      >
        <div
          v-for="(item,index) in sidebar"
          :key="index"
          :class="['press-index__sidebar__item',
                   sidebarIndex == index ? `sidebar-active`:'']"
          @click="sidebarSwitch(index)"
        >
          {{ item }}
        </div>
      </div>

      <!-- 推荐 -->
      <div
        v-if="sidebarIndex == 0"
        class="press-index__recommend"
      >
        <!-- banner -->
        <Banner
          :banner-list="bannerList"
          @clickBanner="clickBanner"
        />

        <!-- 品牌赛事 -->
        <Brand
          :brand-list="brandList"
          @clickBrand="clickBrand"
        />

        <!-- 赛事 -->
        <MatchItem
          v-for="(item,index) in recommendMatchList"
          :key="index"
          :match-info="item"
          @clickMatchButton="clickMatchButton(item, index, 'recommend')"
          @clickMatch="clickMatch(item, index, 'recommend')"
        />
      </div>

      <!-- 线上赛 -->
      <div
        v-if="sidebarIndex == 1"
        class="press-index__online"
      >
        <press-tabs
          ref="tabs"
          animated
          swipeable
          :line-width="79"
          @change="changeTab"
        >
          <press-tab
            v-for="(tabItem, tabIndex) in onlineTabList"
            :key="tabIndex"
            :title="tabItem.name"
          >
            <div class="press-index__online__list">
              <MatchItem
                v-for="(onlineItem,onlineIndex) in onlineMatchList"
                :key="onlineIndex"
                :match-info="onlineItem"
                @clickMatchButton="clickMatchButton(onlineItem, onlineIndex, 'online')"
                @clickMatch="clickMatch(onlineItem, onlineIndex, 'online')"
              />
            </div>
          </press-tab>
        </press-tabs>
      </div>

      <!-- 线下赛 -->
      <div
        v-if="sidebarIndex == 2"
        class="press-index__offline"
      >
        <OfflineMatchItem
          v-for="(item,index) in offlineMatchList"
          :key="index"
          :match-info="item"
          @clickMatchButton="clickMatchButton(item, index, 'offline')"
          @clickMatch="clickMatch(item, index, 'offline')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Banner from './banner';
import Brand from './brand';
import MatchItem from './match-item';
import OfflineMatchItem from './offline-match-item';
import MatchHeader from '../press-hor-match-header/press-hor-match-header.vue';
import PressTab from '../press-tab/press-tab';
import PressTabs from '../press-tabs/press-tabs';

export default {
  name: 'PressHorMatchIndex',
  components: {
    Banner,
    Brand,
    MatchItem,
    OfflineMatchItem,
    MatchHeader,
    PressTab,
    PressTabs,
  },
  props: {
    bannerList: {
      type: Array,
      default: () => [],
      required: false,
    },
    brandList: {
      type: Array,
      default: () => ([]),
      required: false,
    },
    recommendMatchList: {
      type: Array,
      default: () => ([]),
      required: false,
    },
    showMessageDot: {
      type: Boolean,
      default: true,
    },
    showPersonDot: {
      type: Boolean,
      default: true,
    },
    onlineTabList: {
      type: Array,
      default: () => ([]),
    },
    onlineMatchMap: {
      type: Object,
      default: () => ({}),
    },
    offlineMatchList: {
      type: Array,
      default: () => ([]),
      required: false,
    },
  },
  options: {
    virtualHost: true,
  },
  data() {
    return {
      sidebar: ['推荐', '线上赛', '线下赛'],
      sidebarIndex: 2,
      tabIndex: 0,
    };
  },
  computed: {
    onlineMatchList() {
      return this.onlineMatchMap[this.tabIndex] || {};
    },
  },
  watch: {
  },
  mounted() {
    this.$nextTick(() => {
      if (this.sidebarIndex == 1) {
        setTimeout(() => {
          this.$refs.tabs.resize();
        }, 100);
      }
    });
  },
  methods: {
    changeTab(tab) {
      this.tabIndex = tab.index;
      this.$emit('changeTab', tab);
    },
    clickMessage() {
      this.$emit('clickMessage');
    },
    clickPerson() {
      this.$emit('clickPerson');
    },
    sidebarSwitch(index) {
      this.sidebarIndex = index;
    },
    back() {
      this.$emit('back');
    },
    clickBanner(item, index) {
      this.$emit('clickBanner', item, index);
    },
    clickBrand(item, index) {
      this.$emit('clickBrand', item, index);
    },
    clickMatchButton(item, index) {
      this.$emit('clickMatchButton', item, index);
    },
    clickMatch(item, index) {
      this.$emit('clickMatch', item, index);
    },
  },
};

</script>
<style lang="scss" scoped src="./css/hor-match-index.scss"></style>
