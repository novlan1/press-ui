<template>
  <div class="demo-wrap">
    <demo-block :title="t('basicUsage')">
      <PressDivider />
    </demo-block>

    <demo-block :title="t('hairline')">
      <PressDivider hairline />
    </demo-block>

    <demo-block :title="t('dashed')">
      <PressDivider dashed />
    </demo-block>

    <demo-block :title="t('contentPosition')">
      <PressDivider content-position="center">
        {{ t('text') }}
      </PressDivider>
      <PressDivider content-position="left">
        {{ t('text') }}
      </PressDivider>
      <PressDivider content-position="right">
        {{ t('text') }}
      </PressDivider>
    </demo-block>

    <demo-block :title="t('customProps')">
      <PressDivider
        content-position="center"
        text-color="#1989fa"
      >
        {{ t('textColor') }}
      </PressDivider>
      <PressDivider
        content-position="center"
        border-color="#1989fa"
      >
        {{ t('borderColor') }}
      </PressDivider>
      <PressDivider
        content-position="center"
        font-size="18"
      >
        {{ t('textSize') }}
      </PressDivider>
    </demo-block>

    <demo-block :title="t('customStyle')">
      <PressDivider
        content-position="center"
        custom-style="color: #1989fa; border-color: #1989fa; font-size: 18px;"
      >
        {{ t('text') }}
      </PressDivider>
    </demo-block>
  </div>
</template>
<script>
import PressDivider from 'press-ui/press-divider/press-divider.vue';


export default {
  i18n: {
    'zh-CN': {
      text: '文本',
      dashed: '虚线',
      withText: '展示文本',
      contentPosition: '内容位置',
      customStyle: '自定义样式',
      customProps: '自定义属性',
      hairline: '使用 hairline',
      textColor: '文本颜色',
      borderColor: 'border 颜色',
      textSize: '字体大小',
    },
    'en-US': {
      text: 'Text',
      dashed: 'Dashed',
      withText: 'With Text',
      contentPosition: 'Content Position',
      customStyle: 'Custom Style',
      customProps: 'Custom Props',
      hairline: 'Hairline',
      textColor: 'Text Color',
      borderColor: 'Border Color',
      textSize: 'Text Size',
    },
  },
  components: {
    PressDivider,
  },
  data() {
    return {

    };
  },
  methods: {

  },
};
</script>
<style scoped lang="scss">
</style>
