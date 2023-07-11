<template>
  <div class="demo-wrap demo-wrap--gray">
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

    <div class="demo-container">
      <ScheduleItem
        :sche-info="scheInfo"
        :is-preview="scheLocal.isPreview"
        :is-admin="scheLocal.isAdmin"
        :my-team-id="scheLocal.myTeamId"
        :can-show-order-button="scheLocal.canShowOrderButton"
        :sche-sub-status-map="scheLocal.scheSubStatusMap"
      />
    </div>

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
import ScheduleItem from 'src/packages/press-schedule-list/press-schedule-item.vue';
import PressPopupCell from 'src/packages/press-popup-cell/press-popup-cell.vue';
import PressPicker from 'src/packages/press-picker/press-picker.vue';

import { parseScheItemData } from 'src/packages/press-schedule-list/utils';

import {
  FUNCTIONAL_ID_MAP,
} from 'src/packages/press-popup-cell/demo-helper/helper';

import { showCustomPopup, local } from 'src/packages/press-schedule-list/demo-helper/custom';
import {
  STATUS_SCHE_MAP,
} from 'src/packages/press-schedule-tree/demo-helper/helper';
import { genMockScheduleItemData } from 'src/packages/press-schedule-list/demo-helper/mock-data';


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
    ScheduleItem,
    PressPopupCell,
    PressPicker,
  },
  data() {
    const scheLocal = {
      ...local,
      isPreview: STATUS_SCHE_MAP[local.status]?.isPreview || 0,
      isAdmin: false,

      myTeamId: 'TEAM_ID_A',
      canShowOrderButton: true,
      scheSubStatusMap: {},
    };

    return {
      sectionStyle: 'margin: 0;background: #f7f8fa;',
      headerStyle: 'background: #f7f8fa;',
      FUNCTIONAL_ID_MAP,

      scheLocal,
      scheInfo: {},
    };
  },
  mounted() {
    this.generateData();
  },
  methods: {
    onShowBasicPopupCell() {
      showCustomPopup({
        context: this,
        callback: {
          changeStatus: this.changeStatus,
          changeAdmin: this.changeAdmin,
        },
      });
    },
    changeAdmin(isAdmin) {
      this.scheLocal = {
        ...this.scheLocal,
        isAdmin,
      };
      this.generateData();
    },
    changeStatus(status) {
      this.scheLocal = {
        ...this.scheLocal,
        status,
        isPreview: STATUS_SCHE_MAP[status].isPreview || 0,
      };
      this.generateData();
    },
    generateData() {
      const {
        isPreview,
        isAdmin,
        status,

        myTeamId,
        canShowOrderButton,
        scheSubStatusMap,
      } = this.scheLocal;
      const mockData = genMockScheduleItemData({
        info: STATUS_SCHE_MAP[status],
      });

      this.scheInfo = parseScheItemData({
        scheInfo: mockData,
        isPreview,
        isAdmin,

        myTeamId,
        canShowOrderButton,
        scheSubStatusMap,
      });
    },
  },
};
</script>
<style scoped lang="scss">
.demo-container {
  position: relative;
  background: #fff;
  margin: 10px 12px 0;
  border-radius: 4px;
  overflow: visible;
}
</style>
