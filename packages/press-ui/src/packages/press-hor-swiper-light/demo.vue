<template>
  <div class="demo-wrap">
    <demo-block
      :title="t('basicUsage')"
    >
      <press-cell
        title="Show"
        is-link
        @click="onShowDialog"
      />
      <!-- <press-cell
        :title="t('custom')"
        is-link
        @click="onCustom"
      /> -->
    </demo-block>

    <PressHorSwiperLight
      v-if="showDialog"
      :list="list"
      @close="close"
      @share="share"
    />
  </div>
</template>
<script>
import PressCell from 'press-ui/press-cell/press-cell.vue';
import PressHorSwiperLight from 'press-ui/press-hor-swiper-light/press-hor-swiper-light.vue';
import { MOCK_LIST } from 'src/packages/press-hor-swiper-light/demo-helper/data';


export default {
  components: {
    PressCell,
    PressHorSwiperLight,
  },
  data() {
    return {
      showDialog: true,
      list: MOCK_LIST,
    };
  },
  methods: {
    onShowDialog() {
      this.showDialog = true;
    },
    close() {
      this.showDialog = false;
    },
    share() {
      this.onGTip('[share]');
    },
  },
};
</script>
<style scoped lang="scss">
</style>
