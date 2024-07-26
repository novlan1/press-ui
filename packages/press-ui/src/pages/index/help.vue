<template>
  <div class="about">
    <PressAbout
      :help-config="helpConfig"
    />
  </div>
</template>

<script>
import PressAbout from '../../packages/press-about/press-about.vue';

import { DEFAULT_HELPER_CONFIG } from './help-config';


export default {
  components: {
    PressAbout,
  },
  data() {
    return {
      helpConfig: DEFAULT_HELPER_CONFIG,
    };
  },
  mounted() {
  },
  methods: {
  },
};
</script>
<style>
page {
  background: #f7f8fa;
}
</style>
<style scoped lang="scss">
</style>
