<template>
  <div class="press-about">
    <div class="press-about__header">
      <image
        class="press-about__banner"
        :src="helpConfig.banner"
        mode="aspectFill"
      />
      <div class="press-about__slogan">
        <div class="press-about__title">
          {{ helpConfig.title }}
        </div>
        <div class="press-about__subtitle">
          {{ helpConfig.description }}
        </div>
      </div>
    </div>

    <div class="press-about__main">
      <div class="press-about__help">
        <div
          v-for="(item, index) of helpConfig.cellList"
          :key="index"
          class="press-about__cell"
          @click="clickCell(item)"
        >
          <div class="press-about__cell-left">
            <img
              :src="item.img"
              class="press-about__cell-img"
            >
          </div>
          <div class="press-about__cell-right">
            <div class="press-about__cell-title">
              {{ item.title }}
            </div>
            <div class="press-about__cell-desc">
              {{ item.desc }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <PressDialogComp
      id="tip-match-comm-tips-dialog"
      ref="tip-match-comm-tips-dialog"
    />
  </div>
</template>

<script>
import PressDialog from '../press-dialog';
import PressDialogComp from '../press-dialog/press-dialog.vue';
import { routerPush } from '../common/utils/router';


export default {
  name: 'PressAbout',
  components: {
    PressDialogComp,
  },
  props: {
    helpConfig: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
    jumpToIntroduce() {
      const url =  '/pages/index/introduce';
      routerPush.call(this, url);
    },
    showGroupQrCode() {
      PressDialog.show({
        context: this,
        title: 'Press UI 交流群',
        content: 'QQ扫码加入',
        confirmText: '',
        src: this.helpConfig.groupQRCode,
      });
    },
    clickCell(item) {
      if (item.callback === 'INTRODUCE') {
        this.jumpToIntroduce();
      } else if (item.callback === 'GROUP_QRCODE') {
        this.showGroupQrCode();
      }
    },
  },
};
</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
