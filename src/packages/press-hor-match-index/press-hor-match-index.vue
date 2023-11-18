<template>
  <div class="press-index">
    <!-- header -->
    <MatchHeader @back="back">
      <template #middle>
        <div class="press-index__header__middle">
          {{ title }}
        </div>
      </template>
      <template #right>
        <div class="press-index__header__right">
          <!-- 红点--press-red-dot -->
          <div
            v-if="showFeedback"
            :class="['press-index__header__feedback',
                     showFeedBackDot ? 'press-red-dot':'']"
            @click="clickFeedback"
          />
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
      <Sidebar
        :list="sidebarList"
        :current="sidebarIndex"
        @change="sidebarSwitch"
      />

      <!-- 推荐 -->
      <div
        v-if="curSidebar.mode === 'recommend'"
        class="press-index__recommend"
      >
        <PressList
          v-model="curLoading"
          :finished="curFinished"
          :finished-text="curMatchList.length ? finishedText : ''"
          :immediate-check="immediateCheck"
          :loading-style="loadingStyle"
          :loading-size="loadingSize"
          :finished-style="finishedStyle"
          @load="onLoadMore"
        >
          <div
            class="press-index__recommend__list"
          >
            <!-- banner -->
            <Banner
              :banner-list="bannerList"
              @clickBanner="clickBanner"
            />

            <!-- 品牌赛事 -->
            <Brand
              v-if="brandList && brandList.length"
              :brand-list="brandList"
              @clickBrand="clickBrand"
            />

            <template v-if="curMatchList.length">
              <!-- 赛事 -->
              <MatchItem
                v-for="(item,index) in curMatchList"
                :key="index"
                :match-info="item"
                :popover-award-index="popoverAwardIndex"
                :popover-title="popoverTitle"
                :popover-content="popoverContent"
                :show-popover="getShowPopover('recommend', index)"
                :match-index="index"
                @onShowPopover="(award, awardIndex) => onShowPopover(award, awardIndex, index)"
                @closePopover="closePopover"
                @clickMatchButton="clickMatchButton(item, index, 'recommend')"
                @clickMatch="clickMatch(item, index, 'recommend')"
                @clickPrize="clickPrize(item, index, 'recommend')"
              />
            </template>
          </div>
        </PressList>
      </div>

      <!-- 线上赛 -->
      <div
        v-else-if="curSidebar.mode === 'online'"
        class="press-index__online"
      >
        <press-tabs
          v-if="curTabList.length"
          ref="tabs"
          :active="curTabIndex"
          animated
          swipeable
          mode="hor"
          :line-width="79"
          @change="changeTab"
        >
          <press-tab
            v-for="(tabItem, tabIndex) in curTabList"
            :key="tabIndex"
            :title="tabItem.label"
          >
            <PressList
              v-if="curMatchList.length"
              v-model="curLoading"
              :finished="curFinished"
              :finished-text="finishedText"
              :immediate-check="immediateCheck"
              :loading-style="loadingStyle"
              :loading-size="loadingSize"
              :finished-style="finishedStyle"
              @load="onLoadMore"
            >
              <div
                class="press-index__online__list"
              >
                <MatchItem
                  v-for="(onlineItem, onlineIndex) in curMatchList"
                  :key="onlineIndex"
                  :match-info="onlineItem"
                  :match-index="onlineIndex"
                  :popover-award-index="popoverAwardIndex"
                  :popover-title="popoverTitle"
                  :popover-content="popoverContent"
                  :show-popover="getShowPopover('online', onlineIndex)"
                  :popover-rotate="onlineIndex < 2"
                  @onShowPopover="(award, awardIndex) => onShowPopover(award, awardIndex, onlineIndex)"
                  @closePopover="closePopover"
                  @clickMatchButton="clickMatchButton(onlineItem, onlineIndex, 'online')"
                  @clickMatch="clickMatch(onlineItem, onlineIndex, 'online')"
                  @clickPrize="clickPrize(onlineItem, onlineIndex, 'online')"
                />
              </div>
            </PressList>

            <slot
              v-else
              name="empty"
            />
          </press-tab>
        </press-tabs>

        <slot
          v-else
          name="empty"
        />
      </div>

      <!-- 线下赛 -->
      <div
        v-else-if="curSidebar.mode === 'offline'"
        class="press-index__offline"
      >
        <PressList
          v-if="curMatchList.length"
          v-model="curLoading"
          :finished="curFinished"
          :immediate-check="immediateCheck"
          :finished-text="finishedText"
          :finished-style="finishedStyle"
          :loading-style="loadingStyle"
          :loading-size="loadingSize"
          @load="onLoadMore"
        >
          <div
            class="press-index__offline__list"
          >
            <OfflineMatchItem
              v-for="(item,index) in curMatchList"
              :key="index"
              :match-info="item"
              :popover-award-index="popoverAwardIndex"
              :popover-title="popoverTitle"
              :popover-content="popoverContent"
              :show-popover="getShowPopover('offline', index)"
              @onShowPopover="(award, awardIndex) => onShowPopover(award, awardIndex, index)"
              @closePopover="closePopover"
              @clickMatchButton="clickMatchButton(item, index, 'offline')"
              @clickMatch="clickMatch(item, index, 'offline')"
              @clickPrize="clickPrize(item, index, 'offline')"
            />
          </div>
        </PressList>

        <slot
          v-else
          name="empty"
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
import Sidebar from './side-bar.vue';
import MatchHeader from '../press-hor-match-header/press-hor-match-header.vue';
import PressTab from '../press-tab/press-tab';
import PressTabs from '../press-tabs/press-tabs';

import PressList from '../press-list/press-list.vue';

export default {
  name: 'PressHorMatchIndex',
  components: {
    Banner,
    Brand,
    MatchItem,
    Sidebar,
    OfflineMatchItem,
    MatchHeader,
    PressTab,
    PressTabs,
    PressList,
  },
  props: {
    title: {
      type: String,
      default: '商户赛',
    },
    showFeedback: {
      type: Boolean,
      default: false,
    },
    showFeedBackDot: {
      type: Boolean,
      default: false,
    },
    showMessageDot: {
      type: Boolean,
      default: false,
    },
    showPersonDot: {
      type: Boolean,
      default: false,
    },
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
    sidebarList: {
      type: Array,
      default: () => ([]),
    },
    immediateCheck: {
      type: Boolean,
      default: false,
    },
    finishedText: {
      type: String,
      default: '没有更多了',
    },
    finishedStyle: {
      type: String,
      default: '',
    },
    loadingStyle: {
      type: String,
      default: '',
    },
    loadingSize: {
      type: String,
      default: '20px',
    },
  },
  options: {
    virtualHost: true,
  },
  emits: [
    'changeTab',
    'clickMessage',
    'clickPerson',
    'clickSidebar',
    'back',
    'clickBanner',
    'clickBrand',
    'clickMatchButton',
    'clickMatch',
    'clickPrize',
    'loadMore',
  ],
  data() {
    return {
      sidebarIndex: 0,
      curTabIndexMap: { 0: 0, 1: 0, 2: 0, 3: 0 },

      popoverAwardIndex: [-1, -1, -1],
      popoverTitle: '',
      popoverContent: '',
    };
  },
  computed: {
    curSidebar() {
      return this.sidebarList[this.sidebarIndex] || {};
    },
    curTabIndex() {
      return this.curTabIndexMap[this.sidebarIndex] || 0;
    },
    curMatchInfo() {
      const { matchMap = {} } = this.curSidebar;
      return matchMap[this.curTabIndex] || {};
    },
    curMatchList() {
      return this.curMatchInfo.list || [];
    },
    curLoading: {
      get() {
        return this.curMatchInfo.loading;
      },
      set(val) {
        this.curMatchInfo.loading = val;
      },
    },
    curFinished() {
      return this.curMatchInfo.finished;
    },
    curTabList() {
      const tabs = this.curSidebar.tabs || [];
      return tabs;
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
      this.curTabIndexMap[this.sidebarIndex] = tab.index;
      this.closePopover();
      this.$emit('changeTab', tab);
    },
    clickMessage() {
      this.closePopover();
      this.$emit('clickMessage');
    },
    clickFeedback() {
      this.closePopover();
      this.$emit('clickFeedback');
    },
    clickPerson() {
      this.closePopover();
      this.$emit('clickPerson');
    },
    sidebarSwitch(item, index) {
      this.$emit('clickSidebar', item, index, this.curTabIndex);
      if (item.mode === 'link') {
        return;
      }
      this.closePopover();
      this.sidebarIndex = index;
    },
    back() {
      this.closePopover();
      this.$emit('back');
    },
    clickBanner(item, index) {
      this.closePopover();
      this.$emit('clickBanner', item, index);
    },
    clickBrand(item, index) {
      this.closePopover();
      this.$emit('clickBrand', item, index);
    },
    clickMatchButton(item, index) {
      this.closePopover();
      this.$emit('clickMatchButton', item, index);
    },
    clickMatch(item, index) {
      this.closePopover();
      this.$emit('clickMatch', item, index);
    },
    clickPrize(item, index) {
      this.$emit('clickPrize', item, index);
    },
    onLoadMore() {
      this.$emit('loadMore', this.sidebarIndex, this.curTabIndex);
    },
    onShowPopover(item, awardIndex, matchIndex) {
      this.popoverAwardIndex = [this.curSidebar.mode, matchIndex, awardIndex];
      this.popoverTitle = item.popover?.title || item.name;
      this.popoverContent = item.popover?.content || item.name;
    },
    closePopover() {
      this.popoverAwardIndex = [-1, -1, -1];
    },
    getShowPopover(mode, matchIndex) {
      const { popoverAwardIndex } = this;
      return popoverAwardIndex[0] === mode && popoverAwardIndex[1] === matchIndex;
    },
  },
};

</script>
<style lang="scss" scoped src="./css/hor-match-index.scss"></style>
