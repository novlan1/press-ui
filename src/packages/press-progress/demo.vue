<template>
  <div class="demo-wrap">
    <demo-block :title="t('basicUsage')">
      <div :style="progressStyle">
        <press-progress :percentage="50" />
      </div>
    </demo-block>

    <demo-block :title="t('strokeWidth')">
      <div :style="progressStyle">
        <press-progress
          :percentage="50"
          :stroke-width="8"
        />
      </div>
    </demo-block>

    <demo-block :title="t('title2')">
      <div :style="progressStyle">
        <press-progress
          :percentage="50"
          inactive
        />
      </div>
    </demo-block>

    <demo-block :title="t('title3')">
      <div :style="progressStyle">
        <press-progress
          :pivot-text="t('orange')"
          color="#f2826a"
          :percentage="25"
        />
      </div>

      <div :style="progressStyle">
        <press-progress
          :pivot-text="t('red')"
          color="#ee0a24"
          :percentage="50"
        />
      </div>

      <div :style="progressStyle">
        <press-progress
          :percentage="75"
          :pivot-text="t('purple')"
          pivot-color="#7232dd"
          color="linear-gradient(to right, #be99ff, #7232dd)"
        />
      </div>
    </demo-block>
  </div>
</template>
<script>
import PressProgress from 'src/packages/press-progress/press-progress.vue';


export default {
  i18n: {
    'zh-CN': {
      title2: '置灰',
      title3: '样式定制',
      strokeWidth: '线条粗细',
    },
    'en-US': {
      title2: 'Inactive',
      title3: 'Custom Style',
      strokeWidth: 'Stroke Width',
    },
  },

  components: {
    PressProgress,
  },
  data() {
    return {
      progressStyle: 'margin: 20px 0;',

    };
  },
  methods: {

  },
};
</script>
<style scoped lang="scss">
</style>
