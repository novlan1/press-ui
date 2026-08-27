<template>
  <div class="about">
    <PressAbout
      :help-config="helpConfig"
    />
  </div>
</template>

<script>
import PressAbout from 'press-ui/press-about/press-about.vue';

import { DEFAULT_HELPER_CONFIG } from './help-config';


export default {
  // 组件名：与 src/views/press/index.vue 的 cachedPageNames 白名单对应，
  // 让 keep-alive 能缓存 help 页面（保留 PressAbout 弹窗开关状态等）。
  name: 'PageHelp',
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
.about {
  background: #f5f6fa;
  min-height: 100%;
}
</style>
<style scoped lang="scss">
</style>
