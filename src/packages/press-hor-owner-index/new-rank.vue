<template>
  <div
    class="press-owner-rank"
    :class="{'press-owner-rank--padding-bottom': curRankTab === 0}"
  >
    <press-tabs
      ref="tabs"
      animated
      swipeable
      mode="hor"
      :active="curRankTab"
      :line-width="71"
      @change="changeRankTab"
    >
      <press-tab
        v-for="(tabItem, index) in tabList"
        :key="index"
        :title="tabItem"
      >
        <div class="press-owner-rank__main">
          <template v-if="curRankTab === 0">
            <PressList
              v-if="rankList.length > 0"
              v-model="curLoading"
              :finished="rankMap.finished"
              :immediate-check="immediateCheck"
              :finished-text="finishedText"
              :finished-style="finishedStyle"
              :loading-style="loadingStyle"
              :loading-size="loadingSize"
              @load="loadMore"
            >
              <div class="press-owner-rank__title-list">
                <div class="press-owner-rank__title-list1">
                  排名
                </div>
                <div class="press-owner-rank__title-list2">
                  昵称
                </div>
                <div class="press-owner-rank__title-list3">
                  本周参赛人数
                </div>
              </div>
              <div class="press-owner-rank__list">
                <!-- 是自己高亮 press-owner-rank__item--highlight -->
                <div
                  v-for="(item, index) in rankList"
                  :key="index"
                  :class="['press-owner-rank__item',
                           item.isMine ? 'press-owner-rank__item--highlight':''
                  ]"
                  @click.stop="clickRankItem(item, index)"
                >
                  <div
                    :class="['press-owner-rank__num',
                             `press-owner-rank__num--rank-${item.rank}`
                    ]"
                  >
                    {{ item.rank }}
                  </div>
                  <div class="press-owner-rank__info">
                    <img
                      v-lazy="item.pic"
                      class="press-owner-rank__info-img"
                      size="22"
                    >
                    <div class="press-owner-rank__info-detail">
                      <p class="press-owner-rank__info-name">
                        {{ item.name }}
                      </p>
                      <p class="press-owner-rank__info-fans">
                        粉丝：{{ item.fan }}
                      </p>
                    </div>
                    <div class="press-owner-rank__info-lv">
                      <p>Lv{{ item.lv }}</p>
                    </div>
                  </div>
                  <div
                    v-if="item.canJoinGameNum > 0"
                    class="press-owner-rank__info-join"
                    @click.stop="clickRankGames(item, index)"
                  >
                    <span class="press-owner-rank__info-game">
                      <span
                        class="press-owner-rank__info-color"
                      >{{ item.canJoinGameNum }}场</span>比赛可参加>
                    </span>
                  </div>
                  <div class="press-owner-rank__join">
                    {{ item.num }}
                  </div>
                  <!-- 已关注：press-owner-rank__focus--focused -->
                  <div
                    v-if="item.showButton"
                    :class="['press-owner-rank__focus',
                             item.isFocused ? 'press-owner-rank__focus--focused':''
                    ]"
                    @click.stop="focus(item, index)"
                  >
                    {{ item.isFocused ? '已关注':'关注' }}
                  </div>
                  <div
                    v-else
                    class="press-owner-rank__focus-placeholder"
                  />
                </div>
              </div>
            </PressList>

            <slot
              v-else
              name="empty"
            >
              <PressEmpty
                type="hor"
                :description="rankEmptyText"
              />
            </slot>
          </template>
          <template v-if="curRankTab === 1">
            <HorFollow
              :cur-rank-tab="curRankTab"
              :immediate-check="immediateCheck"
              :finished-text="finishedText"
              :finished-style="finishedStyle"
              :loading-style="loadingStyle"
              :loading-size="loadingSize"
              :hor-follow-type="curRankTab"
              :follow-map="myFollow"
              @clickRankItem="clickRankItem"
              @focus="focus"
              @loadMore="loadMore"
              @update:loading="(value) => updateLoading('myFollow', value)"
              @clickRankGames="clickRankGames"
            />
          </template>
          <template v-if="curRankTab === 2">
            <HorFollow
              :cur-rank-tab="curRankTab"
              :hor-follow-type="curRankTab"
              :immediate-check="immediateCheck"
              :finished-text="finishedText"
              :finished-style="finishedStyle"
              :loading-style="loadingStyle"
              :loading-size="loadingSize"
              :follow-map="friendsFollow"
              @clickRankItem="clickRankItem"
              @focus="focus"
              @loadMore="loadMore"
              @update:loading="(value) => updateLoading('friendsFollow', value)"
              @clickRankGames="clickRankGames"
            />
          </template>
        </div>
      </press-tab>
    </press-tabs>

    <div
      v-if="curRankTab === 0 && Object.keys(myRankInfo).length"
      class="press-owner-rank__item press-owner-rank__item--fixed"
    >
      <div class="press-owner-rank__num">
        {{ myRankInfo.myRankStr }}
      </div>
      <div class="press-owner-rank__info">
        <img
          v-lazy="myRankInfo.pic"
          class="press-owner-rank__info-img"
          size="22"
        >
        <div class="press-owner-rank__info-detail">
          <p class="press-owner-rank__info-name">
            {{ myRankInfo.name }}
          </p>
          <p class="press-owner-rank__info-fans">
            粉丝：{{ myRankInfo.fan }}
          </p>
        </div>
        <div class="press-owner-rank__info-lv">
          <p>Lv{{ myRankInfo.lv }}</p>
        </div>
      </div>
      <div class="press-owner-rank__join">
        <p>{{ myRankInfo.num }}</p>
        <p
          v-if="myRankInfo.diffNumStr"
          class="press-owner-rank_join-desc"
        >
          {{ myRankInfo.diffNumStr }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import PressList from '../press-list/press-list.vue';
import PressEmpty from '../press-empty/press-empty.vue';
import PressTab from '../press-tab/press-tab';
import PressTabs from '../press-tabs/press-tabs';
import HorFollow from './follow.vue';


export default {
  components: {
    PressList,
    PressEmpty,
    PressTab,
    PressTabs,
    HorFollow,
  },
  props: {
    rankMap: {
      type: Object,
      default: () => ({}),
    },
    myFollow: {
      type: Object,
      default: () => ({}),
    },
    friendsFollow: {
      type: Object,
      default: () => ({}),
    },
    myRankInfo: {
      type: Object,
      default: () => ({}),
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
    rankTitle: {
      type: String,
      default: '主理人周榜',
    },
    rankNumPrefix: {
      type: String,
      default: '本周参赛人数：',
    },
    rankEmptyText: {
      type: String,
      default: '暂无主理人榜单',
    },
    curRankTab: {
      type: Number,
      default: 0,
    },
  },
  emits: [
    'changeRankTab',
    'clickRankItem',
    'focus',
    'loadMore',
    'update:loading',
  ],
  data() {
    return {
      tabList: ['主理人月榜', '我关注的', '好友关注的'],
    };
  },
  computed: {
    rankList() {
      return this.rankMap.list || [];
    },
    curLoading: {
      get() {
        return this.rankMap.loading;
      },
      set(val) {
        this.$emit('update:loading', 'rankMap', val);
      },
    },
  },
  methods: {
    loadMore() {
      this.$emit('loadMore');
    },
    focus(item, index) {
      this.$emit('focus', item, index);
    },
    clickRankItem(item, index) {
      this.$emit('clickRankItem', item, index);
    },
    clickRankGames(item, index) {
      this.$emit('clickRankGames', item, index);
    },
    changeRankTab(tab) {
      this.$emit('changeRankTab', tab);
    },
    updateLoading(key, value) {
      this.$emit('update:loading', key, value);
    },
  },
};

</script>
<style lang="scss" scoped src="./css/new-rank.scss"></style>
