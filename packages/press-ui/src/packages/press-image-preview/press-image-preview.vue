<template>
  <PressOverlay
    :show="innerShow"
    :custom-style="`background: rgba(0, 0, 0, 0.9);z-index: ${getPropOrData('zIndex')};`"
    @click="onClickOverlay"
  >
    <div
      class="press-image-preview"
      :style="imagePreviewStyle"
      :class="[getPropOrData('customClass')]"
    >
      <div
        v-if="getPropOrData('showIndex')"
        class="press-image-preview__index"
      >
        {{ active+1 }}/{{ getPropOrData('images').length }}
      </div>

      <div
        :class="[
          'press-image-preview__close-icon',
          `press-image-preview__close-icon--${getPropOrData('closeIconPosition')}`
        ]"
        @click.stop="onClose"
      >
        <PressIconPlus
          v-if="getPropOrData('closeable')"
          :name="getPropOrData('closeIcon')"
        />
      </div>

      <swiper
        class="press-image-preview__swipe"
        :current="active"
        @change="onChange"
      >
        <swiper-item
          v-for="(image, index) of getPropOrData('images')"
          :key="index"
          class="press-image-preview__swipe-item"
          @click="onClickSwiperItem"
        >
          <div
            class="press-image-preview__image-wrap"
          >
            <img
              class="press-image-preview__image"
              :src="image"
              fit="contain"
            >
          </div>
        </swiper-item>
      </swiper>
      <div />
    </div>
  </PressOverlay>
</template>
<script>
import PressOverlay from '../press-overlay/press-overlay.vue';
import PressIconPlus from '../press-icon-plus/press-icon-plus.vue';
import { functionalMixin } from '../mixins/functional';
import { nextTick } from '../common/utils/system';
import { SwiperPureMixin } from '../mixins/pure/swiper';


const imagePreviewProps = {
  images: {
    type: Array,
    default: () => [],
  },
  startPosition: {
    type: [Number, String],
    default: 0,
  },
  transition: {
    type: String,
    default: 'press-fade',
  },
  showIndex: {
    type: Boolean,
    default: true,
  },
  asyncClose: {
    type: Boolean,
    default: false,
  },
  customStyle: {
    type: String,
    default: '',
  },
  customClass: {
    type: String,
    default: '',
  },
  closeable: {
    type: Boolean,
    default: false,
  },
  closeIcon: {
    type: String,
    default: 'clear',
  },
  closeIconPosition: {
    type: String,
    default: 'top-right',
  },
  zIndex: {
    type: Number,
    default: 10,
  },
};

export default {
  name: 'PressImagePreview',
  components: {
    PressOverlay,
    PressIconPlus,
  },
  mixins: [functionalMixin(imagePreviewProps), SwiperPureMixin],
  props: {
    ...imagePreviewProps,
  },
  emits: ['close', 'change'],
  data() {
    return {
      active: 0,
    };
  },
  computed: {
    imagePreviewStyle() {
      return this.getPropOrData('customStyle');
    },
  },
  watch: {
    startPosition: 'setActive',
    show(val) {
      if (val) {
        this.setActive(+this.getPropOrData('startPosition'));
        nextTick(() => {
          // this.resize();
          // this.$refs.swipe.swipeTo(+this.startPosition, { immediate: true });
        });
      } else {
        this.$emit('close', {
          index: this.active,
          url: this.getPropOrData('images')[this.active],
        });
      }
    },
  },
  mounted() {
  },
  methods: {
    showImagePreview(options) {
      this.showDialog(options);
      this.setActive(options.startPosition || 0);
    },
    onClosed() {
    },
    onChange(event) {
      // swiper包装了event，可以用event.detail
      const { current = 0 } = event.detail;
      this.setActive(current);
    },
    emitClose() {
      if (!this.getPropOrData('asyncClose')) {
        this.$emit('close');
        this.innerShow = false;
        this.promiseCallback('confirm');
      } else {
        this.promiseCallback('cancel');
      }
    },
    onClose() {
      this.emitClose();
    },
    onClickOverlay() {
      this.onClose();
    },
    onClickSwiperItem() {
      this.onClose();
    },
    setActive(active) {
      if (active !== this.active) {
        this.active = active;
        this.$emit('change', active);
      }
    },
  },
};

</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
