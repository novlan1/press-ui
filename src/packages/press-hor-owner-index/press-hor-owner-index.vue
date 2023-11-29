<template>
  <div class="press-owner">
    <!-- header -->
    <MatchHeader
      :title="title"
      @back="back"
    >
      <template #right>
        <div class="press-owner__header-right">
          <!-- 默认不是主理人 -->
          <div
            v-if="!isOwner"
            class="press-owner__header-register"
            @click.stop="clickOwnerRegister"
          />
          <!-- 是主理人 -->
          <div
            v-else-if="Object.keys(ownerInfo).length"
            class="press-owner__header-info"
            @click.stop="clickMyOwnerInfo"
          >
            <img
              v-lazy="ownerInfo.pic"
              class="press-owner__header-img"
              size="22"
            >
            <p class="press-owner__header-name">
              {{ ownerInfo.name }}
            </p>
            <div class="press-owner__header-desc">
              <p>Lv{{ ownerInfo.lv }}</p>
            </div>
          </div>
        </div>
      </template>
    </MatchHeader>

    <div class="press-owner__main">
      <Sidebar
        :list="sidebar"
        :current="sidebarIndex"
        @change="sidebarSwitch"
      />

      <div
        v-if="sidebarIndex == 0"
        class="press-owner__recommend"
      >
        <div class="press-owner__title">
          <p>
            推荐赛事 <template v-if="recommendMap.total ">
              （{{ recommendMap.total }}）场
            </template>
          </p>
          <p>优质主理人赛事推荐</p>
        </div>
        <PressList
          v-if="recommendList.length"
          v-model="recommendLoading"
          :finished="recommendMap.finished"
          :immediate-check="immediateCheck"
          :finished-text="finishedText"
          :finished-style="finishedStyle"
          :loading-style="loadingStyle"
          :loading-size="loadingSize"
          @load="loadMore"
        >
          <!-- 赛事 -->
          <div class="press-owner__recommend-list">
            <RecommendItem
              v-for="(item,index) in recommendList"
              :key="index"
              :recommend-info="item"
              @clickMatchButton="clickMatchButton(item, index)"
              @clickMatch="clickMatch(item, index)"
            />
          </div>
        </PressList>

        <slot
          v-else
          name="empty"
        >
          <PressEmpty
            type="hor"
            description="暂无数据"
          />
        </slot>
      </div>

      <!-- 我的赛事 -->
      <div
        v-if="sidebarIndex == 1"
        class="press-owner__matches"
      >
        <press-tabs
          ref="tabs"
          animated
          swipeable
          mode="hor"
          :active="tabIndex"
          :line-width="71"
          @change="changeTab"
        >
          <press-tab
            v-for="(tabItem, index) in tabList"
            :key="index"
            :title="tabItem"
          >
            <PressList
              v-if="curMyMatchList.length || curMyEndMatchList.length"
              v-model="curMyMatchLoading"
              :finished="curMyMatch.finished"
              :immediate-check="immediateCheck"
              :finished-text="finishedText"
              :finished-style="finishedStyle"
              :loading-style="loadingStyle"
              :loading-size="loadingSize"
              @load="loadMore"
            >
              <div class="press-owner__matches-list">
                <template v-if="curMyMatchList.length">
                  <MatchItem
                    v-for="(matchItem, matchIndex) in curMyMatchList"
                    :key="matchItem.uniqueKey"
                    :left-line="matchIndex % 2 === 0"
                    :match-info="matchItem"
                    @clickMatchButton="clickMatchButton(matchItem, matchIndex)"
                    @clickMatch="clickMatch(matchItem, matchIndex)"
                  />
                </template>

                <template v-if="curMyEndMatchList.length">
                  <div
                    v-if="curMyMatch.showDivider"
                    class="press-owner__line"
                  >
                    {{ dividerText }}
                  </div>

                  <MatchItem
                    v-for="(matchItem, matchIndex) in curMyEndMatchList"
                    :key="matchIndex"
                    :left-line="matchIndex % 2 === 0"
                    :match-info="matchItem"
                    @clickMatchButton="clickMatchButton(matchItem, matchIndex)"
                    @clickMatch="clickMatch(matchItem, matchIndex)"
                  />
                </template>
              </div>
            </PressList>

            <slot
              v-else
              name="empty"
            >
              <PressEmpty
                type="hor"
                :description="tabIndex == 0 ? '暂无参加的赛事' : '暂无举办的赛事'"
              />
            </slot>
          </press-tab>
        </press-tabs>
      </div>

      <!-- 榜单 -->
      <div
        v-if="sidebarIndex == 2"
        class="press-owner__rank"
      >
        <HorRank
          v-if="!showNewRank"
          :rank-map="rankMap"
          :my-rank-info="myRankInfo"
          :rank-title="rankTitle"
          :rank-num-prefix="rankNumPrefix"
          :rank-empty-text="rankEmptyText"
          @loadMore="loadMore"
          @update:loading="updateLoading"
          @focus="focus"
          @clickRankItem="clickRankItem"
        />
        <HorNewRank
          v-if="showNewRank"
          :rank-map="rankMap"
          :my-rank-info="myRankInfo"
          :rank-title="rankTitle"
          :rank-num-prefix="rankNumPrefix"
          :rank-empty-text="rankEmptyText"
          :my-follow="myFollow"
          :friends-follow="friendsFollow"
          :cur-rank-tab="curRankTab"
          @loadMore="loadMore"
          @update:loading="updateLoading"
          @focus="focus"
          @clickRankItem="clickRankItem"
          @changeRankTab="changeRankTab"
          @clickRankGames="clickRankGames"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RecommendItem from './recommend';
import MatchItem from './match';
import HorRank from './rank';
import HorNewRank from './new-rank';

import MatchHeader from '../press-hor-match-header/press-hor-match-header.vue';

import PressEmpty from '../press-empty/press-empty.vue';
import Sidebar from '../press-hor-match-index/side-bar.vue';
import PressTab from '../press-tab/press-tab';
import PressTabs from '../press-tabs/press-tabs';
import PressList from '../press-list/press-list.vue';


export default {
  name: 'PressHorOwnerIndex',
  options: {
    virtualHost: true,
  },
  components: {
    RecommendItem,
    MatchItem,
    HorRank,
    Sidebar,
    MatchHeader,
    PressTab,
    PressTabs,
    PressEmpty,
    PressList,
    HorNewRank,
  },
  props: {
    showNewRank: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    recommendMap: {
      type: Object,
      default: () => ({}),
    },
    myMatchMap: {
      type: Object,
      default: () => ({}),
    },
    rankMap: {
      type: Object,
      default: () => ({}),
    },
    curRankTab: {
      type: Number,
      default: 0,
    },
    myFollow: {
      type: Object,
      default: () => ({}),
    },
    friendsFollow: {
      type: Object,
      default: () => ({}),
    },
    isOwner: {
      type: Boolean,
      default: false,
    },
    ownerInfo: {
      type: Object,
      default: () => ({}),
    },
    myRankInfo: {
      type: Object,
      default: () => ({}),
    },
    rankTitle: {
      type: String,
      default: '主理人周榜',
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
    dividerText: {
      type: String,
      default: '以下为历史赛事',
    },
    rankNumPrefix: {
      type: String,
      default: '本周参赛人数：',
    },
    rankEmptyText: {
      type: String,
      default: '暂无主理人榜单',
    },
  },
  emits: [
    'update:loading',
    'changeTab',
    'back',
    'clickSidebar',
    'loadMore',
    'focus',
    'clickMatchButton',
    'clickMatch',
    'clickRankItem',
    'clickOwnerRegister',
    'clickMyOwnerInfo',
  ],
  data() {
    return {
      sidebar: [
        {
          label: '赛事推荐',
          value: '',
        }, {
          label: '我的赛事',
          value: '',
        }, {
          label: '榜单',
          value: '',
        },
      ],
      sidebarIndex: 0,
      tabList: ['参赛', '办赛'],
      tabIndex: 0,
    };
  },
  computed: {
    curMyMatch() {
      const { tabIndex, myMatchMap } = this;
      return myMatchMap[tabIndex] || {};
    },
    curMyMatchList() {
      const list = this.curMyMatch.list || [];
      return list.map((item, index) => ({
        uniqueKey: `playing-match-${index}`,
        ...item,
      }));
    },
    curMyEndMatchList() {
      const list = this.curMyMatch.endList || [];
      return list.map((item, index) => ({
        uniqueKey: `end-match-${index}`,
        ...item,
      }));
    },
    curMyMatchLoading: {
      get() {
        return this.curMyMatch.loading;
      },
      set(val) {
        this.curMyMatch.loading = val;
      },
    },
    recommendLoading: {
      get() {
        return this.recommendMap.loading;
      },
      set(val) {
        this.$emit('update:loading', 'recommendMap', val);
      },
    },
    recommendList() {
      return this.recommendMap.list || [];
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
    back() {
      this.$emit('back');
    },
    sidebarSwitch(item, index) {
      this.sidebarIndex = index;
      this.$emit('clickSidebar', item, index, this.tabIndex);
    },
    loadMore() {
      this.$emit('loadMore', this.sidebarIndex, this.tabIndex);
    },
    updateLoading(key = 'rankMap', value) {
      this.$emit('update:loading', key, value);
    },
    focus(item, index) {
      this.$emit('focus', item, index);
    },
    clickMatchButton(matchInfo, matchIndex) {
      this.$emit('clickMatchButton', matchInfo, matchIndex, this.sidebarIndex, this.tabIndex);
    },
    clickMatch(matchInfo, matchIndex) {
      this.$emit('clickMatch', matchInfo, matchIndex, this.sidebarIndex, this.tabIndex);
    },
    changeRankTab(item) {
      this.$emit('changeRankTab', item);
    },
    clickRankItem(item, index) {
      this.$emit('clickRankItem', item, index);
    },
    clickRankGames(item, index) {
      this.$emit('clickRankGames', item, index);
    },
    clickOwnerRegister() {
      this.$emit('clickOwnerRegister');
    },
    clickMyOwnerInfo() {
      this.$emit('clickMyOwnerInfo');
    },
  },
};

</script>
<style lang="scss" scoped src="./css/hor-owner-index.scss"></style>
