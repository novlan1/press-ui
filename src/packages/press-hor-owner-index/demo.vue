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
      :show-new-rank="showNewRank"
      finished-text="没有更多了"
      :my-follow="myFollow"
      :friends-follow="friendsFollow"
      :cur-rank-tab="curRankTab"
      @back="back"
      @clickOwnerRegister="clickOwnerRegister"
      @clickMyOwnerInfo="clickMyOwnerInfo"
      @clickMatch="clickMatch"
      @clickMatchButton="clickMatchButton"
      @clickRankItem="clickRankItem"
      @clickRankGames="clickRankGames"
      @changeRankTab="changeRankTab"
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
      myFollow: {
        list: getRankList(5),
        finished: false,
        loading: false,
      },
      friendsFollow: {
        list: getRankList(5),
        finished: false,
        loading: false,
      },
      curRankTab: 0,
      myRankInfo: getRankList(-1)[0],
      ownerInfo: MOCK_OWNER_INFO,
      isOwner: true,
      showNewRank: true,
    };
  },
  computed: {
    curRankMap() {
      const { rankMap, myFollow, friendsFollow, curRankTab } = this;
      const keyMap = {
        0: rankMap,
        1: myFollow,
        2: friendsFollow,
      };

      const curMap = keyMap[curRankTab];
      return curMap;
    },
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
      const { curRankMap } = this;
      curRankMap.loading = true;

      setTimeout(() => {
        curRankMap.list = curRankMap.list.concat(getRankList(-1));
        curRankMap.loading = false;
        curRankMap.finished =  curRankMap.list.length >= 30;
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
    changeRankTab(item) {
      this.onGTip('[changeRankTab]');
      console.log('[changeRankTab]', item);
      this.curRankTab = item.name;
    },
    clickRankItem(...args) {
      this.onGTip('[clickRankItem]');
      console.log('[clickRankItem]', args);
      this.curRankMap.list = [];
    },
    clickRankGames(...args) {
      this.onGTip('[clickRankGames]');
      console.log('[clickRankGames]', args);
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
    // .press-owner {
    background: url(https://image-1251917893.file.myqcloud.com/Esports/hor/bg.png)
      no-repeat;
    background-size: 100% 100%;
  }
  // }
}
</style>
