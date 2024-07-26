<template>
  <PressSection
    :title="title"
    :header-style="headerStyle"
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
  },
};
</script>
<style scoped lang="scss">
.section-content {
  margin: 0 12px;
}
</style>

