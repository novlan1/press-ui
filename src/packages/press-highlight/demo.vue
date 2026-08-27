<template>
  <div class="demo-wrap">
    <demo-block :title="t('basicUsage')">
      <PressHighlight
        :keywords="t('keywords1')"
        :source-string="t('text1')"
      />
    </demo-block>

    <demo-block :title="t('multipleKeywords')">
      <PressHighlight
        :keywords="t('keywords2')"
        :source-string="t('text1')"
      />
    </demo-block>

    <demo-block :title="t('highlightClass')">
      <PressHighlight
        :keywords="t('keywords3')"
        :source-string="t('text1')"
        highlight-class="custom-class"
      />
    </demo-block>
  </div>
</template>
<script>
import PressHighlight from 'press-ui/press-highlight/press-highlight.vue';


export default {
  i18n: {
    'zh-CN': {
      text1: '慢慢来，不要急，生活给你出了难题，可也终有一天会给出答案。',
      keywords1: '难题',
      keywords2: ['难题', '终有一天', '答案'],
      keywords3: '生活',
      multipleKeywords: '多字符匹配',
      highlightClass: '设置高亮标签类名',
    },
    'en-US': {
      text1:
      'Take your time and be patient. Life itself will eventually answer all those questions it once raised for you.',
      keywords1: 'questions',
      keywords2: ['time', 'life', 'answer'],
      keywords3: 'life',
      multipleKeywords: 'Multiple Keywords',
      highlightClass: 'Highlight Class Name',
    },
  },
  components: {
    PressHighlight,
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
.demo-wrap {
  background: #fff;

  ::v-deep .custom-class {
    color: red;
  }
}
</style>
