<template>
  <div class="demo-wrap">
    <div>
      <demo-block :title="t('basicUsage')">
        <press-cell
          :title="t('check')"
          is-link
          @click="onShowBasicPopupCell"
        />
      </demo-block>

      <demo-block :title="t('customType')">
        <press-cell
          :title="t('checkboxType')"
          is-link
          @click="onShowCustomType('checkboxType')"
        />
        <press-cell
          :title="t('tabType')"
          is-link
          @click="onShowCustomType('tabType')"
        />
        <press-cell
          :title="t('switchType')"
          is-link
          @click="onShowCustomType('switchType')"
        />
        <press-cell
          :title="t('buttonType')"
          is-link
          @click="onShowCustomType('buttonType')"
        />
      </demo-block>

      <demo-block :title="t('examples')">
        <press-cell
          title="开赛设置"
          is-link
          @click="onShowPopupCell(startMatchSet)"
        />
        <press-cell
          title="对局设置"
          is-link
          @click="onShowPopupCell(battleSet)"
        />
        <press-cell
          title="批量设置"
          is-link
          @click="onShowPopupCell(batchSet)"
        />
      </demo-block>
    </div>

    <PressPopupCell
      :id="FUNCTIONAL_ID_MAP.POPUP_CELL"
      mode="functional"
    />

    <PressPopupCell
      :id="FUNCTIONAL_ID_MAP.POPUP_CELL_2"
      mode="functional"
    />

    <PressPicker
      :id="FUNCTIONAL_ID_MAP.PICKER"
      mode="functional"
    />

    <PressDatetimePickerPopup
      :id="FUNCTIONAL_ID_MAP.DATE_TIME_PICKER"
      mode="functional"
    />
  </div>
</template>
<script>
import PressDatetimePickerPopup from 'src/packages/press-datetime-picker/press-datetime-picker-popup.vue';
import PressPopupCell from 'src/packages/press-popup-cell/press-popup-cell.vue';
import PressPicker from 'src/packages/press-picker/press-picker.vue';
import {
  FUNCTIONAL_ID_MAP,
  showPopupCell,
} from 'src/packages/press-popup-cell/demo-helper/helper';
import { battleSet,  startMatchSet } from 'src/packages/press-popup-cell/demo-helper/popup';
import { batchSet } from 'src/packages/press-popup-cell/demo-helper/popup-batch';


export default {
  i18n: {
    'zh-CN': {
      customType: '自定义类型',
      examples: '案例',
      checkboxType: 'Checkbox',
      tabType: 'Tab',
      switchType: 'Switch',
      buttonType: 'Button',
      wayToWin: '决胜方式',
      SomeContent: '一些内容',
      controlledPopup: '受控组件',
      functional: '函数式调用',
      check: '查看',
      closeIcon: '关闭图标',
      cancelIcon: '取消图标',
      noCloseOrCancel: '没有关闭/取消',
      plainButtonConfirm: '线框按钮',
      horizontal: '横版',
      matchSetting: '开赛设置',
      startType: '开赛方式',
      manualStart: '手动开赛',
      lastReadyTime: '选手截止上场时间',
      closed: '不启用',
      asyncConfirm: '异步确认中...',
      asyncConfirmSuccess: '异步确认后禁止关闭',
      asyncConfirmFail: '异步确认后禁止关闭',
      peakDuel: '巅峰对决',
      peakDuelDesc: '最后一局英雄不限，双方阵容互不可见',
      popupCellTip: '创建比赛后，可按比赛轮次精确设置。',
    },
    'en-US': {
      customType: 'Custom Type',
      examples: 'Examples',
      checkboxType: 'Checkbox',
      tabType: 'Tab',
      switchType: 'Switch',
      buttonType: 'Button',
      wayToWin: 'Bo Number',
      SomeContent: 'Some Content',
      controlledPopup: 'Controlled Popup',
      functional: 'Functional Mode',
      check: 'Check',
      closeIcon: 'Close Ion',
      cancelIcon: 'Cancel Icon',
      noCloseOrCancel: 'No Close Or Cancel',
      plainButtonConfirm: 'Plain Button',
      horizontal: 'Horizontal Version',
      matchSetting: 'Match Setting',
      startType: 'Start Type',
      manualStart: 'Manual Start',
      lastReadyTime: 'Last Ready Time',
      closed: 'Closed',
      asyncConfirm: 'Async Confirm ...',
      asyncConfirmSuccess: 'Async Confirm Success',
      asyncConfirmFail: 'Async Confirm Fail',
      peakDuel: 'Peak Duel',
      peakDuelDesc: 'No limit to heroes in the last round',
      popupCellTip: 'This is some tips.',
    },
  },
  components: {
    PressPopupCell,
    PressDatetimePickerPopup,
    PressPicker,
  },
  data() {
    const that = this;

    return {
      FUNCTIONAL_ID_MAP,
      startMatchSet,
      battleSet,
      batchSet,
      customType: {
        checkboxType: {
          title: 'Checkbox',
          cellList: [
            {
              label: '人满开赛',
              description: '参赛双方满10人准备就绪即可比赛。',
              type: 'checkbox',
              click: ({ context: popupContext }) => {
                popupContext.closeDialog();
                that.onGTip('修改成功');
              },
            },
            {
              label: '手动开赛',
              description: '管理员手动点击开赛，选手才能进行比赛。',
              type: 'checkbox',
              checked: true,
              click: ({ context: popupContext }) => {
                popupContext.closeDialog();
                that.onGTip('修改成功');
              },
            },
          ],
        },
        tabType: {
          title: 'Tab',
          cellList: [
            {
              type: 'tab',
              label: '分组',
              active: 'winner',
              tabList: [
                {
                  label: '胜者组',
                  value: 'winner',
                }, {
                  label: '败者组',
                  value: 'loser',
                },
              ],
              click: ({ context: popupContext }) => {
                popupContext.closeDialog();
                that.onGTip('修改成功');
              },
            },
          ],
        },
        switchType: {
          title: 'Switch',
          cellList: [
            {
              label: '巅峰对决',
              description: '最后一局英雄不限，双方阵容互不可见',
              type: 'switch',
              click: ({ context: popupContext }) => {
                popupContext.closeDialog();
                that.onGTip('修改成功');
              },
            },
          ],
        },
        buttonType: {
          title: 'Button',
          bottomButton: '取消',
          cellList: [
            {
              label: '批量设置定时开赛',
              type: 'button',
              click: ({ context: popupContext }) => {
                popupContext.closeDialog();
                that.onGTip('修改成功');
              },
            },
            {
              label: '批量设置截止上场时间',
              type: 'button',
              click: ({ context: popupContext }) => {
                popupContext.closeDialog();
                that.onGTip('修改成功');
              },
            },
          ],
        },
      },
    };
  },
  onLoad() {
    // #ifdef MP-QQ
    qq.showShareMenu({
      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment'],
    });
    // #endif
  },
  methods: {
    onTip(title) {
      uni.hideLoading();
      uni.showToast({
        title,
        icon: 'none',
        duration: 1500,
      });
    },
    onShowBasicPopupCell() {
      showPopupCell({
        closeIcon: true,
        title: 'Popup Cell',
        cellList: [{
          label: '决胜方式',
          value: '一局胜负',
        },
        {
          label: 'Ban位',
          value: '各禁4英雄',
        },
        ],
      }).catch(({ context }) => {
        context.closeDialog();
      });
    },
    onShowCustomType(type) {
      const options = this.customType[type] || {};
      showPopupCell({
        closeIcon: true,
        ...options,
      }).catch(({ context }) => {
        context.closeDialog();
      });
    },
    onShowPopupCell(func) {
      func(this);
    },
  },
};
</script>
<style scoped>
.content {
  font-size: 16px;
  padding: 20px;
}
</style>
