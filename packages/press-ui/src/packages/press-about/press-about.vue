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
<style scoped lang="scss">
.press-about {
  &__header {
    height: 250px;
    position: relative;
  }

  &__banner {
    display: block;
    width: 100%;
    height: 250px;
  }

  &__slogan {
    position: absolute;
    left: 0;
    width: 100%;
    bottom: 20px;
    color: #fff;
    padding: 0 25px;
    text-align: center;
    box-sizing: border-box;
  }

  &__title {
    font-size: 21px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  &__subtitle {
    font-size: 15px;
  }

  &__main {
    padding: 18px 0;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    box-sizing: border-box;
  }

  &__cell {
    display: flex;
    align-items: center;
    background: #fff;
    padding: 12px 20px;
    margin: 0 12px 12px;
    box-sizing: border-box;

    &-left {
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 25px;
    }
    &-img {
      width: 100%;
      height: 100%;
    }
    &-title {
      font-size: 16px;
      color: #09134e;
      height: 20px;
      line-height: 20px;
    }
    &-desc {
      font-size: 12px;
      margin-top: 6px;
      color: #9299c6;
    }
  }
}
</style>
