<template>
  <div
    class="demo-wrap"
    :class="curGameClass"
  >
    <ActDemo
      :custom-style-str="styleMap[customStyle].label"
      :show.sync="show"
      :hide-tip-style.sync="hideTipStyle"
      :use-tip-class.sync="useTipClass"
      @onCustom="onCustom"
    >
      <PressActExplainDialog
        :show.sync="show"
        :show-button="true"
        :hide-tip-style.sync="hideTipStyle"
        :use-tip-class.sync="useTipClass"
        :props-data="propsData"
        :hide-base-style="customStyle !== CUSTOM_STYLE_DEFAULT"
      />
    </ActDemo>

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
import ActDemo from 'src/pages/components/act-demo/act-demo.vue';
import PressActExplainDialog from 'press-ui/press-act-explain-dialog/press-act-explain-dialog.vue';
import { getActCustomStyleMixin } from 'src/utils/mixin/act-custom-style.ts';
import { STYLE_LIST } from 'src/packages/press-act-explain-dialog/demo-helper/style-list';


const PROPS_DATA = {
  title: '标题',
  content: Array.from({ length: 10 }).map((_, index) => `${index + 1}. Press UI 是一套支持 uni-app、普通 Vue 项目，同时兼容 Vue2 和 Vue3 的组件库`)
    .join('<br/>'),
};


export default {
  components: {
    PressActExplainDialog,
    ActDemo,
  },
  mixins: [
    getActCustomStyleMixin('PressActExplainDialog', STYLE_LIST, 'pvp-vertical'),
  ],
  data() {
    return {
      show: true,
      propsData: PROPS_DATA,
    };
  },

  mounted() {
  },
  methods: {
  },
};
</script>
<style scoped lang="scss">
</style>
