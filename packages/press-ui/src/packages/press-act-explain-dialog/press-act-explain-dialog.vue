<template>
  <div
    v-if="show"
    :class="[
      getActClass('cover'),
      {
        'press-act--hidden-tip': hideTipStyle,
      }, 'press-act']"
  >
    <div :class="[getActClass('dialog', 'dialog--tip')]">
      <div
        :class="[getActClass('title', 'title--text', 'title--explain')]"
      >
        {{ propsData.title }}
      </div>
      <div
        :class="[getActClass('close')]"
        @click="closeDialog"
      />
      <div
        :class="[getActClass('detail')]"
        v-html="propsData.content"
      />
      <div
        v-if="showButton"
        :class="[getActClass('buttons')]"
      >
        <a
          :class="[getActClass('btn--sure', 'btn--large-primary')]"
          @click="closeDialog"
        >确认</a>
      </div>
    </div>
  </div>
</template>
<script>
import { getHideBaseStyleMixin } from '../mixins/act/hide-base-style';
import { getActClass } from './utils';


export default {
  name: 'PressActExplainDialog',
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
  mixins: [getHideBaseStyleMixin()],
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    showButton: {
      type: Boolean,
      default: false,
    },
    propsData: {
      type: Object,
      default: () => ({}),
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
  emits: [
    'update:show',
  ],
  data() {
    return {};
  },
  watch: {
  },
  methods: {
    closeDialog() {
      this.$emit('update:show', false);
    },
    getActClass(...args) {
      return getActClass(this.useTipClass, args);
    },
  },
};
</script>
<style scoped lang="scss">
// body:not(.press-act-explain-dialog--hidden) {
//   // .demo-wrap {
//   @import "./css/pvp-vertical.scss";
// }
.press__dialog {
  box-sizing: border-box;
}
</style>
<style scoped lang="scss" src="@TIP_STYLE_NAME"></style>
<style scoped lang="scss" src="./css/base.scss"></style>
