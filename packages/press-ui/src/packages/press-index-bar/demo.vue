<template>
  <div
    class="demo-wrap"
    :style="wrapStyle"
  >
    <press-index-bar
      :sticky-offset-top="stickyOffsetTop"
      :window-top="44"
      @select="onSelect"
    >
      <div
        v-for="(item,index) of anchorList"
        :key="index"
      >
        <press-index-anchor :index="item" />
        <press-cell :title="t('text')" />
        <press-cell :title="t('text')" />
        <press-cell :title="t('text')" />
      </div>
    </press-index-bar>
  </div>
</template>
<script>
import PressCell from 'src/packages/press-cell/press-cell.vue';
import PressIndexBar from 'src/packages/press-index-bar/press-index-bar.vue';
import PressIndexAnchor from 'src/packages/press-index-anchor/press-index-anchor.vue';


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
.demo-wrap {
  height: 100%;
  /* #ifdef MP-ALIPAY */
  height: 100vh;
  /* #endif */
}
</style>

