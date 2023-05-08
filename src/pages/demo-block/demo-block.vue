<template>
  <uni-section
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
  </uni-section>
</template>
<script>
import UniSection from 'src/pages/components/uni-section/components/uni-section/uni-section.vue';

export default {
  components: {
    UniSection,
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

