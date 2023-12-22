<template>
  <div class="about">
    <div class="about__header">
      <image
        class="about__banner"
        :src="banner"
        mode="aspectFill"
      />
      <div class="about__slogan">
        <div class="about__title">
          Press UI
        </div>
        <div class="about__subtitle">
          灵活、易用、丰富的跨端组件库
        </div>
      </div>
    </div>

    <div class="about__main">
      <div class="about__help">
        <div
          v-for="(item, index) of helpConfig.cellList"
          :key="index"
          class="cell"
          @click="clickCell(item)"
        >
          <div class="cell__left">
            <img
              :src="item.img"
              class="cell__img"
            >
          </div>
          <div class="cell_right">
            <div class="cell__title">
              {{ item.title }}
            </div>
            <div class="cell__desc">
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
import PressDialog from 'src/packages/press-dialog';
import PressDialogComp from 'src/packages/press-dialog/press-dialog.vue';
import { fetchData, routerPush } from 'src/utils/index';
import { DEFAULT_HELPER_CONFIG, HELP_DATA_URL } from './help-config';


export default {
  components: {
    PressDialogComp,
  },
  data() {
    return {
      helpConfig: DEFAULT_HELPER_CONFIG,
      banner: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/12/own_mike_b13775d107c0b0a6b5.jpg',
    };
  },
  mounted() {
    this.getHelpData();
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
    getHelpData() {
      fetchData(HELP_DATA_URL).then((data) => {
        this.helpConfig = data;
      });
    },
  },
};
</script>
<style>
page {
  background: #f7f8fa;
}
</style>
<style scoped lang="scss">
.about {
  &__header {
    height: 500rpx;
    position: relative;
  }

  &__banner {
    display: block;
    width: 100%;
    height: 500rpx;
  }

  &__slogan {
    position: absolute;
    left: 0;
    width: 100%;
    bottom: 40rpx;
    color: #fff;
    padding: 0 50rpx;
    text-align: center;
    box-sizing: border-box;
  }

  &__title {
    font-size: 42rpx;
    font-weight: bold;
    margin-bottom: 10rpx;
  }

  &__subtitle {
    font-size: 30rpx;
  }

  &__main {
    padding: 36rpx 0;
    border-top-left-radius: 32rpx;
    border-top-right-radius: 32rpx;
    box-sizing: border-box;
  }
}

.cell {
  display: flex;
  align-items: center;
  background: #fff;
  padding: 12px 20px;
  margin: 0 12px 12px;
  box-sizing: border-box;

  &__left {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 25px;
  }
  &__img {
    width: 100%;
    height: 100%;
  }
  &__title {
    font-size: 16px;
    color: #09134e;
    height: 20px;
    line-height: 20px;
  }
  &__desc {
    font-size: 12px;
    margin-top: 6px;
    color: #9299c6;
  }
}
</style>
