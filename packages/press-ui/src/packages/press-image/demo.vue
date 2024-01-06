<template>
  <div class="demo-wrap">
    <demo-block :title="t('basicUsage')">
      <PressImage
        :show-loading="true"
        :src="src"
        width="100"
        height="100"
        @click="click"
      />
    </demo-block>

    <demo-block :title="t('mode')">
      <PressRow
        v-for="(row, rowIndex) of MODE_LIST"
        :key="getIndex(rowIndex, 'row')"
      >
        <PressCol
          v-for="(col, colIndex) of row"
          :key="getIndex(colIndex, 'col')"
          :span="col.span"
        >
          <div class="demo-grid">
            <PressImage
              :show-loading="true"
              width="100"
              height="100"
              :src="src"
              :mode="col.mode"
              @click="click"
            />
            <span
              class="image-title"
              :class="col.titleClass"
            >{{ col.mode }}</span>
          </div>
        </PressCol>
      </PressRow>
    </demo-block>

    <demo-block :title="t('round')">
      <PressRow
        v-for="(row, rowIndex) of MODE_LIST"
        :key="getIndex(rowIndex, 'row')"
      >
        <PressCol
          v-for="(col, colIndex) of row"
          :key="getIndex(colIndex, 'col')"
          :span="col.span"
        >
          <div class="demo-grid">
            <PressImage
              :show-loading="true"
              width="100"
              height="100"
              :src="src"
              round
              :mode="col.mode"
              @click="click"
            />
            <span
              class="image-title"
              :class="col.titleClass"
            >{{ col.mode }}</span>
          </div>
        </PressCol>
      </PressRow>
    </demo-block>

    <demo-block :title="t('loading')">
      <PressRow>
        <PressCol
          :span="8"
        >
          <div class="demo-grid">
            <PressImage
              :show-loading="true"
              width="100"
              height="100"
            />

            <span class="image-title">{{ t('defaultTip') }}</span>
          </div>
        </PressCol>

        <PressCol
          :span="8"
        >
          <div class="demo-grid">
            <PressImage
              :show-loading="true"
              width="100"
              height="100"
            >
              <template #loading>
                <PressLoadingPlus
                  type="spinner"
                  size="20"
                />
              </template>
            </PressImage>

            <span class="image-title">{{ t('customTip') }}</span>
          </div>
        </PressCol>
      </PressRow>
    </demo-block>


    <demo-block :title="t('error')">
      <PressRow>
        <PressCol
          :span="8"
        >
          <div class="demo-grid">
            <PressImage
              :show-loading="true"
              src="src"
              width="100px"
              height="100px"
            />
            <span class="image-title">{{ t('defaultTip') }}</span>
          </div>
        </PressCol>

        <PressCol
          :span="8"
        >
          <div class="demo-grid">
            <PressImage
              :show-loading="true"
              src="src"
              width="100px"
              height="100px"
            >
              <template #error>
                <span
                  style="font-size: 14px;"
                >加载失败</span>
              </template>
            </PressImage>
            <span
              class="image-title"
            >{{ t('customTip') }}</span>
          </div>
        </PressCol>
      </PressRow>
    </demo-block>

    <ImagePreview
      ref="imagePreviewRef"
      mode="functional"
    />
  </div>
</template>
<script>
import PressImage from 'src/packages/press-image/press-image.vue';
import PressCol from 'src/packages/press-col/press-col.vue';
import PressLoadingPlus from 'src/packages/press-loading-plus/press-loading-plus.vue';
import PressRow from 'src/packages/press-row/press-row.vue';
import ImagePreview from 'src/packages/press-image-preview/press-image-preview.vue';
import { imagePreview } from 'src/packages/press-image-preview/index';


const MODE_LIST = [
  [
    {
      mode: 'aspectFit',
      titleClass: 'image-title--gap',
      span: 8,
    },
    {
      mode: 'aspectFill',
      titleClass: 'image-title--gap',
      span: 8,
    },
    {
      mode: 'center',
      titleClass: '',
      span: 8,
    },
  ],
  [
    {
      mode: 'widthFix',
      titleClass: 'image-title--gap',
      span: 8,
    },
    {
      mode: 'heightFix',
      titleClass: 'image-title--long',
      span: 16,
    },
  ],
];


export default {
  i18n: {
    'zh-CN': {
      error: '加载失败提示',
      loading: '加载中提示',
      defaultTip: '默认提示',
      customTip: '自定义提示',
      mode: '模式',
      round: '圆形',
    },
    'en-US': {
      error: 'Error',
      loading: 'Loading',
      defaultTip: 'Default',
      customTip: 'Custom',
      mode: 'Mode',
      round: 'Round',
    },
  },
  components: {
    PressCol,
    PressRow,
    PressImage,
    PressLoadingPlus,
    ImagePreview,
  },
  data() {
    return {
      src: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/10/own_mike_a17f94292a34e9f644.jpeg',
      MODE_LIST,
    };
  },
  methods: {
    click() {
      console.log('[click]');
      imagePreview({
        selector: '#imagePreviewRef',
        images: [this.src],
      }).then(() => {
      });
    },
    getIndex(a, b) {
      return `${a}-${b}`;
    },
  },
};
</script>
<style scoped lang="scss">
.demo-grid {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.image-title {
  text-align: center;
  width: 100px;
  margin-top: 16px;
  color: #646566;
  margin-bottom: 10px;

  &--long {
    width: 132px;
  }

  &--gap {
    margin-bottom: 32px;
  }
}
</style>
