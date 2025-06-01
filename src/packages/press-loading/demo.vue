<template>
  <div class="demo-wrap">
    <demo-block :title="t('type')">
      <div>
        <PressLoading />
      </div>
      <div>
        <PressLoading
          type="circular-tdesign"
          :custom-style="customStyle"
        />
      </div>
      <div>
        <PressLoading
          type="spinner"
          :custom-style="customStyle"
        />
      </div>
    </demo-block>

    <demo-block :title="t('color')">
      <div>
        <PressLoading color="#1989fa" />
      </div>
      <div>
        <PressLoading
          color="#07c160"
          type="circular-tdesign"
          :custom-style="customStyle"
        />
      </div>
      <div>
        <PressLoading
          type="spinner"
          color="#1989fa"
          :custom-style="customStyle"
        />
      </div>
    </demo-block>

    <demo-block :title="t('size')">
      <div>
        <PressLoading size="15" />
      </div>
      <div>
        <PressLoading
          size="20"
          type="circular-tdesign"
          :custom-style="customStyle"
        />
      </div>
      <div>
        <PressLoading
          type="spinner"
          size="38"
          :custom-style="customStyle"
        />
      </div>
    </demo-block>

    <demo-block :title="t('text')">
      <PressLoading size="24px">
        {{ t('loading') }}
      </PressLoading>
    </demo-block>

    <demo-block :title="t('vertical')">
      <PressLoading
        size="24px"
        vertical
      >
        {{ t('loading') }}
      </PressLoading>
    </demo-block>
  </div>
</template>
<script>
import PressLoading from 'press-ui/press-loading/press-loading.vue';


export default {
  i18n: {
    'zh-CN': {
      type: '加载类型',
      text: '加载文案',
      size: '自定义大小',
      color: '自定义颜色',
      vertical: '垂直排列',
      textColor: '自定义文本颜色',
    },
    'en-US': {
      type: 'Type',
      text: 'Text',
      size: 'Size',
      color: 'Color',
      vertical: 'Vertical',
      textColor: 'Text Color',
    },
  },
  components: {
    PressLoading,
  },
  data() {
    return {
      isOpen: false,
      customStyle: 'margin-left: 20px;',
    };
  },
  methods: {
    onSwitchChange() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style scoped lang="scss">
.demo-wrap {
  ::v-deep .section-content {
    display: flex;
    align-items: center;
  }
}
</style>

