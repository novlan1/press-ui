<template>
  <div class="demo-wrap">
    <PressHorOwnerTheme
      title="奥巴马举办的比赛"
      :recommend-map="recommendMap"
      finished-text="没有更多了"
      @back="back"
      @clickMatch="clickMatch"
      @clickMatchButton="clickMatchButton"
      @update:loading="updateLoading"
      @loadMore="loadMore"
    />
  </div>
</template>
<script>
import PressHorOwnerTheme from 'src/packages/press-hor-owner-theme/press-hor-owner-theme.vue';
import {
  RECOMMEND_LIST,
} from 'src/packages/press-hor-owner-index/demo-helper/data';
import { routerBack } from 'src/utils/index';


export default {
  components: {
    PressHorOwnerTheme,
  },
  data() {
    return {
      recommendMap: {
        list: RECOMMEND_LIST,
        finished: false,
        loading: false,
        total: 999,
      },
    };
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    loadMoreRecommend() {
      const { recommendMap } = this;
      setTimeout(() => {
        recommendMap.list = recommendMap.list.concat(RECOMMEND_LIST);
        recommendMap.loading = false;
        recommendMap.finished =  recommendMap.list.length >= 30;
      }, 1000);
    },
    loadMore(sidebarIndex, tabIndex) {
      console.log('[loadMore]', sidebarIndex, tabIndex);
      this.loadMoreRecommend();
    },
    updateLoading(key, value) {
      this[key].loading = value;
    },
    back() {
      routerBack.call(this);
    },
    clickMatchButton(...args) {
      this.onGTip('[clickMatchButton]');
      console.log('[clickMatchButton]', args);
    },
    clickMatch(...args) {
      this.onGTip('[clickMatch]');
      console.log('[clickMatch]', args);
      this.recommendMap.list = [];
    },
  },
};
</script>
<style scoped lang="scss">
.demo-wrap {
  ::v-deep {
    // .press-owner {
    background: url(https://image-1251917893.file.myqcloud.com/Esports/hor/bg.png)
      no-repeat;
    background-size: 100% 100%;
  }
  // }
}
</style>
