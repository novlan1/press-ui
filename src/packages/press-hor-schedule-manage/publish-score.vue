<template>
  <div :class="[getActClass('left')]">
    <div :class="[getActClass('header')]">
      <div :class="[getActClass('head-helmet')]" />
      <div :class="[getActClass('head-title')]">
        和平大众赛
      </div>
      <!-- <div :class="[getActClass('des-text')]">
        确认资格后，选手才可参赛
      </div> -->
    </div>
    <div :class="[getActClass('main')]">
      <div :class="[getActClass('tab-warp')]">
        <press-tabs
          animated
          :class="[getActClass('match-tabs')]"
          :active="curScoreRoundId"
          @change="changeTab"
        >
          <press-tab
            v-for="(tab, index) in roundList"
            :key="index"
            :name="tab.value"
            :title="tab.label"
          />
        </press-tabs>
        <div
          :class="[getActClass('select-box')]"
          @click.stop="onShowSelectGroup"
        >
          <!-- 15支队伍 -->
          {{ curGroupDesc }}
          <div :class="[getActClass('icon-guide'), 'icon-guide', 'iconfont']" />
          <div
            v-if="showPopOver"
            :class="[getActClass('select')]"
          >
            <div
              v-for="(item, index) in curGroupList"
              :key="index"
              :class="[getActClass('option')]"
              @click.stop="selectGroupInScore(item)"
            >
              <!-- {{ item }}支队伍 -->
              {{ item.label }}
            </div>
          </div>
        </div>
      </div>

      <div :class="[getActClass('table-head')]">
        <div :class="[getActClass('table-rank')]">
          排名
        </div>
        <div :class="[getActClass('table-name')]">
          战队名称
        </div>
        <div :class="[getActClass('table-history')]">
          历史场次积分
        </div>
        <div :class="[getActClass('table-score')]">
          总积分
        </div>
        <div
          v-if="showOB"
          :class="[getActClass('table-operate')]"
        >
          操作
        </div>
      </div>
      <div :class="[getActClass('table-main')]">
        <!-- 历史战绩展开时team-list-item 添加team-list-item-active -->
        <div
          v-for="(item, index) in curTeamScoreList"
          :key="index"
          :class="[getActClass('table-item')]"
          @click.stop="onShowScoreDetail(item, index)"
        >
          <div :class="[getActClass('table-detail')]">
            <div :class="[getActClass('table-rank')]">
              <span
                class="rank"
                :class="[
                  item.rank == 1 ? 'rank1' : '',
                  item.rank == 2 ? 'rank2' : '',
                  item.rank == 3 ? 'rank3' : '',
                ]"
              >
                {{ item.rank }}
              </span>
            </div>
            <div :class="[getActClass('table-name')]">
              <img
                v-if="item.teamAvatar"
                :src="item.teamAvatar"
              >
              <div :class="[getActClass('table-team-name')]">
                {{ item.teamName }}
              </div>
            </div>
            <div :class="[getActClass('table-history')]">
              {{ item.scoreStr }}
            </div>
            <div :class="[getActClass('table-score')]">
              {{ item.totalScore }}
            </div>
            <div
              v-if="showOB"
              :class="[getActClass('table-operate')]"
            >
              观战
              <div :class="[getActClass('ob-eye')]" />
            </div>
          </div>

          <div
            v-if="showDetailMap[index]"
            :class="[getActClass('history-detail')]"
          >
            <div :class="[getActClass('history-detail-head')]">
              <div class="text">
                历史场次
              </div>
              <div class="text">
                排名
              </div>
              <div class="text">
                积分
              </div>
            </div>
            <div
              v-for="(score, scoreIndex) in item.historyScoreList"
              :key="scoreIndex"
              :class="[getActClass('history-detail-list')]"
            >
              <div class="text">
                <!-- 第{{ item }}场 -->
                {{ score.roundStr }}
              </div>
              <div class="num">
                {{ score.rank }}
              </div>
              <div class="num">
                {{ score.score }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="[getActClass('footer')]">
      <div :class="[getActClass('btn-group')]">
        <div
          :class="[getActClass('primary-btn', {
            'disabled-btn': disabledButton
          })]"
          @click.stop="publishScore"
        >
          公布成绩
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NUMBER_CHI_MAP } from 't-comm/lib/base/number/number';
import PressTab from '../press-tab/press-tab';
import PressTabs from '../press-tabs/press-tabs';
import { getActClass } from './utils';


export default {
  name: 'PressPublishScore',
  components: {
    PressTab,
    PressTabs,
  },
  props: {
    curScoreRoundId: {
      type: Number,
      default: 1,
    },
    roundTotal: {
      type: Number,
      default: 1,
    },
    groupMap: {
      type: Object,
      default: () => ({}),
    },
    teamScoreMap: {
      type: Object,
      default: () => ({}),
    },
    showOB: {
      type: Boolean,
      default: false,
    },
    disabledButton: {
      type: Boolean,
      default: false,
    },
    // groupListInScore: {
    //   type: Array,
    //   default: () => ([]),
    // },
  },
  data() {
    return {
      curGroupSeq: 1,
      showPopOver: false,
      showDetailMap: {},
    };
  },
  computed: {
    curTeamScoreList() {
      const res = this.teamScoreMap?.[`${this.curScoreRoundId}-${this.curGroupSeq}`]?.list || [];
      return res;
    },
    curGroupList() {
      const { groupMap, curScoreRoundId } = this;
      const list = groupMap[curScoreRoundId]?.list || [];
      return list.map((_, index) => ({
        label: `第${NUMBER_CHI_MAP[index + 1]}组`,
        value: index + 1,
      }));
    },
    curGroupDesc() {
      return `第${NUMBER_CHI_MAP[this.curGroupSeq]}组`;
    },
    roundList() {
      return Array.from({ length: this.roundTotal }).map((item, index) => ({
        ...item,
        label: `第${NUMBER_CHI_MAP[index + 1]}局`,
        value: index + 1,
      }));
    },
  },
  created() {

  },
  mounted() {

  },
  methods: {
    getActClass,
    changeTab(tab) {
      this.$emit('changeScoreRoundId', tab.name);
    },
    onShowSelectGroup() {
      this.showPopOver = !this.showPopOver;
    },
    selectGroupInScore(item) {
      this.$emit('selectGroupInScore', item.value);
      this.showPopOver = false;
      this.curGroupSeq = item.value;
    },
    onShowScoreDetail(item, index) {
      this.$set(this.showDetailMap, index, !this.showDetailMap[index]);
    },
    publishScore() {
      if (this.disabledButton) return;

      this.$emit('publishScore');
    },
  },
};
</script>

<style lang="scss" src="./css/publish-score.scss" scoped></style>
