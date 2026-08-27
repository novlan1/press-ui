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

    <PressDialog
      use-slot
      title="Press UI 交流群"
      :show="showDialog"
      custom-style="top: 48%"
      @close="onClose"
      @confirm="onClose"
    >
      <div class="press-about__dialog-desc">
        QQ扫码加入
      </div>
      <img
        :src="helpConfig.groupQRCode"
        :show-menu-by-longpress="true"
        class="press-about__dialog-image"
        mode="aspectFit"
      >
    </PressDialog>
  </div>
</template>

<script>
import { routerPush } from '../common/utils/router';
import PressDialog from '../press-dialog/press-dialog.vue';


export default {
  name: 'PressAbout',
  components: {
    PressDialog,
  },
  props: {
    helpConfig: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      showDialog: false,
    };
  },
  mounted() {
  },
  methods: {
    jumpToIntroduce() {
      const url = '/pages/index/introduce';
      routerPush.call(this, url);
    },
    showGroupQrCode() {
      this.showDialog = true;
    },
    clickCell(item) {
      if (item.callback === 'INTRODUCE') {
        this.jumpToIntroduce();
      } else if (item.callback === 'GROUP_QRCODE') {
        this.showGroupQrCode();
      }
    },
    onClose() {
      this.showDialog = false;
    },
  },
};
</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
