<template>
  <div class="demo-wrap">
    <demo-block :title="t('ellipsis')">
      <div class="press-ellipsis">
        {{ t('longText1') }}
      </div>

      <!-- 最多显示两行 -->
      <div class="press-multi-ellipsis--l2 line">
        {{ t('longText2') }}
      </div>

      <!-- 最多显示三行 -->
      <div class="press-multi-ellipsis--l3 line">
        {{ t('longText3') }}
      </div>
    </demo-block>

    <demo-block :title="t('hairline')">
      <!-- 上边框 -->
      <div class="press-hairline--top hairline">
        {{ t('hairlineTop') }}
      </div>

      <!-- 下边框 -->
      <div class="press-hairline--bottom hairline">
        {{ t('hairlineBottom') }}
      </div>

      <!-- 左边框 -->
      <div class="press-hairline--left hairline">
        {{ t('hairlineLeft') }}
      </div>

      <!-- 右边框 -->
      <div class="press-hairline--right hairline">
        {{ t('hairlineRight') }}
      </div>

      <!-- 上下边框 -->
      <div class="press-hairline--top-bottom hairline">
        {{ t('hairlineTopBottom') }}
      </div>

      <!-- 全边框 -->
      <div class="press-hairline--surround hairline">
        {{ t('hairlineSurround') }}
      </div>
    </demo-block>
  </div>
</template>
<script>
export default {
  i18n: {
    'zh-CN': {
      ellipsis: '文字省略',
      hairline: '1px 边框',
      longText1: '这是一段宽度限制 250px 的文字，后面的内容会省略。这是一段宽度限制 250px 的文字，后面的内容会省略。',
      longText2: '这是一段最多显示两行的文字，后面的内容会省略。这是一段最多显示两行的文字，后面的内容会省略。这是一段最多显示两行的文字，后面的内容会省略。这是一段最多显示两行的文字，后面的内容会省略。',
      longText3: '这是一段最多显示三行的文字，后面的内容会省略。这是一段最多显示三行的文字，后面的内容会省略。这是一段最多显示三行的文字，后面的内容会省略。这是一段最多显示三行的文字，后面的内容会省略。这是一段最多显示三行的文字，后面的内容会省略。这是一段最多显示三行的文字，后面的内容会省略。',
      hairlineTop: '上边框',
      hairlineBottom: '下边框',
      hairlineLeft: '左边框',
      hairlineRight: '右边框',
      hairlineTopBottom: '上下边框',
      hairlineSurround: '全边框',
    },
    'en-US': {
      ellipsis: 'Ellipsis',
      hairline: 'Hairline',
      longText1: 'This is a paragraph of text with a width limit of 250px. The following content will be omitted. This is a paragraph of text with a width limit of 250px. The following content will be omitted.',
      longText2: 'This is a paragraph of text that can be displayed in two lines at most, and the following content will be omitted. This is a paragraph of text that can be displayed in two lines at most, and the following content will be omitted. This is a paragraph of text that can be displayed in two lines at most, and the following content will be omitted.',
      longText3: 'This is a paragraph of text that can be displayed in three lines at most, and the following content will be omitted. This is a paragraph of text that can be displayed in three lines at most, and the following content will be omitted. This is a paragraph of text that can be displayed in three lines at most, and the following content will be omitted.',
      hairlineTop: 'Top',
      hairlineBottom: 'Bottom',
      hairlineLeft: 'Left',
      hairlineRight: 'Right',
      hairlineTopBottom: 'Top Bottom',
      hairlineSurround: 'Surround',
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
@import "press-ui/common/style/press/index.scss";
</style>
<style scoped lang="scss">
.line {
  margin: 16px 0 8px;
}
.hairline {
  padding: 12px;
  box-sizing: border-box;
  margin-top: 8px;
}
</style>
