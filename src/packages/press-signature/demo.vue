<template>
  <div class="demo-wrap">
    <demo-block
      :title="t('basicUsage')"
      :section-style="sectionStyle"
      :custom-style="customStyle"
    >
      <PressSignature
        ref="pressSignature"
        :pen-color="customInfo['pen-color']"
        :line-width="customInfo['line-width']"
        :background-color="customInfo['background-color']"

        @submit="onSubmit"
        @clear="onClear"
      />

      <div class="image-wrap">
        <PressImage
          v-if="image"
          :src="image"
          :width="canvasWidth"
          :height="canvasHeight"
        />
      </div>
    </demo-block>


    <PressGrid
      clickable
      :column-num="3"
    >
      <PressGridItem
        :text="t('penColor')"
        icon="edit"
        @click="custom({'pen-color': '#ff0000'})"
      />
      <PressGridItem
        :text="t('lineWidth')"
        icon="font-o"
        @click="custom({'line-width': 6})"
      />
      <PressGridItem
        :text="t('backgroundColor')"
        icon="photo-o"
        @click="custom({'background-color': '#eee'})"
      />
    </PressGrid>
  </div>
</template>
<script>
import PressGridItem from 'press-ui/press-grid-item/press-grid-item.vue';
import PressGrid from 'press-ui/press-grid/press-grid.vue';
import PressImage from 'press-ui/press-image/press-image.vue';
import PressSignature from 'press-ui/press-signature/press-signature.vue';


const DEFAULT_CONFIG = {
  'pen-color': '#000',
  'line-width': 3,
  'background-color': '#fff',
};

export default {
  i18n: {
    'zh-CN': {
      penColor: '自定义颜色',
      lineWidth: '自定义线宽',
      backgroundColor: '自定义背景颜色',
    },
    'en-US': {
      penColor: 'Pen Color',
      lineWidth: 'Line Width',
      backgroundColor: 'Background Color',
    },
  },
  components: {
    PressSignature,
    PressImage,
    PressGrid,
    PressGridItem,
  },
  data() {
    return {
      image: '',
      canvasWidth: 'calc(100vw - 16px)',
      canvasHeight: 200,
      customStyle: 'background: transparent',
      sectionStyle: 'padding: 0 0',

      customInfo: {
        ...DEFAULT_CONFIG,
      },
    };
  },
  methods: {
    onSubmit(data) {
      console.log('[onSubmit]', data);
      const { image, width, height } = data;
      this.image = image;
      this.canvasWidth = width;
      this.canvasHeight = height;
    },
    onClear() {

    },
    custom(info) {
      this.customInfo = {
        ...DEFAULT_CONFIG,
        ...info,
      };
      setTimeout(() => {
        this.$refs.pressSignature.clear();
      });
    },
  },
};
</script>
<style scoped lang="scss">
.demo-wrap {
  max-height: calc(100vh - 100px);
}
.image-wrap {
  padding: 0 8px;
}
</style>
