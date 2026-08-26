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

import { getPressUIIntroduce, DEFAULT_PRESS_UI_INTRODUCE } from 'press-ui/press-protocol/demo-helper/data';


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
    onFetchData() {
      getPressUIIntroduce().then((res) => {
        this.list = res;
      });
    },
    onClickProtocol(item) {
      // #ifdef H5
      window.location.href = item.link;
      // #endif
      // #ifndef H5
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
