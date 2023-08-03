<template>
  <div class="demo-wrap">
    <PressHorMatchIndex
      :banner-list="bannerList"
      :brand-list="brandList"
      :online-tab-list="onlineTabList"
      :online-match-map="onlineMatchMap"
      :recommend-match-list="recommendMatchList"
      :offline-match-list="offlineMatchList"
      @back="onBack"
    />
  </div>
</template>
<script>
import PressHorMatchIndex from 'src/packages/press-hor-match-index/press-hor-match-index.vue';
import {
  bannerList,
  brandList,
  recommendMatchList,
  onlineTabList,
  onlineMatchMap,
  offlineMatchList,
} from 'src/packages/press-hor-match-index/demo-helper/data';

export default {
  components: {
    PressHorMatchIndex,
  },
  data() {
    return {
      bannerList,
      brandList,
      recommendMatchList,
      onlineTabList,
      onlineMatchMap,
      offlineMatchList,
    };
  },
  methods: {
    onBack() {
      uni.navigateBack();
    },

  },
};
</script>
<style scoped lang="scss">
</style>
