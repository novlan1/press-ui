<template>
  <div
    class="press-sche-match"
    :class="[`press-sche-match--tab-${currentTab}`]"
  >
    <div class="press-sche-match__tabs">
      <PressScheduleTab
        :list="tabList"
        :current="currentTab"
        @change="onChangeTab"
      />
    </div>
    <div class="press-sche-match__main">
      <press-empty
        v-if="isEmpty"
        type="e-sport"
        custom-style="height: 100%;"
        description="暂无数据"
      />
      <div
        v-else-if="listViewMode"
        class="press-sche-match__list"
      >
        <PressScheduleItem
          v-for="(match, index) of formattedMatches"
          :key="index"
          :sche-info="match"
          :is-admin="isAdmin"
          :is-preview="isPreview"
          :my-team-id="myTeamId"
          :sche-sub-status-map="scheSubStatusMap"
          :can-show-order-button="!env || !env.isQQ"
          @clickScheItem="clickScheItem"
          @clickScheItemButton="clickScheItemButton"
        />
      </div>
      <div
        v-else
        class="press-sche-match__tree"
      >
        <PressScheduleTree
          :sche-list="curScheList"
          :show-champion="false"
          :shadow="true"
          :auto-back-to-top="false"
          :is-preview="isPreview"
          :is-admin="isAdmin"
          :show-round-tab="currentTab != 2"
          :loading="loading && currentTab == 2"
          @clickRoundTab="clickRoundTab"
          @clickSche="clickSche"
          @clickVideoIcon="clickVideoIcon"
          @scrollToLower="scrollToLower"
        />
      </div>
    </div>
  </div>
</template>
<script>
import PressScheduleTree from '../press-schedule-tree/press-schedule-tree.vue';
import PressScheduleTab from '../press-schedule-tab/press-schedule-tab.vue';
import PressScheduleItem from '../press-schedule-list/press-schedule-item.vue';

import { formatMatchAllScheList } from '../press-schedule-tree/helper/match-mode';
import { formatScheTreeData } from '../press-schedule-tree/helper/sche-list';
import { formatScheItemData } from '../press-schedule-list/helper/sche-item';
import PressEmpty from '../press-empty/press-empty.vue';
import { defaultOptions } from '../common/component-handler/press-component';


export default {
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  components: {
    PressScheduleTab,
    PressScheduleTree,
    PressScheduleItem,
    PressEmpty,
  },
  props: {
    listViewMode: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isPreview: {
      type: Number,
      default: 0,
    },
    myTeamId: {
      type: String,
      default: '',
    },
    scheSubStatusMap: {
      type: Object,
      default: () => ({}),
    },
    allScheList: {
      type: [Object, Array],
      default: () => ([]),
    },
    myScheList: {
      type: Array,
      default: () => ([]),
    },
    loading: {
      type: Boolean,
      default: false,
    },
    canShowOrderButton: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentTab: 1,
      tabList: [
        {
          name: '我的赛程',
          key: 1,
        },
        {
          name: '全部赛程',
          key: 2,
        },
      ],
    };
  },
  computed: {
    formattedMatches() {
      const {
        curScheList,
        myTeamId,
        isPreview,
        isAdmin,
        scheSubStatusMap,
      } = this;

      const newList = curScheList
        .filter(item => !item[0]?.hidden)
        .reduce((acc, item) => {
          acc.push(...item);
          return acc;
        }, [])
        .map(match => formatScheItemData({
          scheInfo: match,
          isPreview,
          isAdmin,

          myTeamId,
          canShowOrderButton: this.canShowOrderButton,
          scheSubStatusMap,
        }));

      return newList;
    },
    isEmpty() {
      return !this.curScheList.length || !this.curScheList[0].length;
    },
    curScheList() {
      if (this.currentTab == 1) {
        const list = formatScheTreeData({
          scheList: this.myScheList,
          isPreview: this.isPreview,
          isAdmin: this.isAdmin,
        });
        return list;
      }

      const res = formatMatchAllScheList(this.allScheList2);
      return res;
    },
    allScheList2() {
      let list = (this.allScheList || [])?.map?.((item, index) => ({
        ...item,
        uniqueKey: `allScheList-${index}`,
      }));

      list = formatScheTreeData({
        scheList: (this.allScheList || []).map(item => item[0]),
        isPreview: this.isPreview,
        isAdmin: this.isAdmin,
      });
      return list;
    },
  },
  mounted() {
  },
  methods: {
    onChangeTab(type) {
      this.currentTab = type;
    },
    clickRoundTab(...args) {
      this.$emit('clickRoundTab', ...args);
    },
    clickSche(...args) {
      this.$emit('clickSche', ...args);
    },
    clickVideoIcon(...args) {
      this.$emit('clickVideoIcon', ...args);
    },
    clickScheItem(...args) {
      this.$emit('clickScheItem', ...args);
    },
    clickScheItemButton(...args) {
      this.$emit('clickScheItemButton', ...args);
    },
    scrollToLower() {
      this.$emit('scrollToLower');
    },
  },
};
</script>
<style lang="scss" scoped src="./css/index.scss"></style>

