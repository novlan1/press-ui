<template>
  <div class="demo-wrap">
    <demo-block :title="t('type')">
      <div>
        <PressLoadingPlus />
      </div>
      <div>
        <PressLoadingPlus
          type="spinner"
          :custom-style="customStyle"
        />
      </div>
    </demo-block>

    <demo-block :title="t('color')">
      <div>
        <PressLoadingPlus color="#1989fa" />
      </div>
      <div>
        <PressLoadingPlus
          type="spinner"
          color="#1989fa"
          :custom-style="customStyle"
        />
      </div>
    </demo-block>

    <demo-block :title="t('size')">
      <div>
        <PressLoadingPlus size="15" />
      </div>
      <div>
        <PressLoadingPlus
          type="spinner"
          size="38"
          :custom-style="customStyle"
        />
      </div>
    </demo-block>

    <demo-block :title="t('text')">
      <PressLoadingPlus size="24px">
        {{ t('loading') }}
      </PressLoadingPlus>
    </demo-block>

    <demo-block :title="t('vertical')">
      <PressLoadingPlus
        size="24px"
        vertical
      >
        {{ t('loading') }}
      </PressLoadingPlus>
    </demo-block>
  </div>
</template>
<script>
import PressLoadingPlus from 'press-ui/press-loading-plus/press-loading-plus.vue';


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
    PressLoadingPlus,
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

