<template>
  <div
    class="demo-wrap"
    :style="customStyle"
  >
    <PressProtocol
      :list="list"
      :custom-style="customStyle"
      @click="onClickProtocol"
    />
  </div>
</template>
<script>
import { setClipboardData } from 'press-ui/common/clipboard/clipboard';
import { parseProtocol } from 'press-ui/common/protocol/parse-protocol';

import PressProtocol from 'press-ui/press-protocol/press-protocol.vue';

import { DEFAULT_PRESS_UI_INTRODUCE } from 'press-ui/press-protocol/demo-helper/data';


export default {
  components: {
    PressProtocol,
  },
  data() {
    return {
      list: parseProtocol(DEFAULT_PRESS_UI_INTRODUCE),
      customStyle: 'background: #fff',
    };
  },
  mounted() {
  },
  methods: {
    onClickProtocol(item) {
      // #ifdef H5
      window.location.href = item.link;
      // #endif

      // APP 端：用系统浏览器直接打开链接（与 press-link 组件行为一致），
      // 不再复制链接让用户手动去浏览器粘贴。
      // #ifdef APP-PLUS || APP
      plus.runtime.openURL(item.link);
      // #endif

      // 小程序：无法随意打开外链，保持复制到剪贴板
      // #ifndef H5 || APP-PLUS || APP
      setClipboardData(item.link).then(() => {
        this.onGTip('🎉 复制成功，请到浏览器中查看');
      });
      // #endif
    },
  },
};
</script>
<style scoped lang="scss">
.demo-wrap {
  display: flex;
  padding-top: 10px;
}

press-protocol {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
