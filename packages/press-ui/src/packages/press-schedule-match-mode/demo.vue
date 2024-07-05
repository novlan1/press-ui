<template>
  <div class="demo-wrap">
    <PressScheMatchMode
      :all-sche-list="allScheList"
      :is-admin="isAdmin"
      :my-sche-list="myScheList"
      :loading="loading"
      @clickRoundTab="clickRoundTab"
      @clickSche="clickSche"
      @scrollToLower="scrollToLower"
    />
  </div>
</template>
<script>
import PressScheMatchMode from 'press-ui/press-schedule-match-mode/press-schedule-match-mode.vue';
import { MOCK_ALL_SCHE_LIST, MOCK_MY_SCHE_LIST } from 'src/packages/press-schedule-match-mode/demo-helper/data';


export default {
  components: {
    PressScheMatchMode,
  },
  data() {
    return {
      // allScheList: [],
      // myScheList: [],
      allScheList: MOCK_ALL_SCHE_LIST,
      myScheList: MOCK_MY_SCHE_LIST,
      isAdmin: true,
      loadTime: 0,
      loading: false,
    };
  },
  methods: {
    clickRoundTab() {
      this.onGTip('clickRoundTab');
      setTimeout(() => {
        this.myScheList = [];
      }, 1000);
    },
    clickSche() {
      setTimeout(() => {
        this.allScheList = [];
      }, 1000);
      this.onGTip('clickSche');
    },
    scrollToLower() {
      if (this.loadTime > 5) return;
      this.loading = true;
      this.loadTime += 1;

      setTimeout(() => {
        this.allScheList = [[[
          ...this.allScheList[0][0],
          ...MOCK_ALL_SCHE_LIST[0][0],
        ]]];
        this.loading = false;
      }, 1200 - this.loadTime * 100);
    },
  },
};
</script>
<style scoped lang="scss">
.demo-wrap::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: url(https://image-1251917893.file.myqcloud.com/Esports/new/user/fullpage-light-bg.png)
    no-repeat;
  background-size: 100%;
}
</style>
