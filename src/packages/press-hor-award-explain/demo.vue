<template>
  <div class="demo-wrap">
    <demo-block :title="t('basicUsage')">
      <press-cell
        title="展示"
        is-link
        @click="show = true"
      />

      <!-- #ifdef H5 -->
      <ToggleHeader />
      <!-- #endif -->
    </demo-block>

    <PressHorAwardExplain
      v-if="show"
      :award-list="awardList"
      @close="close"
    />
  </div>
</template>
<script>
import PressHorAwardExplain from 'src/packages/press-hor-award-explain/press-hor-award-explain.vue';

const AWARD_LIST = Array.from({ length: 5 }).map(() => ({
  title: '1-20名',
  subItems: Array.from({ length: 5 }).map(() => ({
    pic: 'https://igame-10037599.cos.ap-shanghai.myqcloud.com/5edb48ca-de79-82c5-4b8f-b6af28124622.jpg',
    name: '奖励名称',
    description: '奖励描述奖励描述奖励描述奖励描述奖励描述奖励描述奖励描述奖励描述奖励描述奖励描述',
    label: '官方奖励',
  })),
}));


export default {
  components: {
    PressHorAwardExplain,
  },
  data() {
    return {
      show: false,
      awardList: AWARD_LIST,
    };
  },
  methods: {
    close() {
      this.show = false;
    },
  },
};
</script>
<style scoped lang="scss">
</style>
