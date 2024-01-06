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
      <PressSUBTITLE
        :show.sync="show"
        :hide-tip-style.sync="hideTipStyle"
        :use-tip-class.sync="useTipClass"
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
// eslint-disable-next-line import/no-unresolved
import PressSUBTITLE from 'src/packages/press-COMP/press-COMP.vue';
import { getActCustomStyleMixin } from 'src/utils/mixin/act-custom-style.ts';
// eslint-disable-next-line import/no-unresolved
import { STYLE_LIST } from 'src/packages/press-COMP/demo-helper/style-list';


export default {
  components: {
    PressSUBTITLE,
    ActDemo,
  },
  mixins: [
    getActCustomStyleMixin('PressSUBTITLE', STYLE_LIST),
  ],
  data() {
    return {
      show: true,
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
