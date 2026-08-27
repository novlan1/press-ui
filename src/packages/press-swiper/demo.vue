<template>
  <div class="demo-wrap">
    <div class="swiper-wrap">
      <swiper
        class="swiper"
        circular
        :indicator-dots="indicatorDots"
        :autoplay="autoplay"
        :interval="interval"
        :duration="duration"
      >
        <swiper-item>
          <div class="swiper-item swiper-item--big-red">
            A
          </div>
        </swiper-item>
        <swiper-item>
          <div class="swiper-item swiper-item--big-green">
            B
          </div>
        </swiper-item>
        <swiper-item>
          <div class="swiper-item swiper-item--big-blue">
            C
          </div>
        </swiper-item>
      </swiper>
    </div>

    <div class="swiper-list">
      <div class="swiper-list-cell swiper-list-cell--pd">
        <div class="uni-list-cell-db">
          指示点
        </div>
        <PressSwitch
          :checked="indicatorDots"
          size="20px"
          @change="changeIndicatorDots"
        />
      </div>
      <div class="swiper-list-cell swiper-list-cell--pd">
        <div class="uni-list-cell-db">
          自动播放
        </div>
        <PressSwitch
          :checked="autoplay"
          size="20px"
          @change="changeAutoplay"
        />
      </div>
    </div>

    <div class="slider-wrap">
      <div class="slider-item">
        <span>幻灯片切换时长(ms)</span>
        <span class="info">
          {{ duration }}
        </span>
      </div>
      <PressSlider
        :value="duration"
        :min="500"
        :max="2000"
        @change="durationChange"
      />
      <div class="slider-item">
        <span>自动播放间隔时长(ms)</span>
        <span class="info">
          {{ interval }}
        </span>
      </div>
      <PressSlider
        :value="interval"
        :min="2000"
        :max="10000"
        @change="intervalChange"
      />
    </div>
  </div>
</template>
<script>
import PressSlider from 'press-ui/press-slider/press-slider.vue';

// #ifdef H5
import PressSwiperItem from 'press-ui/press-swiper-item/press-swiper-item.vue';
import PressSwiper from 'press-ui/press-swiper/press-swiper.vue';
// #endif

import PressSwitch from 'press-ui/press-switch/press-switch.vue';


export default {
  components: {
    // #ifdef H5
    Swiper: PressSwiper,
    SwiperItem: PressSwiperItem,
    // #endif
    PressSwitch,
    PressSlider,
  },
  data() {
    return {
      background: ['color1', 'color2', 'color3'],
      indicatorDots: true,
      autoplay: true,
      interval: 2000,
      duration: 500,
    };
  },
  methods: {
    changeIndicatorDots() {
      this.indicatorDots = !this.indicatorDots;
    },
    changeAutoplay() {
      this.autoplay = !this.autoplay;
    },
    intervalChange(e) {
      console.log('e', e);
      this.interval = e;
    },
    durationChange(e) {
      console.log('e', e);
      this.duration = e;
    },
  },
};
</script>
<style lang="scss" scoped>
.demo-wrap {
  font-size: 14px;
}

.swiper-wrap {
  width: 345px;
  width: 100%;

  .swiper {
    height: 150px;
  }

  .swiper-item {
    display: block;
    height: 150px;
    line-height: 150px;
    text-align: center;

    &--big-blue {
      background: #007aff;
      color: #fff;
    }
    &--big-green {
      background: #09bb07;
      color: #fff;
    }
    &--big-red {
      background: #f76260;
      color: #fff;
    }
  }
}

.swiper-list {
  margin-top: 20px;
  margin-bottom: 0;

  .swiper-list-cell {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    &--pd {
      padding: 11px 15px;
    }
  }
}

.slider-wrap {
  padding: 0 50px;
  .slider-item {
    margin-top: 30px;
    margin-bottom: 20px;
    position: relative;
    .info {
      position: absolute;
      right: 10px;
    }
  }
}
</style>
