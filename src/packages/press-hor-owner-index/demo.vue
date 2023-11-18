<template>
  <div class="demo-wrap">
    <PressHorOwnerIndex
      title="Press UI"
      :is-owner="isOwner"
      :owner-info="ownerInfo"
      :recommend-map="recommendMap"
      :my-match-map="myMatchMap"
      :rank-map="rankMap"
      :my-rank-info="myRankInfo"
      finished-text="没有更多了"
      @back="back"
      @clickOwnerRegister="clickOwnerRegister"
      @clickMyOwnerInfo="clickMyOwnerInfo"
      @clickMatch="clickMatch"
      @clickMatchButton="clickMatchButton"
      @clickRankItem="clickRankItem"
      @focus="focus"
      @update:loading="updateLoading"
      @loadMore="loadMore"
      @clickSidebar="clickSidebar"
      @changeTab="changeTab"
    />
  </div>
</template>
<script>
import PressHorOwnerIndex from 'src/packages/press-hor-owner-index/press-hor-owner-index.vue';
import {
  MY_MATCH_MAP,
  RECOMMEND_LIST,
  getRankList,
  MOCK_OWNER_INFO,
} from 'src/packages/press-hor-owner-index/demo-helper/data';
import { routerBack } from 'src/utils/index';


export default {
  components: {
    PressHorOwnerIndex,
  },
  data() {
    return {
      recommendMap: {
        list: RECOMMEND_LIST,
        finished: false,
        loading: false,
        total: 999,
      },
      myMatchMap: {
        ...Object.keys(MY_MATCH_MAP).reduce((acc, item, key) => {
          acc[key] = {
            list: MY_MATCH_MAP[item],
            endList: [],
            finished: false,
            loading: false,
            showDivider: true,
          };
          return acc;
        }, {}),
      },
      rankMap: {
        list: getRankList(5),
        finished: false,
        loading: false,
      },
      myRankInfo: getRankList(-1)[0],
      ownerInfo: MOCK_OWNER_INFO,
      isOwner: true,
    };
  },
  mounted() {
  },
  methods: {
    loadMoreMyMatch(tabIndex) {
      const matchInfo = this.myMatchMap[tabIndex];
      const listFinished = matchInfo.list.length >= 20;
      const listKey = listFinished ? 'endList' : 'list';

      setTimeout(() => {
        matchInfo[listKey] = matchInfo[listKey].concat(MY_MATCH_MAP[0]);
        matchInfo.loading = false;
        matchInfo.finished =  matchInfo.endList.length >= 20;
      }, 2000 - matchInfo[listKey].length * 100);
    },
    loadMoreRecommend() {
      const { recommendMap } = this;
      setTimeout(() => {
        recommendMap.list = recommendMap.list.concat(RECOMMEND_LIST);
        recommendMap.loading = false;
        recommendMap.finished =  recommendMap.list.length >= 30;
      }, 1000);
    },
    loadMoreRank() {
      const { rankMap } = this;
      setTimeout(() => {
        rankMap.list = rankMap.list.concat(getRankList(-1));
        rankMap.loading = false;
        rankMap.finished =  rankMap.list.length >= 30;
      }, 1000);
    },
    loadMore(sidebarIndex, tabIndex) {
      console.log('[loadMore]', sidebarIndex, tabIndex);
      if (sidebarIndex === 0) {
        this.loadMoreRecommend();
      }
      if (sidebarIndex === 1) {
        this.loadMoreMyMatch(tabIndex);
      }
      if (sidebarIndex === 2) {
        this.loadMoreRank();
      }
    },
    updateLoading(key, value) {
      this[key].loading = value;
    },
    back() {
      routerBack.call(this);
    },
    focus(item) {
      item.isFocused = !item.isFocused;
    },
    clickMatchButton(...args) {
      this.onGTip('[clickMatchButton]');
      console.log('[clickMatchButton]', args);
    },
    clickMatch(...args) {
      this.onGTip('[clickMatch]');
      console.log('[clickMatch]', args);
      if (args[2] === 0) {
        this.recommendMap.list = [];
      } else if (args[2] === 1) {
        this.myMatchMap[args[3]].list = [];
      }
    },
    clickRankItem(...args) {
      this.onGTip('[clickRankItem]');
      console.log('[clickRankItem]', args);
      this.rankMap.list = [];
    },
    clickOwnerRegister() {
      this.onGTip('[clickOwnerRegister]');
      this.isOwner = !this.isOwner;
    },
    clickMyOwnerInfo() {
      this.onGTip('[clickMyOwnerInfo]');
      this.isOwner = !this.isOwner;
    },
    clickSidebar(...args) {
      this.onGTip('[clickSidebar]');
      console.log('[clickSidebar]', args);
    },
    changeTab(...args) {
      this.onGTip('[changeTab]');
      console.log('[changeTab]', args);
    },
  },
};
</script>
<style scoped lang="scss">
.demo-wrap {
  ::v-deep {
    .press-owner {
      background: url(https://image-1251917893.file.myqcloud.com/Esports/hor/bg.png)
        no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
