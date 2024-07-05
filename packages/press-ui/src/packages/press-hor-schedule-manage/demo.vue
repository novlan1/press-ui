<template>
  <div class="demo-wrap">
    <PressHorScheduleManage
      :tab-index="curTab"
      :team-map="teamMap"
      :search-team-map="searchTeamMap"
      :group-list-map="groupListMap"
      :team-score-map="teamScoreMap"
      :num-per-group="numPerGroup"
      :to-select-num-list="toSelectNumList"
      :is-all-confirmed="isAllConfirmed"
      :group-map="groupMap"
      :round-total="roundList.length"
      :round-list="roundList"
      :cur-start-round-id="curStartRoundId"
      :cur-score-round-id="curScoreRoundId"
      :search-team-map-in-group="searchTeamMapInGroup"
      @update:loading="updateLoading"
      @close="close"
      @changeTab="changeTab"
      @search="search"
      @searchTeamGroup="searchTeamGroup"
      @selectNumPerGroup="selectNumPerGroup"
      @confirmAdjustGroup="confirmAdjustGroup"
      @toggleAllQualification="toggleAllQualification"
      @doneConfirmSignUp="doneConfirmSignUp"
      @publishScore="publishScore"
      @startGame="startGame"
      @startAllGame="startAllGame"
      @changeScoreRoundId="changeScoreRoundId"
      @changeStartRoundId="changeStartRoundId"
      @selectGroupInScore="selectGroupInScore"
      @checkTeam="checkTeam"
      @loadMore="loadMore"
    />
  </div>
</template>
<script>
import PressHorScheduleManage from 'press-ui/press-hor-schedule-manage/press-hor-schedule-manage.vue';
import { routerBack } from 'src/utils/index';
import { getDemoData, getTeamList, getGroupList, getTeamScoreList } from 'src/packages/press-hor-schedule-manage/demo-helper/data';

function resumeViewPort() {
  // #ifdef H5
  document.querySelector('meta[name=\'viewport\']').content = 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover';
  // #endif
}

function setViewport() {
  // #ifdef H5
  document.querySelector('meta[name=\'viewport\']').content = 'width=821, user-scalable=no, viewport-fit=cover';
  // #endif
}

export default {
  components: {
    PressHorScheduleManage,
  },
  data() {
    return {
      curTab: 0,
      teamMap: {
        list: [],
        finished: false,
        loading: false,
      },
      searchTeamMap: {
        list: [],
        finished: false,
        loading: false,
      },
      groupListMap: {
        list: [],
        finished: false,
        loading: false,
      },
      groupMap: {
        1: {
          list: [],
          finished: false,
          loading: false,
        },
      },
      searchTeamMapInGroup: {
        list: [],
        finished: false,
        loading: false,
      },

      isAllConfirmed: true,
      toSelectNumList: [1],

      numPerGroup: 1,
      curStartRoundId: 1,
      curScoreRoundId: 1,
      roundList: [],
      teamScoreMap: { ['1-1']: { list: getTeamScoreList() } },
    };
  },
  mounted() {
    const { teamList, groupMap, roundList, toSelectNumList, groupList } = getDemoData();

    setTimeout(() => {
      this.teamMap.list = teamList;
      this.groupMap = groupMap;
      this.roundList = roundList;
      this.toSelectNumList = toSelectNumList;
      this.groupListMap.list = groupList;
    }, 1000);

    setViewport();
  },
  beforeDestroy() {
    resumeViewPort();
  },
  methods: {
    close() {
      routerBack.call(this);
    },
    changeTab(tab) {
      console.log('changeTab', tab);
      this.curTab = tab;
    },
    search(value) {
      console.log('[search] ', value);
      this.searchTeamMap.list = this.teamMap.list.filter(item => item.teamname.indexOf(value) > -1);
    },
    searchTeamGroup(value) {
      console.log('[searchTeamGroup] ', value);
      this.searchTeamMapInGroup.list = this.teamMap.list.filter(item => item.teamname.indexOf(value) > -1);
    },
    selectNumPerGroup(num) {
      console.log('[selectNumPerGroup]', num);
      this.numPerGroup = num;
    },
    confirmAdjustGroup() {
      this.onGTip('[confirmAdjustGroup]');
    },
    toggleAllQualification() {
      this.onGTip('[toggleAllQualification]');
      this.isAllConfirmed = !this.isAllConfirmed;
    },
    doneConfirmSignUp() {
      this.onGTip('[doneConfirmSignUp]');
    },
    publishScore() {
      this.onGTip('[publishScore]');
    },
    startGame() {
      this.onGTip('[startGame]');
    },
    startAllGame() {
      this.onGTip('[startAllGame]');
    },
    changeScoreRoundId(roundId) {
      console.log('[changeScoreRoundId] roundId', roundId);
      this.onGTip(`[changeScoreRoundId] ${roundId}`);
      this.curScoreRoundId = roundId;
    },
    changeStartRoundId(roundId) {
      console.log('[changeStartRoundId] roundId', roundId);
      this.onGTip(`[changeStartRoundId] ${roundId}`);
      this.curStartRoundId = roundId;
    },
    selectGroupInScore(groupSeq) {
      console.log('[selectGroupInScore] groupSeq', groupSeq);
      this.onGTip(`[selectGroupInScore] ${groupSeq}`);
    },
    checkTeam(team) {
      this.$set(team, 'checked', !team.checked);
    },
    loadMore(key) {
      console.log('[demo loadMore]');
      const loadMoreMap = {
        teamMap: this.loadMoreTeamList,
        searchTeamMap: this.loadMoreSearchTeamList,
        groupListMap: this.loadMoreGroupListMap,
        groupMap: this.loadMoreGroupMap,
        searchTeamMapInGroup: this.loadMoreSearchTeamMapInGroup,
      };
      if (typeof loadMoreMap[key] === 'function') {
        loadMoreMap[key]();
      }
    },
    loadMoreTeamList() {
      this.loadMoreCommon(
        'teamMap',
        getTeamList(10, this.teamMap.list.length),
      );
    },
    loadMoreSearchTeamList() {
      this.loadMoreCommon(
        'searchTeamMap',
        getTeamList(10, this.searchTeamMap.list.length),
      );
    },
    loadMoreSearchTeamMapInGroup() {
      this.loadMoreCommon(
        'searchTeamMapInGroup',
        getTeamList(10, this.searchTeamMapInGroup.list.length),
      );
    },
    loadMoreCommon(key, moreList, key2) {
      let data = this[key];
      if (key2) {
        data = data[key2];
      }
      setTimeout(() => {
        data.list = data.list.concat(moreList);
        data.loading = false;
        data.finished =  data.list.length >= 50;
      }, 300);
    },
    loadMoreGroupListMap() {
      this.loadMoreCommon(
        'groupListMap',
        getGroupList(10, this.groupListMap.list.length),
      );
    },
    loadMoreGroupMap() {
      this.loadMoreCommon(
        'groupMap',
        getGroupList(10, this.groupMap[this.curStartRoundId].list.length),
        this.curStartRoundId,
      );
    },
    updateLoading(key, value) {
      if (key === 'groupMap') {
        this.groupMap[this.curStartRoundId].loading = value;
        return;
      }
      this[key].loading = value;
    },
  },
};
</script>
<style scoped lang="scss">
::v-deep .gp-commonbg {
  height: 100%;
  width: 100%;
  background: url(https://image-1251917893.file.myqcloud.com/tip-project/pubg/pubg-match/horizon/count-bg.jpg)
    no-repeat;
  background-size: cover;
}

@font-face {
  font-family: "PEACE";
  font-display: swap;
  src: url("https://image-1251917893.file.myqcloud.com/tip-project/pubg/pubg-match/font/PEACE.eot")
      format("eot"),
    url("https://image-1251917893.file.myqcloud.com/tip-project/pubg/pubg-match/font/PEACE.ttf")
      format("TTF"),
    url("https://image-1251917893.file.myqcloud.com/tip-project/pubg/pubg-match/font/PEACE.woff")
      format("woff");
  font-weight: normal;
  font-style: normal;
}
</style>
