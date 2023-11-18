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
    <!-- <div style="height: 60px;" /> -->

    <PressScheduleCard
      :user-nick="scheInfo.userNick"
      :device-str="scheInfo.deviceStr"
      :role-id="scheInfo.roleId"
      :is-not-sign-up="scheInfo.isNotSignUp"
      :card-state="scheInfo.cardState"
      :countdown-time="scheInfo.countdown"
      :button-count-down="scheInfo.buttonCountDown"
      :step-list="scheInfo.stepList"
      :game-stage-list="scheInfo.gameStageList"
      :team-list="scheInfo.teamList"
      :score-list="scheInfo.scoreList"
      :result-list="scheInfo.resultList"
      :result-type="scheInfo.resultType"
      @click="clickCard"
      @clickStep="clickStep"
      @clickButton="clickButton"
      @checkDataDetail="checkDataDetail"
      @countDownChange="countDownChange"
      @countDownFinish="countDownFinish"
      @buttonCountDownFinish="buttonCountDownFinish"
      @exchange="exchange"
    />

    <DemoInput
      :section-style="sectionStyle"
      :header-style="headerStyle"
      :autosize="autosize"
      :value="MOCK_SCHEDULE_DATA"
      @confirm="onConfirmInput"
    />

    <PressPopupCell
      :id="FUNCTIONAL_ID_MAP.POPUP_CELL"
      :ref="FUNCTIONAL_ID_MAP.POPUP_CELL"
      mode="functional"
    />
    <PressPicker
      :id="FUNCTIONAL_ID_MAP.PICKER"
      :ref="FUNCTIONAL_ID_MAP.PICKER"
      mode="functional"
    />
  </div>
</template>
<script>
import PressScheduleCard from 'src/packages/press-schedule-card/press-schedule-card.vue';
import PressCell from 'src/packages/press-cell/press-cell.vue';
import PressPopupCell from 'src/packages/press-popup-cell/press-popup-cell.vue';
import PressPicker from 'src/packages/press-picker/press-picker.vue';
import DemoInput from 'src/pages/components/demo-input/demo-input.vue';

import { SCHEDULE_CARD_STATE_MAP, RESULT_TYPE_MAP } from 'src/packages/press-schedule-card/config';
import {
  showCustomPopup,
  getStepList,
  getTeamList,
  getScoreList,
  getResultList,
} from 'src/packages/press-schedule-card/demo-helper/custom';
import { MOCK_SCHEDULE_DATA } from 'src/packages/press-schedule-card/demo-helper/data';
import { FUNCTIONAL_ID_MAP } from 'src/packages/press-popup-cell/demo-helper/helper';
import { parseScheduleData } from 'src/packages/press-schedule-card/utils';

const MOCK_PLAYING_INDEX = 1;
const MOCK_COUNT_DOWN = 1000 * 60 * 60 * 26;

export default {
  i18n: {
    'zh-CN': {
      custom: '自定义',
      mockData: '赛程数据',
    },
    'en-US': {
      custom: 'Custom',
      mockData: 'Schedule Data',
    },
  },
  components: {
    PressScheduleCard,
    PressCell,
    PressPopupCell,
    PressPicker,
    DemoInput,
  },
  data() {
    return {
      sectionStyle: 'margin: 0;background: #f7f8fa;',
      headerStyle: 'background: #f7f8fa;',

      scheInfo: {
        userNick: '杨',
        deviceStr: 'iOS微信',
        roleId: '123123123999',
        countdown: MOCK_COUNT_DOWN,
        buttonCountDown: MOCK_COUNT_DOWN,
        isNotSignUp: false,
        cardState: SCHEDULE_CARD_STATE_MAP.BATTLE_STARTED,
        stepList: getStepList({
          length: 6,
          playingIndex: MOCK_PLAYING_INDEX,
        }),
        gameStageList: getStepList({
          length: 3,
          isStage: true,
          playingIndex: -1,
          curIndex: -1,
        }),
        teamList: getTeamList({
          length: 6,
          readyList: [1, 2, 3],
        }),
        scoreList: getScoreList({
          length: 6,
        }),
        resultList: getResultList(),
        resultType: RESULT_TYPE_MAP.PENDING,
      },
      FUNCTIONAL_ID_MAP,
      // SCHEDULE_CARD_STATE_MAP,
      autosize: { maxHeight: 600, minHeight: 50 },
      MOCK_SCHEDULE_DATA,
    };
  },
  methods: {
    onShowBasicPopupCell() {
      const { isNotSignUp, cardState, resultType  } = this.scheInfo;

      showCustomPopup({
        context: this,
        isNotSignUp,
        cardState,
        cardStateMap: SCHEDULE_CARD_STATE_MAP,
        resultTypeMap: RESULT_TYPE_MAP,
        resultType,
        callback: {
          changeParams: this.changeParams,
        },
      });
    },
    changeParams(params = {}) {
      this.scheInfo = {
        ...this.scheInfo,
        countdown: MOCK_COUNT_DOWN,
        buttonCountDown: MOCK_COUNT_DOWN,
        ...params,
      };
      console.log('[scheInfo]', this.scheInfo);
    },
    clickCard() {
      this.onGTip('[clickCard]');
    },
    clickStep(clickItem, clickIndex) {
      console.log('[clickStep]', clickItem, clickIndex);
      this.onGTip(`[clickStep] ${clickIndex}`);

      if (this.scheInfo.isNotSignUp) {
        return;
      }

      const { stepList } = this.scheInfo;
      const newStepList = stepList.map((item, stepIndex) => ({
        ...item,
        isCurrent: clickIndex === stepIndex,
        playing: MOCK_PLAYING_INDEX === clickIndex ? false : MOCK_PLAYING_INDEX === stepIndex,
      }));
      console.log('[newStepList]', newStepList);
      this.scheInfo.stepList = newStepList;
    },
    clickButton() {
      this.onGTip('[clickButton]');
    },
    checkDataDetail() {
      this.onGTip('[checkDataDetail]');
    },
    countDownFinish() {
      this.onGTip('[countDownFinish]');
    },
    buttonCountDownFinish() {
      this.onGTip('[buttonCountDownFinish]');
    },
    exchange() {
      this.onGTip('[exchange]');
    },
    countDownChange() {

    },
    onConfirmInput(inputValue) {
      let scheInfo = {};

      try {
        const sche = JSON.parse(inputValue);
        scheInfo = parseScheduleData(
          sche.sche?.user_schedule || sche.user_schedule,
          sche.sche?.game_info | sche.game_info,
        );

        console.log('[scheInfo]', scheInfo);
      } catch (err) {
        this.onGTip('数据解析失败');
        return;
      }

      this.scheInfo = {
        ...this.scheInfo,
        ...scheInfo,
      };
      this.onGTip('数据生成卡片成功');
    },
  },
};
</script>
<style scoped lang="scss">
</style>
