<template>
  <div class="demo-wrap">
    <demo-block
      :title="t('basicUsage')"
    >
      <PressLink
        :text="t('openDocs')"
        href="https://novlan1.github.io/press-ui/"
        @click="click"
      />
    </demo-block>

    <demo-block
      :title="t('underline')"
    >
      <PressLink
        underline
        :text="t('openDocs')"
        href="https://novlan1.github.io/press-ui/"
        @click="click"
      />
    </demo-block>

    <demo-block
      :title="t('customColor')"
    >
      <PressLink
        :text="t('openDocs')"
        color="#19be6b"
        href="https://novlan1.github.io/press-ui/"
        @click="click"
      />
    </demo-block>
  </div>
</template>
<script>
import PressLink from 'press-ui/press-link/press-link';


export default {
  i18n: {
    'zh-CN': {
      openDocs: '打开 Press UI 文档',
      underline: '下划线',
      customColor: '自定义颜色',
    },
    'en-US': {
      openDocs: 'Go to Press UI docs',
      underline: 'Underline',
      customColor: 'Custom Color',
    },
  },
  components: {
    PressLink,
  },
  data() {
    return {

    };
  },
  methods: {
    click() {
      console.log('[click]');
    },
  },
};
</script>
<style scoped lang="scss">
.demo-wrap ::v-deep .section-content {
  margin: 0 20px;
}
</style>
