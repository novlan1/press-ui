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
          :title="t('multipleCheckboxType')"
          is-link
          @click="onShowCustomType('multipleCheckboxType')"
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
      :ref="FUNCTIONAL_ID_MAP.POPUP_CELL"
      mode="functional"
    />

    <PressPopupCell
      :id="FUNCTIONAL_ID_MAP.POPUP_CELL_2"
      :ref="FUNCTIONAL_ID_MAP.POPUP_CELL_2"
      mode="functional"
    />

    <PressPicker
      :id="FUNCTIONAL_ID_MAP.PICKER"
      :ref="FUNCTIONAL_ID_MAP.PICKER"
      mode="functional"
    />

    <PressDatetimePickerPopup
      :id="FUNCTIONAL_ID_MAP.DATE_TIME_PICKER"
      :ref="FUNCTIONAL_ID_MAP.DATE_TIME_PICKER"
      mode="functional"
    />
  </div>
</template>
<script>
import PressDatetimePickerPopup from 'press-ui/press-datetime-picker/press-datetime-picker-popup.vue';
import PressPopupCell from 'press-ui/press-popup-cell/press-popup-cell.vue';
import PressPicker from 'press-ui/press-picker/press-picker.vue';
import PressCell from 'press-ui/press-cell/press-cell.vue';

import {
  FUNCTIONAL_ID_MAP,
  showPopupCell,
} from 'src/packages/press-popup-cell/demo-helper/helper';
import { battleSet,  startMatchSet } from 'src/packages/press-popup-cell/demo-helper/popup';
import { batchSet } from 'src/packages/press-popup-cell/demo-helper/popup-batch';

const local = {
  activeRoundType: 'winner',
};

export default {
  i18n: {
    'zh-CN': {
      customType: '自定义类型',
      examples: '案例',
      checkboxType: 'Checkbox',
      multipleCheckboxType: 'Multiple Checkbox',
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
      multipleCheckboxType: 'Multiple Checkbox',
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
    PressCell,
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
        multipleCheckboxType: {
          title: 'Checkbox',
          button: '确定',
          asyncConfirm: ({ checkedIndexList }) => {
            console.log('[checkedIndexList]...', checkedIndexList);
            if (!checkedIndexList?.length) {
              this.onGTip('必须选择一路');
              return false;
            }

            const nameStr = this.customType.multipleCheckboxType.cellList
              .filter((_, index) => checkedIndexList.indexOf(index) > -1)
              .map(item => item.label)
              .join('、');
            this.onGTip(`修改成功，${nameStr}`);
            return true;
          },
          cellList: [
            {
              label: '对抗路',
              type: 'checkbox',
              click: () => {
              },
            },
            {
              label: '中路',
              type: 'checkbox',
              checked: true,
              click: () => {
              },
            },
            {
              label: '发育路',
              type: 'checkbox',
              checked: true,
              click: () => {
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
              active: local.activeRoundType,
              tabList: [
                {
                  label: '胜者组',
                  value: 'winner',
                }, {
                  label: '败者组',
                  value: 'loser',
                },
              ],
              click: ({
                // context: popupContext,
                tabItem,
                item,
              }) => {
                if (!tabItem || tabItem.value === item.active) return;
                console.log('[tabItem, item]: ', tabItem, item);

                local.activeRoundType = tabItem.value;
                this.customType.tabType.cellList[0].active = tabItem.value;
                // popupContext.closeDialog();
                that.onGTip(`已切换至${tabItem.label}`);
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
  methods: {
    onShowBasicPopupCell() {
      showPopupCell({
        context: this,
        closeIcon: true,
        title: 'Popup Cell',
        cellList: [{
          label: '决胜方式',
          value: '一局胜负',
          click: ({ context: popupContext }) => {
            popupContext.closeDialog();
          },
        },
        {
          label: 'Ban位',
          value: '各禁4英雄',
          click: ({ context: popupContext }) => {
            popupContext.closeDialog();
          },
        },
        ],
      }).catch((err) => {
        const { context } = err;
        context.closeDialog();
      });
    },
    onShowCustomType(type) {
      const options = this.customType[type] || {};
      showPopupCell({
        context: this,
        closeIcon: true,
        ...options,
      }).then(({ context, checkedIndexList }) => {
        console.log('[checkedIndexList]', checkedIndexList);
        context.closeDialog();
      })
        .catch(({ context }) => {
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
