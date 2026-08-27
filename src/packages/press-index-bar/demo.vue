<template>
  <div
    class="demo-wrap"
    :style="wrapStyle"
  >
    <PressIndexBar
      :sticky-offset-top="stickyOffsetTop"
      @select="onSelect"
    >
      <div
        v-for="(item,index) of anchorList"
        :key="index"
      >
        <PressIndexAnchor :index="item" />
        <PressCell :title="t('text')" />
        <PressCell :title="t('text')" />
        <PressCell :title="t('text')" />
      </div>
    </PressIndexBar>
  </div>
</template>
<script>
import PressCell from 'press-ui/press-cell/press-cell.vue';
import PressIndexAnchor from 'press-ui/press-index-anchor/press-index-anchor.vue';
import PressIndexBar from 'press-ui/press-index-bar/press-index-bar.vue';


function getEN() {
  const arr = [];

  for (let i = 65; i < 91; i++) {
    arr.push(String.fromCharCode(i));
  }

  return arr;
}
const ANCHOR_LIST = getEN();

export default {
  i18n: {
    'zh-CN': {
      text: '文本',
      customIndexList: '自定义索引列表',
    },
    'en-US': {
      text: 'Text',
      customIndexList: 'Custom Index List',
    },
  },

  components: {
    PressCell,
    PressIndexBar,
    PressIndexAnchor,
  },
  data() {
    let wrapStyle = '';
    let stickyOffsetTop = 0;
    // #ifdef H5
    // wrapStyle = 'height: 100%; overflow-y: auto;';
    stickyOffsetTop = 44;
    // #endif

    // #ifndef H5
    wrapStyle = '';
    // #endif
    return {
      anchorList: ANCHOR_LIST,

      wrapStyle,
      stickyOffsetTop,
    };
  },
  mounted() {
  },
  methods: {
    onSelect(index) {
      console.log('[onSelect]: ', index);
    },
  },
};
</script>
<style scoped lang="scss">
</style>

