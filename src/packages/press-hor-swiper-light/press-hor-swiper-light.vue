<template>
  <div class="press-light">
    <div class="press-light__main">
      <div
        class="press-light__close"
        @click.stop="closeDialog"
      />
      <div class="press-light__title">
        精彩集锦
      </div>
      <div
        class="press-light__btn-prev"
        @click="slidePrev"
      />
      <div
        class="press-light__btn-next"
        @click="slideNext"
      />
      <div class="press-light__swiper">
        <z-swiper
          ref="zSwiper"
          :value="list"
          :options="options"
          @slideChange="slideChange"
        >
          <z-swiper-item
            v-for="(item,index) in list"
            :key="index"
            :custom-style="{width:'460px'}"
          >
            <div class="press-light__swiper-item">
              <div class="press-light__video-wrap">
                <video
                  :id="getVideoId(index)"
                  :src="item.video"
                  preload="auto"
                  :playsinline="true"
                  :x5-playsinline="true"
                  :webkit-playsinline="true"
                  name="media"
                  :autoplay="false"
                  loop
                  :muted="false"
                  :enable-progress-gesture="false"
                />
              </div>
              <div class="press-light__meta">
                <div class="press-light__avatar">
                  <img
                    v-lazy="item.avatar"
                    class="press-light__avatar-img"
                  >
                </div>
                <div class="press-light__meta-content">
                  <div class="press-light__meta-name">
                    {{ item.name }}
                  </div>
                  <div class="press-light__meta-time">
                    {{ item.time }}
                  </div>
                </div>
                <div class="press-light__source">
                  {{ item.source || '' }}
                </div>
              </div>
            </div>
          </z-swiper-item>
        </z-swiper>
      </div>
      <div class="press-light__pages">
        {{ activeIndex }} / {{ allSwiper }}
      </div>

      <div
        class="press-light__btn-confirm"
        @click.stop="onShare"
      >
        分享
      </div>
    </div>
  </div>
</template>
<script>
import ZSwiper from '@zebra-ui/swiper/components/z-swiper/z-swiper.vue';
import ZSwiperItem from '@zebra-ui/swiper/components/z-swiper-item/z-swiper-item.vue';


export default {
  components: {
    ZSwiper,
    ZSwiperItem,
  },
  props: {
    list: {
      type: Array,
      default: () => ([]),
      required: false,
    },
  },
  data() {
    return {
      options: {
        effect: 'carousel',
        init: false,
      },
      activeIndex: 0,
      allSwiper: 0,
    };
  },
  mounted() {
    this.allSwiper = this.list.length;
  },
  methods: {
    slideNext() {
      this.$refs.zSwiper.swiper.slideNext();
    },
    slidePrev() {
      this.$refs.zSwiper.swiper.slidePrev();
    },
    slideChange() {
      this.activeIndex = this.$refs.zSwiper.swiper.activeIndex + 1;
      this.onPauseAll();
    },
    closeDialog() {
      this.$emit('close');
    },
    onShare() {
      this.$emit('share');
    },
    getVideoId(index) {
      return `press-hor-swiper-video-${index}`;
    },
    onPauseAll() {
      // #ifdef H5
      this.list.forEach((item, index) => {
        const id = this.getVideoId(index);
        const video = document.querySelector(`#${id} video`);
        // console.log('[video]', video);
        video.pause();
      });
      // #endif
    },
  },
};
</script>
<style lang="scss" scoped src="./css/index.scss"></style>
