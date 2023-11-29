<template>
  <div class="press-card-button">
    <!--提示气泡-->
    <div
      v-if="showButtonTip && buttonTipType === BUTTON_TIP_TYPE_AMP.TEXT"
      class="press-card-button__tips"
    >
      {{ buttonTip }}
    </div>
    <div
      v-else-if="showButtonTip && buttonTipType == BUTTON_TIP_TYPE_AMP.AVATAR"
      class="press-card-button__avatar-tips"
    >
      <div class="press-card-button__avatar-tip">
        {{ buttonTip }}
      </div>

      <div
        v-if="buttonAvatarList.length"
        class="press-card-button__avatars"
      >
        <div
          v-for="(item, index) in buttonAvatarList"
          :key="index"
          class="press-card-button__avatar-wrap"
          :class="{
            'press-card-button__avatar-wrap--green': item.isGreen,
            'press-card-button__avatar-wrap--yellow': item.isYellow,
          }"
        >
          <img
            class="press-card-button__avatar"
            :src="item.head"
            alt=""
            srcset=""
          >
        </div>
      </div>
    </div>

    <div
      :class="extraButtonClass"
      class="press-card-button__main"
      @click.stop="onClickButton"
    >
      <slot />

      <press-count-down
        v-if="showButtonCountdown == SWITCH_TYPE.ON"
        :time="buttonCountDown"
        @finish="finish"
      />
    </div>
  </div>
</template>

<script>
import PressCountDown from '../press-count-down/press-count-down';
import { SWITCH_TYPE, BUTTON_TIP_TYPE_AMP } from './config';
import utils from '../common/utils/utils';

export default {
  name: 'PressScheduleCardButton',
  components: {
    PressCountDown,
  },
  props: {
    // 按钮颜色类型
    buttonType: {
      type: String,
      default: '',
    },
    buttonText: {
      type: String,
      default: '',
    },
    // 倒计时显隐
    showButtonCountdown: {
      type: String,
      default: '',
    },
    // width: 1.44  /  4;
    // height: 0.56  / 0.72;
    // 按钮宽高样式
    buttonStyle: {
      type: Object,
      default: () => ({
        width: 4,
        height: 0.72,
      }),
    },
    // 显隐气泡
    showButtonTip: {
      type: Boolean,
      default: false,
    },
    // 气泡样式
    buttonTipType: {
      type: String,
      default: BUTTON_TIP_TYPE_AMP.TEXT,
    },
    // 第一局已开赛
    // 请在倒计时结束前匹配对手
    // 气泡文案
    buttonTip: {
      type: String,
      default: '',
    },
    buttonCountDown: {
      type: Number,
      default: 0,
    },
    buttonAvatarList: {
      type: Array,
      default: () => ([
        // {
        //   head: 'https://thirdqq.qlogo.cn/g?b=oidb&k=HFh953g22kPgQny1h7KITQ&kti=ZJJzkQAAAAE&s=640&t=1556998035',
        //   isGreen: true,
        // },
        // {
        //   head: 'https://thirdqq.qlogo.cn/g?b=oidb&k=HFh953g22kPgQny1h7KITQ&kti=ZJJzkQAAAAE&s=640&t=1556998035',
        //   isYellow: true,
        // },
        // {
        //   head: 'https://thirdqq.qlogo.cn/g?b=oidb&k=HFh953g22kPgQny1h7KITQ&kti=ZJJzkQAAAAE&s=640&t=1556998035',
        //   isYellow: true,
        // },
        // {
        //   head: 'https://thirdqq.qlogo.cn/g?b=oidb&k=HFh953g22kPgQny1h7KITQ&kti=ZJJzkQAAAAE&s=640&t=1556998035',
        // },
      ]),
    },
  },
  emits: [
    'click',
    'finish',
  ],
  data() {
    return {
      SWITCH_TYPE,
      BUTTON_TIP_TYPE_AMP,
    };
  },
  computed: {
    // 按钮样式
    extraButtonClass() {
      return utils.bem2('card-button__main', {
        green: this.buttonType === 'green',
        gray: this.buttonType === 'gray',
      });
    },
  },
  mounted() {
  },
  updated() {
  },
  methods: {
    finish() {
      if (this.buttonCountDown <= 0) return;
      this.$emit('finish');
    },
    onClickButton() {
      this.$emit('click');
    },
  },
};
</script>

<style></style>
<style lang="scss" src="./css/card-button.scss" scoped></style>
