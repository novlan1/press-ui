<template>
  <div
    v-show="show"
    :class="[
      getActClass('cover'), {
        'press-act--hidden-tip': hideTipStyle,
      }, 'press-act']"
  >
    <div
      :class="[getActClass('dialog','dialog--qq')]"
    >
      <a
        :class="[getActClass('close')]"
        @click="closeDialog"
      />
      <p :class="[getActClass('title','title--qq')]">
        兑换至QQ账号
      </p>
      <div :class="[getActClass('content')]">
        <div :class="[getActClass('box')]">
          <input
            :value="qqnumber"
            type="number"
            placeholder="请输入QQ号码"
            @input="changeQQnumber"
          >
        </div>
        <div :class="[getActClass('button-wrap')]">
          <a
            :class="[getActClass('btn--cancel','btn--medium-secondary')]"
            @click="closeDialog"
          >取 消</a>
          <a
            :class="[getActClass('btn--sure','btn--medium-primary')]"
            @click="onClickButton"
          >
            <p>确认兑换</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getActClass } from './utils';


export default {
  name: 'PressActInputQQ',
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
  props: {
    show: {
      type: Boolean,
      default: false,
      desc: '是否显示弹窗',
      required: false,
    },
    qqnumber: {
      type: String,
      default: '',
      desc: 'QQ号码',
      required: false,
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
      this.$emit('update:show', false);
    },
    onClickButton() {
      this.$emit('clickButton');
    },
    changeQQnumber(e) {
      this.$emit('update:qqnumber', e.target.value);
    },
    getActClass(...args) {
      return getActClass(this.useTipClass, args);
    },
  },
};
</script>

<style scoped lang="scss" src="@TIP_STYLE_NAME">
</style>
<style scoped lang="scss" src="./css/base.scss"></style>
