<template>
  <div class="demo-wrap">
    <demo-block
      :title="t('basicUsage')"
    >
      <press-cell
        :title="t('show')"
        is-link
        @click="onShowAwardPopup"
      />
      <press-cell
        :title="t('custom')"
        is-link
        @click="onCustom"
      />
    </demo-block>

    <PressAwardPopup
      v-if="show"
      :award-list="awardList"
      :tip-title="tipTitle"
      :is-hor="customParams.isHor"
      :is-game-prize="customParams.isGamePrize"
      :confirm-text="t('confirm')"
      @onGoAward="onGoAward"
      @onShowSwitchRoleDialog="onShowSwitchRoleDialog"
      @onExchange="onExchange"
      @dimissDialog="onCloseAwardDialog"
      @onConfirm="onCloseAwardDialog"
    />

    <PressPopupCell
      :id="FUNCTIONAL_ID_MAP.POPUP_CELL"
      :ref="FUNCTIONAL_ID_MAP.POPUP_CELL"
      mode="functional"
    />
  </div>
</template>
<script>
import PressAwardPopup from 'press-ui/press-award-popup/press-award-popup.vue';
import PressCell from 'press-ui/press-cell/press-cell.vue';
import { showCustomPopup, local } from 'src/packages/press-award-popup/demo-helper/custom';
import { MOCK_AWARD_LIST } from 'src/packages/press-award-popup/demo-helper/data';
import { FUNCTIONAL_ID_MAP } from 'src/packages/press-popup-cell/demo-helper/helper';
import PressPopupCell from 'press-ui/press-popup-cell/press-popup-cell.vue';


export default {
  i18n: {
    'zh-CN': {
      show: '展示',
      custom: '自定义',
    },
    'en-US': {
      show: 'Show',
      custom: 'Custom',
    },
  },
  components: {
    PressAwardPopup,
    PressCell,
    PressPopupCell,
  },
  data() {
    return {
      show: false,
      awardList: [],
      tipTitle: '没有获得奖励哦～',
      customParams: { ...local },
      FUNCTIONAL_ID_MAP,
    };
  },
  mounted() {
    this.genDemoData();
  },
  methods: {
    onShowAwardPopup() {
      this.show = true;
    },
    onCloseAwardDialog() {
      this.show = false;
    },
    onCustom() {
      showCustomPopup({
        context: this,
        callback: {
          changeParams: this.changeParams,
        },
      });
    },
    changeParams(params) {
      this.customParams = params;
      this.genDemoData();
    },
    onGoAward() {
      this.onGTip('[onGoAward]');
    },
    onShowSwitchRoleDialog() {
      this.onGTip('[onShowSwitchRoleDialog]');
    },
    onExchange() {
      this.onGTip('[onExchange]');
    },
    genDemoData() {
      const { empty } = this.customParams;
      if (empty) {
        this.awardList = [];
      } else {
        this.awardList = MOCK_AWARD_LIST;
      }
    },
  },
};
</script>
<style scoped lang="scss">
</style>
