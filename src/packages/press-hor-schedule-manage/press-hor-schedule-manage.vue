<template>
  <div class="press-schedule gp-commonbg">
    <RightBar
      :tab-index="tabIndex"
      :orig-bar-list="barList"
      @changeTab="changeTab"
      @close="close"
    />
    <!-- 确认资格 -->
    <ConfirmMember
      v-if="tabIndex == 0"
      :team-map="teamMap"
      :search-team-map="searchTeamMap"
      :team-total="teamTotal"
      :checked-team-total="checkedTeamTotal"
      :is-search="isSearch"
      :is-all-confirmed="isAllConfirmed"
      :disabled-button="curGoingTab > tabIndex"
      @search="onSearch"
      @checkTeam="checkTeam"
      @onClickSearch="onClickSearch"
      @onCancelSearch="isSearch = false"
      @toggleAllQualification="toggleAllQualification"
      @doneConfirmSignUp="doneConfirmSignUp"
      @loadMore="loadMore"
      @update:loading="updateLoading"
    />
    <!-- 队伍分组 -->
    <TeamGrouping
      v-if="tabIndex == 1"
      :num-per-group="numPerGroup"
      :to-select-num-list="toSelectNumList"
      :group-num="groupNum"
      :group-list-map="groupListMap"
      :disabled-button="curGoingTab > tabIndex"
      @selectNumPerGroup="selectNumPerGroup"
      @confirmAdjustGroup="confirmAdjustGroup"
      @loadMore="loadMore"
      @update:loading="updateLoading"
    />
    <!-- 确认开赛 -->
    <ConfirmStart
      v-if="tabIndex == 2"
      :round-total="roundTotal"
      :group-map="groupMap"
      :search-team-map-in-group="searchTeamMapInGroup"
      :cur-start-round-id="curStartRoundId"
      :search-team-list-in-group="searchTeamListInGroup"
      :disabled-button="curGoingTab > tabIndex"
      :round-list="roundList"
      @changeStartRoundId="changeStartRoundId"
      @startGame="startGame"
      @startAllGame="startAllGame"
      @search="searchTeamGroup"
      @loadMore="loadMore"
      @update:loading="updateLoading"
    />
    <!-- 公布成绩 -->
    <ShowScore
      v-if="tabIndex == 3"
      :round-total="roundTotal"
      :cur-score-round-id="curScoreRoundId"
      :group-map="groupMap"
      :team-score-map="teamScoreMap"
      :disabled-button="publishedScore"
      @selectGroupInScore="selectGroupInScore"
      @publishScore="publishScore"
      @changeScoreRoundId="changeScoreRoundId"
    />
  </div>
</template>

<script>
import RightBar from './right-bar';
import ConfirmStart from './confirm-start';
import ConfirmMember from './confirm-member';
import ShowScore from './publish-score';
import TeamGrouping from './team-grouping';


export default {
  name: 'PressHorScheduleManage',
  options: {
    styleIsolation: 'shared',
  },
  components: {
    RightBar,
    ConfirmStart,
    ConfirmMember,
    ShowScore,
    TeamGrouping,
  },
  props: {
    tabIndex: {
      type: Number,
      default: 0,
    },
    curGoingTab: {
      type: Number,
      default: 0,
    },
    teamMap: {
      type: Object,
      default: () => ({}),
    },
    searchTeamMap: {
      type: Object,
      default: () => ({}),
    },
    isAllConfirmed: {
      type: Boolean,
      default: false,
    },
    teamTotal: {
      type: Number,
      default: 0,
    },
    checkedTeamTotal: {
      type: Number,
      default: 0,
    },
    numPerGroup: {
      type: Number,
      default: 1,
    },
    toSelectNumList: {
      type: Array,
      default: () => [1],
    },
    groupNum: {
      type: Number,
      default: 0,
    },
    groupListMap: {
      type: Object,
      default: () => ({}),
    },
    // groupList: {
    //   type: Array,
    //   default: () => ([]),
    // },
    roundTotal: {
      type: Number,
      default: 1,
    },
    groupMap: {
      type: Object,
      default: () => ({}),
    },
    searchTeamMapInGroup: {
      type: Object,
      default: () => ({}),
    },
    curStartRoundId: {
      type: Number,
      default: 1,
    },
    curScoreRoundId: {
      type: Number,
      default: 1,
    },
    teamScoreMap: {
      type: Object,
      default: () => ({}),
    },
    searchTeamListInGroup: {
      type: Array,
      default: () => ([]),
    },
    roundList: {
      type: Array,
      default: () => ([]),
    },
    publishedScore: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      barList: ['确认资格', '队伍分组', '确认开赛', '公布成绩'],
      isSearch: false,
    };
  },
  created() {
  },
  mounted() {

  },
  methods: {
    close() {
      this.$emit('close');
    },
    changeTab(index) {
      this.$emit('changeTab', index);
    },
    toggleAllQualification() {
      this.$emit('toggleAllQualification');
    },
    doneConfirmSignUp() {
      this.$emit('doneConfirmSignUp');
    },
    checkTeam(team, index) {
      this.$emit('checkTeam', team, index);
    },
    selectNumPerGroup(num) {
      this.$emit('selectNumPerGroup', num);
    },
    confirmAdjustGroup() {
      this.$emit('confirmAdjustGroup');
    },
    changeStartRoundId(roundId) {
      this.$emit('changeStartRoundId', roundId);
    },
    changeScoreRoundId(roundId) {
      this.$emit('changeScoreRoundId', roundId);
    },
    startGame(item) {
      this.$emit('startGame', item);
    },
    startAllGame() {
      this.$emit('startAllGame');
    },
    publishScore() {
      this.$emit('publishScore');
    },
    onSearch(value) {
      this.$emit('search', value);
    },
    onClickSearch() {
      this.isSearch = true;
      this.$emit('clickSearch');
    },
    searchTeamGroup(value) {
      this.$emit('searchTeamGroup', value);
    },
    selectGroupInScore(value) {
      this.$emit('selectGroupInScore', value);
    },
    loadMore(key) {
      this.$emit('loadMore', key);
    },
    updateLoading(key, value) {
      this.$emit('update:loading', key, value);
    },
  },
};
</script>

<style lang="scss" src="./css/schedule-manage.scss" scoped></style>
