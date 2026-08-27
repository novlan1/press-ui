<template>
  <PressSection
    :title="title"
    :header-style="headerStyle"
    :custom-style="customStyle"
    type="line"
  >
    <div
      class="section-content"
      :style="sectionStyle"
    >
      <slot />
    </div>
  </PressSection>
</template>
<script>
import PressSection from '../press-section/press-section.vue';

export default {
  name: 'PressDemoBlock',
  options: {
    styleIsolation: 'shared',
  },
  components: {
    PressSection,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    sectionStyle: {
      type: String,
      default: '',
    },
    headerStyle: {
      type: String,
      default: '',
    },
    customStyle: {
      type: [String, Object],
      default: '',
    },
  },
};
</script>
<style scoped lang="scss" src="./css/index.scss">
</style>

