<template>
  <div class="wrap">
    <demo-block
      :title="t('basicUsage')"
      :section-style="sectionStyle"
      :header-style="headerStyle"
    >
      <press-nav-bar
        :title="t('title')"
        :left-text="t('back')"
        :right-text="t('button')"
        left-arrow
        :safe-area-inset-top="false"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </demo-block>

    <demo-block
      :title="t('useSlot')"
      :section-style="sectionStyle"
      :header-style="headerStyle"
    >
      <press-nav-bar
        :title="t('title')"
        :left-text="t('back')"
        left-arrow
        :safe-area-inset-top="false"
      >
        <press-icon-plus
          slot="right"
          name="search"
        />
      </press-nav-bar>
    </demo-block>
  </div>
</template>
<script>
export default {
  i18n: {
    'zh-CN': {
      useSlot: '使用插槽',
    },
    'en-US': {
      useSlot: 'Use Slot',
    },
  },

  data() {
    return {
      sectionStyle: 'margin: 0;background: #f7f8fa;',
      headerStyle: 'background: #f7f8fa;',
    };
  },
  methods: {
    onClickLeft() {
      console.log('onClickLeft');
    },
    onClickRight() {
      console.log('onClickRight');
    },
  },
};
</script>
<style scoped lang="scss">
@import "src/packages/base/mixin.scss";
page {
  background: #f7f8fa !important;
}
</style>
