<template>
  <div class="demo-wrap demo-wrap--gap">
    <demo-block :title="t('basicUsage')">
      <press-divider />
    </demo-block>

    <demo-block :title="t('hairline')">
      <press-divider hairline />
    </demo-block>

    <demo-block :title="t('dashed')">
      <press-divider dashed />
    </demo-block>

    <demo-block :title="t('contentPosition')">
      <press-divider content-position="center">
        {{ t('text') }}
      </press-divider>
      <press-divider content-position="left">
        {{ t('text') }}
      </press-divider>
      <press-divider content-position="right">
        {{ t('text') }}
      </press-divider>
    </demo-block>

    <demo-block :title="t('customProps')">
      <press-divider
        content-position="center"
        text-color="#1989fa"
      >
        {{ t('textColor') }}
      </press-divider>
      <press-divider
        content-position="center"
        border-color="#1989fa"
      >
        {{ t('borderColor') }}
      </press-divider>
      <press-divider
        content-position="center"
        font-size="18"
      >
        {{ t('textSize') }}
      </press-divider>
    </demo-block>

    <demo-block :title="t('customStyle')">
      <press-divider
        content-position="center"
        custom-style="color: #1989fa; border-color: #1989fa; font-size: 18px;"
      >
        {{ t('text') }}
      </press-divider>
    </demo-block>
  </div>
</template>
<script>
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
