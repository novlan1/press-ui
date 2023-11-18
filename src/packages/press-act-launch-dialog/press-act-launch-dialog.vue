<template>
  <div
    v-if="show"
    :class="[
      getActClass('wrap'), {
        'press-act--hidden-tip': hideTipStyle,
      }, 'press-act']"
  >
    <div :class="[getActClass('box','box--launch')]">
      <div :class="[getActClass('icon--launch-wx')]" />
      <div :class="[getActClass('text')]">
        {{ title }}
      </div>
      <div
        :class="[getActClass('btn--blue')]"
        @click.stop="closeDialog"
      >
        取消
      </div>
    </div>
  </div>
</template>

<script>
import { getActClass } from './utils';


export default {
  name: 'PressActLaunchDialog',
  options: {
    styleIsolation: 'shared',
  },
  props: {
    show: {
      type: Boolean,
      default: false,
      required: false,
      desc: '是否显示动效',
    },
    title: {
      type: String,
      default: '即将拉起微信',
      required: false,
      desc: '标题',
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
      this.$emit('clickCloseButton');
    },
    getActClass(...args) {
      return getActClass(this.useTipClass, args);
    },
  },
};
</script>

<style scoped lang="scss">
// body:not(.press-act-launch-dialog--hidden) {
//   @import "./css/pvp.scss";
// }
</style>
<style scoped lang="scss" src="@TIP_STYLE_NAME"></style>
<style scoped lang="scss" src="./css/base.scss"></style>
