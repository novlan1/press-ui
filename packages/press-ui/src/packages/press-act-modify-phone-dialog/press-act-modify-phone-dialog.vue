<template>
  <div
    v-if="show"
    :class="[
      getActClass('cover'),
      {
        'press-act--hidden-tip': hideTipStyle,
      },
      'press-act'
    ]"
  >
    <div :class="[getActClass('dialog','dialog-update')]">
      <a
        :class="[getActClass('close')]"
        @click="closeDialog"
      />
      <p :class="[getActClass('title')]">
        {{ title ? title : '修改手机号' }}
      </p>
      <div :class="[getActClass('content')]">
        <input
          :value="phone"
          :class="[getActClass('phone-number')]"
          type="string"
          placeholder="输入你要修改的手机号"
          @input="changePhone"
        >
        <div :class="[getActClass('code-wrap')]">
          <input
            :value="code"
            type="number"
            :class="[getActClass('code-number')]"
            placeholder="输入验证码"
            @input="changeCode"
          >
          <div
            :class="[getActClass('code-btn', {
              [getActClass('code-btn--disabled')]: isDisableGetCode
            })]"
            @click="onClickGetCode"
          >
            {{ getCodeText || '获取验证码' }}
          </div>
        </div>

        <div :class="[getActClass('button-wrap')]">
          <div
            :class="[getActClass('btn--cancel','btn--medium-secondary')]"
            @click="closeDialog"
          >
            取消
          </div>
          <div
            :class="[getActClass('btn--sure','btn--medium-primary')]"
            @click="onClickButton"
          >
            确认
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHideBaseStyleMixin } from '../mixins/act/hide-base-style';
import { getActClass } from './utils';


export default {
  name: 'PressActModifyPhoneDialog',
  options: {
    styleIsolation: 'shared',
  },
  mixins: [getHideBaseStyleMixin()],
  props: {
    show: {
      type: Boolean,
      default: false,
      desc: '是否显示弹窗',
      required: false,
    },
    phone: {
      type: String,
      default: '',
      desc: '电话号码',
      required: false,
    },
    code: {
      type: String,
      default: '',
      desc: '验证码	',
      required: false,
    },
    title: {
      type: String,
      desc: '弹窗标题',
      default: '修改手机号',
    },
    isDisableGetCode: {
      type: Boolean,
      default: false,
      desc: '是否获取验证码',
      required: false,
    },
    getCodeText: {
      type: String,
      desc: '获取验证码文案描述',
      default: '获取验证码',
    },
    useTipClass: {
      type: Boolean,
      default: false,
    },
    hideTipStyle: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeDialog() {
      this.$emit('clickCloseButton');
      this.$emit('update:show', false);
    },
    onClickButton() {
      this.$emit('clickButton');
    },
    changePhone(e) {
      this.$emit('update:phone', e.target.value);
    },
    changeCode(e) {
      this.$emit('update:code', e.target.value);
    },
    onClickGetCode() {
      this.$emit('clickGetCodeButton');
    },
    getActClass(...args) {
      return getActClass(this.useTipClass, args);
    },
  },
};
</script>


<style scoped lang="scss">
// body:not(.press-act-modify-phone-dialog--hidden) {
//   @import "./css/pvp-vertical.scss";
// }
.press__dialog {
  box-sizing: border-box;
}
</style>
<style scoped lang="scss" src="@TIP_STYLE_NAME"></style>
<style scoped lang="scss" src="./css/base.scss"></style>
