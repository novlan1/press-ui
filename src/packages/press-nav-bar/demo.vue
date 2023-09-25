<template>
  <div class="demo-wrap demo-wrap--gray">
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
        <template #right>
          <press-icon-plus
            name="search"
          />
        </template>
      </press-nav-bar>
    </demo-block>
  </div>
</template>
<script>
import PressNavBar from 'src/packages/press-nav-bar/press-nav-bar.vue';
import PressIconPlus from 'src/packages/press-icon-plus/press-icon-plus.vue';


export default {
  i18n: {
    'zh-CN': {
      useSlot: '使用插槽',
    },
    'en-US': {
      useSlot: 'Use Slot',
    },
  },
  components: {
    PressNavBar,
    PressIconPlus,
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
</style>
