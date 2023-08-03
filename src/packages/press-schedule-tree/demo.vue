<template>
  <div class="demo-wrap demo-wrap--gray demo-wrap--flex">
    <demo-block
      :title="t('basicUsage')"
      :section-style="sectionStyle"
      :header-style="headerStyle"
    >
      <press-cell
        :title="t('custom')"
        is-link
        @click="onShowBasicPopupCell"
      />
    </demo-block>
    <ScheduleTree
      v-if="scheList.length"
      ref="pressScheduleTreeRef"
      :sche-list="scheList"
      :is-admin="scheLocal.isAdmin"
      :is-preview="isPreview"
      :show-champion="showChampion"
      :shadow="shadow"
      :auto-back-to-top="showChampion"
      :my-team-id="myTeamId"
      :max-columns="6"
      @clickRoundTab="clickRoundTab"
      @clickSche="clickSche"
      @clickVideoIcon="clickVideoIcon"
      @scroll="onScroll"
    />

    <PressPopupCell
      :id="FUNCTIONAL_ID_MAP.POPUP_CELL"
      mode="functional"
    />
    <PressPicker
      :id="FUNCTIONAL_ID_MAP.PICKER"
      mode="functional"
    />
  </div>
</template>
<script>
import ScheduleTree from 'src/packages/press-schedule-tree/press-schedule-tree.vue';
import { genScheList } from 'src/packages/press-schedule-tree/demo-helper/mock-data';
import { formatScheTreeData } from 'src/packages/press-schedule-tree/utils';
import PressPopupCell from 'src/packages/press-popup-cell/press-popup-cell.vue';
import PressPicker from 'src/packages/press-picker/press-picker.vue';

import { FUNCTIONAL_ID_MAP } from 'src/packages/press-popup-cell/demo-helper/helper';
import { showCustomPopup, local } from 'src/packages/press-schedule-tree/demo-helper/custom';
import {
  STATUS_SCHE_MAP,
  GROUP_TYPE_MAP,
} from 'src/packages/press-schedule-tree/demo-helper/helper';


export default {
  i18n: {
    'zh-CN': {
      custom: '自定义',
    },
    'en-US': {
      custom: 'Custom',
    },
  },
  components: {
    ScheduleTree,
    PressPopupCell,
    PressPicker,
  },
  data() {
    return {
      sectionStyle: 'margin: 0;background: #f7f8fa;',
      headerStyle: 'background: #f7f8fa;',
      FUNCTIONAL_ID_MAP,
      myTeamId: 'team-id-515-b-a',
      scheList: [],
      isPreview: 0,
      scheLocal: {
        ...local,
      },
    };
  },
  computed: {
    showChampion() {
      return this.scheLocal.groupType !== GROUP_TYPE_MAP.CYCLE.name;
    },
    shadow() {
      return this.scheLocal.groupType === GROUP_TYPE_MAP.CYCLE.name;
    },
  },
  mounted() {
    this.generateData();
  },
  methods: {
    onScroll(scrollTime, roundTotal) {
      this.onGTip(`[scroll] ${scrollTime} ${roundTotal}`);
    },
    onShowBasicPopupCell() {
      showCustomPopup({
        context: this,
        callback: {
          changeTeamNumber: this.changeTeamNumber,
          changeStatus: this.changeStatus,
          changeAdmin: this.changeAdmin,
          changeGroupType: this.changeGroupType,
        },
      });
    },
    changeTeamNumber(number) {
      this.scheLocal.teamNumber = number;
      this.generateData();
      // this.$refs?.pressScheduleTreeRef?.setScrollParams(0);
    },
    changeStatus(status) {
      this.scheLocal.status = status;
      this.generateData();
      this.isPreview = STATUS_SCHE_MAP[status].isPreview || 0;
    },
    changeAdmin(isAdmin) {
      this.scheLocal = {
        ...this.scheLocal,
        isAdmin,
      };
      this.generateData();
    },
    changeGroupType(groupType) {
      this.scheLocal = {
        ...this.scheLocal,
        groupType,
      };
      this.generateData();
    },
    generateData() {
      const { isAdmin, teamNumber: teamNumber, status, groupType } = this.scheLocal;


      const newScheList = genScheList({
        info: STATUS_SCHE_MAP[status],
        teamNumber,
        groupType,
      });
      console.log('[Origin ScheList]', JSON.stringify(newScheList));

      this.scheList = formatScheTreeData({
        scheList: newScheList,
        isPreview: STATUS_SCHE_MAP[status].isPreview || 0,
        isAdmin,
      });

      console.log('[Parsed ScheList]', JSON.stringify(this.scheList));
    },
    clickRoundTab(args) {
      console.log('[clickRoundTab]', ...args);
      this.onGTip('click round tab');
    },
    clickSche(sheId, scheGroup, schePair) {
      console.log('[clickSche]', sheId, scheGroup, schePair);
      this.onGTip('click schedule item');
    },
    clickVideoIcon(sheId, scheGroup, schePair) {
      console.log('[clickVideoIcon]', sheId, scheGroup, schePair);
      this.onGTip('click video icon');
    },
  },
};
</script>
<style scoped lang="scss">
// qq小程序不支持virtualHost
demo-block {
  height: auto;
}
schedule-tree {
  flex: 1;
  overflow: auto;
}
</style>
