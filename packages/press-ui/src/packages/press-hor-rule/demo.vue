<template>
  <div class="demo-wrap">
    <demo-block :title="t('basicUsage')">
      <press-cell
        title="展示"
        is-link
        @click="show = true"
      />

      <!-- #ifdef H5 -->
      <ToggleHeader />
      <!-- #endif -->
    </demo-block>

    <PressHorRule
      v-if="show"
      @close="close"
    />
  </div>
</template>
<script>
import PressHorRule from 'src/packages/press-hor-rule/press-hor-rule.vue';


export default {
  components: {
    PressHorRule,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    close() {
      this.show = false;
    },
  },
};
</script>
<style scoped lang="scss">
</style>
