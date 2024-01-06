<template>
  <div @click.stop="onClick">
    <!-- 报名中 -->
    <div
      v-if="isNotSignUp"
      class="press-sche-card-sign"
    >
      <!-- 内容 -->
      <div class="press-sche-card-sign__main">
        <!-- 对战步骤 -->
        <CardSteps
          :step-list="gameStageList"
          @click="clickStep"
        />
        <CardTitle :title="'距报名截止'" />
        <!-- 距离比赛开始 -->
        <CardCountDown
          :countdown-time="countdownTime"
          :force-show-day="true"
          :show-unit="true"
          @change="countDownChange"
          @finish="countDownFinish"
        />
      </div>
    </div>

    <!-- 已报名 -->
    <div
      v-else
      class="press-sche-card-join"
      :class="{
        'press-sche-card-join--count-down': matchStatus == INNER_MATCH_STATUS_MAP.SHOW_COUNT_DOWN,
        'press-sche-card-join--team': matchStatus == INNER_MATCH_STATUS_MAP.SHOW_TEAM_LIST,
        'press-sche-card-join--score': matchStatus == INNER_MATCH_STATUS_MAP.SHOW_SCORE_LIST,
        'press-sche-card-join--result': matchStatus == INNER_MATCH_STATUS_MAP.SHOW_RESULT,
      }"
    >
      <!-- 头部栏 -->
      <CardTopNav
        :nick="userNick"
        :device-str="deviceStr"
        :role-id="roleId"
        @exchange="onExchange"
      />

      <!-- 内容 -->
      <div
        class="press-sche-card-join__main"
      >
        <!-- 待开赛 -->
        <div
          v-if="matchStatus == INNER_MATCH_STATUS_MAP.SHOW_COUNT_DOWN"
          class="press-sche-card-join__box"
        >
          <!-- 对战步骤 -->
          <CardSteps
            :step-list="stepList"
            @click="clickStep"
          />
          <!-- 比赛进行中 -->
          <!-- <div
            v-if="isMatching"
            class="apex--matching-box"
          >
            <div class="apex--matching-img" />
            <div class="apex--matching-text">
              比赛进行中
            </div>
            <div class="apex--matching-subtext">
              请等待本场比赛结束
            </div>
          </div> -->

          <!-- v-else -->
          <div>
            <CardTitle
              :title="'比赛即将开始'"
            />
            <div class="press-sche-card-join__info">
              <!-- 倒计时 -->
              <CardCountDown
                v-if="true"
                :force-show-day="false"
                :show-unit="false"
                :countdown-time="countdownTime"
                @change="countDownChange"
                @finish="countDownFinish"
              />

              <!-- 匹配结束 结果显示 -->
              <CardMatchResult
                v-else
                :is-fail="!isMatchSuccess"
                :title="failTitle"
                :desc="failDesc"
              />
            </div>
          </div>
        </div>

        <!-- 比赛已开始 -->
        <div
          v-else-if="matchStatus == INNER_MATCH_STATUS_MAP.SHOW_TEAM_LIST"
          class="press-sche-card-join__box"
        >
          <CardSteps
            :step-list="stepList"
            @click="clickStep"
          />
          <CardTitle :title="'比赛已开始'" />
          <div class="press-sche-card-join__info">
            <CardTeams
              :team-list="teamList"
            />
          </div>
        </div>

        <!-- 待开赛 第二局 (积分排名)-->
        <div
          v-else-if="matchStatus == INNER_MATCH_STATUS_MAP.SHOW_SCORE_LIST"
          class="press-sche-card-join__box"
        >
          <CardSteps
            :step-list="stepList"
            @click="clickStep"
          />
          <CardTitle
            :title="'积分排名'"
            :show-icon="true"
            @checkDataDetail="checkDataDetail"
          />

          <div class="press-sche-card-join__info">
            <CardCountDown
              v-if="false"
              :force-show-day="false"
              :show-unit="false"
              :countdown-time="countdownTime"
              @change="countDownChange"
              @finish="countDownFinish"
            />
            <CardScores
              :score-list="scoreList"
            />
          </div>
        </div>

        <!-- 待开赛 -->
        <div
          v-if="matchStatus == INNER_MATCH_STATUS_MAP.SHOW_RESULT
            && resultType === RESULT_TYPE_MAP.FAIL"
          class="press-sche-card-join__box"
        >
          <!-- 对战步骤 -->
          <CardSteps
            :step-list="stepList"
            @click="clickStep"
          />
          <div>
            <div class="press-sche-card-join__info">
              <CardMatchResult
                :is-fail="true"
                :title="failTitle"
                :desc="failDesc"
              />
            </div>
          </div>
        </div>

        <!-- 全部对战结束 (比赛结果) -->
        <div
          v-else-if="matchStatus == INNER_MATCH_STATUS_MAP.SHOW_RESULT"
          class="press-sche-card-join__box"
        >
          <!-- 标题 -->
          <div class="press-sche-card-join__info">
            <!-- 比赛结果-内容 -->
            <div>
              <CardResults
                :result-type="resultType"
                :pending-text="pendingText"
              />
              <CardResultList :result-list="resultList" />
            </div>
          </div>
        </div>

        <!-- 按钮组件 -->
        <div
          class="press-sche-card-join__button-wrap"
          :class="(matchStatus == INNER_MATCH_STATUS_MAP.SHOW_RESULT && resultType !== RESULT_TYPE_MAP.FAIL)
            ? 'press-sche-card-join__button-wrap--top' : ''"
        >
          <div
            v-if="showRemindTeammateIcon"
            class="press-sche-card__left-button"
          >
            <i class="card-iconfont icon-bell" />
            提醒队友
          </div>
          <div
            v-else-if="showMyPrizeIcon"
            class="press-sche-card__left-button"
          >
            <i class="card-iconfont icon-gift" />
            我的奖励
          </div>

          <!-- 自定义图标及文案 -->
          <div
            v-else-if="leftButtonText"
            class="press-sche-card__left-button"
          >
            <i
              class="card-iconfont"
              :class="leftButtonIcon"
            />
            {{ leftButtonText }}
          </div>

          <!-- 占位用，否则中间按钮偏移 -->
          <div
            v-else
            class="press-sche-card__left-button"
            style="width: .8rem"
          />

          <CardButton
            :button-type="innerButtonType"
            :show-button-countdown="innerShowButtonCountdown"
            :button-tip="innerButtonTip"
            :show-button-tip="!!innerButtonTip"
            :button-tip-type="innerButtonTipType"
            :button-count-down="buttonCountDown"
            :button-avatar-list="buttonAvatarList"
            @click="clickButton"
            @finish="buttonCountDownFinish"
          >
            {{ innerButtonText }}
          </CardButton>

          <!-- 出战名单 / 详细数据 -->
          <div
            v-if="showBattleTeamList"
            class="press-sche-card__right-button"
          >
            <i class="card-iconfont icon-team-member" />
            出战名单
          </div>
          <div
            v-else-if="showMatchDataDetail"
            class="press-sche-card__right-button"
            @click="checkDataDetail"
          >
            <i class="card-iconfont icon-detail-data" />
            详细数据
          </div>

          <!-- 自定义图标及文案 -->
          <div
            v-else-if="rightButtonText"
            class="press-sche-card__right-button"
          >
            <i
              class="card-iconfont"
              :class="rightButtonIcon"
            />
            {{ rightButtonText }}
          </div>

          <!-- 占位用，否则中间按钮偏移 -->
          <div
            v-else
            class="press-sche-card__right-button"
            style="width: .8rem"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardSteps from './card-steps';
import CardCountDown from './card-count-down.vue';
import CardTitle from './card-title.vue';
import CardTopNav from './card-top-nav.vue';
import CardButton from './card-button.vue';
import CardMatchResult from './card-match-result.vue';
import CardTeams from './card-teams.vue';
import CardScores from './card-scores.vue';
import CardResultList from './card-result-list.vue';
import CardResults from './card-results.vue';

import {
  SCHEDULE_CARD_STATE_MAP,
  BUTTON_TYPE_MAP,
  RESULT_TYPE_MAP,
  SWITCH_TYPE,
  BUTTON_TIP_TYPE_AMP,
  INNER_MATCH_STATUS_MAP,
} from './config';


export default {
  name: 'PressScheduleCard',
  components: {
    CardSteps,
    CardCountDown,
    CardTitle,
    CardTopNav,
    CardButton,
    CardMatchResult,
    CardTeams,
    CardScores,
    CardResultList,
    CardResults,
  },
  props: {
    isNotSignUp: {
      type: Boolean,
      default: false,
    },
    cardState: {
      type: String,
      default: '',
    },
    countdownTime: {
      type: Number,
      default: 0,
    },
    buttonCountDown: {
      type: Number,
      default: 0,
    },
    // 对局列表
    stepList: {
      type: Array,
      default: () => [],
    },
    // 比赛阶段列表
    gameStageList: {
      type: Array,
      default: () => ([]),
    },
    teamList: {
      type: Array,
      default: () => ([]),
    },
    scoreList: {
      type: Array,
      default: () => [],
    },
    resultList: {
      type: Array,
      default: () => [],
    },
    resultType: {
      type: String,
      default: '',
    },
    failTitle: {
      type: String,
      default: '晋级失败',
    },
    failDesc: {
      type: String,
      default: '本场比赛晋级失败，请参与其他场次',
    },
    pendingText: {
      type: String,
      default: '等待裁判确认晋级名次',
    },
    userNick: {
      type: String,
      default: '',
    },
    deviceStr: {
      type: String,
      default: '',
    },
    roleId: {
      type: String,
      default: '',
    },
    buttonText: {
      type: String,
      default: '',
    },
    buttonType: {
      type: String,
      default: '',
    },
    buttonTip: {
      type: String,
      default: '',
    },
    showButtonCountdown: {
      type: String,
      default: '',
    },
    buttonTipType: {
      type: String,
      default: '',
    },
    buttonAvatarList: {
      type: Array,
      default: () => ([]),
    },
    isMatchSuccess: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    'click',
    'clickButton',
    'checkDataDetail',
    'clickStep',
    'countDownChange',
    'countDownFinish',
    'buttonCountDownFinish',
    'exchange',
  ],
  data() {
    return {
      SCHEDULE_CARD_STATE_MAP,
      RESULT_TYPE_MAP,
      INNER_MATCH_STATUS_MAP,

      matchStatus: INNER_MATCH_STATUS_MAP.SHOW_COUNT_DOWN, // 非报名状态中的各个状态

      // 左边按钮
      showRemindTeammateIcon: false, // 显示提醒队友图标
      showMyPrizeIcon: false, // 显示我的奖励图标
      leftButtonText: '',
      leftButtonIcon: '',

      // 右边按钮
      showBattleTeamList: false, // 显示出战名单
      showMatchDataDetail: false, // 显示详细数据,
      rightButtonText: '',
      rightButtonIcon: '',

      innerButtonText: this.buttonText,
      innerButtonType: this.buttonType,
      innerButtonTip: this.buttonTip,
      innerShowButtonCountdown: this.showButtonCountdown, // 是否显示按钮倒计时
      innerButtonTipType: this.buttonTipType, // 气泡类型 1 文案, 2 头像列表
    };
  },
  watch: {
    cardState: 'init',
    isNotSignUp: {
      handler() {
        this.init();
      },
      immediate: true,
    },
  },
  created() {
    this.init();
  },
  mounted() {
  },
  updated() {
  },
  methods: {
    initButton() {
      this.innerButtonText = this.buttonText;
      this.innerButtonType = this.buttonType;
      this.innerButtonTip = this.buttonTip;
      this.innerShowButtonCountdown = this.showButtonCountdown;
      this.innerButtonTipType = this.buttonTipType;
    },
    init() {
      this.initButton();

      if (this.cardState === SCHEDULE_CARD_STATE_MAP.GAME_WILL_START) {
        this.matchStatus = INNER_MATCH_STATUS_MAP.SHOW_COUNT_DOWN; // 非报名状态中的各个状态

        this.innerButtonText = this.buttonText || '待开赛';
        this.innerButtonType = this.buttonType ||  BUTTON_TYPE_MAP.DISABLE;
        // 报名但未参赛者 -- 待开赛 / 第一局-进入游戏/比赛中
      } else if (this.cardState === SCHEDULE_CARD_STATE_MAP.BATTLE_STARTED) {
        this.matchStatus = INNER_MATCH_STATUS_MAP.SHOW_TEAM_LIST; // 非报名状态中的各个状态

        this.innerButtonText = this.buttonText || '去比赛';
        this.innerButtonType = this.buttonType ||  BUTTON_TYPE_MAP.PRIMARY;
        this.innerButtonTip = this.buttonTip || '已开赛';
        this.innerButtonTipType = BUTTON_TIP_TYPE_AMP.TEXT;
        // debugger;
        console.log('innerButtonTip', this.innerButtonTip);

        // 待开赛-第二局 (积分排名)
      } else if (this.cardState === SCHEDULE_CARD_STATE_MAP.BATTLE_PLAYING) {
        this.matchStatus = INNER_MATCH_STATUS_MAP.SHOW_TEAM_LIST;

        this.innerButtonText = this.buttonText || '比赛进行中';
        this.innerButtonType = this.buttonType || BUTTON_TYPE_MAP.DISABLE;
      } else if (this.cardState === SCHEDULE_CARD_STATE_MAP.BATTLE_NEXT_WILL_START) {
        this.matchStatus = INNER_MATCH_STATUS_MAP.SHOW_SCORE_LIST; // 非报名状态中的各个状态

        this.innerButtonText = this.buttonText || '待开赛';
        this.innerButtonType = this.buttonType || BUTTON_TYPE_MAP.DISABLE;
        this.innerShowButtonCountdown = this.showButtonCountdown || SWITCH_TYPE.ON;
        //  全部对战结束
      } else if (this.cardState === SCHEDULE_CARD_STATE_MAP.GAME_END) {
        this.matchStatus = INNER_MATCH_STATUS_MAP.SHOW_RESULT; // 非报名状态中的各个状态

        if (this.resultType === RESULT_TYPE_MAP.FAIL) {
          this.innerButtonText = this.buttonText || '查看详细数据';
          this.innerButtonType = this.buttonType || BUTTON_TYPE_MAP.PRIMARY;
        } else {
          this.innerButtonText = this.buttonText || '查看下一阶段';
          this.innerButtonType = this.buttonType || BUTTON_TYPE_MAP.PRIMARY;

          this.showMatchDataDetail = true;
        }
      }
    },
    clickButton() {
      this.$emit('clickButton', this.innerButtonType, this.cardState, SCHEDULE_CARD_STATE_MAP);
    },
    checkDataDetail() {
      this.$emit('checkDataDetail', this.cardState, SCHEDULE_CARD_STATE_MAP);
    },
    clickStep(stepItem, stepIndex) {
      this.$emit('clickStep', stepItem, stepIndex);
    },
    countDownChange() {
      this.$emit('countDownChange', this.cardState, SCHEDULE_CARD_STATE_MAP);
    },
    countDownFinish() {
      this.$emit('countDownFinish', this.cardState, SCHEDULE_CARD_STATE_MAP);
    },
    buttonCountDownFinish() {
      this.$emit('buttonCountDownFinish', this.cardState, SCHEDULE_CARD_STATE_MAP);
    },
    onExchange() {
      this.$emit('exchange', this.cardState, SCHEDULE_CARD_STATE_MAP);
    },
    onClick() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss" src="./css/index.scss" scoped></style>
