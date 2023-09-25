<template>
  <div class="demo-wrap">
    <demo-block :title="t('basicUsage')">
      <press-cell
        :title="t('previewImage')"
        is-link
        @click="onShowImagePreview"
      />
    </demo-block>

    <demo-block :title="t('customType')">
      <press-cell
        :title="t('startPosition')"
        is-link
        @click="onShowCustomType('startPosition')"
      />
      <press-cell
        :title="t('showCloseIcon')"
        is-link
        @click="onShowCustomType('showCloseIcon')"
      />
      <press-cell
        :title="t('watchCloseEvent')"
        is-link
        @click="onShowCustomType('watchCloseEvent')"
      />
    </demo-block>

    <demo-block :title="t('asyncClose')">
      <press-cell
        :title="t('asyncClose')"
        is-link
        @click="onShowCustomType('asyncClose')"
      />
    </demo-block>

    <demo-block :title="t('componentUse')">
      <press-cell
        :title="t('componentUse')"
        is-link
        @click="onShowComponent"
      />
    </demo-block>

    <ImagePreviewComp
      :show="show"
      closeable
      :start-position="1"
      :images="images"
      :custom-style="customStyle"
      @close="show = false"
    />

    <ImagePreviewComp
      :id="FUNCTIONAL_ID_MAP.IMAGE_PREVIEW"
      :ref="FUNCTIONAL_ID_MAP.IMAGE_PREVIEW"
      mode="functional"
    />
  </div>
</template>
<script>
import ImagePreviewComp from 'src/packages/press-image-preview/press-image-preview.vue';
import PressCell from 'src/packages/press-cell/press-cell.vue';
import { imagePreview } from 'src/packages/press-image-preview/index';


const FUNCTIONAL_ID_MAP = {
  IMAGE_PREVIEW: 'press-image-preview',
};

export default {
  i18n: {
    'zh-CN': {
      previewImage: '预览图片',
      customType: '传入配置',
      startPosition: '指定初始位置',
      showCloseIcon: '展示关闭按钮',
      watchCloseEvent: '监听关闭事件',
      asyncClose: '异步关闭',
      componentUse: '组件调用',
      closeTip: '关闭',
    },
    'en-US': {
      previewImage: 'Preview Image',
      customType: 'Custom Config',
      startPosition: 'Set Start Position',
      showCloseIcon: 'Show Close Icon',
      watchCloseEvent: 'Watch Close Event',
      asyncClose: 'Async Close',
      componentUse: 'Component Use',
      closeTip: 'Close',
    },
  },
  components: {
    ImagePreviewComp,
    PressCell,
  },
  data() {
    let customStyle = '';
    // #ifdef H5
    customStyle = 'height: calc(100% - 44px);bottom: 0;top: auto;';
    // #endif

    return {
      show: false,
      customStyle,
      images: [
        'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_9f901ce42e18990883.jpeg',
        'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_8f25b9e2e75f6754ad.jpeg',
        'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_260c4142c7225b5f73.jpeg',
      ],
      FUNCTIONAL_ID_MAP,
    };
  },
  mounted() {
  },
  methods: {
    onShowImagePreview() {
      imagePreview({
        context: this,
        selector: `#${FUNCTIONAL_ID_MAP.IMAGE_PREVIEW}`,
        images: this.images,
        customStyle: this.customStyle,
      }).then(() => {
      });
    },
    onShowComponent() {
      this.show = true;
    },
    onShowCustomType(type) {
      let startPosition = undefined;
      let closeable = undefined;
      let asyncClose = undefined;

      if (type === 'startPosition') {
        startPosition = 1;
      } else if (type === 'showCloseIcon') {
        closeable = true;
      } else if (type === 'asyncClose') {
        asyncClose = true;
      }

      imagePreview({
        context: this,
        selector: `#${FUNCTIONAL_ID_MAP.IMAGE_PREVIEW}`,
        images: this.images,
        customStyle: this.customStyle,

        startPosition,
        closeable,
        asyncClose,
      }).then(() => {
        if (type === 'watchCloseEvent') {
          this.onGTip(this.t('closeTip'));
        }
      })
        .catch(({ context }) => {
          if (asyncClose) {
            setTimeout(() => {
              context.closeDialog();
            }, 2000);
          }
        });
    },
  },
};
</script>
<style scoped lang="scss">
</style>
